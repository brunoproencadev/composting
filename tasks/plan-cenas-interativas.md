# Terceira versão — texto, cenas fixas e interação tátil

Status: aprovado pelo usuário, implementado e validado localmente. Resultados e limitações em docs/validacao.md. Complementa os planos anteriores sem substituir suas pendências. Não houve deploy.

## Objetivo e diagnóstico

Criar ritmo de narrativa: alternar trechos de leitura livre com duas cenas em que a composição permanece no lugar enquanto elementos internos se transformam; revelar títulos horizontalmente; oferecer objetos manipuláveis fora do footer; redesenhar a seção #comece mostrada na imagem.

Inspeção: components/page-motion.tsx já concentra Lenis, parallax, timelines com scrub e reveals de entrada. Nenhuma cena usa pin; os títulos ainda entram por deslocamento vertical e opacidade. O ciclo continua sendo quatro colunas de emojis. StartChecklist em components/compost-interactions.tsx é uma linha de checkboxes; #comece em app/page.tsx centraliza título, texto e botão num grande espaço vazio. O footer contém arraste por ponteiro, setas e retorno com Escape/Home, mas seus handlers dependem do layout e do estado interno do lettering.

## Direção visual

Manter creme, verde profundo, verde vegetal, terracota, Bricolage Grotesque e DM Sans. Acrescentar camadas de papel e pequenas ilustrações SVG próprias: folha, casca, broto, minhoca e recipiente. Uma cena tem um protagonista e movimentos de apoio; evitar girar simultaneamente todos os elementos ou associar animação a cada parágrafo.

Ordem da experiência:

1. Hero: entrada curta e profundidade; pequenos objetos manipuláveis.
2. Ciclo: primeira cena fixa, acompanhando resíduo → cuidado → transformação → broto.
3. Impacto: segunda cena fixa, mais curta, com frase que se revela e uma composição ilustrada que muda de destino.
4. Guia e materiais: leitura livre e interações diretas, com movimentos de apoio.
5. FAQ: leitura livre, sem pin.
6. #comece: kit tátil com checklist e composição que reage ao progresso.
7. Footer: continuidade com os adesivos existentes.

## 1. Revelação horizontal do texto

Efeito escolhido: texto já presente em um tom suave, com uma máscara revelando a cor final da esquerda para a direita, palavra a palavra, respeitando a sequência de linhas. Não é mover todo o título para fora da tela. Avançar o scroll completa a revelação; voltar desfaz a progressão.

Aplicar em três momentos: abertura do ciclo, frase principal do impacto e headline de #comece. O restante do texto mantém leitura convencional. O texto de apoio, as instruções e os controles nunca dependem de uma revelação para ficar acessíveis.

Tecnologia: ScrollTrigger + SplitText, já presentes no pacote GSAP instalado. Usar divisão em palavras/linhas e máscara por linha; preferir clip-path/transform ou camadas de texto em vez de alterar geometria a cada frame. Nenhuma nova biblioteca de scroll/reveal.

Texto semântico continua único para tecnologia assistiva; fragmentos/camadas visuais não devem repetir a frase ao leitor de tela. Preservar acentos, espaços, ênfase, seleção e quebra de linhas em português. Recalcular após fontes/resize e reverter o split no cleanup. Sem JS, falha de inicialização e reduced motion mostram o texto completo. O tom inicial precisa manter contraste adequado ao tamanho do título.

## 2. Duas cenas fixas durante o scroll

O documento continua recebendo rolagem e a scrollbar continua avançando. O pin apenas mantém a cena visível enquanto o scroll controla sua timeline; não usar wheel preventDefault para prender o usuário, snap obrigatório ou trava por tempo.

### Cena A — o ciclo da compostagem

Desktop: painel preso abaixo da navbar. Uma área visual representa as quatro etapas; indicador de progresso e nomes ficam visíveis. Cascas chegam, folhas secas se somam, a transformação muda cor/textura e um broto aparece no composto. Texto de cada etapa pode mudar em uma área reservada sem alterar a altura da cena. Preservar o conteúdo completo em ordem no HTML e uma representação estável para leitura assistiva.

Distância inicial de rolagem: aproximadamente 1,5–2 alturas úteis de viewport, distribuída entre as quatro etapas. A cena libera o pin ao terminar e reverte ao voltar. Não adicionar carrossel nem exigir clique para avançar. Sem elementos arrastáveis dentro desta cena na primeira execução: a animação precisa ter um único responsável pelas posições.

### Cena B — impacto e revelação de frase

Uma cena mais breve, aproximadamente 0,6–0,9 viewport de rolagem. A frase sobre devolver vida ao solo se revela horizontalmente, enquanto uma ilustração muda do descarte para o ciclo do solo. Não inventar números de CO₂ ou redução de emissões. Os benefícios detalhados e o link de referência ficam no fluxo normal logo depois, sem trocar de lugar durante a interação.

### Regras dos pins

- Ativar apenas com largura, altura útil e capacidade de interação adequadas; ponto de partida: viewport >= 1024 px e altura suficiente para conter toda a cena com navbar e margens. Medir se cabe em vez de depender só do breakpoint.
- Em mobile, janela baixa, zoom que deixe a cena sem espaço e reduced motion: cenas viram conteúdo em fluxo normal, com todas as etapas acessíveis e sem grandes espaços de pin vazios.
- Não pinar o elemento cujo transform muda. Usar um stage estável e animar seus filhos.
- Definir pinSpacing e ordem de criação para que âncoras e triggers seguintes usem medidas corretas. Não transformar o documento inteiro ou o header.
- Revisar overflow/clip dos ancestrais para não recortar o stage, o foco ou o pin.
- Remover/recriar pins e spacers corretamente no resize e na troca de preferência; preservar scroll e conteúdo.
- Rever o ResizeObserver atual em main: o espaçador criado pelo próprio pin não pode provocar uma cadeia de refresh/resize. Coalescer atualizações e observar mudanças de conteúdo que realmente alteram layout.
- Testar navegação direta por hash, links da navbar, Voltar/Avançar, Tab, Home/End e busca do navegador atravessando as cenas.

## 3. Objetos que o visitante pode mover

Distribuição proposta, além do footer:

| Área | Objetos | Limite |
| --- | --- | --- |
| Hero | Dois adesivos próprios: folha e casca | Apenas dentro da área da arte, sem interceptar título ou CTA |
| Guia | Dois pequenos recortes de broto/minhoca e folha | Área ilustrada da composteira, separada dos controles de método/passos |
| #comece | Três adesivos ao redor do kit: broto, casca e selo “meu primeiro ciclo” | Margens e área de colagem reservadas; nunca sobre checkbox, instruções ou botão |

Não tornar a foto, o texto ou os cartões inteiros arrastáveis. Indicação discreta “Pode mexer :)”, cursor de pegar e resposta ao pressionar ajudam a descobrir a brincadeira. Posição fica apenas na visita; sem armazenamento ou backend.

Implementação: aproveitar Pointer Events, pointer capture e padrões existentes no footer. Criar um pequeno componente de adesivo reutilizável para os três novos usos; a reutilização é concreta. Os handlers do footer não podem ser copiados três vezes nem acoplados ao wordmark para conseguir reaproveitamento. Manter o footer intacto inicialmente; compartilhar somente o que de fato tiver a mesma semântica. Draggable também está instalado com GSAP, mas não é necessário para o arraste simples; só será usado se uma limitação real do padrão nativo justificar a troca.

Cada objeto tem nome acessível, foco, movimento por setas, retorno por Escape/Home e controle visível de reposição. Oferecer modo por toque/clique, como selecionar objeto e tocar numa posição válida da área, além do arraste e do teclado. Reset sozinho não substitui a alternativa de reposicionamento. Tratar limiar de arraste, pointercancel, lostpointercapture e resize. Aumentar z-index só dentro da região e impedir que posições salvas fiquem fora dos limites depois de redimensionar.

Separar transform do scroll (wrapper) e do arraste (filho). Ao começar a manipular, o scroll não pode continuar puxando o mesmo objeto. Controles móveis no toque ficam em superfícies pequenas; o restante da página mantém o gesto de rolagem. Reduced motion mantém a interação manual, com pouso direto e sem elasticidade decorativa.

## 4. Redesenho de #comece — “kit de primeiro ciclo”

Trocar a composição centralizada e a fileira de checkboxes por uma pequena bancada de papel com assimetria e uma ação clara.

### Desktop

- Esquerda: selo editorial, a frase “O amanhã se planta com o que sobra hoje.” com revelação horizontal e apoio curto. CTA “Meu primeiro passo” logo abaixo, em posição estável.
- Direita: três cartões de checklist em coluna levemente sobreposta, como fichas de um kit, com número, pequena ilustração e o mesmo texto atual. Inclinações discretas em repouso; superfície do cartão inteira pode acionar o checkbox.
- Fundo: mancha vegetal verde-clara e linhas desenhadas, com contraste preservado. Adesivos ficam em margens reservadas.
- Pequeno vaso/broto SVG reage às marcações: uma etapa marcada prepara a terra; duas revelam broto; três abrem folhas e mostram “Seu primeiro ciclo está pronto para começar”. Desmarcar reverte o estágio.
- Contagem “1 de 3”, “2 de 3” e “3 de 3” permanece explícita, com anúncio de status acessível. Nada depende de acertar uma animação ou arrastar itens.
- Ao completar: um breve desenho das folhas/traço de celebração; sem confete sobre o texto e sem animação infinita. Botão já está disponível desde o início.

### Mobile e movimento reduzido

Headline, cartões e CTA em uma coluna; sem sobreposição que prejudique leitura ou toque. Adesivos numa faixa própria ao redor/abaixo da ilustração. A evolução do broto mostra o estado final de cada etapa sem movimento excessivo. O checklist continua temporário, como hoje.

Não adicionar pin aqui nesta primeira execução: a pessoa deve poder parar, ler e brincar livremente com os controles. As duas cenas anteriores já fornecem as pausas narrativas solicitadas.

## 5. Refinamento das animações recém-entregues com Sol High

Recomendo selecionar Sol High antes da execução. Esta é uma recomendação para o trabalho de coreografia, estados e integração; não atribuo a aparência atual apenas ao nível Medium nem prometo qualidade visual automática com High. A revisão no navegador continua sendo o critério de qualidade.

Incluir no refinamento:

| Parte atual | Refinamento |
| --- | --- |
| Hero | Ajustar relações de profundidade, amplitudes e início/fim; evitar que o selo legível gire em excesso; separar novos adesivos do parallax |
| Ciclo | Substituir os giros de emojis por uma narrativa ilustrada coerente dentro da cena fixa |
| Impacto | Substituir movimentos independentes por sequência com texto revelado e transformação visual; manter fontes e benefícios legíveis |
| Guia/materiais | Harmonizar transições locais com o movimento de scroll e o arraste, sem repetir giros em todos os objetos |
| Faixa verde | Ajustar distância e velocidade em relação às novas pausas; evitar movimento residual exagerado após parar de rolar |
| Entrada de #comece | Substituir o fade/y atual pelo kit, revelação e feedback do checklist |
| Lifecycle | Rever refresh, autoSplit, pins, Lenis e drag após resize/remontagem; limpar os efeitos antigos que forem substituídos |

Manter os comportamentos já corretos de navbar, fallback WebGL, footer e navegação. Não aumentar a inércia do Lenis para tentar produzir as pausas; elas pertencem às cenas, não ao motor de scroll.

## Arquivos e responsabilidades

- app/page.tsx: composição semântica das cenas e do fechamento; manter Server Component.
- components/page-motion.tsx: timelines, divisão/reversão do texto, pins, condições e cleanup. Remover animações antigas substituídas para evitar concorrência.
- components/compost-interactions.tsx: estado do checklist e ilustração reativa; seletores e regras atuais permanecem nos responsáveis existentes.
- components/ui/draggable-sticker.tsx: novo componente pequeno para adesivos em áreas limitadas, teclado, ponteiro e reset.
- components/interactive-stickers.tsx: composições de adesivos por área apenas se separar arte/posicionamento for necessário; não criar um sistema de configuração genérico.
- Componentes de seção novos apenas se ciclo/impacto/kit exigirem isolamento para clareza; nenhum componente client para a página inteira.
- app/globals.css: máscara/estados de texto, composição de papel, estágios fixos e alternativas responsivas.
- tests/motion.browser.mjs: ampliar os testes de scroll para pin, revelação, âncoras e drag; testar também checklist/broto e retorno de estado.
- tests de lógica: limites/resize de arraste e transições do checklist somente onde houver lógica extraída e reutilizada, sem testes que apenas repitam markup.
- docs/validacao.md: resultados reais da nova etapa, comparações e limites.

Sem nova dependência prevista: GSAP/SplitText/ScrollTrigger e Lenis já estão disponíveis. A aparência das novas ilustrações SVG será consistente entre plataformas; não é uma cena Three.js.

## Sequência de execução e commits propostos

Etapas executadas em commits por funcionalidades e correções. Alguns itens foram agrupados quando compartilhavam a mesma estrutura; as provas realizadas e as verificações ainda indisponíveis estão no relatório de validação.

1. [x] docs(design): registrar composição final e storyboard das duas cenas. Prova: cenários desktop/mobile/reduced motion definidos, sem iniciar cenas antes de esclarecer os alvos.
2. [x] feat(text): revelar títulos horizontalmente com máscaras acessíveis. Prova: fontes, acentos, quebra de linha, resize e texto completo sem JS/reduced motion.
3. [x] refactor(motion): preparar medição e lifecycle para cenas fixas. Prova: refresh sem ciclo com spacers e cleanup sem duplicação.
4. [x] feat(cycle): criar cena ilustrada com pin e quatro estágios. Prova: viewport mantém stage estável enquanto progresso muda; liberar no fim e reverter ao voltar.
5. [x] feat(impact): criar pausa curta com frase e transformação. Prova: benefícios/referências acessíveis em fluxo normal e âncoras corretas.
6. [x] feat(stickers): implementar adesivo limitado com arraste, toque/clique, teclado e reset. Prova: cancelamento, foco, bounds e resize.
7. [x] feat(hero): integrar objetos manipuláveis e refinar profundidade. Prova: nenhum conflito entre scroll e drag ou bloqueio do CTA.
8. [x] feat(guide): adicionar recortes interativos à área ilustrada. Prova: seleção de método e passos preservada.
9. [x] feat(start): redesenhar fechamento como kit de papel. Prova: mesma ação do checklist, layout mobile legível e botão estável.
10. [x] feat(start): reagir ao progresso com broto e adesivos. Prova: completar e desfazer marcações atualiza arte e status corretamente.
11. [x] fix(motion): calibrar ritmo, viewport baixo e reduced motion. Prova: percurso inteiro por mouse, toque emulado, teclado e hashes sem armadilhas.
12. [x] test(motion): validar cenas, objetos e regressões. Prova: testes focados, lint, typecheck, build e verificações de navegador.
13. [x] docs(quality): registrar auditoria final e limitações. Prova: relatório descreve somente verificações executadas.

Commits durante a execução, em etapas reais; correções terão commits próprios quando aparecerem. Não reescrever o histórico existente para simular desenvolvimento anterior. Push após a implementação e validação, conforme autorização persistente da sessão.

## Critérios de aceite e revisão

- Três títulos revelam sua cor horizontalmente por scroll, com progressão reversível e sem duplicação acessível.
- Duas cenas fixas no desktop adequado: o stage permanece estável enquanto seus elementos mudam e libera o documento ao concluir. Nada prende wheel/teclado por tempo.
- Hero, guia e kit têm objetos manipuláveis com limites e uma alternativa ao arraste.
- #comece tem cartões ilustrados, composição tátil, broto em quatro estados (0–3), contagem e CTA sempre disponíveis.
- Sem competição de transform, overflow horizontal, recorte de foco, espaços de pin órfãos ou listeners duplicados após resize/reduced motion/remontagem.
- Em 320, 768, 1024 e 1440 px, janelas baixas e zoom 200%, leitura e controles continuam utilizáveis. As cenas não precisam ter o mesmo efeito em todas as telas.
- Verificar navegação por hash direto, Voltar/Avançar, teclado, cancelamento de drag, troca de método, seleção de material e controles do footer.
- Build, lint, typecheck e testes passam; Lighthouse de acessibilidade/SEO e trace de scroll/carga sem alegar métricas de campo. Testar Safari/Firefox e hardware quando disponíveis; registrar o que não foi possível.

## Riscos e limites

Pin aumenta distância de rolagem: limitar a duas pausas curtas e calibrar no navegador. SplitText altera o DOM: controlar fontes e reverter no cleanup. Drag exige posição separada de parallax e limites após resize. Controles e leitura são prioritários sobre movimentos. A emulação nativa de reduced motion não foi comprovada na etapa anterior e continua sendo uma verificação desejada, sem relançar processos bloqueados por política.

Sem persistência de adesivos/checklist, novo backend, cena 3D, troca de navbar/footer, publicação ou trabalho amplo em dependências. Pendências de licença e domínio continuam registradas na validação anterior.

## Referências

- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://gsap.com/docs/v3/Plugins/SplitText/
- https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html
