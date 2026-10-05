import { useEffect, useRef, useState } from "react";

export function useHeroVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
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
    let pointerX = 0;
    let pointerY = 0;
    let visible = false;
    let disposed = false;

    const syncPlayback = () => {
      video.loop = true;
      if (!visible) {
        video.pause();
        return;
      }
      if (video.readyState < 2 || !video.paused) return;
      void video.play().then(() => {
        if (disposed || !visible) video.pause();
      }).catch(() => {
        // The poster stays visible if playback is unavailable.
      });
    };
    const update = () => {
      frame = 0;
      if (!desktop.matches) {
        pointerX = 0;
        pointerY = 0;
      }
      layer.style.setProperty("--hero-rotate-x", `${-pointerY * 0.4}deg`);
      layer.style.setProperty("--hero-rotate-y", `${pointerX * 0.4}deg`);
      layer.style.setProperty("--hero-shift-x", `${pointerX * 3}px`);
      layer.style.setProperty("--hero-shift-y", `${pointerY * 3}px`);
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
      syncPlayback();
    };
    const onModeChange = () => {
      if (video.ended) video.currentTime = 0;
      syncPlayback();
      resetPointer();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      syncPlayback();
    }, { threshold: 0.05 });

    observer.observe(section);
    section.addEventListener("pointermove", onPointerMove, { passive: true });
    section.addEventListener("pointerleave", resetPointer);
    desktop.addEventListener("change", onModeChange);
    video.addEventListener("loadeddata", onReady);
    if (video.readyState >= 2) onReady();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", resetPointer);
      desktop.removeEventListener("change", onModeChange);
      video.removeEventListener("loadeddata", onReady);
      video.pause();
      layer.style.removeProperty("--hero-rotate-x");
      layer.style.removeProperty("--hero-rotate-y");
      layer.style.removeProperty("--hero-shift-x");
      layer.style.removeProperty("--hero-shift-y");
    };
  }, [enabled]);

  return { sectionRef, videoRef, layerRef, enabled, ready };
}