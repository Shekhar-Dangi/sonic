interface MainCardProps {
  title: string;
  subtitle: string | number;
}

function MainCard({ title, subtitle }: MainCardProps) {
  return (
    <>
      <div className="card flex-1 max-h-[180px] flex flex-col gap-4">
        <h4>{title}</h4>
        <p className="text-4xl font-bold">{subtitle}</p>
      </div>
    </>
  );
}

export default MainCard;
