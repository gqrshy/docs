---
title: Main Configuration
description: The main configuration file for CobbleRanked.
---

CobbleRanked v2 uses multiple YAML configuration files located in `config/cobbleranked/`.

## Configuration Files

| File | Purpose |
|------|---------|
| `config.yaml` | Main settings (language, database, music, debug) |
| `elo.yaml` | Rating system settings |
| `battle.yaml` | Battle formats, timers, sounds, rewards |
| `matchmaking.yaml` | Queue matching rules |
| `season.yaml` | Season schedule and reset behavior |
| `rewards.yaml` | Season rewards and milestones |
| `restrictions.yaml` | Player action restrictions |
| `arenas.yaml` | Battle arena positions |
| `luckperms.yaml` | LuckPerms integration |
| `missions.yaml` | Daily/weekly missions |

## Database Settings

Configure how CobbleRanked stores data in `config.yaml`.

| Type | Use Case |
|------|----------|
| `sqlite` | Single server (default) |
| `mysql` | Cross-server setups |
| `mongodb` | Cross-server with MongoDB |

```yaml
# config.yaml
database:
  type: "sqlite"

  sqlite:
    path: "config/cobbleranked/data.db"
```

### MySQL Configuration

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

### MongoDB Configuration

```yaml
# config.yaml
database:
  type: "mongodb"

  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"
```

## Matchmaking Settings

Control how players are matched together in `matchmaking.yaml`.

```yaml
# matchmaking.yaml
formatRules:
  SINGLES:
    enforceEloRange: true
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

  DOUBLES:
    enforceEloRange: true
    initialRange: 200
    expansionDelaySeconds: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

defaultEloRange:
  enforceEloRange: true
  initialRange: 200
  expansionDelaySeconds: 30
  expansionRate: 50
  maxMultiplier: 3.0
  immediateMatchRange: 100

recentOpponentAvoidance:
  enabled: true
  avoidCount: 3
  expirationSeconds: 300
  relaxAfterSeconds: 120
  minimumQueueSize: 4
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialRange` | `200` | Starting ELO difference for matching |
| `expansionDelaySeconds` | `30` | Seconds before range starts expanding |
| `expansionRate` | `50` | ELO points added per expansion |
| `maxMultiplier` | `3.0` | Max range = initialRange x multiplier |
| `immediateMatchRange` | `100` | Instant match if within this range |

## Battle Settings

Configure battle behavior in `battle.yaml`.

```yaml
# battle.yaml
enabledFormats:
  - "SINGLES"
  - "DOUBLES"

formats:
  SINGLES:
    teamSize: 3
    selectCount: 3
    matchDurationMinutes: 15
    turnTimeoutSeconds: 90
    levelCap: 100
    allowShiny: true

  DOUBLES:
    teamSize: 4
    selectCount: 4
    matchDurationMinutes: 20
    turnTimeoutSeconds: 120
    levelCap: 100
    allowShiny: true

timers:
  teamSelectionSeconds: 60
  leadSelectionSeconds: 30
  matchReadySeconds: 17
  countdownSeconds: 5
  battleMinutes: 15
  battleTimeWarningSeconds:
    - 300
    - 60
    - 30
```

| Setting | Default | Description |
|---------|---------|-------------|
| `teamSize` | Format-dependent | Pokemon to bring to battle |
| `selectCount` | Format-dependent | Pokemon to select for battle |
| `turnTimeoutSeconds` | `90-150` | Seconds per turn |
| `teamSelectionSeconds` | `60` | Time limit for team selection |
| `leadSelectionSeconds` | `30` | Time limit for lead selection |

## ELO Settings

Configure the rating system in `elo.yaml`.

```yaml
# elo.yaml
ratingSystem: POKEMON_SHOWDOWN  # or GLICKO2

startingElo: 1000
floorElo: 1000

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

| Setting | Default | Description |
|---------|---------|-------------|
| `startingElo` | `1000` | Starting ELO for new players |
| `floorElo` | `1000` | Minimum possible ELO |
| `ratingSystem` | `POKEMON_SHOWDOWN` | Rating algorithm |

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

offSeason:
  allowCasual: true
  allowRankedView: true

archive:
  enabled: true
  keepAllPlayers: false
  topPlayersCount: 100
  includeStatistics: true

announcements:
  enabled: true
  intervalMinutes: 30
  showRemainingDays: true
```

| Setting | Description |
|---------|-------------|
| `checkIntervalMinutes` | How often to check for season transitions |
| `softResetElo` | Partial reset towards starting ELO |
| `softResetFactor` | How much to reset (0.5 = halfway) |
| `resetWinLoss` | Clear win/loss records |

## Restriction Settings

Prevent certain actions during queue/battle in `restrictions.yaml`.

Two phases: `queue` (while waiting for match) and `arena` (from teleport to battle end).

```yaml
# restrictions.yaml
queue:
  blockEquipmentChange: true
  blockTeleport: true
  blockPortalUse: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "tpa"
    - "pc"
    - "pokeheal"

arena:
  blockItemUse: true
  blockItemDrop: true
  blockItemPickup: true
  blockEquipmentChange: true
  blockBlockBreak: true
  blockBlockPlace: true
  blockBlockInteract: true
  blockContainerAccess: true
  blockEntityInteract: true
  blockEntityDamage: true
  blockEntityMount: true
  blockPvp: true
  blockPve: true
  blockProjectileLaunch: true
  blockTeleport: true
  blockPortalUse: true
  blockFlight: true
  blockPcAccess: true
  blockMoveSwap: true
  blockedCommands:
    - "tp"
    - "teleport"
    - "spawn"
    - "home"
    - "warp"
    - "ranked"
    - "casual"
```

<details>
<summary>All Restriction Options</summary>

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

## Cross-Server Settings

Enable for multi-server setups in `config.yaml`.

```yaml
# config.yaml
crossServer:
  enabled: false
  serverId: "server1"
  battleServer: ""

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

> See [Cross-Server Setup](/docs/cobbleranked/advanced/cross-server/) for detailed configuration.

## Debug Settings

Enable for troubleshooting in `config.yaml`.

```yaml
# config.yaml
debug:
  enabled: false
  logBattleEvents: false
  logMatchmaking: false
  logGuiInteractions: false
  logMusicEvents: false
```

## See Also

- [Arenas](/docs/cobbleranked/configuration/arenas/) - Arena configuration
- [Blacklist](/docs/cobbleranked/configuration/blacklist/) - Pokemon restrictions
- [Rewards](/docs/cobbleranked/configuration/rewards/) - Season rewards
- [Cross-Server](/docs/cobbleranked/advanced/cross-server/) - Multi-server setup
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
