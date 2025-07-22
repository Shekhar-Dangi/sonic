import PlanCard from "./PlanCard";
import Section from "./Section";

function Plan() {
  const plans = [
    {
      id: 1,
      title: "Free",
      price: "$0",
      isPopular: false,
      features: [
        "20 voice logs per month",
        "Basic insight",
        "Data visualizations",
        "No AI feedback",
      ],
    },
    {
      id: 2,
      title: "Monthly",
      price: "$5",
      isPopular: false,
      features: [
        "Unlimited voice logs",
        "AI feedback (50 prompts/mo)",
        "Progress charts + comparasions",
        "Training suggestions",
      ],
    },
    {
      id: 3,
      title: "Yearly",
      price: "$49",
      desc: "Save 30%",
      isPopular: true,
      features: [
        "Everything in Monthly",
        "AI feedback (150 prompts/mo)",
        "Exclusive goal tracking tools",
        "Early access to features",
      ],
    },
  ];
  return (
    <Section
      title="Choose Your Plan"
      subtitle="Start free. Upgrade when you're ready."
      children={plans.map((plan) => (
        <PlanCard
          key={plan.id}
          title={plan.title}
          price={plan.price}
          features={plan.features}
          isPopular={plan.isPopular}
        />
      ))}
    />
  );
}

export default Plan;
