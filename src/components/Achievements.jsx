import Section from "./Section";

export default function Achievements({ achievements, certifications }) {
  return (
    <Section id="achievements" eyebrow="Recognition" title="Achievements, Awards & Certifications">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {achievements.map((item) => (
            <article key={`${item.year}-${item.title}`} className="card">
              <div className="flex flex-wrap items-center gap-2">
                {item.year && <span className="text-sm font-bold text-saffron">{item.year}</span>}
                {item.organization && <span className="text-sm font-semibold text-ink/50 dark:text-white/50">{item.organization}</span>}
              </div>
              <h3 className="mt-2 text-lg font-extrabold text-ink dark:text-white">{item.title}</h3>
              <p className="mt-2 leading-7 text-ink/65 dark:text-white/65">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="card">
          <h3 className="text-xl font-extrabold text-ink dark:text-white">Certifications</h3>
          <div className="mt-5 space-y-4">
            {certifications.map((item) => (
              <article key={`${item.date}-${item.title}`} className="border-b border-ink/10 pb-4 last:border-0 last:pb-0 dark:border-white/10">
                <p className="text-sm font-bold text-saffron">{item.date}</p>
                <h4 className="mt-1 font-extrabold text-ink dark:text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-ink/65 dark:text-white/65">{item.issuer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
