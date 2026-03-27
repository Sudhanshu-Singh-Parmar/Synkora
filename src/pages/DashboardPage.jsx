import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const cards = [
  { label: "Upcoming sessions", value: "03" },
  { label: "Completed swaps", value: "19" },
  { label: "Average rating", value: "4.8" },
];

function skillListToText(skills = []) {
  return skills.join(", ");
}

function textToSkillList(text) {
  return text
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
}

export default function DashboardPage() {
  const { wallet, profile, updateProfile } = useAppContext();
  const [form, setForm] = useState({
    name: profile.name,
    city: profile.city,
    skillsOffered: skillListToText(profile.skillsOffered),
    skillsWanted: skillListToText(profile.skillsWanted),
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setForm({
      name: profile.name,
      city: profile.city,
      skillsOffered: skillListToText(profile.skillsOffered),
      skillsWanted: skillListToText(profile.skillsWanted),
    });
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = updateProfile({
      name: form.name,
      city: form.city,
      skillsOffered: textToSkillList(form.skillsOffered),
      skillsWanted: textToSkillList(form.skillsWanted),
    });

    setStatus({
      type: result.ok ? "success" : "error",
      message: result.message,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <section className="rounded-[30px] border border-white/10 bg-white/5 p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Dashboard</p>
            <h1 className="mt-4 font-display text-4xl text-white">Welcome back, {profile.name}</h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Track your time-credit balance, manage sessions, and keep your skill profile updated so the best matches
              rise to the top.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[28px] border border-teal-300/20 bg-teal-400/10 p-6">
                <p className="text-sm text-teal-200">Credit wallet</p>
                <p className="mt-3 text-4xl font-semibold text-white">{wallet}</p>
              </div>
              {cards.map((card) => (
                <div key={card.label} className="rounded-[28px] border border-white/10 bg-ink-900/75 p-6">
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{card.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[30px] border border-white/10 bg-ink-900/80 p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl text-white">Current profile</h2>
                <p className="mt-2 text-slate-400">This is the profile other learners see while matching with you.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Email</p>
                <p className="mt-1 text-sm text-white">{profile.email}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Name</p>
                <p className="mt-2 text-xl text-white">{profile.name}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">City</p>
                <p className="mt-2 text-xl text-white">{profile.city}</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Skills you can teach</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skillsOffered.map((skill) => (
                    <span key={skill} className="rounded-full border border-teal-300/20 bg-teal-400/10 px-3 py-1 text-sm text-teal-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Skills you want to learn</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {profile.skillsWanted.map((skill) => (
                    <span key={skill} className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-[30px] border border-white/10 bg-ink-900/80 p-8">
          <h2 className="font-display text-3xl text-white">Edit profile</h2>
          <p className="mt-3 text-slate-400">Update your details here. Use commas to separate multiple skills.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Full name</span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="Your full name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                value={profile.email}
                disabled
                className="w-full cursor-not-allowed rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">City</span>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="Your city"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Skills you can teach</span>
              <textarea
                name="skillsOffered"
                value={form.skillsOffered}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="React, Python, Guitar"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Skills you want to learn</span>
              <textarea
                name="skillsWanted"
                value={form.skillsWanted}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-teal-300/50"
                placeholder="UI Design, Public Speaking"
              />
            </label>

            {status.message ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : "border-red-400/30 bg-red-400/10 text-red-200"
                }`}
              >
                {status.message}
              </div>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              Save profile changes
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
