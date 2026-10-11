# Link na Bio — Mariana Magno

Página estática (HTML + CSS, sem dependências) para o link da bio do Instagram.

```
index.html          ← página inteira (estilos no <style> do topo)
assets/img/         ← foto de perfil e capas dos cards
assets/fonts/       ← Anton e Poppins (locais, sem Google Fonts)
```

## Como editar

- **Links:** procure por `href=` no `index.html`. Os que ainda estão como `#` têm um comentário `TODO` logo acima.
- **Cores:** variáveis no bloco `:root` (`--cta-de` / `--cta-para` controlam o degradê dos botões).
- **Novo card no carrossel:** copie um bloco `<a class="card">…</a>` dentro de `.trilho`.

## Publicar no GitHub Pages

1. Envie os arquivos para a branch `main`.
2. No repositório: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
3. A página fica em `https://marianamagno.github.io/LinkNaBio/`.
