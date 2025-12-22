# Main Configuration

Complete reference for `config/cobbleranked/config.yaml`.

---

## Overview

The main configuration file controls core settings: language, database, cross-server, and music.

---

## Language

```yaml
# Language: "en-us" or "ja-jp"
language: "en-us"
```

| Value | Language |
|-------|----------|
| `en-us` | English |
| `ja-jp` | Japanese |

---

## Blocked Commands

Commands players cannot use during ranked battles:

```yaml
blockedCommands:
  - "tp"
  - "warp"
  - "spawn"
  - "home"
  - "kit"
  - "pc"
```

> 📝 **Note:** Commands are listed without the leading slash.

---

## Database

### SQLite (Default)

Single-server setup with local file storage:

```yaml
database:
  type: "sqlite"

  sqlite:
    path: "config/cobbleranked/data.db"
```

### MySQL

Multi-server setup with shared database:

```yaml
database:
  type: "mysql"

  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "root"
    password: "your_password"
    pool:
      maxSize: 10
      minIdle: 2
```

| Setting | Default | Description |
|---------|---------|-------------|
| `host` | `localhost` | MySQL server address |
| `port` | `3306` | MySQL server port |
| `database` | `cobbleranked` | Database name |
| `username` | `root` | Database username |
| `password` | `""` | Database password |
| `pool.maxSize` | `10` | Maximum connection pool size |
| `pool.minIdle` | `2` | Minimum idle connections |

### MongoDB

Alternative for large-scale deployments:

```yaml
database:
  type: "mongodb"

  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"
```

---

## Cross-Server

Enable cross-server matchmaking for multi-server networks.

```yaml
crossServer:
  enabled: false
  serverId: "server1"
  battleServer: ""  # Empty = this server handles battles

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

### Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `enabled` | `false` | Enable cross-server mode |
| `serverId` | `"server1"` | Unique identifier for this server |
| `battleServer` | `""` | Battle server ID (empty = this is battle server) |

### Redis Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `host` | `localhost` | Redis server address |
| `port` | `6379` | Redis server port |
| `password` | `""` | Redis password |
| `database` | `0` | Redis database number |
| `useSsl` | `false` | Enable SSL connection |

### Timing Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `matchFoundDelaySeconds` | `5` | Delay after match found |
| `battleStartDelaySeconds` | `10` | Delay before battle starts |
| `playerArrivalTimeoutSeconds` | `30` | Timeout for player arrival |

**See:** [Cross-Server Setup](../advanced/cross-server.md)

---

## Music

Battle music configuration (requires resource pack).

```yaml
music:
  enabled: true

  queueMusic:
    - music: "cobbleranked:music.queue.battle_factory_sinnoh"
      volume: 1.0
      pitch: 1.0
    - music: "cobbleranked:music.queue.bw_10"
      volume: 1.0
      pitch: 1.0

  teamSelectionMusic:
    - music: "cobbleranked:music.selection.team_selection_music"
      volume: 1.0
      pitch: 1.0

  battleMusic:
    - minElo: 0
      maxElo: 1500
      musicList:
        - music: "cobbleranked:music.battle.normal.xy_trainer"
          volume: 1.0
          pitch: 1.0

    - minElo: 1500
      maxElo: 99999
      musicList:
        - music: "cobbleranked:music.battle.high_elo.vgc_battle_music"
          volume: 1.0
          pitch: 1.0
```

### Music Types

| Type | When Played |
|------|-------------|
| `queueMusic` | While waiting in queue |
| `teamSelectionMusic` | During team selection |
| `battleMusic` | During battle (Elo-based) |

### Elo-Based Battle Music

Different music plays based on player's Elo:

```yaml
battleMusic:
  - minElo: 0
    maxElo: 1500
    musicList:
      - music: "cobbleranked:music.battle.normal.trainer"
        volume: 1.0
        pitch: 1.0

  - minElo: 1500
    maxElo: 99999
    musicList:
      - music: "cobbleranked:music.battle.high_elo.champion"
        volume: 1.0
        pitch: 1.0
```

---

## Debug

Development logging (performance impact when enabled).

```yaml
debug:
  enabled: false
  logBattleEvents: false
  logMatchmaking: false
  logGuiInteractions: false
  logMusicEvents: false
```

> ⚠️ **Warning:** Only enable debug mode when troubleshooting. It generates verbose logs.

---

## Full Example

<details>
<summary><strong>Complete config.yaml</strong></summary>

```yaml
# CobbleRanked Reloaded v2.0 - Main Configuration

language: "en-us"

blockedCommands:
  - "tp"
  - "warp"
  - "spawn"
  - "home"
  - "kit"
  - "pc"

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

database:
  type: "sqlite"

  sqlite:
    path: "config/cobbleranked/data.db"

  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "root"
    password: ""
    pool:
      maxSize: 10
      minIdle: 2

  mongodb:
    connectionString: "mongodb://localhost:27017"
    database: "cobbleranked"

music:
  enabled: true

  queueMusic:
    - music: "cobbleranked:music.queue.battle_factory_sinnoh"
      volume: 1.0
      pitch: 1.0

  teamSelectionMusic:
    - music: "cobbleranked:music.selection.team_selection_music"
      volume: 1.0
      pitch: 1.0

  battleMusic:
    - minElo: 0
      maxElo: 1500
      musicList:
        - music: "cobbleranked:music.battle.normal.xy_trainer"
          volume: 1.0
          pitch: 1.0

    - minElo: 1500
      maxElo: 99999
      musicList:
        - music: "cobbleranked:music.battle.high_elo.vgc_battle_music"
          volume: 1.0
          pitch: 1.0

debug:
  enabled: false
  logBattleEvents: false
  logMatchmaking: false
  logGuiInteractions: false
  logMusicEvents: false
```

</details>

---

## Reloading

After editing configuration:

```bash
/rankedadmin reload
```

---

## See Also

- [Battle Config](battle.md) - Formats and sounds
- [Elo Config](elo.md) - Rating system
- [Cross-Server Setup](../advanced/cross-server.md) - Multi-server configuration
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
