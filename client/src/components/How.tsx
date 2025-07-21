import Card from "./Card";
import mic from "../assets/icons/mic.svg";
import chart from "../assets/icons/chart.png"; // Add your icons
import database from "../assets/icons/database.png";

const howItWorksSteps = [
  {
    id: 1,
    title: "Speak Your Workout",
    subtitle:
      "Just talk naturally about your exercises, sets, and reps. No typing required.",
    icon: mic,
  },
  {
    id: 2,
    title: "Structured And Stored",
    subtitle:
      "Our AI instantly converts your speech into structured workout data.",
    icon: database,
  },
  {
    id: 3,
    title: "Get Insights",
    subtitle: "View every metric and recieve smart AI suggestions.",
    icon: chart,
  },
];

function How() {
  return (
    <section className="section-spacing container-padding bg-black-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black-900 mb-4">
            How Sonic Works
          </h2>
          <p className="text-lg text-black-700">
            From voice to insight in seconds
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {howItWorksSteps.map((step) => (
            <Card
              key={step.id}
              title={step.title}
              subtitle={step.subtitle}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default How;
