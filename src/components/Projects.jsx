import Section from "./Section";

export default function Projects({ projects }) {
  return (
    <Section id="projects" eyebrow="Research Work" title="Projects & Contributions">
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.title} className="card">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-signal">{project.type}</p>
            <h3 className="mt-3 text-xl font-extrabold text-ink dark:text-white">{project.title}</h3>
            <p className="mt-3 leading-7 text-ink/70 dark:text-white/70">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.keywords.map((keyword) => (
                <span key={keyword} className="chip">
                  {keyword}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
