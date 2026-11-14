# Composting

Landing page educativa em português sobre compostagem, solo e clima. Next.js App Router, React, TypeScript, Tailwind CSS e GSAP/ScrollTrigger, com estrutura compatível com shadcn.

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

## Recursos e autoria

- Liquid Navbar / Nimbus UI: código fornecido pelo usuário, crédito original a guglielmogiannattasio.it preservado no arquivo.
- Sticker Slap Footer: código fornecido pelo usuário, identificado como kedhareswer no registry https://21st.dev/r/kedhareswer/sticker-slap-footer. O registry exige autenticação; confirmar termos/licença do componente antes da publicação.
- Foto de jardinagem: https://images.unsplash.com/photo-1416879595882-3373a0480b5b, baixada localmente com transformação de tamanho/qualidade. Fonte Unsplash; revisar atribuição e licença específica antes de distribuição pública.
- Bricolage Grotesque e DM Sans: Google Fonts, servidas localmente pelo next/font. Licenças das famílias: https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque e https://github.com/google/fonts/tree/main/ofl/dmsans.
- Ícones Lucide (ISC); ilustração de favicon e imagem social criadas no projeto. Emojis usam a fonte do dispositivo.
- Conteúdo educativo: https://www.epa.gov/recycle/composting-home e https://www.epa.gov/sustainable-management-food/composting. Recomendações não substituem instruções específicas do sistema de compostagem.

Consulte `docs/validacao.md` para verificações e limitações.