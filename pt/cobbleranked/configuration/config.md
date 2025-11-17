# Configuração Principal

---
**CobbleRanked** > **Configuração** > **Configuração Principal**
---

Referência completa para `config/cobbleranked/config.json5`.

---

## Localização do Arquivo

`config/cobbleranked/config.json5`

---

## Referência Rápida

| Seção | Propósito |
|---------|---------|
| [Idioma](#idioma) | Idioma da interface |
| [Cross-Server](#cross-server) | Configurações MySQL + Redis |
| [Partida Ranqueada](#partida-ranqueada) | Mecânicas de batalha |
| [Matchmaking](#matchmaking) | Faixas dinâmicas de Elo |
| [Sistema Elo](#sistema-elo) | Cálculo de rating |
| [Competitivo](#competitivo) | Penalidades de fuga, gerenciamento de temporada |

---

## Idioma

```json5
{
  "language": "pt-Br"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

---

## Cross-Server

Habilita modo cross-server com MySQL e Redis.

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "lobby1",
    "battle_server": "battle1",  // Vazio = este É o servidor de batalha

    "database": {
      "type": "MYSQL",           // MYSQL ou SQLITE
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "root",
      "password": ""
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0              // 0-15
    }
  }
}
```

**Veja:** [Configuração Cross-Server](../advanced/cross-server.md)

---

## Partida Ranqueada

Mecânicas de batalha e requisitos de equipe.

```json5
{
  "ranked_match": {
    "reset_days": 30,            // Duração da temporada
    "levelMatch": 70,            // Forçar nível do Pokémon (0 = desabilitado)
    "turn_limit": 100,           // Máximo de turnos por batalha

    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,        // Por jogador
      "max_team_size": 3
    }
  }
}
```

### Cláusulas de Batalha

```json5
{
  "battle_clauses": {
    "species_clause": true,      // Sem espécies duplicadas
    "item_clause": false,        // Itens duplicados permitidos
    "evasion_clause": true,      // Sem movimentos de evasão
    "ohko_clause": true,         // Sem movimentos OHKO
    "sleep_clause": true,        // Máx 1 oponente dormindo
    "dynamax_clause": true,      // Sem Dynamax
    "terastal_clause": false     // Terastalização permitida
  }
}
```

---

## Matchmaking

Expansão dinâmica da faixa de Elo.

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,        // ±Elo inicial
    "expansion_delay": 30,       // Segundos antes de expandir
    "expansion_rate": 5,         // Segundos por +1 Elo
    "max_multiplier": 3.0,       // Máx ±600 (200 × 3.0)
    "immediate_match_range": 100  // Partida instantânea se ±100
  }
}
```

**Veja:** [Matchmaking Dinâmico](../features/dynamic-matchmaking.md)

---

## Sistema Elo

Modo de cálculo de rating.

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",  // LEGACY, POKEMON_SHOWDOWN, GLICKO2

    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,          // Elo mínimo
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64,

      "decay": {
        "enabled": true,
        "runAtUtcHour": 9,       // Verificação diária de decaimento
        "slowDecayReduction": 2  // -2 Elo por dia
      }
    },

    "glicko2": {
      "initialRating": 1500.0,
      "initialRD": 350.0,
      "initialVolatility": 0.06,
      "tau": 0.5,
      "rdDecayDays": 30
    }
  }
}
```

**Veja:** [Sistema Elo](../features/elo-system.md)

---

## Competitivo

Penalidades de fuga e gerenciamento de temporada.

```json5
{
  "competitive": {
    "syncLocalQueue": true,
    "preventDuplicatePenalty": true,
    "asyncSeasonManager": true,
    "pendingMatchTimeout": 5,    // Minutos
    "cleanupResources": true,

    "flee_penalty": {
      "tiers": [
        { "flee_min": 1, "flee_max": 5, "penalty_minutes": 5 },
        { "flee_min": 6, "flee_max": 10, "penalty_minutes": 15 },
        { "flee_min": 11, "flee_max": 999, "penalty_minutes": 30 }
      ]
    },

    "flee_decay": {
      "enabled": true,
      "decay_rate": 1,           // Redução da contagem de fugas
      "decay_interval_hours": 24
    }
  }
}
```

**Veja:** [Penalidades de Desconexão](../features/disconnect-penalties.md)

---

## Pool de Conexões

Configurações do pool de conexões MySQL (somente cross-server).

```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,
    "minimum_idle": 5,
    "maximum_lifetime": 1800000,  // 30 minutos (ms)
    "connection_timeout": 5000     // 5 segundos (ms)
  }
}
```

**Recomendações:**
- 2-3 servidores: `maximum_pool_size: 10`
- 4-6 servidores: `maximum_pool_size: 15`
- 7+ servidores: `maximum_pool_size: 20`

---

## Recarregar

Após editar a configuração:

```
/rankedadmin reload
```

Recarrega todos os arquivos de configuração sem reiniciar o servidor.

---

## Próximos Passos

### Para Ajuste Fino
1. **[Detalhes do Sistema Elo](../features/elo-system.md)** - Mergulho profundo nos cálculos de rating
2. **[Guia de Matchmaking](../features/elo-system.md#dynamic-matchmaking)** - Otimizar tempos de fila
3. **[Gerenciamento de Temporada](../features/seasons.md)** - Configurar períodos competitivos

### Para Configuração Competitiva
1. **[Configuração de Blacklist](blacklist.md)** - Aplicar restrições Smogon/VGC
2. **[Cláusulas de Batalha](../features/ranked-battles.md#battle-clauses)** - Habilitar regras competitivas
3. **[Sistema de Recompensas](rewards.md)** - Configurar prêmios

### Para Escalabilidade
1. **[Configuração Cross-Server](../advanced/cross-server.md)** - Configuração multi-servidor
2. **[Otimização de Banco de Dados](../advanced/database.md)** - Configuração MySQL/MongoDB
3. **[Pool de Conexões](../advanced/database.md#connection-pool)** - Ajuste de desempenho

---

## Páginas Relacionadas
- [Configuração de Blacklist](blacklist.md) - Restrições de Pokémon/movimentos
- [Configuração de Recompensas](rewards.md) - Recompensas de temporada e marcos
- [Referência de Comandos](../getting-started/commands.md) - Comandos de administrador
