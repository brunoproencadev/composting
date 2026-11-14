# Segunda versão — scroll e movimento

Status: planejamento. A implementação desta etapa ainda não começou. Complementa tasks/plan.md; as pendências anteriores permanecem em tasks/todo.md.

## Objetivo

Deixar a navegação fluida e os elementos visuais vivos enquanto o visitante rola a página. Preservar a identidade, o conteúdo, os controles e os componentes de navbar/footer escolhidos pelo usuário. O movimento acompanha a posição e a direção da rolagem: avançar e voltar revela a mesma composição de forma previsível.

## Diagnóstico do código atual

PageMotion em components/site-shell.tsx controla entradas do hero, reveals com once:true, parallax da foto e progresso da linha do ciclo. Os demais visuais ficam estáticos. scroll-behavior:smooth no CSS suaviza navegação por âncoras, mas não o movimento da roda do mouse. A navbar mantém seu WebGL e o footer tem listeners próprios de scroll e ponteiro.

Invariantes: um proprietário por transformação; não deslocar alvos de clique ou texto longo durante leitura; não esconder informações como condição para uma animação; respeitar movimento reduzido e troca de preferência em tempo real. Não transformar o documento inteiro: header sticky, âncoras, foco, busca e scrollbar devem continuar corretos.

## Solução técnica

1. Manter GSAP/ScrollTrigger, já instalados, para as cenas e scrub. Usar gsap.matchMedia para desktop/mobile/reduced motion.
2. Adicionar somente Lenis para suavizar wheel em dispositivos com ponteiro preciso. A dependência se justifica por gerir inércia, interrupção, dimensões e integração de scroll; não escrever um motor próprio. Toque continua nativo, sem syncTouch nem inércia adicional.
3. Integrar Lenis ao ticker do GSAP e ScrollTrigger.update, sem autoRaf concorrente. Não desativar globalmente mecanismos do GSAP que a navbar/footer possam usar. Confirmar API da versão instalada antes de configurar.
4. Uma instância por página; destruir instância, listeners, callbacks do ticker e timelines no cleanup, incluindo Strict Mode. Movimento reduzido desativa suavização e scrub decorativo; renderizar estados finais legíveis.
5. Tratar âncoras com offsets do header de 110/135 px conforme viewport. Evitar disputa entre CSS scroll-behavior e Lenis. Validar hash, botão voltar, foco do teclado, Home/End/PageDown e interrupção pelo usuário. Se a integração de âncoras precisar de adaptação, preservar semântica do link, não apenas mover a tela.
6. Isolar a implementação em components/page-motion.tsx, reaproveitando PageMotion. app/page.tsx continua Server Component e recebe apenas wrappers/hooks de animação necessários. Sem tornar toda a página client.

## Storyboard

| Região | Movimento proposto | Limites iniciais |
| --- | --- | --- |
| Hero | Foto se desloca mais lentamente que a página; selo e etiqueta seguem profundidades diferentes; estrela e órbitas giram suavemente com o scroll; sublinhado se desenha | Parallax de 20–60 px e giros de 6–18 graus. O selo pode girar mais, mantendo leitura. Separar entrada e scroll em elementos diferentes para não disputar transform. |
| Faixa verde | Texto desliza horizontalmente conforme a rolagem, invertendo quando o usuário volta | Progresso da página/seção, sem marquee infinito; bordas recortadas não geram overflow. |
| Ciclo | Linha avança e cada ilustração entra em cena com elevação e giro discretos, assentando conforme a progressão | Timeline única do ciclo; textos permanecem estáveis. Sem pin ou rolagem horizontal forçada. |
| Impacto | Manifesto ganha leve profundidade e se alinha; ícones acompanham a entrada dos benefícios | Cartão pode variar rotação em cerca de 4 graus e 24 px. Não mover links sob o ponteiro. |
| Como fazer | Broto/minhoca, estrela e etiqueta se deslocam em camadas | Animação no wrapper visual; troca de método mantém React como proprietário do conteúdo. Não animar height dos passos durante scroll. |
| Materiais | Ilustração ganha deslocamento e giro; troca de material tem transição curta | Scroll controla wrapper, transição local controla filho. Resultado textual/status acessível aparece imediatamente. |
| Dúvidas e CTA | Doodle acompanha a passagem da seção; fechamento entra com ritmo curto | Sem scrub no texto das respostas ou nos checkboxes. |
| Footer | Transição de chegada harmonizada com a seção anterior | Não criar nova timeline para o lettering/adesivos. Manter arraste e efeitos originais sem disputar propriedades. |

Valores são pontos de partida, não requisitos rígidos: ajustar após ver no navegador. Movimento deve ser perceptível, mas não exigir esperar para usar ou ler a página. Nada de animação perpétua adicional ou cursor customizado.

## Mobile, acessibilidade e performance

- Desktop: suavização moderada, resposta rápida e scrub curto; sem sensação de atraso prolongado.
- Mobile/ponteiro grosso: scroll nativo, amplitudes reduzidas e menos camadas. Sem pin, filtro blur animado ou alterações de layout por frame.
- Reduced motion: rolagem direta, sem parallax/rotação ligados ao scroll; conteúdo e controles em posição final. Preferência pode mudar com a página aberta.
- Priorizar transform e opacity; medir geometria em refresh, não em cada frame. Limitar will-change aos elementos que precisam, nunca aplicar no documento ou header.
- Abertura de FAQ, troca de método, fontes e resize devem atualizar limites de scroll quando necessário. Evitar ResizeObserver que realimente a própria animação.
- Não bloquear zoom, seleção, busca, teclado, scroll de selects nem pointer capture dos adesivos.
- Falha no carregamento do Lenis mantém scroll e conteúdo utilizáveis. Sem WebGL, o fallback atual continua independente.

## Escopo de arquivos e chamadas

- components/site-shell.tsx: remover implementação antiga de PageMotion após extrair, preservando SiteHeader/SiteFooter.
- components/page-motion.tsx: proprietário de suavização e cenas, com lifecycle e matchMedia.
- app/page.tsx: atualizar import de PageMotion e adicionar wrappers/atributos de alvo onde necessários.
- components/compost-interactions.tsx: apenas wrappers e transição do visual dinâmico, sem duplicar dados/regras.
- app/globals.css: integração CSS Lenis e estados estáticos, limites responsivos e overflow.
- package.json/package-lock.json: Lenis e versão travada pelo lockfile.
- tests e docs/validacao.md: prova de lifecycle/estados e resultados reais. Não alterar fixtures de materiais ou exports de dados sem necessidade.

## Tarefas e sequência de commits

Cada commit futuro será feito após seu trecho funcionar; separar correções reais conforme surgirem, sem commits vazios ou alterações artificiais para inflar a contagem.

1. [ ] refactor(motion): isolate page animation lifecycle — extrair PageMotion sem mudar aparência; provar lint/typecheck e ausência de duplicação de triggers após remontagem.
2. [ ] feat(scroll): integrate smooth wheel scrolling — Lenis no ticker único; provar âncoras, interrupção e scrollbar.
3. [ ] fix(scroll): preserve native touch and reduced motion — condições e cleanup; provar troca de preferência e teclado.
4. [ ] feat(hero): add layered scroll parallax — foto, selo, etiqueta, estrela e órbitas; conferir conflito entre entrada e scrub.
5. [ ] feat(motion): link ticker movement to scroll — conferir reversão e overflow em 320 px.
6. [ ] feat(cycle): choreograph composting stages — timeline do ciclo com leitura estável; testar avanço/retorno.
7. [ ] feat(impact): animate manifesto and benefit visuals — profundidade e ícones; manter links imóveis durante interação.
8. [ ] feat(guide): animate composting illustrations — troca de método mantém os passos e o visual corretos.
9. [ ] feat(materials): animate material transitions — transição visual sem atrasar aria-live ou texto.
10. [ ] feat(motion): finish faq and closing transitions — harmonizar chegada ao footer preservando seu funcionamento.
11. [ ] test(motion): verify scroll lifecycle and accessibility — teste pequeno de comportamento relevante com ferramentas existentes e roteiro de navegador.
12. [ ] docs(motion): record validation and remaining limits — resultados medidos, limitações reais e instruções de revisão.

Checkpoints: após 1–3 validar o motor de scroll; após 4–6 validar direção visual; após 7–10 validar todos os controles; após 11–12 fechar a entrega. Essas revisões são verificações de implementação, sem autorização extra para mudanças já cobertas pelo pedido.

## Critérios de aceite

- Movimentos dos visuais acompanham o scroll e respondem de forma contínua ao retorno; não apenas fade-in de entrada.
- Roda do mouse tem suavidade perceptível sem bloquear controle; toque mantém comportamento nativo.
- Uma instância de Lenis e callbacks sem duplicação após remontagem; nenhuma animação de scroll decorativa permanece com reduced motion.
- Nenhum texto essencial cortado/oculto, overflow horizontal ou alvo interativo fugindo do usuário.
- Âncoras, seção ativa, histórico, teclado, FAQ, guia, consulta de materiais, checklist e arraste/reset/replay do footer continuam funcionando.
- Verificação em 320, 768, 1024 e 1440 px; testes, lint, typecheck e build passam. Inspecionar frames com CPU reduzida, console e mudanças de layout; registrar números apenas se medidos.
- Lighthouse e teste em navegadores disponíveis; indisponibilidade de Safari/Firefox ou dispositivo físico será registrada, sem afirmar cobertura inexistente.

## Fora desta etapa

Three.js, novos modelos 3D, troca de foto/identidade, reformulação de conteúdo, deploy e correção ampla de dependências de desenvolvimento. As pendências de licença e domínio da versão inicial continuam documentadas.

## Referências oficiais

- https://github.com/darkroomengineering/lenis
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Guia local Next.js: node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md
