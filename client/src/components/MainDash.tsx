import { useSummary } from "../hooks/useSummary";
import { useMetricChart } from "../hooks/useMonthlyWeightChart";
import InteractiveContinuousChart from "./InteractiveContinuousChart";
import MainCard from "./MainCard";

function MainDash() {
  const { volume, duration, sessions } = useSummary();
  const {
    data: weightData,
    config: weightConfig,
    hasData,
  } = useMetricChart("weight", "month");

  const stats = [
    {
      id: 1,
      title: "Volume",
      subtitle: volume ? volume + " lbs" : "0 lbs",
    },
    {
      id: 2,
      title: "Sesssions",
      subtitle: sessions ? sessions : 0,
    },
    {
      id: 3,
      title: "Cardio Duration",
      subtitle: duration ? duration + " hrs" : "0 hrs",
    },
  ];

  return (
    <>
      <div className="flex-1/1 px-8">
        <div className="flex justify-between gap-4 ">
          {stats.map((stat) => (
            <MainCard
              key={stat.id}
              title={stat.title}
              subtitle={stat.subtitle}
            />
          ))}
        </div>

        {/* Monthly Weight Chart */}
        {hasData ? (
          <InteractiveContinuousChart
            data={weightData}
            config={weightConfig}
            tooltipFields={["date", "weight", "bodyFat", "muscleMass"]}
          />
        ) : (
          <div className="h-90 mt-16 card py-8 px-2 flex items-center justify-center">
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
      </div>
    </>
  );
}

export default MainDash;
