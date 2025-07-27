import { useStreakData, type StreakDay } from "../hooks/useStreakData";

interface WorkoutSession {
  id: string;
  date: string | Date;
  exercises: { sets: { weight?: number; reps?: number }[] }[];
}

interface WorkoutStreakProps {
  workoutSessions: WorkoutSession[];
  className?: string;
}

const StreakSquare = ({ day }: { day: StreakDay }) => {
  const getIntensityColor = () => {
    switch (day.intensity) {
      case "none":
        return "bg-gray-100";
      case "low":
        return "bg-primary-200";
      case "medium":
        return "bg-primary-500";
      case "high":
        return "bg-primary-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div
      className={`w-3 h-3 rounded-sm ${getIntensityColor()}`}
      title={`${day.date} - ${
        day.intensity === "none" ? "No workout" : `${day.intensity} intensity`
      }`}
    />
  );
};

export default function WorkoutStreak({
  workoutSessions,
  className = "",
}: WorkoutStreakProps) {
  const streakData = useStreakData(workoutSessions);

  const weeks: StreakDay[][] = [];
  for (let i = 0; i < streakData.length; i += 7) {
    weeks.push(streakData.slice(i, i + 7));
  }

  return (
    <div className={`p-8 ${className} card`}>
      <h3 className="text-lg font-semibold mb-4">Workout Activity</h3>

      <div className="flex gap-1 overflow-x-auto">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <StreakSquare key={`${weekIndex}-${dayIndex}`} day={day} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
