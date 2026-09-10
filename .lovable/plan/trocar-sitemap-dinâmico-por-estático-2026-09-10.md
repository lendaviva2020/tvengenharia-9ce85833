# Trocar sitemap dinâmico por estático

## Contexto
- A rota dinâmica `src/routes/sitemap[.]xml.ts` usa `@tanstack/react-start` e está falhando em produção na Vercel.
- O arquivo estático `public/sitemap.xml` já existe com o conteúdo correto e `public/robots.txt` já aponta para `https://tvengenharia.com.br/sitemap.xml`.

## Ações
1. Excluir a rota dinâmica `src/routes/sitemap[.]xml.ts`.
2. Garantir que `public/sitemap.xml` contenha exatamente o XML fornecido (já está correto).
3. Verificar se `public/robots.txt` mantém o `Sitemap: https://tvengenharia.com.br/sitemap.xml`.
4. Rodar typecheck/build para confirmar que a remoção da rota não quebra a árvore de rotas.
5. Verificar no preview se `/sitemap.xml` responde com o XML estático e status 200.

## Resultado esperado
- `/sitemap.xml` passa a ser servido como arquivo estático, sem depender de server function ou variável `SITE_URL`.
- Google e outros crawlers conseguem ler o sitemap sem erros de servidor.
