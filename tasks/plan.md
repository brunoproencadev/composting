# Composting — plano do projeto

## Objetivo e escopo
Landing page educativa em português brasileiro: entender a compostagem, sua relação com o clima e começar em casa. Uma página pública, conteúdo renderizado em HTML, navegação por âncoras e interações locais. Nome inicial: Composting. CTA principal: “Comece a compostar”. Sem cadastro, banco de dados, pagamentos ou coleta de dados nesta versão.

Estado observado: diretório contém apenas .git; não há aplicação, componentes, estilos ou testes existentes. Este documento é planejamento; os componentes enviados ainda não foram instalados.

## Direção de design
Conceito: “Nada termina. Tudo se transforma.” Uma experiência editorial e tátil, com linguagem de jardim e recortes de papel, que acompanha restos de alimentos até virarem solo vivo. Equilibrar a delicadeza do vidro líquido com a energia gráfica dos adesivos. Evitar aparência corporativa, excesso de cartões, gradientes decorativos e efeitos competindo pela atenção.

Paleta proposta:
| Uso | Cor |
| --- | --- |
| Papel / fundo | #F4F0E6 |
| Texto / verde profundo | #173D2B |
| Painéis escuros / footer | #234B32 |
| Destaque vegetal | #D5E86C |
| Terracota / detalhes | #C45B35 |
| Solo / ilustrações | #563E2D |

As combinações finais dependem de medição de contraste. Terracota será inicialmente decorativo; não assumir legibilidade de texto pequeno sobre essa cor.

Tipografia proposta: Bricolage Grotesque 600–800 para títulos expressivos; DM Sans 400–600 para leitura, botões e navegação. Fontes hospedadas localmente via next/font, com subconjuntos necessários e fallback do sistema. O lettering do footer permanece o SVG fornecido, sem uma terceira fonte.

Escala fluida: hero 56–128 px; títulos de seção 36–72 px; corpo 17–20 px, entrelinha 1,55–1,7 e largura de 55–68 caracteres. Evitar títulos que estourem em 320 px. Grid de 12 colunas no desktop, 4 no mobile; conteúdo com máximo de aproximadamente 1280 px, margens de 20–64 px e respiros de seção de 64–144 px. Assimetria controlada, bordas orgânicas, textura discreta sem prejudicar o texto.

Imagens: recortes de cascas, folhas, borra de café, minhocas e brotos; uma imagem protagonista com aparência tátil. SVG para diagramas e adesivos, AVIF/WebP para fotografias. Todo recurso externo terá origem/licença registrada; sem depender de hotlinks.

## Jornada e conteúdo
| Ordem / âncora | Conteúdo | Interação e composição |
| --- | --- | --- |
| 1. #inicio | Hero: “O que sobra hoje pode florescer amanhã.” Apoio: transforme resíduos orgânicos em cuidado com o solo e o clima. CTAs “Comece a compostar” e “Entenda o impacto”. | Tipografia grande à esquerda, composição de resíduos e broto à direita; entrada curta, profundidade e deslocamento suave ao scroll. |
| 2. #ciclo | “Não é o fim. É o começo de outro ciclo.” Resíduo → decomposição → composto → planta. | Diagrama em camadas que se transforma conforme a rolagem; versão vertical estática no mobile/reduced motion. |
| 3. #impacto | Relação entre resíduos em aterros, metano, compostagem bem manejada e saúde do solo. Benefícios: nutrientes, água, menor envio de orgânicos ao aterro. | Comparação visual das rotas e três blocos editoriais; fontes próximas das afirmações. |
| 4. #como-fazer | Escolha do método e guia: preparar local/recipiente adequado, separar resíduos, equilibrar materiais, acompanhar umidade/aeração e reconhecer composto pronto. | Alternância “Tenho quintal” / “Tenho pouco espaço”, com instruções próprias de compostagem aeróbia e vermicompostagem; passos selecionáveis, sem misturar manejo dos métodos. |
| 5. #materiais | “Isso pode virar composto?” Exemplos de materiais e cuidados por método. | Selecionar um material mostra “Pode”, “Evite” ou “Depende”, com motivo e alternativa; lista acessível também por teclado. Não exigir drag and drop. |
| 6. #duvidas | Cheiro, insetos, espaço, tempo, uso do composto e cuidados. | Accordion acessível, com respostas curtas e orientações contextualizadas. |
| 7. #comece | “Seu próximo ciclo começa na cozinha.” Checklist dos primeiros passos. | Marcar itens durante a visita; CTA retorna ao guia. Sem persistência nesta versão. |
| 8. footer | Fechamento expressivo com wordmark “composting”, links do guia e referências. | Sticker Slap Footer fornecido, lettering que se desenha, adesivos arrastáveis e replay. |

Tom: claro, acolhedor e prático, sem culpa nem promessa de resolver a crise climática individualmente. Priorizar evitar desperdício antes de destinar sobras à compostagem. Não prometer emissões zero, prazos universais ou conversões de kg para CO₂ sem metodologia. O guia distinguirá composto maduro de material em decomposição e não recomendará líquido coletado sem tratamento como fertilizante seguro.

## Navbar obrigatória
Arquivo: /components/ui/liquid-glass-navbar.tsx. Integrar o código fornecido, preservando shader, gota elástica, refração e fallback CSS. Itens: Início, Impacto, Como fazer, Materiais. Ícones pertinentes ao tema, labels em português, som desligado. Header fixo centralizado com espaço de segurança; links reais por âncora, seção ativa por IntersectionObserver e scroll-margin para não ocultar títulos. No mobile, manter labels curtas se couberem; alternativa compacta com nomes acessíveis.

Ajustes de integração: herdar DM Sans e paleta, aria-label em português e aria-current="location" para seção; foco visível, alvos de pelo menos 44 px. Testar fundo translúcido sobre todas as seções. Auditar índices vazios/inválidos, cleanup de WebGL e timers, React Strict Mode, perda de contexto, redimensionamento após fontes carregarem, visibilidade da aba e mudanças de reduced motion em tempo real. Reduced motion deve produzir estado estático e interromper efeitos contínuos; o código recebido ainda demanda essa validação.

## Footer obrigatório
Arquivo: /components/ui/sticker-slap-footer.tsx. Preservar o componente enviado e seus mecanismos próprios de animação, arraste por ponteiro e teclado, retorno com Escape/Home e replay do lettering. Configurar paper creme, panel verde, cream creme e accent vegetal/laranja conforme contraste. Adesivos de folhas, flor, coração e mensagens como “solo vivo”, usando a API existente para arte própria.

Substituir conteúdo de estúdio: jobsLabel="Explore" e jobs com links reais para seções. Ocultar endereço, mapa, email, chat e redes enquanto não existirem dados reais; não publicar os padrões fictícios do demo. Referências podem ser links reais nessa coluna. Preservar autoria original nos comentários e verificar licença/atribuição antes da distribuição; não apresentar créditos fictícios como autoria do projeto. Traduzir também labels acessíveis, status e botão de créditos. Garantir que o corte do lettering não corte controles, e que adesivos não bloqueiem links. Testar pointercancel, perda de captura, scroll em toque, foco e reset.

O comando do registry enviado está com aspas incompletas. Como o código completo já foi fornecido, a integração será por cópia local, sem instalar novamente pelo registry. Demos servem de referência, não serão páginas publicadas.

## Stack e organização
Proposta: Next.js App Router + React + TypeScript + Tailwind CSS + estrutura shadcn. Next.js permite HTML inicial com conteúdo e metadata para uma landing pública; nenhuma API é necessária. GSAP + ScrollTrigger para a narrativa de scroll, CSS para microinterações e APIs nativas para observação. Navbar e footer usam React e suas animações originais; GSAP não controlará as mesmas propriedades desses componentes.

Não instalar Anime.js, Motion, ScrollReveal e Lottie em conjunto. Profundidade inicial com imagens em camadas e transforms CSS. Three.js fica fora do primeiro escopo: só adicionar se uma cena realmente tridimensional trouxer ganho sobre a composição em camadas e passar no orçamento mobile. O WebGL da navbar já fornece um efeito avançado.

Estrutura prevista:
```text
app/layout.tsx                  # idioma, fontes e metadata
app/page.tsx                    # composição e conteúdo principal
app/globals.css                 # Tailwind, tokens e estilos globais
components/ui/                  # navbar, footer e primitives shadcn usados
components/sections/            # seções e interações específicas
lib/composting.ts               # conteúdo tipado compartilhado pelos seletores
lib/utils.ts                   # helper padrão do shadcn, se necessário
public/images/                 # imagens otimizadas
components.json                # aliases e configuração shadcn
tests/                         # lógica e fluxos essenciais
```

Não existe caminho padrão no diretório atual. Adotaremos literalmente /components/ui, com alias @/components/ui e @/* apontando à raiz. Essa pasta organiza os componentes copiados e corresponde aos imports fornecidos; é uma convenção configurável, não uma obrigação do React. Estilos globais em /app/globals.css; CSS encapsulado dos componentes permanece neles inicialmente.

Setup previsto, não executado:
```sh
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
npx shadcn@latest init
npm install gsap
```
Revisar opções do CLI na implementação para garantir os caminhos acima. TypeScript e Tailwind serão configurados pelo scaffold; instalar primitives shadcn somente conforme uso real.

## Motion e responsividade
Scroll nativo, sem scroll hijacking ou cursor customizado. Entrada do hero em 600–900 ms; microinterações em 150–250 ms. Revelações discretas, cerca de 24–40 px, executadas uma vez. Uma sequência principal ligada ao scroll explica o ciclo; sticky/pin apenas no desktop se houver espaço, sem impedir acesso ao conteúdo.

gsap.matchMedia separa desktop, mobile e reduced motion, com cleanup ao desmontar. No mobile, reduzir parallax e remover pin; todo conteúdo permanece disponível. Nenhuma informação depende de hover, canvas ou animação. Ausência de WebGL usa CSS; falha de animação não oculta textos. Pausar trabalho contínuo fora da tela e com aba oculta, limitar DPR da navbar e evitar alterações de layout a cada frame.

## Acessibilidade, SEO e qualidade
HTML semântico, lang pt-BR, um H1, hierarquia de títulos, skip link, foco visível e ordem de tabulação natural. Contraste WCAG AA: 4,5:1 em texto normal e 3:1 em texto grande e controles pertinentes. Labels, feedback de estado e instruções de adesivos em português. Checklist e materiais funcionam sem arrastar. Verificar zoom 200%, 320 px de largura, modo retrato/paisagem e teclado.

Metadata, Open Graph, favicon e imagem social; canonical e sitemap apenas com domínio confirmado. Conteúdo principal em HTML renderizado, dimensões de imagens reservadas, imagem principal priorizada e demais em lazy load. Sem analytics nesta fase. Metas de produção: LCP <= 2,5 s, CLS <= 0,1, INP <= 200 ms; medições locais são indicativas e INP real depende de uso em campo. Meta inicial Lighthouse mobile >= 90 em performance e >= 95 em acessibilidade/SEO, sem tratar pontuação como garantia.

## Ordem de entrega
Tarefas e critérios detalhados em tasks/todo.md. Primeiro base e integração dos componentes obrigatórios; depois conteúdo e interações; então motion, acessibilidade e validação. Não fazer deploy nem iniciar implementação nesta etapa de planejamento.

## Riscos e decisões pendentes
- Componentes extensos recebidos não foram executados: aparência, types e lifecycle precisam ser validados cedo.
- Refração varia entre navegadores; fallback visual é parte obrigatória da entrega.
- Sem contato, redes, domínio ou marca fornecidos: usar Composting e navegação interna; ocultar canais inexistentes.
- Recursos gráficos e fontes precisam de licença compatível; registrar autoria antes de publicação.
- Não usar números ambientais genéricos dos EUA como estatísticas brasileiras. Métodos e recomendações serão revisados na redação final.
- Hosting/domínio ficam para depois da implementação, sem impedir desenvolvimento local.

## Referências consultadas
- shadcn / Next.js: https://ui.shadcn.com/docs/installation/next
- ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- gsap.matchMedia: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Compostagem doméstica: https://www.epa.gov/recycle/composting-home
- Compostagem e impactos: https://www.epa.gov/sustainable-management-food/composting
