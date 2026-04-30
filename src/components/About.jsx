import Section from "./Section";

export default function About({ data }) {
  return (
    <Section id="about" eyebrow="Profile" title="Academic Background & Career Overview">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card">
          <h3 className="text-xl font-extrabold text-ink dark:text-white">Research Focus</h3>
          <p className="mt-4 leading-8 text-ink/70 dark:text-white/70">{data.person.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {data.researchInterests.map((interest) => (
              <span className="chip" key={interest}>
                {interest}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {data.education.map((item) => (
            <article key={`${item.period}-${item.degree}`} className="card">
              <p className="text-sm font-bold text-saffron">{item.period}</p>
              <h3 className="mt-2 text-lg font-extrabold text-ink dark:text-white">{item.degree}</h3>
              <p className="mt-1 font-semibold text-ink/70 dark:text-white/70">{item.institution}</p>
              <p className="mt-3 text-sm leading-7 text-ink/65 dark:text-white/65">{item.details}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
