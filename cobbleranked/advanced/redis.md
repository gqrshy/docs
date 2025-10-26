# Redis Configuration

Configure Redis for cross-server real-time synchronization.

## Overview

Redis provides real-time communication between CobbleRanked servers for:
- **Queue synchronization** - Players on different servers can match
- **Matchmaking** - Battle server detects queued players instantly
- **Server heartbeats** - Monitor active servers
- **Player transfers** - Coordinate server switching

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
docker run -d -p 6379:6379 redis:latest
```

---

## Configuration

### Basic Setup

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

### config.json5

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

---

## Testing

### Test Connection

```bash
redis-cli -h REDIS_IP -p 6379 PING
```

**Expected:** `PONG`

### With Password

```bash
redis-cli -h REDIS_IP -p 6379 -a your_password PING
```

### Monitor Activity

```bash
redis-cli MONITOR
```

Shows real-time Redis commands (useful for debugging).

---

## Troubleshooting

### Connection refused

**Solutions:**
1. Check Redis running: `systemctl status redis-server`
2. Check bind address: `grep bind /etc/redis/redis.conf`
3. Check firewall: `telnet REDIS_IP 6379`

### Wrong password

```
(error) NOAUTH Authentication required
```

**Solution:** Provide password in config or remove `requirepass` from redis.conf

### Queue not syncing

**Symptoms:** Players on different servers can't match

**Solutions:**
1. Verify all servers use same Redis host/port
2. Check all servers use same `database` number
3. Test Redis connection from each server
4. Check server logs for Redis errors

---

## Advanced

### Multiple Databases

Redis supports 16 databases (0-15). Use different databases for different purposes:

```json5
{
  "redis": {
    "database": 0  // CobbleRanked uses database 0
  }
}
```

**Note:** All CobbleRanked servers must use same database!

### Performance

Redis is extremely fast. No tuning needed for typical usage.

**If experiencing lag:**
- Check Redis server resources (CPU, RAM)
- Use dedicated Redis server (not on Minecraft server)
- Monitor: `redis-cli INFO`

---

See [Cross-Server Setup](cross-server.md) for complete guide.
