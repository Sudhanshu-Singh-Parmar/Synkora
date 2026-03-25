import { useAppContext } from "../context/AppContext";

const cards = [
  { label: "Upcoming sessions", value: "03" },
  { label: "Completed swaps", value: "19" },
  { label: "Average rating", value: "4.8" },
];

export default function DashboardPage() {
  const { wallet, profile } = useAppContext();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="rounded-[30px] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-teal-300">Dashboard</p>
          <h1 className="mt-4 font-display text-4xl text-white">Welcome back, {profile.name}</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Track your time-credit balance, manage sessions, and monitor how your skill exchange activity is growing.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
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
          <h2 className="font-display text-3xl text-white">Activity snapshot</h2>
          <div className="mt-8 space-y-4">
            {[
              "Taught UI Design for 1 hour and earned 1 credit",
              "Booked a guitar session for Saturday evening",
              "Received a 5-star review from Neha",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
