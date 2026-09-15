# Refatoração da landing page da TV Engenharia

Objetivo: dividir o arquivo único de 1195 linhas em dados + componentes, sem mudar nada do que o visitante vê, dos eventos de analytics ou do SEO.

## Etapa 1 — Dados estáticos e tipos

`src/data/portfolioData.ts`
- Importações das 30 imagens (projeto-1..6 e obra-1..4, nas variantes 480/960/original).
- Tipos `Projeto` e `Variante`; arrays `projetos`, `variantes`, `etapasObra`, `categorias`; constante `CREDITO`.
- Função `srcSetDe`.

`src/data/siteData.ts`
- `WA_ANGELICA_BASE`, `WA_TIAGO_BASE`, `WA_PRE_MESSAGE`, `WA_DEFAULT_CONTEXT`, `COMPANY_MAP_URL`, `COMPANY_MAP_EMBED_URL`, `THREADS_URL`.
- Arrays `diferenciais`, `etapas`, `itensLote`, `vantagens`, `outros`.
- Funções `abs` e `whatsappLink`.

Observação: a função `head()` da rota usa `abs`, `projetos` e as constantes de contato no JSON-LD — passará a importar desses módulos.

## Etapa 2 — Componentes em `src/components/landing/`

- `Header.tsx` — listener de scroll otimizado com `requestAnimationFrame` + `{ passive: true }`.
- `Hero.tsx`, `Sobre.tsx`, `ChaveNaMao.tsx`, `Lotes.tsx`.
- `OutrosEPortfolio.tsx` (inclui a grade com filtros) e `PortfolioModal.tsx` com Escape, focus trap e retorno de foco ao card de origem, exatamente como hoje.
- `Bastidores.tsx` — carrossel atual, com `tabIndex={0}` e navegação por setas do teclado no trilho.
- `Contato.tsx` (formulário, validações, mapa sob clique) e `Footer.tsx`.
- Auxiliares compartilhados `GoldIcon` e `SectionTitle` em `src/components/landing/ui.tsx`.

## Etapa 3 — Performance e acessibilidade

- Todos os listeners de scroll com `{ passive: true }` e limpeza no unmount.
- `aria-label`, `aria-describedby`, `aria-invalid`, `role="alert"` e demais atributos preservados sem alteração.
- Chamadas `trackEvent` mantidas com os mesmos nomes e parâmetros de evento.

## Etapa 4 — Rota principal

`src/routes/index.tsx` fica com: imports, `createFileRoute("/")`, a função `head()` intacta (metatags, canonical, JSON-LD) e um componente `Index` que apenas monta as seções na ordem atual.

## Verificação

- `bunx tsc --noEmit` e build sem erros.
- Conferência visual da página no preview, seção por seção, e checagem do console.
