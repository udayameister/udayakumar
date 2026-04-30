export default function Footer({ name }) {
  return (
    <footer className="border-t border-ink/10 py-8 dark:border-white/10">
      <div className="section-shell flex flex-col gap-2 text-sm text-ink/60 dark:text-white/60 sm:flex-row sm:items-center sm:justify-between">
        <p>{name}</p>
        <p>Academic portfolio powered by React, Tailwind CSS, and Markdown content.</p>
      </div>
    </footer>
  );
}
