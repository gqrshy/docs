---
title: Main Configuration
description: Complete guide to CobbleRanked configuration files.
---

Fine-tune every aspect of your competitive battles. From ELO calculations to matchmaking rules, you control the experience.

## Configuration Files

CobbleRanked v2.0.21+ uses multiple YAML files in `config/cobbleranked/`:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings: language, database, music, debug |
| `elo.yaml` | Rating system and rank tiers |
| `battle.yaml` | Timers, GUI behavior, flee penalties, victory/defeat rewards |
| `sounds.yaml` | All sound effects (battle, GUI, queue) |
| `matchmaking.yaml` | Recent opponent avoidance (global) |
| `season.yaml` | Season schedule and reset behavior |
| `season_presets/*.yml` | **Format rules** (team size, level cap, matchmaking, blacklist) |
| `rewards.yaml` | Season rewards and milestones |
| `restrictions.yaml` | Player action restrictions |
| `arenas.yaml` | Battle arena positions |
| `luckperms.yaml` | LuckPerms integration |
| `missions.yaml` | Daily/weekly missions (disabled by default) |
| `camera/camera.yaml` | Battle camera system settings |

### GUI Layouts

GUI appearance is configured separately in JSON5 files:

| File | Purpose |
|------|---------|
| `gui/ranked_gui.json5` | Ranked battle menu layout |
| `gui/casual_gui.json5` | Casual battle menu layout |
| `gui/leaderboard_gui.json5` | Leaderboard display layout |
| `gui/blacklist_gui.json5` | Banned content viewer layout |
| `gui/reward_gui.json5` | Season and milestone rewards layout |
| `gui/missions_gui.json5` | Daily/weekly missions layout |

> 📝 **Note**: GUI layouts (slots, materials, borders) are in `gui/*.json5` files, while GUI behavior (page sizes, cooldowns) is in `battle.yaml` under the `gui:` section.

> **Important**: As of v2.0.13, format-specific settings (team size, level cap, matchmaking rules, blacklists) are configured in **season_presets** instead of battle.yaml or matchmaking.yaml. This keeps all format settings in one place.

---

## ELO Rating System

The heart of competitive ranking. Configure how player ratings change after each battle.

### Rating System Selection

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2
startingElo: 1000
floorElo: 0
```

| Setting | Default | Description |
|---------|---------|-------------|
| `ratingSystem` | `POKEMON_SHOWDOWN` | Rating algorithm to use |
| `startingElo` | `1000` | Rating for new players |
| `floorElo` | `0` | Minimum possible rating (no floor) |

### Pokemon Showdown Mode (Default)

Uses the classic Elo formula with **K-Factor** adjustments. This is the same system used by Pokemon Showdown and chess.

```yaml
# elo.yaml
pokemonShowdown:
  newPlayerGames: 10
  newPlayerKFactor: 35
  kFactorBands:
    - maxElo: 1100
      kFactor: 30
    - maxElo: 1300
      kFactor: 25
    - maxElo: 1600
      kFactor: 20
    - maxElo: 2000
      kFactor: 16
    - maxElo: 999999
      kFactor: 12
  streakBonus:
    enabled: true
    threshold3Wins: 3
    threshold5Wins: 5
```

<details>
<summary><strong>Understanding K-Factor</strong></summary>

**K-Factor** determines how much your rating changes after each match. Higher K-Factor = bigger rating swings.

**How it works:**
- **K-Factor 35**: Win against equal opponent → gain ~17 points
- **K-Factor 25**: Win against equal opponent → gain ~12 points
- **K-Factor 12**: Win against equal opponent → gain ~6 points

**Why variable K-Factor?**

| Player Type | K-Factor | Reason |
|-------------|----------|--------|
| New players (< 10 games) | 35 | Quickly find true skill level |
| Low rating (< 1100) | 30 | Easier to climb out |
| Mid rating (1100-1300) | 25 | Balanced progression |
| Mid-high rating (1300-1600) | 20 | More stable |
| High rating (1600-2000) | 16 | Stable rankings |
| Top rating (2000+) | 12 | Very stable, small changes |

**Example scenario:**
- Player A (1500 ELO, K=20) beats Player B (1500 ELO, K=20)
- Both have equal 50% expected win rate
- Player A gains: 20 × (1 - 0.5) = **+10 ELO**
- Player B loses: 20 × (0 - 0.5) = **-10 ELO**

</details>

<details>
<summary><strong>Win Streak Bonus</strong></summary>

Players on winning streaks receive a K-Factor boost, making it easier to climb when playing well:

```yaml
streakBonus:
  enabled: true
  threshold3Wins: 3   # +3 K-Factor after 3 wins
  threshold5Wins: 5   # +5 K-Factor after 5+ wins
```

| Win Streak | K-Factor Bonus |
|------------|----------------|
| 3 wins | +3 |
| 5+ wins | +5 |

**Example:**
- Player on 5-win streak with K=20 gets effective K=25
- Win against equal opponent: gain ~12.5 instead of ~10

This rewards consistent performance while keeping the system fair.

</details>

<details>
<summary><strong>K-Factor Bands Explained</strong></summary>

K-Factor Bands assign different K-Factors based on current rating:

```yaml
kFactorBands:
  - maxElo: 1100    # Players below 1100 use K=30
    kFactor: 30
  - maxElo: 1300    # Players 1100-1299 use K=25
    kFactor: 25
  - maxElo: 1600    # Players 1300-1599 use K=20
    kFactor: 20
  - maxElo: 2000    # Players 1600-1999 use K=16
    kFactor: 16
  - maxElo: 999999  # Players 2000+ use K=12
    kFactor: 12
```

**Reading the bands:**
- `maxElo: 1100, kFactor: 30` means "if rating < 1100, use K=30"
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
| `newPlayerGames` | `10` | Games before considered "established" (industry standard) |
| `newPlayerKFactor` | `35` | K-Factor for new players (balanced for fairer matchmaking) |

**How it works:**
1. Player joins with `startingElo` (e.g., 1000)
2. First 10 games use K=35 (moderate rating swings)
3. After 10 games, K-Factor determined by `kFactorBands`

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

> 📝 These are **display only** - they don't affect matchmaking or rewards. Use [LuckPerms Integration](../integration/luckperms/) for rank-based permissions.

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

### Battle Gimmicks (Mega Evolution, Z-Moves, Dynamax, Terastallize)

> ⚠️ **Important**: The gimmick settings (`megaEvolution`, `zMoves`, `dynamax`, `terastallize`) are **placeholder settings only**. Cobblemon does not natively support these battle mechanics. They require the [Mega Showdown](https://modrinth.com/mod/megashowdown) mod to function.

#### Current Status

- CobbleRanked does **not** enforce these settings
- Gimmick availability is entirely controlled by Mega Showdown
- These settings are preserved for future Cobblemon API support

#### Workaround: Banning Gimmick Items

If you want to prevent certain gimmicks in ranked battles, ban the items required to use them via the blacklist:

```yaml
# season_presets/default.yml
singles:
  blacklist:
    items:
      # Ban Mega Stones (prevents Mega Evolution)
      - "megashowdown:mega_stone_charizard_x"
      - "megashowdown:mega_stone_charizard_y"
      # ... add all mega stones you want to ban

      # Ban Tera Orb (prevents Terastallization)
      - "megashowdown:tera_orb"

      # Ban Dynamax Band (prevents Dynamax)
      - "megashowdown:dynamax_band"

      # Ban Z-Crystals (prevents Z-Moves)
      - "megashowdown:z_crystal_normal"
      # ... add all z-crystals you want to ban

    # Or ban items in player inventory/accessories
    inventoryItems:
      - "megashowdown:omni_ring"  # Bans the all-gimmick item
```

> 📝 Check Mega Showdown's item IDs for the exact names. Use `/megashowdown items` or check JEI/REI for item IDs.

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

  pendingMatchTimeoutMinutes: 5
```

| Setting | Default | Description |
|---------|---------|-------------|
| `pendingMatchTimeoutMinutes` | `5` | Minutes before a pending match expires |

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

- **queue**: While waiting for match (prevents item manipulation)
- **arena**: From teleport until battle ends (full lockdown)

```yaml
# restrictions.yaml
queue:
  blockItemPickup: true
  blockEquipmentChange: true
  blockContainerAccess: true
  blockEntityInteract: true
  blockTeleport: true
  blockPortalUse: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "spawn"
    - "home"

arena:
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockBlockBreak: true
  blockBlockInteract: true
  blockContainerAccess: true
  blockWorkstationAccess: true
  blockEntityInteract: true
  blockPvp: true
  # ... see full list below
```

<details>
<summary><strong>All Restriction Options</strong></summary>

| Option | Description |
|--------|-------------|
| `blockItemUse` | Block using items |
| `blockItemDrop` | Block dropping items |
| `blockItemPickup` | Block picking up items from ground |
| `blockEquipmentChange` | Block changing armor/equipment |
| `blockBlockBreak` | Block breaking blocks |
| `blockBlockPlace` | Block placing blocks |
| `blockBlockInteract` | Block doors, buttons, levers |
| `blockContainerAccess` | Block opening chests, barrels, etc. |
| `blockWorkstationAccess` | Block crafting tables, furnaces, anvils, etc. |
| `blockEntityInteract` | Block villager trading, item frames, armor stands |
| `blockEntityDamage` | Block damaging entities |
| `blockEntityMount` | Block mounting horses, boats, etc. |
| `blockPvp` | Block PvP combat |
| `blockPve` | Block PvE combat |
| `blockProjectileLaunch` | Block launching projectiles |
| `blockTeleport` | Block teleportation |
| `blockPortalUse` | Block using portals |
| `blockFlight` | Block flying |
| `blockPcAccess` | Block Cobblemon PC access |
| `blockMoveSwap` | Block swapping Pokemon moves |
| `blockedCommands` | List of blocked commands |

</details>

> 📝 **v2.0.17+**: Queue phase now blocks item pickup, container access, and entity interactions to prevent obtaining banned items after joining queue.

---

## Cross-Server Settings

For multi-server setups with shared rankings:

```yaml
# config.yaml
crossServer:
  enabled: false
  serverId: "server1"
  battleServer: ""

  # Allow players on battle server to join queue directly (NOT RECOMMENDED)
  # Default: false - battle servers should only handle matched battles
  allowQueueOnBattleServer: false

  redis:
    host: "localhost"
    port: 6379
    password: ""
    database: 0
    useSsl: false

  timing:
    matchFoundDelaySeconds: 5
    battleStartDelaySeconds: 10
    playerArrivalTimeoutSeconds: 30
```

### Battle Server Queue Behavior

| Setting | Default | Description |
|---------|---------|-------------|
| `allowQueueOnBattleServer` | `false` | Allow players on battle server to join queue |

When disabled (default), players on the battle server cannot join the queue. This is recommended because the battle server is dedicated to handling matched battles from lobby servers.

> ⚠️ **Warning**: Enabling `allowQueueOnBattleServer` can cause unexpected behavior. Only enable if you understand the implications and have a specific use case.

> See [Cross-Server Setup](../advanced/cross-server/) for detailed guide.

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

- [Arenas](arenas/) - Battle arena setup
- [Blacklist](blacklist/) - Pokemon restrictions
- [Rewards](rewards/) - Season rewards
- [Cross-Server](../advanced/cross-server/) - Multi-server setup
- [FAQ](../support/faq/) - Common questions and troubleshooting
