import { NextResponse } from "next/server";
import { temperatura, todasAsPerguntas } from "@/data/formulario-social-media";

/**
 * Recebe o formulário de Social media e repassa para a planilha do Google
 * (Apps Script). Configure na Vercel:
 *   GOOGLE_SHEETS_WEBHOOK_URL = URL do app da web do Apps Script
 *   GOOGLE_SHEETS_SECRET      = mesma senha definida no script
 */
export async function POST(req: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false, erro: "json inválido" }, { status: 400 });
  }

  // Campo invisível: robôs costumam preencher. Finge sucesso e descarta.
  if (typeof corpo.site === "string" && corpo.site.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const respostas: Record<string, string> = {};
  for (const p of todasAsPerguntas) {
    const v = corpo[p.id];
    respostas[p.id] = typeof v === "string" ? v.trim().slice(0, 1000) : "";
    if (p.obrigatoria && !respostas[p.id]) {
      return NextResponse.json({ ok: false, erro: `campo obrigatório: ${p.id}` }, { status: 400 });
    }
  }

  const linha = {
    data: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
    ...respostas,
    temperatura: temperatura(respostas),
    origem: "Link na bio",
  };

  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[lead] GOOGLE_SHEETS_WEBHOOK_URL não configurada — resposta não foi salva:", linha);
    return NextResponse.json({ ok: true, salvo: false });
  }

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ segredo: process.env.GOOGLE_SHEETS_SECRET ?? "", linha }),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(`Apps Script respondeu ${r.status}`);
    return NextResponse.json({ ok: true, salvo: true });
  } catch (e) {
    console.error("[lead] falha ao salvar na planilha:", e, linha);
    // Não trava a pessoa: ela segue para o WhatsApp mesmo assim.
    return NextResponse.json({ ok: true, salvo: false });
  }
}
