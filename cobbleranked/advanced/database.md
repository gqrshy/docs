# Database Configuration

Advanced MySQL and SQLite database configuration for CobbleRanked.

## Overview

CobbleRanked supports two database systems:
- **SQLite** - File-based, single-server (default)
- **MySQL** - Network database, cross-server support

## SQLite (Default)

### When to Use

**Perfect for:**
- Single Minecraft server
- Small to medium player base (< 1,000 players)
- Simple setup, no external dependencies
- Testing and development

**Limitations:**
- Cannot share data across multiple servers
- Performance degrades with very large datasets (10,000+ players)

### Configuration

No configuration needed! Works out of the box.

**File location:** `config/cobbleranked/ranked.db`

### Backup

```bash
# Backup
cp config/cobbleranked/ranked.db backup-$(date +%Y%m%d).db

# Restore
cp backup-20251026.db config/cobbleranked/ranked.db
```

---

## MySQL

### When to Use

**Required for:**
- Cross-server setups (multiple Minecraft servers)
- Large player bases (1,000+ players)
- Better performance at scale
- Advanced features (replication, backup tools)

### Setup

See [Cross-Server Setup](cross-server.md) for complete MySQL installation guide.

**Quick config:**
```json5
{
  "cross_server": {
    "enabled": true,
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password"
    }
  }
}
```

### Database Schema

CobbleRanked automatically creates these tables:

| Table | Purpose |
|-------|---------|
| `player_ranked_stats` | Legacy player stats (pre-format system) |
| `format_stats` | Format-specific stats (Singles, Doubles) |
| `seasons` | Season history and metadata |

**No manual table creation needed!**

---

## Migration

### SQLite to MySQL

```bash
/rankedadmin database migrate sqlite mysql
```

**Requirements:**
- MySQL configured in `config.json5`
- MySQL connection working

**What's migrated:**
- All player stats
- Elo ratings
- Win/loss records
- Season data

### MySQL to SQLite

```bash
/rankedadmin database migrate mysql sqlite
```

**Use case:** Downgrading from cross-server to single-server.

---

## Troubleshooting

### SQLite database corrupted

```bash
sqlite3 config/cobbleranked/ranked.db "PRAGMA integrity_check;"
```

If corrupted, restore from backup or delete (resets all data).

### MySQL connection failed

1. Test connection: `mysql -u user -p -h host database`
2. Check credentials in config
3. Verify MySQL running: `systemctl status mysql`
4. Check firewall: `telnet host 3306`

---

See [Cross-Server Setup](cross-server.md) for detailed MySQL configuration.
