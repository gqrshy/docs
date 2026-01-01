---
title: Cross-Server Setup
description: Run CobbleRanked across multiple servers.
---

Share rankings and queue across your entire network.

## Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| MySQL | 8.0+ | Shared database |
| Redis | 6.0+ | Queue synchronization |
| Velocity | 3.4.0+ | Player transfer |

## Architecture

```
┌─────────────┐     ┌─────────────┐
│   Lobby 1   │     │   Lobby 2   │
│  (Queue)    │     │  (Queue)    │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 │
         ┌───────▼───────┐
         │    Redis      │
         │  (Pub/Sub)    │
         └───────┬───────┘
                 │
         ┌───────▼───────┐
         │ Battle Server │
         │  (Battles)    │
         └───────┬───────┘
                 │
         ┌───────▼───────┐
         │    MySQL      │
         │  (Rankings)   │
         └───────────────┘
```

## Setup Steps

### 1. Install Redis

**Linux:**

```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Docker:**

```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

**Test:**

```bash
redis-cli PING
# Should return: PONG
```

### 2. Configure MySQL

See [Database Configuration](/advanced/database/) for MySQL setup.

### 3. Configure Battle Server

The battle server hosts actual battles.

```json5
{
  "crossServer": {
    "enabled": true,
    "serverId": "battle",
    "battleServer": ""  // Empty = this IS the battle server
  },
  "database": {
    "type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    }
  },
  "redis": {
    "enabled": true,
    "host": "localhost",
    "port": 6379,
    "password": ""
  }
}
```

### 4. Configure Lobby Servers

Lobby servers handle queuing.

```json5
{
  "crossServer": {
    "enabled": true,
    "serverId": "lobby1",     // Unique per server!
    "battleServer": "battle"  // Velocity server name
  },
  "database": {
    // Same as battle server
  },
  "redis": {
    // Same as battle server
  }
}
```

### 5. Configure Velocity

Add servers to `velocity.toml`:

```toml
[servers]
lobby1 = "127.0.0.1:25566"
lobby2 = "127.0.0.1:25567"
battle = "127.0.0.1:25568"

try = ["lobby1"]
```

## Server IDs

Each server needs a **unique** `serverId`:

| Server | serverId | battleServer |
|--------|----------|--------------|
| Battle | `battle` | `""` (empty) |
| Lobby 1 | `lobby1` | `"battle"` |
| Lobby 2 | `lobby2` | `"battle"` |

## Flow

1. Player opens `/ranked` on any lobby
2. Player joins queue
3. Queue syncs via Redis
4. Match found → Both players transfer to battle server
5. Battle completes → Results sync to MySQL
6. Players return to original server

## Troubleshooting

### Players not transferring

- Check Velocity server names match config
- Verify Redis connection
- Check battle server is online

### Queue not syncing

- Verify Redis is running: `redis-cli PING`
- Check all servers use same Redis config
- Check server logs for Redis errors

### Rankings not syncing

- Verify MySQL connection on all servers
- Check all servers use same database
- Verify tables exist

### "Server not found" errors

- Check `battleServer` matches Velocity server name exactly
- Verify battle server is registered in Velocity
