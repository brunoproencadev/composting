# Composting — tarefas de implementação

Implementação local concluída. Pendências de publicação e cobertura de dispositivos registradas em docs/validacao.md.

## 1. Base do projeto
- [x] Criar Next.js, TypeScript, Tailwind e shadcn com os aliases do plano.
- [x] Definir fontes e tokens; página inicial acessível em pt-BR.
Dependências: nenhuma. Arquivos: package.json, configurações, app/layout.tsx, app/globals.css. Verificação: typecheck, lint e build; conferir imports de @/components/ui.

## 2. Navbar fornecida
- [x] Copiar componente, ligar quatro âncoras reais e seção ativa.
- [x] Validar fallback WebGL, reduced motion, recursos e cleanup; traduzir labels.
Dependências: 1. Arquivos: components/ui/liquid-glass-navbar.tsx, components/sections/site-header.tsx, app/page.tsx. Verificação: teclado, mobile, resize, Strict Mode, contexto WebGL perdido e aba oculta.

## 3. Footer fornecido
- [x] Copiar componente, configurar identidade e links reais, remover conteúdo fictício.
- [ ] Preservar lettering e adesivos; traduzir controles e verificar licença.
Dependências: 1. Arquivos: components/ui/sticker-slap-footer.tsx, components/sections/site-footer.tsx, app/page.tsx. Verificação: arraste/toque/teclado, cancelamento, reset, replay e foco.

## Checkpoint: componentes obrigatórios
- [x] Navbar e footer renderizam, sem erros de tipos ou console; layout funciona em 320 e 1440 px.

## 4. Hero e ciclo
- [x] Construir composição editorial e diagrama completo em HTML/SVG/imagens.
- [x] Garantir CTA e narrativa legíveis sem animação.
Dependências: 1–2. Arquivos: hero.tsx e compost-cycle.tsx em components/sections, app/page.tsx, public/images. Verificação: visual mobile/desktop, imagens sem layout shift e links de âncora.

## 5. Impacto e guia
- [x] Redigir benefícios com referências, sem promessas quantitativas sem método.
- [x] Alternar guia de quintal e pouco espaço com manejo próprio de cada método.
Dependências: 4. Arquivos: lib/composting.ts, components/sections/impact.tsx, components/sections/how-to.tsx, app/page.tsx. Verificação: teste pequeno da seleção e revisão do conteúdo contra fontes.

## 6. Materiais, dúvidas e checklist
- [x] Implementar consulta por material e método, respostas e checklist temporário.
- [x] Todos os controles operam com teclado e fornecem feedback acessível.
Dependências: 5. Arquivos: lib/composting.ts, components/sections/materials.tsx, faq.tsx, start-checklist.tsx, app/page.tsx. Verificação: teste de classificação por método e fluxo dos controles; instalar accordion shadcn apenas se usado.

## Checkpoint: experiência completa
- [x] Jornada do hero até o checklist funciona com motion desligado, sem links fictícios.

## 7. Animações de scroll
- [x] Aplicar GSAP ao ciclo e entradas; manter navbar/footer sob seus próprios mecanismos.
- [x] Remover pin/parallax quando necessário em mobile e reduced motion; cleanup de animações.
Dependências: 2–6. Arquivos: hero.tsx, compost-cycle.tsx, app/globals.css e componentes que realmente precisem de reveal. Verificação: scroll nativo, resize, alternância de preferência e nenhuma informação oculta após falha.

## 8. SEO e recursos finais
- [x] Metadata, favicon, Open Graph e fontes/imagens locais com autoria registrada.
- [x] Links de referências e conteúdo revisados; domínio ausente não gera URLs falsas.
Dependências: 4–6. Arquivos: app/layout.tsx, recursos em app/public, README.md. Verificação: HTML inicial, metadata e integridade dos links.

## 9. Validação e entrega
- [x] Passar build, lint, typecheck e testes focados das interações não triviais.
- [ ] Verificar Chrome, Firefox e Safari quando disponíveis; registrar indisponibilidades.
- [ ] Auditar teclado, contraste, 200% zoom, mobile, reduced motion e desempenho; corrigir achados.
Dependências: 7–8. Arquivos: tests de fluxos e relatório de validação; ajustes nos responsáveis pelos achados. Verificação: navegação completa e Lighthouse mobile; registrar ambiente e limitações.

## Checkpoint: pronto para revisão
- [ ] Critérios concluídos, riscos registrados e demonstração local disponível; publicação tratada em etapa posterior.
