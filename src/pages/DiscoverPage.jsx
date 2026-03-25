import SectionHeading from "../components/SectionHeading";
import { useAppContext } from "../context/AppContext";

export default function DiscoverPage() {
  const { nearbyMembers, featuredSkills } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Discover"
        title="Skill matching powered by proximity, interests, and availability"
        description="This route shows how the product can evolve beyond the landing page into a practical discovery surface."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h3 className="font-display text-2xl text-white">Filters</h3>
          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">Skill level: Beginner to Expert</div>
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">Availability: Evening and weekend</div>
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">Ratings: 4.5 and above</div>
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-4">Radius: Within 5 km</div>
          </div>
        </aside>
        <div className="grid gap-4">
          {nearbyMembers.map((member) => (
            <article key={member.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white">{member.name}</h3>
                  <p className="mt-2 text-slate-300">
                    Teaches {member.teaches} · Wants {member.wants}
                  </p>
                </div>
                <div className="rounded-2xl bg-teal-400/10 px-4 py-3 text-sm text-teal-200">
                  {member.distance} away · {member.rating} stars
                </div>
              </div>
            </article>
          ))}
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredSkills.map((skill) => (
              <div key={skill.name} className="rounded-[28px] border border-white/10 bg-ink-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Suggested</p>
                <h3 className="mt-4 font-display text-2xl text-white">{skill.name}</h3>
                <p className="mt-3 text-slate-300">Recommended based on nearby demand and interest overlap.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
