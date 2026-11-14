# Validação — 14/11/2026

## Implementado

Página educativa em pt-BR, HTML pré-renderizado, Next.js/React/TypeScript/Tailwind, estrutura shadcn e GSAP/ScrollTrigger. Integração dos dois componentes completos recebidos na conversa, com adaptação de conteúdo e acessibilidade. Não foi instalado um segundo conjunto de componentes pelo registry autenticado.

A navbar recebeu cleanup de recursos WebGL e áudio, pausa por visibilidade, atualização da preferência de movimento, reavaliação após fontes carregarem, nomes acessíveis em português e aria-current de localização. O footer mantém desenho SVG, replay e arraste por ponteiro/teclado; rótulos foram traduzidos e contatos fictícios removidos.

## Provas

- TypeScript, ESLint e testes de lógica executados. Dois testes verificam classificação por método, materiais inadequados, IDs únicos e integridade dos passos.
- Build de produção pré-renderiza a rota principal.
- Chrome: consulta de materiais alternando cítricos entre quintal e minhocário, guia por método, checklist completo e movimentação/reset por teclado de adesivo passaram em verificação automatizada no DOM.
- Nenhum link interno aponta para seção ausente. Documento usa pt-BR, um H1 e metadata própria.
- Layout inspecionado em desktop e viewport mobile. Larguras verificadas: 320, 768, 1024 e 1440 px; sem rolagem horizontal após correção do transbordamento decorativo.
- axe-core 4.10.3 executado no Chrome mobile com regras WCAG 2 A/AA e WCAG 2.1 AA: nenhuma violação automática no estado inicial após corrigir contraste dos textos auxiliares. Não equivale a uma certificação de acessibilidade.
- Caminho sem WebGL validado por simulação de getContext retornando null: indicador CSS visível. Caminho JS de reduced motion validado por simulação de matchMedia: animação GSAP não aplicada e navbar em estado estático. CSS contém alternativas para preferência nativa; não foi alterada a configuração do sistema operacional.
- Sem erros ou avisos no console na navegação principal inspecionada.
- npm audit --omit=dev: zero vulnerabilidades. Auditoria completa encontrou 7 alertas moderados na árvore de desenvolvimento do typescript-eslint/minimatch. npm audit fix não eliminou esses alertas; não foi forçada atualização incompatível.

## Limites e trabalho de publicação

- Não houve deploy, push ou configuração de domínio. Canonical/sitemap dependem do domínio real. O build avisa que a imagem social resolve para localhost enquanto metadataBase não for configurado; ajustar para o domínio real na publicação.
- Sem ensaio em Safari/Firefox, leitor de tela, dispositivo físico, zoom 200% ou medição de desempenho de campo. Lighthouse e INP real não foram medidos; não há pontuação de performance declarada.
- Testes de toque/arraste físico, variações de GPU e mudança nativa da preferência de movimento ainda merecem validação em dispositivos reais.
- Licença específica dos componentes e identificação/autoria da foto precisam ser confirmadas antes de publicação. Fontes e proveniência estão no README. Não há contatos nem redes inventadas.
- Primeiro escopo usa profundidade por CSS, SVG e WebGL da navbar; não inclui cena Three.js, analytics, backend ou persistência de checklist.
- O ciclo usa ilustrações com emojis do dispositivo em vez de um modelo 3D; sua aparência varia por sistema.
