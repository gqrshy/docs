# Main Configuration

Complete reference for `config/cobbleranked/config.json5`.

---

## File Location

`config/cobbleranked/config.json5`

---

## Quick Reference

| Section | Purpose |
|---------|---------|
| [Basic Settings](#basic-settings) | Language, blocked commands |
| [Cross-Server](#cross-server) | Multi-server setup with MySQL/MongoDB + Redis |
| [Ranked Match](#ranked-match) | Season settings, timeouts, music |
| [Battle](#battle) | Format rules, level matching, rewards, sounds |
| [Matchmaking](#matchmaking) | Dynamic Elo ranges, opponent avoidance |
| [Elo System](#elo-system) | Rating calculation modes |
| [Rank Tiers](#rank-tiers) | Tier definitions and rewards |
| [Competitive](#competitive) | Flee penalties, match timeout |
| [Music](#music) | Music system settings |
| [Debug](#debug) | Development logging |

---

## Basic Settings

```json5
{
  // Language for UI and messages
  "language": "en-Us",  // en-Us, ja-Jp, pt-Br, ru-Ru

  // Commands blocked during ranked battles
  "blockedCommands": ["tp", "warp", "spawn", "warps", "ranked", "home", "kit", "pc"]
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `language` | `"en-Us"` | Interface language |
| `blockedCommands` | `[...]` | Commands players cannot use during battles |

---

## Cross-Server

Enable cross-server mode with MySQL/MongoDB and Redis.

> 📝 **Note:** When `cross_server.enabled` is `false` (single-server mode), SQLite is automatically used. You only need to configure database settings for multi-server setups.

```json5
{
  "cross_server": {
    "enabled": false,
    "server_id": "server1",
    "battle_server": "",  // Empty = this IS the battle server
    "database_type": "mysql",  // "mysql" or "mongodb"

    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "root",
      "password": "",
      "connection_pool": {
        "maximum_pool_size": 50,
        "minimum_idle": 20,
        "maximum_lifetime": 1800000,
        "connection_timeout": 5000
      }
    },

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "",
      "auth_database": "admin",
      "use_srv": false,
      "connection_pool": {
        "max_pool_size": 10,
        "min_pool_size": 5,
        "max_idle_time_ms": 60000,
        "max_connection_lifetime_ms": 1800000,
        "connect_timeout_ms": 10000,
        "socket_timeout_ms": 5000
      }
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0,
      "use_ssl": false
    },

    "timing": {
      "match_found_delay": 5,
      "battle_start_delay": 10,
      "player_arrival_timeout": 30
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `enabled` | Enable cross-server mode |
| `server_id` | Unique identifier for this server |
| `battle_server` | Battle server ID (empty = this is battle server) |
| `database_type` | `"mysql"` or `"mongodb"` |

### Timing Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `match_found_delay` | `5` | Seconds delay after match found |
| `battle_start_delay` | `10` | Seconds delay before battle starts |
| `player_arrival_timeout` | `30` | Timeout for opponent to arrive at battle server |

**See:** [Cross-Server Setup](../advanced/cross-server.md)

---

## Ranked Match

Season settings, timeouts, and music configuration.

```json5
{
  "ranked_match": {
    // Season duration (0 = disabled)
    "reset_days": 30,

    // Initial Elo for new players (LEGACY mode only)
    "elo_initial": 500,

    // Cooldown between matches (seconds)
    "timerRanked": 5,

    // Selection timeouts (seconds)
    "teamSelectionTimeout": 60,
    "leadSelectionTimeout": 30,

    // Season announcements
    "season_announcement": {
      "enabled": true,
      "interval_minutes": 30,
      "show_remaining_days": true,
      "default_season_name": "",
      "announce_before_days": [7, 3, 1]
    },

    "season_check": {
      "enabled": true,
      "check_interval_minutes": 10
    },

    "season_reset": {
      "reset_elo": true,
      "reset_wins_losses": false
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `reset_days` | `30` | Days until automatic season reset (0 = disabled) |
| `elo_initial` | `500` | Starting Elo (LEGACY mode only) |
| `timerRanked` | `5` | Cooldown between matches (seconds) |
| `teamSelectionTimeout` | `60` | Team selection time limit (seconds) |
| `leadSelectionTimeout` | `30` | Lead selection time limit (seconds) |

### Season Announcement

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable season announcements |
| `interval_minutes` | `30` | Announcement interval |
| `show_remaining_days` | `true` | Show days remaining |
| `announce_before_days` | `[7, 3, 1]` | Announce at these remaining days |

### Season Reset Behavior

| Setting | Default | Description |
|---------|---------|-------------|
| `reset_elo` | `true` | Reset Elo on season end |
| `reset_wins_losses` | `false` | Reset win/loss records |

<details>
<summary><strong>Music Configuration</strong></summary>

### Queue Music

Randomly selected while waiting in queue:

```json5
{
  "queueMusic": [
    {"music": "cobbleranked:music.queue.bw_10", "volume": 0.5, "pitch": 1.0},
    {"music": "cobbleranked:music.queue.battle_factory_sinnoh", "volume": 0.5, "pitch": 1.0}
  ]
}
```

### Team Selection Music

```json5
{
  "teamSelectionMusic": [
    {"music": "cobbleranked:music.selection.team_selection_music", "volume": 1.0, "pitch": 1.0}
  ]
}
```

### Elo-Based Battle Music

Different music based on player Elo:

```json5
{
  "eloBattleMusic": [
    {
      "min_elo": 0.0,
      "max_elo": 1500.0,
      "musicList": [
        {"music": "cobbleranked:music.battle.normal.xy_trainer", "volume": 0.5, "pitch": 1.0}
      ]
    },
    {
      "min_elo": 1500.0,
      "max_elo": 99999.0,
      "musicList": [
        {"music": "cobbleranked:music.battle.high_elo.vgc_battle_music", "volume": 0.5, "pitch": 1.0}
      ]
    }
  ]
}
```

</details>

---

## Battle

Format-specific rules, level matching, rewards, and sounds.

```json5
{
  "battle": {
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

    // Force all Pokemon to this level (0 = use original levels)
    "levelMatch": 70,

    // Daily Elo gain limit (-1 = unlimited)
    "gainPontsLimited": 200,
    "daily_reset_timezone": "UTC",

    // Broadcast match results to all players
    "announce_match_results": false
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

### Format Default Values

| Format | Team Size | Turn Timeout | Match Duration |
|--------|-----------|--------------|----------------|
| `SINGLES` | 3 | 90s | 15 min |
| `DOUBLES` | 4 | 120s | 20 min |
| `TRIPLES` | 6 | 150s | 25 min |
| `MULTI` | 3 | 120s | 20 min |

### Other Battle Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `levelMatch` | `70` | Force Pokemon level (0 = disabled) |
| `gainPontsLimited` | `200` | Daily Elo gain limit (-1 = unlimited) |
| `daily_reset_timezone` | `"UTC"` | Timezone for daily reset |
| `announce_match_results` | `false` | Broadcast results to all players |

<details>
<summary><strong>Battle Rewards</strong></summary>

### Victory/Loss Rewards

```json5
{
  "battle": {
    "reward_victory": [
      {"item": "minecraft:diamond", "amount": 1}
    ],
    "reward_loss": [],
    "daily_reward_limit": -1  // -1 = unlimited, 0 = disabled
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `reward_victory` | `[]` | Items given on victory |
| `reward_loss` | `[]` | Items given on loss |
| `daily_reward_limit` | `-1` | Max rewards per day (-1 = unlimited) |

</details>

<details>
<summary><strong>Battle Sounds</strong></summary>

### Sound Configuration

```json5
{
  "battle": {
    "sounds": {
      "match_found": {"sound": "minecraft:entity.ender_dragon.ambient", "volume": 0.8, "pitch": 1.0},
      "ready_countdown": {"sound": "minecraft:entity.experience_orb.pickup", "volume": 0.7, "pitch": 0.7},
      "turn_timer_30_percent": {"sound": "minecraft:block.note_block.harp", "volume": 2.0, "pitch": 1.5},
      "turn_timer_20_percent": {"sound": "minecraft:block.note_block.pling", "volume": 3.0, "pitch": 2.0},
      "battle_time_60s": {"sound": "minecraft:block.note_block.bell", "volume": 2.0, "pitch": 1.0},
      "battle_time_30s": {"sound": "minecraft:block.anvil.land", "volume": 1.0, "pitch": 1.2},
      "battle_time_10s_start": {"sound": "minecraft:entity.ender_dragon.growl", "volume": 1.0, "pitch": 1.5},
      "battle_time_10s_tick": {"sound": "minecraft:block.note_block.pling", "volume": 3.0, "pitch": 2.0}
    }
  }
}
```

| Sound | Description |
|-------|-------------|
| `match_found` | Opponent found |
| `ready_countdown` | Ready countdown tick |
| `turn_timer_30_percent` | 30% turn time remaining |
| `turn_timer_20_percent` | 20% turn time remaining |
| `battle_time_60s` | 60 seconds remaining |
| `battle_time_30s` | 30 seconds remaining |
| `battle_time_10s_start` | 10 second countdown start |
| `battle_time_10s_tick` | 10 second countdown tick |

</details>

---

## Matchmaking

Format-specific dynamic Elo range expansion and opponent avoidance.

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

### Recent Opponent Avoidance

Prevents players from being matched with the same opponents repeatedly:

```json5
{
  "matchmaking": {
    "recent_opponent_avoidance": {
      "enabled": true,
      "avoid_count": 3,
      "expiration_seconds": 300,
      "relax_after_seconds": 120,
      "minimum_queue_size": 4
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable opponent avoidance |
| `avoid_count` | `3` | Number of recent opponents to avoid |
| `expiration_seconds` | `300` | Time before opponents are forgotten (5 min) |
| `relax_after_seconds` | `120` | Relax avoidance after this wait time |
| `minimum_queue_size` | `4` | Only apply if queue has this many players |

---

## Elo System

Rating calculation mode.

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN"  // LEGACY, POKEMON_SHOWDOWN, GLICKO2
  }
}
```

| Mode | Description | Use Case |
|------|-------------|----------|
| **`POKEMON_SHOWDOWN`** | K-factor based calculation | Recommended |
| `LEGACY` | Random Elo gain/loss within range | Simple/Casual |
| `GLICKO2` | Rating deviation based | Advanced |

<details>
<summary><strong>LEGACY Mode</strong></summary>

### LEGACY Mode

Random Elo gain/loss within configured ranges:

```json5
{
  "eloSystem": {
    "mode": "LEGACY",
    "legacy": {
      "initialElo": 500,
      "gainEloRange": "50,100",  // Win: gain 50-100 Elo
      "loseEloRange": "30,50"    // Loss: lose 30-50 Elo
    }
  }
}
```

</details>

<details>
<summary><strong>POKEMON_SHOWDOWN Mode (Recommended)</strong></summary>

### POKEMON_SHOWDOWN Mode

K-factor based calculation similar to Pokemon Showdown:

```json5
{
  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,
      "decay": {
        "enabled": false,
        "runAtUtcHour": 9,
        "inactiveDays": 14,
        "decayPerDay": 5,
        "minimumElo": 1000
      }
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialElo` | `1000` | Starting Elo for new players |
| `floorElo` | `1000` | Minimum Elo (cannot go below) |

### Decay Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable Elo decay for inactive players |
| `runAtUtcHour` | `9` | Hour (UTC) to run daily decay check |
| `inactiveDays` | `14` | Days of inactivity before decay starts |
| `decayPerDay` | `5` | Elo points lost per day after threshold |
| `minimumElo` | `1000` | Won't decay below this |

</details>

<details>
<summary><strong>GLICKO2 Mode</strong></summary>

### GLICKO2 Mode

Rating deviation based system for larger servers:

```json5
{
  "eloSystem": {
    "mode": "GLICKO2",
    "glicko2": {
      "initialRating": 1500.0,
      "initialRD": 350.0,
      "initialVolatility": 0.06,
      "systemConstant": 0.5,
      "rdDecayDays": 30
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialRating` | `1500.0` | Starting rating |
| `initialRD` | `350.0` | Initial rating deviation |
| `initialVolatility` | `0.06` | Initial volatility |
| `systemConstant` | `0.5` | System constant (tau) |
| `rdDecayDays` | `30` | Days before RD starts increasing |

</details>

**See:** [Elo System](../features/elo-system.md)

---

## Rank Tiers

Define rank tiers based on Elo ranges:

```json5
{
  "rankTiers": {
    "tiers": [
      {"key": "bronze", "display_name": "&6Bronze", "min_elo": 0.0, "max_elo": 499.9, "color_code": "&6", "items": [], "commands": [], "permissions": []},
      {"key": "silver", "display_name": "&7Silver", "min_elo": 500.0, "max_elo": 999.9, "color_code": "&7", "items": [], "commands": [], "permissions": []},
      {"key": "gold", "display_name": "&eGold", "min_elo": 1000.0, "max_elo": 1499.9, "color_code": "&e", "items": [], "commands": [], "permissions": []},
      {"key": "platinum", "display_name": "&bPlatinum", "min_elo": 1500.0, "max_elo": 1999.9, "color_code": "&b", "items": [], "commands": [], "permissions": []},
      {"key": "diamond", "display_name": "&3Diamond", "min_elo": 2000.0, "max_elo": 2499.9, "color_code": "&3", "items": [], "commands": [], "permissions": []},
      {"key": "master", "display_name": "&5Master", "min_elo": 2500.0, "max_elo": 999999.9, "color_code": "&5", "items": [], "commands": [], "permissions": []}
    ],
    "validation": {
      "check_overlaps": true,
      "check_gaps": true,
      "allow_boundary_tolerance": 0.5,
      "require_sorted": true,
      "fail_on_error": true
    }
  }
}
```

### Tier Properties

| Property | Description |
|----------|-------------|
| `key` | Unique identifier |
| `display_name` | Display name with color codes |
| `min_elo` | Minimum Elo for this tier |
| `max_elo` | Maximum Elo for this tier |
| `color_code` | Minecraft color code |
| `items` | Items given on reaching tier |
| `commands` | Commands executed on reaching tier |
| `permissions` | Permissions granted at this tier |

### Default Tiers

| Tier | Elo Range | Color |
|------|-----------|-------|
| Bronze | 0 - 499 | &6 (Gold) |
| Silver | 500 - 999 | &7 (Gray) |
| Gold | 1000 - 1499 | &e (Yellow) |
| Platinum | 1500 - 1999 | &b (Aqua) |
| Diamond | 2000 - 2499 | &3 (Dark Aqua) |
| Master | 2500+ | &5 (Purple) |

---

## Competitive

Flee penalties and match timeout settings.

```json5
{
  "competitive": {
    "pendingMatchTimeout": 5,

    "flee_penalty": {
      "tiers": [
        {"flee_min": 1, "flee_max": 5, "penalty_minutes": 5},
        {"flee_min": 6, "flee_max": 10, "penalty_minutes": 15},
        {"flee_min": 11, "flee_max": 999, "penalty_minutes": 30}
      ]
    },

    "flee_decay": {
      "enabled": true,
      "decay_rate": 1,
      "decay_interval_hours": 24
    }
  }
}
```

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `pendingMatchTimeout` | `5` | Timeout for pending matches (minutes) |

### Flee Penalty Tiers

| Flee Count | Penalty |
|------------|---------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

### Flee Decay

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable flee count decay |
| `decay_rate` | `1` | Flee count reduction per interval |
| `decay_interval_hours` | `24` | Hours between decay |

**See:** [Disconnect Penalties](../features/disconnect-penalties.md)

---

## Music

Music system settings.

```json5
{
  "music": {
    "enabled": true,
    "require_client_mod": false
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable music system |
| `require_client_mod` | `false` | Require client-side mod for music |

---

## GUI Sounds

```json5
{
  "gui_sounds": {
    "enabled": true
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `true` | Enable GUI sound effects |

---

## Debug

Development logging options (for troubleshooting only).

```json5
{
  "debug": {
    "enabled": false,
    "log_battle_events": false,
    "log_matchmaking": false,
    "log_level_restore": false,
    "log_gui_interactions": false,
    "log_music_events": false
  }
}
```

| Setting | Description |
|---------|-------------|
| `enabled` | Enable debug mode |
| `log_battle_events` | Log battle events |
| `log_matchmaking` | Log matchmaking process |
| `log_level_restore` | Log Pokemon level restoration |
| `log_gui_interactions` | Log GUI interactions |
| `log_music_events` | Log music events |

> ⚠️ **Warning:** Debug mode generates verbose logs. Only enable when troubleshooting issues.

---

## Reloading

After editing config:

```text
/rankedadmin reload
```

Reloads all configuration files without server restart.

---

## See Also

- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [Elo System](../features/elo-system.md) - Rating system details
- [Rewards](rewards.md) - Season and milestone rewards
- [Commands](../getting-started/commands.md) - Admin commands
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
