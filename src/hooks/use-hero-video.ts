import { useEffect, useRef, useState } from "react";

export function useHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const playedOnMobile = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(!motion.matches);
      setReady(false);
    };
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const layer = layerRef.current;
    if (!enabled || !section || !video || !layer) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    let frame = 0;
    let targetTime = 0;
    let requestedTime = -1;
    let pointerX = 0;
    let pointerY = 0;
    let visible = false;
    let disposed = false;

    const seek = () => {
      if (!desktop.matches || video.seeking || video.readyState < 2) return;
      if (Math.abs(requestedTime - targetTime) > 0.025) {
        requestedTime = targetTime;
        video.currentTime = targetTime;
      }
    };
    const playOnce = () => {
      if (desktop.matches || !visible || playedOnMobile.current || video.readyState < 2) return;
      video.currentTime = 0;
      void video.play().then(() => {
        if (disposed) video.pause();
        else playedOnMobile.current = true;
      }).catch(() => {
        // Keep the poster visible if the browser blocks muted playback.
      });
    };
    const update = () => {
      frame = 0;
      if (desktop.matches) {
        video.pause();
        const bounds = section.getBoundingClientRect();
        const distance = Math.max(1, bounds.height - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -bounds.top / distance));
        if (Number.isFinite(video.duration)) targetTime = progress * video.duration;
        seek();
      } else {
        pointerX = 0;
        pointerY = 0;
        playOnce();
      }
      layer.style.setProperty("--hero-rotate-x", `${-pointerY * 1.5}deg`);
      layer.style.setProperty("--hero-rotate-y", `${pointerX * 1.5}deg`);
      layer.style.setProperty("--hero-shift-x", `${pointerX * 8}px`);
      layer.style.setProperty("--hero-shift-y", `${pointerY * 8}px`);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!desktop.matches || event.pointerType !== "mouse") return;
      const bounds = layer.getBoundingClientRect();
      pointerX = Math.min(1, Math.max(-1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      pointerY = Math.min(1, Math.max(-1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      schedule();
    };
    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      schedule();
    };
    const onReady = () => {
      setReady(true);
      schedule();
    };
    const onModeChange = () => {
      video.pause();
      requestedTime = -1;
      resetPointer();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      schedule();
    }, { threshold: 0.05 });

    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", resetPointer);
    desktop.addEventListener("change", onModeChange);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("seeked", seek);
    if (video.readyState >= 2) onReady();
    schedule();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", resetPointer);
      desktop.removeEventListener("change", onModeChange);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("seeked", seek);
      video.pause();
      layer.style.removeProperty("--hero-rotate-x");
      layer.style.removeProperty("--hero-rotate-y");
      layer.style.removeProperty("--hero-shift-x");
      layer.style.removeProperty("--hero-shift-y");
    };
  }, [enabled]);

  return { sectionRef, videoRef, layerRef, enabled, ready };
}