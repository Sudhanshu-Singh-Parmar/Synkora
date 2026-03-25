import AuthPanel from "../components/AuthPanel";

export default function AuthPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">Account</p>
        <h1 className="mt-4 font-display text-5xl text-white">Register or login to continue</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          Create your account, add the skills you are proficient in, complete 2-step verification, and then return to
          the home page ready to start swapping.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <AuthPanel />
      </div>
    </div>
  );
}
