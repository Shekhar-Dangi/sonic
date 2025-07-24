import mic from "../assets/icons/mic.svg";

interface CardProps {
  title: string;
  subtitle: string;
  icon?: string;
}

function Card({ title, subtitle, icon = mic }: CardProps) {
  return (
    <div className="flex card flex-1 flex-col items-center justify-center ">
      <img src={icon} className="w-8 bg-primary-400 rounded-full p-2" alt="" />
      <h4 className="text-lg font-semibold text-black-900 mt-4 mb-2">
        {title}
      </h4>
      <p className="text-black-700 leading-relaxed para">{subtitle}</p>
    </div>
  );
}

export default Card;
