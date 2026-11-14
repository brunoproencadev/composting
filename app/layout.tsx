import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Composting — Nada termina. Tudo se transforma.",
  description: "Aprenda a compostar em casa, descubra o que pode entrar na composteira e cultive um futuro com menos resíduos e mais vida.",
  openGraph: { title: "Composting — Cultive novos ciclos", description: "Um guia para transformar resíduos em cuidado com o solo e o clima.", locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
