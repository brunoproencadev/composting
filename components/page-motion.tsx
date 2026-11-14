"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageMotion(){
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
