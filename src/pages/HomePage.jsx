import { Link } from "react-router-dom";
import Folder from "../components/Folder";
import SectionHeading from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

const featureCards = [
  {
    title: "Find People Near You",
    copy: "Search for people nearby who can teach the skill you want to learn.",
  },
  {
    title: "Earn and Use Credits",
    copy: "Teach for one hour to earn one credit. Use one credit when you learn for one hour.",
  },
  {
    title: "Book Sessions Easily",
    copy: "Send a request, chat before the session, and choose to meet online or offline.",
  },
];

const journeySteps = [
  {
    title: "Create Profile",
    text: "Add what you teach and what you want to learn.",
  },
  {
    title: "Find & Book",
    text: "Choose a nearby person and send a session request.",
  },
  {
    title: "Learn & Review",
    text: "Finish the session, use credits, and leave feedback.",
  },
];

export default function HomePage() {
  const { featuredSkills, platformStats, isAuthenticated } = useAppContext();

  const folderColors = ["#14B8A6", "#FB7185", "#F59E0B", "#7C3AED"];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 lg:px-8">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] px-6 py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 top-10 h-56 w-56 animate-drift rounded-full bg-teal-400/12 blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 animate-drift rounded-full bg-coral-400/10 blur-3xl [animation-delay:2s]" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 animate-float rounded-full bg-gold-400/10 blur-3xl" />
          <div className="absolute inset-x-10 top-12 h-px bg-gradient-to-r from-transparent via-teal-300/20 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.08),transparent_22%),radial-gradient(circle_at_80%_25%,rgba(251,113,133,0.08),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(251,191,36,0.06),transparent_24%)]" />
        </div>

        <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 opacity-0">
              <span className="h-2 w-2 rounded-full bg-teal-300 shadow-[0_0_18px_rgba(110,231,216,0.95)]" />
              Community-first skill exchange for neighborhoods
            </div>
            <h1 className="mt-8 max-w-4xl animate-rise font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white opacity-0 [animation-delay:160ms] sm:text-6xl lg:text-7xl">
              Swap knowledge locally. Learn without paying. Teach with impact.
            </h1>
            <p className="mt-6 max-w-2xl animate-rise text-lg leading-8 text-slate-300 opacity-0 [animation-delay:280ms]">
              SwapMantra helps people learn from each other in their local area. You can find someone nearby, book a
              session, and exchange skills using time credits instead of money.
            </p>
            <div className="mt-10 flex animate-rise flex-col gap-4 opacity-0 sm:flex-row [animation-delay:420ms]">
              {isAuthenticated ? (
                <Link
                  to="/discover"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-ink-950 transition hover:scale-[1.02]"
                >
                  Start Swapping
                </Link>
              ) : (
                <Link
                  to="/auth?auth=register"
                  className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-ink-950 transition hover:scale-[1.02]"
                >
                  Register / Login
                </Link>
              )}
              <Link
                to="/dashboard"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-teal-300/40 hover:bg-teal-400/10"
              >
                View Dashboard
              </Link>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {platformStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="animate-rise rounded-3xl border border-white/10 bg-white/5 p-5 opacity-0 backdrop-blur [animation-delay:540ms]"
                  style={{ animationDelay: `${540 + index * 140}ms` }}
                >
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-rise opacity-0 [animation-delay:260ms]">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-teal-400/15 blur-2xl" />
            <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-coral-400/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,23,41,0.96),rgba(10,15,30,0.92))] p-8 shadow-glow backdrop-blur-xl">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(45,212,191,0.06),transparent_35%,transparent_65%,rgba(251,113,133,0.06))]" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">SwapMantra identity</p>
                <div className="mt-8 flex items-center gap-5">
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <span className="absolute h-24 w-24 animate-pulse rounded-[28px] border border-teal-300/25 bg-teal-400/10" />
                    <span className="absolute h-16 w-16 rounded-[22px] border border-white/10 bg-white/5" />
                    <span className="absolute left-3 top-3 h-6 w-6 animate-float rounded-full bg-teal-300 shadow-[0_0_24px_rgba(110,231,216,0.45)]" />
                    <span className="absolute bottom-4 right-2 h-5 w-5 animate-float rounded-full bg-coral-300 shadow-[0_0_24px_rgba(253,164,175,0.35)] [animation-delay:1.5s]" />
                    <span className="font-display text-3xl font-semibold text-white">S</span>
                  </div>
                  <div>
                    <h2 className="font-display text-5xl text-white">SwapMantra</h2>
                    <p className="mt-2 max-w-sm text-base leading-7 text-slate-300">
                      A clean, local-first skill swapping space designed for community, trust, and momentum.
                    </p>
                  </div>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Signal</p>
                    <p className="mt-3 text-2xl font-semibold text-white">Learn nearby</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Discover local experts, connect faster, and keep the exchange human.
                    </p>
                  </div>
                  <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Energy</p>
                    <p className="mt-3 text-2xl font-semibold text-white">Trade time</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Swap value through skills and credits instead of making everything about money.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {["Design", "Code", "Language", "Music", "Mentoring"].map((item, index) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-200"
                      style={{ animationDelay: `${index * 120}ms` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="How it works"
          title="A simple way to learn and teach with people around you"
          description="Everything is designed to be easy to understand: find people, book sessions, and exchange time credits."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featureCards.map((feature, index) => (
            <article
              key={feature.title}
              className="animate-rise rounded-[28px] border border-white/10 bg-white/5 p-6 opacity-0 backdrop-blur-xl transition hover:-translate-y-1 hover:border-teal-300/30 hover:bg-white/[0.08]"
              style={{ animationDelay: `${180 + index * 140}ms` }}
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400/25 to-coral-400/20 text-lg font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="font-display text-2xl text-white">{feature.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{feature.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <SectionHeading
            eyebrow="Popular skills"
            title="Skills people nearby are looking for"
            description="These are some popular skills that can help users quickly start exploring the platform."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="animate-rise rounded-[28px] border border-white/10 bg-white/5 p-6 opacity-0 backdrop-blur-lg"
              style={{ animationDelay: `${220 + index * 120}ms` }}
            >
              <div className="flex min-h-[250px] flex-col items-center justify-between gap-6 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Trending</p>
                <div className="relative flex h-[150px] w-full items-center justify-center overflow-visible">
                  <Folder
                    size={1.55}
                    color={folderColors[index % folderColors.length]}
                    items={[
                      <div key={`${skill.name}-1`} className="paper__content">
                        <span className="paper__title">{skill.name}</span>
                        <span className="paper__meta">{skill.learners} learners</span>
                      </div>,
                      <div key={`${skill.name}-2`} className="paper__content">
                        <span className="paper__title">Nearby</span>
                        <span className="paper__meta">Ready to connect</span>
                      </div>,
                      <div key={`${skill.name}-3`} className="paper__content">
                        <span className="paper__title">Book</span>
                        <span className="paper__meta">Start a session</span>
                      </div>,
                    ]}
                  />
                </div>
                <div>
                  <h3 className="font-display text-3xl text-white">{skill.name}</h3>
                  <p className="mt-3 text-sm text-slate-300">{skill.learners} nearby learners looking for sessions</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-coral-300">Flow</p>
          <h2 className="mt-4 font-display text-4xl text-white">Simple learning flow</h2>
          <p className="mt-3 max-w-xl text-slate-300">Follow these three quick steps to start a local skill exchange.</p>
          <div className="mt-8 grid gap-4">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="grid gap-4">
                <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-ink-900/70 p-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-coral-400/15 text-base font-semibold text-coral-200">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{step.text}</p>
                  </div>
                </div>
                {index < journeySteps.length - 1 ? (
                  <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg font-semibold text-teal-200">
                      v
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[30px] border border-teal-300/20 bg-ink-900/[0.85] p-8 shadow-glow">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">What you can do</p>
          <h2 className="mt-4 font-display text-4xl text-white">Everything you need to start a skill exchange</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Create Profile", "Find Matches", "Use Credits", "Book Sessions", "Chat", "Give Reviews"].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-5 text-white">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/sessions"
              className="rounded-full bg-teal-400 px-6 py-3 text-center text-sm font-semibold text-ink-950 transition hover:bg-teal-300"
            >
              View Sessions
            </Link>
            <Link
              to="/discover"
              className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-white/30"
            >
              Explore People
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
