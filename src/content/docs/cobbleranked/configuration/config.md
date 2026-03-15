---
title: Main Configuration
description: Basic server settings, database, and cross-server configuration.
---

Core server configuration for CobbleRanked. Advanced settings are organized in separate pages.

## Configuration Files

CobbleRanked v2.0.21+ uses multiple YAML files in `config/cobbleranked/`:

| File | Purpose |
|------|---------|
| `config.yaml` | Core settings: language, database, cross-server, debug |
| `elo.yaml` | Rating system and rank tiers → [ELO Settings](/docs/cobbleranked/configuration/elo/) |
| `battle.yaml` | Timers, penalties, rewards → [Battle Settings](/docs/cobbleranked/configuration/battle/) |
| `matchmaking.yaml` | Recent opponent avoidance → [Matchmaking Settings](/docs/cobbleranked/configuration/matchmaking/) |
| `season.yaml` | Season schedule and reset behavior → [Season Settings](/docs/cobbleranked/configuration/season/) |
| `sounds.yaml` | All sound effects → [Sounds](/docs/cobbleranked/configuration/sounds/) |
| `arenas.yaml` | Battle arena positions → [Arenas](/docs/cobbleranked/configuration/arenas/) |
| `blacklist.yaml` | Pokemon/move restrictions → [Blacklist](/docs/cobbleranked/configuration/blacklist/) |
| `restrictions.yaml` | Player action restrictions → [Restrictions](/docs/cobbleranked/configuration/restrictions/) |
| `rewards.yaml` | Season rewards → [Rewards](/docs/cobbleranked/configuration/rewards/) |
| `missions.yaml` | Daily/weekly missions → [Missions](/docs/cobbleranked/configuration/missions/) |
| `luckperms.yaml` | LuckPerms integration → [LuckPerms](/docs/cobbleranked/integration/luckperms/) |
| `camera/camera.yaml` | Battle camera system → [Camera](/docs/cobbleranked/configuration/camera/) |
| `api.yaml` | Web API settings → [API](/docs/cobbleranked/configuration/api/) |
| `season_presets/*.yml` | Format rules per season → [Battle Formats](/docs/cobbleranked/features/battle-formats/) |

### Season Presets (v2.0.13+)

Format-specific settings (team size, level cap, matchmaking rules, blacklists) are configured in **season presets** instead of the main config files. This keeps all format settings in one place.

```yaml
# season_presets/default.yml
singles:
  enabled: true
  teamSize: 3
  selectCount: 3
  levelCap: 100
  # ... all format settings here
```

---

## Language Settings

```yaml
# config.yaml
language: "en-us"
```

| Value | Language |
|-------|----------|
| `en-us` | English (default) |
| `ja-jp` | Japanese |

> 💡 **You can add ANY language!** Create a custom language file in `config/cobbleranked/language/` (e.g., `ko-KR.json5`, `zh-CN.json5`) and set the language code to match. See [Languages Configuration](languages/) for details.

Reload with `/rankedadmin reload` after changing.

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

> 📝 See [Database Configuration](/docs/cobbleranked/advanced/database/) for detailed setup and migration guides.

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

> ⚠️ **Warning**: Enabling `allowQueueOnBattleServer` can cause unexpected behavior. Only enable if you understand the implications.

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

| Setting | Description |
|---------|-------------|
| `enabled` | Master switch for debug mode |
| `logBattleEvents` | Log battle start, end, victor |
| `logMatchmaking` | Log queue joins, matches found |
| `logGuiInteractions` | Log button clicks, GUI opens |
| `logMusicEvents` | Log battle music triggers |

> ⚠️ Debug mode generates verbose logs. Disable in production.

---

## Advanced Configuration Pages

| Setting | Documentation |
|---------|---------------|
| ELO Rating System | [ELO Configuration](/docs/cobbleranked/configuration/elo/) |
| Matchmaking Rules | [Matchmaking Configuration](/docs/cobbleranked/configuration/matchmaking/) |
| Battle Timers & Penalties | [Battle Configuration](/docs/cobbleranked/configuration/battle/) |
| Season Schedule | [Season Configuration](/docs/cobbleranked/configuration/season/) |
| Match Announcements | [Announcements Configuration](/docs/cobbleranked/configuration/announcements/) |
| Daily Elo Limits | [Daily Limits Configuration](/docs/cobbleranked/configuration/daily-limits/) |
| Pokemon/Move Restrictions | [Blacklist Configuration](/docs/cobbleranked/configuration/blacklist/) |
| Player Action Restrictions | [Restrictions Configuration](/docs/cobbleranked/configuration/restrictions/) |
| Season End Rewards | [Rewards Configuration](/docs/cobbleranked/configuration/rewards/) |
| Daily/Weekly Missions | [Missions Configuration](/docs/cobbleranked/configuration/missions/) |
| Battle Arenas | [Arena Configuration](/docs/cobbleranked/configuration/arenas/) |
| GUI Customization | [GUI Configuration](/docs/cobbleranked/configuration/gui/) |
| Language Files | [Languages Configuration](/docs/cobbleranked/configuration/languages/) |
| Sound Effects | [Sounds Configuration](/docs/cobbleranked/configuration/sounds/) |
| Battle Camera | [Camera Configuration](/docs/cobbleranked/configuration/camera/) |
| Web API | [API Configuration](/docs/cobbleranked/configuration/api/) |
| LuckPerms Integration | [LuckPerms](/docs/cobbleranked/integration/luckperms/) |

---

## See Also

- [Getting Started](/docs/cobbleranked/getting-started/) - Installation and quick start
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
