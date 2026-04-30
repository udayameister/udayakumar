import { Moon, Sun } from "lucide-react";

const nav = [
  ["About", "#about"],
  ["Publications", "#publications"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Blog", "#blog"],
  ["Contact", "#contact"]
];

export default function Header({ theme, onThemeChange }) {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/85 backdrop-blur dark:border-white/10 dark:bg-[#101820]/85">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a href="/" className="font-display text-lg font-black text-ink dark:text-white">
          Udayakumar P
        </a>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-ink/70 dark:text-white/70 lg:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-signal">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/admin"
            className="focus-ring hidden border border-ink/10 px-3 py-2 text-sm font-bold text-ink/80 transition hover:border-signal hover:text-signal dark:border-white/10 dark:text-white/80 sm:inline-flex"
            style={{ borderRadius: 8 }}
          >
            Admin
          </a>
          <button
            type="button"
            onClick={onThemeChange}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center border border-ink/10 bg-white/70 text-ink transition hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/10 dark:text-white"
            style={{ borderRadius: 8 }}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
