import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950 px-6 text-center text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-teal-300">404</p>
        <h1 className="mt-4 font-display text-5xl">Route not found</h1>
        <p className="mt-4 text-slate-300">The page you requested does not exist in this demo app.</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink-950"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
