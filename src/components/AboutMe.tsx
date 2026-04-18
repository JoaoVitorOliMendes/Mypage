import FadeIn from "./FadeIn";

export default function AboutMe() {
  return (
    <div className="bg-primary py-[10vh] px-[5%] md:px-[8%]">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-accent flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            About Me
          </span>
          <h2 className="text-6xl md:text-8xl italic font-serif leading-[0.95] text-white">
            Who I am<span className="text-accent">.</span>
          </h2>
        </div>
      </FadeIn>

      {/* Content grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 max-w-[1100px] mx-auto">
        <div className="md:col-span-7 flex flex-col justify-center">
          <FadeIn>
            <div className="space-y-6 text-center">
              <p className="font-serif text-white/50 text-[17px] leading-relaxed">
                Computer Science graduate and hands-on developer building
                full-stack applications with Next.js, React and Java/Spring
                Boot. Four years of professional experience delivering
                end-to-end software for international clients, now focused on
                modern web and mobile development.
              </p>
              <p className="font-serif text-white/50 text-[17px] leading-relaxed">
                Comfortable across the stack — from designing REST and SOAP APIs
                and relational databases to shipping responsive TypeScript UIs.
                Equally comfortable shipping side projects solo. Strong
                problem-solver, fluent in English, and used to working in Agile
                and Scrum teams.
              </p>
              <p className="font-serif text-white/50 text-[17px] leading-relaxed">
                Based in Belo Horizonte, Brazil. Native Portuguese speaker,
                working daily with UK-based clients and teams since 2022. This
                website doubles as a playground for front-end experiments — the
                source code is on my GitHub, all suggestions are welcome.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="md:col-span-5 flex items-center justify-center">
          <FadeIn>
            <div className="border border-white/[0.08] rounded-sm overflow-hidden transition-all duration-500 hover:border-accent">
              <img
                src="/imgs/me.jpg"
                alt="João Vitor"
                width={500}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
