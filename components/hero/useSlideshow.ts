"use client";

import { useCallback, useEffect, useState } from "react";

type Options = {
  /** 按顺序传入，每张自带停留时长与封面地址 */
  slides: { duration: number; poster: string }[];
};

export function useSlideshow({ slides }: Options) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [railHovered, setRailHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const duration = slides[index]?.duration ?? 6000;
  const nextSrc = slides[(index + 1) % count]?.poster;

  // 尊重系统「减少动态效果」
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // 标签页切走时暂停计时
  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const paused = railHovered || tabHidden || userPaused || reduced;
  // 悬停轨道只暂停自动切换，画面继续播；只有用户主动暂停/切页/减少动效才停视频
  const mediaPaused = tabHidden || userPaused || reduced;

  const goTo = useCallback(
    (i: number) => setIndex(((i % count) + count) % count),
    [count],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );

  // 自动切换
  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setIndex((i) => (i + 1) % count);
    }, duration);
    return () => window.clearTimeout(timer);
  }, [index, paused, count, duration]);

  // 预取下一张
  useEffect(() => {
    if (!nextSrc) return;
    const img = new Image();
    img.src = nextSrc;
  }, [nextSrc]);

  // 键盘左右
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return {
    index,
    paused,
    mediaPaused,
    reduced,
    userPaused,
    setRailHovered,
    togglePause: () => setUserPaused((v) => !v),
    goTo,
    next,
    prev,
  };
}
