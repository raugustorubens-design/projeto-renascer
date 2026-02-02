# Checklist de Etapas — Projeto Renascer
## Pasta: /style

## Regras
- Nenhuma etapa pode ser marcada como (OK) sem teste funcional da página.
- Teste funcional significa: a página carrega, executa a lógica esperada e respeita o fluxo.
- Onde a etapa não se aplica à pasta, usar (NA).
- Toda mudança de status exige commit próprio.

---

#F00 (OK) — Política de Trabalho e Aprendizado (Pré-Jornada)
Teste realizado:
- Script controla a exibição da F00
- Usuário não avança sem aceitar a política
- Estado de aceite é registrado localmente
Resultado: OK

#F01 (PENDENTE) — Login narrativo + UserToken
Teste previsto:
- Script recebe nome narrativo
- Validação de nome (não vazio / único no dispositivo)
- Geração automática do UserToken
- Persistência local sem dados sensíveis
Resultado: aguardando implementação

#F02 (PENDENTE) — Escolha do Player
Teste previsto:
- Script carrega lista de players
- Seleção de player altera estado
- Avanço para próxima etapa ocorre corretamente
Resultado: aguardando implementação

#F03 (PENDENTE) — Jornada / Atos
Teste previsto:
- Script carrega ato inicial
- Progressão respeita ordem dos atos
- Checkpoints são registrados
Resultado: aguardando implementação

#F04 (PENDENTE) — Avaliação
Teste previsto:
- Script registra decisões do usuário
- Avaliação é aplicada no momento correto
Resultado: aguardando implementação

#F05 (PENDENTE) — Certificação
Teste previsto:
- Script valida percurso completo
- Geração de identificador técnico do certificado
- Nenhum dado sensível é persistido
Resultado: aguardando implementação

#F06 (PENDENTE) — Premium / Continuidade
Teste previsto:
- Script gera Token Premium
- Token permite continuidade em outro dispositivo
- Fluxo Premium não quebra o Free
Resultado: aguardando implementação
