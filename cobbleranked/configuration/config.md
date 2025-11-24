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
| [Battle Configuration](#battle-configuration) | Format timers, match announcements |

---

## Language

```json5
{
  "language": "en-Us"  // en-Us, ja-Jp, pt-Br, ru-Ru
}
```

---

## Cross-Server

Enable cross-server mode with MySQL/MongoDB and Redis.

**Note:** When `cross_server.enabled` is `false` (single-server mode), SQLite is automatically used as the database. You cannot configure the database type in single-server mode.

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "lobby1",
    "battle_server": "battle1",  // Empty = this IS battle server
    
    "database": {
      "type": "MYSQL",           // MYSQL or MONGODB
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

<details>
<summary><strong>Battle Clauses (Click to expand)</strong></summary>

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

</details>

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

## Battle Configuration

Battle settings including timers, announcements, and sounds.

```json5
{
  "battle": {
    // Format-specific battle time limits (in minutes)
    "format_timers": {
      "SINGLES": {
        "battle_time_limit_minutes": 15
      },
      "DOUBLES": {
        "battle_time_limit_minutes": 20
      },
      "TRIPLES": {
        "battle_time_limit_minutes": 25
      },
      "MULTI": {
        "battle_time_limit_minutes": 20
      }
    },

    // Match result announcements
    "announce_match_results": false,  // Broadcast results to all players

    // Battle sounds
    "sounds": {
      "enabled": true,
      "battle_start_sound": "cobbleranked:battle_start",
      "victory_sound": "cobbleranked:victory",
      "defeat_sound": "cobbleranked:defeat"
    }
  }
}
```

### Match Result Announcements

**`announce_match_results`** - Control match result visibility after battles

| Value | Behavior |
|-------|----------|
| `true` | Broadcast results to **all players** on the server |
| `false` | Show results **only to battle participants** (default) |

**Related Language Keys:**
- `match_result_broadcast` - Used when `true`
- `match_result_private` - Used when `false`

**See:** [Language Files](languages.md#match-result-messages-v107) for message customization

### Format-Specific Battle Timers

**`format_timers`** - Independent time limits per battle format (in minutes)

| Format | Default | Description |
|--------|---------|-------------|
| `SINGLES` | 15 | 1v1 battles |
| `DOUBLES` | 20 | 2v2 battles |
| `TRIPLES` | 25 | 3v3 battles |
| `MULTI` | 20 | 2v2 team battles |

**Timeout Behavior:**
1. Battle ends immediately
2. Player with most remaining Pokemon wins
3. Tie: Player with higher total HP wins
4. Still tied: Draw (no Elo change)

<details>
<summary><strong>Timer Customization Examples</strong></summary>

**Fast-paced singles:**
```json5
{
  "format_timers": {
    "SINGLES": {
      "battle_time_limit_minutes": 10
    }
  }
}
```

**Competitive doubles with extra time:**
```json5
{
  "format_timers": {
    "DOUBLES": {
      "battle_time_limit_minutes": 30
    }
  }
}
```

**Disable timers (not recommended):**
```json5
{
  "format_timers": {
    "SINGLES": {
      "battle_time_limit_minutes": 0  // No time limit
    }
  }
}
```

</details>

---

<details>
<summary><strong>Connection Pool (Advanced - cross-server only)</strong></summary>

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

</details>

---

## Reloading

After editing config:

```
/rankedadmin reload
```

Reloads all configuration files without server restart.

---

## See Also

- [FAQ & Troubleshooting](../support/faq.md) - Common issues and solutions
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Rewards](rewards.md) - Season and milestone rewards
- [Commands](../getting-started/commands.md) - Admin commands
