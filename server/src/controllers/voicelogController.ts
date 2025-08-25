import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

import { callGemini } from "../lib/gemini";
import { createLog } from "./logsController";
import { logMetrics } from "./metricsController";
import { prisma } from "../lib/prisma";
import { Exercise } from "../types/workout.types";
import type { WorkoutSession, BodyMetric } from "@prisma/client";
import transcribe from "../utils/elevenlabs";

function extractJsonFromResponse(text: string) {
  try {
    const cleanText = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("JSON parsing error:", error);
    throw new Error(`Failed to parse JSON: ${text}`);
  }
}

export const logVoicePremium = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.authUserId || !req.isPremium) {
    res.status(201).json({
      message: "User not authenticated",
    });
  }
  const file = req.file;
  if (!file) {
    res.status(500).json({
      message: "No file found",
    });
  }

  if (file) {
    const nodeBuffer: Buffer = file.buffer;

    // Convert Buffer → Uint8Array (valid BlobPart)
    const uint8array = new Uint8Array(nodeBuffer);

    const blob = new Blob([uint8array], { type: file.mimetype });
    const response = await transcribe(blob);
    res.json({ success: "true", transcription: response });
  }
};

export const logVoice = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { transcript } = req.body;

    if (!transcript || transcript.trim() === "") {
      res.status(400).json({
        success: false,
        error: "No transcript provided",
      });
      return;
    }

    const classificationPrompt = `
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no code blocks.

Analyze this voice input and classify the intent:

Input: "${transcript}"

Determine if this is:
1. WORKOUT_LOG - Exercise/training data
2. BODY_METRIC - Weight, body fat, measurements
3. MIXED - Contains both workout and metric data
4. UNCLEAR - Ambiguous or invalid input

Return JSON: { "intent": "WORKOUT_LOG|BODY_METRIC|MIXED|UNCLEAR", "confidence": 0.0-1.0 }
`;

    const classificationResponse = await callGemini(classificationPrompt);
    const classification = extractJsonFromResponse(
      classificationResponse.text || ""
    );

    switch (classification.intent) {
      case "WORKOUT_LOG":
        await handleWorkoutLog(req, res, transcript);
        break;

      case "BODY_METRIC":
        await handleBodyMetric(req, res, transcript);
        break;

      case "MIXED":
        await handleMixed(req, res, transcript);
        break;

      case "UNCLEAR":
        res.status(400).json({
          success: false,
          error: "Could not understand the input. Please try again.",
          suggestion:
            "Try saying something like: 'I did bench press, 3 sets of 8 reps at 185 pounds' or 'I weigh 175 pounds today'",
        });
        break;

      default:
        res.status(500).json({
          success: false,
          error: "Unexpected classification result",
        });
    }
  } catch (error) {
    console.error("Error in logVoice:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process voice input",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

async function handleWorkoutLog(
  req: AuthenticatedRequest,
  res: Response,
  transcript: string
) {
  const workoutPrompt = `
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no code blocks.
Convert this voice input to structured workout data:

Input: "${transcript}"

Extract ALL exercises, sets, reps, weights, and any other details.
Be intelligent about:
- Exercise name variations (bench press = bench, pull-ups = pullups)
- Implicit information (if someone says "3 sets of 10", apply to current exercise)
- Units : convert any weight unit to lbs, duration unit to hrs
- Categories (strength, cardio, flexibility)

Return JSON matching this EXACT schema:
{
  "parsedJson": {
    "exercises": [
      {
        "name": "string",
        "category": "strength|cardio|flexibility",
        "isCustom": boolean,
        "sets": [
          {
            "reps": number|null,
            "weight": number|null,
            "distance": number|null,
            "duration": number|null,
            "intensity": "easy|moderate|hard|max",
            "note": "string"|null
          }
        ]
      }
    ]
  },
  "duration": number|null,
  "note": "string"|null,
}
`;

  try {
    const workoutResponse = await callGemini(workoutPrompt);
    const workoutData = extractJsonFromResponse(workoutResponse.text || "");

    req.body = workoutData;

    await createLog(req, res);
  } catch (error) {
    console.error("Error processing workout log:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process workout data",
    });
  }
}

async function handleBodyMetric(
  req: AuthenticatedRequest,
  res: Response,
  transcript: string
) {
  const metricPrompt = `
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no code blocks.
Convert this voice input to body metric data:

Input: "${transcript}"

Extract weight, body fat percentage, muscle mass, or any measurements.
Be intelligent about:
- Units (convert any weight unit to lbs, % for body fat)
- Date context ("yesterday", "this morning")
- Multiple metrics in one input

Return JSON matching this EXACT schema:
{
  "weight": number|null,
  "bodyFat": number|null,
  "muscleMass": number|null,
  "date": "YYYY-MM-DD"|null,
  "note": "string"|null
}
`;

  try {
    const metricResponse = await callGemini(metricPrompt);
    const metricData = extractJsonFromResponse(metricResponse.text || "");

    req.body = metricData;

    await logMetrics(req, res);
  } catch (error) {
    console.error("Error processing body metric:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process body metric data",
    });
  }
}

async function handleMixed(
  req: AuthenticatedRequest,
  res: Response,
  transcript: string
) {
  try {
    const workoutPrompt = `
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no code blocks.
Convert ONLY the workout/exercise portion of this voice input to structured data:

Input: "${transcript}"

Extract ALL exercises, sets, reps, weights, and any other details.
Be intelligent about:
- Exercise name variations (bench press = bench, pull-ups = pullups)
- Implicit information (if someone says "3 sets of 10", apply to current exercise)
- Units : convert any weight unit to lbs, duration unit to hrs
- Categories (strength, cardio, flexibility)

Return JSON matching this EXACT schema:
{
  "parsedJson": {
    "exercises": [
      {
        "name": "string",
        "category": "strength|cardio|flexibility",
        "isCustom": boolean,
        "sets": [
          {
            "reps": number|null,
            "weight": number|null,
            "distance": number|null,
            "duration": number|null,
            "intensity": "easy|moderate|hard|max",
            "note": "string"|null
          }
        ]
      }
    ]
  },
  "duration": number|null,
  "note": "string"|null
}
`;

    const metricPrompt = `
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanation, no code blocks.
Convert ONLY the body metric portion of this voice input to structured data:

Input: "${transcript}"

Extract weight, body fat percentage, muscle mass, or any measurements.
Be intelligent about:
- Units (convert any weight unit to lbs, % for body fat)
- Date context ("yesterday", "this morning")
- Multiple metrics in one input

Return JSON matching this EXACT schema:
{
  "weight": number|null,
  "bodyFat": number|null,
  "muscleMass": number|null,
  "date": "YYYY-MM-DD"|null,
  "note": "string"|null
}
`;

    const [workoutResponse, metricResponse] = await Promise.all([
      callGemini(workoutPrompt),
      callGemini(metricPrompt),
    ]);

    const workoutData = extractJsonFromResponse(workoutResponse.text || "");
    const metricData = extractJsonFromResponse(metricResponse.text || "");

    const results = {
      workout: null as { message: string; session: WorkoutSession } | null,
      metric: null as { message: string; metric: BodyMetric } | null,
      errors: [] as string[],
    };

    try {
      if (workoutData.parsedJson?.exercises?.length > 0) {
        const newSession = await prisma.workoutSession.create({
          data: {
            userId: req.authUserId!,
            date: workoutData.date ? new Date(workoutData.date) : new Date(),
            duration: workoutData.duration || null,
            note: workoutData.note || null,
            exercises: {
              create: workoutData.parsedJson.exercises.map(
                (exercise: Exercise) => ({
                  name: exercise.name,
                  category: exercise.category,
                  isCustom: exercise.isCustom || false,
                  aiTagged: true,
                  sets: {
                    create: exercise.sets.map((set) => ({
                      reps: set.reps || null,
                      weight: set.weight || null,
                      distance: set.distance || null,
                      duration: set.duration || null,
                      intensity: set.intensity || null,
                      note: set.note || null,
                    })),
                  },
                })
              ),
            },
          },
          include: {
            exercises: {
              include: {
                sets: true,
              },
            },
          },
        });

        results.workout = { message: "Workout logged!", session: newSession };
      }
    } catch (error) {
      console.error("Error creating workout log in mixed:", error);
      results.errors.push("Failed to create workout log");
    }

    try {
      if (metricData.weight || metricData.bodyFat || metricData.muscleMass) {
        const newMetric = await prisma.bodyMetric.create({
          data: {
            userId: req.authUserId!,
            date: metricData.date ? new Date(metricData.date) : new Date(),
            weight: metricData.weight
              ? parseFloat(metricData.weight.toString())
              : null,
            bodyFat: metricData.bodyFat
              ? parseFloat(metricData.bodyFat.toString())
              : null,
            muscleMass: metricData.muscleMass
              ? parseFloat(metricData.muscleMass.toString())
              : null,
          },
        });

        results.metric = { message: "Metrics logged!", metric: newMetric };
      }
    } catch (error) {
      console.error("Error creating metric log in mixed:", error);
      results.errors.push("Failed to create body metric");
    }

    res.json({
      success: results.errors.length === 0,
      message: "Mixed content processed",
      session: results?.workout?.session,
      metric: results?.metric?.metric,
      errors: results.errors.length > 0 ? results.errors : undefined,
    });
  } catch (error) {
    console.error("Error processing mixed content:", error);
    res.status(500).json({
      success: false,
      error: "Failed to process mixed content",
    });
  }
}
