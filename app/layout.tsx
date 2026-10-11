import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const anton = localFont({
  src: "./fonts/anton-latin.woff2",
  weight: "400",
  variable: "--fonte-anton",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "./fonts/poppins-400-latin.woff2", weight: "400" },
    { path: "./fonts/poppins-500-latin.woff2", weight: "500" },
    { path: "./fonts/poppins-600-latin.woff2", weight: "600" },
    { path: "./fonts/poppins-700-latin.woff2", weight: "700" },
  ],
  variable: "--fonte-poppins",
  display: "swap",
});

const urlDoSite =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(urlDoSite),
  title: "Mariana Magno · Links",
  description:
    "Com 8 fontes de renda no digital, te ensino a construir o seu ecossistema, como já fiz com + de 700 alunas de alta performance.",
  icons: { icon: "/img/mariana.jpg", apple: "/img/mariana.jpg" },
  openGraph: {
    type: "website",
    title: "Mariana Magno",
    description: "Mentoria, conteúdo e Clips. Escolha como posso te ajudar hoje.",
    images: ["/img/mariana.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#22081A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
