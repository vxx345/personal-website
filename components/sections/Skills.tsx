import { skillGroups } from "@/content/projects";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal>
        <div className="sectionLabel">03 / Skills</div>
        <h2 className="sectionTitle">技术栈</h2>
      </Reveal>

      <div className="skillsWrap">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={0.06 * i}>
            <div>
              <div className="skillGroupTitle">{group.title}</div>
              <div className="skillPills">
                {group.items.map((item) => (
                  <span className="skillPill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
