"use client";
import { useEffect, useId, useRef, useState } from "react";
import { NatureArt, type NatureKind } from "@/components/nature-art";
import { boundSticker } from "@/lib/sticker-bounds";

const labels = {leaf:"Folha",peel:"Casca",sprout:"Broto",worm:"Minhoca",bin:"Recipiente"};
const placements = {
  hero: [{kind:"leaf",x:17,y:20},{kind:"peel",x:80,y:78}],
  guide: [{kind:"leaf",x:14,y:58},{kind:"worm",x:80,y:55}],
  kit: [{kind:"sprout",x:18,y:45},{kind:"peel",x:50,y:65},{kind:"leaf",x:81,y:40}],
} satisfies Record<string,{kind:NatureKind;x:number;y:number}[]>;

export function StickerField({variant}: {variant:keyof typeof placements}) {
  const home = placements[variant];
  const [positions,setPositions] = useState(home.map(({x,y})=>({x,y})));
  const [selected,setSelected] = useState<number|null>(null);
  const field = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement|null)[]>([]);
  const drag = useRef<{id:number;i:number;px:number;py:number;x:number;y:number;moved:boolean}|null>(null);
  const suppressClick = useRef(false);
  const help = useId();
  const bounded = (i:number,x:number,y:number) => {
    const box = field.current?.getBoundingClientRect();
    return box ? boundSticker(x,y,box.width,box.height,buttons.current[i]?.offsetWidth??64) : {x,y};
  };
  const move = (i:number,x:number,y:number) => setPositions(old=>old.map((p,index)=>index===i?bounded(i,x,y):p));
  const reset = (i:number) => {move(i,home[i].x,home[i].y);setSelected(null);};
  useEffect(()=>{
    const el=field.current;if(!el)return;
    const observer=new ResizeObserver(()=>{
      const box=el.getBoundingClientRect();
      setPositions(old=>old.map((p,i)=>boundSticker(p.x,p.y,box.width,box.height,buttons.current[i]?.offsetWidth??64)));
    });observer.observe(el);return()=>observer.disconnect();
  },[]);
  return <div ref={field} className={`sticker-field sticker-field-${variant}${selected!==null?" is-placing":""}`} onClick={e=>{
    if(e.target!==e.currentTarget||selected===null)return;
    const box=e.currentTarget.getBoundingClientRect();
    move(selected,(e.clientX-box.left)/box.width*100,(e.clientY-box.top)/box.height*100);
    buttons.current[selected]?.focus();setSelected(null);
  }}>
    {home.map((item,i)=><button key={item.kind} ref={el=>{buttons.current[i]=el;}} type="button" className="play-sticker" style={{left:`${positions[i].x}%`,top:`${positions[i].y}%`}} aria-label={`Adesivo ${labels[item.kind]}`} aria-describedby={help} aria-pressed={selected===i}
      onPointerDown={e=>{
        if(e.button!==0)return;e.currentTarget.setPointerCapture(e.pointerId);suppressClick.current=false;
        drag.current={id:e.pointerId,i,px:e.clientX,py:e.clientY,...positions[i],moved:false};
      }} onPointerMove={e=>{
        const d=drag.current,box=field.current?.getBoundingClientRect();if(!d||d.id!==e.pointerId||!box?.width||!box.height)return;
        const dx=e.clientX-d.px,dy=e.clientY-d.py;if(!d.moved&&Math.hypot(dx,dy)<4)return;
        d.moved=true;move(i,d.x+dx/box.width*100,d.y+dy/box.height*100);
      }} onPointerUp={()=>{suppressClick.current=!!drag.current?.moved;drag.current=null;}}
      onPointerCancel={()=>{drag.current=null;suppressClick.current=true;}}
      onLostPointerCapture={()=>{drag.current=null;}}
      onClick={()=>{if(suppressClick.current){suppressClick.current=false;return;}setSelected(old=>old===i?null:i);}}
      onKeyDown={e=>{
        const changes:Record<string,[number,number]>={ArrowLeft:[-3,0],ArrowRight:[3,0],ArrowUp:[0,-3],ArrowDown:[0,3]};
        const delta=changes[e.key];if(delta){e.preventDefault();move(i,positions[i].x+delta[0],positions[i].y+delta[1]);}
        if(e.key==="Escape"||e.key==="Home"){e.preventDefault();reset(i);}
      }}><NatureArt kind={item.kind}/></button>)}
    <div className="sticker-help"><span id={help}>{selected===null?"Pode mexer :) · arraste ou selecione e toque na área":"Toque na área para posicionar · setas movem · Escape repõe"}</span><button type="button" onClick={()=>{setPositions(home.map(({x,y},i)=>bounded(i,x,y)));setSelected(null);}}>Repor adesivos</button></div>
  </div>;
}
