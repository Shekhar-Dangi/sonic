import Card from "./Card";
import mic from "../assets/icons/mic.svg";
import chart from "../assets/icons/chart.svg";
import database from "../assets/icons/database.svg";
import Section from "./Section";

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
    <Section
      title="How Sonic Works"
      subtitle="From voice to insight in seconds"
      children={howItWorksSteps.map((step) => (
        <Card
          key={step.id}
          title={step.title}
          subtitle={step.subtitle}
          icon={step.icon}
        />
      ))}
    />
  );
}

export default How;
