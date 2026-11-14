export type NatureKind = "leaf" | "peel" | "worm" | "sprout" | "bin";
export function NatureArt({kind, className}: {kind: NatureKind; className?: string}) {
  return <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
    {kind === "leaf" && <><path d="M22 96C6 43 50 15 103 17c6 57-25 94-68 77" fill="#a9bd63" stroke="#173d2b" strokeWidth="3"/><path d="M18 108 83 35M43 79l-2-25m17 11 25 1" stroke="#173d2b" strokeWidth="3" strokeLinecap="round"/></>}
    {kind === "peel" && <><path d="M32 13c-6 51 16 69 62 67-22 35-71 18-78-14C10 44 18 22 32 13Z" fill="#efd06e" stroke="#75532e" strokeWidth="3"/><path d="M32 13c17 40 27 51 64 58L82 91C52 78 29 51 32 13Z" fill="#f5df9b" stroke="#75532e" strokeWidth="3"/><path d="m29 13 9-7" stroke="#75532e" strokeWidth="7" strokeLinecap="round"/></>}
    {kind === "worm" && <><path d="M16 83c14-44 28 15 43-20s27-42 43-17" stroke="#bc715e" strokeWidth="19" strokeLinecap="round"/><path d="m27 73 9 5m15-5 9 4m5-23 10 4m5-19 8 8" stroke="#7f493e" strokeWidth="2"/><circle cx="97" cy="40" r="2.5" fill="#173d2b"/></>}
    {kind === "sprout" && <><path d="M60 108V51" stroke="#426d3b" strokeWidth="5" strokeLinecap="round"/><path d="M59 72C23 77 16 53 16 40c30-4 46 10 43 32Z" fill="#a9bd63" stroke="#426d3b" strokeWidth="2"/><path d="M61 53c-1-27 22-39 43-37 0 29-17 41-43 37Z" fill="#d5e86c" stroke="#426d3b" strokeWidth="2"/><path d="M35 112c12-7 36-7 50 0" stroke="#75532e" strokeWidth="4" strokeLinecap="round"/></>}
    {kind === "bin" && <><path d="m27 35 9 72h48l9-72" fill="#c78256" stroke="#70492d" strokeWidth="3"/><path d="M22 27h76v13H22z" fill="#e6b380" stroke="#70492d" strokeWidth="3"/><path d="M43 55v33m17-33v33m17-33v33" stroke="#70492d" strokeWidth="2"/></>}
  </svg>;
}
