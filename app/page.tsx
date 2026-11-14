import { PageMotion } from "@/components/page-motion";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Leaf, Sprout, Droplets, Wind, MoveUpRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { CompostGuide, MaterialExplorer, StartChecklist } from "@/components/compost-interactions";

const faqs = [
  ["Compostagem tem cheiro ruim?", "Uma composteira bem cuidada tem cheiro de terra. Mau cheiro costuma indicar excesso de umidade ou falta de ar. Na compostagem de quintal, misture e adicione folhas secas. No minhocário, reduza a alimentação, confira a drenagem e cubra os resíduos com material seco."],
  ["Posso fazer em apartamento?", "Sim. Um minhocário ventilado, com drenagem e protegido do sol e da chuva, pode funcionar em pouco espaço. Use minhocas próprias para compostagem e siga as orientações do fabricante. Se não houver um local adequado, procure uma iniciativa de compostagem comunitária."],
  ["Quanto tempo leva para ficar pronto?", "Depende do método, dos materiais, da temperatura e do manejo. Pode levar alguns meses. Mais importante que contar dias é reconhecer o resultado: material escuro, solto, com cheiro de terra e sem restos de alimentos identificáveis. Deixe o composto maturar antes de usar."],
  ["O que faço com o composto pronto?", "Use como complemento do solo em vasos, hortas e jardins, respeitando as necessidades das plantas. Não plante diretamente em composto puro. O líquido coletado no fundo da composteira não é o mesmo que composto maduro e não deve ser aplicado sem orientação e tratamento adequados."],
];

export default function Home() {
  return <>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <SiteHeader />
    <main id="conteudo">
      <section className="hero wrap" id="inicio" aria-labelledby="hero-title">
        <div className="hero-top"><span className="eyebrow"><span className="live-dot" /> PEQUENOS HÁBITOS. NOVOS CICLOS.</span><span className="hero-index">UM GUIA PARA CULTIVAR O AMANHÃ ↗</span></div>
        <div className="hero-grid">
          <div className="hero-copy"><h1 id="hero-title">Nada termina.<br />Tudo se <span className="word-flower">transforma<svg viewBox="0 0 500 30" aria-hidden="true"><path d="M4 19Q180 -4 492 15M30 27Q230 7 450 22" /></svg></span>.</h1>
            <p>O que sobra na sua cozinha pode ser o começo de algo vivo. Descubra a compostagem e devolva à terra o que é da terra.</p>
            <a className="button primary" href="#como-fazer">Bora compostar <ArrowUpRight size={20} /></a>
            <div className="hero-footnote"><span className="mini-leaf"><Leaf size={19}/></span> Bom para suas plantas.<br />Melhor ainda para o planeta.</div>
          </div>
          <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/>
            <div className="hero-photo"><Image src="/images/garden.jpg" alt="Plantas, terra e ferramentas de jardinagem sobre uma bancada" fill priority sizes="(max-width: 760px) 90vw, 48vw" /></div>
            <div className="round-stamp"><svg viewBox="0 0 150 150" aria-hidden="true"><defs><path id="stamp-circle" d="M75 75m-56 0a56 56 0 1 1 112 0a56 56 0 1 1-112 0" /></defs><text><textPath href="#stamp-circle" textLength="350">MENOS DESCARTE · MAIS VIDA · </textPath></text></svg><Sprout size={42}/></div>
            <span className="art-label">o futuro tem raízes.</span><div className="hero-note"><span>100% ciclo da natureza</span><span>resíduo → solo → vida <MoveUpRight size={16}/></span></div>
            <svg className="doodle-star" viewBox="0 0 80 80" aria-hidden="true"><path d="M40 3v74M3 40h74M14 14l52 52M14 66l52-52" /></svg>
          </div>
        </div>
        <div className="hero-bottom"><a href="#ciclo"><ArrowDown size={17}/> Role para ver a natureza trabalhar</a><span>COMEÇA NA SUA COZINHA. CONTINUA NO PLANETA.</span></div>
      </section>
      <div className="ticker" aria-hidden="true"><div>restos viram recomeços <span>✳</span> o solo agradece <span>✳</span> menos lixo, mais vida <span>✳</span> restos viram recomeços <span>✳</span> o solo agradece <span>✳</span></div></div>
      <section id="ciclo" className="section wrap cycle-section"><div className="section-top"><span className="eyebrow">01 / ENTENDA O CICLO</span><span className="tiny-note">A NATUREZA JÁ SABE O CAMINHO.</span></div>
        <div className="section-heading"><h2>Não é lixo.<br />É <em>vida em processo.</em></h2><p>A compostagem é a decomposição controlada de matéria orgânica, com a ajuda de oxigênio e pequenos organismos. O resultado? Um composto que nutre o solo.</p></div>
        <div className="cycle-track">
          {[{n:"01",emoji:"🍌",title:"Separe",text:"Cascas, borra de café e folhas. O ciclo começa no que sobra."},{n:"02",emoji:"🍂",title:"Cuide",text:"Materiais secos, umidade e ar: a natureza precisa de equilíbrio."},{n:"03",emoji:"🪱",title:"Transforme",text:"Microrganismos fazem seu trabalho. No minhocário, as minhocas ajudam."},{n:"04",emoji:"🌱",title:"Cultive",text:"O composto maduro devolve nutrientes ao solo. E a vida continua."}].map(x=><article className="cycle-item" key={x.n}><span className="cycle-number">{x.n}</span><div className="cycle-illustration">{x.emoji}</div><h3>{x.title}</h3><p>{x.text}</p></article>)}
        </div><p className="cycle-caption">Um pequeno gesto. Um ciclo inteiro de possibilidades. <span>↻</span></p>
      </section>
      <section id="impacto" className="impact section"><div className="wrap"><div className="section-top"><span className="eyebrow">02 / UM PLANETA MAIS VIVO</span><Leaf size={27}/></div><div className="impact-heading"><h2>O planeta sente<br />a <em>diferença.</em></h2><p>O destino dos seus resíduos importa.<br />E muito mais do que parece.</p></div>
        <div className="impact-grid"><div className="impact-manifesto"><span className="big-sprout">↗</span><h3>O melhor resíduo é<br />o que não é gerado.</h3><p>Primeiro, evite o desperdício. Para as sobras inevitáveis, a compostagem abre um caminho de volta à terra.</p><a href="https://www.epa.gov/sustainable-management-food/composting" target="_blank" rel="noopener noreferrer">Explore a ciência por trás <ArrowUpRight size={17}/></a></div><div className="benefits">
          {[{icon:Wind,title:"Menos orgânicos nos aterros",text:"Em ambientes sem oxigênio, resíduos orgânicos geram metano, um gás de efeito estufa. A compostagem bem manejada oferece outra rota."},{icon:Sprout,title:"Mais nutrientes no solo",text:"O composto devolve matéria orgânica e nutrientes à terra, ajudando a cultivar plantas e ecossistemas mais saudáveis."},{icon:Droplets,title:"Água que fica, vida que cresce",text:"Solos com composto podem reter melhor a água e resistir à erosão, contribuindo para enfrentar períodos de seca e chuvas intensas."}].map(({icon:Icon,title,text})=><article key={title}><Icon size={26}/><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div></div><p className="source-note">Benefícios variam com o método e o manejo. Fontes: <a href="https://www.epa.gov/recycle/composting-home" target="_blank" rel="noopener noreferrer">EPA — compostagem doméstica ↗</a></p></div></section>
      <section id="como-fazer" className="section wrap"><div className="section-top"><span className="eyebrow">03 / MÃO NA TERRA</span><span className="tiny-note">NÃO PRECISA SER COMPLICADO.</span></div><div className="section-heading"><h2>Seu espaço.<br />Seu <em>primeiro ciclo.</em></h2><p>Um quintal ou um cantinho protegido. Escolha o caminho que faz sentido para sua casa e comece no seu ritmo.</p></div><CompostGuide/></section>
      <section id="materiais" className="materials section"><div className="wrap"><div className="section-top"><span className="eyebrow">04 / CADA COISA NO SEU LUGAR</span><span>✳</span></div><div className="section-heading"><h2>Vai pra<br /><em>composteira?</em></h2><p>Nem tudo que é orgânico deve entrar na sua composteira doméstica. Toque em um material e descubra o destino certo.</p></div><MaterialExplorer/></div></section>
      <section id="duvidas" className="section wrap faq-section"><div><span className="eyebrow">05 / É NORMAL TER DÚVIDAS</span><h2>Vamos<br /><em>descomplicar.</em></h2><span className="faq-doodle" aria-hidden="true">?</span></div><div className="faq-list">{faqs.map(([q,a],i)=><details key={q}><summary><span className="faq-number">0{i+1}</span>{q}<span className="faq-plus">+</span></summary><p>{a}</p></details>)}</div></section>
      <section id="comece" className="start section wrap"><span className="eyebrow">UM NOVO HÁBITO PODE COMEÇAR HOJE</span><h2>O amanhã se planta<br /><em>com o que sobra hoje.</em></h2><p>Sem perfeição. Sem pressa. Um passo de cada vez.</p><StartChecklist/><a className="button primary" href="#como-fazer">Meu primeiro passo <ArrowUpRight size={20}/></a></section>
    </main>
    <SiteFooter/><PageMotion/>
  </>;
}