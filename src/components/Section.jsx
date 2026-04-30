import { motion } from "framer-motion";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <motion.div
        className="section-shell"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className="mb-8 max-w-3xl">
          {eyebrow && <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-signal">{eyebrow}</p>}
          <h2 className="section-title">{title}</h2>
        </div>
        {children}
      </motion.div>
    </section>
  );
}
