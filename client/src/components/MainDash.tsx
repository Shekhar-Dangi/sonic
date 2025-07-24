import { useSummary } from "../hooks/useSummary";
import { useMetricChart } from "../hooks/useMetricChart";
import { useExerciseChart } from "../hooks/useExerciseChart";
import { useDashboardSync } from "../hooks/useDashboardSync";
import InteractiveContinuousChart from "./InteractiveContinuousChart";
import MainCard from "./MainCard";

function MainDash() {
  const { volume, duration, sessions } = useSummary();

  const { selectedExercise, selectedMetricType } = useDashboardSync();

  const {
    data: weightData,
    config: weightConfig,
    hasData,
  } = useMetricChart("weight", "month");

  const {
    data: exerciseData,
    config: exerciseConfig,
    hasData: hasExerciseData,
  } = useExerciseChart(
    selectedExercise || "bench press",
    selectedMetricType,
    "month"
  );

  const stats = [
    {
      id: 1,
      title: "Volume",
      subtitle: volume ? parseInt(volume.toString()) + " lbs" : "0 lbs",
    },
    {
      id: 2,
      title: "Sesssions",
      subtitle: sessions ? sessions : 0,
    },
    {
      id: 3,
      title: "Cardio Duration",
      subtitle: duration ? duration.toFixed(2) + " hrs" : "0 hrs",
    },
  ];

  return (
    <>
      <div className="flex-1/1  px-8 flex gap-16 flex-col">
        <div className="flex justify-between md-lg:flex-row flex-col gap-4 ">
          {stats.map((stat) => (
            <MainCard
              key={stat.id}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
        <div className="flex flex-col md-lg:flex-row 3xl:flex-col gap-8">
          {hasData ? (
            <InteractiveContinuousChart
              data={weightData}
              config={weightConfig}
              tooltipFields={["date", "weight", "bodyFat", "muscleMass"]}
            />
          ) : (
            <div className="h-90 mt-16 card py-8 px-2 flex items-center justify-center flex-1">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">
                  No weight data for this month
                </p>
                <p className="text-sm">
                  Start logging your body metrics to see progress!
                </p>
              </div>
            </div>
          )}

          {hasExerciseData ? (
            <InteractiveContinuousChart
              data={exerciseData}
              config={exerciseConfig}
              tooltipFields={[
                "date",
                selectedMetricType,
                "exerciseName",
                "totalSets",
                "totalVolume",
              ]}
            />
          ) : (
            <div className="h-90 mt-16 card py-8 px-2 flex items-center justify-center flex-1">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">
                  No {selectedExercise || "exercise"} data for this month
                </p>
                <p className="text-sm">
                  Start logging {selectedExercise || "workout"} sessions to see
                  progress!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MainDash;
