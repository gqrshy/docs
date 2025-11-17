# Personalização de GUI e Idiomas

---
**CobbleRanked** > **Configuração** > **GUI e Idiomas**
---

Personalize a aparência da interface CobbleRanked, layout e mensagens.

## Arquivos GUI

**Localização:** `config/cobbleranked/gui/`

CobbleRanked usa arquivos GUI específicos de idioma:

```
gui/
├── gui-enUs.json5    # Inglês
├── gui-jaJp.json5    # Japonês
├── gui-ptBr.json5    # Português
└── gui-ruRu.json5    # Russo
```

Cada arquivo contém **todas** as definições de GUI para aquele idioma.

## GUIs Disponíveis

- **gui_ranked** - Menu principal (fila, estatísticas, classificação)
- **gui_top_ranked** - Exibição de classificação
- **gui_prepare_combat** - Prévia de equipe pré-batalha
- **gui_rewards** - Recompensas de temporada/marcos
- **gui_ranked_blocked** - Visualizador de blacklist
- **closeGui** - Botão fechar (compartilhado)

## Personalização Básica

### Mudar Exibição de Item

```json5
{
  "gui_ranked": {
    "title": "Batalhas Ranqueadas",
    "rows": 3,
    "items": {
      "queue_singles": {
        "item": "minecraft:iron_sword",  // Mudar item
        "name": "Entrar na Fila Singles",           // Mudar nome
        "slot": 11,                        // Mudar posição
        "lore": [
          "Clique para entrar na fila singles"
        ]
      }
    }
  }
}
```

### Campos de Item

| Campo | Descrição | Obrigatório |
|-------|-------------|----------|
| `item` | ID do item (ex: `minecraft:diamond`) | Sim |
| `name` | Nome de exibição (suporta códigos de cor) | Sim |
| `slot` | Slot do inventário (0-53) | Sim |
| `lore` | Array de linhas de lore | Não |
| `amount` | Tamanho da pilha (1-64) | Não |
| `glow` | Adicionar brilho de encantamento | Não |

### Códigos de Cor

Use `&` para cores:
- `&a` - Verde
- `&c` - Vermelho
- `&e` - Amarelo
- `&b` - Aqua
- `&6` - Dourado
- `&l` - Negrito
- `&r` - Resetar

Exemplo:
```json5
"name": "&a&lEntrar na Fila Singles"  // Texto verde em negrito
```

## Layout de GUI

Slots são numerados 0-53 (6 linhas × 9 colunas):

```
 0  1  2  3  4  5  6  7  8
 9 10 11 12 13 14 15 16 17
18 19 20 21 22 23 24 25 26
27 28 29 30 31 32 33 34 35
36 37 38 39 40 41 42 43 44
45 46 47 48 49 50 51 52 53
```

> **[📸 IMAGEM NECESSÁRIA: Diagrama de layout de números de slot GUI (exibição de mapeamento 0-53, grade visual)]**

## Marcadores de Posição

Use marcadores de posição para conteúdo dinâmico:

| Marcador | Descrição |
|-------------|-------------|
| `{elo}` | Rating Elo do jogador |
| `{wins}` | Contagem de vitórias |
| `{losses}` | Contagem de derrotas |
| `{rank}` | Posição de ranking do jogador |
| `{tier}` | Tier do jogador (Pokeball, Greatball, etc.) |
| `{season}` | Nome da temporada atual |
| `{queue_count}` | Jogadores na fila |

Exemplo:
```json5
"lore": [
  "Seu Elo: &e{elo}",
  "Vitórias: &a{wins} &7| Derrotas: &c{losses}"
]
```

> **[📸 IMAGEM NECESSÁRIA: Exemplo de item GUI com marcadores aplicados (tooltip mostrando valores reais de Elo e vitórias/derrotas)]**

## Personalizações Comuns

### Mudar Posição do Botão de Fila

```json5
"queue_singles": {
  "slot": 20  // Mover para slot diferente
}
```

### Adicionar Itens de Decoração Personalizados

```json5
"decoration": {
  "item": "minecraft:black_stained_glass_pane",
  "name": " ",
  "slot": 0
}
```

### Modificar Exibição de Classificação

```json5
"gui_top_ranked": {
  "title": "&6&lMelhores Jogadores",
  "rows": 6
}
```

## Aplicando Mudanças

1. Edite o arquivo GUI
2. Execute `/rankedadmin reload`
3. Reabra a GUI para ver as mudanças

> **[📸 IMAGEM NECESSÁRIA: Imagem de comparação GUI antes/depois (diferença entre item/posicionamento padrão e personalizado)]**

**Nota:** Recargas de config detectam automaticamente idioma de `config.json5`.

## Solução de Problemas

**GUI não atualizando:**
- Verifique sintaxe JSON5 (use [JSONLint](https://jsonlint.com/))
- Verifique codificação do arquivo é UTF-8
- Execute `/rankedadmin reload`

**Itens não aparecendo:**
- Verifique números de slot (faixa 0-53)
- Verifique IDs de itens são válidos

**Cores não funcionando:**
- Use `&` não `§` para códigos de cor
- Garanta `&r` para resetar formatação

---

## Personalização de Idioma

### Visão Geral

CobbleRanked inclui 4 idiomas incorporados:
- **Inglês** (`en-Us.json5`) - Padrão
- **Japonês** (`ja-Jp.json5`)
- **Português** (`pt-Br.json5`)
- **Russo** (`ru-Ru.json5`)

**Arquivos:** `config/cobbleranked/language/`

Todas as mensagens, notificações e texto são totalmente personalizáveis via arquivos de idioma JSON5.

### Selecionar Idioma

Edite `config/cobbleranked/config.json5`:

```json5
{
  "language": "pt-Br"  // Mude para: en-Us, ja-Jp, pt-Br, ru-Ru
}
```

Então recarregue:
```bash
/rankedadmin reload
```

---

## Estrutura de Arquivo de Idioma

### Formato de Arquivo

Arquivos de idioma usam formato JSON5 com pares chave-valor:

```json5
{
  "message_key": "Conteúdo da mensagem com {placeholder}",
  "another_key": "Outra mensagem",
  "color_example": "&aTexto verde &cVermelho &eAmarelo"
}
```

### Exemplo: pt-Br.json5

```json5
{
  // Mensagens de fila
  "joined-queue": "&aVocê entrou na fila de partidas ranqueadas.",
  "left-queue": "&cVocê saiu da fila de partidas ranqueadas.",
  "remaingFila": "&cProcurando por uma partida... &7(&e{remaining}&7) &7(Posição: &e{posicao}&7)",

  // Mensagens de batalha
  "match-winner": "&aVitória!!",
  "match-winner-subtitle": "&aVocê ganhou &f{gain} &apontos de ELO.",
  "match-loser": "&cDerrota!!",
  "match-loser-subtitle": "&cVocê perdeu &f{lose} &apontos de ELO.",

  // Mensagens de validação
  "pokemon-blacklist": "&cVocê está usando um Pokémon que está na blacklist.",
  "no-pokemon-ability": "&cSeu Pokémon tem uma habilidade que não é permitida no ranqueado."
}
```

---

## Categorias de Mensagens

### Mensagens de Fila

| Chave | Descrição | Exemplo |
|-----|-------------|---------|
| `joined-queue` | Notificação de entrada na fila | "Você entrou na fila de partidas ranqueadas." |
| `left-queue` | Notificação de saída da fila | "Você saiu da fila de partidas ranqueadas." |
| `remaingFila` | Status de espera na fila | "Procurando por uma partida... (30s) (Posição: 1)" |
| `match-found` | Título de partida encontrada | "Partida Encontrada!" |
| `prepare-queue-cancel` | Mensagem de partida cancelada | "Partida foi cancelada. (Um jogador desconectou)" |

### Mensagens de Batalha

| Chave | Descrição | Exemplo |
|-----|-------------|---------|
| `battle-start-title` | Título de início de batalha | "Batalha Iniciando!" |
| `battle-countdown` | Número da contagem regressiva | "3" |
| `match-started` | Notificação de início de partida | "Partida Iniciada" |
| `match-winner` | Título de vitória | "Vitória!!" |
| `match-winner-subtitle` | Subtítulo de vitória com ganho de Elo | "Você ganhou 25 pontos de ELO." |
| `match-loser` | Título de derrota | "Derrota!!" |
| `match-loser-subtitle` | Subtítulo de derrota com perda de Elo | "Você perdeu 18 pontos de ELO." |

### Mensagens de Validação

| Chave | Descrição | Exemplo |
|-----|-------------|---------|
| `pokemon-blacklist` | Erro de Pokémon banido | "Você está usando um Pokémon que está na blacklist." |
| `no-pokemon-ability` | Erro de habilidade banida | "Seu Pokémon tem uma habilidade que não é permitida no ranqueado." |
| `blocked-item-move` | Erro de movimento banido | "Você tem um Pokémon com movimentos bloqueados no ranqueado." |
| `no-pokemon-item` | Erro de item banido | "Seu Pokémon tem um item equipado que não é permitido no ranqueado." |
| `limit-pokemon` | Erro de tamanho de equipe | "Você precisa ter 6 Pokémon para entrar na partida ranqueada." |

### Mensagens de Admin

| Chave | Descrição | Exemplo |
|-----|-------------|---------|
| `ranked-reload-adm` | Sucesso no reload de config | "Configurações recarregadas com sucesso!" |
| `set-elo-adm` | Comando de definir Elo | "Elo 1500 definido com sucesso para o jogador Steve" |
| `arena-not-found` | Erro de arena não encontrada | "Arena volcano_arena não encontrada" |
| `noPermCommand` | Permissão negada | "Você não tem permissão para usar este comando." |

---

## Marcadores de Posição de Mensagens

Muitas mensagens suportam marcadores que são substituídos dinamicamente:

### Marcadores de Jogador e Partida

| Marcador | Descrição | Exemplo de Uso |
|-------------|-------------|---------------|
| `{player}` | Nome do jogador | "match-finished": "{player} venceu!" |
| `{player1}` | Nome do primeiro jogador | "ranked-started": "{player1} vs {player2}" |
| `{player2}` | Nome do segundo jogador | "prepare-queue-subtitle": "{player1} vs {player2}" |
| `{winner}` | Nome do vencedor | "match-finished": "{winner} venceu!" |
| `{loser}` | Nome do perdedor | "match-finished": "{winner} derrotou {loser}!" |

### Marcadores de Elo e Estatísticas

| Marcador | Descrição | Exemplo de Uso |
|-------------|-------------|---------------|
| `{gain}` | Elo ganho | "match-winner-subtitle": "Você ganhou {gain} ELO" |
| `{lose}` | Elo perdido | "match-loser-subtitle": "Você perdeu {lose} ELO" |
| `{elo}` | Rating Elo | "elo-up": "Você subiu de rank para {elo}." |
| `{wins}` | Contagem de vitórias | "Suas vitórias: {wins}" |
| `{losses}` | Contagem de derrotas | "Suas derrotas: {losses}" |

### Marcadores de Fila e Sistema

| Marcador | Descrição | Exemplo de Uso |
|-------------|-------------|---------------|
| `{remaining}` | Tempo restante | "remaingFila": "Procurando... ({remaining})" |
| `{posicao}` | Posição na fila | "remaingFila": "Posição: {posicao}" |
| `{time}` | Valor de tempo | "match-started-subtitle": "Duração é {time}m" |
| `{limit}` | Limite de tamanho de equipe | "limit-pokemon": "Você precisa de {limit} Pokémon" |
| `{arena}` | Nome da arena | "arena-not-found": "Arena {arena} não encontrada" |

### Marcadores de Pokémon

| Marcador | Descrição | Exemplo de Uso |
|-------------|-------------|---------------|
| `{pokemon}` | Nome do Pokémon | "pokemon_switched": "Selecionado {pokemon}" |
| `{level}` | Nível do Pokémon | "Nível: {level}" |
| `{current}` | HP atual | "HP: {current}/{max}" |
| `{max}` | HP máximo | "HP: {current}/{max}" |
| `{label}` | Categoria do Pokémon | "team_selection_label_limit_item": "{label}: {current}/{limit}" |

### Exemplo com Marcadores

```json5
{
  "match-finished": "&8* &f{winner} &cacabou de vencer uma partida ranqueada contra &f{loser}.",
  "elo-up": "&aVocê subiu de rank para &f{elo}.",
  "remaingFila": "&cProcurando por uma partida... &7(&e{remaining}&7) &7(Posição: &e{posicao}&7)"
}
```

**Resultado:**
- `{winner}` → "Steve"
- `{loser}` → "Alex"
- Saída: "* Steve acabou de vencer uma partida ranqueada contra Alex."

---

## Referência de Códigos de Cor

### Cores

| Código | Cor | Exemplo |
|------|-------|---------|
| `&0` | Preto | `&0Texto preto` |
| `&1` | Azul escuro | `&1Azul escuro` |
| `&2` | Verde escuro | `&2Verde escuro` |
| `&3` | Aqua escuro | `&3Aqua escuro` |
| `&4` | Vermelho escuro | `&4Vermelho escuro` |
| `&5` | Roxo escuro | `&5Roxo escuro` |
| `&6` | Dourado | `&6Dourado` |
| `&7` | Cinza | `&7Cinza` |
| `&8` | Cinza escuro | `&8Cinza escuro` |
| `&9` | Azul | `&9Azul` |
| `&a` | Verde | `&aVerde` |
| `&b` | Aqua | `&bAqua` |
| `&c` | Vermelho | `&cVermelho` |
| `&d` | Roxo claro | `&dRoxo claro` |
| `&e` | Amarelo | `&eAmarelo` |
| `&f` | Branco | `&fBranco` |

### Formatação

| Código | Formato | Exemplo |
|------|--------|---------|
| `&l` | Negrito | `&l&aVERDE NEGRITO` |
| `&m` | Tachado | `&mTachado` |
| `&n` | Sublinhado | `&nSublinhado` |
| `&o` | Itálico | `&oItálico` |
| `&r` | Resetar | `&aVerde&r Normal` |

### Exemplos

```json5
{
  "match-winner": "&a&lVitória!!",              // Verde negrito
  "match-loser": "&c&lDerrota!!",                // Vermelho negrito
  "elo-up": "&aVocê subiu de rank para &f{elo}&a.",    // Verde com Elo branco
  "battle-start-title": "&e&lBatalha Iniciando!"  // Amarelo negrito
}
```

---

## Criando Idioma Personalizado

### Passo 1: Copiar Idioma Existente

```bash
cd config/cobbleranked/language/
cp pt-Br.json5 es-Es.json5  # Exemplo espanhol
```

### Passo 2: Traduzir Mensagens

Edite `es-Es.json5`:

```json5
{
  "joined-queue": "&aTe has unido a la cola de partidas clasificatorias.",
  "left-queue": "&cHas salido de la cola de partidas clasificatorias.",
  "match-winner": "&a¡¡Victoria!!",
  "match-loser": "&c¡¡Derrota!!",
  "pokemon-blacklist": "&cEstás usando un Pokémon que está en la lista negra.",
  // ... traduzir todas as chaves
}
```

**Importante:**
- Mantenha todas as chaves iguais (apenas traduza valores)
- Preserve marcadores (ex: `{player}`, `{elo}`)
- Use mesmos códigos de cor ou personalize

### Passo 3: Selecionar Seu Idioma

Edite `config.json5`:

```json5
{
  "language": "es-Es"
}
```

### Passo 4: Recarregar

```bash
/rankedadmin reload
```

---

## Testando Idioma

### 1. Recarregar Configuração

```bash
/rankedadmin reload
```

### 2. Testar Mensagens Comuns

- Entrar na fila: `/ranked` → Botão de fila
- Mensagens de batalha: Complete uma batalha
- Validação: Tente Pokémon/movimentos banidos
- Admin: `/rankedadmin reload`

### 3. Verificar Console

Procure por erros em `logs/latest.log`:

```
[CobbleRanked] Message configurations for language es-Es loaded successfully!
```

Se ocorrerem erros:
- Verifique sintaxe JSON5
- Verifique nome do arquivo corresponde à configuração
- Procure por chaves faltando

---

## Solução de Problemas de Idioma

### Idioma não carregando

**Sintomas:** Ainda mostra inglês após mudar idioma

**Soluções:**
1. Verifique configuração de `language` em `config.json5`
2. Verifique nome do arquivo corresponde exatamente (sensível a maiúsculas)
3. Recarregue: `/rankedadmin reload`
4. Verifique console para erros

### Mensagens faltando

**Sintomas:** Algumas mensagens mostram chave ao invés de texto

**Soluções:**
1. Garanta que todas as chaves de `en-Us.json5` existam em seu arquivo
2. Copie chaves faltando do arquivo inglês
3. Recarregue configuração

### Marcadores não substituindo

**Sintomas:** Mensagem mostra `{player}` ao invés de nome do jogador

**Soluções:**
1. Verifique ortografia do marcador (sensível a maiúsculas)
2. Verifique marcador é usado na mensagem correta
3. Use marcador correto para tipo de mensagem

---

## Melhores Práticas

### Arquivos de Idioma

**✅ FAÇA:**
- Mantenha todos os arquivos de idioma em sincronia (mesmas chaves)
- Teste mensagens no jogo após mudanças
- Use esquema de cores consistente entre mensagens
- Preserve formatação de marcadores
- Use comentários para organização

**❌ NÃO FAÇA:**
- Remover ou renomear chaves (causará erros)
- Esquecer de escapar caracteres especiais
- Usar nomes de marcadores que não existem
- Misturar diferentes estilos de aspas inconsistentemente

### Caracteres Especiais

#### Apóstrofos

Use `''` (apóstrofo duplo) para escapar aspas simples:

```json5
{
  "lead_selection_gui_opponent_pokemon": "&7Pokémon do Oponente"
}
```

#### Barras Invertidas

Use `\\` para escapar barras invertidas:

```json5
{
  "permission-message": "&cVocê não tem permissão"
}
```

---

## Próximos Passos

### Para Personalização de GUI
1. **[Referência de Códigos de Cor](#color-codes-reference)** - Guia completo de cores e formatação
2. **[Uso de Marcadores](#placeholders)** - Conteúdo dinâmico em GUIs
3. **[Testando Mudanças](#applying-changes)** - Recarregar e verificar modificações

### Para Personalização de Idioma
1. **[Criando Idioma Personalizado](#creating-custom-language)** - Adicione seu próprio idioma
2. **[Categorias de Mensagens](#message-categories)** - Entenda todos os tipos de mensagem
3. **[Caracteres Especiais](#special-characters)** - Lidar com apóstrofos e escape

### Para Uso Avançado
1. **[Guia de Layout GUI](#gui-layout)** - Sistema de posicionamento de slots
2. **[Ferramentas de Teste](#language-testing)** - Validar arquivos de idioma
3. **[Melhores Práticas](#best-practices)** - Dicas de personalização profissional

---

## Páginas Relacionadas
- [Início Rápido](../getting-started/quick-start.md) - Veja GUI em ação
- [Configuração Principal](config.md) - Configurações de idioma
- [Solução de Problemas](../support/troubleshooting.md#gui-issues) - Problemas relacionados a GUI
