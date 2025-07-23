import { useSummary } from "../hooks/useSummary";
import InteractiveContinuousChart from "./InteractiveContinuousChart";
import MainCard from "./MainCard";

function MainDash() {
  const { volume, duration, sessions } = useSummary();
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
        <InteractiveContinuousChart />
      </div>
    </>
  );
}

export default MainDash;
