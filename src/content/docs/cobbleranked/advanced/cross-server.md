---
title: Cross-Server Setup
description: Run CobbleRanked across multiple servers with unified rankings and queue.
---

Share rankings and matchmaking queue across your entire network.

## How It Works

CobbleRanked uses a **lobby/battle server architecture**:

1. **Lobby Servers** - Players join the matchmaking queue from any server in your network
2. **Battle Server** - A dedicated server where all ranked battles take place
3. **Redis** - Synchronizes the queue across all servers in real-time
4. **Database** - Stores rankings, stats, and match history (shared by all servers)

When two players are matched, they are transferred to the battle server via Velocity, complete their battle, and return to their original servers.

> **Important: Pokemon Data Sync**
>
> CobbleRanked does **NOT** sync Cobblemon Pokemon data between servers. You need a separate solution (such as a shared database for Cobblemon, or a sync mod) to ensure players have access to the same Pokemon across your network.
>
> CobbleRanked only syncs: Rankings, Match History, Queue State, Season Data

---

## Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| MySQL | 8.0+ | Shared database (Option 1) |
| MongoDB | 6.0+ | Shared database (Option 2) |
| Redis | 6.0+ | Queue synchronization |
| Velocity | 3.4.0+ | Player transfer between servers |

---

## Architecture

![Cross-Server Architecture](../../../../assets/images/cross-server-architecture.jpg)

---

## Setup Steps

### 1. Install Redis

Redis handles real-time queue synchronization between servers.

**Linux (Ubuntu/Debian):**

```bash
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Docker:**

```bash
docker run -d -p 6379:6379 --name redis redis:latest
```

**Verify Installation:**

```bash
redis-cli PING
# Should return: PONG
```

### 2. Configure Database

All servers must connect to the same database. See [Database Configuration](/docs/cobbleranked/advanced/database/) for detailed MySQL/MongoDB setup.

### 3. Configure Battle Server

The battle server is where all ranked battles take place. Only one server should be configured as the battle server.

```yaml
# config.yaml on Battle Server
crossServer:
  enabled: true
  serverId: "battle"
  battleServer: ""  # Empty string = this IS the battle server

  redis:
    host: "your-redis-host"
    port: 6379
    password: ""
    database: 0
    useSsl: false

  timing:
    matchFoundDelaySeconds: 5
    battleStartDelaySeconds: 10
    playerArrivalTimeoutSeconds: 30

database:
  type: "mysql"  # or "mongodb"

  mysql:
    host: "your-database-host"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_password"
    pool:
      maxSize: 10
      minIdle: 2
```

### 4. Configure Lobby Servers

Lobby servers handle queue joining. Players can join the queue from any lobby server.

```yaml
# config.yaml on Lobby Server
crossServer:
  enabled: true
  serverId: "lobby1"      # Must be unique for each lobby!
  battleServer: "battle"  # Name of the battle server in Velocity

  redis:
    host: "your-redis-host"  # Same as battle server
    port: 6379
    password: ""

database:
  type: "mysql"  # Same as battle server

  mysql:
    host: "your-database-host"  # Same as battle server
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_password"
```

### 5. Configure Velocity

Add all servers to your `velocity.toml`:

```toml
[servers]
lobby1 = "127.0.0.1:25566"
lobby2 = "127.0.0.1:25567"
battle = "127.0.0.1:25568"

try = ["lobby1"]
```

> **Note:** The server names in Velocity must match the `serverId` and `battleServer` values in your CobbleRanked configs.

---

## Server ID Reference

Each server needs a **unique** `serverId`. The `battleServer` field should be empty on the battle server itself, and set to the battle server's name on lobby servers.

| Server | serverId | battleServer |
|--------|----------|--------------|
| Battle Server | `battle` | `""` (empty) |
| Lobby 1 | `lobby1` | `"battle"` |
| Lobby 2 | `lobby2` | `"battle"` |

---

## Player Flow

1. Player opens `/ranked` on any lobby server
2. Player joins the matchmaking queue
3. Queue state syncs to all servers via Redis
4. Match found → Both players transfer to battle server
5. Battle completes → Results saved to shared database
6. Players return to their original lobby servers

---

## See Also

- [Database Configuration](/docs/cobbleranked/advanced/database/) - MySQL/MongoDB setup details
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
