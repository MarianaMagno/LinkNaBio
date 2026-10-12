"use client";

import { useState, type FormEvent } from "react";
import { etapas, todasAsPerguntas, type Pergunta } from "@/data/formulario-social-media";
import { WHATSAPP_MARI } from "@/data/site";

const SEP = ", ";

/** (11) 91234-5678 */
function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function linkWhatsApp(r: Record<string, string>) {
  const linhas = [
    "Oi, Mari! Tudo bem? Preenchi o formulário de social media no seu link da bio:",
    "",
    ...todasAsPerguntas
      .filter((p) => r[p.id])
      .map((p) => `*${p.rotulo.replace(/\?$/, "")}:* ${r[p.id]}`),
  ];
  return `https://wa.me/${WHATSAPP_MARI}?text=${encodeURIComponent(linhas.join("\n"))}`;
}

function Campo({
  p,
  valor,
  aoMudar,
}: {
  p: Pergunta;
  valor: string;
  aoMudar: (v: string) => void;
}) {
  const marca = p.obrigatoria ? null : <span className="campo__opcional">opcional</span>;

  if (p.tipo === "multiplas") {
    const marcadas = valor ? valor.split(SEP) : [];
    const alternar = (op: string) => {
      const nova = marcadas.includes(op) ? marcadas.filter((m) => m !== op) : [...marcadas, op];
      // mantém a ordem das opções
      aoMudar(p.opcoes.filter((o) => nova.includes(o)).join(SEP));
    };
    return (
      <fieldset className="campo">
        <legend className="campo__rotulo">
          {p.rotulo} {p.ajuda ? <span className="campo__opcional">{p.ajuda}</span> : marca}
        </legend>
        <div className="chips">
          {p.opcoes.map((op, i) => (
            <label key={op} className="chip chip--multipla">
              <input
                type="checkbox"
                name={p.id}
                value={op}
                checked={marcadas.includes(op)}
                onChange={() => alternar(op)}
                ref={(el) => {
                  // "marque pelo menos uma": validação nativa no primeiro item
                  if (el && i === 0) el.setCustomValidity(p.obrigatoria && marcadas.length === 0 ? "Marque pelo menos uma opção." : "");
                }}
              />
              <span>{op}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (p.tipo === "opcoes") {
    return (
      <fieldset className="campo">
        <legend className="campo__rotulo">
          {p.rotulo} {marca}
        </legend>
        <div className="chips">
          {p.opcoes.map((op, i) => (
            <label key={op} className="chip">
              <input
                type="radio"
                name={p.id}
                value={op}
                checked={valor === op}
                onChange={() => aoMudar(op)}
                required={p.obrigatoria && i === 0}
              />
              <span>{op}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  const comum = {
    id: p.id,
    name: p.id,
    value: valor,
    placeholder: p.placeholder,
    required: p.obrigatoria,
    className: "campo__entrada",
  };

  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={p.id}>
        {p.rotulo} {marca}
      </label>
      {p.tipo === "textarea" ? (
        <textarea {...comum} rows={3} maxLength={1000} onChange={(e) => aoMudar(e.target.value)} />
      ) : p.tipo === "telefone" ? (
        <input
          {...comum}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          pattern="\(\d{2}\) \d{4,5}-\d{4}"
          title="DDD + número, ex.: (11) 91234-5678"
          onChange={(e) => aoMudar(mascaraTelefone(e.target.value))}
        />
      ) : (
        <input
          {...comum}
          type="text"
          maxLength={120}
          autoComplete={p.id === "nome" ? "name" : p.id === "empresa" ? "organization" : "off"}
          onChange={(e) => aoMudar(e.target.value)}
        />
      )}
    </div>
  );
}

export function FormularioSocialMedia() {
  const [respostas, setRespostas] = useState<Record<string, string>>({});
  const [site, setSite] = useState(""); // armadilha para robôs
  const [estado, setEstado] = useState<"preenchendo" | "enviando" | "pronto">("preenchendo");
  const [destino, setDestino] = useState("");

  const mudar = (id: string) => (v: string) => setRespostas((r) => ({ ...r, [id]: v }));

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado !== "preenchendo") return;
    setEstado("enviando");

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...respostas, site }),
        signal: AbortSignal.timeout(9000),
      });
    } catch {
      // Mesmo se a planilha falhar, a pessoa segue para o WhatsApp.
    }

    const url = linkWhatsApp(respostas);
    setDestino(url);
    setEstado("pronto");
    window.location.href = url;
  }

  if (estado === "pronto") {
    return (
      <div className="form-pronto">
        <span className="anton form-pronto__titulo">
          Recebemos! <span className="rosa">Obrigada</span>
        </span>
        <p>Estamos abrindo o WhatsApp da Mari com as suas respostas. Se não abrir sozinho, toque no botão:</p>
        <a className="comercial__botao" href={destino}>
          Abrir WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      {etapas.map((etapa, i) => (
        <section key={etapa.titulo} className="etapa">
          <h2 className="etapa__titulo">
            <span className="etapa__numero anton">{String(i + 1).padStart(2, "0")}</span>
            {etapa.titulo}
          </h2>
          {etapa.perguntas.map((p) => (
            <Campo key={p.id} p={p} valor={respostas[p.id] ?? ""} aoMudar={mudar(p.id)} />
          ))}
        </section>
      ))}

      <input
        className="armadilha"
        type="text"
        name="site"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={site}
        onChange={(e) => setSite(e.target.value)}
      />

      <button className="form-enviar" type="submit" disabled={estado === "enviando"}>
        {estado === "enviando" ? "Enviando…" : "Enviar e falar no WhatsApp →"}
      </button>
      <p className="form-aviso">Usamos seus dados só para entrar em contato sobre o serviço.</p>
    </form>
  );
}
