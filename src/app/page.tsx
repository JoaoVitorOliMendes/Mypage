import Banner from "@/components/Banner";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import AboutMe from "@/components/AboutMe";

export default function Home() {
  return (
    <main>
      <section
        id="home"
        className="relative flex h-screen w-full flex-col items-center scroll-mt-16 overflow-hidden"
      >
        <Banner />
      </section>
      <section id="projects" className="relative scroll-mt-16 pt-32">
        {/* Gradient fade from hero into projects */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surface pointer-events-none z-10" />
        <Projects />
      </section>
      <section id="work" className="scroll-mt-16">
        <Experience />
      </section>
      <section id="certs" className="scroll-mt-16">
        <Certifications />
      </section>
      <section id="aboutme" className="scroll-mt-16">
        <AboutMe />
      </section>
    </main>
  );
}
