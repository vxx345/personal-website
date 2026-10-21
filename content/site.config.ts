export type SiteLink = {
  label: string;
  href: string;
  kind: "email" | "github" | "douyin" | "resume";
};

export const site = {
  /** 英文名，首屏主标题 */
  name: "zhangshun",
  /** 首屏描边那行 */
  subtitle: "PORTFOLIO",
  /** logo 缩写，取自 GitHub handle */
  alias: "VX",
  tagline: "用后端工程与 AI 工作流，把想法做成能用的产品。",
  status: "开放 2027 届校招 / 实习机会",

  /** 只保留 4 行：学校、身高、年龄一律不展示 */
  facts: [
    { label: "方向", value: "Java 后端 / AI Agent" },
    { label: "经历", value: "后端开发实习 · AI 工具链" },
    { label: "坐标", value: "江苏 · 无锡 / 苏州" },
    { label: "状态", value: "开放机会" },
  ],

  about: [
    "工科背景出身，写代码是从处理实验数据开始的。现在主攻 Spring Boot 后端与 AI Agent 应用，习惯把「能跑起来」放在「看起来漂亮」前面。",
    "做过 RAG 方向的自动化测试、也给 IDE 写过 MCP 工具。喜欢把重复的事交给脚本，把复杂的事拆成能验证的小步骤。",
  ],

  links: {
    email: "mailto:vananle190@gmail.com",
    github: "https://github.com/vxx345",
    douyin:
      "https://www.douyin.com/user/MS4wLjABAAAAPD5gNdF1Iyk-RVhI-KDMpNDskj10ondKJTlxVzEaTTn_e9KstQNQpKQFGtsIAlit",
  },
} as const;

export const navLinks = [
  { label: "关于", href: "#about" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
] as const;
