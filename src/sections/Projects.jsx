import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { portfolio } from '../data/portfolio'

export default function Projects() {
  const { featured, future } = portfolio.projects

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-t border-line/60 bg-panel/50 py-20 sm:py-24 lg:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-emerald/[0.04] blur-[100px]" />
      </div>

      <div className="container-page relative">
        <SectionHeading
          id="projects-heading"
          index="03"
          label="projects"
          title="Work that exists, shown with its boundaries."
          description="Built projects are documented here. Private source stays private, and unfinished ideas are labelled as reserved slots — never as completed work."
        />

        <div className="mb-3 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neon">
            // featured_build
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-line/70" />
          <span className="font-mono text-[10px] text-[#5d6e64]">01</span>
        </div>

        <Reveal>
          <ProjectCard project={featured} featured />
        </Reveal>

        <div className="mb-4 mt-12 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            // reserved_slots
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-line/70" />
          <span className="font-mono text-[10px] text-[#5d6e64]">
            {String(future.length).padStart(2, '0')}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {future.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <p className="mt-5 font-mono text-[10px] leading-relaxed text-[#5d6e64]">
          // No fabricated projects. A placeholder becomes a project only when the build and its
          documentation are complete.
        </p>
      </div>
    </section>
  )
}
