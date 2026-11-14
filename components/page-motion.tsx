"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export function PageMotion(){
  useEffect(() => {
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
    media.add("(prefers-reduced-motion: no-preference)",()=>{
      gsap.from(".hero-copy > *",{y:28,opacity:0,duration:.85,stagger:.12,ease:"power3.out",clearProps:"all"});
      gsap.from(".hero-art",{y:30,opacity:0,rotation:3,duration:1.1,ease:"power3.out",clearProps:"all"});
      gsap.utils.toArray<HTMLElement>(".section-heading, .impact-heading, .benefits article, .cycle-item").forEach(el=>gsap.from(el,{y:32,opacity:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 92%",once:true},clearProps:"all"}));
      gsap.to(".hero-photo",{yPercent:8,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:1}});
      gsap.fromTo(".cycle-track",{"--cycle-progress":"0%"},{"--cycle-progress":"100%",ease:"none",scrollTrigger:{trigger:".cycle-track",start:"top 85%",end:"bottom 40%",scrub:1}});
    });return()=>media.revert();
  },[]);return null;
}
