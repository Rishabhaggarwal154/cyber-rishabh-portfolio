import { Award, BadgeCheck, GraduationCap, Info, Lock } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'
import { safeHttpUrl } from '../utils/url'

export default function Certifications() {
  const { education, certifications } = portfolio

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-heading"
      className="relative border-t border-line/60 bg-panel/50 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="certifications-heading"
          index="05"
          label="education & certifications"
          title="Qualifications, without inflation."
          description="Only the education and certifications that have actually been earned appear here. Future entries live in one configuration file and are added after completion."
        />

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Education */}
          <Reveal>
            <article className="relative overflow-hidden rounded-xl border border-line bg-card/60 p-5 sm:p-7">
              <div aria-hidden="true" className="absolute right-0 top-0 h-32 w-32 bg-neon/[0.04] blur-[50px]" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-neon/25 bg-neon/[0.07] text-neon">
                    <GraduationCap size={19} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5d6e64]">
                      education
                    </p>
                    <h3 className="mt-1 text-base font-semibold text-bright">Undergraduate degree</h3>
                  </div>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-neon/25 bg-neon/[0.06] px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-neon">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden="true" />
                  Pursuing
                </span>
              </div>

              <div className="relative mt-6 border-l border-line pl-4">
                <p className="text-lg font-semibold leading-snug text-bright">{education.degree}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{education.institution}</p>
                <p className="mt-3 inline-flex rounded-md border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-neon">
                  {education.status}
                </p>
              </div>

              <div className="relative mt-6 border-t border-line/70 pt-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5d6e64]">
                  Academic focus
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{education.focus}</p>
              </div>
            </article>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.08}>
            <div className="space-y-4">
              {certifications.earned.map((certificate) => {
                const verifyUrl = safeHttpUrl(certificate.verifyUrl)
                return (
                <article
                  key={certificate.name}
                  className="rounded-xl border border-line bg-card/60 p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-neon/25 bg-neon/[0.07] text-neon">
                      <Award size={17} aria-hidden="true" />
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald/40 bg-emerald/[0.1] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#7ee2a6]">
                      <BadgeCheck size={10} aria-hidden="true" />
                      Passed
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-bright">{certificate.name}</h3>
                  <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{certificate.issuer}</p>
                  <p className="mt-3 inline-flex rounded-md border border-line bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-[#b7c4bc]">
                    {certificate.status}
                  </p>
                  <p className="mt-3 border-t border-line/70 pt-3 text-[10.5px] leading-relaxed text-[#5d6e64]">
                    {certificate.note}
                  </p>

                  {verifyUrl ? (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex text-[11px] font-medium text-neon underline-offset-4 hover:underline"
                    >
                      Verify credential
                    </a>
                  ) : (
                    <p className="mt-3 flex items-center gap-1.5 font-mono text-[9.5px] text-[#4e5f56]">
                      <Lock size={10} aria-hidden="true" />
                      No public credential URL configured
                    </p>
                  )}
                </article>
                )
              })}

              <div className="rounded-xl border border-dashed border-line bg-card/20 p-4">
                <div className="flex items-start gap-2.5">
                  <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[#5d6e64]" />
                  <div>
                    <p className="text-[11px] font-medium text-[#b7c4bc]">Future certifications</p>
                    <p className="mt-1 text-[10.5px] leading-relaxed text-muted">
                      {certifications.upcoming.map((item) => item.note).join(' ')} Entries are added
                      through the central portfolio configuration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-6 font-mono text-[10px] leading-relaxed text-[#5d6e64]">
          // No unearned certificates, courses, or credentials are claimed on this site.
        </p>
      </div>
    </section>
  )
}
