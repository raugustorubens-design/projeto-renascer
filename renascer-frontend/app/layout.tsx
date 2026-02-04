import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projeto Renascer",
  description: "Formação humana, ética e evolução pessoal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className="
          min-h-screen
          bg-[#081A3A]
          text-[#E9F4FC]
          antialiased
        "
      >
        {/* 
          FORMA GLOBAL DO SITE
          - Forma aprovada vive aqui
          - Nenhuma lógica de tela neste arquivo
        */}
        <main
          className="
            relative
            min-h-screen
            overflow-hidden
          "
        >
          {children}
        </main>
      </body>
    </html>
  );
}
