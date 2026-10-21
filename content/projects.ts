export type Project = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  tech: string[];
  /** 卡片媒体区回退渐变 */
  tone: [string, string];
  href?: string;
};

/**
 * 占位数据：标题与方向取自真实项目，但不写任何未确认的量化指标。
 * 后续只改这个文件，组件不动。
 */
export const projects: Project[] = [
  {
    slug: "rag-autotest",
    title: "RAG 自动化测试平台",
    tag: "测试工程",
    summary:
      "把检索增强问答的评测从手工点检变成可重复执行的任务：用例编排、批量跑批、结果比对一条链路跑通。",
    tech: ["Java", "Spring Boot", "RAG", "自动化测试"],
    tone: ["#1b2430", "#3f5a72"],
  },
  {
    slug: "mcp-tools",
    title: "MCP 工具集",
    tag: "工具链",
    summary:
      "面向 IDE 的 MCP 服务，把用户故事与需求的增删改查暴露成标准工具调用，让 Agent 直接操作业务对象。",
    tech: ["MCP", "TypeScript", "HTTP", "Agent"],
    tone: ["#242030", "#5b4a7a"],
  },
  {
    slug: "agent-orchestration",
    title: "Agent 任务编排",
    tag: "后端",
    summary:
      "任务拆解、工具调用、失败重试与上下文预算管理的后端骨架，重点在可观测与幂等，而不在 demo 效果。",
    tech: ["Java 17", "Spring Boot", "LLM API", "Redis"],
    tone: ["#1f2a24", "#4a7a5e"],
  },
  {
    slug: "snake",
    title: "Java 贪吃蛇",
    tag: "练手项目",
    summary:
      "用 Swing 手写的桌面小游戏，把游戏循环、碰撞检测、状态机拆开讲清楚，作为教学与演示素材。",
    tech: ["Java", "Swing", "Game Loop"],
    tone: ["#2a2320", "#7a5a3f"],
  },
];

export const skillGroups = [
  {
    title: "后端开发",
    items: ["Java 17", "Spring Boot", "MyBatis", "MySQL", "Redis", "HZERO"],
  },
  {
    title: "AI / Agent",
    items: ["Prompt Engineering", "MCP", "RAG", "LangChain", "FastAPI", "Python"],
  },
  {
    title: "工程 / 其他",
    items: ["Git", "Docker", "Linux", "TypeScript", "Next.js", "技术写作"],
  },
] as const;
