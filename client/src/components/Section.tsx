interface SectionProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className="main-container bg-black-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black-900 mb-4">{title}</h2>
          <p className="text-lg text-black-700">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">{children}</div>
      </div>
    </section>
  );
}

export default Section;
