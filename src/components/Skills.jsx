import Section from "./Section";

export default function Skills({ skills, researchInterests }) {
  return (
    <Section id="skills" eyebrow="Technical Expertise" title="Skills & Research Interests">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((group) => (
          <article key={group.category} className="card">
            <h3 className="text-lg font-extrabold text-ink dark:text-white">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="card mt-5">
        <h3 className="text-lg font-extrabold text-ink dark:text-white">Research Interests</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {researchInterests.map((item) => (
            <span key={item} className="chip">
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
