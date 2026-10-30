import { Badge, Card, Reveal, Section, SectionHeader } from "@/components/ui";
import { skillGroups, skillsIntro } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" className="bg-background-secondary/30">
      <SectionHeader intro={skillsIntro} titleId="skills-title" />

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {skillGroups.map((group, index) => {
          const GroupIcon = group.icon;

          return (
            // Three cards on the first row, two wider cards on the second, keeps the grid balanced.
            <Reveal
              key={group.id}
              as="li"
              staggerIndex={index}
              className={index < 3 ? "lg:col-span-2" : "lg:col-span-3"}
            >
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <GroupIcon aria-hidden="true" size={18} strokeWidth={1.75} className="text-accent-cyan" />
                  <h3 className="text-base font-semibold text-foreground-primary">{group.title}</h3>
                </div>
                <p className="mt-2 text-sm text-foreground-muted">{group.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} technologies`}>
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Badge>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
