/**
 * Todo o conteúdo da página fica aqui.
 * Para trocar um link, texto ou a ordem dos cards, edite só este arquivo.
 */

/** Texto com uma parte destacada em rosa: { texto: "Mentoria com a", destaque: "Mari" } */
export type TextoDestaque = { texto: string; destaque?: string };

export type Produto = {
  id: string;
  href: string; // "#" = link ainda não definido
  selo: string; // etiqueta no topo da capa
  nome: string; // título abaixo da capa
  botao: string; // texto do botão
  chamada: TextoDestaque; // título grande dentro da capa
  tamanhoChamada?: number; // px (padrão 22)
} & (
  | {
      tipo: "foto";
      imagem: string;
      borda?: boolean; // contorno rosa (card em destaque)
      subtitulo?: string;
    }
  | {
      tipo: "texto";
      tema: "vinho" | "rosa";
      rodape: string;
      bordaSutil?: boolean;
    }
);

const WHATSAPP_MARI = "5512991752823";
const WHATSAPP_COMERCIAL = "5513998083338";

const wa = (numero: string, mensagem?: string) =>
  `https://wa.me/${numero}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ""}`;

export const perfil = {
  nome: { texto: "Mariana", destaque: "Magno" },
  foto: "/img/mariana.jpg",
  // **negrito** vira rosa
  bio: "Com **8 fontes de renda** no digital, te ensino a construir o seu ecossistema, como já fiz com **+ de 700 alunas** de alta performance ↓",
};

export const redes = {
  instagram: "#", // TODO: link do Instagram
  tiktok: "#", // TODO: link do TikTok
  whatsapp: wa(WHATSAPP_MARI),
  email: "#", // TODO: ex. "mailto:contato@dominio.com"
};

export const aulao = {
  ativo: true,
  dia: "07",
  mes: "Nov",
  selo: "Em breve · gratuito",
  titulo: { texto: "Aulão", destaque: "secreto" },
  texto: "O tema é surpresa. Fica de olho aqui que eu revelo em breve.",
};

export const tituloCarrossel = "Como posso te ajudar hoje:";

export const produtos: Produto[] = [
  {
    id: "mentoria",
    tipo: "foto",
    imagem: "/img/mentoria.jpg",
    borda: true,
    href: wa(
      WHATSAPP_MARI,
      "Oi, Mari, tudo bem? Gostaria de saber mais um pouquinho sobre as suas mentorias e sobre a sua consultoria."
    ),
    selo: "Mais procurado",
    chamada: { texto: "Mentoria com a", destaque: "Mari" },
    nome: "Mentoria e consultoria",
    botao: "Quero saber",
  },
  {
    id: "portfolio",
    tipo: "foto",
    imagem: "/img/portfolio.jpg",
    href: "https://drrafaelcavalcant.my.canva.site/c-pia-de-portf-lio-mariana-magno",
    selo: "Para marcas",
    chamada: { texto: "Meu", destaque: "portfólio" },
    subtitulo: "Publi · UGC · Clips",
    nome: "Acessar portfólio",
    botao: "Ver portfólio",
  },
  {
    id: "metodo-clips",
    tipo: "foto",
    imagem: "/img/metodo-clips.jpg",
    href: "https://metodoclipscomonegocio.com.br/",
    selo: "Curso",
    chamada: { texto: "Método Clips como", destaque: "Negócio" },
    tamanhoChamada: 19,
    nome: "Método Clips como Negócio",
    botao: "Ver detalhes",
  },
  {
    id: "social-media",
    tipo: "texto",
    tema: "vinho",
    bordaSutil: true,
    href: "#", // TODO: link do formulário / WhatsApp
    selo: "Para empresas",
    chamada: { texto: "Social", destaque: "media" },
    tamanhoChamada: 28,
    rodape: "Minha empresa",
    nome: "Seja nosso cliente de social media",
    botao: "Aplicar",
  },
  {
    id: "ebook-marcas",
    tipo: "texto",
    tema: "rosa",
    href: "#", // TODO: link de checkout
    selo: "E-book · novo",
    chamada: { texto: "Conteúdos que atraem marcas" },
    tamanhoChamada: 24,
    rodape: "Mariana Magno",
    nome: "E-book: conteúdos que atraem marcas",
    botao: "Comprar",
  },
  {
    id: "ebook-ugc",
    tipo: "texto",
    tema: "vinho",
    href: "https://pay.kiwify.com.br/OONzog3",
    selo: "E-book",
    chamada: { texto: "UGC pra", destaque: "iniciantes" },
    tamanhoChamada: 30,
    rodape: "Mariana Magno",
    nome: "E-book de UGC",
    botao: "Comprar",
  },
];

export const comercial = {
  titulo: "WhatsApp comercial",
  texto: "Marcas: publicidade, UGC e Clips",
  botao: "Solicitar orçamento →",
  href: wa(
    WHATSAPP_COMERCIAL,
    "Oi, Mari! Tudo bem? Muito prazer. Gostaria de entender melhor sobre os serviços da Mariana Magno"
  ),
};

export const rodape = {
  nome: "Mariana Magno",
  linha: "Mentoria · Conteúdo · Clips",
};
