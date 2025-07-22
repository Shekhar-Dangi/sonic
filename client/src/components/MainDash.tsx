import InteractiveContinuousChart from "./InteractiveContinuousChart";
import MainCard from "./MainCard";

function MainDash() {
  const stats = [
    {
      id: 1,
      title: "Volume",
      subtitle: "234 lbs",
    },
    {
      id: 2,
      title: "Sesssions This Week",
      subtitle: "4",
    },
    {
      id: 3,
      title: "PRs Hit",
      subtitle: "2",
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
