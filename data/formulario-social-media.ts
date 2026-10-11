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
  | {
      id: string;
      tipo: "opcoes";
      rotulo: string;
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
        id: "segmento",
        tipo: "opcoes",
        rotulo: "Qual o segmento?",
        opcoes: ["Moda", "Beleza e estética", "Saúde", "Alimentação", "Serviços", "E-commerce", "Infoproduto", "Outro"],
        obrigatoria: true,
      },
      {
        id: "faturamento",
        tipo: "opcoes",
        rotulo: "Faturamento mensal médio",
        opcoes: ["Até R$ 10 mil", "R$ 10 a 30 mil", "R$ 30 a 100 mil", "Acima de R$ 100 mil", "Prefiro não dizer"],
        obrigatoria: true,
      },
      {
        id: "quem_cuida",
        tipo: "opcoes",
        rotulo: "Hoje, quem cuida das redes sociais?",
        opcoes: ["Ninguém", "Eu mesma(o)", "Alguém da equipe", "Agência ou freelancer"],
        obrigatoria: true,
      },
    ],
  },
  {
    titulo: "O que você busca",
    perguntas: [
      {
        id: "objetivo",
        tipo: "opcoes",
        rotulo: "Principal objetivo com as redes",
        opcoes: ["Vender mais", "Ganhar autoridade e seguidores", "Lançar um produto", "Profissionalizar a marca"],
        obrigatoria: true,
      },
      {
        id: "investimento",
        tipo: "opcoes",
        rotulo: "Quanto pode investir por mês em social media?",
        opcoes: ["Até R$ 1.500", "R$ 1.500 a 3.000", "R$ 3.000 a 5.000", "Acima de R$ 5.000"],
        obrigatoria: true,
      },
      {
        id: "prazo",
        tipo: "opcoes",
        rotulo: "Quando quer começar?",
        opcoes: ["Agora", "Nos próximos 30 dias", "Só estou pesquisando"],
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

/**
 * Classificação automática do lead (vai para a coluna "temperatura" da planilha).
 * Quente = investimento a partir de R$ 3.000 e quer começar em até 30 dias.
 */
export function temperatura(r: Record<string, string>): "Quente" | "Morno" | "Frio" {
  const investeBem = ["R$ 3.000 a 5.000", "Acima de R$ 5.000"].includes(r.investimento);
  const comecaLogo = ["Agora", "Nos próximos 30 dias"].includes(r.prazo);
  if (r.prazo === "Só estou pesquisando" || r.investimento === "Até R$ 1.500") return "Frio";
  if (investeBem && comecaLogo) return "Quente";
  return "Morno";
}
