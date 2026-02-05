export const metadata = {
  title: "Projeto Renascer",
  description: "Formação humana, ética e evolução pessoal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, backgroundColor: "#081A3A" }}>
        {children}
      </body>
    </html>
  );
}
