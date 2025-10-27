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
  //  COMPETITIVE INTEGRITY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "competitive": {
    "syncLocalQueue": true,              // Sync queue with Redis (cross-server)
    "preventDuplicatePenalty": true,     // Prevent duplicate disconnect penalties
    "asyncSeasonManager": true,          // Use async season management
    "pendingMatchTimeout": 30,           // Timeout for pending matches (seconds)
    "cleanupResources": true,            // Clean up resources after battle

    // ─────────────────────────────────────────────────────────────────────────
    //  Flee Penalty System
    // ─────────────────────────────────────────────────────────────────────────

    "flee_penalty": {
      "tiers": [
        {
          "flee_min": 1,
          "flee_max": 5,
          "penalty_minutes": 5          // 5 minute queue ban
        },
        {
          "flee_min": 6,
          "flee_max": 10,
          "penalty_minutes": 15         // 15 minute queue ban
        },
        {
          "flee_min": 11,
          "flee_max": 999,
          "penalty_minutes": 30         // 30 minute queue ban
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    //  Flee Count Decay System
    // ─────────────────────────────────────────────────────────────────────────

    "flee_decay": {
      "enabled": true,                   // Enable automatic flee count reduction
      "decay_rate": 1,                   // Reduce flee count by this amount per interval
      "decay_interval_hours": 24         // Reduce flee count every 24 hours
    }
  }
}
```

#### Competitive Integrity Settings

| Field | Default | Description |
|-------|---------|-------------|
| `syncLocalQueue` | true | Synchronize local queue with Redis (cross-server mode) |
| `preventDuplicatePenalty` | true | Prevent duplicate disconnect penalties |
| `asyncSeasonManager` | true | Use async season management (recommended) |
| `pendingMatchTimeout` | 30 | Seconds before auto-canceling pending matches |
| `cleanupResources` | true | Clean up battle resources after completion |

---

#### Flee Penalty System

Configurable queue ban tiers for players who disconnect during battles.

| Field | Description |
|-------|-------------|
| `flee_min` | Minimum flee count for this tier |
| `flee_max` | Maximum flee count for this tier |
| `penalty_minutes` | Queue ban duration in minutes |

**Default tiers:**
- **1-5 flee count**: 5 minute queue ban
- **6-10 flee count**: 15 minute queue ban
- **11+ flee count**: 30 minute queue ban

**Customization examples:**

**Lenient server:**
```json5
"flee_penalty": {
  "tiers": [
    { "flee_min": 1, "flee_max": 3, "penalty_minutes": 0 },    // No penalty for first 3
    { "flee_min": 4, "flee_max": 10, "penalty_minutes": 5 },   // 5 min for 4-10
    { "flee_min": 11, "flee_max": 999, "penalty_minutes": 15 } // 15 min for 11+
  ]
}
```

**Strict server:**
```json5
"flee_penalty": {
  "tiers": [
    { "flee_min": 1, "flee_max": 2, "penalty_minutes": 10 },   // 10 min for first 2
    { "flee_min": 3, "flee_max": 5, "penalty_minutes": 30 },   // 30 min for 3-5
    { "flee_min": 6, "flee_max": 999, "penalty_minutes": 60 }  // 60 min for 6+
  ]
}
```

---

#### Flee Decay System

Automatically reduces flee count over time to forgive past disconnects.

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | true | Enable automatic flee count decay |
| `decay_rate` | 1 | Flee count reduction per interval |
| `decay_interval_hours` | 24 | Hours between decay intervals |

**How decay works:**
- Decay is calculated based on **time elapsed**, not player activity
- Works **offline** - decay accumulates even when player is not logged in
- When flee count reaches 0, all queue bans are cleared
- Decay happens automatically when checking penalties or incrementing flee count

**Example scenarios:**

**Default (decay_rate: 1, decay_interval_hours: 24):**
- Player has flee count = 10
- After 24 hours → flee count = 9
- After 48 hours → flee count = 8
- After 10 days (240 hours) → flee count = 0

**Faster decay (decay_rate: 2, decay_interval_hours: 12):**
- Player has flee count = 10
- After 12 hours → flee count = 8
- After 24 hours → flee count = 6
- After 2.5 days (60 hours) → flee count = 0

**Slower decay (decay_rate: 1, decay_interval_hours: 168):**
- Player has flee count = 10
- After 1 week → flee count = 9
- After 2 weeks → flee count = 8
- After 10 weeks → flee count = 0

**Disabled decay:**
```json5
"flee_decay": {
  "enabled": false  // Flee count never decreases (old behavior)
}
```

**⚠️ Important notes:**
- Decay does **not** reset when flee count increases (new disconnects)
- Decay timer continues running even during queue bans
- Admins can still manually reset with `/rankedarena setflee <player> 0`

---

### Elo System Configuration

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  ELO RATING SYSTEM
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",          // LEGACY, POKEMON_SHOWDOWN, or GLICKO2

    // Pokemon Showdown System (K-factor based)
    "pokemonShowdown": {
      "initialElo": 1000.0,              // Starting Elo for new players
      "floorElo": 1000.0,                // Minimum Elo (can't drop below)
      "decay": {
        "enabled": true,                 // Enable Elo decay for inactive players
        "runAtUtcHour": 9,               // Run decay at 9 AM UTC daily
        "slowDecayReduction": 2          // Elo reduction per day of inactivity
      }
    },

    // Glicko-2 System (Advanced rating with uncertainty)
    "glicko2": {
      "initialRating": 1500.0,           // Starting rating for new players
      "initialRD": 350.0,                // Initial rating deviation (uncertainty)
      "initialVolatility": 0.06,         // Initial volatility (rating stability)
      "systemConstant": 0.5,             // Controls volatility change (0.3-1.2)
      "rdDecayDays": 30                  // Days before RD starts increasing (inactivity)
    }
  }
}
```

#### Elo System Modes

**`POKEMON_SHOWDOWN`** (Recommended)
- Uses K-factor based Elo calculation similar to Pokemon Showdown
- Simple and effective for competitive play
- Includes Elo decay for inactive players
- Floor Elo prevents dropping below minimum rating

**`GLICKO2`** (Advanced)
- Considers rating uncertainty (RD - Rating Deviation)
- More accurate for players with few matches
- Volatility system for rating stability
- Used by competitive games like CS:GO, Dota 2
- More complex but more precise

**`LEGACY`**
- Random Elo change between configured min/max
- Simple but less accurate
- Good for casual servers
- Not recommended for competitive play

#### Pokemon Showdown Settings

| Field | Default | Description |
|-------|---------|-------------|
| `initialElo` | 1000.0 | Starting Elo for new players |
| `floorElo` | 1000.0 | Minimum Elo (players can't drop below this) |
| `decay.enabled` | true | Enable Elo decay for inactive players |
| `decay.runAtUtcHour` | 9 | Hour (0-23) to run decay daily (UTC time) |
| `decay.slowDecayReduction` | 2 | Elo points lost per day of inactivity |

**Elo Decay System:**
- Prevents inactive players from holding top leaderboard spots
- Only affects players who haven't played in a while
- Runs once per day at configured UTC hour
- Can be disabled by setting `enabled: false`

#### Glicko-2 Settings

| Field | Default | Description |
|-------|---------|-------------|
| `initialRating` | 1500.0 | Starting rating for new players |
| `initialRD` | 350.0 | Initial rating deviation (uncertainty, lower = more certain) |
| `initialVolatility` | 0.06 | Initial volatility (rating stability) |
| `systemConstant` | 0.5 | Controls volatility change (0.3-1.2 recommended) |
| `rdDecayDays` | 30 | Days before RD starts increasing due to inactivity |

**Glicko-2 Concepts:**
- **Rating**: Your skill level (like Elo)
- **RD (Rating Deviation)**: Uncertainty about your rating (350 = new player, 50 = established)
- **Volatility**: How erratic your performance is
- **System Constant**: Higher = more volatility change after upsets

**RD Behavior:**
- New players: High RD (350) = rating changes a lot
- Established players: Low RD (50-150) = rating stable
- Inactive players: RD increases = rating becomes uncertain again

---

### Season Announcement Configuration

Configure automatic season announcements and default season naming.

```json5
{
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  //  SEASON ANNOUNCEMENTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  "season_announcement": {
    "enabled": true,                     // Enable automatic season announcements
    "interval_minutes": 30,              // Announcement interval (minutes)
    "show_remaining_days": true,         // Show remaining days in announcements
    "default_season_name": "Winter Cup"  // Default name for new seasons (empty = auto)
  }
}
```

#### Season Announcement Settings

| Field | Default | Description |
|-------|---------|-------------|
| `enabled` | true | Enable automatic season end announcements |
| `interval_minutes` | 30 | How often to announce (in minutes) |
| `show_remaining_days` | true | Always show days remaining, or only when < 7 days |
| `default_season_name` | "" | Default name for auto-created seasons |

**Announcement Behavior:**

When `enabled: true`:
- Announces to all online players periodically
- Shows clickable message (click to open `/ranked`)
- Format: `[Ranked] {season} ends in {days} day(s)! Play now to earn amazing rewards!`

**Show Remaining Days:**
- `true`: Always announce remaining days
- `false`: Only announce when less than 7 days remain

**Default Season Name:**

Controls auto-generated season names when new seasons are created:

```yaml
# Custom name
default_season_name: "Winter Cup"      # → "Winter Cup"
default_season_name: "2025 Q4"         # → "2025 Q4"
default_season_name: "Champion League" # → "Champion League"

# Auto-generate (YYYY-MM format)
default_season_name: ""                # → "2025-10"
```

**Message Examples:**

```
# With custom name
[Ranked] Winter Cup ends in 30 days! Play now to earn amazing rewards!

# With auto-generated name
[Ranked] 2025-10 ends in 30 days! Play now to earn amazing rewards!
```

**Note:** Season names can be changed manually with `/rankedarena season setname "Name"`

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
