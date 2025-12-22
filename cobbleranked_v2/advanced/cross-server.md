# Cross-Server Setup

Configure CobbleRanked for multi-server networks.

---

## Overview

Cross-server mode allows players to queue for matches on lobby servers and battle on a dedicated battle server. Requires:

- **MySQL or MongoDB** - Shared player data
- **Redis** - Real-time matchmaking communication

---

## Architecture

```
[Lobby Server 1] ──┐
                   │
[Lobby Server 2] ──┼──→ [Redis] ←──→ [Battle Server]
                   │        ↓
[Lobby Server 3] ──┘   [MySQL/MongoDB]
```

### Server Roles

| Server Type | Purpose |
|-------------|---------|
| **Lobby Server** | Queue management, stats viewing |
| **Battle Server** | Handles actual battles |

---

## Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| Redis | 6.0+ | Real-time messaging |
| MySQL | 8.0+ | Player data (or MongoDB) |
| MongoDB | 6.0+ | Player data (alternative) |

---

## Configuration

### Battle Server

The server that hosts battles:

```yaml
# config.yaml
crossServer:
  enabled: true
  serverId: "battle"
  battleServer: ""  # Empty = this IS the battle server

  redis:
    host: "redis.example.com"
    port: 6379
    password: "your_redis_password"
    database: 0
    useSsl: false

database:
  type: "mysql"
  mysql:
    host: "mysql.example.com"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_mysql_password"
```

### Lobby Servers

Servers where players queue:

```yaml
# config.yaml
crossServer:
  enabled: true
  serverId: "lobby1"        # Unique per lobby server
  battleServer: "battle"    # Points to battle server

  redis:
    host: "redis.example.com"
    port: 6379
    password: "your_redis_password"
    database: 0
    useSsl: false

database:
  type: "mysql"
  mysql:
    host: "mysql.example.com"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_mysql_password"
```

### Timing Settings

Configure delays and timeouts:

```yaml
crossServer:
  timing:
    matchFoundDelaySeconds: 5      # Delay after match found
    battleStartDelaySeconds: 10    # Delay before battle
    playerArrivalTimeoutSeconds: 30  # Timeout for server transfer
```

---

## Setup Steps

### 1. Set Up Redis

Install and configure Redis:

```bash
# Install Redis (Ubuntu/Debian)
sudo apt install redis-server

# Configure password
sudo nano /etc/redis/redis.conf
# Set: requirepass your_password

# Restart Redis
sudo systemctl restart redis
```

### 2. Set Up MySQL

Create database and user:

```sql
CREATE DATABASE cobbleranked;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

### 3. Configure Battle Server

1. Install CobbleRanked on battle server
2. Set `battleServer: ""` (empty)
3. Configure Redis and MySQL
4. Set up arenas

### 4. Configure Lobby Servers

1. Install CobbleRanked on each lobby
2. Set `battleServer: "battle"` (battle server ID)
3. Configure same Redis and MySQL
4. Arenas not needed on lobby servers

### 5. Configure Server Transfer

Use a proxy plugin (e.g., Velocity) for player transfers:

```yaml
# CobbleRanked handles transfer requests via Redis
# Proxy plugin must handle the actual server switching
```

---

## Flow

### Match Found

1. Player A queues on Lobby 1
2. Player B queues on Lobby 2
3. Redis matches them
4. Both receive "Match Found" notification
5. Both click "Ready"

### Battle Transfer

1. Both players transferred to Battle Server
2. Battle Server waits for arrivals
3. Once both arrive, battle begins
4. Battle plays normally

### Post-Battle

1. Battle ends
2. Results saved to Redis
3. Players transferred back to origin servers
4. Results displayed on origin servers

---

## Troubleshooting

### Players Not Matching

**Symptoms:** Queue never finds match across servers

**Solutions:**
1. Verify Redis is running and accessible
2. Check Redis credentials on all servers
3. Confirm all servers use same Redis database
4. Check server logs for connection errors

### Transfer Timeout

**Symptoms:** Players timeout during server transfer

**Solutions:**
1. Increase `playerArrivalTimeoutSeconds`
2. Check proxy plugin configuration
3. Verify Battle Server is online
4. Check network connectivity

### Data Not Syncing

**Symptoms:** Stats differ between servers

**Solutions:**
1. Verify MySQL/MongoDB is shared
2. Check database credentials
3. Confirm all servers use same database
4. Run `/rankedadmin reload` on all servers

---

## See Also

- [Database Configuration](database.md) - MySQL/MongoDB setup
- [Main Config](../configuration/config.md) - Full settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
