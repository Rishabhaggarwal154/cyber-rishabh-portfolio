import { ExternalLink, Lock, Plus, ShieldCheck, Terminal } from 'lucide-react'
import { GithubIcon } from './icons'
import { safeHttpUrl } from '../utils/url'

function FeaturedPreview({ project }) {
  const modules = ['AUTH', 'RBAC', 'DATASETS', 'AUDIT LOG']
  return (
    <div className="relative h-full overflow-hidden bg-[#0a120e] p-5 sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-sm opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-neon/[0.06] blur-[60px]"
      />

      <div className="relative flex h-full min-h-[240px] flex-col">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-[10px] text-muted">
            <Terminal size={12} aria-hidden="true" className="text-neon" />
            flarex.system
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-line bg-ink/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
            <Lock size={9} aria-hidden="true" />
            private
          </span>
        </div>

        <div className="my-5 rounded-lg border border-neon/20 bg-card/80 p-4 shadow-[0_0_40px_-18px_rgba(57,255,136,0.6)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
                intelligence platform
              </p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-bright">
                Flare<span className="text-neon">X</span>
              </p>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-md border border-neon/25 bg-neon/[0.08] text-neon">
              <ShieldCheck size={15} aria-hidden="true" />
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-1.5">
            {modules.map((module) => (
              <div
                key={module}
                className="flex items-center gap-2 rounded border border-line/80 bg-ink/60 px-2 py-1.5"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-neon" aria-hidden="true" />
                <span className="truncate font-mono text-[8.5px] tracking-wider text-[#8fa096]">
                  {module}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="h-1 w-full rounded-full bg-line/80">
              <div className="h-1 w-[68%] rounded-full bg-neon/50" />
            </div>
            <div className="h-1 w-full rounded-full bg-line/80">
              <div className="h-1 w-[42%] rounded-full bg-emerald/60" />
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-1 rounded border border-line/60 bg-ink/40 px-3 py-2 font-mono text-[8.5px] leading-relaxed">
          {[
            ['session.verify', 'ok'],
            ['rbac.scope', 'resolved'],
            ['dataset.index', 'ready'],
          ].map(([label, state]) => (
            <p key={label} className="flex items-center justify-between gap-3">
              <span className="text-[#7f9087]">
                <span className="mr-1.5 text-neon" aria-hidden="true">
                  ›
                </span>
                {label}
              </span>
              <span className="text-neon/80">{state}</span>
            </p>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-line bg-ink/60 px-1.5 py-0.5 font-mono text-[8.5px] text-muted"
            >
              {tech}
            </span>
          ))}
          <span className="rounded px-1.5 py-0.5 font-mono text-[8.5px] text-[#4e5f56]">
            +{Math.max(project.technologies.length - 4, 0)}
          </span>
        </div>

        <p className="mt-3 font-mono text-[8.5px] leading-relaxed text-[#4e5f56]">
          Illustrative interface preview. No production data or private code shown.
        </p>
      </div>
    </div>
  )
}

export default function ProjectCard({ project, featured = false }) {
  const sourceUrl = safeHttpUrl(project.github)
  const demoUrl = safeHttpUrl(project.liveDemo)

  if (!featured) {
    return (
      <article className="flex h-full flex-col rounded-xl border border-dashed border-line bg-card/25 p-5 transition-colors hover:border-neon/25 hover:bg-card/40 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-dashed border-line text-muted">
            <Plus size={16} aria-hidden="true" />
          </span>
          <span className="rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
            {project.category}
          </span>
        </div>

        <h3 className="mt-4 text-sm font-semibold text-bright sm:text-[15px]">{project.name}</h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted">{project.description}</p>

        <p className="mt-5 border-t border-line/70 pt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-[#4e5f56]">
          Reserved slot — added after completion
        </p>
      </article>
    )
  }

  return (
    <article className="overflow-hidden rounded-2xl border border-neon/20 bg-card/60 shadow-[0_0_60px_-35px_rgba(57,255,136,0.55)]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <FeaturedPreview project={project} />
        </div>

        <div className="p-5 sm:p-7 lg:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-neon/30 bg-neon/[0.07] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-neon">
              Featured project
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
              <Lock size={9} aria-hidden="true" />
              {project.visibility}
            </span>
          </div>

          <h3 className="mt-4 text-2xl font-bold tracking-tight text-bright sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-neon/80 sm:text-[11px]">
            {project.category}
          </p>

          <p className="mt-4 text-sm leading-7 text-muted">{project.description}</p>

          <div className="mt-5">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5d6e64]">
              Key capabilities
            </h4>
            <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[11.5px] leading-snug text-[#b7c4bc]">
                  <span aria-hidden="true" className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neon" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.technologies.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-line/70 pt-4">
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary !px-3 !py-1.5 !text-xs"
              >
                <GithubIcon size={14} />
                Source
              </a>
            ) : (
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                <Lock size={11} aria-hidden="true" />
                Source: private repository
              </span>
            )}

            {demoUrl ? (
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !px-3 !py-1.5 !text-xs"
              >
                <ExternalLink size={13} aria-hidden="true" />
                Live demo
              </a>
            ) : (
              <span className="font-mono text-[10px] text-[#5d6e64]">
                Live demo: not published
              </span>
            )}
          </div>

          <p className="mt-3 font-mono text-[9.5px] leading-relaxed text-[#4e5f56]">
            {project.note}
          </p>
        </div>
      </div>
    </article>
  )
}
