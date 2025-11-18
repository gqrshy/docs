# Database Configuration

Advanced database configuration for CobbleRanked.

## Overview

CobbleRanked supports three database systems:
- **SQLite** - File-based, single-server (default)
- **MySQL** - Network database, cross-server support
- **MongoDB** - NoSQL database, cross-server support (NEW!)

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

## MongoDB

### When to Use

**Perfect for:**
- Cross-server setups (alternative to MySQL)
- Cloud-native deployments (MongoDB Atlas)
- Horizontal scaling requirements
- Flexible schema evolution
- Large player bases with high write throughput

**Advantages over MySQL:**
- ✅ Easier horizontal scaling (sharding)
- ✅ Native JSON document storage
- ✅ Cloud-ready (MongoDB Atlas)
- ✅ Automatic schema flexibility
- ✅ Better performance for high write loads

### Setup

#### Option 1: Local MongoDB

```bash
# Ubuntu/Debian
sudo apt install mongodb-server
sudo systemctl start mongodb

# Create database and user
mongosh
use cobbleranked
db.createUser({
  user: "cobbleranked",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "cobbleranked" }]
})
```

#### Option 2: MongoDB Atlas (Cloud)

1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string: `cluster0.xxxxx.mongodb.net`
3. Add IP address to whitelist
4. Copy credentials

### Configuration

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",
    "battle_server": "battle",
    "database_type": "mongodb",  // Set to "mongodb"

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password",
      "auth_database": "admin",
      "use_srv": false,  // Set true for Atlas

      "connection_pool": {
        "max_pool_size": 10,
        "min_pool_size": 5,
        "max_idle_time_ms": 60000,
        "max_connection_lifetime_ms": 1800000,
        "connect_timeout_ms": 10000,
        "socket_timeout_ms": 5000
      }
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

### MongoDB Atlas Configuration

For cloud deployment:

```json5
{
  "mongodb": {
    "connection_string": "cluster0.xxxxx.mongodb.net",
    "database": "cobbleranked",
    "username": "your-username",
    "password": "your-password",
    "auth_database": "admin",
    "use_srv": true  // Important for Atlas!
  }
}
```

### Database Schema

MongoDB automatically creates these collections:

| Collection | Purpose | Indexes |
|-----------|---------|---------|
| `player_ranked_stats` | Overall player stats | `player_uuid` |
| `format_stats` | Format-specific stats | `{player_uuid, format}`, `{format, elo_points}` |
| `seasons` | Season history | `{is_active, season_id}` |
| `pending_season_rewards` | Pending rewards | `player_uuid`, `season_id` |
| `claimed_season_rewards` | Claimed rewards | `{player_uuid, season_id, reward_id}` |

**All indexes are created automatically on first startup!**

### Backup & Restore

**Backup:**
```bash
mongodump --db cobbleranked --out /backup/$(date +%Y%m%d)
```

**Restore:**
```bash
mongorestore --db cobbleranked /backup/20251108/cobbleranked
```

**Atlas:** Use built-in cloud backups (automatic).

---

## Comparison

| Feature | SQLite | MySQL | MongoDB |
|---------|--------|-------|---------|
| **Setup** | ✅ Zero config | ⚠️ Install required | ⚠️ Install required |
| **Cross-server** | ❌ No | ✅ Yes | ✅ Yes |
| **Scaling** | ❌ Limited | ⚠️ Vertical only | ✅ Horizontal |
| **Cloud** | ❌ No | ⚠️ Requires VPS | ✅ Atlas free tier |
| **Performance** | ✅ Fast (small) | ✅ Fast (medium) | ✅ Fast (large) |
| **Schema changes** | ⚠️ Manual | ⚠️ Manual | ✅ Automatic |
| **Backup** | ✅ Simple file copy | ⚠️ mysqldump | ✅ mongodump/Atlas |

**Recommendation:**
- **Single-server**: SQLite (easiest)
- **2-5 servers**: MySQL or MongoDB (similar)
- **5+ servers**: MongoDB (better scaling)
- **Cloud deployment**: MongoDB Atlas (easiest)

---

See [Cross-Server Setup](cross-server.md) for detailed MySQL/MongoDB configuration.
