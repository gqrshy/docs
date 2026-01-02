---
title: Cross-Server Setup
description: Run CobbleRanked across multiple servers.
---

Share rankings and queue across your entire network.

## Requirements

| Component | Version | Purpose               |
|-----------|---------|---------------------- |
| MySQL     | 8.0+    | Shared database       |
| Redis     | 6.0+    | Queue synchronization |
| Velocity  | 3.4.0+  | Player transfer       |

## Architecture

```text
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
         │ MySQL/MongoDB │
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

### 2. Configure Database

See [Database Configuration](/docs/cobbleranked/advanced/database/) for MySQL/MongoDB setup.

### 3. Configure Battle Server

The battle server hosts actual battles.

```yaml
# config.yaml
crossServer:
  enabled: true
  serverId: "battle"
  battleServer: ""  # Empty = this IS the battle server

  redis:
    host: "localhost"
    port: 6379
    password: ""
    database: 0
    useSsl: false

  timing:
    matchFoundDelaySeconds: 5
    battleStartDelaySeconds: 10
    playerArrivalTimeoutSeconds: 30

database:
  type: "mysql"

  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_password"
    pool:
      maxSize: 10
      minIdle: 2
```

### 4. Configure Lobby Servers

Lobby servers handle queuing.

```yaml
# config.yaml
crossServer:
  enabled: true
  serverId: "lobby1"      # Unique per server!
  battleServer: "battle"  # Velocity server name

  redis:
    # Same as battle server
    host: "localhost"
    port: 6379
    password: ""

database:
  # Same as battle server
  type: "mysql"
  mysql:
    host: "localhost"
    port: 3306
    database: "cobbleranked"
    username: "cobbleranked"
    password: "your_password"
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

| Server  | serverId | battleServer |
|---------|----------|--------------|
| Battle  | `battle` | `""` (empty) |
| Lobby 1 | `lobby1` | `"battle"`   |
| Lobby 2 | `lobby2` | `"battle"`   |

## Flow

1. Player opens `/ranked` on any lobby
2. Player joins queue
3. Queue syncs via Redis
4. Match found → Both players transfer to battle server
5. Battle completes → Results sync to database
6. Players return to original server

---

## See Also

- [Database Configuration](/docs/cobbleranked/advanced/database/) - Database setup
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
