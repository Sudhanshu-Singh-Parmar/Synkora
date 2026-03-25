export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl animate-rise opacity-0 [animation-delay:120ms]">
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-300">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
    </div>
  );
}
