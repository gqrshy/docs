# Redis Configuration

Configure Redis for cross-server real-time synchronization.

---

## Overview

Redis provides real-time communication between CobbleRanked servers for:

- **Queue synchronization** - Players on different servers can match
- **Matchmaking** - Battle server detects queued players instantly
- **Server heartbeats** - Monitor active servers
- **Player transfers** - Coordinate server switching
- **Season sync** - Consistent season state across servers

**Required for:** Cross-server setups only

---

## Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### CentOS/RHEL

```bash
sudo yum install redis
sudo systemctl start redis
sudo systemctl enable redis
```

### Docker

```bash
docker run -d --name redis -p 6379:6379 redis:latest
```

### Docker with Password

```bash
docker run -d --name redis -p 6379:6379 redis:latest --requirepass your_password
```

---

## Redis Server Configuration

### Basic Setup

**File:** `/etc/redis/redis.conf`

```ini
# Allow connections from all IPs (or specific IP)
bind 0.0.0.0

# Disable protected mode (or use password)
protected-mode no

# OPTIONAL: Password authentication
requirepass your_password

# Max memory (recommended for production)
maxmemory 256mb
maxmemory-policy allkeys-lru
```

**Restart Redis:**

```bash
sudo systemctl restart redis-server
```

### Firewall

```bash
# Ubuntu/Debian
sudo ufw allow 6379/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

---

## CobbleRanked Configuration

### config.yaml

```yaml
crossServer:
  enabled: true
  serverId: "server1"
  battleServer: "battle"

  redis:
    host: "192.168.1.100"
    port: 6379
    password: ""
    database: 0
    useSsl: false
```

| Field | Default | Description |
|-------|---------|-------------|
| `host` | `"localhost"` | Redis server IP address |
| `port` | `6379` | Redis port |
| `password` | `""` | Redis password (empty if none) |
| `database` | `0` | Redis database number (0-15) |
| `useSsl` | `false` | Enable SSL/TLS connection |

> ⚠️ **Important:** All CobbleRanked servers must use the same `database` number!

---

## Configuration Examples

<details>
<summary><strong>Local Redis (Same Machine)</strong></summary>

```yaml
crossServer:
  enabled: true
  serverId: "server1"
  battleServer: ""

  redis:
    host: "localhost"
    port: 6379
    password: ""
    database: 0
    useSsl: false
```

</details>

<details>
<summary><strong>Remote Redis with Password</strong></summary>

```yaml
crossServer:
  enabled: true
  serverId: "lobby1"
  battleServer: "battle"

  redis:
    host: "192.168.1.100"
    port: 6379
    password: "your_secure_password"
    database: 0
    useSsl: false
```

</details>

<details>
<summary><strong>Redis with SSL (Cloud Hosted)</strong></summary>

```yaml
crossServer:
  enabled: true
  serverId: "lobby1"
  battleServer: "battle"

  redis:
    host: "redis.example.com"
    port: 6380
    password: "cloud_password"
    database: 0
    useSsl: true
```

</details>

---

## Testing Connection

### Test Basic Connection

```bash
redis-cli -h REDIS_IP -p 6379 PING
```

**Expected:** `PONG`

### Test with Password

```bash
redis-cli -h REDIS_IP -p 6379 -a your_password PING
```

### Monitor Activity

```bash
redis-cli MONITOR
```

Shows real-time Redis commands (useful for debugging CobbleRanked communication).

### Check CobbleRanked Keys

```bash
redis-cli KEYS "cobbleranked:*"
```

Shows all CobbleRanked-related keys in Redis.

---

## Redis Data Structure

CobbleRanked uses the following Redis key patterns:

| Key Pattern | Purpose | TTL |
|-------------|---------|-----|
| `cobbleranked:queue:{format}` | Queue data per format | - |
| `cobbleranked:match:{matchId}` | Active match state | 10min |
| `cobbleranked:server:{serverId}` | Server heartbeat | 30s |
| `cobbleranked:season:current` | Current season cache | 60s |
| `cobbleranked:player:{uuid}` | Player state | varies |

---

## Multiple Databases

Redis supports 16 databases (0-15). Use different databases for different purposes:

```yaml
redis:
  database: 0  # CobbleRanked
```

**Recommended Setup:**

| Database | Purpose |
|----------|---------|
| 0 | CobbleRanked |
| 1 | Other plugins |
| 2-15 | Reserved |

> 📝 **Note:** All CobbleRanked servers must use the same database number!

---

## Performance Tuning

Redis is extremely fast for CobbleRanked's use case. Default settings work well for most servers.

### Recommended Settings

**For Small Servers (< 50 players):**

```ini
maxmemory 128mb
```

**For Medium Servers (50-200 players):**

```ini
maxmemory 256mb
```

**For Large Servers (200+ players):**

```ini
maxmemory 512mb
```

### Monitoring

```bash
# Check Redis info
redis-cli INFO

# Check memory usage
redis-cli INFO memory

# Check connected clients
redis-cli CLIENT LIST
```

---

## High Availability

### Redis Sentinel (Recommended for Production)

For production environments, use Redis Sentinel for automatic failover:

```yaml
# Not directly supported in CobbleRanked config
# Use a Redis proxy like HAProxy or Envoy
```

### Redis Cluster

CobbleRanked does not currently support Redis Cluster mode. Use a single Redis instance or Sentinel setup.

---

## Security Best Practices

| Practice | Description |
|----------|-------------|
| Use password | Always set `requirepass` in production |
| Limit access | Bind to specific IPs, not `0.0.0.0` |
| Use firewall | Only allow Minecraft server IPs |
| Separate network | Use private network between servers |
| Regular backups | Enable RDB/AOF persistence if needed |

### Example Secure Configuration

```ini
# /etc/redis/redis.conf
bind 192.168.1.100  # Only this IP
protected-mode yes
requirepass strong_password_here
maxmemory 256mb
maxmemory-policy allkeys-lru
```

---

## See Also

- [Cross-Server Setup](cross-server.md) - Complete multi-server guide
- [Database Configuration](database.md) - Database setup (MySQL/SQLite/MongoDB)
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
