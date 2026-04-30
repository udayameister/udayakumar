import { BookOpen, Fingerprint, Github, GraduationCap, IdCard, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Section from "./Section";

function ContactLink({ href, children }) {
  if (!href) return <span className="font-semibold text-ink/50 dark:text-white/50">Not provided in CV</span>;
  return (
    <a href={href} className="font-bold text-signal transition hover:text-teal-800 dark:hover:text-teal-300" target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {children}
    </a>
  );
}

export default function Contact({ data }) {
  const { person, links, identifiers } = data;

  return (
    <Section id="contact" eyebrow="Contact" title="Academic & Research Contact">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article className="card">
          <Mail className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Email</h3>
          <ContactLink href={`mailto:${person.email}`}>{person.email}</ContactLink>
        </article>
        <article className="card">
          <Phone className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Phone</h3>
          <p className="font-semibold text-ink/70 dark:text-white/70">{person.phone}</p>
        </article>
        <article className="card">
          <MapPin className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Location</h3>
          <p className="font-semibold text-ink/70 dark:text-white/70">{person.location}</p>
        </article>
        <article className="card">
          <Linkedin className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">LinkedIn</h3>
          <ContactLink href={links.linkedin}>LinkedIn Profile</ContactLink>
        </article>
        <article className="card">
          <Github className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">GitHub</h3>
          <ContactLink href={links.github}>GitHub Profile</ContactLink>
        </article>
        <article className="card">
          <GraduationCap className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Google Scholar</h3>
          <ContactLink href={links.googleScholar}>Scholar Profile</ContactLink>
        </article>
        <article className="card">
          <BookOpen className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Scopus</h3>
          <ContactLink href={links.scopus}>Scopus Author Profile</ContactLink>
        </article>
        <article className="card">
          <BookOpen className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Vidwan</h3>
          <ContactLink href={links.vidwan}>Vidwan Profile</ContactLink>
        </article>
        <article className="card">
          <Fingerprint className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">ORCID</h3>
          <ContactLink href={links.orcid}>0000-0002-6270-9336</ContactLink>
        </article>
        <article className="card">
          <IdCard className="text-signal" size={22} />
          <h3 className="mt-4 font-extrabold text-ink dark:text-white">Web of Science ResearcherID</h3>
          <p className="font-semibold text-ink/70 dark:text-white/70">{identifiers?.webOfScienceResearcherId || "Not provided"}</p>
        </article>
      </div>
    </Section>
  );
}
