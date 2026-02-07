export default function Apresentacao() {
  return (
    <main
  style={{
    maxWidth: 900,
    margin: "0 auto",
    padding: "80px 24px",
    lineHeight: 1.6,
    color: "#6AA9FF",
  }}
>
        <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>
        Projeto Renascer
      </h1>

      <p style={{ fontSize: "1.1rem", opacity: 0.85, marginBottom: 48 }}>
        Um experimento educacional em lógica, história e coerência.
      </p>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>
          O que é o Projeto Renascer
        </h2>
        <p>
          O Projeto Renascer é um jogo educacional desenvolvido em Python,
          estruturado exclusivamente a partir de fatos históricos documentados
          da Revolução Francesa (1789–1799).
        </p>
        <p>
          O projeto foi concebido para ensinar raciocínio lógico, programação
          progressiva e compreensão histórica factual, sem recorrer a
          gamificação tradicional, narrativas emocionais ou discursos morais.
        </p>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>
          Como o projeto funciona
        </h2>
        <p>
          O jogo é dividido em fases sequenciais. Cada fase representa um evento
          histórico indispensável e introduz um novo conceito técnico, exigindo
          a reutilização de tudo o que foi aprendido anteriormente.
        </p>
        <p>
          Toda fase termina em uma execução real e verificável. O progresso
          ocorre quando o raciocínio se sustenta.
        </p>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>
          O que este projeto não é
        </h2>
        <ul style={{ paddingLeft: 20 }}>
          <li>Não é um curso tradicional</li>
          <li>Não é uma aula expositiva</li>
          <li>Não é um jogo narrativo</li>
          <li>Não coleta dados pessoais</li>
          <li>Não cria perfis de usuário</li>
          <li>Não realiza avaliações psicológicas ou morais</li>
        </ul>
      </section>

      <section style={{ marginBottom: 64 }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>
          Estado atual
        </h2>
        <p>
          O Projeto Renascer encontra-se em desenvolvimento ativo. A estrutura
          pedagógica e ética está definida, e as primeiras implementações estão
          em andamento.
        </p>
        <p>
          O projeto mantém um canal aberto para sugestões conceituais e críticas
          estruturais.
        </p>
      </section>

      <a
        href="https://forms.gle/SEU_LINK_AQUI"
        target="_blank"
        rel="noopener noreferrer"
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
        Enviar sugestão
      </a>

      <p style={{ marginTop: 48, fontSize: "0.9rem", opacity: 0.6 }}>
        Este projeto não busca convencimento. Ele existe para ser observado,
        testado e, quando necessário, questionado.
      </p>
    </main>
  );
}
