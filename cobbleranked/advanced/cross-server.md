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
| **Velocity** | 3.3.0+ | Proxy server for server switching |
| **MySQL or MongoDB** | 8.0+ / 6.0+ | Shared player data |
| **Redis** | 6.0+ | Real-time queue sync |
| **CobbleRanked** | Latest | On all Fabric servers |

**Minimum:** 2 servers (1 battle + 1 lobby/main)
**Recommended:** 3+ servers (1 battle + 1 lobby + 1+ main)

**Database Options:**
- **MySQL**: Traditional relational database (recommended for 2-5 servers)
- **MongoDB**: NoSQL database (recommended for 5+ servers or cloud deployments)

### Required Mods & Plugins

#### Velocity Proxy (plugins folder)
- **[ProxyCommand Reloaded](https://modrinth.com/plugin/proxy-command-reloaded)** - Enable cross-server commands and player transfers

#### Fabric Servers (mods folder)
All backend servers (lobby, main, battle) need these mods:
- **[CrossStitch](https://modrinth.com/mod/crossstitch)** - Velocity support for Fabric
- **[FabricProxy-Lite](https://modrinth.com/mod/fabricproxy-lite)** - Proxy protocol support
- **[Placeholder API](https://modrinth.com/mod/placeholder-api)** - Required for CobbleRanked (version 2.4.2+1.21+)
- **[CobbleRanked](https://modrinth.com/mod/cobbleranked)** - This mod
- **[Cobblemon](https://modrinth.com/mod/cobblemon)** - 1.6.1+ required

---

## Velocity Proxy Setup for Fabric

This section covers the complete setup process for connecting Fabric servers through Velocity proxy.

### Step 1: Install Velocity Proxy

1. **Download Velocity**
   - Get the latest version from [PaperMC](https://papermc.io/downloads/velocity)
   - Recommended: Velocity 3.3.0 or newer

2. **Run Velocity once to generate config**
   ```bash
   java -Xms512M -Xmx512M -jar velocity.jar
   ```

3. **Stop Velocity** after config generation (Ctrl+C)

### Step 2: Configure Velocity

Edit `velocity.toml`:

```toml
# Server connection configuration
bind = "0.0.0.0:25577"  # Proxy listens on this port (players connect here)
motd = "&3My Cobblemon Network"

# Player info forwarding (REQUIRED for Fabric)
[player-info-forwarding]
mode = "modern"  # Use "modern" for Fabric 1.21+
secret = "your-secret-key-here"  # Generate a random string (32+ characters)

# Backend servers
[servers]
lobby = "127.0.0.1:25565"    # Lobby server
main1 = "127.0.0.1:25566"    # Main survival server
battle = "127.0.0.1:25567"   # Battle server

# Default server when players join
try = ["lobby"]

# Forced hosts (optional - different domains route to different servers)
[forced-hosts]
"play.example.com" = ["lobby"]
"battle.example.com" = ["battle"]
```

**Important Notes:**
- `secret` must be a unique random string (use a password generator)
- Server names must match CobbleRanked `server_id` and `battle_server` values
- All servers must be on the same machine or accessible via LAN/VPN
- `mode = "modern"` is required for Fabric 1.20.1+ servers

### Step 3: Install Velocity Plugins

1. **Download ProxyCommand Reloaded**
   - Get from [Modrinth](https://modrinth.com/plugin/proxy-command-reloaded)
   - Place in `velocity/plugins/` folder

2. **Restart Velocity**
   ```bash
   java -Xms512M -Xmx512M -jar velocity.jar
   ```

**What ProxyCommand does:**
- Enables `/server <name>` command for players
- Allows CobbleRanked to transfer players between servers
- Provides admin commands for server management

### Step 4: Configure Fabric Servers

Each Fabric server needs special configuration for Velocity compatibility.

#### Install Required Mods

Place these mods in the `mods/` folder of **EVERY** Fabric server:

1. **CrossStitch** ([Modrinth](https://modrinth.com/mod/crossstitch))
   - Enables Velocity modern forwarding support
   - Required for player authentication through proxy

2. **FabricProxy-Lite** ([Modrinth](https://modrinth.com/mod/fabricproxy-lite))
   - Handles proxy protocol and player data
   - Prevents players from bypassing proxy

3. **Placeholder API 2.4.2+1.21** ([Modrinth](https://modrinth.com/mod/placeholder-api))
   - Required dependency for CobbleRanked
   - Provides placeholder system for GUI and messages

4. **Cobblemon 1.6.1+** ([Modrinth](https://modrinth.com/mod/cobblemon))
   - The Pokemon mod this is built for
   - Must be same version across all servers

5. **CobbleRanked** (this mod)

#### Configure Each Fabric Server

Edit `config/fabricproxy-lite.toml` on **EVERY** Fabric server:

```toml
# Must match Velocity's player-info-forwarding section
[proxy]
# Connection secret - MUST MATCH velocity.toml secret
secret = "your-secret-key-here"  # Same as Velocity
```

**CRITICAL:** The `secret` value must **exactly match** the one in `velocity.toml`. If they don't match, players cannot join.

Edit `server.properties` on **EVERY** Fabric server:

```properties
# Prevent direct connections (force players through proxy)
online-mode=false  # REQUIRED when using Velocity

# Server port (each server needs unique port)
server-port=25565  # Lobby: 25565, Main: 25566, Battle: 25567

# Prevent IP forwarding conflicts
prevent-proxy-connections=false
```

### Step 5: Configure Firewall

**IMPORTANT:** Secure your backend servers so players can't bypass the proxy.

```bash
# Allow only localhost and proxy IP to connect to backend servers
# Example using UFW (Ubuntu):

# Lobby server (port 25565)
sudo ufw allow from 127.0.0.1 to any port 25565
sudo ufw allow from YOUR_PROXY_IP to any port 25565

# Main server (port 25566)
sudo ufw allow from 127.0.0.1 to any port 25566
sudo ufw allow from YOUR_PROXY_IP to any port 25566

# Battle server (port 25567)
sudo ufw allow from 127.0.0.1 to any port 25567
sudo ufw allow from YOUR_PROXY_IP to any port 25567

# Proxy port (publicly accessible)
sudo ufw allow 25577/tcp
```

If all servers are on the same machine (localhost), you only need:
```bash
sudo ufw allow 25577/tcp  # Only the proxy port is public
```

### Step 6: Start Servers in Order

1. **Start backend Fabric servers first**
   ```bash
   # Terminal 1 - Lobby
   cd lobby-server
   ./start.sh

   # Terminal 2 - Main
   cd main-server
   ./start.sh

   # Terminal 3 - Battle
   cd battle-server
   ./start.sh
   ```

2. **Wait for all Fabric servers to fully load** (check logs for "Done")

3. **Start Velocity proxy**
   ```bash
   # Terminal 4 - Proxy
   cd velocity
   java -Xms512M -Xmx512M -jar velocity.jar
   ```

4. **Verify connection in Velocity console:**
   ```
   [INFO]: Loaded 3 plugins
   [INFO]: lobby - successfully connected
   [INFO]: main1 - successfully connected
   [INFO]: battle - successfully connected
   ```

### Step 7: Test the Setup

1. **Connect to the proxy** (port 25577, not individual servers)
   ```
   minecraft.example.com:25577
   ```

2. **Test server switching:**
   ```
   /server battle
   /server lobby
   ```

3. **Test CobbleRanked:**
   - Open `/ranked` GUI on lobby
   - Join queue
   - When matched, you should auto-transfer to battle server

### Performance Tips

**Velocity JVM Flags** (for 50+ players):
```bash
java -Xms1G -Xmx1G \
  -XX:+UseG1GC \
  -XX:G1HeapRegionSize=4M \
  -XX:+UnlockExperimentalVMOptions \
  -XX:+ParallelRefProcEnabled \
  -XX:+AlwaysPreTouch \
  -jar velocity.jar
```

**Network Optimization** (edit `velocity.toml`):
```toml
[advanced]
compression-threshold = 256
compression-level = -1  # Use fastest compression
login-ratelimit = 3000
```

### Additional Resources

**Detailed Japanese Guide (Fabric + Velocity):**
- [Fabricサーバー複数台構成 (とことん日記)](https://tokoton0ch.com/2023/12/03/post-4983/)
- Comprehensive guide covering Velocity proxy setup with Fabric servers
- Includes CrossStitch and FabricProxy-Lite configuration
- Step-by-step troubleshooting for common issues

**Official Documentation:**
- [Velocity Documentation](https://docs.papermc.io/velocity)
- [CrossStitch GitHub](https://github.com/VelocityPowered/CrossStitch)
- [FabricProxy-Lite Modrinth](https://modrinth.com/mod/fabricproxy-lite)

---

## Quick Start

### 1. Install Database & Redis

**Choose ONE database:**

#### Option A: MySQL
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

#### Option B: MongoDB (Local)
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

#### Option C: MongoDB Atlas (Cloud)
1. Create free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add server IP to whitelist
4. No local installation needed!

**Redis (Required for all options):**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
```

See [Database Setup](database.md) and [Redis Setup](redis.md) for details.

---

### 2. Configure Battle Server

`config/cobbleranked/config.json5`:

**MySQL:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": "",  // Empty = this IS battle server
    "database_type": "mysql",

    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "password"
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

**MongoDB (Local):**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": "",
    "database_type": "mongodb",

    "mongodb": {
      "connection_string": "mongodb://localhost:27017",
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "secure_password",
      "auth_database": "admin",
      "use_srv": false
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

**MongoDB Atlas (Cloud):**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": "",
    "database_type": "mongodb",

    "mongodb": {
      "connection_string": "cluster0.xxxxx.mongodb.net",
      "database": "cobbleranked",
      "username": "your-username",
      "password": "your-password",
      "auth_database": "admin",
      "use_srv": true  // Important!
    },

    "redis": {
      "host": "localhost",
      "port": 6379
    }
  }
}
```

---

### 3. Configure Lobby/Main Servers

`config/cobbleranked/config.json5`:

**Same as battle server**, but change:
- `"server_id"`: Unique name (e.g., `"lobby1"`, `"main1"`)
- `"battle_server"`: `"battle1"` (points to battle server)

All other settings (database, redis) must match battle server exactly.

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

### 1. Test Database Connection

**MySQL:**
```bash
mysql -h MYSQL_HOST -u cobbleranked -p cobbleranked
SHOW TABLES;
```

**MongoDB:**
```bash
mongosh "mongodb://cobbleranked:password@MONGO_HOST:27017/cobbleranked"
show collections
```

Should see: `format_stats`, `seasons`, etc.

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

## See Also

- [FAQ & Troubleshooting](../support/faq.md) - Common issues and solutions
- [Database Setup](database.md) - MySQL and MongoDB configuration
- [Redis Setup](redis.md) - Redis configuration and management

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

**MongoDB:**
```bash
mongodump --db cobbleranked --out /backup/$(date +%Y%m%d)
```

**MongoDB Atlas:**
- Automatic cloud backups (included in free tier)
- Configure in Atlas dashboard

**Redis:**
```bash
redis-cli SAVE
# Backup file: /var/lib/redis/dump.rdb
```

---

**Related:** [Database Setup](database.md) · [Redis Setup](redis.md) · [Season Management](../features/seasons.md)
