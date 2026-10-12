# Ligar o formulário de Social media à planilha (uma vez só, ~5 min)

Enquanto isso não estiver configurado, o formulário funciona normalmente e leva a pessoa ao WhatsApp da Mari. Só não grava na planilha.

## 1. Criar a planilha e o script

1. Crie uma planilha nova no Google Sheets, por exemplo "Leads Link na Bio".
2. Menu **Extensões → Apps Script**.
3. Apague o que estiver lá e cole todo o conteúdo de `docs/google-sheets-apps-script.gs`.
4. Na linha `const SEGREDO = "troque-esta-senha";`, troque por uma senha sua (sem espaços). Guarde essa senha.
5. Clique no ícone de disquete para salvar.

## 2. Publicar o script

1. Clique em **Implantar → Nova implantação**.
2. Na engrenagem, escolha **App da Web**.
3. **Executar como:** Eu. **Quem pode acessar:** Qualquer pessoa.
4. Clique em **Implantar** e autorize com a sua conta Google. Se aparecer "o Google não verificou este app", clique em **Avançado → Acessar**.
5. Copie a **URL do app da Web** (termina em `/exec`).

## 3. Colocar na Vercel

No projeto da Vercel: **Settings → Environment Variables**, adicione:

| Nome | Valor |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | a URL `/exec` copiada |
| `GOOGLE_SHEETS_SECRET` | a senha do passo 1.4 |

Depois vá em **Deployments → ⋯ → Redeploy** para valer.

## Como ler a planilha

Cada envio vira uma linha na aba **Leads social media**, com: nome, WhatsApp, empresa, Instagram, negócio, segmento, como estão as redes hoje, serviços procurados (vários separados por vírgula), objetivo e observações.

As perguntas ficam em `data/formulario-social-media.ts`. Se criar uma pergunta nova, adicione também a coluna correspondente em `COLUNAS` no script.

> Se mudar o script depois, use **Implantar → Gerenciar implantações → editar → Nova versão** para manter a mesma URL.
