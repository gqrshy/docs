---
title: Main Configuration
description: Complete guide to CobbleRanked configuration files.
---

Fine-tune every aspect of your competitive battles. From ELO calculations to matchmaking rules, you control the experience.

## Configuration Files

CobbleRanked v2.0.13+ uses multiple YAML files in `config/cobbleranked/`:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings: language, database, music, debug |
| `elo.yaml` | Rating system and rank tiers |
| `battle.yaml` | Timers, sounds, flee penalties, victory/defeat rewards |
| `matchmaking.yaml` | Recent opponent avoidance (global) |
| `season.yaml` | Season schedule and reset behavior |
| `season_presets/*.yml` | **Format rules** (team size, level cap, matchmaking, blacklist) |
| `rewards.yaml` | Season rewards and milestones |
| `restrictions.yaml` | Player action restrictions |
| `arenas.yaml` | Battle arena positions |
| `luckperms.yaml` | LuckPerms integration |
| `missions.yaml` | Daily/weekly missions (disabled by default) |
| `camera/camera.yaml` | Battle camera system settings |

> **Important**: As of v2.0.13, format-specific settings (team size, level cap, matchmaking rules, blacklists) are configured in **season_presets** instead of battle.yaml or matchmaking.yaml. This keeps all format settings in one place.

---

## ELO Rating System

The heart of competitive ranking. Configure how player ratings change after each battle.

### Rating System Selection

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2
startingElo: 1500
floorElo: 1000
```

| Setting | Default | Description |
|---------|---------|-------------|
| `ratingSystem` | `POKEMON_SHOWDOWN` | Rating algorithm to use |
| `startingElo` | `1500` | Rating for new players |
| `floorElo` | `1000` | Minimum possible rating (can't go lower) |

### Pokemon Showdown Mode (Default)

Uses the classic Elo formula with **K-Factor** adjustments. This is the same system used by Pokemon Showdown and chess.

```yaml
# elo.yaml
pokemonShowdown:
  newPlayerGames: 30
  newPlayerKFactor: 50
  kFactorBands:
    - maxElo: 1100
      kFactor: 40
    - maxElo: 1300
      kFactor: 32
    - maxElo: 1600
      kFactor: 24
    - maxElo: 2000
      kFactor: 16
    - maxElo: 999999
      kFactor: 12
```

<details>
<summary><strong>Understanding K-Factor</strong></summary>

**K-Factor** determines how much your rating changes after each match. Higher K-Factor = bigger rating swings.

**How it works:**
- **K-Factor 50**: Win against equal opponent → gain ~25 points
- **K-Factor 32**: Win against equal opponent → gain ~16 points
- **K-Factor 12**: Win against equal opponent → gain ~6 points

**Why variable K-Factor?**

| Player Type | K-Factor | Reason |
|-------------|----------|--------|
| New players (< 30 games) | 50 | Quickly find true skill level |
| Low rating (< 1100) | 40 | Easier to climb out |
| Mid rating (1100-1600) | 32-24 | Balanced progression |
| High rating (1600-2000) | 16 | More stable rankings |
| Top rating (2000+) | 12 | Very stable, small changes |

**Example scenario:**
- Player A (1500 ELO, K=24) beats Player B (1500 ELO, K=24)
- Both have equal 50% expected win rate
- Player A gains: 24 × (1 - 0.5) = **+12 ELO**
- Player B loses: 24 × (0 - 0.5) = **-12 ELO**

</details>

<details>
<summary><strong>K-Factor Bands Explained</strong></summary>

K-Factor Bands assign different K-Factors based on current rating:

```yaml
kFactorBands:
  - maxElo: 1100    # Players below 1100 use K=40
    kFactor: 40
  - maxElo: 1300    # Players 1100-1299 use K=32
    kFactor: 32
  - maxElo: 1600    # Players 1300-1599 use K=24
    kFactor: 24
  - maxElo: 2000    # Players 1600-1999 use K=16
    kFactor: 16
  - maxElo: 999999  # Players 2000+ use K=12
    kFactor: 12
```

**Reading the bands:**
- `maxElo: 1100, kFactor: 40` means "if rating < 1100, use K=40"
- The system checks bands in order, using the first match

**Customization tips:**
- Lower K-Factors at top = more stable leaderboard
- Higher K-Factors overall = faster climbing, more volatility
- Wider bands = simpler system, narrower = more granular control

</details>

<details>
<summary><strong>New Player Settings</strong></summary>

New players get boosted K-Factor to quickly find their true skill level:

| Setting | Default | Description |
|---------|---------|-------------|
| `newPlayerGames` | `30` | Games before considered "established" |
| `newPlayerKFactor` | `50` | K-Factor for new players |

**How it works:**
1. Player joins with `startingElo` (e.g., 1500)
2. First 30 games use K=50 (large rating swings)
3. After 30 games, K-Factor determined by `kFactorBands`

**Tuning tips:**
- Increase `newPlayerGames` if rankings feel unstable
- Decrease `newPlayerKFactor` if new players climb too fast

</details>

### Glicko-2 Mode (Advanced)

More sophisticated system that tracks rating uncertainty. Better for infrequent players.

```yaml
# elo.yaml
ratingSystem: GLICKO2

glicko2:
  startingRD: 150.0
  startingVolatility: 0.06
  systemConstant: 0.5
  rdDecayDays: 30
  maxRatingChange: 100
```

<details>
<summary><strong>Glicko-2 Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `startingRD` | `150.0` | Rating Deviation - uncertainty in rating |
| `startingVolatility` | `0.06` | How much rating is expected to fluctuate |
| `systemConstant` | `0.5` | Controls volatility changes (0.3-1.2 recommended) |
| `rdDecayDays` | `30` | Days of inactivity before RD increases |
| `maxRatingChange` | `100` | Maximum rating change per match |

**When to use Glicko-2:**
- Players have varying activity levels
- You want more accurate matchmaking for returning players
- You prefer a more mathematically rigorous system

**When to use Pokemon Showdown:**
- Simpler to understand for players
- More predictable rating changes
- Better for active, consistent player bases

</details>

### Rank Tiers

Cosmetic ranks displayed in GUI and leaderboard:

```yaml
# elo.yaml
rankTiers:
  - name: "POKEBALL"
    displayName: "Poké Ball"
    minElo: 0
  - name: "GREATBALL"
    displayName: "Great Ball"
    minElo: 1300
  - name: "ULTRABALL"
    displayName: "Ultra Ball"
    minElo: 1500
  - name: "MASTERBALL"
    displayName: "Master Ball"
    minElo: 1700
  - name: "BEASTBALL"
    displayName: "Beast Ball"
    minElo: 1900
  - name: "CHERISH"
    displayName: "Cherish Ball"
    minElo: 2100
```

> 📝 These are **display only** - they don't affect matchmaking or rewards. Use [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) for rank-based permissions.

---

## Matchmaking Settings

Matchmaking is split into two locations:
- **Global settings** (`matchmaking.yaml`) - Recent opponent avoidance
- **Per-format settings** (`season_presets/*.yml`) - ELO range rules per format

### Recent Opponent Avoidance (Global)

Prevent the same players from battling repeatedly. This applies to all formats:

```yaml
# matchmaking.yaml
recentOpponentAvoidance:
  enabled: true
  avoidCount: 3
  expirationSeconds: 300
  relaxAfterSeconds: 120
  minimumQueueSize: 4
```

| Setting | Default | Description |
|---------|---------|-------------|
| `avoidCount` | `3` | Number of recent opponents to avoid |
| `expirationSeconds` | `300` | How long opponents stay on avoid list |
| `relaxAfterSeconds` | `120` | Seconds before rules relax (longer queue) |
| `minimumQueueSize` | `4` | Don't avoid if queue has fewer players |

### Per-Format Matchmaking (Season Presets)

ELO range settings are configured per-format in season presets:

```yaml
# season_presets/default.yml
singles:
  matchmaking:
    enforceEloRange: true
    initialRange: 200
    expansionDelay: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100
```

<details>
<summary><strong>Matchmaking Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `enforceEloRange` | `true` | Require similar ratings to match |
| `initialRange` | `200` | Starting ELO range for matching |
| `expansionDelay` | `30` | Seconds before range expands |
| `expansionRate` | `50` | ELO points added per expansion |
| `maxMultiplier` | `3.0` | Max range = initialRange × multiplier |
| `immediateMatchRange` | `100` | Instant match if within this range |

**How range expansion works:**

1. Player (1500 ELO) joins queue
2. System looks for opponents in 1500 ± 200 (1300-1700)
3. After 30 seconds: expands to 1500 ± 250
4. After 60 seconds: expands to 1500 ± 300
5. Max range: 1500 ± 600 (200 × 3.0)

**Immediate match:**
- If two players are within 100 ELO, they match instantly
- No waiting for better matches

</details>

---

## Battle Settings

Configure battle behavior in `battle.yaml`. Note that **format-specific settings** (team size, level cap, turn timer) are now in **season_presets**.

### Timers (Global)

```yaml
# battle.yaml
timers:
  teamSelectionSeconds: 60
  leadSelectionSeconds: 30
  matchReadySeconds: 17
  countdownSeconds: 5
  battleTimeWarningSeconds:
    - 300
    - 60
    - 30
```

> **Note**: `matchDuration` (total match time) is now configured per-format in season_presets.

### Format Settings (Season Presets)

Format-specific settings are configured in season presets:

```yaml
# season_presets/default.yml
singles:
  enabled: true
  teamSize: 3
  selectCount: 3
  levelCap: 100
  turnTimer: 90           # seconds per turn
  matchDuration: 15       # minutes total
  megaEvolution: true
  zMoves: true
  dynamax: false
  terastallize: false
```

| Setting | Description |
|---------|-------------|
| `teamSize` | Pokemon to bring to team preview |
| `selectCount` | Pokemon to actually use in battle |
| `levelCap` | Pokemon scaled to this level |
| `turnTimer` | Time limit per turn (seconds) |
| `matchDuration` | Total match time limit (minutes) |

### Victory/Defeat Rewards

Commands executed after each ranked match:

```yaml
# battle.yaml
rewards:
  victoryCommands:
    - "cobblemon give {player} exp_candy_m 1"
    - "cobblemon give {player} rare_candy 1"
  defeatCommands:
    - "cobblemon give {player} exp_candy_s 1"
```

> 📝 Placeholders: `{player}` = player name, `{uuid}` = player UUID

### Flee Penalties

Punish players who disconnect during battles:

```yaml
# battle.yaml
competitive:
  fleePenalty:
    enabled: true
    tiers:
      - minFlees: 1
        maxFlees: 5
        penaltyMinutes: 5
      - minFlees: 6
        maxFlees: 10
        penaltyMinutes: 15
      - minFlees: 11
        maxFlees: 999
        penaltyMinutes: 30

  fleeDecay:
    enabled: true
    decayRate: 1
    decayIntervalHours: 24
```

| Flee Count | Queue Ban |
|------------|-----------|
| 1-5 | 5 minutes |
| 6-10 | 15 minutes |
| 11+ | 30 minutes |

Flee count decreases by 1 every 24 hours (configurable).

---

## Season Settings

Configure season behavior in `season.yaml`.

```yaml
# season.yaml
checkIntervalMinutes: 1
timezone: "Asia/Tokyo"

schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31 23:59:59"
    preset: "default"

onSeasonEnd:
  resetElo: false
  softResetElo: true
  softResetFactor: 0.5
  resetWinLoss: true
  resetStreak: true
```

<details>
<summary><strong>Season End Settings Explained</strong></summary>

| Setting | Default | Description |
|---------|---------|-------------|
| `resetElo` | `false` | Hard reset all ELO to starting value |
| `softResetElo` | `true` | Partial reset towards starting ELO |
| `softResetFactor` | `0.5` | How much to reset (0.5 = halfway to start) |
| `resetWinLoss` | `true` | Clear win/loss records |
| `resetStreak` | `true` | Clear win/loss streaks |

**Soft Reset Example:**
- Player has 1800 ELO, starting ELO is 1500
- `softResetFactor: 0.5`
- New ELO = 1500 + (1800 - 1500) × 0.5 = **1650**

**When to use hard reset:**
- Complete fresh start each season
- New players can compete with veterans

**When to use soft reset:**
- Reward skilled players while compressing the ladder
- Less frustrating for top players

</details>

<details>
<summary><strong>Archive Settings</strong></summary>

```yaml
archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true
```

| Setting | Description |
|---------|-------------|
| `keepAllPlayers` | Archive everyone (large database) |
| `topPlayersCount` | Only archive top N players |
| `includeStatistics` | Include detailed stats in archive |

</details>

---

## Database Settings

Configure data storage in `config.yaml`.

| Type | Use Case |
|------|----------|
| `sqlite` | Single server (default, zero config) |
| `mysql` | Cross-server setups |
| `mongodb` | Cross-server with MongoDB |

### SQLite (Default)

```yaml
# config.yaml
database:
  type: "sqlite"
  sqlite:
    path: "config/cobbleranked/data.db"
```

### MySQL

```yaml
# config.yaml
database:
  type: "mysql"
  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "root"
    password: ""
    pool:
      maxSize: 10
      minIdle: 2
```

### MongoDB

```yaml
# config.yaml
database:
  type: "mongodb"
  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"
```

---

## Restriction Settings

Prevent actions during queue/battle in `restrictions.yaml`.

Two phases:
- **queue**: While waiting for match
- **arena**: From teleport until battle ends

```yaml
# restrictions.yaml
queue:
  blockEquipmentChange: true
  blockTeleport: true
  blockedCommands:
    - "tp"
    - "spawn"
    - "home"

arena:
  blockItemUse: true
  blockBlockBreak: true
  blockPvp: true
  # ... see full list below
```

<details>
<summary><strong>All Restriction Options</strong></summary>

| Option | Description |
|--------|-------------|
| `blockItemUse` | Block using items |
| `blockItemDrop` | Block dropping items |
| `blockItemPickup` | Block picking up items |
| `blockEquipmentChange` | Block changing equipment |
| `blockBlockBreak` | Block breaking blocks |
| `blockBlockPlace` | Block placing blocks |
| `blockBlockInteract` | Block interacting with blocks |
| `blockContainerAccess` | Block opening containers |
| `blockEntityInteract` | Block entity interaction |
| `blockEntityDamage` | Block damaging entities |
| `blockEntityMount` | Block mounting entities |
| `blockPvp` | Block PvP combat |
| `blockPve` | Block PvE combat |
| `blockProjectileLaunch` | Block launching projectiles |
| `blockTeleport` | Block teleportation |
| `blockPortalUse` | Block using portals |
| `blockFlight` | Block flying |
| `blockPcAccess` | Block PC access |
| `blockMoveSwap` | Block swapping Pokemon moves |
| `blockedCommands` | List of blocked commands |

</details>

---

## Cross-Server Settings

For multi-server setups with shared rankings:

```yaml
# config.yaml
crossServer:
  enabled: false
  serverId: "server1"
  battleServer: ""

  # Transfer method (v2.0.15+)
  transferMethod: PLUGIN_MESSAGE  # or PROXY_COMMAND
  transferCommand: "server {server}"  # Only used with PROXY_COMMAND

  redis:
    host: "localhost"
    port: 6379
    password: ""
    database: 0

  timing:
    matchFoundDelaySeconds: 5
    battleStartDelaySeconds: 10
    playerArrivalTimeoutSeconds: 30
```

### Transfer Methods

| Method             | Description                                              |
|--------------------|----------------------------------------------------------|
| `PLUGIN_MESSAGE`   | Uses BungeeCord plugin messaging (default, recommended)  |
| `PROXY_COMMAND`    | Uses Proxy-Command-Reloaded via Redis                    |

> See [Cross-Server Setup](/docs/cobbleranked/advanced/cross-server/) for detailed guide.

---

## Debug Settings

Enable for troubleshooting:

```yaml
# config.yaml
debug:
  enabled: false
  logBattleEvents: false
  logMatchmaking: false
  logGuiInteractions: false
  logMusicEvents: false
```

> ⚠️ Debug mode generates verbose logs. Disable in production.

---

## See Also

- [Arenas](/docs/cobbleranked/configuration/arenas/) - Battle arena setup
- [Blacklist](/docs/cobbleranked/configuration/blacklist/) - Pokemon restrictions
- [Rewards](/docs/cobbleranked/configuration/rewards/) - Season rewards
- [Cross-Server](/docs/cobbleranked/advanced/cross-server/) - Multi-server setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
