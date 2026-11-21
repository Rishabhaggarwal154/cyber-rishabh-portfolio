import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import SecurityLabs from '../sections/SecurityLabs'
import Certifications from '../sections/Certifications'
import Resume from '../sections/Resume'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <SecurityLabs />
      <Certifications />
      <Resume />
      <Contact />
    </main>
  )
}
