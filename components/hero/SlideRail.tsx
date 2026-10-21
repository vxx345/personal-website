"use client";

import type { CSSProperties } from "react";
import type { HeroSlide } from "@/content/hero";

type Props = {
  slides: HeroSlide[];
  index: number;
  goTo: (i: number) => void;
  onHoverChange: (hovered: boolean) => void;
};

/** 缩略图轨道：既是预览，也是手动切换器 */
export function SlideRail({ slides, index, goTo, onHoverChange }: Props) {
  return (
    <div
      className="rail"
      role="tablist"
      aria-label="首屏画面切换"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
    >
      {slides.map((slide, i) => (
        <button
          key={slide.id}
          type="button"
          role="tab"
          aria-selected={i === index}
          aria-label={`切换到第 ${i + 1} 张：${slide.caption}`}
          className={`railItem${i === index ? " isActive" : ""}`}
          style={{ "--dur": `${slide.duration}ms` } as CSSProperties}
          onClick={() => goTo(i)}
        >
          <span
            className="railThumb"
            style={{
              backgroundImage: `url("${slide.poster}"), linear-gradient(145deg, ${slide.tone[0]}, ${slide.tone[1]})`,
            }}
          />
          <span className="railLabel">{slide.caption}</span>
          <span className="railBar" />
        </button>
      ))}
    </div>
  );
}
