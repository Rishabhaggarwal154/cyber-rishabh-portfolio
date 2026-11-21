import { ArrowLeft, Home as HomeIcon, SearchX } from 'lucide-react'

/* Warm the home route so "Back to home" is instant on static hosting. */
try {
  const prefetch = document.createElement('link')
  prefetch.rel = 'prefetch'
  prefetch.href = '/'
  prefetch.as = 'document'
  document.head.appendChild(prefetch)
} catch {
  /* Prefetch is an optional optimization. */
}

export default function NotFound() {
  return (
    <main id="main-content" className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-fade" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/[0.04] blur-[100px]" />
      </div>

      <div className="relative w-full max-w-xl">
        <div className="overflow-hidden rounded-xl border border-line bg-card/70 shadow-glow">
          <div className="flex items-center gap-2 border-b border-line bg-[#0f1a14] px-4 py-3">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            <span className="ml-2 font-mono text-[10px] text-muted">route.not_found</span>
          </div>

          <div className="p-6 sm:p-8">
            <p className="font-mono text-xs text-neon">$ curl requested-route</p>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-ink text-[#fbbf24]">
                <SearchX size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#5d6e64]">
                  HTTP 404
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-bright sm:text-3xl">
                  Route not found
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              This portfolio is a single-page site. The requested path does not exist, but every
              section is available from the home page.
            </p>

            <div className="mt-6 flex flex-col gap-2.5 min-[380px]:flex-row">
              <a href="/" className="btn btn-primary">
                <HomeIcon size={15} aria-hidden="true" />
                Back to home
              </a>
              <a href="/#projects" className="btn btn-secondary">
                <ArrowLeft size={15} aria-hidden="true" />
                View projects
              </a>
            </div>

            <p className="mt-5 font-mono text-[9.5px] text-[#4e5f56]">
              // exit code 404 — the rest of the portfolio is intact.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
