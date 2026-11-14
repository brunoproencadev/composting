"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function PageMotion(){
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ autoRaf: false, lerp: 0.12, syncTouch: false, anchors: false });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      // Let the browser own anchor history, focus and keyboard scrolling after cancelling wheel inertia.
      const interrupt = () => lenis.scrollTo(window.scrollY, { immediate: true });
      const onClick = (event: MouseEvent) => {
        if (event.target instanceof Element && event.target.closest('a[href^="#"]')) interrupt();
      };
      const onKey = (event: KeyboardEvent) => {
        if (["Tab", "Home", "End", "PageUp", "PageDown", "ArrowUp", "ArrowDown", " "].includes(event.key)) interrupt();
      };
      document.addEventListener("click", onClick, true);
      document.addEventListener("keydown", onKey, true);
      return () => {
        document.removeEventListener("click", onClick, true);
        document.removeEventListener("keydown", onKey, true);
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, []);
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const media=gsap.matchMedia();
    media.add({ desktop: "(min-width: 761px) and (pointer: fine)", motion: "(prefers-reduced-motion: no-preference)" },(context)=>{
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      gsap.from(".hero-copy > *",{y:28,opacity:0,duration:.85,stagger:.12,ease:"power3.out",clearProps:"all"});
      gsap.from(".hero-art",{y:30,opacity:0,rotation:3,duration:1.1,ease:"power3.out",clearProps:"all"});
      gsap.utils.toArray<HTMLElement>(".section-heading, .impact-heading").forEach(el=>gsap.from(el,{y:32,opacity:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 92%",once:true},clearProps:"all"}));
      const hero = gsap.timeline({ scrollTrigger: { id: "hero-depth", trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.65 }, defaults: { ease: "none", duration: 1 } });
      hero.fromTo(".hero-photo", { y: 0, rotation: -7 }, { y: desktop ? 64 : 18, rotation: desktop ? -2 : -5 }, 0)
        .to(".round-stamp", { y: desktop ? -45 : -12, rotation: desktop ? 65 : 27 }, 0)
        .to(".art-label", { y: desktop ? -30 : -10, rotation: -3 }, 0)
        .to(".doodle-star", { y: desktop ? 50 : 12, rotation: desktop ? 90 : 25 }, 0)
        .to(".orbit-one", { rotation: desktop ? 58 : 32 }, 0)
        .to(".orbit-two", { rotation: desktop ? -52 : -30 }, 0);
      gsap.utils.toArray<SVGPathElement>(".word-flower path").forEach(path => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.1, delay: 0.3, ease: "power2.out", clearProps: "strokeDasharray,strokeDashoffset" });
      });
      gsap.fromTo(".ticker > div", { x: desktop ? 120 : 35 }, {
        x: desktop ? -120 : -35, ease: "none",
        scrollTrigger: { id: "ticker-drift", trigger: ".ticker", start: "top bottom", end: "bottom top", scrub: 0.5 },
      });
      const cycle = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: {
        id: "compost-cycle", trigger: ".cycle-track", start: "top 85%", end: "bottom 35%", scrub: 0.6,
      } });
      cycle.fromTo(".cycle-track", { "--cycle-progress": 0 }, { "--cycle-progress": 1, duration: 1 }, 0);
      gsap.utils.toArray<HTMLElement>(".cycle-illustration").forEach((element, index) => {
        cycle.fromTo(element, { y: desktop ? 45 : 18, rotation: index % 2 ? 12 : -12, scale: 0.82 },
          { y: 0, rotation: 0, scale: 1, duration: 0.55 }, index * 0.15);
      });
      gsap.fromTo(".impact-manifesto", { "--panel-rotation": "-5deg", "--panel-rise": "24px" }, {
        "--panel-rotation": "1deg", "--panel-rise": "-8px", ease: "none",
        scrollTrigger: { id: "impact-panel", trigger: ".impact-grid", start: "top 90%", end: "bottom 30%", scrub: 0.7 },
      });
      gsap.fromTo(".big-sprout", { display: "inline-block", y: 12, rotation: -18 }, {
        y: -12, rotation: 10, ease: "none",
        scrollTrigger: { trigger: ".impact-grid", start: "top bottom", end: "bottom top", scrub: 0.7 },
      });
      gsap.utils.toArray<SVGElement>(".benefits article > svg").forEach(element => {
        gsap.fromTo(element, { y: desktop ? 18 : 8, rotation: -12 }, { y: -6, rotation: 8, ease: "none",
          scrollTrigger: { trigger: element.parentElement, start: "top 90%", end: "bottom 25%", scrub: 0.5 } });
      });
      const guide = gsap.timeline({ defaults: { ease: "none", duration: 1 }, scrollTrigger: {
        id: "guide-layers", trigger: ".guide", start: "top 90%", end: "bottom 20%", scrub: 0.7,
      } });
      guide.fromTo(".guide-pot", { y: desktop ? 32 : 12, rotation: -18 }, { y: desktop ? -24 : -8, rotation: 4 }, 0)
        .fromTo(".guide-flower", { rotation: -25, y: 16 }, { rotation: desktop ? 65 : 15, y: -12 }, 0)
        .fromTo(".guide-tag", { y: 14, rotation: -12 }, { y: -10, rotation: -3 }, 0);
      gsap.fromTo(".result-emoji", { y: desktop ? 18 : 8, rotation: -18 }, { y: desktop ? -18 : -6, rotation: 6, ease: "none",
        scrollTrigger: { id: "material-depth", trigger: ".material-result", start: "top 90%", end: "bottom 20%", scrub: 0.5 } });
    });return()=>media.revert();
  },[]);return null;
}
