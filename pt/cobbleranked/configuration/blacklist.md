# Blacklist e Restrições

---
**CobbleRanked** > **Configuração** > **Blacklist**
---

Configure restrições de Pokémon, movimentos, habilidades, itens e controle ações dos jogadores durante partidas ranqueadas.

**Arquivo de Config:** `config/cobbleranked/blacklist.json5`

---

## Início Rápido

### Exemplo Mínimo

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

**Recarregar:** `/rankedadmin reload`

**Efeito:** Bane todos os lendários/míticos + movimentos OHKO

---

## Restrições de Pokémon

### Banir por Etiqueta (Recomendado)

Forma mais eficiente de banir múltiplos Pokémon:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted"]
}
```

**Etiquetas Disponíveis:**

| Etiqueta | Quantidade | Exemplos |
|-------|-------|----------|
| `legendary` | ~60 | Mewtwo, Lugia, Rayquaza, Dialga |
| `mythical` | ~20 | Mew, Celebi, Jirachi, Victini |
| `restricted` | ~40 | Lendários de caixa (restritos VGC) |
| `ultra_beast` | 11 | Nihilego, Buzzwole, Xurkitree |
| `paradox` | 16 | Iron Treads, Great Tusk, Flutter Mane |
| `starter` | ~30 | Linha Bulbasaur, linha Charmander, etc. |
| `fossil` | ~15 | Omanyte, Kabuto, Aerodactyl |
| `baby` | ~20 | Pichu, Cleffa, Igglybuff |
| `powerhouse` | ~12 | Pokémon 600 BST (Dragonite, Garchomp) |
| `gen1` - `gen9` | Varia | Filtrar por geração |

> **[📸 INSERIR: Screenshot mostrando erro de validação ao tentar usar lendário banido]**

### Limites de Quantidade

Permite quantidades limitadas ao invés de banimentos completos:

```json5
{
  "restricted_label_limits": {
    "legendary": 1,      // Máx 1 lendário por equipe
    "restricted": 2,     // Máx 2 restritos (formato VGC)
    "powerhouse": 3      // Máx 3 pseudo-lendários
  }
}
```

**Exemplo:** Formato VGC Série 1 (2 Pokémon restritos permitidos)

### Banir Pokémon Específicos

```json5
{
  "black_list_pokemon": [
    "mewtwo",            // Todas as formas banidas
    "rayquaza:mega",     // Apenas Mega Rayquaza
    "charizard:mega_x",  // Apenas Mega Charizard X
    "weezing:galar"      // Apenas Weezing de Galar
  ]
}
```

**Sintaxe de Formas:**
- Sem forma (`mewtwo`) = **Todas as formas** banidas
- Com forma (`mewtwo:mega_x`) = **Apenas essa forma** banida

**Formas Comuns:**
- Mega: `:mega`, `:mega_x`, `:mega_y`
- Regional: `:alola`, `:galar`, `:hisui`
- Outras: `:primal`, `:origin`, `:10` (Zygarde 10%)

---

## Restrições de Movimentos

### Banir Movimentos

```json5
{
  "black_list_moves": [
    // Movimentos OHKO
    "fissure",
    "sheer_cold",
    "horn_drill",
    "guillotine",

    // Banimentos Smogon
    "baton_pass",        // Passagem de Speed Boost
    "last_respects",     // Movimento OP da Gen 9
    "shed_tail"          // Movimento OP da Gen 9
  ]
}
```

> **[📸 IMAGEM NECESSÁRIA: Mensagem de erro ao usar movimento proibido (Fissure, Baton Pass, etc.)]**

**Nomes de Movimentos:** snake_case em minúsculas (espaços → underscores)

<details>
<summary><strong>Referência de Movimentos Banidos Comuns</strong></summary>

| Nome de Exibição | Nome Interno | Razão |
|--------------|---------------|--------|
| Fissure | `fissure` | OHKO |
| Sheer Cold | `sheer_cold` | OHKO |
| Horn Drill | `horn_drill` | OHKO |
| Guillotine | `guillotine` | OHKO |
| Baton Pass | `baton_pass` | Banimento Smogon OU |
| Last Respects | `last_respects` | Banimento Smogon Gen 9 |
| Shed Tail | `shed_tail` | Banimento Smogon Gen 9 |
| Double Team | `double_team` | Evasão (se evasion_clause: false) |
| Minimize | `minimize` | Evasão (se evasion_clause: false) |

</details>

---

## Restrições de Habilidades

### Banir Habilidades

```json5
{
  "black_list_ability": [
    "moody",             // Aumento aleatório de stats (banimento Smogon)
    "shadow_tag",        // Previne troca (banimento Smogon)
    "arena_trap"         // Prende Pokémon terrestres (banimento Smogon)
  ]
}
```

**Nomes de Habilidades:** snake_case em minúsculas

<details>
<summary><strong>Habilidades Comumente Banidas</strong></summary>

| Nome de Exibição | Nome Interno | Razão |
|--------------|---------------|--------|
| Moody | `moody` | Smogon OU (stats +2/-1 aleatórios) |
| Shadow Tag | `shadow_tag` | Smogon OU (prender) |
| Arena Trap | `arena_trap` | Smogon OU (prender) |
| Power Construct | `power_construct` | Transformação Zygarde |
| Huge Power | `huge_power` | Duplica Ataque (escolha de balanço) |
| Wonder Guard | `wonder_guard` | Apenas golpes super efetivos |

</details>

**Encontrar Nomes de Habilidades:**
1. Pressione `F3 + H` no jogo
2. Abra o sumário do Pokémon
3. Passe o mouse sobre o ícone da habilidade
4. Nome interno mostrado na dica de ferramenta

---

## Restrições de Itens

### Banir Itens Segurados

```json5
{
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",    // +10% evasão
    "cobblemon:lax_incense",      // +10% evasão
    "cobblemon:quick_claw",       // 20% prioridade
    "cobblemon:soul_dew"          // Aumento Latios/Latias
  ]
}
```

**Formato de Item:** `cobblemon:item_name` (obrigatório!)

**Encontrar IDs de Itens:**
1. Pressione `F3 + H`
2. Passe o mouse sobre o item no inventário
3. ID aparece na parte inferior da dica

> **[📸 INSERIR: Screenshot mostrando dica F3+H com ID do item]**

<details>
<summary><strong>Itens Comumente Banidos</strong></summary>

| Item | ID | Razão |
|------|-----|--------|
| Bright Powder | `cobblemon:bright_powder` | Aumento de evasão |
| Lax Incense | `cobblemon:lax_incense` | Aumento de evasão |
| Quick Claw | `cobblemon:quick_claw` | Prioridade RNG |
| Soul Dew | `cobblemon:soul_dew` | Aumento específico Lati@s |
| King's Rock | `cobblemon:kings_rock` | Chance de flinch |

</details>

---

## Configurações Pré-definidas

### Smogon OU

Formato competitivo padrão:

```json5
{
  "black_list_labels": ["legendary", "mythical", "restricted", "ultra_beast", "paradox"],
  "black_list_moves": [
    "baton_pass", "last_respects", "shed_tail",
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ],
  "black_list_ability": ["moody", "shadow_tag", "arena_trap"],
  "black_list_items_pokemon": [
    "cobblemon:bright_powder",
    "cobblemon:lax_incense"
  ]
}
```

**Também defina:** `levelMatch: 50` em `config.json5`

### VGC Série 1

Formato VGC oficial:

```json5
{
  "restricted_label_limits": {
    "restricted": 2  // Máx 2 Pokémon restritos
  },
  "black_list_labels": ["mythical"],  // Míticos não permitidos
  "black_list_moves": [
    "fissure", "sheer_cold", "horn_drill", "guillotine"
  ]
}
```

**Também defina:** `item_clause: true` + `levelMatch: 50`

### Casual (Banimentos Mínimos)

Apenas banir movimentos injustos:

```json5
{
  "black_list_labels": [],
  "black_list_moves": ["fissure", "sheer_cold", "horn_drill", "guillotine"]
}
```

---

## Exemplos Avançados

### Misturar Limites + Banimentos

Permitir 1 lendário, mas banir específicos:

```json5
{
  "restricted_label_limits": {
    "legendary": 1       // Máx 1 lendário
  },
  "black_list_pokemon": [
    "mewtwo",            // Exceção: Mewtwo sempre banido
    "rayquaza"           // Exceção: Rayquaza sempre banido
  ]
}
```

**Resultado:** Pode usar 1 lendário (Lugia, Dialga, etc.) mas NÃO Mewtwo ou Rayquaza

### Filtro de Geração

Banir apenas Pokémon Gen 9:

```json5
{
  "black_list_labels": ["gen9", "paradox"]
}
```

### Suporte Monotipo

Nenhuma configuração adicional necessária - jogadores gerenciam equipes manualmente

Blacklist recomendada:

```json5
{
  "black_list_labels": ["legendary", "mythical"],
  "black_list_moves": ["baton_pass"]
}
```

---

## Fluxo de Validação

Quando jogador entra na fila:

```
1. Verificar blacklist de etiquetas
   ❌ "Pokémon Banido: Mewtwo (legendary)"

2. Verificar blacklist de nome/forma
   ❌ "Pokémon Banido: Mewtwo"

3. Verificar limites de etiquetas
   ❌ "Muitos legendary: 2/1"

4. Verificar movimentos
   ❌ "Movimento banido: Fissure"

5. Verificar habilidades
   ❌ "Habilidade banida: Moody"

6. Verificar itens segurados
   ❌ "Item banido: cobblemon:bright_powder"

✅ Todos passam → Entrar na fila
```

> **[📸 INSERIR: Screenshot de mensagem de erro de validação]**

---

## Solução de Problemas

### Config Não Aplicando
- Execute `/rankedadmin reload`
- Verifique sintaxe JSON5 (vírgulas faltando, colchetes)

### Itens Não Banidos
- Use formato `cobblemon:item_name` (não nome de exibição)
- Verifique com `F3 + H`

### Pokémon Ainda Permitido
- Verifique ortografia (case-insensitive mas erros de digitação importam)
- Verifique se a etiqueta existe para esse Pokémon
- Verifique sintaxe de forma (`:mega` vs `:mega_x`)

### Mais Ajuda
- [FAQ - Seção Blacklist](../support/faq.md#blacklist-configuration)
- [Discord](https://discord.gg/VVVvBTqqyP) #feedback

---

---

## Restrições de Jogadores

Controle o que jogadores podem fazer durante diferentes fases de partida ranqueada.

**Arquivo de Config:** `config/cobbleranked/restrictions.json5`

### Estrutura de Configuração

```json5
{
  "queue_phase": { /* Esperando por partida */ },
  "preparation_phase": { /* Seleção de equipe, contagem regressiva */ },
  "battle_phase": { /* Batalha ativa */ }
}
```

Cada fase usa as mesmas categorias de restrição abaixo.

### Restrições Disponíveis

#### Uso de Itens

```json5
"item_usage": {
  "allow_ender_pearl": false,           // Teletransporte com pérola do end
  "allow_chorus_fruit": false,          // Teletransporte com fruta chorus
  "allow_item_use": true,               // Uso geral de itens
  "allow_item_drop": true,              // Dropar itens
  "allow_item_pickup": true,            // Pegar itens
  "allow_consume_items": true,          // Comer/beber
  "allow_throw_items": true             // Bolas de neve, ovos, poções
}
```

#### Interações com Blocos

```json5
"block_interactions": {
  "allow_break_blocks": false,          // Quebrar blocos
  "allow_place_blocks": false,          // Colocar blocos
  "allow_interact_blocks": true,        // Botões, alavancas, portas
  "allow_open_containers": true,        // Baús, barris
  "allow_use_doors": true,              // Portas, alçapões, portões
  "allow_use_buttons": true,            // Botões, alavancas
  "allow_use_redstone": true            // Componentes redstone
}
```

#### Interações com Entidades

```json5
"entity_interactions": {
  "allow_damage_entities": false,       // Atacar mobs/jogadores
  "allow_interact_entities": true,      // Clicar com botão direito em entidades
  "allow_mount_entities": true,         // Montar cavalos, barcos
  "allow_feed_pokemon": true,           // Alimentar Pokémon
  "allow_heal_pokemon": true,           // Curar Pokémon
  "allow_trading": false,               // Negociação com aldeões
  "allow_breeding": false               // Reprodução de animais
}
```

#### Combate

```json5
"combat": {
  "allow_pvp": false,                   // Jogador vs Jogador
  "allow_pve": false,                   // Jogador vs Entidade (mobs)
  "allow_projectiles": false,           // Arcos, bestas, tridentes
  "allow_explosion_damage": true,       // Receber dano de explosão
  "allow_fall_damage": true             // Receber dano de queda
}
```

#### Movimento

```json5
"movement": {
  "allow_teleport_commands": false,     // /tp, /warp, /home, etc.
  "allow_portals": true,                // Portais Nether/End
  "allow_respawn": true,                // Renascer após morte
  "allow_flight": true,                 // Voo criativo/elytra
  "allow_swimming": true,               // Nadar
  "allow_riding": true                  // Montar entidades
}
```

#### Ações do Sistema

```json5
"system_actions": {
  "allow_pc_access": false,             // Abrir PC do Pokémon
  "allow_commands": false,              // Executar comandos
  "allow_chat": true,                   // Enviar mensagens no chat
  "allow_disconnect": true,             // Desconectar do servidor
  "blocked_commands": [                 // Comandos bloqueados específicos
    "tp", "warp", "home", "spawn"
  ]
}
```

#### Inventário

```json5
"inventory": {
  "allow_ender_chest": false,           // Acesso ao baú do end
  "allow_inventory_click": true,        // Clicar em slots do inventário
  "allow_inventory_drop": true,         // Dropar do inventário
  "allow_crafting": false,              // Craftar itens
  "allow_shulker_boxes": false,         // Acesso a shulker box
  "allow_armor_change": true,           // Trocar armadura
  "allow_offhand_swap": true            // Trocar mão secundária
}
```

### Comportamento Padrão

**Fase de Fila:**
- Gameplay normal permitido
- Comandos de teletransporte bloqueados
- Acesso ao PC bloqueado

**Fase de Preparação:**
- Movimento permitido
- Combate bloqueado
- Interações com blocos bloqueadas

**Fase de Batalha:**
- Apenas UI de batalha permitida
- Todas as outras ações bloqueadas

### Exemplos Comuns de Restrições

#### Permitir Teletransporte Durante Fila

```json5
"queue_phase": {
  "movement": {
    "allow_teleport_commands": true
  }
}
```

#### Permitir Acesso ao PC em Batalha

```json5
"battle_phase": {
  "system_actions": {
    "allow_pc_access": true
  }
}
```

#### Bloquear Comandos Específicos

```json5
"queue_phase": {
  "system_actions": {
    "allow_commands": false,
    "blocked_commands": ["tp", "warp", "home", "spawn", "tpa"]
  }
}
```

---

## Próximos Passos

### Para Formatos Competitivos
1. **[Formato Smogon OU](../features/ranked-battles.md)** - Aplicar regras competitivas padrão
2. **[Formato VGC](../features/ranked-battles.md)** - Configurar regras de torneio oficial
3. **[Formatos Personalizados](#pre-made-configurations)** - Usar presets fornecidos

### Para Restrições Avançadas
1. **[Limites de Etiquetas](#quantity-limits)** - Permitir lendários limitados (estilo VGC)
2. **[Banimentos Específicos de Forma](#ban-specific-pokemon)** - Banir apenas formas Mega/Regional
3. **[Restrições de Jogadores](blacklist.md#player-restrictions)** - Controlar ações durante batalhas

### Para Testes
1. **[Validação de Início Rápido](../getting-started/quick-start.md#step-2-configure-pokemon-restrictions)** - Testar sua blacklist
2. **[Solução de Problemas](../support/faq.md#blacklist-configuration)** - Problemas comuns de blacklist
3. **[Fluxo de Batalha](../features/ranked-battles.md#pre-battle-validation)** - Entender validação

---

## Páginas Relacionadas
- [Configuração Principal](config.md) - Cláusulas de batalha e configurações de Elo
- [Formatos de Batalha](../features/ranked-battles.md) - Regras específicas de formato
- [Referência de Comandos](../getting-started/commands.md) - Comandos de reload de administrador
