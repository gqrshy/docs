# Main Configuration

Complete reference for `config/cobbleranked/config.json5`.

## File Location

`config/cobbleranked/config.json5`

## Overview

The main configuration file controls:
- Cross-server settings (MySQL, Redis)
- Battle mechanics (level caps, turn limits)
- Matchmaking (Elo ranges, wait times)
- Season management (rotation, duration)
- Elo calculation system

## Configuration Sections

### Language Settings

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  LANGUAGE SETTINGS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "language": "en-Us"  // Options: en-Us, ja-Jp, pt-Br, ru-Ru
}
```

**Available Languages:**
- `en-Us` - English (United States)
- `ja-Jp` - Japanese (Japan)
- `pt-Br` - Portuguese (Brazil)
- `ru-Ru` - Russian (Russia)

**How it works:**
- Controls which `language/*.json5` file is loaded
- Controls which `gui/gui-*.json5` file is used
- All messages, GUI items, and lore use this language

---

### Cross-Server Configuration

Enable cross-server ranked battles with MySQL and Redis.

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  CROSS-SERVER CONFIGURATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "cross_server": {
    "enabled": false,                    // Enable cross-server mode
    "battle_server": "",                 // Empty = this is battle server
                                         // "battle1" = redirect to battle1 server

    // Database Configuration (MySQL)
    "database": {
      "type": "MYSQL",                   // MYSQL or SQLITE
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "root",
      "password": ""
    },

    // Redis Configuration (Real-time sync)
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",                    // Leave empty if no auth
      "database": 0                      // Redis database number (0-15)
    }
  }
}
```

#### Database Settings

| Field | Type | Description |
|-------|------|-------------|
| `type` | String | `MYSQL` or `SQLITE` (single-server uses SQLITE) |
| `host` | String | MySQL server IP address |
| `port` | Number | MySQL server port (default: 3306) |
| `database` | String | MySQL database name |
| `username` | String | MySQL username |
| `password` | String | MySQL password |

#### Redis Settings

| Field | Type | Description |
|-------|------|-------------|
| `host` | String | Redis server IP address |
| `port` | Number | Redis server port (default: 6379) |
| `password` | String | Redis password (empty = no auth) |
| `database` | Number | Redis database number (0-15) |

#### Battle Server Setting

- **Empty string (`""`)**: This server is a battle server (handles battles)
- **Server name (`"battle1"`)**: This is a lobby server, redirect players to `battle1`

**Important for cross-server:**
- Only ONE server should have `battle_server: ""`
- All lobby servers should specify the battle server name
- See [Cross-Server Setup](../advanced/cross-server.md) for detailed guide

---

### Ranked Match Settings

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  RANKED MATCH SETTINGS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "ranked_match": {
    "reset_days": 30,                    // Season duration in days
    "min_queue_players": 2               // Minimum players to start match
  }
}
```

| Field | Default | Description |
|-------|---------|-------------|
| `reset_days` | 30 | Season length in days (7, 14, 30, 60, 90 recommended) |
| `min_queue_players` | 2 | Minimum players needed to start matchmaking |

**Season Rotation:**
- Seasons automatically rotate every `reset_days` days
- Top 3 players receive season rewards
- Player stats (Elo, wins, losses) are preserved
- Reward collection flags are reset

---

### Battle Configuration

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  BATTLE SETTINGS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "battle": {
    "levelMatch": 70,                    // Level cap (50, 70, 100)
    "forceLevelCap": true,               // Force level cap in battles
    "maxTurns": 100,                     // Maximum turns before draw
    "battleFormat": "GEN_9_SINGLES",     // Showdown battle format
    "clauses": {
      "sleepClause": true,               // Only one opponent can be asleep
      "speciesClause": false,            // No duplicate species
      "evasionClause": true,             // Ban evasion moves
      "ohkoClause": true,                // Ban OHKO moves
      "moodyClause": true                // Ban Moody ability
    }
  }
}
```

#### Battle Settings

| Field | Default | Description |
|-------|---------|-------------|
| `levelMatch` | 70 | Pokemon level for battles (50, 70, 100 common) |
| `forceLevelCap` | true | Force all Pokemon to `levelMatch` level |
| `maxTurns` | 100 | Maximum turns before battle is a draw |
| `battleFormat` | GEN_9_SINGLES | Showdown battle format string |

**Level Cap Options:**
- `50` - VGC official format
- `70` - Common competitive level
- `100` - Full power battles

#### Battle Clauses

Clauses are competitive battle rules:

| Clause | Default | Description |
|--------|---------|-------------|
| `sleepClause` | true | Only one opponent Pokemon can be asleep at a time |
| `speciesClause` | false | No duplicate Pokemon species on a team |
| `evasionClause` | true | Bans evasion-boosting moves (Double Team, Minimize) |
| `ohkoClause` | true | Bans one-hit-KO moves (Fissure, Guillotine, etc.) |
| `moodyClause` | true | Bans the Moody ability |

**Note:** Clauses work alongside [blacklist.json5](blacklist.md) restrictions.

---

### Matchmaking Configuration

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  MATCHMAKING SETTINGS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "matchmaking": {
    "initialEloRange": 200,              // Starting Elo search range (±200)
    "eloRangeExpansionRate": 50,         // Expand range every X seconds
    "maxEloRangeMultiplier": 5.0,        // Max range = initialEloRange * multiplier
    "maxWaitTimeSeconds": 300            // Maximum queue wait time (5 minutes)
  }
}
```

#### How Matchmaking Works

1. **Player joins queue** with 1000 Elo
2. **Initial search**: Looks for players within 1000 ± 200 (800-1200)
3. **Every 50 seconds**: Range expands by 200
   - After 50s: 1000 ± 400 (600-1400)
   - After 100s: 1000 ± 600 (400-1600)
4. **Maximum range**: 1000 ± 1000 (0-2000) when `maxEloRangeMultiplier: 5.0`
5. **Timeout**: After 300 seconds (5 minutes), player is removed from queue

#### Matchmaking Settings

| Field | Default | Description |
|-------|---------|-------------|
| `initialEloRange` | 200 | Starting Elo search range (±) |
| `eloRangeExpansionRate` | 50 | Seconds before range expands |
| `maxEloRangeMultiplier` | 5.0 | Maximum range multiplier |
| `maxWaitTimeSeconds` | 300 | Maximum queue wait time (seconds) |

**Example Configurations:**

<details>
<summary><b>Strict Matchmaking (Competitive)</b></summary>

```json5
{
  "matchmaking": {
    "initialEloRange": 100,              // Tight ±100 range
    "eloRangeExpansionRate": 60,         // Expand every 1 minute
    "maxEloRangeMultiplier": 3.0,        // Max ±300
    "maxWaitTimeSeconds": 600            // 10 minute timeout
  }
}
```
</details>

<details>
<summary><b>Casual Matchmaking (Fast Queue)</b></summary>

```json5
{
  "matchmaking": {
    "initialEloRange": 500,              // Wide ±500 range
    "eloRangeExpansionRate": 30,         // Expand every 30 seconds
    "maxEloRangeMultiplier": 10.0,       // Max ±5000 (basically anyone)
    "maxWaitTimeSeconds": 180            // 3 minute timeout
  }
}
```
</details>

---

### Competitive Settings

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  COMPETITIVE SETTINGS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "competitive": {
    "allowTeraType": true,               // Allow Terastallization
    "allowMegaEvolution": true,          // Allow Mega Evolution
    "allowZMoves": true,                 // Allow Z-Moves
    "allowDynamax": false,               // Allow Dynamax/Gigantamax
    "requireOriginalTrainer": true,      // Must be OT of Pokemon
    "allowLegends": false,               // Allow legendary Pokemon
    "teamSize": 6                        // Required party size
  }
}
```

#### Competitive Rules

| Field | Default | Description |
|-------|---------|-------------|
| `allowTeraType` | true | Enable Terastallization (Gen 9) |
| `allowMegaEvolution` | true | Enable Mega Evolution (Gen 6+) |
| `allowZMoves` | true | Enable Z-Moves (Gen 7) |
| `allowDynamax` | false | Enable Dynamax/Gigantamax (Gen 8) |
| `requireOriginalTrainer` | true | Player must be OT (prevents traded teams) |
| `allowLegends` | false | Allow legendary Pokemon (overrides blacklist) |
| `teamSize` | 6 | Required number of Pokemon in party |

**Note:** These settings work alongside [blacklist.json5](blacklist.md). For example:
- `allowLegends: false` + blacklist with `"legendary"` = double restriction
- `allowTeraType: false` = Terastallization disabled even if Pokemon can Tera

---

### Elo System Configuration

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  ELO RATING SYSTEM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",          // LEGACY or POKEMON_SHOWDOWN

    // Pokemon Showdown System (K-factor based)
    "pokemonShowdown": {
      "kFactor": 32,                     // K-factor for calculations
      "provisionalMatches": 10,          // Matches before stable rating
      "provisionalKFactor": 64           // Higher K-factor for new players
    },

    // Legacy System (Random points)
    "legacy": {
      "minPoints": 10,                   // Minimum Elo change
      "maxPoints": 30                    // Maximum Elo change
    }
  }
}
```

#### Elo System Modes

**`POKEMON_SHOWDOWN`** (Recommended)
- Uses K-factor based Elo calculation
- New players have higher K-factor (more volatile ratings)
- Settles to stable ratings after provisional period
- Similar to Pokemon Showdown, Chess.com, etc.

**`LEGACY`**
- Random Elo change between min and max
- Simple but less accurate
- Good for casual servers

#### Pokemon Showdown Settings

| Field | Default | Description |
|-------|---------|-------------|
| `kFactor` | 32 | Standard K-factor (16-32 common) |
| `provisionalMatches` | 10 | Matches before rating stabilizes |
| `provisionalKFactor` | 64 | K-factor for new players (higher = more change) |

**K-Factor Guide:**
- `16` - Very stable, small rating changes (top players)
- `24` - Balanced stability
- `32` - Standard competitive (recommended)
- `40` - Higher volatility
- `64` - Provisional players only

#### Legacy Settings

| Field | Default | Description |
|-------|---------|-------------|
| `minPoints` | 10 | Minimum Elo gained/lost |
| `maxPoints` | 30 | Maximum Elo gained/lost |

**Example:** Winner gets random 10-30 points, loser loses same amount.

---

## Complete Example

A competitive VGC-style configuration:

```json5
{
  "language": "en-Us",

  "cross_server": {
    "enabled": false,
    "battle_server": "",
    "database": {
      "type": "SQLITE",
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
      "database": 0
    }
  },

  "ranked_match": {
    "reset_days": 30,
    "min_queue_players": 2
  },

  "battle": {
    "levelMatch": 50,                    // VGC level cap
    "forceLevelCap": true,
    "maxTurns": 100,
    "battleFormat": "GEN_9_SINGLES",
    "clauses": {
      "sleepClause": true,
      "speciesClause": false,
      "evasionClause": true,
      "ohkoClause": true,
      "moodyClause": true
    }
  },

  "matchmaking": {
    "initialEloRange": 150,
    "eloRangeExpansionRate": 60,
    "maxEloRangeMultiplier": 4.0,
    "maxWaitTimeSeconds": 600
  },

  "competitive": {
    "allowTeraType": true,               // VGC allows Tera
    "allowMegaEvolution": false,         // VGC no Mega
    "allowZMoves": false,                // VGC no Z-Moves
    "allowDynamax": false,               // VGC no Dynamax
    "requireOriginalTrainer": true,
    "allowLegends": true,                // VGC allows restricted
    "teamSize": 6
  },

  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "kFactor": 32,
      "provisionalMatches": 10,
      "provisionalKFactor": 64
    },
    "legacy": {
      "minPoints": 10,
      "maxPoints": 30
    }
  }
}
```

## Reloading Configuration

After editing `config.json5`, reload without restarting:

```
/rankedarena reload
```

## Validation

CobbleRanked validates configuration on load:

- ✅ JSON5 syntax errors
- ✅ Missing required fields
- ✅ Invalid enum values (`POKEMON_SHOWDOWN` vs `SHOWDOWN`)
- ✅ Invalid number ranges

Check `logs/latest.log` for errors:
```
[CobbleRanked] Failed to parse config.json5: Invalid eloSystem.mode
[CobbleRanked] Using default configuration
```

## Troubleshooting

### Config not loading

**Symptom:** Changes don't apply after `/rankedarena reload`

**Solution:**
1. Check JSON5 syntax: https://json5.org
2. Look for trailing commas on last array item (allowed in JSON5!)
3. Check server console for errors

### Cross-server not working

**Symptom:** Players can't see each other across servers

**Solution:**
1. Verify MySQL connection: `mysql -u username -p -h host database`
2. Test Redis connection: `redis-cli -h host -p port PING`
3. Check `battle_server` setting (only ONE server should be empty)

### Matchmaking too slow

**Symptom:** Players wait forever in queue

**Solution:**
- Increase `initialEloRange` (200 → 500)
- Decrease `eloRangeExpansionRate` (50 → 30)
- Increase `maxEloRangeMultiplier` (5.0 → 10.0)

### Season not rotating

**Symptom:** Season stuck, won't auto-rotate

**Solution:**
1. Check `reset_days` value (must be > 0)
2. Verify current season end date: `/rankedarena season info`
3. Manually rotate: `/rankedarena season rotate`

---

**Next:** Configure [Blacklist System](blacklist.md) to restrict Pokemon, moves, and abilities.
