import { site } from "@/content/site.config";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal>
        <div className="contactBox">
          <h2 className="contactTitle">有岗位，或者想聊点技术？</h2>
          <p className="contactDesc">
            实习、校招、项目合作都欢迎。看到消息会回，不会已读不回。
          </p>

          <div className="contactBtns">
            <a
              className="btnPrimary"
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
            <a
              className="btnGhost"
              href={site.links.douyin}
              target="_blank"
              rel="noreferrer noopener"
            >
              抖音
            </a>
            {site.links.email ? (
              <a className="btnGhost" href={site.links.email}>
                邮件
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
