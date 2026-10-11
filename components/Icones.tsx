type P = { tamanho?: number; cor?: string; espessura?: number; className?: string };

const base = (t: number, cor: string, e: number) => ({
  width: t,
  height: t,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: cor,
  strokeWidth: e,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Instagram = ({ tamanho = 21, cor = "currentColor", espessura = 1.8 }: P) => (
  <svg {...base(tamanho, cor, espessura)}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
  </svg>
);

export const TikTok = ({ tamanho = 21, cor = "currentColor", espessura = 1.8 }: P) => (
  <svg {...base(tamanho, cor, espessura)}>
    <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
    <path d="M14 3c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);

export const WhatsApp = ({ tamanho = 21, cor = "currentColor", espessura = 1.8, className }: P) => (
  <svg {...base(tamanho, cor, espessura)} className={className}>
    <path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8z" />
  </svg>
);

export const Email = ({ tamanho = 21, cor = "currentColor", espessura = 1.8 }: P) => (
  <svg {...base(tamanho, cor, espessura)}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const Cadeado = ({ tamanho = 16, cor = "currentColor", espessura = 2 }: P) => (
  <svg {...base(tamanho, cor, espessura)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const Play = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2 1.5l8.5 4.5L2 10.5z" fill="#E8B4C8" />
  </svg>
);
