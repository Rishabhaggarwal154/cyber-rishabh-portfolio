import { BookOpen, GraduationCap, MapPin, Target } from 'lucide-react'
import ProfileAvatar from '../components/ProfileAvatar'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

export default function About() {
  const { about, education, identity } = portfolio

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative border-t border-line/60 bg-panel/50 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-neon/[0.03] blur-[90px]" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          id="about-heading"
          index="01"
          label="about"
          title="A developer's mindset, a security-first direction."
          description="Grounded in the fundamentals, learning in public, and building only what can be explained honestly."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          {/* Narrative */}
          <Reveal>
            <div className="rounded-xl border border-line bg-card/50">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="font-mono text-xs text-neon">$</span>
                <span className="font-mono text-[11px] text-muted">cat ~/about_rishabh.txt</span>
                <span aria-hidden="true" className="ml-auto h-1.5 w-1.5 rounded-full bg-neon/70" />
              </div>

              <div className="space-y-4 p-5 sm:p-6">
                {about.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={
                      index === 0
                        ? 'text-[15px] leading-7 text-bright sm:text-base'
                        : 'text-sm leading-7 text-muted sm:text-[15px]'
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Learning journey */}
            <div className="mt-6 rounded-xl border border-line bg-card/40 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <BookOpen size={15} aria-hidden="true" className="text-neon" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bright">
                  learning_journey.log
                </h3>
              </div>

              <ol className="mt-5 space-y-0">
                {about.journey.map((step, index) => (
                  <li key={step.phase} className="relative flex gap-4 pb-5 last:pb-0">
                    {index !== about.journey.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-[5px] top-4 h-full w-px bg-line"
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border ${
                        step.state === 'In progress'
                          ? 'border-neon bg-neon/20'
                          : 'border-line bg-ink'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-bright">{step.phase}</p>
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                            step.state === 'In progress'
                              ? 'border-neon/25 bg-neon/[0.06] text-neon'
                              : 'border-line bg-white/[0.02] text-muted'
                          }`}
                        >
                          {step.state}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{step.note}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Profile / education / interests */}
          <Reveal delay={0.1} className="space-y-5">
            <div className="relative overflow-hidden rounded-xl border border-line bg-card/70 p-5 sm:p-6">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neon/[0.06] to-transparent" />
              <div className="relative flex items-center gap-4">
                <ProfileAvatar size={88} />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-bright">{identity.name}</h3>
                  <p className="mt-1 text-xs text-neon">{identity.primaryRole}</p>
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted">
                    <MapPin size={11} aria-hidden="true" className="shrink-0 text-[#5d6e64]" />
                    Hi-Tech Institute, Ghaziabad
                  </p>
                </div>
              </div>

              <div className="relative mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line/70">
                <div className="bg-ink/70 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#5d6e64]">
                    Degree
                  </p>
                  <p className="mt-1 text-xs font-medium text-bright">BCA</p>
                </div>
                <div className="bg-ink/70 p-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#5d6e64]">
                    Status
                  </p>
                  <p className="mt-1 text-xs font-medium text-neon">Pursuing</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-card/50 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} aria-hidden="true" className="text-neon" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bright">
                  education
                </h3>
              </div>

              <p className="mt-4 text-sm font-semibold leading-snug text-bright">
                {education.degree}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{education.institution}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-neon/25 bg-neon/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-neon">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
                {education.status}
              </p>
              <p className="mt-3 border-t border-line/70 pt-3 text-[11px] leading-relaxed text-muted">
                <span className="text-bright">Focus: </span>
                {education.focus}
              </p>
            </div>

            <div className="rounded-xl border border-line bg-card/50 p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <Target size={15} aria-hidden="true" className="text-neon" />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-bright">
                  career_interests
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li
                    key={interest}
                    className="rounded-md border border-line bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-[#b7c4bc] transition-colors hover:border-neon/30 hover:text-bright"
                  >
                    {interest}
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-mono text-[10px] leading-relaxed text-[#5d6e64]">
                // exploratory interests, not claimed professional experience
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
