# Link na Bio — Mariana Magno

Página de link na bio feita em **Next.js (Node)**, fiel ao design "Versão final · tudo no carrossel".

## Rodar no computador

Precisa de Node 20.9 ou mais novo.

```bash
npm install
npm run dev      # abre em http://localhost:3000
```

Para testar a versão de produção: `npm run build && npm start`.

## Onde editar

| O quê | Arquivo |
|---|---|
| Links, textos, ordem dos cards, aulão | `data/site.ts` |
| Cores e espaçamentos | `app/globals.css` (bloco `:root`) |
| Fotos | `public/img/` |
| Estrutura da página | `app/page.tsx` |
| Card do carrossel | `components/CardProduto.tsx` |

Links que ainda estão como `"#"` têm um comentário `TODO` em `data/site.ts`.

- **Novo card:** copie um item do array `produtos` e ajuste. `tipo: "foto"` usa imagem; `tipo: "texto"` usa fundo `vinho` ou `rosa`.
- **Esconder o aulão:** em `aulao`, mude `ativo` para `false`.
- **Texto rosa:** use `{ texto: "Meu", destaque: "portfólio" }`. Na bio, `**negrito**` fica rosa.

## Publicar (Vercel)

1. Envie o projeto para o GitHub (`git push origin main`).
2. Em [vercel.com](https://vercel.com), clique em **Add New → Project** e importe `MarianaMagno/LinkNaBio`.
3. Deixe as configurações padrão e clique em **Deploy**. Cada push na `main` publica sozinho.
4. Opcional: em **Settings → Domains**, conecte um domínio próprio e crie a variável `NEXT_PUBLIC_SITE_URL` com ele (usada na pré-visualização de links).
