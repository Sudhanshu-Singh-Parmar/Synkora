import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Discover", to: "/discover" },
  { label: "Sessions", to: "/sessions" },
  { label: "Dashboard", to: "/dashboard" },
];

function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 8.5c1.38 0 2.5-1.12 2.5-2.5S8.38 3.5 7 3.5 4.5 4.62 4.5 6 5.62 8.5 7 8.5Z" />
      <path d="M17 20.5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5Z" />
      <path d="M7 20.5c1.38 0 2.5-1.12 2.5-2.5S8.38 15.5 7 15.5 4.5 16.62 4.5 18 5.62 20.5 7 20.5Z" />
      <path d="M17 8.5c1.38 0 2.5-1.12 2.5-2.5S18.38 3.5 17 3.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5Z" />
      <path d="M9.2 7.2 14.8 16.8" />
      <path d="M9.2 16.8 14.8 7.2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm8.5 1.75h-8.5A4 4 0 0 0 3.75 7.75v8.5a4 4 0 0 0 4 4h8.5a4 4 0 0 0 4-4v-8.5a4 4 0 0 0-4-4Zm-4.25 2.5A5.75 5.75 0 1 1 6.25 12 5.76 5.76 0 0 1 12 6.25Zm0 1.75A4 4 0 1 0 16 12a4 4 0 0 0-4-4Zm5.88-2.63a1.12 1.12 0 1 1-1.13 1.13 1.13 1.13 0 0 1 1.13-1.13Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.9 2H21l-6.9 7.88L22.2 22h-6.34l-4.96-7.28L4.53 22H2.4l7.38-8.43L2 2h6.5l4.48 6.66L18.9 2Zm-1.11 18.08h1.17L7.87 3.82H6.62Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.08c0-.87.24-1.47 1.49-1.47H16.7V4.92A23.55 23.55 0 0 0 14.13 4C11.6 4 9.87 5.55 9.87 8.4V11H7v3h2.87v8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38ZM5.25 3A1.97 1.97 0 1 0 7.22 5 1.97 1.97 0 0 0 5.25 3Zm15.19 8.56c0-3.11-1.66-4.56-3.87-4.56a3.34 3.34 0 0 0-3 1.66V8.5h-3.24c0 .7.04 11.5 0 11.5h3.24v-6.42c0-.34 0-.68.12-.92a1.77 1.77 0 0 1 1.66-1.18c1.17 0 1.64.9 1.64 2.22V20h3.24Z" />
    </svg>
  );
}

export default function AppShell() {
  const { isAuthenticated, logout } = useAppContext();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleBrandClick = (event) => {
    event.preventDefault();

    if (window.location.pathname === "/") {
      window.location.reload();
      return;
    }

    window.location.assign("/");
  };

  return (
    <div className="min-h-screen bg-ink-950 text-slate-100">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[8%] top-20 h-72 w-72 animate-drift rounded-full bg-teal-400/18 blur-3xl" />
        <div className="absolute right-[10%] top-1/3 h-80 w-80 animate-drift rounded-full bg-coral-400/18 blur-3xl [animation-delay:1.5s]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-drift rounded-full bg-gold-400/[0.12] blur-3xl [animation-delay:3s]" />
        <div className="absolute inset-0 bg-grid bg-[size:70px_70px] animate-pulse-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,113,133,0.12),transparent_28%),linear-gradient(180deg,#050816_0%,#0b1020_48%,#050816_100%)]" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-950/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <NavLink
            to="/"
            onClick={handleBrandClick}
            className="flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-white"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-teal-300/25 bg-teal-400/10 text-teal-200 shadow-glow">
              <BrandIcon />
            </span>
            <span>Synkora</span>
          </NavLink>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition ${
                    isActive ? "bg-white text-ink-950" : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {isAuthenticated ? (
            <div className="hidden items-center gap-3 md:flex">
              <NavLink
                to="/discover"
                className="rounded-full border border-teal-300/40 bg-teal-400 px-4 py-2 text-sm font-medium text-ink-950 shadow-glow transition hover:bg-teal-300"
              >
                Start Swapping
              </NavLink>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/auth?auth=login"
              className="hidden rounded-full border border-teal-300/40 bg-teal-400/10 px-4 py-2 text-sm font-medium text-teal-200 shadow-glow transition hover:bg-teal-400/20 md:inline-flex"
            >
              Register / Login
            </NavLink>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              {isMenuOpen ? (
                <>
                  <path d="M6 6 18 18" />
                  <path d="M18 6 6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mx-auto max-w-7xl px-6 pb-4 md:hidden lg:px-8">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm transition ${
                        isActive ? "bg-white text-ink-950" : "bg-white/5 text-slate-300 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                {isAuthenticated ? (
                  <>
                    <NavLink
                      to="/discover"
                      className="rounded-2xl bg-teal-400 px-4 py-3 text-sm font-medium text-ink-950 transition hover:bg-teal-300"
                    >
                      Start Swapping
                    </NavLink>
                    <button
                      type="button"
                      onClick={logout}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/auth?auth=login"
                    className="rounded-2xl border border-teal-300/40 bg-teal-400/10 px-4 py-3 text-sm font-medium text-teal-200 transition hover:bg-teal-400/20"
                  >
                    Register / Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-ink-950/70 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-300/25 bg-teal-400/10 text-teal-200">
                <BrandIcon />
              </span>
              <p className="font-display text-3xl text-white">Synkora</p>
            </div>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              A local skill-sharing platform built to help people teach, learn, and grow together through time-based
              exchanges.
            </p>
            <div className="mt-5 text-sm leading-7 text-slate-400">
              <p>Address: 221 Community Hub Road, Sector 18, New Delhi, India</p>
              <p>Email: hello@synkora.in</p>
              <p>Phone: +91 730036 8554</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Quick Links</p>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <NavLink to="/" className="transition hover:text-white">
                Home
              </NavLink>
              <NavLink to="/discover" className="transition hover:text-white">
                Discover
              </NavLink>
              <NavLink to="/sessions" className="transition hover:text-white">
                Sessions
              </NavLink>
              <NavLink to="/dashboard" className="transition hover:text-white">
                Dashboard
              </NavLink>
              <NavLink to="/auth?auth=register" className="transition hover:text-white">
                Register / Login
              </NavLink>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral-300">Follow Us</p>
            <div className="mt-5 grid gap-3 text-sm text-slate-300">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="text-coral-300">
                  <InstagramIcon />
                </span>
                <span>Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="text-slate-200">
                  <XIcon />
                </span>
                <span>Twitter / X</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="text-blue-300">
                  <FacebookIcon />
                </span>
                <span>Facebook</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="text-sky-300">
                  <LinkedInIcon />
                </span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
