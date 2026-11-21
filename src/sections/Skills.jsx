import { Info } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import SkillCard from '../components/SkillCard'
import { portfolio } from '../data/portfolio'

const LEGEND = [
  { label: 'Learning', note: 'Actively studying the fundamentals' },
  { label: 'Practicing', note: 'Applying it in personal projects' },
  { label: 'Familiar', note: 'Comfortable with the basics' },
]

export default function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative border-t border-line/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="skills-heading"
          index="02"
          label="skills"
          title="Technical foundation, stated honestly."
          description="No percentages, no invented proficiency scores. These labels describe current exposure — not expertise."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {portfolio.skills.map((group, index) => (
            <SkillCard key={group.id} group={group} index={index} />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-line bg-card/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Info size={14} aria-hidden="true" className="shrink-0 text-neon" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              // level key
            </span>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGEND.map((item) => (
              <li key={item.label} className="text-[11px] text-muted">
                <span className="font-medium text-bright">{item.label}</span>
                <span className="mx-1.5 text-line">/</span>
                {item.note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
