/**
 * Perguntas do formulário de Social media (qualificação de ICP).
 * Para mudar uma pergunta ou as opções, edite só este arquivo.
 * O "id" vira o nome da coluna na planilha — evite trocar depois que estiver no ar.
 */

export type Pergunta =
  | {
      id: string;
      tipo: "texto" | "telefone" | "textarea";
      rotulo: string;
      placeholder?: string;
      obrigatoria?: boolean;
    }
  | (OpcoesBase & { tipo: "opcoes" }) // escolhe uma
  | (OpcoesBase & { tipo: "multiplas" }); // pode marcar várias

type OpcoesBase = {
  id: string;
  rotulo: string;
  ajuda?: string;
  opcoes: string[];
  obrigatoria?: boolean;
};

export type Etapa = { titulo: string; perguntas: Pergunta[] };

export const etapas: Etapa[] = [
  {
    titulo: "Sobre você",
    perguntas: [
      { id: "nome", tipo: "texto", rotulo: "Seu nome", placeholder: "Como podemos te chamar?", obrigatoria: true },
      { id: "whatsapp", tipo: "telefone", rotulo: "Seu WhatsApp", placeholder: "(11) 91234-5678", obrigatoria: true },
      { id: "empresa", tipo: "texto", rotulo: "Nome da empresa", placeholder: "Nome da sua marca ou negócio", obrigatoria: true },
      { id: "instagram", tipo: "texto", rotulo: "Instagram da empresa", placeholder: "@suaempresa" },
    ],
  },
  {
    titulo: "Sobre o negócio",
    perguntas: [
      {
        id: "negocio",
        tipo: "texto",
        rotulo: "Qual é o seu negócio?",
        placeholder: "Ex.: loja de roupas femininas, clínica de estética",
        obrigatoria: true,
      },
      {
        id: "segmento",
        tipo: "opcoes",
        rotulo: "Qual o segmento?",
        opcoes: ["Moda", "Beleza e estética", "Saúde", "Alimentação", "Serviços", "E-commerce", "Infoproduto", "Outro"],
        obrigatoria: true,
      },
      {
        id: "situacao_redes",
        tipo: "opcoes",
        rotulo: "Hoje, como funcionam suas redes sociais?",
        opcoes: [
          "Ainda não faço social media",
          "Faço sozinha(o)",
          "Alguém da equipe cuida",
          "Já tenho agência ou freelancer",
        ],
        obrigatoria: true,
      },
    ],
  },
  {
    titulo: "O que você busca",
    perguntas: [
      {
        id: "servicos",
        tipo: "multiplas",
        rotulo: "Qual serviço você procura?",
        ajuda: "pode marcar mais de um",
        opcoes: ["Design", "Edição de vídeos e posts", "Estratégia da marca", "Gestão de mídia social"],
        obrigatoria: true,
      },
      {
        id: "objetivo",
        tipo: "opcoes",
        rotulo: "Principal objetivo com as redes",
        opcoes: ["Vender mais", "Ganhar autoridade e seguidores", "Lançar um produto", "Profissionalizar a marca"],
        obrigatoria: true,
      },
      {
        id: "observacoes",
        tipo: "textarea",
        rotulo: "Quer contar mais alguma coisa?",
        placeholder: "Opcional",
      },
    ],
  },
];

export const todasAsPerguntas = etapas.flatMap((e) => e.perguntas);
