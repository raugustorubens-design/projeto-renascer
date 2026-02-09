## BLOCO IV-A — EXECUÇÃO DE PYTHON NO SISTEMA FREE

### Princípio Geral

O Projeto Renascer executa **Python real diretamente no navegador**, sem execução de código do usuário em servidores externos.

O sistema utiliza ambiente local controlado (WebAssembly / Python embarcado), garantindo segurança, baixo custo e coerência pedagógica.

---

### Princípios de Execução

- O código do viajante é executado **localmente no navegador**
- Nenhum código do usuário é enviado para execução em servidor
- Não há acesso ao sistema operacional
- O ambiente é fechado, determinístico e auditável
- A execução suporta `assert` e validações objetivas

Esse modelo é obrigatório no modo **FREE**.

---

### Motor Único de Fases (Engine)

O sistema possui um **motor único e central**, responsável por:

- carregar arquivos de fase
- executar o código do viajante
- validar soluções com `assert`
- importar o estado da fase anterior
- gerar o estado da fase atual
- classificar erros de forma e erros lógicos

Após estabilização, o motor é **imutável**.

---

### Regra de Separação

Arquivos de fase **não** implementam:
- controle de fluxo
- lógica de navegação
- persistência direta
- lógica de interface

Arquivos de fase **apenas declaram**:
- dados históricos
- conceito Python da fase (+1)
- missão em língua portuguesa
- regras objetivas de validação
- estado de saída

Essa separação é obrigatória e canônica.
