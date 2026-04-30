import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import Section from "./Section";

export default function Publications({ publications, scholarMetrics, links }) {
  const [category, setCategory] = useState("All");
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const categories = ["All", ...new Set(publications.map((item) => item.category))];
  const years = ["All", ...new Set(publications.map((item) => item.year))].sort((a, b) => (a === "All" ? -1 : b - a));

  const filtered = useMemo(
    () =>
      publications.filter((item) => {
        const matchesCategory = category === "All" || item.category === category;
        const matchesYear = year === "All" || item.year === year;
        const haystack = `${item.title} ${item.venue} ${item.authors}`.toLowerCase();
        return matchesCategory && matchesYear && haystack.includes(query.toLowerCase());
      }),
    [publications, category, year, query]
  );

  return (
    <Section id="publications" eyebrow="Research" title="Publications">
      <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 dark:text-white/40" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search publications"
            className="focus-ring w-full border border-ink/10 bg-white/75 py-3 pl-10 pr-3 text-sm dark:border-white/10 dark:bg-white/10"
            style={{ borderRadius: 8 }}
          />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="focus-ring border border-ink/10 bg-white/75 px-3 py-3 text-sm dark:border-white/10 dark:bg-[#172026]" style={{ borderRadius: 8 }}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select value={year} onChange={(event) => setYear(event.target.value)} className="focus-ring border border-ink/10 bg-white/75 px-3 py-3 text-sm dark:border-white/10 dark:bg-[#172026]" style={{ borderRadius: 8 }}>
          {years.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => (
          <article key={`${item.year}-${item.title}`} className="card">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <span className="text-signal">{item.category}</span>
              <span className="text-ink/35 dark:text-white/35">/</span>
              <span className="text-saffron">{item.year}</span>
            </div>
            <h3 className="mt-3 text-lg font-extrabold leading-7 text-ink dark:text-white">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold text-ink/70 dark:text-white/70">{item.authors}</p>
            <p className="mt-2 text-sm text-ink/65 dark:text-white/65">{item.venue}</p>
            <p className="mt-4 leading-7 text-ink/70 dark:text-white/70">{item.description}</p>
            {item.meta && <p className="mt-3 text-sm font-semibold text-plum dark:text-rose-300">{item.meta}</p>}
          </article>
        ))}
      </div>

      <div className="card mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-extrabold text-ink dark:text-white">Research Profiles</h3>
          <p className="mt-2 text-sm leading-7 text-ink/65 dark:text-white/65">
            {links.googleScholar ? "Scholar profile connected." : scholarMetrics.note}
          </p>
          {(scholarMetrics.citations || scholarMetrics.hIndex || scholarMetrics.i10Index) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {scholarMetrics.citations && <span className="chip">Citations: {scholarMetrics.citations}</span>}
              {scholarMetrics.hIndex && <span className="chip">h-index: {scholarMetrics.hIndex}</span>}
              {scholarMetrics.i10Index && <span className="chip">i10-index: {scholarMetrics.i10Index}</span>}
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {links.googleScholar && (
            <a href={links.googleScholar} className="focus-ring inline-flex items-center gap-2 font-bold text-signal" target="_blank" rel="noreferrer">
              Scholar <ExternalLink size={17} />
            </a>
          )}
          {links.scopus && (
            <a href={links.scopus} className="focus-ring inline-flex items-center gap-2 font-bold text-signal" target="_blank" rel="noreferrer">
              Scopus <ExternalLink size={17} />
            </a>
          )}
          {links.vidwan && (
            <a href={links.vidwan} className="focus-ring inline-flex items-center gap-2 font-bold text-signal" target="_blank" rel="noreferrer">
              Vidwan <ExternalLink size={17} />
            </a>
          )}
          {links.orcid && (
            <a href={links.orcid} className="focus-ring inline-flex items-center gap-2 font-bold text-signal" target="_blank" rel="noreferrer">
              ORCID <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
