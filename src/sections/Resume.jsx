import {
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'
import { useResumeStatus } from '../hooks/useResumeStatus'

const RESUME_URL = portfolio.media.resume

function DocumentMock({ available }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div
        aria-hidden="true"
        className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line bg-[#0d1511] p-5 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.9)] sm:p-6"
      >
        <div aria-hidden="true" className="absolute inset-0 bg-grid-sm opacity-20" />

        <div className="relative">
          <p className="font-mono text-[8px] uppercase tracking-[0.24em] text-neon">
            curriculum vitae
          </p>
          <p className="mt-2 text-lg font-bold leading-tight text-bright">{portfolio.identity.name}</p>
          <p className="mt-1 text-[8px] text-muted">{portfolio.identity.primaryRole}</p>
          <div className="mt-3 h-px w-full bg-line" />

          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-16 rounded-full bg-neon/40" />
            <div className="h-1 w-full rounded-full bg-line" />
            <div className="h-1 w-[92%] rounded-full bg-line" />
            <div className="h-1 w-[78%] rounded-full bg-line" />
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-20 rounded-full bg-neon/30" />
            <div className="h-1 w-full rounded-full bg-line" />
            <div className="h-1 w-[86%] rounded-full bg-line" />
            <div className="h-1 w-[94%] rounded-full bg-line" />
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="h-1.5 w-14 rounded-full bg-neon/30" />
            <div className="h-1 w-[90%] rounded-full bg-line" />
            <div className="h-1 w-[68%] rounded-full bg-line" />
          </div>

          <div className="absolute inset-x-0 top-[54%] flex justify-center">
            <span className="rounded border border-line bg-ink/80 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted">
              {available ? 'PDF ready' : 'preview placeholder'}
            </span>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute -right-2 -top-2 rounded border border-neon/25 bg-ink px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-neon"
      >
        PDF
      </span>
    </div>
  )
}

export default function Resume() {
  const status = useResumeStatus()
  const available = status === 'available'

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="relative border-t border-line/60 py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="resume-heading"
          index="06"
          label="resume"
          title="A resume only when the real document exists."
          description="The site checks for the configured PDF instead of linking to a file that may not be there. Nothing is generated or invented on your behalf."
        />

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Reveal className="order-2 lg:order-1">
            <div className="relative rounded-xl border border-line bg-card/40 p-5 sm:p-6">
              {available ? (
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md transition-opacity hover:opacity-90"
                  aria-label="Open resume PDF in a new tab"
                >
                  <DocumentMock available />
                </a>
              ) : (
                <DocumentMock available={false} />
              )}

              <p className="mt-4 text-center font-mono text-[9.5px] text-[#5d6e64]">
                {available
                  ? '// preview placeholder — open the PDF for the real document'
                  : '// waiting for the real PDF — no placeholder resume is downloadable'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <FileText size={16} aria-hidden="true" className="text-neon" />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                resume.status
              </span>
            </div>

            <div aria-live="polite" className="mt-4">
              {status === 'checking' ? (
                <div className="flex items-center gap-2.5 rounded-lg border border-line bg-card/50 px-4 py-3 text-sm text-muted">
                  <Loader2 size={15} aria-hidden="true" className="animate-spin text-neon" />
                  Checking for the configured PDF…
                </div>
              ) : null}

              {available ? (
                <div className="rounded-lg border border-emerald/30 bg-emerald/[0.06] px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#8ff0b5]">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    Resume PDF is available
                  </p>
                  <p className="mt-1 pl-6 text-[11px] leading-relaxed text-muted">
                    The file was found at the configured path.
                  </p>
                </div>
              ) : null}

              {status === 'missing' ? (
                <div className="rounded-lg border border-line bg-card/50 px-4 py-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-bright">
                    <AlertTriangle size={15} aria-hidden="true" className="text-[#fbbf24]" />
                    Resume not uploaded yet
                  </p>
                  <p className="mt-1.5 pl-[26px] text-[11.5px] leading-relaxed text-muted">
                    The download is disabled so the button cannot lead to a broken file. Add the
                    real PDF at the path below and it will be detected automatically on reload.
                  </p>
                </div>
              ) : null}
            </div>

            <div className="mt-5 space-y-2 rounded-lg border border-line bg-ink/40 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5d6e64]">
                Expected file
              </p>
              <code className="block break-all rounded border border-line/70 bg-ink/70 px-2.5 py-2 font-mono text-[10.5px] text-neon">
                public{portfolio.media.resume}
              </code>
              <p className="text-[10.5px] leading-relaxed text-muted">{portfolio.resume.note}</p>
            </div>

            <ul className="mt-5 space-y-2">
              {portfolio.resume.sections.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11.5px] leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-col gap-2.5 min-[380px]:flex-row">
              {available ? (
                <>
                  <a
                    href={RESUME_URL}
                    download={portfolio.media.resumeFilename}
                    className="btn btn-primary"
                  >
                    <Download size={16} aria-hidden="true" />
                    Download PDF
                  </a>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Open in new tab
                  </a>
                </>
              ) : (
                <>
                  <button type="button" className="btn btn-secondary" disabled aria-describedby="resume-missing-note">
                    <Download size={16} aria-hidden="true" />
                    Download PDF
                  </button>
                  <span
                    id="resume-missing-note"
                    className="flex items-center font-mono text-[10px] text-[#5d6e64]"
                  >
                    Upload the PDF to enable this button.
                  </span>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
