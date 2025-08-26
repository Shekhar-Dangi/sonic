import { Type } from "@google/genai";


const exerciseSetSchema = {
  type: Type.OBJECT,
  properties: {
    reps: {
      type: Type.NUMBER,
      nullable: true
    },
    weight: {
      type: Type.NUMBER,
      nullable: true
    },
    distance: {
      type: Type.NUMBER,
      nullable: true
    },
    duration: {
      type: Type.NUMBER,
      nullable: true
    },
    intensity: {
      type: Type.STRING,
      enum: ["easy", "moderate", "hard", "max"],
      nullable: true
    },
    note: {
      type: Type.STRING,
      nullable: true
    }
  },
  propertyOrdering: ["reps", "weight", "distance", "duration", "intensity", "note"]
};


const exerciseSchema = {
  type: Type.OBJECT,
  properties: {
    name: {
      type: Type.STRING
    },
    category: {
      type: Type.STRING,
      enum: ["strength", "cardio", "mobility", "custom"]
    },
    isCustom: {
      type: Type.BOOLEAN
    },
    sets: {
      type: Type.ARRAY,
      items: exerciseSetSchema,
      minItems: 1
    }
  },
  required: ["name", "category", "isCustom", "sets"],
  propertyOrdering: ["name", "category", "isCustom", "sets"]
};


export const unifiedVoiceLogSchema = {
  type: Type.OBJECT,
  properties: {
    // Workout data
    workout: {
      type: Type.OBJECT,
      properties: {
        exercises: {
          type: Type.ARRAY,
          items: exerciseSchema,
          nullable: true
        },
        duration: {
          type: Type.NUMBER,
          nullable: true
        },
        note: {
          type: Type.STRING,
          nullable: true
        }
      },
      nullable: true,
      propertyOrdering: ["exercises", "duration", "note"]
    },
    // Body metric data
    bodyMetrics: {
      type: Type.OBJECT,
      properties: {
        weight: {
          type: Type.NUMBER,
          nullable: true
        },
        bodyFat: {
          type: Type.NUMBER,
          nullable: true
        },
        muscleMass: {
          type: Type.NUMBER,
          nullable: true
        },
        date: {
          type: Type.STRING,
          format: "date",
          nullable: true
        },
        note: {
          type: Type.STRING,
          nullable: true
        }
      },
      nullable: true,
      propertyOrdering: ["weight", "bodyFat", "muscleMass", "date", "note"]
    }
  },
  propertyOrdering: ["workout", "bodyMetrics"]
};

// Unified prompt that handles everything
export const unifiedVoicePrompt = (transcript: string) => `
Analyze this voice input and extract both workout and body metric information:

Input: "${transcript}"

For WORKOUT data, extract:
- Exercise names (be intelligent about variations: bench press = bench, pull-ups = pullups)
- Sets, reps, weights, distances, durations
- Categories (strength, cardio, mobility, custom)
- Units: convert weight to kg, duration to hours (For example: 30 mins = 0.5 hrs)

IMPORTANT - Duration handling:
- If duration is mentioned for a specific exercise (like "running for 30 mins"), put it in that exercise's set duration field
- Only put duration in the workout-level duration field if explicitly mentioned for the entire workout session (like "my whole workout took 2 hours")
- Exercise-specific durations should NOT be added to workout-level duration

For BODY METRIC data, extract:
- Weight, body fat percentage, muscle mass
- Units: convert weight to kg, body fat as percentage
- Date context ("yesterday", "this morning") 
- Any measurement notes

If the input contains only workout data, set bodyMetrics to null.
If the input contains only body metrics, set workout to null.
If unclear or invalid input, set both to null.

Provide structured data for whatever you can extract from the input.
`;