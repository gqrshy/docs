# Cross-Server Setup

Configure CobbleRanked across multiple servers for unified ranked battles.

---

## Overview

Cross-server mode allows players on different servers to compete in a unified ranked system.

**Benefits:**
- Queue from any server (lobby, main, battle)
- Centralized battles on dedicated battle server
- Shared rankings across network
- Better matchmaking (larger player pool)

**Architecture:**
```
[Lobby/Main Servers] → [Velocity Proxy] → [Battle Server]
         ↓                                        ↓
    [MySQL + Redis] ← ← ← ← ← ← ← ← ← ← ← ← ← ← 
    (Shared Data)
```

---

## Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| **Velocity** | Latest | Server switching |
| **MySQL** | 8.0+ | Shared player data |
| **Redis** | 6.0+ | Real-time queue sync |
| **CobbleRanked** | Latest | On all servers |

**Minimum:** 2 servers (1 battle + 1 lobby/main)  
**Recommended:** 3+ servers (1 battle + 1 lobby + 1+ main)

---

## Quick Start

### 1. Install MySQL & Redis

**MySQL:**
```bash
# Ubuntu/Debian
sudo apt install mysql-server

# Create database
mysql -u root -p
CREATE DATABASE cobbleranked;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'password';
GRANT ALL ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

**Redis:**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

See [Database Setup](database.md) and [Redis Setup](redis.md) for details.

---

### 2. Configure Battle Server

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": "",  // Empty = this IS battle server
    
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "password"
    },
    
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

---

### 3. Configure Lobby/Main Servers

`config/cobbleranked/config.json5`:

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",      // Unique per server
    "battle_server": "battle1",  // Points to battle server
    
    "database": {
      "type": "MYSQL",
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "password"
    },
    
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

**Important:**
- `server_id` must be unique per server
- `battle_server` must match Velocity server name
- All servers use same MySQL/Redis

---

### 4. Configure Velocity

`velocity.toml`:

```toml
[servers]
lobby1 = "192.168.1.10:25565"
main1 = "192.168.1.11:25565"
battle1 = "192.168.1.12:25565"

[forced-hosts]
"play.example.com" = ["lobby1"]
```

**Important:** Server names must match `server_id` and `battle_server` in configs.

---

## Server Roles

### Battle Server

**Purpose:** Handle all ranked battles and season management

**Responsibilities:**
- Execute ranked battles
- Manage matchmaking
- Rotate seasons automatically
- Save battle results to MySQL

**Config:**
```json5
{
  "battle_server": ""  // Empty = this IS battle server
}
```

### Lobby/Main Servers

**Purpose:** Allow queuing and redirect to battle server

**Responsibilities:**
- Display ranked GUI
- Join queue
- Redirect to battle server when matched

**Config:**
```json5
{
  "battle_server": "battle1"  // Points to battle server
}
```

---

## Recent Improvements

### Immediate Stats Sync (Phase 2)

Battle results appear instantly across all servers.

**How it works:**
- Battle ends → Stats cached in Redis (60s)
- Other servers see updates immediately
- Database saves in background (4s batches)

**No configuration needed** - Works automatically.

### Transfer Timeout (Phase 1)

Prevents players stuck in Ready GUI if battle server crashes.

```json5
{
  "competitive": {
    "pendingMatchTimeout": 5  // Minutes (default)
  }
}
```

**How it works:** 30-second timeout after clicking Ready.

### Queue Safety (Phase 1)

- ✅ Self-match prevention
- ✅ Duplicate queue cleanup
- ✅ Format separation

**No configuration needed** - Works automatically.

---

## Testing

### 1. Test MySQL Connection

```bash
mysql -h MYSQL_HOST -u cobbleranked -p cobbleranked
SHOW TABLES;
```

Should see: `format_stats`, `season_info`, etc.

### 2. Test Redis Connection

```bash
redis-cli -h REDIS_HOST PING
```

Should return: `PONG`

### 3. Test Cross-Server Queue

1. Join queue on `lobby1` server
2. Join queue on `main1` server as different player
3. Both should match and transfer to `battle1`

---

## Troubleshooting

### Players can't match

**Check:**
- All servers using same MySQL database
- All servers using same Redis database number
- Queue format matches (Singles vs Doubles)
- Verify with: `redis-cli KEYS "*queue*"`

### Stats not syncing

**Check:**
- All servers using same MySQL host
- Check battle server logs for database errors
- Verify Redis connection on all servers

### Transfer fails

**Check:**
- `battle_server` name matches Velocity config
- Velocity can reach battle server
- Battle server is online

### Stats not persisting after 60s

**Check:**
- Battle server database connection
- Check logs for: `[Batch] Saved FormatStats`

---

## Advanced

### Battle Server Singleton

⚠️ **CRITICAL:** Only ONE server should have `battle_server: ""` (empty).

Multiple battle servers will cause:
- Duplicate season management
- Duplicate reward distribution
- Database conflicts

**Detection:** Logs severe error if multiple battle servers detected.

### Performance

**MySQL Connection Pool:**
```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,      // 2-3 servers
    "minimum_idle": 5
  }
}
```

**Recommendations:**
- 2-3 servers: `maximum_pool_size: 10`
- 4-6 servers: `maximum_pool_size: 15`
- 7+ servers: `maximum_pool_size: 20`

---

## Backups

**MySQL:**
```bash
mysqldump -u cobbleranked -p cobbleranked > backup.sql
```

**Redis:**
```bash
redis-cli SAVE
# Backup file: /var/lib/redis/dump.rdb
```

---

**Related:** [Database Setup](database.md) · [Redis Setup](redis.md) · [Season Management](../features/seasons.md)
