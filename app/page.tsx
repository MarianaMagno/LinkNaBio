import Image from "next/image";
import { aulao, comercial, perfil, produtos, redes, rodape, tituloCarrossel } from "@/data/site";
import { CardProduto } from "@/components/CardProduto";
import { Destaque, TextoComNegrito } from "@/components/Destaque";
import { Cadeado, Email, Instagram, Play, TikTok, WhatsApp } from "@/components/Icones";

const externo = (href: string) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Pagina() {
  return (
    <main className="pagina">
      {/* ===== Perfil ===== */}
      <header className="perfil">
        <Image
          className="perfil__foto"
          src={perfil.foto}
          alt="Mariana Magno"
          width={104}
          height={104}
          sizes="104px"
          priority
        />
        <h1 className="perfil__nome anton">
          <Destaque {...perfil.nome} />
        </h1>
        <p className="perfil__bio">
          <TextoComNegrito texto={perfil.bio} />
        </p>
        <nav className="redes" aria-label="Redes sociais">
          <a href={redes.instagram} aria-label="Instagram" {...externo(redes.instagram)}>
            <Instagram />
          </a>
          <a href={redes.tiktok} aria-label="TikTok" {...externo(redes.tiktok)}>
            <TikTok />
          </a>
          <a href={redes.whatsapp} aria-label="WhatsApp" {...externo(redes.whatsapp)}>
            <WhatsApp />
          </a>
          <a href={redes.email} aria-label="E-mail">
            <Email />
          </a>
        </nav>
      </header>

      {/* ===== Destaque: Aulão (em breve) ===== */}
      {aulao.ativo && (
        <div className="aulao malha" role="note">
          <span className="aulao__data" aria-label={`${Number(aulao.dia)} de ${aulao.mes}`}>
            <span className="aulao__dia anton">{aulao.dia}</span>
            <span className="aulao__mes">{aulao.mes}</span>
          </span>
          <span className="aulao__info">
            <span className="selo">{aulao.selo}</span>
            <span className="aulao__titulo anton">
              <Destaque {...aulao.titulo} />
            </span>
            <span className="aulao__texto">{aulao.texto}</span>
          </span>
          <span className="aulao__cadeado" aria-hidden="true">
            <Cadeado />
          </span>
        </div>
      )}

      {/* ===== Carrossel ===== */}
      <section className="ofertas" aria-labelledby="titulo-ofertas">
        <div className="ofertas__topo">
          <h2 className="ofertas__titulo" id="titulo-ofertas">
            <Play />
            {tituloCarrossel}
          </h2>
          <span className="ofertas__dica" aria-hidden="true">
            deslize →
          </span>
        </div>
        <div className="trilho">
          {produtos.map((p, i) => (
            <CardProduto key={p.id} produto={p} prioridade={i < 2} />
          ))}
        </div>
      </section>

      {/* ===== WhatsApp comercial ===== */}
      <div className="comercial">
        <WhatsApp className="comercial__marca-dagua" tamanho={120} cor="#3D0E29" espessura={1.2} />
        <span className="comercial__cabeca">
          <span className="comercial__icone" aria-hidden="true">
            <WhatsApp tamanho={19} cor="#3D0E29" espessura={1.9} />
          </span>
          {comercial.titulo}
        </span>
        <span className="comercial__texto">{comercial.texto}</span>
        <a className="comercial__botao" href={comercial.href} {...externo(comercial.href)}>
          {comercial.botao}
        </a>
      </div>

      {/* ===== Rodapé ===== */}
      <footer className="rodape">
        <span className="rodape__nome anton">{rodape.nome}</span>
        <span className="rodape__linha">{rodape.linha}</span>
      </footer>
    </main>
  );
}
