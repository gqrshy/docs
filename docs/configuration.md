# Configuration Reference

Complete reference for `config.json5` - the main configuration file for CobbleRanked.

## Table of Contents

1. [File Location](#file-location)
2. [Basic Settings](#basic-settings)
3. [Cross-Server Configuration](#cross-server-configuration)
4. [Ranked Match Settings](#ranked-match-settings)
5. [Battle Settings](#battle-settings)
6. [Matchmaking](#matchmaking)
7. [Competitive Integrity](#competitive-integrity)
8. [Elo System](#elo-system)
9. [GUI Sounds](#gui-sounds)

---

## File Location

After first server start, the config file is located at:
```
config/cobbleranked/config.json5
```

**Important:** Always restart the server after making changes to `config.json5`.

Some settings can be reloaded with `/rankedarena reload`, but a full restart is recommended.

---

## Basic Settings

### Language

```json5
"language": "en-Us"
```

**Available Languages:**
- `en-Us` - English (United States)
- `pt-Br` - Portuguese (Brazil)
- `ja-Jp` - Japanese
- `ru-Ru` - Russian

**What it affects:**
- GUI text and button labels
- Chat messages and notifications
- Command feedback
- Error messages

**How to change:**
1. Edit `"language"` value
2. Restart server
3. New language loads automatically

---

### Blocked Commands

```json5
"blockedCommands": [
  "tp",
  "warp",
  "spawn",
  "warps",
  "ranked",
  "home",
  "kit"
]
```

**Purpose:** Commands that players cannot use during active ranked battles.

**Why block commands?**
- Prevents players from teleporting out of battles
- Stops exploitation of spawn protection
- Ensures fair competition without escapes

**How to customize:**
- Add any command name (without `/`)
- Commands are blocked only during active battles
- Players can use them normally when not battling

**Example additions:**
```json5
"blockedCommands": [
  "tp",
  "tpa",
  "back",
  "spawn",
  "home",
  "warp",
  "fly",
  "god",
  "heal"
]
```

---

## Cross-Server Configuration

Settings for multi-server networks using Velocity proxy, MySQL, and Redis.

### Enable Cross-Server Mode

```json5
"cross_server": {
  "enabled": false
}
```

**Values:**
- `false` - Single server mode (default, uses SQLite)
- `true` - Multi-server mode (requires MySQL + Redis)

### Server Identification

```json5
"server_id": "server1",
"battle_server": ""
```

**server_id:**
- Unique identifier for this server
- Examples: `"main1"`, `"lobby"`, `"battle"`
- Must be different on each server

**battle_server:**
- **Empty string `""`** = This IS the battle server
- **Server ID** (e.g., `"battle"`) = This is NOT the battle server
- **Critical:** Only ONE server should have empty string!

**Important:** Only the battle server can run season management commands:
- `/rankedadmin season create`
- `/rankedadmin season rotate`
- `/rankedadmin season end`
- `/rankedadmin season setend`
- `/rankedadmin season rename`

Main/lobby servers can only view season info with `/season` or `/rankedadmin season info`.

**Example configurations:**

**Battle Server:**
```json5
"server_id": "battle",
"battle_server": ""
```

**Main/Lobby Server:**
```json5
"server_id": "main1",
"battle_server": "battle"
```

### Database Type

```json5
"database_type": "mysql"
```

**Available Options:**
- `"mysql"` - MySQL/MariaDB (recommended for 2-5 servers)
- `"mongodb"` - MongoDB (recommended for 5+ servers or cloud)

**Single-server mode:** Always uses SQLite (database_type ignored)

### MySQL Configuration

```json5
"mysql": {
  "host": "localhost",
  "port": 3306,
  "database": "cobbleranked",
  "username": "root",
  "password": "",

  "connection_pool": {
    "maximum_pool_size": 10,
    "minimum_idle": 10,
    "maximum_lifetime": 1800000,
    "connection_timeout": 5000
  }
}
```

**Settings explained:**

| Setting | Purpose | Recommended Value |
|---------|---------|-------------------|
| `host` | MySQL server address | `"localhost"` or IP |
| `port` | MySQL port | `3306` (default) |
| `database` | Database name | `"cobbleranked"` |
| `username` | DB user | Create dedicated user |
| `password` | DB password | Strong password! |

**Connection Pool (HikariCP):**

| Setting | Purpose | Value |
|---------|---------|-------|
| `maximum_pool_size` | Max concurrent connections | 10 (increase for high traffic) |
| `minimum_idle` | Always-ready connections | 10 |
| `maximum_lifetime` | Connection max age (ms) | 1800000 (30 min) |
| `connection_timeout` | Connection timeout (ms) | 5000 (5 sec) |

**Tuning for player count:**
- 10-50 players: Default (10 connections)
- 50-100 players: 15-20 connections
- 100+ players: 20-30 connections

### MongoDB Configuration

```json5
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
}
```

**When to use MongoDB:**
- Cloud-hosted databases (MongoDB Atlas)
- 5+ servers in network
- Need for horizontal scaling
- Geographic distribution

**use_srv:**
- `false` - Standard connection string
- `true` - MongoDB Atlas SRV connection

### Redis Configuration

```json5
"redis": {
  "host": "localhost",
  "port": 6379,
  "password": "",
  "database": 0,
  "use_ssl": false
}
```

**Settings:**

| Setting | Purpose | Value |
|---------|---------|-------|
| `host` | Redis server address | `"localhost"` or IP |
| `port` | Redis port | `6379` (default) |
| `password` | Redis password | Leave empty if no auth |
| `database` | Redis database number | `0-15` |
| `use_ssl` | Enable SSL/TLS | `false` (local), `true` (remote) |

**use_ssl:**
- `false` - Unencrypted (fine for localhost)
- `true` - Encrypted (use for internet-exposed Redis)

### Cross-Server Timing

```json5
"timing": {
  "match_found_delay": 5,
  "battle_start_delay": 10
}
```

**Settings:**
- `match_found_delay` - Seconds to wait before notifying both players of match
- `battle_start_delay` - Seconds to wait before starting battle after both accept

**Why delays?**
- Ensures both players are ready
- Allows time for server transfers
- Prevents race conditions

---

## Ranked Match Settings

Core settings for competitive matches, seasons, and Elo.

### Season Settings

```json5
"ranked_match": {
  "reset_days": 30
}
```

**reset_days:**
- How many days until automatic season rotation
- `30` - Monthly seasons (recommended)
- `14` - Bi-weekly seasons
- `7` - Weekly seasons
- `0` - No automatic rotation (manual only)

### Legacy Elo Settings

**Only applies when `eloSystem.mode: "LEGACY"`**

```json5
"elo_initial": 500,
"gainMatch": "50,100",
"loseMatch": "30,50"
```

**Settings:**
- `elo_initial` - Starting Elo for new players (Legacy mode only)
- `gainMatch` - Random Elo range for wins (`"min,max"`)
- `loseMatch` - Random Elo range for losses (`"min,max"`)

**How it works:**
- Win: Gain random value between 50-100 Elo
- Lose: Lose random value between 30-50 Elo
- Simple but not balanced for competitive play

**Recommendation:** Use `"POKEMON_SHOWDOWN"` mode instead.

### Match Limits

```json5
"timerRanked": 5,
"limitPokemon_singles": 3,
"limitPokemon_doubles": 4,
"limitBattlePlayer": 3
```

**Settings explained:**

| Setting | Purpose | Default |
|---------|---------|---------|
| `timerRanked` | Cooldown between matches (seconds) | `5` |
| `limitPokemon_singles` | Min Pokemon for Singles | `3` |
| `limitPokemon_doubles` | Min Pokemon for Doubles | `4` |
| `limitBattlePlayer` | Max simultaneous battles per player | `3` |

**Why minimums?**
- Singles needs 3: Lead + 2 backups
- Doubles needs 4: 2 leads + 2 backups
- Ensures fair team building

### Music Settings

```json5
"queueMusic": "cobbleranked:queue_music",
"queueMusicVolume": 1.0,
"queueMusicPitch": 1.0,

"teamSelectionMusic": "cobbleranked:team_selection_music",
"teamSelectionMusicVolume": 1.0,
"teamSelectionMusicPitch": 1.0
```

**Queue Music:**
- Plays while waiting in matchmaking
- Custom music pack required (sold separately)

**Team Selection Music:**
- Plays during Pokemon team selection
- Custom music pack required

**Settings:**
- `volume` - `0.0` to `1.0+` (0 = silent, 1 = full volume)
- `pitch` - `0.5` to `2.0` (1.0 = normal, higher = faster/higher pitch)

### Banned Inventory Items

```json5
"banned_inventory_items": [
  "mega_showdown:tera_orb",
  "mega_showdown:dynamax_band"
]
```

**Purpose:** Items players cannot have in inventory when joining queue.

**Why ban these?**
- Tera Orb enables Terastallization (often banned in competitive)
- Dynamax Band enables Dynamax/Gigantamax (often banned)

**How to add more:**
```json5
"banned_inventory_items": [
  "mega_showdown:tera_orb",
  "mega_showdown:dynamax_band",
  "modid:item_name"
]
```

Use format: `"modid:item_id"`

### Elo-Based Battle Music

```json5
"eloBattleMusic": [
  {
    "min_elo": 0.0,
    "max_elo": 1500.0,
    "music": "cobbleranked:normal_battle_music",
    "volume": 1.0,
    "pitch": 1.0
  },
  {
    "min_elo": 1500.0,
    "max_elo": 99999.0,
    "music": "cobbleranked:vgc_battle_music",
    "volume": 1.0,
    "pitch": 1.0
  }
]
```

**How it works:**
- Checks both players' average Elo
- Plays music matching that Elo range
- Higher Elo = more intense music

**Custom ranges example:**
```json5
"eloBattleMusic": [
  {
    "min_elo": 0,
    "max_elo": 1200,
    "music": "cobbleranked:beginner_music"
  },
  {
    "min_elo": 1200,
    "max_elo": 1800,
    "music": "cobbleranked:intermediate_music"
  },
  {
    "min_elo": 1800,
    "max_elo": 99999,
    "music": "cobbleranked:master_music"
  }
]
```

### Season Announcements

```json5
"season_announcement": {
  "enabled": true,
  "interval_minutes": 30,
  "show_remaining_days": true
}
```

**Settings:**
- `enabled` - Broadcast season info to all players
- `interval_minutes` - How often to announce (30 = every 30 min)
- `show_remaining_days` - Include days left in announcement

**Example announcement:**
> Season 1 is active! 15 days remaining. Type /season for details.

### Season Check

```json5
"season_check": {
  "enabled": true,
  "check_interval_minutes": 10
}
```

**Purpose:** Automatically check if season should end and rotate.

**Settings:**
- `enabled` - Enable automatic rotation
- `check_interval_minutes` - How often to check (10 min recommended)

### Season Reset Behavior

```json5
"season_reset": {
  "reset_elo": true,
  "reset_wins_losses": false
}
```

**What happens when season ends:**

| Setting | Effect |
|---------|--------|
| `reset_elo: true` | Elo returns to initial value |
| `reset_elo: false` | Elo carries over to next season |
| `reset_wins_losses: true` | W/L record resets to 0-0 |
| `reset_wins_losses: false` | W/L record kept (all-time stats) |

**Common configurations:**

**Full Reset (Fresh Ladder):**
```json5
"reset_elo": true,
"reset_wins_losses": true
```

**Soft Reset (Keep History):**
```json5
"reset_elo": true,
"reset_wins_losses": false
```

**No Reset (Continuous):**
```json5
"reset_elo": false,
"reset_wins_losses": false
```

---

## Battle Settings

Settings that affect battles themselves.

### Turn Timer

```json5
"turn_timeout_seconds": 30,
"limiteMaxTimer": 5
```

**Settings:**
- `turn_timeout_seconds` - Max seconds per turn (30 recommended)
- `limiteMaxTimer` - Max warnings before forfeit (5 default)

**How it works:**
1. Player has 30 seconds to make move
2. If timeout, warning given
3. After 5 warnings, player forfeits match

### Daily Limits

```json5
"gainPontsLimited": 200,
"daily_reset_timezone": "UTC",
"daily_reward_limit": -1
```

**Settings:**

| Setting | Purpose | Value |
|---------|---------|-------|
| `gainPontsLimited` | Max Elo gain per day | `200` or `-1` (unlimited) |
| `daily_reset_timezone` | When day resets | `"UTC"`, `"America/New_York"`, etc. |
| `daily_reward_limit` | Max rewards claimable per day | `-1` (unlimited) or number |

**Why limit Elo gain?**
- Prevents grinding exploits
- Encourages quality over quantity
- Keeps ladder balanced

**Common timezones:**
- `"UTC"` - Universal time
- `"America/New_York"` - Eastern US
- `"America/Los_Angeles"` - Pacific US
- `"Europe/London"` - UK
- `"Asia/Tokyo"` - Japan

### Pokemon Level

```json5
"levelMatch": 70
```

**Values:**
- `0` - Pokemon keep their original levels
- `1-100` - Force all Pokemon to this level during battle

**Recommendations:**
- `50` - VGC standard
- `70` - Competitive standard (default)
- `100` - Maximum level
- `0` - Open level (not recommended - unfair)

### Restricted Pokemon Limits

```json5
"restricted_pokemon_limits": {}
```

**Purpose:** Limit how many of a specific Pokemon can be on a team.

**Example:**
```json5
"restricted_pokemon_limits": {
  "mewtwo": 1,
  "rayquaza": 1
}
```

**Note:** This is rarely used. Use blacklist system instead (`blacklist/singles.json5`).

### Battle Rewards

```json5
"reward_victory": [],
"reward_loss": []
```

**Format:**
```json5
"reward_victory": [
  {
    "item": "minecraft:diamond",
    "amount": 1
  },
  {
    "item": "minecraft:emerald",
    "amount": 5
  }
],
"reward_loss": [
  {
    "item": "minecraft:iron_ingot",
    "amount": 3
  }
]
```

**reward_victory:**
- Items given to winner after each battle
- Can be multiple items

**reward_loss:**
- Consolation prizes for losing
- Encourages participation even when losing

---

## Matchmaking

Dynamic Elo range system for finding fair matches quickly.

```json5
"matchmaking": {
  "dynamicEloRange": {
    "enabled": true,
    "initialRange": 200,
    "expansionDelay": 30,
    "expansionRate": 5,
    "maxMultiplier": 3.0,
    "immediateMatchRange": 100
  }
}
```

**How it works:**

1. **Initial Search** (0-30 seconds)
   - Search for opponents within ±200 Elo
   - If within ±100 Elo, match instantly

2. **Expansion Phase** (30+ seconds)
   - After 30 seconds, range starts expanding
   - Expands by +5 Elo per second
   - Maximum expansion: 3.0x initial (±600 Elo)

3. **Match Found**
   - When suitable opponent found, both players notified
   - 30 seconds to accept match

**Settings explained:**

| Setting | Purpose | Default | Effect |
|---------|---------|---------|--------|
| `enabled` | Enable dynamic expansion | `true` | Finds matches faster |
| `initialRange` | Starting Elo range (±) | `200` | ±200 Elo initial search |
| `expansionDelay` | Seconds before expansion | `30` | Wait 30s before widening |
| `expansionRate` | Elo added per second | `5` | +5 Elo/sec after delay |
| `maxMultiplier` | Max range multiplier | `3.0` | 3x initial = ±600 max |
| `immediateMatchRange` | Instant match range | `100` | ±100 = instant |

**Tuning for player population:**

**High Population (100+ online):**
```json5
"initialRange": 100,
"expansionDelay": 60,
"maxMultiplier": 2.0
```

**Low Population (10-30 online):**
```json5
"initialRange": 300,
"expansionDelay": 15,
"maxMultiplier": 5.0
```

**Very Low Population (<10 online):**
```json5
"initialRange": 500,
"expansionDelay": 10,
"maxMultiplier": 10.0
```

---

## Competitive Integrity

Anti-exploit and fairness settings.

### Core Settings

```json5
"competitive": {
  "syncLocalQueue": true,
  "preventDuplicatePenalty": true,
  "asyncSeasonManager": true,
  "pendingMatchTimeout": 5,
  "cleanupResources": true
}
```

**Settings:**

| Setting | Purpose | Value |
|---------|---------|-------|
| `syncLocalQueue` | Sync queue with Redis | `true` (cross-server) |
| `preventDuplicatePenalty` | No double flee penalties | `true` (recommended) |
| `asyncSeasonManager` | Async season operations | `true` (performance) |
| `pendingMatchTimeout` | Match accept timeout (min) | `5` (reduced from 30) |
| `cleanupResources` | Clean up after battles | `true` (prevent leaks) |

### Flee Penalty System

```json5
"flee_penalty": {
  "tiers": [
    {
      "flee_min": 1,
      "flee_max": 5,
      "penalty_minutes": 5
    },
    {
      "flee_min": 6,
      "flee_max": 10,
      "penalty_minutes": 15
    },
    {
      "flee_min": 11,
      "flee_max": 999,
      "penalty_minutes": 30
    }
  ]
}
```

**How it works:**
- Player disconnects during battle → flee count increases
- Flee count determines queue ban duration
- Higher flee count = longer ban

**Customizing penalties:**

**Stricter (discourage disconnects):**
```json5
{
  "flee_min": 1,
  "flee_max": 3,
  "penalty_minutes": 10
},
{
  "flee_min": 4,
  "flee_max": 6,
  "penalty_minutes": 30
},
{
  "flee_min": 7,
  "flee_max": 999,
  "penalty_minutes": 60
}
```

**Lenient (forgiving):**
```json5
{
  "flee_min": 1,
  "flee_max": 10,
  "penalty_minutes": 5
},
{
  "flee_min": 11,
  "flee_max": 999,
  "penalty_minutes": 15
}
```

### Flee Decay

```json5
"flee_decay": {
  "enabled": true,
  "decay_rate": 1,
  "decay_interval_hours": 24
}
```

**Purpose:** Reduce flee count over time for players who improve behavior.

**Settings:**
- `enabled` - Enable automatic flee reduction
- `decay_rate` - How many flees to remove per interval
- `decay_interval_hours` - Hours between reductions

**Example:**
- Player has 5 flees
- After 24 hours: Reduced to 4
- After 48 hours: Reduced to 3
- After 120 hours: Reduced to 0

**To disable forgiveness:**
```json5
"flee_decay": {
  "enabled": false
}
```

---

## Elo System

Choose your Elo calculation algorithm.

### Mode Selection

```json5
"eloSystem": {
  "mode": "POKEMON_SHOWDOWN"
}
```

**Available Modes:**
1. `"POKEMON_SHOWDOWN"` - Same as Pokemon Showdown (recommended)
2. `"GLICKO2"` - Advanced statistical rating system
3. `"LEGACY"` - Simple random point gain/loss

### Pokemon Showdown Mode

```json5
"pokemonShowdown": {
  "initialElo": 1000,
  "floorElo": 1000,
  "decay": {
    "enabled": true,
    "runAtUtcHour": 9,
    "slowDecayReduction": 2
  }
}
```

**Settings:**

| Setting | Purpose | Default |
|---------|---------|---------|
| `initialElo` | Starting Elo | `1000` |
| `floorElo` | Minimum Elo | `1000` |
| `decay.enabled` | Inactive decay | `true` |
| `decay.runAtUtcHour` | When to run decay | `9` (9 AM UTC) |
| `decay.slowDecayReduction` | Elo lost per day inactive | `2` |

**How it works:**
- New players start at 1000 Elo
- Cannot drop below 1000 (floor)
- K-factor adjusts based on rating difference
- Inactive players lose 2 Elo per day

**Why this mode?**
- Same system Pokemon players know
- Balanced for competitive play
- Prevents inflation/deflation
- Industry standard

### Glicko-2 Mode

```json5
"glicko2": {
  "initialRating": 1500.0,
  "initialRD": 350.0,
  "initialVolatility": 0.06,
  "systemConstant": 0.5,
  "rdDecayDays": 30
}
```

**Settings:**

| Setting | Purpose | Default |
|---------|---------|---------|
| `initialRating` | Starting rating | `1500` |
| `initialRD` | Rating deviation (uncertainty) | `350` |
| `initialVolatility` | Rating stability | `0.06` |
| `systemConstant` | Volatility change rate | `0.5` |
| `rdDecayDays` | Days before RD increases | `30` |

**How it works:**
- More statistically accurate than basic Elo
- Accounts for rating uncertainty
- Better for small player pools
- Used by chess federations

**When to use:**
- Smaller servers (<50 active players)
- Want maximum accuracy
- Don't mind complexity

### Legacy Mode

```json5
// No additional settings needed
// Uses ranked_match.elo_initial, gainMatch, loseMatch
```

**How it works:**
- Win: Gain random 50-100 Elo
- Lose: Lose random 30-50 Elo
- Simple but unbalanced

**When to use:**
- Casual servers only
- Don't care about balance
- Want simplicity over accuracy

**Recommendation:** Use Pokemon Showdown mode instead.

---

## GUI Sounds

Customize sounds for all GUI interactions.

### Global Toggle

```json5
"gui_sounds": {
  "enabled": true
}
```

Set to `false` to disable ALL GUI sounds.

### Sound Configuration Format

Each sound follows this format:

```json5
"sound_name": {
  "sound": "minecraft:sound.identifier",
  "volume": 0.5,
  "pitch": 1.0
}
```

**Parameters:**
- `sound` - Minecraft sound identifier
- `volume` - `0.0` to `1.0+` (0 = silent, 1 = full, 1+ = louder)
- `pitch` - `0.5` to `2.0` (1.0 = normal, higher = faster/higher pitch)

### Common Minecraft Sounds

| Sound ID | Description |
|----------|-------------|
| `minecraft:ui.button.click` | Standard button click |
| `minecraft:block.note_block.pling` | Pleasant pling sound |
| `minecraft:entity.experience_orb.pickup` | XP pickup sound |
| `minecraft:item.book.page_turn` | Page turning |
| `minecraft:entity.player.levelup` | Level up fanfare |
| `minecraft:block.anvil.land` | Heavy thud |
| `minecraft:entity.villager.no` | Villager "no" sound |
| `minecraft:block.note_block.bell` | Bell chime |
| `minecraft:block.enchantment_table.use` | Enchantment sound |

Full list: https://minecraft.wiki/w/Sounds.json

### Available GUI Sounds

**Common Buttons:**
```json5
"button_click": {
  "sound": "minecraft:ui.button.click",
  "volume": 0.5,
  "pitch": 1.0
},
"button_back": {
  "sound": "minecraft:block.wooden_door.close",
  "volume": 0.6,
  "pitch": 1.1
},
"button_confirm": {
  "sound": "minecraft:block.note_block.pling",
  "volume": 0.7,
  "pitch": 1.5
},
"button_cancel": {
  "sound": "minecraft:block.note_block.bass",
  "volume": 0.6,
  "pitch": 0.8
}
```

**Navigation:**
```json5
"page_turn": {
  "sound": "minecraft:item.book.page_turn",
  "volume": 0.5,
  "pitch": 1.0
},
"tab_switch": {
  "sound": "minecraft:block.bamboo_wood.step",
  "volume": 0.4,
  "pitch": 1.2
}
```

**Pokemon Selection:**
```json5
"pokemon_select": {
  "sound": "minecraft:entity.experience_orb.pickup",
  "volume": 0.6,
  "pitch": 1.3
},
"pokemon_deselect": {
  "sound": "minecraft:entity.item.pickup",
  "volume": 0.5,
  "pitch": 0.9
},
"team_confirm": {
  "sound": "minecraft:entity.player.levelup",
  "volume": 0.7,
  "pitch": 1.2
}
```

**Queue & Matchmaking:**
```json5
"queue_join": {
  "sound": "minecraft:block.note_block.chime",
  "volume": 0.8,
  "pitch": 1.4
},
"queue_leave": {
  "sound": "minecraft:block.note_block.hat",
  "volume": 0.6,
  "pitch": 1.0
},
"match_found": {
  "sound": "minecraft:entity.experience_orb.pickup",
  "volume": 1.0,
  "pitch": 1.5
},
"match_accept": {
  "sound": "minecraft:block.note_block.bell",
  "volume": 0.9,
  "pitch": 1.3
},
"match_decline": {
  "sound": "minecraft:block.anvil.land",
  "volume": 0.7,
  "pitch": 0.7
}
```

**Errors & Warnings:**
```json5
"error": {
  "sound": "minecraft:entity.villager.no",
  "volume": 0.8,
  "pitch": 1.0
},
"warning": {
  "sound": "minecraft:block.note_block.didgeridoo",
  "volume": 0.6,
  "pitch": 0.8
}
```

**Leaderboard & Rewards:**
```json5
"leaderboard_open": {
  "sound": "minecraft:block.enchantment_table.use",
  "volume": 0.7,
  "pitch": 1.2
},
"reward_claim": {
  "sound": "minecraft:entity.player.levelup",
  "volume": 1.0,
  "pitch": 1.3
}
```

**Blacklist GUI:**
```json5
"blacklist_view": {
  "sound": "minecraft:item.book.page_turn",
  "volume": 0.5,
  "pitch": 1.1
},
"sort_toggle": {
  "sound": "minecraft:ui.button.click",
  "volume": 0.4,
  "pitch": 1.3
},
"format_toggle": {
  "sound": "minecraft:block.bamboo_wood_button.click_on",
  "volume": 0.6,
  "pitch": 1.2
}
```

### Customization Examples

**Silent GUI (no sounds):**
```json5
"gui_sounds": {
  "enabled": false
}
```

**Retro Game Sounds:**
```json5
"button_click": {
  "sound": "minecraft:block.note_block.pling",
  "volume": 0.7,
  "pitch": 1.8
},
"match_found": {
  "sound": "minecraft:block.note_block.bell",
  "volume": 1.0,
  "pitch": 2.0
}
```

**Subtle Professional Sounds:**
```json5
"button_click": {
  "sound": "minecraft:ui.button.click",
  "volume": 0.3,
  "pitch": 1.0
},
"match_found": {
  "sound": "minecraft:block.note_block.chime",
  "volume": 0.5,
  "pitch": 1.2
}
```

---

## Complete Configuration Example

Here's a recommended configuration for a competitive server:

```json5
{
  "language": "en-Us",
  "blockedCommands": ["tp", "home", "spawn", "warp", "fly"],

  "cross_server": {
    "enabled": false
  },

  "ranked_match": {
    "reset_days": 30,
    "timerRanked": 5,
    "limitPokemon_singles": 3,
    "limitPokemon_doubles": 4,
    "season_reset": {
      "reset_elo": true,
      "reset_wins_losses": false
    }
  },

  "battle": {
    "turn_timeout_seconds": 30,
    "levelMatch": 70,
    "gainPontsLimited": -1
  },

  "matchmaking": {
    "dynamicEloRange": {
      "enabled": true,
      "initialRange": 200,
      "expansionDelay": 30,
      "maxMultiplier": 3.0
    }
  },

  "competitive": {
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
  },

  "eloSystem": {
    "mode": "POKEMON_SHOWDOWN",
    "pokemonShowdown": {
      "initialElo": 1000,
      "floorElo": 1000,
      "decay": {
        "enabled": true,
        "slowDecayReduction": 2
      }
    }
  },

  "gui_sounds": {
    "enabled": true
  }
}
```

---

**Next Steps:**
- [Blacklist Configuration](blacklist-guide.md) - Configure battle rules
- [Commands Reference](commands.md) - All available commands
- [FAQ](faq.md) - Common questions

---

Need help? Join our Discord or check the [FAQ](faq.md)!
