import FadeIn from "./FadeIn";
import { experiences, education, type ExperienceItem } from "@/data/experience";

function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-[160px_40px_1fr] gap-3 md:gap-5 py-8 relative">
        {/* Date */}
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-white/40 md:text-right md:pt-2">
          {item.dateStart}
          <span className="block text-accent">{item.dateEnd}</span>
        </div>

        {/* Dot on timeline */}
        <div className="hidden md:flex justify-center pt-3">
          <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-accent shadow-[0_0_12px_theme(colors.accent)] relative">
            <div className="absolute inset-[2px] rounded-full bg-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="pb-4">
          <h3 className="font-serif italic text-2xl md:text-3xl text-white leading-[1] mb-1.5">
            {item.role.split(" at ")[0]}
            {item.company && (
              <span className="text-accent"> at {item.company}</span>
            )}
          </h3>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/40 mb-4">
            {item.location}
          </div>
          {item.description.map((desc, i) => (
            <p
              key={i}
              className="font-serif text-white/50 text-[17px] leading-relaxed mb-2 max-w-[620px]"
            >
              {desc}
            </p>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

export default function Experience() {
  return (
    <div className="bg-primary py-[10vh] px-[5%] md:px-[8%]">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-accent flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            Work & Experience
          </span>
          <h2 className="text-6xl md:text-8xl italic font-serif leading-[0.95] text-white">
            The long<br />
            <span className="text-accent">burn</span>
            <span className="text-white">.</span>
          </h2>
        </div>
      </FadeIn>

      {/* Timeline */}
      <div className="relative max-w-[1100px] mx-auto">
        {/* Vertical line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[180px] w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

        {experiences.map((item, i) => (
          <TimelineItem key={i} item={item} />
        ))}
      </div>

      {/* Education */}
      <FadeIn>
        <div className="mt-20 mb-12">
          <span className="font-mono text-[16px] tracking-[0.24em] uppercase text-accent flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            Education
          </span>
        </div>
      </FadeIn>

      <div className="relative max-w-[1100px] mx-auto">
        <div className="hidden md:block absolute top-0 bottom-0 left-[180px] w-px bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

        {education.map((item, i) => (
          <TimelineItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}
