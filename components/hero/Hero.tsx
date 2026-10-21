"use client";

import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site.config";
import { heroSlides } from "@/content/hero";
import { useSlideshow } from "./useSlideshow";
import { HeroMedia } from "./HeroMedia";
import { SlideRail } from "./SlideRail";
import {
  DouyinIcon,
  GithubIcon,
  MailIcon,
  PauseIcon,
  PlayIcon,
} from "@/components/icons";

export function Hero() {
  const count = heroSlides.length;

  const {
    index,
    paused,
    mediaPaused,
    userPaused,
    setRailHovered,
    togglePause,
    goTo,
  } = useSlideshow({ slides: heroSlides });

  const links = [
    site.links.github && {
      href: site.links.github,
      label: "GitHub",
      icon: <GithubIcon />,
      external: true,
    },
    site.links.douyin && {
      href: site.links.douyin,
      label: "抖音",
      icon: <DouyinIcon />,
      external: true,
    },
    site.links.email && {
      href: site.links.email,
      label: "邮件",
      icon: <MailIcon />,
      external: false,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    icon: React.ReactNode;
    external: boolean;
  }[];

  return (
    <section id="top" className={`hero${paused ? " isPaused" : ""}`}>
      <HeroMedia slides={heroSlides} index={index} paused={mediaPaused} />
      <div className="heroOverlay" />

      <div className="heroContent">
        <div className="heroStatus">
          <span className="dot" />
          {site.status}
        </div>

        <h1 className="heroTitle">
          <span>{site.name}</span>
          <span className="outline">{site.subtitle}</span>
        </h1>

        <p className="heroTagline">{site.tagline}</p>

        <div className="heroIndex" aria-live="off">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "inline-block" }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(count).padStart(2, "0")} · {heroSlides[index].caption}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <SlideRail
        slides={heroSlides}
        index={index}
        goTo={goTo}
        onHoverChange={setRailHovered}
      />

      <button
        type="button"
        className="heroPause"
        onClick={togglePause}
        aria-label={userPaused ? "继续播放背景轮播" : "暂停背景轮播"}
      >
        {userPaused ? <PlayIcon /> : <PauseIcon />}
      </button>

      <div className="dock">
        {links.map((link) => (
          <a
            key={link.label}
            className="dockBtn"
            href={link.href}
            aria-label={link.label}
            title={link.label}
            {...(link.external
              ? { target: "_blank", rel: "noreferrer noopener" }
              : {})}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
}
