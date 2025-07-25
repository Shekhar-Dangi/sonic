import checkmark from "../assets/icons/checkmark.svg";

interface PlanCardProps {
  title: string;
  price: string;
  isPopular?: boolean;
  features: string[];
  id: number;
}

function PlanCard({ id, title, price, isPopular, features }: PlanCardProps) {
  return (
    <>
      <div
        className={`relative flex card flex-1 flex-col items-left justify-center px-8 py-12 ${
          isPopular ? "scale-105 border-primary-600" : ""
        } transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl cursor-pointer`}
      >
        {isPopular && (
          <div className="absolute -top-3 left-6/10  z-10">
            <span className="bg-primary-600 text-white px-4 py-2 rounded-full  font-semibold uppercase text-[10px] ">
              Most Popular
            </span>
          </div>
        )}
        <h4 className="text-md md:text-lg font-semibold mt-4 mb-2">{title}</h4>
        <h3 className="text-xl md:text-2xl font-bold">
          {price}{" "}
          <span className="text-black-400 text-sm font-normal">/month</span>
        </h3>
        <div className="mt-8">
          {features.map((feature) => (
            <p key={id} className="para flex gap-2 items-center mb-2">
              <img
                src={checkmark}
                className="bg-primary-600 rounded-full h-4 w-4 p-1"
              />{" "}
              {feature}{" "}
            </p>
          ))}
        </div>
        {price === "$0" ? (
          <button className="text-center btn-secondary cursor-pointer mt-8 w-full">
            Get Started
          </button>
        ) : title === "Monthly" ? (
          <button className="text-center btn-primary cursor-pointer mt-8 w-full">
            Start Monthly
          </button>
        ) : (
          <button className="text-center btn-primary cursor-pointer mt-8 w-full">
            Start Yearly
          </button>
        )}
      </div>
    </>
  );
}

export default PlanCard;
