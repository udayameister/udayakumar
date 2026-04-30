import Section from "./Section";

export default function Experience({ items }) {
  return (
    <Section id="experience" eyebrow="Career" title="Teaching & Research Experience">
      <div className="relative">
        <div className="absolute left-3 top-2 hidden h-full w-px bg-ink/10 dark:bg-white/10 sm:block" />
        <div className="space-y-5">
          {items.map((item) => (
            <article key={`${item.period}-${item.role}`} className="relative sm:pl-10">
              <span className="absolute left-0 top-5 hidden h-6 w-6 border-4 border-paper bg-signal dark:border-[#101820] sm:block" style={{ borderRadius: 999 }} />
              <div className="card">
                <p className="text-sm font-bold text-saffron">{item.period}</p>
                <h3 className="mt-2 text-xl font-extrabold text-ink dark:text-white">{item.role}</h3>
                <p className="mt-1 font-semibold text-ink/75 dark:text-white/75">{item.organization}</p>
                <p className="mt-3 leading-7 text-ink/65 dark:text-white/65">{item.details}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
