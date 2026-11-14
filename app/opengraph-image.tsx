import { ImageResponse } from "next/og";
export const alt = "Composting — Nada termina. Tudo se transforma.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage(){
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:70,background:"#f4f0e6",color:"#173d2b",fontFamily:"sans-serif"}}><div style={{fontSize:28,display:"flex"}}>↗ composting.</div><div style={{display:"flex",flexDirection:"column",fontSize:88,fontWeight:700,letterSpacing:-5,lineHeight:1.05}}><span>Nada termina.</span><span style={{color:"#65753b"}}>Tudo se transforma.</span></div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:22}}><span>Pequenos hábitos. Novos ciclos.</span><span style={{background:"#d5e86c",padding:"16px 28px",borderRadius:40}}>Cultive a mudança ↗</span></div></div>,size);
}