# Composting

Landing page educativa em português sobre compostagem, solo e clima. Next.js App Router, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger e Lenis, com estrutura compatível com shadcn.

## Desenvolvimento

Node.js 22.18+ (ou 24) e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para revisar a versão de produção: `npm run build` e `npm start`. Não execute build e dev simultaneamente usando a mesma pasta .next.

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Os componentes ficam em `components/ui`, os estilos e tokens em `app/globals.css`, e os dados do guia em `lib/composting.ts`. `components.json` configura os aliases shadcn. O scaffold já instalou TypeScript e Tailwind; não há setup adicional. Para novos componentes, use `npx shadcn@latest add nome`.

## Conteúdo e comportamento

Navegação por âncoras com seção ativa, guia por método, consulta de materiais, perguntas expansíveis e checklist temporário. Não há backend, cookies de analytics ou persistência do checklist. A navbar usa WebGL quando disponível e CSS como fallback. Reduced motion desliga a narrativa de scroll. O footer permite mover adesivos com ponteiro ou setas e restaurá-los com Escape/Home; clicar no lettering reinicia a composição.

O site funciona sem domínio configurado; canonical e sitemap ficam para a publicação. Não houve deploy automático. O plano e suas tarefas estão em `tasks/`.

## Movimento e scroll

`components/page-motion.tsx` coordena as cenas reversíveis do hero, faixa, ciclo, impacto, guia e materiais. Lenis suaviza somente a roda do mouse em telas maiores com ponteiro preciso e sem preferência por movimento reduzido. Usa o ticker do GSAP; toque, links de âncora, histórico e teclado mantêm navegação nativa. Ao mudar o conteúdo, ResizeObserver atualiza as medidas do ScrollTrigger. Navbar e footer mantêm suas próprias animações.

`tests/motion.browser.mjs` contém uma verificação com asserts para executar no console do navegador após abrir a página: copie a função removendo apenas `export default` e execute `await verifyMotion()`. Ela verifica suavização, reversão, histórico, controles e ausência de overflow; altera somente o estado temporário da visita. Repita com viewport mobile e preferência de movimento reduzido. Esse roteiro complementa `npm test`, que verifica os dados e regras de compostagem.

A terceira versão acrescenta duas cenas fixas em desktops com espaço suficiente, revelação horizontal dos títulos e adesivos no hero, guia e kit final. `app/interactive.css` contém essa composição. Os adesivos podem ser arrastados, movidos por setas ou selecionados e posicionados por clique/toque na área; Escape/Home e “Repor adesivos” restauram posições. O checklist faz o vaso evoluir de terra para planta. Tudo fica apenas no estado temporário da visita.

`tests/scenes.browser.mjs` usa o mesmo procedimento de console: remova `export default` e execute `await verifyScenes()` para verificar pins, reversão, estados da planta e posicionamento sem arraste. Pins ficam desligados no mobile, em janelas baixas e em movimento reduzido.

## Recursos e autoria

- Liquid Navbar / Nimbus UI: código fornecido pelo usuário, crédito original a guglielmogiannattasio.it preservado no arquivo.
- Sticker Slap Footer: código fornecido pelo usuário, identificado como kedhareswer no registry https://21st.dev/r/kedhareswer/sticker-slap-footer. O registry exige autenticação; confirmar termos/licença do componente antes da publicação.
- Foto de jardinagem: https://images.unsplash.com/photo-1416879595882-3373a0480b5b, baixada localmente com transformação de tamanho/qualidade. Fonte Unsplash; revisar atribuição e licença específica antes de distribuição pública.
- Bricolage Grotesque e DM Sans: Google Fonts, servidas localmente pelo next/font. Licenças das famílias: https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque e https://github.com/google/fonts/tree/main/ofl/dmsans.
- Ícones Lucide (ISC); ilustração de favicon e imagem social criadas no projeto. Emojis usam a fonte do dispositivo.
- Conteúdo educativo: https://www.epa.gov/recycle/composting-home e https://www.epa.gov/sustainable-management-food/composting. Recomendações não substituem instruções específicas do sistema de compostagem.

Consulte `docs/validacao.md` para verificações e limitações.
