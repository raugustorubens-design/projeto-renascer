# https://github.com/raugustorubens-design/projeto-renascer/blob/main/docs/PROMPT_CANONICO.md

# PROMPT CANÔNICO — GAME EM PYTHON
## Revolução Francesa (1789–1799) | Programação Histórica Auditável

## Contexto
Estamos desenvolvendo um jogo educacional em **Python**, baseado **exclusivamente em fatos históricos documentados da Revolução Francesa (1789–1799)**.

O jogo é dividido em **24 fases sequenciais**.  
Cada fase representa **um evento histórico indispensável** e introduz **1 novo conceito de Python**, reutilizando **todos os conceitos anteriores**.

---

## Regras Obrigatórias do Sistema
- Não utilizar narrativas emocionais, metáforas ou julgamentos
- Não oferecer explicações morais, conclusões ou “lições”
- Não antecipar respostas ou soluções
- O sistema apenas **registra estados, executa regras e valida transições**
- O feedback ocorre **exclusivamente** por:
  - execução correta
  - erro do Python
- Nenhum texto explicativo para o jogador

---

## Estrutura Obrigatória de Cada Fase
Cada fase deve ser implementada como **um arquivo `.py` independente** e conter obrigatoriamente:

### 1. Dados Históricos (somente como dados)
- `data` → string no formato `"YYYY-MM-DD"`
- `evento` → string objetiva
- `personagens` → lista de nomes históricos reais
- `fontes` → lista de referências históricas confiáveis

As fontes devem ser explícitas e auditáveis, por exemplo:
- Georges Lefebvre
- François Furet
- Eric Hobsbawm
- Encyclopaedia Britannica
- Archives Nationales (France)

---

### 2. Ação Objetiva do Jogador
Uma única ação central, como:
- atribuição de valor
- cálculo
- chamada de função
- execução de regra lógica

---

### 3. Validação Objetiva
- Uma validação explícita usando `assert`

---

### 4. Continuidade Histórica e Lógica
- Importar o estado da fase anterior (`import`)
- Nenhuma fase existe isoladamente

---

## Progressão Histórica Obrigatória (Referência)
Os seguintes personagens e instituições devem aparecer ao longo das fases, sempre como **dados**:
- Luís XVI
- Assembleia Nacional
- Mirabeau
- Robespierre
- Danton
- Marat
- Comitê de Salvação Pública
- Diretório
- Napoleão Bonaparte

Datas, eventos e personagens **não devem ser interpretados**, apenas registrados.

---

## Objetivo Imediato
Iniciar a implementação real do jogo pela **Fase 1**, criando o arquivo completo da fase.

A resposta deve conter **apenas**:
- nome do arquivo
- bloco de dados históricos (data, evento, personagens, fontes)
- ação objetiva do jogador
- validação (`assert`)

---

## Ação Solicitada
Crie a **Fase 1 completa**, respeitando rigorosamente todas as regras acima.
