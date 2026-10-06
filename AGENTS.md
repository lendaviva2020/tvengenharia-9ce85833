<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Hero media behavior in a dedicated hook, using matchMedia and cleaned-up observers/listeners; this isolates scroll seeking, playback, and motion accessibility from presentation.
- Import Hero video and poster as real bundled static files, with local WebM and MP4 video sources, not asset pointers; this keeps media portable to hosting outside Lovable and provides a decoding fallback.
- Keep briefing generation in a public POST server function with server-only AI SDK Responses helpers and shared typed schema; this keeps secrets and prompts out of the browser.
- Persist only AI availability and hashed rate-limit controls, never construction narratives or generated briefs; this preserves visitor privacy and blocks repeated calls after terminal gateway failures.
