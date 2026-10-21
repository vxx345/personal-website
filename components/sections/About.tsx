import { site } from "@/content/site.config";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <Reveal>
        <div className="sectionLabel">01 / About</div>
        <h2 className="sectionTitle">
          从实验数据
          <br />
          到线上服务
        </h2>
      </Reveal>

      <div className="aboutGrid">
        <Reveal delay={0.08}>
          <div className="aboutText">
            {site.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div>
            {site.facts.map((fact) => (
              <div className="factRow" key={fact.label}>
                <span className="factLabel">{fact.label}</span>
                <span className="factValue">{fact.value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
