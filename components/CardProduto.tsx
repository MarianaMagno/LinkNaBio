import Image from "next/image";
import type { Produto } from "@/data/site";
import { Destaque } from "./Destaque";

const externo = (href: string) => /^https?:/.test(href);

export function CardProduto({ produto: p, prioridade }: { produto: Produto; prioridade?: boolean }) {
  const linkProps = externo(p.href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <a className="card" href={p.href} {...linkProps}>
      {p.tipo === "foto" ? (
        <span className={`card__capa${p.borda ? " card__capa--borda" : ""}`}>
          <Image src={p.imagem} alt="" width={150} height={188} sizes="150px" priority={prioridade} />
          <span className="card__sombra" />
          <span className={`selo${p.borda ? " selo--justo" : ""}`}>{p.selo}</span>
          {p.subtitulo ? (
            <span className="card__chamada card__chamada--coluna">
              <span className="anton" style={{ fontSize: p.tamanhoChamada ?? 22 }}>
                <Destaque {...p.chamada} />
              </span>
              <span className="card__sub">{p.subtitulo}</span>
            </span>
          ) : (
            <span className="card__chamada anton" style={{ fontSize: p.tamanhoChamada ?? 22 }}>
              <Destaque {...p.chamada} />
            </span>
          )}
        </span>
      ) : (
        <span
          className={`card__capa card__capa--texto card__capa--${p.tema} ${
            p.tema === "rosa" ? "malha-vinho" : "malha"
          }${p.bordaSutil ? " card__capa--borda-sutil" : ""}`}
        >
          <span className="selo">{p.selo}</span>
          <span className="anton card__titulo-texto" style={{ fontSize: p.tamanhoChamada ?? 22 }}>
            <Destaque {...p.chamada} />
          </span>
          <span className="card__assinatura">{p.rodape}</span>
        </span>
      )}
      <span className="card__nome">{p.nome}</span>
      <span className="card__botao">{p.botao}</span>
    </a>
  );
}
