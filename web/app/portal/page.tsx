export default function Portal() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 24px",
        lineHeight: 1.6,
        color: "#E6ECFF",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: 24 }}>
        Portal
      </h1>

      <p style={{ marginBottom: 16 }}>
        Você está prestes a entrar em um ambiente de aprendizado experimental.
      </p>

      <p style={{ marginBottom: 16 }}>
        Este projeto não opera como um curso tradicional, não apresenta conteúdos
        prontos e não oferece garantias de resultado.
      </p>

      <p style={{ marginBottom: 16 }}>
        A progressão ocorre apenas quando o raciocínio se sustenta e quando as
        escolhas feitas podem ser justificadas.
      </p>

      <p style={{ marginBottom: 32 }}>
        Não há coleta de dados pessoais, criação de perfis ou avaliação moral.
      </p>

      <p style={{ marginBottom: 48 }}>
        Se decidir prosseguir, você o fará por escolha própria.
      </p>

      <a
        href="#"
        style={{
          display: "inline-block",
          padding: "14px 28px",
          border: "1px solid #6aa9ff",
          borderRadius: 6,
          color: "#6aa9ff",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Iniciar jornada
      </a>
    </main>
  );
}
