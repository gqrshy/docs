# Sistema de Recompensas

---
**CobbleRanked** > **Configuração** > **Recompensas**
---

Configure recompensas de final de temporada e marcos para jogadores ranqueados.

---

## Localização do Arquivo

`config/cobbleranked/rewards.json5`

---

## Tipos de Recompensas

### Recompensas de Temporada
Dadas aos melhores jogadores quando a temporada termina baseado na posição no ranking.

### Recompensas de Marcos
Desbloqueiam automaticamente quando jogadores alcançam conquistas (vitórias, partidas, Elo).

---

## Recompensas de Temporada

```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Recompensa de Campeão",
        "item": "minecraft:diamond",
        "commands": [
          "give {player} minecraft:diamond 64",
          "eco give {player} 1000"
        ]
      }
    }
  }
}
```

### Campos

| Campo | Obrigatório | Descrição |
|-------|----------|-------------|
| `rank_range` | ✅ | Requisito de rank (`"1"`, `"2-3"`, `"4-10"`) |
| `display` | ✅ | Nome de exibição (suporta códigos de cor `&`) |
| `item` | ✅ | ID de item Minecraft |
| `commands` | ✅ | Comandos a executar quando reivindicado |
| `lore` | ❌ | Lore do item (array) |

**Marcador:** `{player}` = nome de usuário do jogador

---

## Recompensas de Marcos

```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "display": "&e⚡ Primeiras Vitórias",
        "item": "minecraft:gold_ingot",
        "commands": [
          "give {player} minecraft:gold_ingot 10"
        ]
      }
    }
  }
}
```

### Tipos de Marcos

| Tipo | Descrição | Exemplo |
|------|-------------|---------|
| `WINS` | Total de vitórias | 10, 25, 50, 100 |
| `MATCHES` | Total de partidas jogadas | 10, 50, 100 |
| `ELO` | Limite de rating Elo | 1200, 1500, 2000 |

---

## Exemplos Rápidos

### Recompensas Top 3 de Temporada
```json5
{
  "season_rewards": {
    "singles": {
      "rank_1": {
        "rank_range": "1",
        "display": "&6&l🏆 Campeão",
        "item": "minecraft:diamond",
        "commands": ["give {player} minecraft:diamond 64"]
      },
      "rank_2_3": {
        "rank_range": "2-3",
        "display": "&e&l⭐ Mestre",
        "item": "minecraft:gold_ingot",
        "commands": ["give {player} minecraft:gold_ingot 32"]
      }
    }
  }
}
```

### Marcos de Vitórias
```json5
{
  "milestone_rewards": {
    "singles": {
      "wins_10": {
        "type": "WINS",
        "requirement": 10,
        "commands": ["give {player} minecraft:gold_ingot 10"]
      },
      "wins_50": {
        "type": "WINS",
        "requirement": 50,
        "commands": ["give {player} minecraft:gold_block 5"]
      }
    }
  }
}
```

### Marcos de Elo
```json5
{
  "milestone_rewards": {
    "singles": {
      "elo_1200": {
        "type": "ELO",
        "requirement": 1200,
        "commands": ["give {player} minecraft:iron_ingot 32"]
      },
      "elo_1500": {
        "type": "ELO",
        "requirement": 1500,
        "commands": ["give {player} minecraft:diamond 3"]
      }
    }
  }
}
```

---

## Exemplos de Comandos

### Dar Itens
```json5
"commands": ["give {player} minecraft:diamond 64"]
```

### Economia (requer plugin de economia)
```json5
"commands": ["eco give {player} 1000"]
```

### Permissões (requer LuckPerms)
```json5
"commands": ["lp user {player} permission set ranked.legend true"]
```

### Múltiplos Comandos
```json5
"commands": [
  "give {player} minecraft:diamond 64",
  "eco give {player} 1000",
  "lp user {player} permission set ranked.legend true",
  "broadcast &6{player} &etornou-se uma Lenda!"
]
```

---

## Códigos de Cor

| Código | Cor | Código | Formato |
|------|-------|------|--------|
| `&0` | Preto | `&l` | Negrito |
| `&1` | Azul escuro | `&m` | Tachado |
| `&2` | Verde escuro | `&n` | Sublinhado |
| `&3` | Aqua escuro | `&o` | Itálico |
| `&4` | Vermelho escuro | `&r` | Resetar |
| `&5` | Roxo escuro |
| `&6` | Dourado |
| `&7` | Cinza |
| `&8` | Cinza escuro |
| `&9` | Azul |
| `&a` | Verde |
| `&b` | Aqua |
| `&c` | Vermelho |
| `&d` | Roxo claro |
| `&e` | Amarelo |
| `&f` | Branco |

---

## Recompensas Específicas de Formato

Cada formato tem recompensas independentes:

```json5
{
  "season_rewards": {
    "singles": { /* Recompensas de Singles */ },
    "doubles": { /* Recompensas de Doubles */ }
  }
}
```

Jogadores podem ganhar recompensas em **ambos** os formatos.

---

## Recarregar

Após editar `rewards.json5`:

```
/rankedadmin reload
```

---

## Solução de Problemas

**Recompensas não aparecendo?**
- Verifique sintaxe de `rank_range`
- Verifique temporada terminou: `/rankedadmin season info`
- Recarregue config: `/rankedadmin reload`

**Comandos não executando?**
- Teste comando manualmente primeiro
- Verifique ortografia do marcador `{player}`
- Verifique plugins necessários instalados

**Códigos de cor não funcionando?**
- Use `&` não `§`
- Verifique escape JSON

---

## Próximos Passos

### Para Configurar Recompensas
1. **[Gerenciamento de Temporada](../features/seasons.md)** - Entender rotação e tempo de temporada
2. **[Referência de Comandos](../getting-started/commands.md)** - Testar comandos de recompensa manualmente
3. **[Códigos de Cor](gui.md#color-codes-reference)** - Formatar nomes de exibição de recompensas

### Para Recompensas Avançadas
1. **[Integração de Economia](#economy-requires-economy-plugin)** - Dar recompensas de moeda
2. **[Recompensas de Permissão](#permissions-requires-luckperms)** - Conceder ranks aos melhores jogadores
3. **[Recompensas Específicas de Formato](#format-specific-rewards)** - Prêmios separados Singles/Doubles

### Para Solução de Problemas
1. **[Problemas de Recompensas](../support/troubleshooting.md#reward-issues)** - Problemas comuns
2. **[Seção FAQ Recompensas](../support/faq.md#rewards)** - Perguntas frequentes
3. **[Testando Recompensas](#reloading)** - Verificar configuração funciona

---

## Páginas Relacionadas
- [Gerenciamento de Temporada](../features/seasons.md) - Rotação e tempo de temporada
- [Personalização de GUI](gui.md) - Personalizar exibição de recompensa
- [Configuração Principal](config.md) - Configurações de duração de temporada
