import { useMemo, useState } from "react";
import { Download, ExternalLink, RotateCcw, Save } from "lucide-react";
import profileData from "../data/profile.json";

function isProfileData(value) {
  return Boolean(
    value &&
      value.person &&
      value.person.name &&
      Array.isArray(value.publications) &&
      Array.isArray(value.experience) &&
      Array.isArray(value.skills) &&
      Array.isArray(value.projects) &&
      Array.isArray(value.achievements) &&
      Array.isArray(value.certifications)
  );
}

export default function AdminDashboard({ data, onDataChange }) {
  const [draft, setDraft] = useState(() => JSON.stringify(data, null, 2));
  const [status, setStatus] = useState("");
  const pageIndex = [
    {
      title: "Home",
      href: "/#top",
      content: data.person?.name || "Profile headline",
      editArea: "person"
    },
    {
      title: "About",
      href: "/#about",
      content: `${data.education?.length || 0} education entries`,
      editArea: "education, researchInterests"
    },
    {
      title: "Publications",
      href: "/#publications",
      content: `${data.publications?.length || 0} publications`,
      editArea: "publications, scholarMetrics, links.googleScholar"
    },
    {
      title: "Experience",
      href: "/#experience",
      content: `${data.experience?.length || 0} roles`,
      editArea: "experience"
    },
    {
      title: "Skills",
      href: "/#skills",
      content: `${data.skills?.length || 0} skill groups`,
      editArea: "skills"
    },
    {
      title: "Projects",
      href: "/#projects",
      content: `${data.projects?.length || 0} research projects`,
      editArea: "projects"
    },
    {
      title: "Achievements",
      href: "/#achievements",
      content: `${data.achievements?.length || 0} achievements, ${data.certifications?.length || 0} certifications`,
      editArea: "achievements, certifications"
    },
    {
      title: "Blog",
      href: "/#blog",
      content: "Markdown posts in src/content/blog",
      editArea: "src/content/blog/*.md"
    },
    {
      title: "Contact",
      href: "/#contact",
      content: data.person?.email || "Contact details",
      editArea: "person.email, person.phone, links"
    }
  ];

  const isValid = useMemo(() => {
    try {
      return isProfileData(JSON.parse(draft));
    } catch {
      return false;
    }
  }, [draft]);

  const saveDraft = () => {
    try {
      const parsed = JSON.parse(draft);
      if (!isProfileData(parsed)) {
        setStatus("JSON is valid, but it is missing required portfolio fields.");
        return;
      }
      window.localStorage.setItem("portfolio-profile-draft", JSON.stringify(parsed));
      onDataChange(parsed);
      setStatus("Draft saved in this browser.");
    } catch {
      setStatus("JSON needs a valid structure before saving.");
    }
  };

  const resetDraft = () => {
    window.localStorage.removeItem("portfolio-profile-draft");
    setDraft(JSON.stringify(profileData, null, 2));
    onDataChange(profileData);
    setStatus("Draft reset to the bundled CV data.");
  };

  const exportJson = () => {
    const blob = new Blob([draft], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "profile.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="py-12">
      <div className="section-shell">
        <div className="mb-6 max-w-4xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-signal">Admin</p>
          <h1 className="section-title">Content Dashboard</h1>
          <p className="mt-4 leading-8 text-ink/70 dark:text-white/70">
            Edit the JSON, save a browser draft, then export the file and replace <code>src/data/profile.json</code> in the repository.
          </p>
        </div>

        <div className="mb-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink dark:text-white">Portfolio Pages Index</h2>
              <p className="mt-2 text-sm text-ink/60 dark:text-white/60">Open a live section or use the edit key to update the matching JSON area.</p>
            </div>
            <a
              href="/"
              className="focus-ring inline-flex items-center gap-2 border border-ink/10 px-4 py-3 text-sm font-bold text-ink/75 transition hover:border-signal hover:text-signal dark:border-white/10 dark:text-white/75"
              style={{ borderRadius: 8 }}
            >
              View Website
              <ExternalLink size={17} />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pageIndex.map((page) => (
              <article key={page.title} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-extrabold text-ink dark:text-white">{page.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-signal">{page.content}</p>
                  </div>
                  <a
                    href={page.href}
                    className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center border border-ink/10 text-ink/60 transition hover:border-signal hover:text-signal dark:border-white/10 dark:text-white/60"
                    style={{ borderRadius: 8 }}
                    title={`Open ${page.title}`}
                    aria-label={`Open ${page.title}`}
                  >
                    <ExternalLink size={17} />
                  </a>
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/45 dark:text-white/45">Edit JSON key</p>
                <p className="mt-2 break-words font-mono text-sm text-ink/70 dark:text-white/70">{page.editArea}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-4">
            <h2 className="text-2xl font-extrabold text-ink dark:text-white">JSON Content Editor</h2>
            <p className="mt-2 text-sm text-ink/60 dark:text-white/60">Make content edits here, then save draft or export the updated profile file.</p>
          </div>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            spellCheck="false"
            className="h-[60vh] w-full resize-y border border-ink/10 bg-white p-4 font-mono text-sm leading-6 text-ink dark:border-white/10 dark:bg-[#0d141b] dark:text-white"
            style={{ borderRadius: 8 }}
          />
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button onClick={saveDraft} className="focus-ring inline-flex items-center gap-2 bg-signal px-4 py-3 text-sm font-bold text-white" style={{ borderRadius: 8 }} type="button">
              <Save size={17} />
              Save Draft
            </button>
            <button onClick={exportJson} disabled={!isValid} className="focus-ring inline-flex items-center gap-2 border border-ink/10 px-4 py-3 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 dark:border-white/10" style={{ borderRadius: 8 }} type="button">
              <Download size={17} />
              Export JSON
            </button>
            <button onClick={resetDraft} className="focus-ring inline-flex items-center gap-2 border border-ink/10 px-4 py-3 text-sm font-bold dark:border-white/10" style={{ borderRadius: 8 }} type="button">
              <RotateCcw size={17} />
              Reset
            </button>
            <span className={`text-sm font-semibold ${isValid ? "text-signal" : "text-plum dark:text-rose-300"}`}>
              {isValid ? "Valid portfolio JSON" : "Invalid or incomplete portfolio JSON"}
            </span>
            {status && <span className="text-sm text-ink/60 dark:text-white/60">{status}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
