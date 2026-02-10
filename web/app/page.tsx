export default function Home() {
  return (
    <main style={{ color: "white", padding: 40 }}>
      <h1>Projeto Renascer</h1>
      <p>Um experimento educacional em desenvolvimento.</p>

      <a
        href="/apresentacao"
        style={{
          display: "inline-block",
          marginTop: 24,
          color: "#6aa9ff",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Acessar apresentação
      </a>
    </main>
  );
}
