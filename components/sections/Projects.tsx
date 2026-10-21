import { projects } from "@/content/projects";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <div className="sectionLabel">02 / Projects</div>
        <h2 className="sectionTitle">做过的东西</h2>
      </Reveal>

      <div className="projectsGrid">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={0.06 * i}>
            <article className="card">
              <div
                className="cardMedia"
                style={{
                  background: `linear-gradient(145deg, ${project.tone[0]}, ${project.tone[1]})`,
                }}
              >
                <span className="cardIndex">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="cardBody">
                <span className="cardTag">{project.tag}</span>
                <h3 className="cardTitle">{project.title}</h3>
                <p className="cardDesc">{project.summary}</p>
                <div className="cardTech">
                  {project.tech.map((item) => (
                    <span className="techPill" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
