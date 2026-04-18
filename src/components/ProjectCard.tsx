import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  isFloating?: boolean;
}

export default function ProjectCard({ project, index, isFloating }: ProjectCardProps) {
  return (
    <div
      className={`group block bg-primary rounded-sm overflow-hidden h-full cursor-grab active:cursor-grabbing transition-colors duration-300 ${
        isFloating
          ? "border-2 border-accent"
          : "border border-white/[0.08] hover:border-accent"
      }`}
    >
      <div className="p-7 flex flex-col justify-between h-full min-h-[240px]">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/40">
              {project.language}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-accent transition-colors"
            >
              <FaGithub className="text-sm" />
            </a>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-accent transition-colors"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-serif italic text-3xl md:text-4xl text-white mb-3 leading-[0.95]">
            {project.name}
          </h3>
          <p className="font-serif text-white/40 text-[15px] leading-relaxed mb-4 max-w-[480px]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[9px] tracking-[0.16em] uppercase text-accent/80 px-2 py-1 border border-accent/30 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase text-white/60 hover:text-accent border border-white/[0.12] hover:border-accent px-3 py-1.5 rounded-sm transition-all duration-300 no-underline"
            >
              View project
              <FaExternalLinkAlt className="text-[8px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
