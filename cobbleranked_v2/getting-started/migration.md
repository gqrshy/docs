# Migration from v1

Upgrade from CobbleRanked v1 to v2 (Reloaded).

---

## Overview

CobbleRanked v2 is a complete rewrite. Configuration files are **not** directly compatible, but player data can be preserved.

---

## Key Changes

### Configuration Format

| Aspect | v1 | v2 |
|--------|----|----|
| Format | JSON5 | YAML |
| Structure | Single `config.json5` | Multiple YAML files |
| Location | `config/cobbleranked/` | `config/cobbleranked/` |

### Elo System

| Setting | v1 | v2 |
|---------|----|----|
| Starting Elo | 1000 | 1500 |
| Floor Elo | 1000 | 1000 |

### Rank Tiers

| v1 Tier | v2 Tier | Elo Range |
|---------|---------|-----------|
| Bronze | Poke Ball | 0 - 1299 |
| Silver | Great Ball | 1300 - 1499 |
| Gold | Ultra Ball | 1500 - 1699 |
| Platinum | Master Ball | 1700 - 1899 |
| Diamond | Beast Ball | 1900 - 2099 |
| Master | Cherish Ball | 2100+ |

### New Features in v2

- Lead Selection phase
- Match Ready confirmation GUI
- Casual Mode (no Elo)
- Daily/Weekly Missions
- Date-based season scheduling
- Soft Elo reset option
- Comprehensive player restrictions

---

## Migration Steps

### 1. Backup Everything

```bash
# Backup v1 configuration and data
cp -r config/cobbleranked/ config/cobbleranked_v1_backup/
```

### 2. Remove v1 Mod

Remove the v1 JAR file from `mods/` folder.

### 3. Install v2

Place the v2 JAR in `mods/` folder.

### 4. Start Server

Start the server to generate v2 configuration files.

### 5. Transfer Settings

Manually transfer settings from v1 to v2:

<details>
<summary><strong>Config Mapping Reference</strong></summary>

**Language & Basic Settings**

```yaml
# v1: config.json5
"language": "en-Us"
"blockedCommands": ["tp", "warp"]

# v2: config.yaml
language: "en-us"
blockedCommands:
  - "tp"
  - "warp"
```

**Database**

```yaml
# v1: config.json5
"cross_server": {
  "enabled": true,
  "database_type": "mysql",
  "mysql": { ... }
}

# v2: config.yaml
database:
  type: "mysql"
  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
```

**Elo System**

```yaml
# v1: config.json5
"eloSystem": {
  "mode": "POKEMON_SHOWDOWN",
  "pokemonShowdown": {
    "initialElo": 1000
  }
}

# v2: elo.yaml
ratingSystem: POKEMON_SHOWDOWN
startingElo: 1500
floorElo: 1000
```

**Season**

```yaml
# v1: config.json5
"ranked_match": {
  "reset_days": 30
}

# v2: season.yaml
schedule:
  - name: "Season 1"
    startDate: "2025-01-01"
    endDate: "2025-03-31"
```

**Matchmaking**

```yaml
# v1: config.json5
"matchmaking": {
  "format_rules": {
    "SINGLES": {
      "initialRange": 200,
      "expansionDelay": 30
    }
  }
}

# v2: matchmaking.yaml
formatRules:
  SINGLES:
    initialRange: 200
    expansionDelaySeconds: 30
```

</details>

### 6. Database Migration

**SQLite Users:**

The database schema has changed. Player data needs to be migrated:

1. v2 will create a new `data.db`
2. v1 player data is not automatically transferred
3. Use `/rankedadmin setelo` to manually restore top players if needed

**MySQL/MongoDB Users:**

1. Create a new database for v2
2. Update `config.yaml` with new database name
3. v1 and v2 data will be separate

> ⚠️ **Warning:** Do not use the same database for v1 and v2. The schema is incompatible.

### 7. Verify Migration

```bash
# Reload config
/rankedadmin reload

# Check arena status
/rankedadmin arena status

# Test ranked GUI
/ranked
```

---

## Troubleshooting Migration

### Config Not Loading

**Symptoms:** Server uses default values

**Solutions:**
1. Check YAML syntax (use a YAML validator)
2. Ensure proper indentation (2 spaces, no tabs)
3. Check server log for parsing errors

### Database Connection Failed

**Symptoms:** `Database connection failed` in logs

**Solutions:**
1. Verify database credentials
2. Check that database server is running
3. Create new database for v2

### Arenas Missing

**Symptoms:** No arenas after migration

**Solutions:**
Re-create arenas using admin commands:

```bash
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2
/rankedadmin setArena arena1 exit
```

---

## See Also

- [Installation](installation.md) - Fresh installation
- [Quick Start](quick-start.md) - Configuration guide
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
