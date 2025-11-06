# Main Configuration

Complete reference for `config/cobbleranked/config.json5`.

---

## File Location

`config/cobbleranked/config.json5`

---

## Quick Reference

| Section | Purpose |
|---------|---------|
| [Language](#language) | Interface language |
| [Cross-Server](#cross-server) | MySQL + Redis settings |
| [Ranked Match](#ranked-match) | Battle mechanics |
| [Matchmaking](#matchmaking) | Dynamic Elo ranges |
| [Elo System](#elo-system) | Rating calculation |
| [Competitive](#competitive) | Flee penalties, season management |

---

## Language

```json5
{
  "language": "en-Us"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

---

## Cross-Server

Enable cross-server mode with MySQL and Redis.

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "lobby1",
    "battle_server": "battle1",  // Empty = this IS battle server
    
    "database": {
      "type": "MYSQL",           // MYSQL or SQLITE
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

**See:** [Cross-Server Setup](../advanced/cross-server.md)

---

## Ranked Match

Battle mechanics and team requirements.

```json5
{
  "ranked_match": {
    "reset_days": 30,            // Season length
    "levelMatch": 70,            // Force Pokemon level (0 = disabled)
    "turn_limit": 100,           // Max turns per battle
    
    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,        // Per player
      "max_team_size": 3
    }
  }
}
```

### Battle Clauses

```json5
{
  "battle_clauses": {
    "species_clause": true,      // No duplicate species
    "item_clause": false,        // Duplicate items allowed
    "evasion_clause": true,      // No evasion moves
    "ohko_clause": true,         // No OHKO moves
    "sleep_clause": true,        // Max 1 sleeping opponent
    "dynamax_clause": true,      // No Dynamax
    "terastal_clause": false     // Terastallization allowed
  }
}
```

---

## Matchmaking

Dynamic Elo range expansion.

```json5
{
  "matchmaking": {
    "enabled": true,
    "initial_range": 200,        // Starting ±Elo
    "expansion_delay": 30,       // Seconds before expanding
    "expansion_rate": 5,         // Seconds per +1 Elo
    "max_multiplier": 3.0,       // Max ±600 (200 × 3.0)
    "immediate_match_range": 100  // Instant match if ±100
  }
}
```

**See:** [Dynamic Matchmaking](../features/dynamic-matchmaking.md)

---

## Elo System

Rating calculation mode.

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",  // LEGACY, POKEMON_SHOWDOWN, GLICKO2
    
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,          // Minimum Elo
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64,
      
      "decay": {
        "enabled": true,
        "runAtUtcHour": 9,       // Daily decay check
        "slowDecayReduction": 2  // -2 Elo per day
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

**See:** [Elo System](../features/elo-system.md)

---

## Competitive

Flee penalties and season management.

```json5
{
  "competitive": {
    "syncLocalQueue": true,
    "preventDuplicatePenalty": true,
    "asyncSeasonManager": true,
    "pendingMatchTimeout": 5,    // Minutes
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
      "decay_rate": 1,           // Flee count reduction
      "decay_interval_hours": 24
    }
  }
}
```

**See:** [Disconnect Penalties](../features/disconnect-penalties.md)

---

## Connection Pool

MySQL connection pool settings (cross-server only).

```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,
    "minimum_idle": 5,
    "maximum_lifetime": 1800000,  // 30 minutes (ms)
    "connection_timeout": 5000     // 5 seconds (ms)
  }
}
```

**Recommendations:**
- 2-3 servers: `maximum_pool_size: 10`
- 4-6 servers: `maximum_pool_size: 15`
- 7+ servers: `maximum_pool_size: 20`

---

## Reloading

After editing config:

```
/rankedadmin reload
```

Reloads all configuration files without server restart.

---

## Troubleshooting

**Config not loading?**
- Check JSON5 syntax (commas, brackets)
- Look for errors in server console
- Verify file path: `config/cobbleranked/config.json5`

**Changes not applying?**
- Run `/rankedadmin reload`
- Restart server if reload fails

**Cross-server not working?**
- Verify MySQL connection
- Test Redis: `redis-cli PING`
- Check all servers use same database

---

**Related:** [Cross-Server Setup](../advanced/cross-server.md) · [Rewards](rewards.md) · [Commands](../getting-started/commands.md)
