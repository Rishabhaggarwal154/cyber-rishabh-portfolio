import { Code2, Globe, ShieldCheck, Wrench } from 'lucide-react'
import Reveal from './Reveal'

const ICONS = {
  code: Code2,
  globe: Globe,
  shield: ShieldCheck,
  wrench: Wrench,
}

const LEVEL_STYLES = {
  Learning: 'border-neon/30 bg-neon/[0.07] text-neon',
  Practicing: 'border-emerald/40 bg-emerald/[0.1] text-[#7ee2a6]',
  Familiar: 'border-line bg-white/[0.03] text-muted',
}

export default function SkillCard({ group, index = 0 }) {
  const Icon = ICONS[group.icon] ?? Code2

  return (
    <Reveal delay={index * 0.07} className="h-full">
      <article className="group flex h-full flex-col rounded-xl border border-line bg-card/50 p-5 transition-colors duration-300 hover:border-neon/25 hover:bg-card/80 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neon/20 bg-neon/[0.06] text-neon">
            <Icon size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-bright sm:text-[15px]">{group.title}</h3>
            <p className="mt-0.5 text-[11px] leading-snug text-muted">{group.caption}</p>
          </div>
          <span className="ml-auto font-mono text-[10px] text-[#4e5f56]">
            {String(group.items.length).padStart(2, '0')}
          </span>
        </div>

        <ul className="mt-5 space-y-2">
          {group.items.map((skill) => (
            <li
              key={skill.name}
              className="flex items-center justify-between gap-3 rounded-md border border-line/70 bg-ink/40 px-3 py-2 transition-colors group-hover:border-line"
            >
              <span className="min-w-0 text-[12.5px] leading-snug text-[#c9d4cc]">
                {skill.name}
              </span>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                  LEVEL_STYLES[skill.level] ?? LEVEL_STYLES.Familiar
                }`}
              >
                {skill.level}
              </span>
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  )
}
