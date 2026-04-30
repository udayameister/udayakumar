import { useState } from "react";
import { Lock, LogIn } from "lucide-react";

const ADMIN_USERNAME = (import.meta.env.VITE_ADMIN_USERNAME || "admin").trim();
const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD || "change-this-password").trim();

export default function AdminLogin({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => window.sessionStorage.getItem("portfolio-admin-auth") === "true");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username.trim() === ADMIN_USERNAME && password.trim() === ADMIN_PASSWORD) {
      window.sessionStorage.setItem("portfolio-admin-auth", "true");
      setIsAuthed(true);
      setError("");
      return;
    }

    setError("Invalid admin username or password.");
  };

  if (isAuthed) {
    return (
      <>
        <div className="section-shell pt-8">
          <button
            type="button"
            onClick={() => {
              window.sessionStorage.removeItem("portfolio-admin-auth");
              setIsAuthed(false);
              setPassword("");
            }}
            className="focus-ring border border-ink/10 px-4 py-2 text-sm font-bold text-ink/70 transition hover:border-signal hover:text-signal dark:border-white/10 dark:text-white/70"
            style={{ borderRadius: 8 }}
          >
            Logout Admin
          </button>
        </div>
        {children}
      </>
    );
  }

  return (
    <section className="py-16">
      <div className="section-shell">
        <div className="mx-auto max-w-md">
          <div className="card">
            <div className="mb-6 flex h-12 w-12 items-center justify-center bg-signal text-white" style={{ borderRadius: 8 }}>
              <Lock size={22} />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-signal">Admin Access</p>
            <h1 className="font-display text-3xl font-black text-ink dark:text-white">Login Required</h1>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-ink/70 dark:text-white/70">Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="focus-ring mt-2 w-full border border-ink/10 bg-white px-3 py-3 text-ink dark:border-white/10 dark:bg-[#0d141b] dark:text-white"
                  style={{ borderRadius: 8 }}
                  autoComplete="username"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-ink/70 dark:text-white/70">Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="focus-ring mt-2 w-full border border-ink/10 bg-white px-3 py-3 text-ink dark:border-white/10 dark:bg-[#0d141b] dark:text-white"
                  style={{ borderRadius: 8 }}
                  autoComplete="current-password"
                />
              </label>
              {error && <p className="text-sm font-semibold text-plum dark:text-rose-300">{error}</p>}
              <button
                type="submit"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 bg-signal px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800"
                style={{ borderRadius: 8 }}
              >
                <LogIn size={18} />
                Login
              </button>
            </form>
            <p className="mt-5 text-xs leading-6 text-ink/55 dark:text-white/55">
              Configure credentials with Vite environment variables before deployment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
