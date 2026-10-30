import { Reveal, Section, SectionHeader } from "@/components/ui";
import { featuredProjects, projectsIntro } from "@/data/projects";
import { ProjectCard } from "@/sections/Projects/ProjectCard";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title">
      <SectionHeader intro={projectsIntro} titleId="projects-title" />

      {featuredProjects.length > 0 ? (
        <ol className="mt-14 space-y-6" aria-label="Featured projects">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} as="li">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </ol>
      ) : (
        <p className="mt-14 rounded-xl border border-dashed border-white/10 p-10 text-center text-foreground-muted">
          New case studies are being written up. In the meantime,{" "}
          <a href="#contact" className="text-accent-cyan underline-offset-4 hover:underline">
            ask me about recent work
          </a>
          .
        </p>
      )}
    </Section>
  );
}
