import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";

function InitialsPortrait({ name }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-gradient-to-br from-signal/20 via-white to-saffron/20 dark:from-signal/25 dark:via-white/10 dark:to-plum/25">
      <div
        className="flex h-36 w-36 items-center justify-center border border-ink/10 bg-white/80 font-display text-5xl font-black text-ink shadow-soft dark:border-white/10 dark:bg-[#101820]/85 dark:text-white"
        style={{ borderRadius: 999 }}
      >
        {initials}
      </div>
    </div>
  );
}

export default function Hero({ data }) {
  const { person } = data;

  return (
    <section className="border-b border-ink/10 py-14 dark:border-white/10 sm:py-20">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-signal">
            AI Researcher | Neuroimaging | Machine Learning
          </p>
          <h1 className="font-display text-5xl font-black leading-tight text-ink dark:text-white sm:text-6xl lg:text-7xl">
            {person.name}
          </h1>
          <p className="mt-5 max-w-3xl text-xl font-semibold text-ink/75 dark:text-white/75">{person.title}</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-ink/70 dark:text-white/70">{person.summary}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={person.cvPath}
              className="focus-ring inline-flex items-center gap-2 bg-signal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
              style={{ borderRadius: 8 }}
              download
            >
              <Download size={18} />
              Download CV
            </a>
            <a
              href={`mailto:${person.email}`}
              className="focus-ring inline-flex items-center gap-2 border border-ink/10 bg-white/70 px-5 py-3 text-sm font-bold text-ink transition hover:border-signal hover:text-signal dark:border-white/10 dark:bg-white/10 dark:text-white"
              style={{ borderRadius: 8 }}
            >
              <Mail size={18} />
              Contact
            </a>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {person.roles.map((role) => (
              <span key={role} className="chip">
                {role}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12, duration: 0.7 }}>
          <div
            className="mx-auto max-w-md overflow-hidden border border-ink/10 bg-white/70 shadow-soft dark:border-white/10 dark:bg-white/5"
            style={{ borderRadius: 8 }}
          >
            {person.photoPath ? (
              <img
                src={person.photoPath}
                alt={`${person.name} portrait`}
                className="h-full min-h-[420px] w-full object-cover"
                loading="eager"
              />
            ) : (
              <InitialsPortrait name={person.name} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
