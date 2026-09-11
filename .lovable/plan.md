# Auditoria completa de SEO — TV Engenharia

Verificar todos os metadados, Open Graph, JSON-LD, canonicals, sitemap, robots.txt e possíveis menções a templates padrão no site.

## Passos

1. **Verificação de menções a templates**
   - Confirmar que não existem ocorrências de "Vercel", "template", "create-*-app", "Next.js", "React template", "default description" ou "default title" em arquivos de rota, HTML público ou metadados.

2. **Leitura de findings existentes**
   - Consultar `seo_chat--list_findings` para identificar problemas já conhecidos.

3. **Novo scan de SEO**
   - Disparar `seo_chat--trigger_scan` com foco em fundamentos (`lint`, `http`, `metadata_basics`).

4. **Análise e apresentação**
   - Listar todos os findings (passando e falhando).
   - Resumir no chat: título/descrição por rota, Open Graph, canonicals, JSON-LD, sitemap/robots, e quaisquer issues encontradas.
   - Marcar como `fixed` apenas itens já corrigidos no código, aguardando rescan para confirmação.

## Arquivos envolvidos

- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/routes/privacidade.tsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `src/lib/site.ts`
