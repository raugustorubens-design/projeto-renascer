import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projeto Renascer",
  description: "Formação humana, ética e evolução pessoal",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, backgroundColor: "#081A3A" }}>
        {children}
      </body>
    </html>
  );
}

