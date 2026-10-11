/**
 * Recebe as respostas do formulário de Social media do Link na Bio
 * e grava uma linha por lead na aba "Leads social media".
 *
 * Como usar: veja docs/PLANILHA.md
 */

// Troque por uma senha qualquer e use a MESMA na Vercel (GOOGLE_SHEETS_SECRET).
const SEGREDO = "troque-esta-senha";
const NOME_DA_ABA = "Leads social media";

// Ordem e títulos das colunas. A chave da esquerda vem do site.
const COLUNAS = [
  ["data", "Data"],
  ["temperatura", "Temperatura"],
  ["nome", "Nome"],
  ["whatsapp", "WhatsApp"],
  ["empresa", "Empresa"],
  ["instagram", "Instagram"],
  ["segmento", "Segmento"],
  ["faturamento", "Faturamento mensal"],
  ["quem_cuida", "Quem cuida das redes"],
  ["objetivo", "Objetivo"],
  ["investimento", "Investimento mensal"],
  ["prazo", "Quando quer começar"],
  ["observacoes", "Observações"],
  ["origem", "Origem"],
];

function doPost(e) {
  const dados = JSON.parse(e.postData.contents);
  if (dados.segredo !== SEGREDO) {
    return resposta({ ok: false, erro: "não autorizado" });
  }

  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(NOME_DA_ABA);
  if (!aba) {
    aba = planilha.insertSheet(NOME_DA_ABA);
    aba.appendRow(COLUNAS.map((c) => c[1]));
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold").setBackground("#E8B4C8");
    aba.setFrozenRows(1);
  }

  const linha = dados.linha || {};
  aba.appendRow(COLUNAS.map((c) => linha[c[0]] || ""));
  return resposta({ ok: true });
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
