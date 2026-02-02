document.addEventListener("DOMContentLoaded", function () {

  // ==================================================
  // F01 — LOGIN NARRATIVO
  // ==================================================

  // Elementos da F01
  const inputNome = document.getElementById("nomeNarrativo");
  const btnContinuar = document.getElementById("btnF01Continuar");
  const f01Section = document.getElementById("f01-login");

  // Validação mínima da F01
  if (!inputNome || !btnContinuar || !f01Section) {
    console.warn("F01: elementos não encontrados no DOM.");
    return;
  }

  // --------------------------------------------------
  // F01 — PASSO 4: detectar usuário existente
  // --------------------------------------------------
  const userSalvo = localStorage.getItem("renascer_user");

  if (userSalvo) {
    const userData = JSON.parse(userSalvo);

    console.log("Usuário já identificado");
    console.log(userData);

    // Esconde F01
    f01Section.style.display = "none";

    // Mostra F02
    const f02Section = document.getElementById("f02-player");
    if (f02Section) {
      f02Section.style.display = "block";
    }

    // Encerra totalmente a F01
    return;
  }

  // --------------------------------------------------
  // F01 — PASSO 1: habilitar botão conforme input
  // --------------------------------------------------
  btnContinuar.disabled = true;

  inputNome.addEventListener("input", function () {
    btnContinuar.disabled = inputNome.value.trim().length === 0;
  });

  // --------------------------------------------------
  // F01 — PASSO 2: gerar token
  // --------------------------------------------------
  function gerarUserToken() {
    return "usr_" + Math.random().toString(36).substr(2, 9);
  }

  // --------------------------------------------------
  // F01 — PASSO 3: salvar usuário e avançar
  // --------------------------------------------------
  btnContinuar.addEventListener("click", function () {
    if (btnContinuar.disabled) return;

    const userData = {
      nomeNarrativo: inputNome.value.trim(),
      userToken: gerarUserToken(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("renascer_user", JSON.stringify(userData));

    console.log("F01 — Dados salvos localmente");
    console.log(userData);

    // Esconde F01
    f01Section.style.display = "none";

    // Mostra F02
    const f02Section = document.getElementById("f02-player");
    if (f02Section) {
      f02Section.style.display = "block";
    }
  });

  // ==================================================
  // F02 — ESCOLHA DO PLAYER
  // ==================================================

  const playerButtons = document.querySelectorAll(".player-btn");
  let playerSelecionado = null;

  if (playerButtons.length === 0) {
    console.warn("F02: nenhum botão de player encontrado.");
    return;
  }

  // --------------------------------------------------
  // F02 — PASSO 2: seleção do player (interação)
  // --------------------------------------------------
  playerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {

      // Remove seleção anterior
      playerButtons.forEach((b) => b.classList.remove("selected"));

      // Marca o atual
      btn.classList.add("selected");
      playerSelecionado = btn.dataset.player;

      console.log("Player selecionado:", playerSelecionado);
    });
  });

});

    
    const userData = {
      nomeNarrativo: inputNome.value.trim(),
      userToken: gerarUserToken(),
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("renascer_user", JSON.stringify(userData));

    console.log("F01 — Dados salvos localmente");
    console.log(userData);
  });
});


(() => {
  "use strict";

  /**
   * ============================================================
   * Renascer (MVP) — Arquitetura "Sony-style" (adaptada)
   * Input PC universal por POSIÇÃO: KeyboardEvent.code (KeyA/KeyS/KeyD)
   * ============================================================
   */

  const CONFIG = Object.freeze({
    MAX_TENTATIVAS: 5,
    RECARGA_MS: 15 * 60 * 1000,
    PLAYERS_QTD: 10,

    // Onboarding por posição física:
    // KeyA = tecla da posição do "A" em QWERTY (na maioria dos teclados)
    ONBOARDING_SEQUENCE: ["KeyA", "KeyS", "KeyA", "KeyS", "KeyA", "KeyS"],

    ONBOARDING_REWARD: Object.freeze({ tokens: 1, unlockKey: "KeyD" })
  });

  const KEYS = Object.freeze({
    PLAYERS: "renascer_players",
    SELECTED: "renascer_selectedPlayer"
  });

  const Util = {
    nowMs: () => Date.now(),
    clamp: (n, a, b) => Math.max(a, Math.min(b, n)),
    safeJsonParse(str, fallback) { try { return JSON.parse(str); } catch { return fallback; } },
    msToMMSS(ms) {
      const s = Math.ceil(ms / 1000);
      const mm = String(Math.floor(s / 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      return `${mm}:${ss}`;
    },
    // Converte code para um rótulo curto para UI (KeyA -> A)
    codeToLabel(code) {
      if (typeof code !== "string") return "?";
      if (code.startsWith("Key") && code.length === 4) return code.slice(3); // KeyA -> A
      if (code === "Semicolon") return ";";
      return code;
    }
  };

  const Telemetry = (() => {
    const buffer = [];
    const push = (event, data = {}) => {
      const payload = { t: new Date().toISOString(), event, ...data };
      buffer.push(payload);
      console.debug("[telemetry]", payload);
    };
    return { push, getBuffer: () => buffer.slice() };
  })();

  const Storage = (() => {
    const loadPlayers = () => Util.safeJsonParse(localStorage.getItem(KEYS.PLAYERS) || "[]", []);
    const savePlayers = (players) => localStorage.setItem(KEYS.PLAYERS, JSON.stringify(players));

    const getSelectedId = () => localStorage.getItem(KEYS.SELECTED);
    const setSelectedId = (id) => localStorage.setItem(KEYS.SELECTED, String(id));

    // Migration: se achar teclas antigas ["A","S","D"], converte para ["KeyA","KeyS","KeyD"]
    const migrateKeysToCodes = (arr) => {
      if (!Array.isArray(arr)) return arr;
      const map = { A: "KeyA", S: "KeyS", D: "KeyD", F: "KeyF", J: "KeyJ", K: "KeyK", L: "KeyL" };
      return arr.map(k => map[k] || k);
    };

    const seedPlayers = () => {
      const players = Array.from({ length: CONFIG.PLAYERS_QTD }).map((_, i) => ({
        id: String(i + 1),
        nome: `Persona ${String(i + 1).padStart(2, "0")}`,
        bloomMaximo: 1,
        faseAtual: "inicio",
        progresso: {
          tokens: 0,
          // Agora salvamos CODES
          teclasDesbloqueadas: ["KeyA", "KeyS"],
          onboardingCompleto: false,
          energia: {
            tentativas: CONFIG.MAX_TENTATIVAS,
            max: CONFIG.MAX_TENTATIVAS,
            recargaMs: CONFIG.RECARGA_MS,
            ultimaAtualizacao: new Date().toISOString()
          }
        }
      }));
      savePlayers(players);
      return players;
    };

    const ensurePlayers = () => {
      const players = loadPlayers();
      if (players.length >= CONFIG.PLAYERS_QTD) return players.map(ensureProgress);
      return seedPlayers();
    };

    const ensureProgress = (p) => {
      p.progresso ||= {};
      p.progresso.tokens ||= 0;

      // MIGRAÇÃO + default
      p.progresso.teclasDesbloqueadas = migrateKeysToCodes(p.progresso.teclasDesbloqueadas) || ["KeyA", "KeyS"];

      p.progresso.onboardingCompleto ||= false;
      p.progresso.energia ||= {
        tentativas: CONFIG.MAX_TENTATIVAS,
        max: CONFIG.MAX_TENTATIVAS,
        recargaMs: CONFIG.RECARGA_MS,
        ultimaAtualizacao: new Date().toISOString()
      };

      if (typeof p.bloomMaximo !== "number") p.bloomMaximo = 1;
      if (!p.faseAtual) p.faseAtual = "inicio";
      return p;
    };

    const getPlayerById = (id) => {
      const players = loadPlayers();
      const p = players.find(x => String(x.id) === String(id));
      return p ? ensureProgress(p) : null;
    };

    const upsertPlayer = (player) => {
      const players = loadPlayers();
      const idx = players.findIndex(x => String(x.id) === String(player.id));
      if (idx >= 0) players[idx] = player;
      else players.push(player);
      savePlayers(players);
    };

    return { loadPlayers, savePlayers, seedPlayers, ensurePlayers, getSelectedId, setSelectedId, getPlayerById, upsertPlayer };
  })();

  const EnergySystem = (() => {
    const tick = (player) => {
      const energia = player.progresso.energia;
      const last = Date.parse(energia.ultimaAtualizacao || new Date().toISOString());
      const delta = Math.max(0, Util.nowMs() - last);

      if (energia.tentativas >= energia.max) {
        energia.ultimaAtualizacao = new Date().toISOString();
        return;
      }

      const gained = Math.floor(delta / energia.recargaMs);
      if (gained > 0) {
        energia.tentativas = Util.clamp(energia.tentativas + gained, 0, energia.max);
        const remainder = delta % energia.recargaMs;
        energia.ultimaAtualizacao = new Date(Util.nowMs() - remainder).toISOString();
      }
    };

    const rechargeText = (player) => {
      const energia = player.progresso.energia;
      if (energia.tentativas >= energia.max) return "";
      const last = Date.parse(energia.ultimaAtualizacao);
      const elapsed = Math.max(0, Util.nowMs() - last);
      const remaining = energia.recargaMs - (elapsed % energia.recargaMs);
      return `+1 tentativa em ${Util.msToMMSS(remaining)}`;
    };

    return { tick, rechargeText };
  })();

  const UI = (() => {
    const $ = (sel) => document.querySelector(sel);

    const els = {
      telaSelecao: $("#telaSelecao"),
      telaOnboarding: $("#telaOnboarding"),
      telaHub: $("#telaHub"),

      grid: $("#grid"),
      resetBtn: $("#resetBtn"),

      playerName: $("#playerName"),
      bloom: $("#bloom"),
      tokens: $("#tokens"),
      livesDots: $("#livesDots"),
      livesText: $("#livesText"),
      rechargeText: $("#rechargeText"),

      promptLetter: $("#promptLetter"),
      feedback: $("#feedback"),
      barFill: $("#barFill"),
      progressText: $("#progressText"),
      concluirBtn: $("#concluirBtn"),
      voltarSelecaoBtn: $("#voltarSelecaoBtn"),

      hubPlayerName: $("#hubPlayerName"),
      hubTokens: $("#hubTokens"),
      hubKeys: $("#hubKeys"),
      hubVoltarBtn: $("#hubVoltarBtn"),
      hubResetBtn: $("#hubResetBtn")
    };

    const show = (screenEl) => {
      els.telaSelecao.classList.add("hidden");
      els.telaOnboarding.classList.add("hidden");
      els.telaHub.classList.add("hidden");
      screenEl.classList.remove("hidden");
    };

    const renderSelection = (players, onSelect) => {
      els.grid.innerHTML = "";
      players.forEach(p => {
        const card = document.createElement("div");
        card.className = "playerCard";

        const keys = (p.progresso?.teclasDesbloqueadas || []).map(Util.codeToLabel).join(", ");

        card.innerHTML = `
          <div class="name">${p.nome}</div>
          <div class="meta">id: ${p.id} • bloom: ${p.bloomMaximo ?? 1}</div>
          <div class="meta">tokens: ${p.progresso?.tokens ?? 0} • teclas: ${keys}</div>
        `;
        card.addEventListener("click", () => onSelect(p.id));
        els.grid.appendChild(card);
      });
    };

    const renderHUD = (player) => {
      els.playerName.textContent = player.nome || "Player";
      els.bloom.textContent = `Bloom: ${player.bloomMaximo ?? 1}`;
      els.tokens.textContent = `Tokens: ${player.progresso.tokens ?? 0}`;

      const energia = player.progresso.energia;
      const t = energia.tentativas;

      els.livesDots.textContent = "●".repeat(t) + "○".repeat(energia.max - t);
      els.livesText.textContent = `${t}/${energia.max}`;
      els.rechargeText.textContent = EnergySystem.rechargeText(player);
    };

    // Aqui a UI usa data-k="A/S/D", mas a lógica é por code.
    const highlightKeyByCode = (code, state) => {
      const letter = Util.codeToLabel(code); // KeyA -> A
      document.querySelectorAll(".key").forEach(k => k.classList.remove("active", "hit", "miss"));
      const key = document.querySelector(`.key[data-k="${letter}"]`);
      if (!key) return;
      if (state === "active") key.classList.add("active");
      if (state === "hit") key.classList.add("hit");
      if (state === "miss") key.classList.add("miss");
    };

    const renderOnboarding = (stepIndex, total, expectedCode) => {
      els.promptLetter.textContent = Util.codeToLabel(expectedCode);
      els.feedback.textContent = "Sincronize no ritmo.";
      highlightKeyByCode(expectedCode, "active");

      const pct = Math.round((stepIndex / total) * 100);
      els.barFill.style.width = `${pct}%`;
      els.progressText.textContent = `${stepIndex}/${total}`;
    };

    const renderOnboardingDone = (total) => {
      els.barFill.style.width = "100%";
      els.progressText.textContent = `${total}/${total}`;
      els.feedback.textContent = "Perfeito. Você concluiu a sincronização inicial.";
      els.concluirBtn.disabled = false;
    };

    const renderHub = (player) => {
      els.hubPlayerName.textContent = player.nome || "—";
      els.hubTokens.textContent = String(player.progresso.tokens ?? 0);
      els.hubKeys.textContent = (player.progresso.teclasDesbloqueadas || []).map(Util.codeToLabel).join(", ") || "—";
    };

    return { els, show, renderSelection, renderHUD, highlightKeyByCode, renderOnboarding, renderOnboardingDone, renderHub };
  })();

  const Onboarding = (() => {
    const state = { step: 0, done: false };
    const reset = () => { state.step = 0; state.done = false; };
    const total = () => CONFIG.ONBOARDING_SEQUENCE.length;
    const expected = () => CONFIG.ONBOARDING_SEQUENCE[state.step];

    const handleKey = (pressedCode) => {
      if (state.done) return { type: "ignored" };

      const pressed = String(pressedCode || "");
      const exp = expected();

      if (pressed === exp) {
        Telemetry.push("onboarding_hit", { step: state.step, code: pressed });
        UI.highlightKeyByCode(exp, "hit");
        state.step += 1;

        if (state.step >= total()) {
          state.done = true;
          return { type: "completed" };
        }
        return { type: "progressed" };
      }

      // Aceita só eventos com code (sempre string); filtramos alguns ruídos
      if (pressed) {
        Telemetry.push("onboarding_miss", { step: state.step, expected: exp, got: pressed });
        UI.highlightKeyByCode(exp, "miss");
        return { type: "miss" };
      }

      return { type: "ignored" };
    };

    const applyRewards = (player) => {
      player.progresso.onboardingCompleto = true;
      player.progresso.tokens = (player.progresso.tokens || 0) + CONFIG.ONBOARDING_REWARD.tokens;

      const unlocked = new Set(player.progresso.teclasDesbloqueadas || []);
      unlocked.add(CONFIG.ONBOARDING_REWARD.unlockKey);
      player.progresso.teclasDesbloqueadas = [...unlocked];

      player.faseAtual = "hub_treino";

      Telemetry.push("onboarding_reward", {
        tokensAdded: CONFIG.ONBOARDING_REWARD.tokens,
        unlocked: CONFIG.ONBOARDING_REWARD.unlockKey
      });
    };

    return { state, reset, total, expected, handleKey, applyRewards };
  })();

  const Game = (() => {
    const Screens = Object.freeze({ SELECAO: "SELECAO", ONBOARDING: "ONBOARDING", HUB: "HUB" });

    const runtime = { screen: Screens.SELECAO, player: null };

    const setScreen = (screen) => {
      runtime.screen = screen;
      if (screen === Screens.SELECAO) UI.show(UI.els.telaSelecao);
      if (screen === Screens.ONBOARDING) UI.show(UI.els.telaOnboarding);
      if (screen === Screens.HUB) UI.show(UI.els.telaHub);
      Telemetry.push("screen_view", { screen });
    };

    const startSelecao = () => {
      const players = Storage.ensurePlayers();
      UI.renderSelection(players, (id) => selectPlayer(id));
      setScreen(Screens.SELECAO);
    };

    const selectPlayer = (id) => {
      Storage.setSelectedId(id);
      const p = Storage.getPlayerById(id);
      if (!p) {
        runtime.player = null;
        return startSelecao();
      }

      runtime.player = p;
      EnergySystem.tick(runtime.player);
      Storage.upsertPlayer(runtime.player);

      Telemetry.push("player_selected", { id: runtime.player.id, nome: runtime.player.nome });
      startOnboarding();
    };

    const startOnboarding = () => {
      const sid = Storage.getSelectedId();
      const p = sid ? Storage.getPlayerById(sid) : null;

      if (!p) {
        runtime.player = null;
        return startSelecao();
      }

      runtime.player = p;
      EnergySystem.tick(runtime.player);
      Storage.upsertPlayer(runtime.player);

      Onboarding.reset();
      UI.els.concluirBtn.disabled = true;

      UI.renderHUD(runtime.player);
      UI.renderOnboarding(0, Onboarding.total(), Onboarding.expected());

      setScreen(Screens.ONBOARDING);
    };

    const finishOnboarding = () => {
      if (!runtime.player) return;
      Onboarding.applyRewards(runtime.player);
      Storage.upsertPlayer(runtime.player);

      UI.renderHUD(runtime.player);
      UI.renderOnboardingDone(Onboarding.total());
    };

    const openHub = () => {
      if (!runtime.player) return startSelecao();
      UI.renderHub(runtime.player);
      setScreen(Screens.HUB);
    };

    const resetAll = () => {
      localStorage.removeItem(KEYS.PLAYERS);
      localStorage.removeItem(KEYS.SELECTED);
      runtime.player = null;
      Storage.seedPlayers();
      Telemetry.push("reset_all");
      startSelecao();
    };

    // INPUT: agora é por e.code (posição)
    const onKeyDown = (e) => {
      if (runtime.screen !== Screens.ONBOARDING) return;
      if (!runtime.player) return;

      const result = Onboarding.handleKey(e.code);

      if (result.type === "progressed") {
        UI.els.feedback.textContent = "Boa! +Combo";
        const exp = Onboarding.expected();
        setTimeout(() => UI.renderOnboarding(Onboarding.state.step, Onboarding.total(), exp), 90);
      }

      if (result.type === "miss") {
        UI.els.feedback.textContent = "Quase. Foque na tecla destacada.";
        const exp = Onboarding.expected();
        setTimeout(() => UI.highlightKeyByCode(exp, "active"), 90);
      }

      if (result.type === "completed") {
        finishOnboarding();
      }
    };

    const startLoop = () => {
      setInterval(() => {
        if (!runtime.player) return;
        if (runtime.screen !== Screens.ONBOARDING) return;

        EnergySystem.tick(runtime.player);
        Storage.upsertPlayer(runtime.player);
        UI.renderHUD(runtime.player);
      }, 500);
    };

    const bindUI = () => {
      UI.els.resetBtn.addEventListener("click", () => {
        Storage.seedPlayers();
        Telemetry.push("seed_players");
        startSelecao();
      });

      UI.els.voltarSelecaoBtn.addEventListener("click", () => {
        Telemetry.push("back_to_selection");
        startSelecao();
      });

      UI.els.concluirBtn.addEventListener("click", () => {
        Telemetry.push("onboarding_continue");
        openHub();
      });

      UI.els.hubVoltarBtn.addEventListener("click", () => {
        Telemetry.push("hub_back");
        startOnboarding();
      });

      UI.els.hubResetBtn.addEventListener("click", resetAll);

      document.addEventListener("keydown", onKeyDown);
    };

    const boot = () => {
      Storage.ensurePlayers(); // já migra players antigos para codes
      bindUI();
      startLoop();
      startSelecao();
    };

    return { boot };
  })();

  Game.boot();
})();
