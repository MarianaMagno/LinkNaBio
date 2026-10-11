import type { TextoDestaque } from "@/data/site";

/** Renderiza "texto <rosa>destaque</rosa>" */
export function Destaque({ texto, destaque }: TextoDestaque) {
  return (
    <>
      {texto}
      {destaque && (
        <>
          {" "}
          <span className="rosa">{destaque}</span>
        </>
      )}
    </>
  );
}

/** Converte **negrito** em <b> (usado na bio) */
export function TextoComNegrito({ texto }: { texto: string }) {
  return (
    <>
      {texto.split(/\*\*(.+?)\*\*/g).map((parte, i) => (i % 2 ? <b key={i}>{parte}</b> : parte))}
    </>
  );
}
