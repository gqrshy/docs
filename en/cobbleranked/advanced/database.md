# Database Configuration

---
**CobbleRanked** > **Advanced** > **Database**
---

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

## Migration

### SQLite to MySQL/MongoDB

```bash
/rankedadmin database migrate sqlite mysql
/rankedadmin database migrate sqlite mongodb
```

**Requirements:**
- Target database configured in `config.json5`
- Target database connection working

**What's migrated:**
- All player stats
- Elo ratings
- Win/loss records
- Season data

### MySQL to MongoDB

```bash
/rankedadmin database migrate mysql mongodb
```

**Use case:** Migrating from MySQL to MongoDB for better scaling.

### Back to SQLite

```bash
/rankedadmin database migrate mysql sqlite
/rankedadmin database migrate mongodb sqlite
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

### MongoDB connection failed

1. **Test connection:**
   ```bash
   mongosh "mongodb://username:password@host:27017/cobbleranked"
   ```

2. **Check credentials:**
   - Verify `username` and `password` in config
   - Check `auth_database` (usually `admin`)

3. **Verify MongoDB running:**
   ```bash
   systemctl status mongodb  # or mongod
   ```

4. **Check firewall:**
   ```bash
   telnet host 27017
   ```

5. **Atlas-specific:**
   - Verify IP whitelist includes server IP
   - Check `use_srv: true` is set
   - Connection string should NOT include `mongodb://` prefix when `use_srv: true`

### MongoDB: Authentication failed

**Error:** `Command failed with error 18 (AuthenticationFailed)`

**Solution:**
```bash
# Recreate user with correct permissions
mongosh
use admin
db.createUser({
  user: "cobbleranked",
  pwd: "secure_password",
  roles: [
    { role: "readWrite", db: "cobbleranked" },
    { role: "dbAdmin", db: "cobbleranked" }
  ]
})
```

### MongoDB: Slow queries

**Enable profiling:**
```bash
mongosh cobbleranked
db.setProfilingLevel(1, { slowms: 100 })  // Log queries >100ms
db.system.profile.find().sort({ts: -1}).limit(5)
```

**Check indexes:**
```bash
db.format_stats.getIndexes()  # Should show elo_points index
```

If missing, CobbleRanked will recreate on next restart.

---

## Redis Configuration

### Overview

Redis provides real-time communication between CobbleRanked servers for:
- **Queue synchronization** - Players on different servers can match
- **Matchmaking** - Battle server detects queued players instantly
- **Server heartbeats** - Monitor active servers
- **Player transfers** - Coordinate server switching

**Required for:** Cross-server setups only

### Installation

#### Ubuntu/Debian
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### CentOS/RHEL
```bash
sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
```

#### Docker
```bash
docker run -d -p 6379:6379 redis:latest
```

### Configuration

#### Basic Setup

**File:** `/etc/redis/redis.conf`

```ini
# Allow connections from all IPs
bind 0.0.0.0

# Disable protected mode (or use password)
protected-mode no

# OPTIONAL: Password
requirepass your_password
```

**Restart Redis:**
```bash
sudo systemctl restart redis-server
```

#### Firewall

```bash
# Ubuntu/Debian
sudo ufw allow 6379/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

### CobbleRanked Configuration

**config.json5:**

```json5
{
  "cross_server": {
    "redis": {
      "host": "192.168.1.100",  // Redis server IP
      "port": 6379,
      "password": "",  // Leave empty if no password
      "database": 0    // Redis database number (0-15)
    }
  }
}
```

**Important:** All servers must use same `database` number!

### Testing

#### Test Connection

```bash
redis-cli -h REDIS_IP -p 6379 PING
```

**Expected:** `PONG`

#### With Password

```bash
redis-cli -h REDIS_IP -p 6379 -a your_password PING
```

#### Monitor Activity

```bash
redis-cli MONITOR
```

Shows real-time Redis commands (useful for debugging).

### Troubleshooting

#### Connection refused

**Solutions:**
1. Check Redis running: `systemctl status redis-server`
2. Check bind address: `grep bind /etc/redis/redis.conf`
3. Check firewall: `telnet REDIS_IP 6379`

#### Wrong password

```
(error) NOAUTH Authentication required
```

**Solution:** Provide password in config or remove `requirepass` from redis.conf

#### Queue not syncing

**Symptoms:** Players on different servers can't match

**Solutions:**
1. Verify all servers use same Redis host/port
2. Check all servers use same `database` number
3. Test Redis connection from each server
4. Check server logs for Redis errors

### Advanced

#### Multiple Databases

Redis supports 16 databases (0-15). Use different databases for different purposes:

```json5
{
  "redis": {
    "database": 0  // CobbleRanked uses database 0
  }
}
```

**Note:** All CobbleRanked servers must use same database!

#### Performance

Redis is extremely fast. No tuning needed for typical usage.

**If experiencing lag:**
- Check Redis server resources (CPU, RAM)
- Use dedicated Redis server (not on Minecraft server)
- Monitor: `redis-cli INFO`

---

## Next Steps

### For Database Setup
1. **[SQLite to MySQL Migration](#sqlite-to-mysqlmongodb)** - Upgrade path
2. **[MongoDB Atlas Setup](#option-2-mongodb-atlas-cloud)** - Cloud database
3. **[Redis Configuration](#redis-configuration)** - Real-time sync

### For Performance
1. **[Connection Pooling](#connection-pool)** - Optimize connections
2. **[Database Comparison](#comparison)** - Choose the right database
3. **[Backup Strategies](#backup--restore)** - Protect your data

### For Troubleshooting
1. **[MySQL Issues](#mysql-connection-failed)** - Connection problems
2. **[MongoDB Issues](#mongodb-connection-failed)** - Authentication and setup
3. **[Redis Issues](#redis-configuration)** - Queue sync problems

---

## Related Pages
- [Cross-Server Setup](cross-server.md) - Multi-server configuration
- [Installation Guide](../getting-started/installation.md#cross-server-setup-advanced) - Prerequisites
- [FAQ](../support/faq.md#cross-server) - Database questions
