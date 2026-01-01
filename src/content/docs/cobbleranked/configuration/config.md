---
title: Main Configuration
description: The main configuration file for CobbleRanked.
---

The main configuration file is located at `config/cobbleranked/config.json5`.

## Database Settings

Configure how CobbleRanked stores data.

| Type | Use Case |
|------|----------|
| `sqlite` | Single server (default) |
| `mysql` | Cross-server setups |

```json5
{
  "database": {
    "type": "sqlite",
    "sqlite": {
      "file": "cobbleranked.db"
    }
  }
}
```

### MySQL Configuration

```json5
{
  "database": {
    "type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password",
      "useSSL": false
    }
  }
}
```

| Setting | Description |
|---------|-------------|
| `host` | MySQL server address |
| `port` | MySQL port (default: 3306) |
| `database` | Database name |
| `username` | MySQL username |
| `password` | MySQL password |
| `useSSL` | Enable SSL connection |

## Matchmaking Settings

Control how players are matched together.

```json5
{
  "matchmaking": {
    "initialEloRange": 100,
    "eloRangeExpansionPerSecond": 5,
    "maxEloRange": 500,
    "matchmakingIntervalMs": 2000
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `initialEloRange` | `100` | Starting ELO difference for matching |
| `eloRangeExpansionPerSecond` | `5` | How fast range expands in queue |
| `maxEloRange` | `500` | Maximum ELO difference allowed |
| `matchmakingIntervalMs` | `2000` | Queue check frequency (ms) |

## Battle Settings

Configure battle behavior and phases.

```json5
{
  "battle": {
    "defaultFormat": "SINGLES",
    "teamPreview": true,
    "teamSelection": {
      "enabled": true,
      "minPokemon": 3,
      "maxPokemon": 6,
      "timeoutSeconds": 90
    },
    "leadSelection": {
      "enabled": true,
      "timeoutSeconds": 30
    },
    "turnTimer": {
      "enabled": true,
      "secondsPerTurn": 60,
      "showWarningAt": 10
    }
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `defaultFormat` | `"SINGLES"` | Default battle format |
| `teamPreview` | `true` | Show opponent's team before battle |
| `teamSelection.enabled` | `true` | Enable team selection phase |
| `teamSelection.minPokemon` | `3` | Minimum Pokemon to select |
| `teamSelection.maxPokemon` | `6` | Maximum Pokemon to select |
| `teamSelection.timeoutSeconds` | `90` | Time limit for selection |
| `leadSelection.enabled` | `true` | Enable lead selection phase |
| `leadSelection.timeoutSeconds` | `30` | Time limit for lead selection |
| `turnTimer.enabled` | `true` | Enable per-turn timer |
| `turnTimer.secondsPerTurn` | `60` | Seconds per turn |
| `turnTimer.showWarningAt` | `10` | Show warning at X seconds |

## ELO Settings

Configure the rating system.

```json5
{
  "elo": {
    "defaultElo": 1500,
    "minElo": 100,
    "maxElo": 3000,
    "kFactor": 32
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `defaultElo` | `1500` | Starting ELO for new players |
| `minElo` | `100` | Minimum possible ELO |
| `maxElo` | `3000` | Maximum possible ELO |
| `kFactor` | `32` | Rating volatility (higher = more change per match) |

## Season Settings

Configure season behavior.

```json5
{
  "season": {
    "currentSeason": "Season 1",
    "resetEloOnNewSeason": true,
    "seasonResetElo": 1500
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `currentSeason` | `"Season 1"` | Current season name |
| `resetEloOnNewSeason` | `true` | Reset ratings at season start |
| `seasonResetElo` | `1500` | ELO after reset |

## Restriction Settings

Prevent certain actions during queue/battle.

```json5
{
  "restrictions": {
    "preventPcAccess": true,
    "preventItemUse": true,
    "preventTeleport": true,
    "preventEvolution": true
  }
}
```

| Setting | Default | Description |
|---------|---------|-------------|
| `preventPcAccess` | `true` | Block PC access |
| `preventItemUse` | `true` | Block item usage |
| `preventTeleport` | `true` | Block teleportation |
| `preventEvolution` | `true` | Block evolution |

## GUI Settings

Configure GUI behavior.

```json5
{
  "gui": {
    "defaultLanguage": "en-Us",
    "availableLanguages": ["en-Us", "ja-Jp"]
  }
}
```

## Cross-Server Settings

Enable for multi-server setups.

```json5
{
  "crossServer": {
    "enabled": false,
    "serverId": "lobby1",
    "battleServer": "battle",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": ""
    }
  }
}
```

> See [Cross-Server Setup](/advanced/cross-server/) for detailed configuration.

## Debug Settings

Enable for troubleshooting.

```json5
{
  "debug": {
    "enabled": false,
    "logMatchmaking": false,
    "logBattleEvents": false
  }
}
```

## See Also

- [Arenas](/configuration/arenas/) - Arena configuration
- [Blacklist](/configuration/blacklist/) - Pokemon restrictions
- [Rewards](/configuration/rewards/) - Season rewards
- [Cross-Server](/advanced/cross-server/) - Multi-server setup
- [Troubleshooting](/support/troubleshooting/) - Configuration issues
- [FAQ](/support/faq/) - Common questions
