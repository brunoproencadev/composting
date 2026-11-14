"use client";
import { useEffect, useState } from "react";
import { Leaf, House, Sprout, Globe, Recycle, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidNavbar } from "@/components/ui/liquid-glass-navbar";
import StickerSlapFooter from "@/components/ui/sticker-slap-footer";

const items = [
  { label: "Início", href: "#inicio", icon: <House size={17}/>, fx: "glow" as const },
  { label: "Impacto", href: "#impacto", icon: <Globe size={17}/>, fx: "spin" as const },
  { label: "Como fazer", href: "#como-fazer", icon: <Sprout size={17}/>, fx: "pop" as const },
  { label: "Materiais", href: "#materiais", icon: <Recycle size={17}/>, fx: "wave" as const },
];
export function SiteHeader(){
  const [active,setActive]=useState(0);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{ for(const entry of entries) if(entry.isIntersecting) {const i=items.findIndex(x=>x.href===`#${entry.target.id}`);if(i>=0)setActive(i);} },{rootMargin:"-15% 0px -65% 0px"});
    items.forEach(x=>{const el=document.querySelector(x.href);if(el)observer.observe(el);});return()=>observer.disconnect();
  },[]);
  return <header className="site-header"><a className="brand" href="#inicio" aria-label="Composting, início"><Leaf size={24} strokeWidth={2.3}/><span>composting<span className="brand-dot">.</span></span></a><LiquidNavbar items={items} active={active} onChange={setActive} tone="light" sound={false} compact={false}/><a className="header-cta" href="#comece">Cultive a mudança <ArrowUpRight size={17}/></a></header>;
}
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
export function SiteFooter(){
  return <div><StickerSlapFooter wordmark="composting" homeHref="#inicio" navLabel="topo" navHref="#inicio" jobsLabel="Continue o ciclo" jobs={[{title:"Aprenda a compostar ↗",href:"#como-fazer"},{title:"O que pode entrar? ↗",href:"#materiais"},{title:"Tire suas dúvidas ↗",href:"#duvidas"},{title:"Referências · EPA ↗",href:"https://www.epa.gov/recycle/composting-home"}]} address={[]} email="" chatHref="" socials={[]} note="" credits={[]} paper="#f4f0e6" panel="#234b32" ink="#173d2b" cream="#f4f0e6" accent="#d5e86c" fontSans="var(--font-body), sans-serif" height="70svh" wordmarkMaxHeight="45svh" stickers={[{kind:"burst",text:"solo vivo",label:"Adesivo solo vivo"},{kind:"daisy",label:"Adesivo flor"},{kind:"heart",label:"Adesivo coração"},{kind:"bubble",text:"mais vida!",label:"Adesivo mais vida"},{kind:"smiley",label:"Adesivo sorriso"}]}/><div className="footer-bottom wrap"><span>Pequenos hábitos. Um planeta inteiro.</span><span>Feito para inspirar novos ciclos. © 2026</span></div></div>;
}