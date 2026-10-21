"use client";

import { useEffect, useRef } from "react";
import type { HeroSlide } from "@/content/hero";

type Props = {
  slides: HeroSlide[];
  index: number;
  paused: boolean;
};

/**
 * 媒体层：所有 slide 常驻叠放，靠 opacity 交叉淡入。
 * - 只有当前张与下一张真正挂 src，避免首屏把 6 段视频全拉下来
 * - 视频失败/缺失时露出 poster（再退到 tone 渐变），不会出现碎图
 */
export function HeroMedia({ slides, index, paused }: Props) {
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const count = slides.length;

  // 切换时：当前张从头播，其余暂停
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        const played = video.play();
        if (played) played.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [index]);

  // 暂停态跟随轮播状态
  useEffect(() => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (paused) {
      video.pause();
    } else {
      const played = video.play();
      if (played) played.catch(() => {});
    }
  }, [paused, index]);

  return (
    <div className="heroMedia" aria-hidden="true">
      {slides.map((slide, i) => {
        const near = i === index || i === (index + 1) % count;
        return (
          <div
            key={slide.id}
            className={`slide${i === index ? " isActive" : ""}`}
            style={{
              backgroundImage: `url("${slide.poster}"), radial-gradient(circle at 32% 24%, rgba(255,255,255,0.14), transparent 58%), linear-gradient(145deg, ${slide.tone[0]}, ${slide.tone[1]})`,
              backgroundPosition: `${slide.focal}, center, center`,
            }}
          >
            {near ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={slide.video}
                poster={slide.poster}
                muted
                loop
                playsInline
                preload={i === index ? "auto" : "metadata"}
                style={{ objectPosition: slide.focal }}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
