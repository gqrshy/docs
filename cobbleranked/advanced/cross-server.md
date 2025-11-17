# Cross-Server Setup

---
**CobbleRanked** > **Advanced** > **Cross-Server**
---

Run CobbleRanked across multiple servers with shared rankings.

## Architecture

> **[📸 IMAGE NEEDED: クロスサーバーアーキテクチャ図（Velocityプロキシ、複数のロビー/メインサーバー、バトルサーバー、共有DB/Redis構成）]**

**Servers:**
- **Battle Server** - Hosts all ranked battles
- **Lobby/Main Servers** - Players queue here, transfer to battle server

**Required Components:**
- Velocity proxy (3.3.0+)
- MySQL or MongoDB (shared database)
- Redis (real-time queue sync)

## Installation

### 1. Velocity Proxy Setup

**Plugin:** [ProxyCommand Reloaded](https://modrinth.com/plugin/proxy-command-reloaded)

### 2. Fabric Server Mods

Install on **all** servers (lobby, main, battle):

- [CrossStitch](https://modrinth.com/mod/crossstitch)
- [FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)
- [Placeholder API](https://modrinth.com/mod/placeholder-api) (2.4.2+1.21+)
- [Cobblemon](https://modrinth.com/mod/cobblemon) (1.6.1+)
- [CobbleRanked](https://modrinth.com/mod/cobbleranked)

### 3. Database Setup

**MySQL:**
```sql
CREATE DATABASE cobbleranked;
CREATE USER 'ranked'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'ranked'@'%';
```

**MongoDB:**
```javascript
use cobbleranked
db.createUser({user: "ranked", pwd: "password", roles: ["readWrite"]})
```

### 4. Redis Setup

**Linux:**
```bash
sudo apt install redis-server
sudo systemctl start redis
```

**Docker:**
```bash
docker run -d -p 6379:6379 redis:alpine
```

## Configuration

### Battle Server

**File:** `config/cobbleranked/config.json5`

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // Empty = this IS the battle server
    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": ""
    }
  },
  "database_type": "mysql",  // or "mongodb"
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

### Lobby/Main Servers

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // or "lobby", "main2", etc.
    "battle_server": "battle",  // Transfer target
    "redis": {
      "host": "localhost",
      "port": 6379
    }
  },
  "database_type": "mysql",
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "ranked",
    "password": "password"
  }
}
```

## Key Differences

| Setting | Battle Server | Lobby/Main |
|---------|---------------|------------|
| `server_id` | `"battle"` | `"main1"`, `"lobby"`, etc. |
| `battle_server` | `""` (empty) | `"battle"` |
| Global features | ✅ Manages | ❌ Read-only |

## Testing

1. Start all servers
2. Queue from lobby: `/ranked`
3. Accept match when found
4. Verify transfer to battle server
5. Check stats sync after battle

## Troubleshooting

**Players not transferring:**
- Check Velocity `velocity.toml` has correct server names
- Verify ProxyCommand Reloaded is installed

**Stats not syncing:**
- Check MySQL/MongoDB connection on all servers
- Verify Redis is running: `redis-cli ping` → `PONG`

**Duplicate battle servers:**
- Only one server should have `battle_server: ""`
- Check logs for `SEVERE` errors about duplicate battle servers

## Advanced

### Multiple Battle Servers (Load Balancing)

Not currently supported. Use one dedicated battle server.

### Database Connection Pool

Increase for high traffic:

```json5
"mysql": {
  "connection_pool": {
    "maximum_pool_size": 50,
    "minimum_idle": 20
  }
}
```

---

## Next Steps

### For Setup
1. **[Velocity Proxy Setup](#1-velocity-proxy-setup)** - Configure proxy
2. **[Database Setup](#3-database-setup)** - MySQL or MongoDB
3. **[Redis Setup](#4-redis-setup)** - Real-time communication

### For Configuration
1. **[Battle Server Config](#battle-server)** - Set up main battle server
2. **[Lobby Server Config](#lobbymain-servers)** - Configure queue servers
3. **[Key Differences Table](#key-differences)** - Understand server roles

### For Troubleshooting
1. **[Testing Checklist](#testing)** - Verify cross-server works
2. **[Common Issues](#troubleshooting)** - Fix transfer and sync problems
3. **[FAQ Cross-Server](../support/faq.md#cross-server)** - Frequently asked questions

---

## Related Pages
- [Database Configuration](database.md) - MySQL/MongoDB/Redis setup
- [Installation Guide](../getting-started/installation.md#cross-server-setup-advanced) - Prerequisites
- [Troubleshooting](../support/troubleshooting.md#cross-server-issues) - Cross-server problems
