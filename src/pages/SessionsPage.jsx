const sessionCards = [
  {
    title: "Upcoming",
    items: ["Spanish conversation with Arjun", "Guitar basics with Mira"],
  },
  {
    title: "Pending requests",
    items: ["Python mentoring request from Tara", "Photography swap request from Kabir"],
  },
  {
    title: "Recent reviews",
    items: ["5 stars for Canva crash course", "4 stars for neighborhood design meetup"],
  },
];

export default function SessionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold-300">Sessions</p>
        <h1 className="mt-4 font-display text-4xl text-white">Booking, coordination, and feedback in one route</h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          This page is structured to support requests, accept or reject actions, scheduling, and post-session feedback.
        </p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {sessionCards.map((card) => (
          <section key={card.title} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <h2 className="font-display text-2xl text-white">{card.title}</h2>
            <div className="mt-6 space-y-3">
              {card.items.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-ink-900/70 p-4 text-slate-300">
                  {item}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
