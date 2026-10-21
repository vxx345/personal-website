export type HeroSlide = {
  id: string;
  /** 缩略图轨道上显示的两个字 */
  caption: string;
  /** 视频源（H.264 mp4，≤2MB，8s） */
  video: string;
  /** 首帧封面，视频未就绪时顶上 */
  poster: string;
  /** 回退渐变：[起始色, 结束色]，也用于缩略图占位 */
  tone: [string, string];
  /** 自动切换间隔（ms），与视频时长对齐 */
  duration: number;
  /** object-position，控制移动端裁切锚点 */
  focal: string;
};

/**
 * 素材来源：Mixkit（Free License，可商用、无需署名）
 * 原始 720p 体积 2–8MB，本地转码为 1280 宽 / 8s / 无音轨 / CRF30。
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "sea-of-clouds",
    caption: "云海",
    video: "/media/hero/01.mp4",
    poster: "/media/hero/01.jpg",
    tone: ["#2c3e50", "#8ea9bd"],
    duration: 5600,
    focal: "50% 45%",
  },
  {
    id: "dusk-ridge",
    caption: "黄昏",
    video: "/media/hero/02.mp4",
    poster: "/media/hero/02.jpg",
    tone: ["#3a2a3f", "#d9885a"],
    duration: 8000,
    focal: "50% 55%",
  },
  {
    id: "highland",
    caption: "山脊",
    video: "/media/hero/03.mp4",
    poster: "/media/hero/03.jpg",
    tone: ["#1f2d2a", "#6f8f77"],
    duration: 8000,
    focal: "50% 50%",
  },
  {
    id: "mist-forest",
    caption: "雾林",
    video: "/media/hero/04.mp4",
    poster: "/media/hero/04.jpg",
    tone: ["#202a2f", "#7d9a9c"],
    duration: 8000,
    focal: "50% 40%",
  },
  {
    id: "blue-hour",
    caption: "蓝调",
    video: "/media/hero/05.mp4",
    poster: "/media/hero/05.jpg",
    tone: ["#141a2b", "#4d6a8f"],
    duration: 8000,
    focal: "50% 60%",
  },
  {
    id: "night-sky",
    caption: "夜空",
    video: "/media/hero/06.mp4",
    poster: "/media/hero/06.jpg",
    tone: ["#0d0f14", "#3b4a63"],
    duration: 8000,
    focal: "50% 35%",
  },
];
