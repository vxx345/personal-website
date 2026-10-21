"use client";

import { useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.32;

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setFailed(true);
    }
  };

  // 播放时音量从 0 淡到 0.32（单独一个 effect，避免被其它清理函数打断）
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !playing) return;

    audio.volume = 0;
    const id = window.setInterval(() => {
      const next = Math.min(TARGET_VOLUME, audio.volume + 0.02);
      audio.volume = next;
      if (next >= TARGET_VOLUME) window.clearInterval(id);
    }, 60);

    return () => window.clearInterval(id);
  }, [playing]);

  // 切走标签页暂停，回来接着放
  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio || !playing) return;
      if (document.hidden) audio.pause();
      else void audio.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [playing]);

  return (
    <>
      <button
        type="button"
        className={`musicBtn${playing ? " isPlaying" : ""}${failed ? " isFailed" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "暂停背景音乐" : "播放背景音乐"}
        title={failed ? "音频文件未就位：public/audio/bgm.mp3" : "背景音乐"}
      >
        <span className="musicBars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="musicLabel">
          {failed ? "BGM 缺失" : playing ? "BGM 播放中" : "BGM"}
        </span>
      </button>

      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="none"
        onError={() => setFailed(true)}
      />
    </>
  );
}
