import type { Metadata } from "next";
import Link from "next/link";
import { FormularioSocialMedia } from "./FormularioSocialMedia";

export const metadata: Metadata = {
  title: "Social media para a sua empresa · Mariana Magno",
  description: "Conte um pouco sobre o seu negócio e fale com a Mari sobre o serviço de social media.",
};

export default function PaginaSocialMedia() {
  return (
    <main className="pagina">
      <Link href="/" className="voltar">
        ← Voltar
      </Link>

      <header className="form-topo malha">
        <span className="selo">Para empresas</span>
        <h1 className="form-topo__titulo anton">
          Social <span className="rosa">media</span>
        </h1>
        <p className="form-topo__texto">
          Leva menos de 2 minutos. Com essas respostas a gente entende o seu momento e já chega na conversa com uma
          proposta que faz sentido pra você.
        </p>
      </header>

      <FormularioSocialMedia />

      <footer className="rodape">
        <span className="rodape__nome anton">Mariana Magno</span>
        <span className="rodape__linha">Mentoria · Conteúdo · Clips</span>
      </footer>
    </main>
  );
}
