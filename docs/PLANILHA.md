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

Cada envio vira uma linha na aba **Leads social media**. A coluna **Temperatura** é preenchida sozinha:

- **Quente:** investe a partir de R$ 3.000/mês e quer começar em até 30 dias.
- **Frio:** só está pesquisando ou investe até R$ 1.500.
- **Morno:** o resto.

A regra fica em `data/formulario-social-media.ts` (função `temperatura`), e as perguntas também.

> Se mudar o script depois, use **Implantar → Gerenciar implantações → editar → Nova versão** para manter a mesma URL.
