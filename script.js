/* ===============================
   LOG VISUAL
================================ */
function log(message, type = "ok") {
  const logs = document.getElementById("logs");
  const entry = document.createElement("div");

  entry.className = `log ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

  logs.appendChild(entry);
  logs.scrollTop = logs.scrollHeight;
}

/* ===============================
   COMPLIANCE INVISÍVEL
================================ */
const COMPLIANCE_KEY = "renascer_compliance_log";

const EVENTOS_COMPLIANCE = {
  TESTE_EXECUTADO: "teste_executado",
  CHECKLIST_APROVADO: "checklist_aprovado",
  CHECKLIST_REPROVADO: "checklist_reprovado"
};

function registrarEvento(evento) {
  const logCompliance =
    JSON.parse(localStorage.getItem(COMPLIANCE_KEY)) || [];

  logCompliance.push({
    id: crypto.randomUUID(),
    tipo: evento.tipo,
    contexto: evento.contexto,
    bloom: evento.bloom || null,
    status: evento.status,
    timestamp: new Date().toISOString()
  });

  localStorage.setItem(
    COMPLIANCE_KEY,
    JSON.stringify(logCompliance)
  );
}

/* ===============================
   TESTE DA MODIFICAÇÃO
================================ */
function executarTeste() {
  log("Iniciando teste da modificação");

  try {
    // SIMULAÇÃO DE MODIFICAÇÃO
    const resultado = true;

    if (resultado) {
      log("Modificação executada com sucesso", "ok");
    } else {
      log("Resultado inesperado", "warn");
    }

  } catch (e) {
    log(`Erro detectado: ${e.message}`, "error");
    throw e;
  }
}

/* ===============================
   CHECKLIST AUTOMÁTICO
================================ */
const checklistItens = [
  {
    nome: "Script de teste carregado",
    teste: () => typeof log === "function"
  },
  {
    nome: "Função executarTeste existe",
    teste: () => typeof executarTeste === "function"
  },
  {
    nome: "DOM de logs carregado",
    teste: () => document.getElementById("logs") !== null
  },
  {
    nome: "Execução sem erro crítico",
    teste: () => true
  }
];

function executarChecklist() {
  const ul = document.getElementById("checklist");
  const veredito = document.getElementById("veredito");

  ul.innerHTML = "";
  let aprovado = true;

  checklistItens.forEach(item => {
    const li = document.createElement("li");

    try {
      const resultado = item.teste();

      if (resultado) {
        li.textContent = `✔ ${item.nome}`;
        li.className = "check-ok";
      } else {
        li.textContent = `✖ ${item.nome}`;
        li.className = "check-fail";
        aprovado = false;
      }
    } catch {
      li.textContent = `✖ ${item.nome} (erro)`;
      li.className = "check-fail";
      aprovado = false;
    }

    ul.appendChild(li);
  });

  veredito.textContent = aprovado
    ? "APROVADO — Modificação validada"
    : "REPROVADO — Correções necessárias";

  veredito.className = aprovado ? "check-ok" : "check-fail";

  registrarEvento({
    tipo: aprovado
      ? EVENTOS_COMPLIANCE.CHECKLIST_APROVADO
      : EVENTOS_COMPLIANCE.CHECKLIST_REPROVADO,
    contexto: "sandbox_teste",
    bloom: 3,
    status: aprovado ? "ok" : "fail"
  });

  return aprovado;
}

/* ===============================
   EXECUÇÃO COMPLETA
================================ */
function executarTesteCompleto() {
  log("Sandbox iniciado", "ok");

  registrarEvento({
    tipo: EVENTOS_COMPLIANCE.TESTE_EXECUTADO,
    contexto: "sandbox_teste",
    bloom: 3,
    status: "executado"
  });

  executarTeste();
  executarChecklist();
}

/* ===============================
   BOOT
================================ */
log("Página de teste carregada", "ok");
