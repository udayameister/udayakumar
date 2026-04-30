import { useEffect, useMemo, useState } from "react";
import profileData from "./data/profile.json";
import { parseBlogPosts } from "./utils/blog";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Publications from "./components/Publications";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Footer from "./components/Footer";

const rawBlogPosts = import.meta.glob("./content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

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

function mergeProfileData(saved) {
  const merged = {
    ...profileData,
    ...saved,
    person: {
      ...profileData.person,
      ...(saved.person || {})
    },
    links: {
      ...profileData.links,
      ...(saved.links || {})
    },
    scholarMetrics: {
      ...profileData.scholarMetrics,
      ...(saved.scholarMetrics || {})
    },
    identifiers: {
      ...(profileData.identifiers || {}),
      ...(saved.identifiers || {})
    }
  };

  if (!merged.person.photoPath) {
    merged.person.photoPath = profileData.person.photoPath;
  }

  return merged;
}

function getInitialData() {
  if (typeof window === "undefined") return profileData;

  const saved = window.localStorage.getItem("portfolio-profile-draft");
  if (!saved) return profileData;

  try {
    const parsed = JSON.parse(saved);
    return isProfileData(parsed) ? mergeProfileData(parsed) : profileData;
  } catch {
    return profileData;
  }
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("portfolio-theme") || "light";
  });
  const [data, setData] = useState(getInitialData);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const isAdmin = pathname.replace(/\/$/, "") === "/admin";
  const blogPosts = useMemo(() => parseBlogPosts(rawBlogPosts), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen overflow-hidden bg-paper text-ink transition-colors duration-300 dark:bg-[#101820] dark:text-white">
      <Header theme={theme} onThemeChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <main>
        {isAdmin ? (
          <AdminLogin>
            <AdminDashboard data={data} onDataChange={setData} />
          </AdminLogin>
        ) : (
          <>
            <Hero data={data} />
            <About data={data} />
            <Publications publications={data.publications} scholarMetrics={data.scholarMetrics} links={data.links} />
            <Experience items={data.experience} />
            <Skills skills={data.skills} researchInterests={data.researchInterests} />
            <Projects projects={data.projects} />
            <Achievements achievements={data.achievements} certifications={data.certifications} />
            <Blog posts={blogPosts} />
            <Contact data={data} />
          </>
        )}
      </main>
      <Footer name={data.person.name} />
    </div>
  );
}
