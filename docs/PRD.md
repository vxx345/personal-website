# 个人网站 PRD（v0.4）

| 项目 | 内容 |
| --- | --- |
| 产品名 | Personal Portfolio（暂定 `portfolio`） |
| 文档版本 | v0.4 |
| 日期 | 2026-10-21 |
| 状态 | M1–M3 已完成，M4 打磨中；素材已接入 |
| 现有资产 | `index.html`（单文件手写版，深色 + 荧光绿，可动效基线参考） |
| 目标上线 | 待定（建议 2 周内出可访问版本） |

---

## 1. 背景与目标

### 1.1 背景

现有一版手写 `index.html`：单文件、无构建、深色主题 + 荧光绿强调色，已具备悬浮胶囊导航、鼠标光晕、滚动渐显、项目卡片、背景音乐按钮等基础表现力。

问题在于：

1. **纯手写在动效上很快到天花板**——滚动叙事、元素编排、页面转场、3D 都要靠手写 CSS keyframes + 原生 JS，维护成本指数上升。
2. **内容硬编码在 HTML 里**——改一个项目标题要动结构，无法支撑后续加项目详情页、笔记、简历下载。
3. **首屏视觉冲击力不足**——英雄区只有径向渐变光斑，没有「一眼记住」的媒体层。

### 1.2 产品目标

做一个**求职用的一人作品集站**，核心目标按优先级排：

| 优先级 | 目标 | 衡量方式 |
| --- | --- | --- |
| P0 | 3 秒内建立「这人会做东西 + 有审美」的印象 | 首屏英雄区视觉完成度；跳出率 |
| P0 | 承载可投递的项目与技术信息 | 简历/邮件里可直接贴链接；HR 能在 90 秒内看完关键信息 |
| P1 | 动效本身成为能力证明 | 动效自然、不卡顿、移动端不降级成「幻灯片」 |
| P1 | 可长期维护扩展 | 新增一个项目 = 加一条数据，不改组件 |

### 1.3 非目标（本期不做）

- 不做后端服务 / 数据库 / 登录体系（纯静态，最多接 Serverless 函数做表单）。
- 不做 CMS 后台。
- 不做多语言（预留 i18n 结构，本期只中文）。
- 不做评论、点赞等真实社交功能（参考图里的点赞数是装饰性 UI，本期不做真数据）。

### 1.4 成功指标（上线 1 个月内）

- Lighthouse（移动端）Performance ≥ 90、SEO ≥ 95、Accessibility ≥ 90。
- 首屏 LCP ≤ 2.5s（4G 模拟）、CLS = 0、首屏 JS（gzip）≤ 180KB。
- 移动端英雄区视频不自动播放时，视觉体验仍然成立（降级为图片轮播）。

---

## 2. 用户与场景

| 角色 | 场景 | 关注点 | 停留时长预期 |
| --- | --- | --- | --- |
| HR / 猎头 | 从简历或邮件点进来 | 方向、届别、实习、能不能马上面 | 30–60s |
| 技术面试官 | 面试前摸底 | 项目深度、技术栈真实性、代码品味 | 2–5min |
| 同行 / 网友 | 社交平台看到分享 | 视觉、动效、有没有意思 | 30s–2min |

设计推论：
- **首屏必须同时给出「我是谁 + 什么方向 + 强视觉」**，不能只放一张大图让人往下滚。
- 关键事实（方向、实习、项目数）要在首屏可见，不做「滚动才揭晓」的信息隐藏。
- 动效是加分项而不是门槛：所有内容在动效关闭时仍完整可读。

---

## 3. 参考竞品拆解

参考截图（XIAOYANG PORTFOLIO）值得抄的结构，不抄的部分标出来：

| 元素 | 参考图做法 | 我们是否采用 | 说明 |
| --- | --- | --- | --- |
| 全屏媒体背景 | 云海 + 木屋 + 角色的插画风视频/动图 | ✅ | 本项目核心需求，见 §5 |
| 中央超大标题 | 品牌名 900 weight + 细体副标 + 手写签名装饰 | ✅ | 用姓名拼音 / 英文名做主标题 |
| 悬浮胶囊导航 | 顶部居中，玻璃拟态 + 胶囊 CTA | ✅ | 沿用现有版本，增加滚动时收缩态 |
| 底部缩略图轨道 | 横向卡片条，当前项高亮 | ✅ | 同时作为幻灯片切换器 |
| 右侧竖排 dock | 社交图标 + 点赞/收藏计数 | ⚠️ 简化 | 只保留可用链接，不做假数据计数 |
| 中央播放按钮 | 点击播 showreel | ⚠️ 二期 | 有 30s 展示视频再做 |
| 搜索框 | 站内搜索 | ❌ | 内容量不足以支撑搜索 |
| 弹幕/评论浮层 | 视频平台自身的 UI | ❌ | 与产品无关 |

---

## 4. 信息架构

单页长滚动为主，预留子路由：

```
/                       首页（Hero → About → Projects → Skills → Contact）
/projects/[slug]        项目详情（二期，MDX 驱动）
/notes                  笔记列表（三期，可选）
/notes/[slug]           笔记详情（三期，可选）
```

首页分节顺序与理由：

1. **Hero**（100svh）——身份 + 视觉冲击 + 向下引导
2. **About**（约 60vh）——一段人话自我介绍 + 关键事实表（学校/方向/实习/地点/状态）
3. **Projects**（约 120vh）——4–6 张卡片，hover 有媒体预览
4. **Skills**（约 60vh）——分组胶囊，hover 微交互
5. **Contact**（约 50vh）——邮箱直链 + GitHub + 社交
6. **Footer**——版权 + 技术栈标注

---

## 5. 核心需求：Hero 全屏动态背景（P0）

### 5.1 需求描述

首屏是一块**全屏、自动切换、带过渡动效**的媒体背景区域，叠加标题与交互层。参考图效果 = 循环播放的动态场景 + 静态排版压在上面。

**本期规格：6 段轮播**（已定 D6）。图片默认 6s/段，整轮 36s；后续若替换为视频，单段 8s。

> 为什么是 6 段：4 段容易在 24s 内循环到重复画面，观众停留超过 30s 就会看出「又是这张」；6 段把整轮拉到 36s，配合缩略图轨道有足够的视觉信息量。代价是素材量翻倍，所以每段必须同风格，宁可用同一套素材的不同裁切/色调，也不混搭。

### 5.2 媒体形态（已定 D2）

| 方案 | 实现 | 优点 | 缺点 | 资源成本 |
| --- | --- | --- | --- | --- |
| A. 视频轮播 | 2–4 段 8s 循环 MP4/WebM，`muted` `playsinline` `loop`，交叉淡入切换 | 最接近参考图，氛围最强 | 体积大（每段 2–4MB），首屏压力大，移动端流量不友好 | 需生成/剪辑 2–4 段视频 |
| B. 图片轮播 + Ken Burns | 4–6 张高分辨率静图，缓慢缩放平移 + 交叉淡入 | 体积可控（AVIF/WebP 每张 150–250KB），实现稳定 | 动态感弱于视频 | 需 4–6 张同风格图 |
| C. WebGL 程序化场景 | Three.js / R3F 实时渲染（云海、粒子、流体） | 体积最小、可交互（鼠标视差）、无限时长 | 开发成本高，低端机掉帧 | 纯代码，无素材成本 |

**已落地（D2 + D9）：A 为主体，B 作为兜底。** 6 段 720p 视频本地转码后单段 0.6–1.7MB，每段配首帧 poster；视频未就绪/加载失败时露出 poster，再失败退到渐变。首屏 LCP 由 poster 决定（31–159KB），视频在 `readyState` 就绪后接管。

### 5.3 交互与状态

**幻灯片数据结构**

```ts
type HeroSlide = {
  id: string;
  type: "video" | "image";
  src: string;          // mp4 / webp / avif
  webmSrc?: string;     // 视频备选源
  poster: string;       // 首帧图，必须提供
  alt: string;          // 无障碍描述
  duration: number;     // 自动切换间隔（ms），视频默认 8000，图片默认 6000
  focalPoint: { x: number; y: number }; // 移动端裁切锚点，0-1
  caption?: string;     // 缩略图轨道上的标签
};
```

**状态机**

| 状态 | 触发 | 行为 | 出口 |
| --- | --- | --- | --- |
| `idle` | 进入视口且媒体就绪 | 计时 `duration` | 计时结束 → `preload` |
| `preload` | 计时结束 | 预取下一段媒体（视频只取 metadata + 首帧），≤ 1.5s 超时 | 成功 → `transition`；失败/超时 → 跳过该段，直接 `transition` 到再下一段 |
| `transition` | 预取完成 | 新层 `opacity 0→1`（900ms）+ 旧层 `opacity 1→0`；新层 `scale 1.02→1.10`（`duration + 2000`ms，linear）；标题文字做 mask 上滑 + 逐字 stagger（40ms/字） | 动画结束 → `idle` |
| `paused` | 悬停缩略图轨道 / 键盘聚焦轨道 / 标签页隐藏（`visibilitychange`）/ 用户点击暂停 | 暂停计时与视频播放，保留 Ken Burns 当前帧 | 鼠标离开轨道 → 立即 `idle`，计时从 0 重新开始 |

**手动切换**
- 点击底部缩略图卡片：立即切到该段（过渡时长缩短为 450ms）。
- 键盘 `←` / `→`：上一段 / 下一段；缩略图可 `Tab` 聚焦，`Enter` 触发。
- 移动端左右滑动（`touchstart/touchend` 阈值 40px）切换，滑动中暂停自动播放。

**进度指示**
- 当前缩略图卡片底部有一条 2px 进度线，随 `duration` 线性增长；`paused` 时冻结。不额外做独立的圆点指示器。

### 5.4 视觉规格（桌面端）

| 层级 | 规格 |
| --- | --- |
| 背景媒体 | `object-fit: cover`，`object-position: focalPoint`；桌面端固定，不使用 `background-attachment: fixed`（移动端会炸） |
| 遮罩 | 底部到顶部：`rgba(0,0,0,.75) → transparent 55%` 垂直渐变 + 全屏 `rgba(0,0,0,.18)`；保证标题对比度 ≥ 4.5:1 |
| 配色纪律 | **Hero 区不用荧光绿**（已定 D5）：标题纯白 `#fff` + 描边字用 `rgba(255,255,255,.85)`，仅允许荧光绿出现在导航 CTA、缩略图进度线、状态点。荧光绿 `#c8ff3d` 是暖色系的天敌，压在海面/黄昏素材上会发脏 |
| 颗粒感 | 可选：叠一层 SVG noise，`opacity .04`，`mix-blend-mode: overlay` |
| 主标题 | `clamp(56px, 11vw, 168px)`，`font-weight 900`，`letter-spacing -0.04em`，`line-height 0.92`；两行结构（主色 + outline 描边字） |
| 副标题 | `clamp(14px, 1.6vw, 18px)`，最大宽度 480px，两行以内 |
| 缩略图轨道 | 底部 32px 起，卡片 148×96（`16:10`），圆角 12px，间距 12px，横向滚动不换行，`scroll-snap` 对齐 |
| 顶部导航 | 居中胶囊，`backdrop-filter: blur(20px)`，滚动 > 60px 时高度收缩 8px、透明度提升 |
| 右侧 dock | 距右 24px，竖排 4–5 个 40px 圆形按钮 |

### 5.5 响应式

| 断点 | 处理 |
| --- | --- |
| ≥ 1280px | 完整版：主标题 168px，缩略图 148×96，dock 显示 |
| 768–1279px | 主标题降到 `9vw`，缩略图 120×80，dock 收成 3 个 |
| < 768px | Hero 高度 `100svh`（不是 vh，避免地址栏跳动）；缩略图轨道改为 `overflow-x: auto` 单项 40vw；**视频降级为 poster 图**（判断 `navigator.connection.saveData` 或视口宽度）；dock 隐藏 |

### 5.6 性能约束（硬性）

- 首屏 poster：≤ 200KB（AVIF 优先，WebP 兜底），`fetchpriority="high"`。
- 视频：单段 ≤ 3MB，H.264（兼容）+ VP9/WebM（体积），`preload="none"`，`poster` 必填。
- 首屏只加载第 1 段媒体；第 2 段在 `idle` 状态停留 1s 后异步预取。
- 所有非首屏媒体 `loading="lazy"` / `IntersectionObserver` 触发。
- 首屏 JS（gzip）≤ 180KB；Hero 组件若引入 Three.js，必须 `dynamic import` 并按需加载。
- 移动端 4G 下关闭视频，仅图片；`prefers-reduced-motion: reduce` 时关闭 Ken Burns 与自动切换。

### 5.7 无障碍

- 每段媒体有 `alt`；背景媒体层 `aria-hidden="true"`，语义信息由标题承担。
- 自动切换区域必须有可见暂停按钮（右下角小按钮，`aria-label="暂停背景轮播"`），符合 WCAG 2.2.2（自动更新的内容可暂停）。
- 缩略图轨道用 `role="tablist"`，卡片 `role="tab"` + `aria-selected`。
- 键盘焦点可见（`:focus-visible` 描边，2px accent）。

### 5.8 验收标准

- [ ] 连续观察 60s，自动切换 ≥ 6 次，无白屏、无闪烁、无跳版。
- [ ] 鼠标停在 Hero 上 10s，画面不切换（暂停生效）；移开 1.2s 后恢复计时。
- [ ] 断网状态下刷新，首屏显示 poster 与完整文字，控制台无未捕获异常。
- [ ] iPhone Safari、Android Chrome、桌面 Chrome/Safari/Edge 各过一遍，无横向滚动条。
- [ ] 键盘 `Tab` 能聚焦到暂停按钮与缩略图，`←/→` 可切换。
- [ ] 首屏 LCP ≤ 2.5s（Lighthouse 移动端 4G 模拟）。

---

## 6. 其余模块需求

### 6.1 About（P0）

- 两段人话自我介绍（每段 ≤ 120 字），不使用「热爱技术、拥抱变化」类空话。
- 右侧事实表 **4 行：方向、经历、坐标、状态**。学校名、身高、年龄、住址等字段**不展示**（已定 D7）。
- 进入视口时文字逐行淡入（stagger 80ms），事实表行从左侧滑入。

### 6.2 Projects（P0）

- 卡片网格：桌面 2 列，移动 1 列；4–6 张。
- 卡片结构：媒体区（图/静帧）→ 标签 → 标题 → 一句话描述（≤ 60 字）→ 技术胶囊 3–4 个。
- hover：卡片 `translateY(-6px)` + 边框发光 + 媒体区 `scale(1.05)`；桌面端 hover 300ms 后媒体区替换为无声循环视频（若有），移出即停。
- 点击：跳转 `/projects/[slug]`（二期）；一期点击打开模态层展示详情（避免空链接）。
- 键盘可达：卡片是 `<a>`，`focus-visible` 有描边。

### 6.3 Skills（P1）

- 三组：后端、AI / 工具链、其他；胶囊 hover 上浮 3px + accent 描边。
- 不做进度条 / 百分比（自评分数没有信息量）。

### 6.4 Contact（P0）

- 主 CTA：`mailto:` 直链（点击即拉起邮件客户端）。
- 次 CTA：GitHub、社交平台、简历 PDF 下载。
- 不做表单（无后端），如后续要做接 Formspree / Serverless 函数。

### 6.5 全局动效与装饰（P1）

| 效果 | 实现 | 降级策略 |
| --- | --- | --- |
| 背景音乐 | `<audio preload="none">` + 左下角胶囊按钮（等化器动画 + 状态文案） | 默认不播；点击后音量从 0 淡入到 0.32；切页暂停；文件缺失时按钮显示「BGM 缺失」 |
| 平滑滚动 | Lenis | `prefers-reduced-motion` 时禁用，用原生滚动 |
| 滚动进度条 | `scrollYProgress` → 顶部 2px 线 | 无 |
| 自定义光标（桌面） | 跟随圆点 + hover 放大 | 触屏设备不渲染 |
| 磁性按钮 | 鼠标位移映射到 `translate`，`useSpring` 阻尼 | 触屏不启用 |
| 区块入场 | Motion `whileInView`，`once: true` | reduced-motion 时直接显示 |
| 页面转场 | View Transitions API | 不支持的浏览器直接跳转 |
| 噪点纹理 | SVG feTurbulence 静态图 | 无 |

**动效编排原则（写进代码规范）**
- 统一 easing：`cubic-bezier(.16, 1, .3, 1)`；统一时长层级：快 200ms / 中 400ms / 慢 800ms。
- 一屏只讲一件事：同时运动的元素 ≤ 5 个。
- 所有动效必须能被打断（用户滚动优先），不阻塞输入。
- `prefers-reduced-motion` 是硬开关，不是建议。

---

## 7. 技术方案

### 7.1 框架选型对比

前提：**大量动效 + 强首屏 + 需要 SEO（求职链接会被爬、会被贴进聊天软件生成卡片）**。

| 方案 | 首屏 JS（估） | SEO / 分享卡片 | 动效自由度 | 维护成本 | 结论 |
| --- | --- | --- | --- | --- | --- |
| **Next.js 16.4（App Router + SSG）** | 中（120–180KB） | 强（Metadata API 出 OG 图） | 高 | 中 | ✅ **推荐** |
| Astro 7.4 + React island | 低（40–90KB） | 最强（纯静态 HTML） | 高，但跨岛共享状态麻烦，整页动效要整页 `client:load`，等于放弃岛屿优势 | 中高 | 备选（若追求极致首屏分数） |
| Vite + React SPA | 中 | 弱（需额外预渲染，社交平台抓不到内容） | 高 | 低 | ❌ 不推荐做对外站 |
| Vue 3 + Nuxt | 中 | 强 | 高 | 中（团队不熟 Vue） | 不选 |

**结论：React 完全可行，而且是最优解之一。** 具体选 **Next.js 16.4 + React 19**，全站走 SSG（`output: 'export'` 或默认静态生成），不引入服务端逻辑，部署时当纯静态站用。

选 Next 而非 Vite SPA 的三个理由：
1. 作品集是「内容站」，SEO 和分享卡片直接决定它有没有用；
2. `next/image` / `next/font` 自带媒体与字体优化，正好对上首屏媒体这个大坑；
3. 后面加 `/projects/[slug]`、`/notes` 不用换框架，MDX 直接接。

选 Next 而非 Astro 的一个理由：本项目的动效是**整页级**的（滚动叙事、共享布局、光标、Lenis 全局接管），Astro 的岛屿模型在这种场景下会退化成「整页一个大 island」，收益消失还多一层心智负担。

> **决策已定（2026-10-21）：采用 Next.js 16.4 + React 19.3，全站 SSG。**

### 7.2 依赖清单（版本为 2026-10-21 npm 实测最新）

| 用途 | 包 | 版本 |
| --- | --- | --- |
| 框架 | `next` | 16.4.2 |
| UI | `react` / `react-dom` | 19.3.1 |
| 动画主力 | `motion` | 14.5.0 |
| 平滑滚动 | `lenis` | 1.3.27 |
| 滚动叙事（按需，尚未引入） | `gsap` | 3.15.0 |
| 3D（二期彩蛋，尚未引入） | `three` / `@react-three/fiber` | 0.186.1 / 9.8.2 |
| 轮播（按需，尚未引入） | `embla-carousel-react` | 8.6.0 |

> **实施调整（2026-10-21）**：没有引入 Tailwind。全站样式只有一套视觉语言、动效大量定制动效，原子类反而更难读，改为原生 CSS 变量 + 语义类名（`app/globals.css`）。缩略图轨道也是手写 flex + scroll-snap，没上 Embla。需要 Tailwind 时随时可加，不影响现有结构。

> 动效分工：**Motion 负责 90% 的入场 / 手势 / 布局动画；GSAP ScrollTrigger 只在需要「钉住 + 滚动驱动时间轴」的段落引入**（两个库同时用要小心 rAF 争抢，统一由 Lenis 驱动）。

### 7.3 目录结构（拟定）

```
personal-website/
├─ app/
│  ├─ layout.tsx            # 字体、metadata、全局 providers
│  ├─ page.tsx              # 首页（组装 sections）
│  └─ globals.css
├─ components/
│  ├─ hero/
│  │  ├─ HeroMedia.tsx      # 媒体层 + 交叉淡入 + 预取
│  │  ├─ HeroTitle.tsx      # 标题 stagger
│  │  ├─ SlideRail.tsx      # 底部缩略图轨道
│  │  └─ useHeroSlideshow.ts# 状态机
│  ├─ nav/  sections/  ui/
├─ content/
│  ├─ site.config.ts        # 个人信息（占位符，见 §9）
│  ├─ hero.ts               # slides 数组
│  └─ projects.ts
├─ public/media/hero/       # poster + 视频，命名统一
└─ docs/PRD.md
```

### 7.4 改动策略

- 现有 `index.html` **保留为视觉参考，不直接删**；新工程跑通后再归档到 `legacy/`。
- 首版不追求一次到位：Hero 先做「图片轮播 + 淡入」，跑通后再插入视频层（渐进增强），避免一上来被媒体资源卡住。

### 7.5 部署方案（已定：GitHub + Cloudflare Pages）

目标：**代码 push 到 GitHub，网站自动重新构建上线**，不需要自己买服务器。

**为什么不是 Vercel**：Vercel 同样支持连 GitHub，最省事，但默认域名在国内访问不稳定，面试官点开可能白屏几秒甚至打不开。Cloudflare Pages 免备案、免费额度够用、全球 CDN，国内访问比 Vercel 稳一档。两者构建命令完全一样，真出问题可以半小时内换过去——所以先按 Cloudflare 走，保留 Vercel 作为备选。

**上线路径（M5 执行）**

| 步骤 | 动作 | 说明 |
| --- | --- | --- |
| 1 | GitHub 建仓库 `portfolio`（public 或 private 均可） | Cloudflare Pages 支持私有仓库授权 |
| 2 | 本地初始化并首次 push | `git init` → `git add .` → 推送 |
| 3 | Cloudflare Dashboard → Workers & Pages → 连接 Git | 授权 GitHub，选中该仓库 |
| 4 | 构建配置 | Framework preset: `Next.js`；Build command: `npm run build`；Output: `.next`（Cloudflare 自动识别） |
| 5 | 上线拿默认域名 | 形如 `portfolio.pages.dev`，可先直接用 |
| 6 | 绑自定义域名（可选） | 买域名 → DNS 托管到 Cloudflare → 加 CNAME，免备案（境外节点） |

**自动更新机制**：`main` 分支 push → 自动构建 → 约 1–2 分钟生效；PR 分支会生成独立预览地址，改版可以先看预览再合并。

**注意事项**

- 仓库公开时，`content/site.config.ts` 里不要写真实学校/公司/手机号（见 §8.4）；用占位符 + 部署前替换，或仓库设为 private（Cloudflare 免费版也支持私有仓库构建）。
- 媒体文件（视频/大图）体积大时优先放对象存储或 CDN，不塞进 Git 仓库（单文件 > 25MB 会被 GitHub 拒收）。
- 若后续国内访问仍不理想，再走「阿里云 OSS + CDN + 已备案域名」，Next 静态产物直接上传即可，不需要改代码。

---

## 8. 非功能需求

### 8.1 性能预算

| 指标 | 目标 |
| --- | --- |
| LCP（移动 4G） | ≤ 2.5s |
| CLS | 0 |
| INP | ≤ 200ms |
| 首屏 JS（gzip） | ≤ 180KB |
| 单张首屏图 | ≤ 200KB |
| 单段视频 | ≤ 3MB |
| 滚动帧率 | 桌面 60fps，移动 ≥ 50fps（DevTools Performance 抽样） |

### 8.2 SEO / 分享

- 每页 `<title>` / `description` 独立，首页标题格式：`姓名 · 后端 / AI Agent 工程师`。
- Open Graph + Twitter Card：`1200×630` 分享图，含姓名 + 一句话定位。
- `sitemap.xml` + `robots.txt`。
- 结构化数据：`Person` JSON-LD（name / jobTitle / sameAs）。

### 8.3 响应式与兼容

- 断点：`<768` / `768–1279` / `≥1280`。
- 目标浏览器：Chrome / Edge / Safari 最近两个大版本；iOS Safari 16+；Android Chrome 110+。
- 不支持 IE，不做 polyfill。

### 8.4 隐私

- **展示白名单**（已定 D7）：姓名/昵称、方向、经历类型、城市、求职状态、邮箱、GitHub、社交主页、简历 PDF。
- **禁止展示**：学校名称、身高体重、年龄、真实手机号、住址、身份证类信息、任何未公开的公司内部项目名。
- 个人信息集中在 `content/site.config.ts`，组件内不硬编码任何真实字段；仓库公开时该文件只放公开信息，敏感项走 `.env.local` 或不入库。
- 不上任何第三方统计（或只用无 cookie 的轻量方案），不加追踪像素。

### 8.5 内容与版权

- 背景媒体优先**AI 生成**（自有版权）或明确可商用素材；每份素材记录来源与授权，写在 `public/media/CREDITS.md`。
- 字体：优先系统字体栈或开源字体（`Inter` / `Noto Sans SC`），不商用未授权字体。

---

## 9. 内容模型

首页所有可变内容走数据文件，组件只消费数据：

```ts
// content/site.config.ts
export const site = {
  name: "YOUR NAME",           // 中文名 / 拼音（待填）
  alias: "VX",                 // logo 缩写，取自 GitHub handle
  tagline: "用后端工程与 AI 工作流，把想法做成能用的产品",
  status: "开放 2027 届校招 / 实习机会",
  facts: [                     // 只保留 4 行，学校/身高不展示
    { label: "方向", value: "Java 后端 / AI Agent" },
    { label: "经历", value: "后端开发实习 · AI 工具链" },
    { label: "坐标", value: "江苏 · 无锡 / 苏州" },
    { label: "状态", value: "开放机会" },
  ],
  links: {
    email: "",                                                       // 待填
    github: "https://github.com/vxx345",
    douyin: "https://www.douyin.com/user/MS4wLjABAAAAPD5gNdF1Iyk-RVhI-KDMpNDskj10ondKJTlxVzEaTTn_e9KstQNQpKQFGtsIAlit",
    resume: "/resume.pdf",
  },
};
```

> 抖音链接带一长串 `MS4wLjAB…` 签名段，属于稳定用户主页 ID，可直接入库；但如果之后改了主页 ID，链接会失效，建议上线前点一遍验证。

`content/projects.ts` 字段：`slug / title / tag / summary / cover / video? / tech[] / links { repo?, demo? } / featured`。

---

## 10. 里程碑

| 阶段 | 交付物 | 预估 |
| --- | --- | --- |
| M0 选型确认 | ✅ 本文档 v0.3、技术栈决策（D1–D8）、素材清单 | 已完成 |
| M1 骨架 | ✅ Next 16 工程 + 内容数据层 + 导航/滚动进度/平滑滚动 + 四个版块 | 已完成 |
| M2 Hero | ✅ 6 段轮播 + 状态机 + 缩略图轨道 + 暂停/键盘/降级（素材待补） | 已完成（占位素材） |
| M3 内容区 | ✅ About / Projects / Skills / Contact + 入场动效 | 已完成（占位文案） |
| M4 打磨 | 响应式、无障碍、reduced-motion、自定义光标、Lenis | 进行中 |
| M5 上线 | 性能优化、OG 图、部署到 Cloudflare Pages、真机回归 | 待开始 |

---

## 11. 风险

| 风险 | 影响 | 应对 |
| --- | --- | --- |
| 视频素材体积超标，首屏拖垮 | LCP 不达标，移动端劝退 | 首屏用 poster 渐进增强；视频按 720p/8s/≤3MB 压；移动端直接降级为图 |
| 动效过多导致晕眩 / 掉帧 | 体验负分 | 统一时长与 easing；一屏 ≤5 个运动元素；reduced-motion 硬开关 |
| 国内访问不稳定 | 面试官打不开 = 白做 | 已选 Cloudflare Pages 连 GitHub（免备案）；仍不达标再切国内云 OSS + CDN |
| AI 生成视频风格不统一 | 轮播时跳戏 | 固定提示词模板 + 统一色调 LUT；宁可用图也不用不搭的视频 |
| 个人信息暴露 | 隐私 | 见 §8.4，配置与代码分离 |

---

## 12. 决策记录

| 编号 | 议题 | 决策 | 日期 | 影响 |
| --- | --- | --- | --- | --- |
| D1 | 框架 | **Next.js 16.4 + React 19.3，全站 SSG** | 2026-10-21 | 工程结构按 App Router 搭建 |
| D2 | Hero 媒体形态 | **图片轮播（Ken Burns）为主体 + 首段视频渐进增强** | 2026-10-21 | 素材先做 4–6 张图，视频后补 |
| D3 | 部署 | **GitHub 仓库 + Cloudflare Pages 自动构建**，Vercel 作备选 | 2026-10-21 | 见 §7.5 |
| D4 | 内容就绪度 | **先用占位数据跑通，真实内容后填** | 2026-10-21 | 组件只消费 `content/*`，不硬编码 |
| D5 | 视觉基线 | **Hero 走中性暗遮罩 + 白字，荧光绿只留导航/按钮/标签** | 2026-10-21 | 避免暖色素材上撞色 |
| D6 | 首屏段数 | **6 段**，图片 6s/段 | 2026-10-21 | 素材需 6 张同风格图 |
| D7 | 个人信息口径 | **不展示学校名、身高、年龄、手机号**；只保留方向/经历/坐标/状态 + 公开链接 | 2026-10-21 | 见 §8.4 白名单 |
| D8 | 社交链接 | GitHub `github.com/vxx345`、抖音主页已确认；邮箱 `vananle190@gmail.com` | 2026-10-21 | 写入 `site.config.ts` |
| D9 | 首屏素材来源 | **Mixkit Free License**（可商用、免署名）；本地 ffmpeg 转 720p/8s/CRF30 | 2026-10-21 | 见 `public/media/CREDITS.md` |
| D10 | 英文名 | **zhangshun**（首屏主标题，小写呈现） | 2026-10-21 | logo 缩写沿用 `VX`（GitHub handle） |

**决策全部闭环。** 唯一待填：OG 分享图、项目配图、简历 PDF。

---

## 13. 附：验收总清单

- [ ] 全站无 404 链接，所有 CTA 可点且行为正确
- [ ] Hero 自动轮播 60s 无异常，暂停/恢复/手动切换全部生效
- [ ] 移动端（真机）首屏不出现横向滚动条，地址栏收起不跳版
- [ ] `prefers-reduced-motion` 开启后无自动播放、无位移类动效
- [ ] Lighthouse 三项指标达标（见 §1.4）
- [ ] 分享链接在微信/Slack/Telegram 里能出正确标题与预览图
- [ ] 键盘可完整浏览全站，焦点始终可见
- [ ] 所有图片有 alt，所有图标按钮有 aria-label
- [ ] 仓库内不含真实学校名 / 公司名 / 手机号

---

## 14. 实施记录（2026-10-21）

### 14.1 已落地结构

```
personal-website/
├─ app/
│  ├─ layout.tsx / page.tsx / globals.css
├─ components/
│  ├─ hero/
│  │  ├─ Hero.tsx            # 组装：媒体层 + 内容层 + 轨道 + 控件
│  │  ├─ HeroMedia.tsx       # 6 层叠放，opacity 交叉淡入（缺图回退渐变）
│  │  ├─ SlideRail.tsx       # 缩略图轨道（tablist 语义 + 进度线）
│  │  └─ useSlideshow.ts     # 状态机：计时/预取/暂停/键盘/降级
│  ├─ sections/              # About / Projects / Skills / Contact
│  ├─ Nav.tsx / ScrollProgress.tsx / SmoothScroll.tsx / Reveal.tsx / icons.tsx
├─ content/
│  ├─ site.config.ts         # 个人信息（不含学校/身高）
│  ├─ hero.ts                # 6 段轮播配置
│  └─ projects.ts            # 项目与技能数据
├─ public/media/hero/        # 01.jpg … 06.jpg（待补）
└─ docs/PRD.md
```

技术细节与 PRD 的差异：

| 项 | 说明 |
| --- | --- |
| 媒体实现 | 每段 slide 是一个视频层，`poster` + 渐变同时写在 CSS 背景上：视频没就绪时看到 poster，poster 也没了看到渐变，任何情况都不破相 |
| 按需加载 | 只有「当前张 + 下一张」才真正挂 `src`；其余不渲染 `<video>`，避免首屏拉 6 段 |
| 素材转码 | Mixkit 原始 720p 单段 2–8MB → ffmpeg 转 1280 宽 / 8s / 去音轨 / CRF30 / faststart → 0.6–1.7MB，首帧导出为 poster |
| 切换间隔 | 与片长对齐：01 段 5.6s，其余 8s；避免视频循环点被打断出现跳帧 |
| 暂停语义 | 悬停轨道只暂停「自动切换」，画面继续播（否则点完缩略图会停在首帧）；主动暂停/切页/reduced-motion 才停视频 |
| 背景音乐 | 左下角胶囊按钮，4 根等化器条随播放起伏；音量 60ms 一档从 0 淡到 0.32；`preload="none"` 不占首屏 |
| 生产构建 | `output: "export"`，产物在 `out/`，可直接丢 Cloudflare Pages |

### 14.2 自动化验证结果

用 Chromium + Playwright 实机跑过一轮（1440×900 / 390×844）：

| 检查项 | 结果 |
| --- | --- |
| 自动切换 | 01 云海 → 02 黄昏 → 03 山脊，按各段时长切换，正常 |
| 视频解码 | 1280×720，`readyState=4`，播放中 `paused=false`，控制台零报错 |
| 悬停轨道暂停 | 6.5s 内序号不变 ✅ |
| 键盘 `→` | 03 → 04 雾林 ✅ |
| 音乐按钮 | 点击后 label 变「BGM 播放中」，`audio.paused=false`，音量淡入至 0.32 ✅ |
| 移动端横向溢出 | 0px ✅ |
| 生产构建 | `next build` 通过，`/` 预渲染为静态页 ✅ |

### 14.3 待补清单

| 项 | 说明 |
| --- | --- |
| OG 分享图 | 需一张 1200×630，放 `public/og.png` 并在 `metadata` 里引用 |
| 项目配图 | `content/projects.ts` 目前只有渐变色，可加 `cover` 字段 |
| 简历 PDF | `public/resume.pdf`，填好后 Contact 区可加下载入口 |
| 上线 | 建 GitHub 仓库 → Cloudflare Pages 连仓库，见 §7.5 |

> 素材授权与来源清单见 `public/media/CREDITS.md`；`.gitignore` 已排除 `legacy/`（旧版单文件站）与 `.workbuddy/`（本地记忆），仓库内不含学校/身高等信息。
