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
  "language": "en-Us"  // en-Us, ja-Jp, fr-Fr
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

Format-specific dynamic Elo range expansion.

```json5
{
  "matchmaking": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "initialRange": 200,
        "expansionDelay": 30,
        "expansionRate": 5,
        "maxMultiplier": 3.0,
        "immediateMatchRange": 100
      },
      "DOUBLES": {
        "enabled": true,
        "initialRange": 200,
        "expansionDelay": 30,
        "expansionRate": 5,
        "maxMultiplier": 3.0,
        "immediateMatchRange": 100
      },
      "TRIPLES": {
        "enabled": true,
        "initialRange": 250,
        "expansionDelay": 25,
        "expansionRate": 8,
        "maxMultiplier": 4.0,
        "immediateMatchRange": 150
      },
      "MULTI": {
        "enabled": true,
        "initialRange": 300,
        "expansionDelay": 20,
        "expansionRate": 10,
        "maxMultiplier": 5.0,
        "immediateMatchRange": 200
      }
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `enabled` | Enable matchmaking for this format |
| `initialRange` | Starting Elo range (±X from player's rating) |
| `expansionDelay` | Seconds before range starts expanding |
| `expansionRate` | Elo range increase per second after delay |
| `maxMultiplier` | Maximum expansion (X × initialRange) |
| `immediateMatchRange` | Instant match if within this range |

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

Format-specific battle rules, timers, and settings.

```json5
{
  "battle": {
    // Format-specific rules
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "team_size": 3,
        "turn_timeout_seconds": 90,
        "match_duration_minutes": 15
      },
      "DOUBLES": {
        "enabled": true,
        "team_size": 4,
        "turn_timeout_seconds": 120,
        "match_duration_minutes": 20
      },
      "TRIPLES": {
        "enabled": true,
        "team_size": 6,
        "turn_timeout_seconds": 150,
        "match_duration_minutes": 25
      },
      "MULTI": {
        "enabled": true,
        "team_size": 3,
        "turn_timeout_seconds": 120,
        "match_duration_minutes": 20
      }
    },

    // Force Pokemon level (0 = use original levels)
    "levelMatch": 70,

    // Match result announcements
    "announce_match_results": false,

    // Battle sounds
    "sounds": {
      "match_found": {"sound": "minecraft:entity.ender_dragon.ambient", "volume": 0.8, "pitch": 1.0},
      "turn_timer_30_percent": {"sound": "minecraft:block.note_block.harp", "volume": 2.0, "pitch": 1.5}
    }
  }
}
```

### Format Rules

| Setting | Description |
|---------|-------------|
| `enabled` | Enable this battle format |
| `team_size` | Number of Pokemon players select |
| `turn_timeout_seconds` | Time limit per turn |
| `match_duration_minutes` | Maximum match duration |

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

### Sound Configuration

Battle and GUI sounds can be customized via the `sounds.json5` file.

**File:** `config/cobbleranked/sounds.json5` (auto-generated on first run)

```json5
{
  "enabled": true,

  "battle": {
    "battle_start": "cobbleranked:battle_start",
    "victory": "cobbleranked:victory",
    "defeat": "cobbleranked:defeat",
    "turn_start": "minecraft:block.note_block.pling"
  },

  "gui": {
    "button_click": "minecraft:ui.button.click",
    "queue_join": "minecraft:entity.experience_orb.pickup",
    "queue_leave": "minecraft:block.note_block.bass",
    "match_found": "minecraft:entity.player.levelup"
  },

  "notifications": {
    "mission_complete": "minecraft:entity.player.levelup",
    "reward_claim": "minecraft:entity.item.pickup"
  }
}
```

| Category | Sound | Description |
|----------|-------|-------------|
| `battle.battle_start` | Battle begins | Plays when match starts |
| `battle.victory` | Player wins | Plays on victory |
| `battle.defeat` | Player loses | Plays on defeat |
| `gui.button_click` | GUI interaction | Plays on button clicks |
| `gui.match_found` | Opponent found | Plays when matched |
| `notifications.mission_complete` | Mission done | Plays on mission completion |

**Sound IDs:**
- Use Minecraft sound IDs (e.g., `minecraft:entity.player.levelup`)
- Use custom resource pack sounds (e.g., `cobbleranked:custom_sound`)
- Set to empty string `""` to disable a specific sound

### Format Default Values

| Format | Team Size | Turn Timeout | Match Duration |
|--------|-----------|--------------|----------------|
| `SINGLES` | 3 | 90s | 15 min |
| `DOUBLES` | 4 | 120s | 20 min |
| `TRIPLES` | 6 | 150s | 25 min |
| `MULTI` | 3 | 120s | 20 min |

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
  "battle": {
    "format_rules": {
      "SINGLES": {
        "enabled": true,
        "team_size": 3,
        "turn_timeout_seconds": 60,
        "match_duration_minutes": 10
      }
    }
  }
}
```

**Competitive doubles with extra time:**
```json5
{
  "battle": {
    "format_rules": {
      "DOUBLES": {
        "enabled": true,
        "team_size": 4,
        "turn_timeout_seconds": 180,
        "match_duration_minutes": 30
      }
    }
  }
}
```

**Disable a format:**
```json5
{
  "battle": {
    "format_rules": {
      "TRIPLES": {
        "enabled": false
      }
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

- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Rewards](rewards.md) - Season and milestone rewards
- [Commands](../getting-started/commands.md) - Admin commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
