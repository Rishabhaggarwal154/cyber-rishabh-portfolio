import Reveal from './Reveal'

export default function SectionHeading({
  index = '00',
  label = 'section',
  title,
  description,
  id,
  className = '',
}) {
  return (
    <Reveal className={`mb-10 sm:mb-14 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-neon">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        <span className="eyebrow">{label}</span>
      </div>

      <h2
        id={id}
        className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-bright sm:text-4xl lg:text-[2.6rem]"
      >
        {title}
      </h2>

      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
