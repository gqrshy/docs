# Cross-Server Setup

Configure CobbleRanked to work across multiple Minecraft servers in a network.

## Overview

Cross-server mode allows players on different servers to compete together in a unified ranked system. Benefits include:

- **Queue from anywhere** - Join queue from lobby, main servers, or battle server
- **Centralized battles** - All battles occur on dedicated battle server
- **Shared rankings** - Network-wide leaderboards and Elo ratings
- **Scalability** - Distribute load across multiple servers
- **Better matchmaking** - Larger player pool for faster queues

**Architecture:**
```
Players → [Lobby Server] → [Velocity Proxy] → [Battle Server]
          [Main Server 1]                            ↓
          [Main Server 2]                      [MySQL + Redis]
                                              (Shared Data)
```

---

## Requirements

### Software Requirements

| Component | Version | Purpose |
|-----------|---------|---------|
| **Velocity Proxy** | Latest | Server switching (BungeeCord also works) |
| **MySQL** | 8.0+ | Shared player data, rankings |
| **Redis** | 6.0+ | Real-time queue synchronization |
| **CobbleRanked** | Latest | On all servers |

### Server Requirements

**Minimum 2 servers:**
- 1 Battle Server (handles battles, season management)
- 1+ Lobby/Main Server (queue only, redirect players)

**Recommended 3+ servers:**
- 1 Battle Server
- 1 Lobby Server (spawn/hub)
- 1+ Main/Survival Servers

---

## Architecture Overview

### Server Roles

#### Battle Server

**Purpose:** Handle all ranked battles and season management

**Configuration:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle1",
    "battle_server": ""  // Empty = this IS battle server
  }
}
```

**Responsibilities:**
- Execute ranked battles
- Manage matchmaking
- Rotate seasons automatically
- Distribute season rewards
- Save battle results to MySQL

**Players:**
- Transferred here when match found
- Returned to origin server after battle

#### Lobby/Main Servers

**Purpose:** Allow queuing, display stats, redirect to battle server

**Configuration:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "lobby1",  // Unique per server
    "battle_server": "battle1"  // Points to battle server
  }
}
```

**Responsibilities:**
- Display ranked GUI
- Accept queue joins
- Show leaderboards/stats
- Transfer players to battle server

**Players:**
- Can queue from here
- View stats/leaderboards
- Transferred to battle server for battles

---

## Database Setup (MySQL)

### Why MySQL?

- **Shared data** across all servers
- **Real-time updates** to Elo, wins, losses
- **Persistent storage** survives server restarts
- **Scalability** handles thousands of players

### Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
```

**CentOS/RHEL:**
```bash
sudo yum install mysql-server
```

**Windows:**
- Download MySQL installer from mysql.com
- Run installer, follow setup wizard

**Start MySQL:**
```bash
sudo systemctl start mysql
sudo systemctl enable mysql  # Auto-start on boot
```

### Database Creation

**1. Login to MySQL:**
```bash
mysql -u root -p
```

**2. Create database and user:**
```sql
-- Create database
CREATE DATABASE cobbleranked
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Create user (replace password!)
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_secure_password';

-- Grant permissions
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';

-- Apply changes
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

**Explanation:**
- `cobbleranked` - Database name
- `cobbleranked`@`%` - User accessible from any IP
- Replace `your_secure_password` with strong password!

### Remote Access Configuration

**1. Edit MySQL config:**
```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

**2. Change bind-address:**
```ini
[mysqld]
# OLD: bind-address = 127.0.0.1
bind-address = 0.0.0.0  # Allow all IPs
```

**3. Restart MySQL:**
```bash
sudo systemctl restart mysql
```

**4. Configure firewall:**
```bash
# Ubuntu/Debian (ufw)
sudo ufw allow 3306/tcp

# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload
```

### Test Connection

From each Minecraft server machine:

```bash
mysql -u cobbleranked -p -h MYSQL_SERVER_IP cobbleranked
```

**Expected:**
- Prompts for password
- Connects to database
- Shows `mysql>` prompt

**If fails:**
- Check firewall allows port 3306
- Verify credentials correct
- Ensure MySQL running: `systemctl status mysql`

---

## Redis Setup

### Why Redis?

- **Real-time sync** of queue data
- **Pub/Sub messaging** between servers
- **Fast** in-memory data store
- **Lightweight** minimal overhead

### Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install redis-server
```

**CentOS/RHEL:**
```bash
sudo yum install redis
```

**Windows:**
- Download Redis from redis.io
- Extract and run `redis-server.exe`

**Start Redis:**
```bash
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

### Configuration

**1. Edit Redis config:**
```bash
sudo nano /etc/redis/redis.conf
```

**2. Configure network access:**
```ini
# Allow connections from all IPs
bind 0.0.0.0

# Disable protected mode (or set password)
protected-mode no

# OPTIONAL: Set password for security
requirepass your_redis_password
```

**3. Restart Redis:**
```bash
sudo systemctl restart redis-server
```

**4. Configure firewall:**
```bash
# Ubuntu/Debian
sudo ufw allow 6379/tcp

# CentOS/RHEL
sudo firewall-cmd --permanent --add-port=6379/tcp
sudo firewall-cmd --reload
```

### Test Connection

```bash
redis-cli -h REDIS_SERVER_IP -p 6379 PING
```

**Expected response:** `PONG`

**With password:**
```bash
redis-cli -h REDIS_SERVER_IP -p 6379 -a your_redis_password PING
```

---

## Server Configuration

### Battle Server Config

**File:** `config/cobbleranked/config.json5` on battle server

```json5
{
  "cross_server": {
    "enabled": true,

    // Unique ID for this server
    "server_id": "battle1",

    // Empty string = THIS IS BATTLE SERVER
    "battle_server": "",

    // MySQL Configuration
    "mysql": {
      "host": "192.168.1.100",  // MySQL server IP
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_secure_password",

      // Connection pool settings (advanced)
      "connection_pool": {
        "maximum_pool_size": 10,
        "minimum_idle": 5,
        "maximum_lifetime": 1800000,
        "connection_timeout": 5000
      }
    },

    // Redis Configuration
    "redis": {
      "host": "192.168.1.100",  // Redis server IP
      "port": 6379,
      "password": "",  // Leave empty if no password
      "database": 0
    }
  }
}
```

### Lobby Server Config

**File:** `config/cobbleranked/config.json5` on lobby server

```json5
{
  "cross_server": {
    "enabled": true,

    // Unique ID for this server (MUST BE UNIQUE!)
    "server_id": "lobby1",

    // Points to battle server (MUST MATCH battle server's server_id!)
    "battle_server": "battle1",

    // Same MySQL as battle server
    "mysql": {
      "host": "192.168.1.100",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_secure_password",

      "connection_pool": {
        "maximum_pool_size": 10,
        "minimum_idle": 5,
        "maximum_lifetime": 1800000,
        "connection_timeout": 5000
      }
    },

    // Same Redis as battle server
    "redis": {
      "host": "192.168.1.100",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

### Multiple Main Servers

**main1 config:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // Unique!
    "battle_server": "battle1",
    // ... same mysql/redis as above
  }
}
```

**main2 config:**
```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main2",  // Different!
    "battle_server": "battle1",
    // ... same mysql/redis as above
  }
}
```

**Key points:**
- Each server needs unique `server_id`
- All servers point to same `battle_server`
- All servers use same MySQL/Redis connection info

---

## Velocity/BungeeCord Configuration

### Velocity Setup

**1. Register servers in `velocity.toml`:**

```toml
[servers]
lobby = "127.0.0.1:25565"
main1 = "127.0.0.1:25566"
main2 = "127.0.0.1:25567"
battle1 = "127.0.0.1:25568"

try = [
  "lobby"
]
```

**2. Ensure server IDs match:**
- CobbleRanked `server_id` = Velocity server name
- Example: `"server_id": "battle1"` matches `battle1 = "..."`

**3. Player connection plugin:**
- Install on all Minecraft servers
- Recommended: FabricProxy-Lite (Fabric) or similar

### BungeeCord Setup

**1. Register servers in `config.yml`:**

```yaml
servers:
  lobby:
    address: 127.0.0.1:25565
  main1:
    address: 127.0.0.1:25566
  main2:
    address: 127.0.0.1:25567
  battle1:
    address: 127.0.0.1:25568
```

**2. Same rules as Velocity:**
- Server IDs must match
- Player connection plugin required

---

## How Cross-Server Works

### Queue Flow

**1. Player on Lobby joins queue:**
```
Player → [Lobby Server]
         ↓
         Sends queue data to Redis
         ↓
         [Battle Server] detects queue via Redis
```

**2. Matchmaking:**
```
[Battle Server] checks Redis for 2+ players in queue
↓
Match found!
↓
Send transfer command via Redis
↓
[Lobby Server] receives transfer command
↓
Transfers player to battle server via Velocity
```

**3. Battle:**
```
Both players on [Battle Server]
↓
Battle starts
↓
Battle completes
↓
Results saved to MySQL
↓
Players returned to original servers
```

### Data Synchronization

**Real-time (via Redis):**
- Queue status (who's queuing, which format)
- Match found notifications
- Player transfer commands
- Server heartbeats

**Persistent (via MySQL):**
- Player Elo ratings
- Win/loss records
- Season data
- Milestone progress
- Reward claims

---

## Battle Server Singleton Pattern

### CRITICAL: Only ONE Battle Server

**Why this matters:**

If multiple servers have `battle_server: ""`, **each will:**
- Initialize season manager independently
- Create duplicate season records
- Rotate seasons separately
- Distribute duplicate rewards
- Cause database conflicts

**Example of bad config:**

❌ **battle1 config:**
```json5
{
  "cross_server": {
    "server_id": "battle1",
    "battle_server": ""  // This is battle server
  }
}
```

❌ **battle2 config:**
```json5
{
  "cross_server": {
    "server_id": "battle2",
    "battle_server": ""  // WRONG! This is also battle server
  }
}
```

**Result:** Both servers manage seasons = chaos!

### Detection System

CobbleRanked detects multiple battle servers via Redis heartbeats:

**Error message:**
```
========================================
  CRITICAL ERROR: Multiple Battle Servers Detected!
========================================
[Season] This server: battle1 (battle_server: "")
[Season] Other battle servers detected:
[Season]   - battle2

[Season] This will cause DUPLICATE SEASON MANAGEMENT
[Season] FIX: Only ONE server should have battle_server: ""
========================================
```

**If you see this:**
1. Check ALL server configs
2. Only ONE should have `battle_server: ""`
3. All others should point to battle server name
4. Restart all servers

---

## Testing Cross-Server Setup

### 1. Test Database Connectivity

On each server:

```bash
mysql -u cobbleranked -p -h MYSQL_IP cobbleranked
```

Should connect successfully.

### 2. Test Redis Connectivity

On each server:

```bash
redis-cli -h REDIS_IP -p 6379 PING
```

Should respond: `PONG`

### 3. Test Server Transfer

Manually test Velocity/BungeeCord:

```bash
/server battle1
```

Should transfer to battle server.

### 4. Test Queue Sync

**Player A on Lobby:**
```
/ranked → Join Singles queue
```

**Player B on Main1:**
```
/ranked → Join Singles queue
```

**Expected:**
- Both players transferred to battle server
- Battle starts

### 5. Check Database

After a battle:

```sql
mysql -u cobbleranked -p cobbleranked

SELECT * FROM player_ranked_stats;
```

Should show player data from both servers.

---

## Troubleshooting

### Players can't transfer to battle server

**Symptoms:**
- "Match Found!" but no transfer
- Stuck on lobby/main server

**Solutions:**

1. **Check Velocity/BungeeCord registration:**
   ```toml
   [servers]
   battle1 = "IP:PORT"  # Must exist
   ```

2. **Check server_id matches:**
   - CobbleRanked: `"server_id": "battle1"`
   - Velocity: `battle1 = "..."`
   - Must be identical!

3. **Check player connection plugin:**
   - FabricProxy-Lite or equivalent required
   - Verify installed on all servers

4. **Test manual transfer:**
   ```bash
   /server battle1
   ```
   If this works, CobbleRanked config is wrong.
   If this fails, Velocity/BungeeCord issue.

### MySQL connection failed

**Symptoms:**
- Console error: "Failed to connect to MySQL"

**Solutions:**

1. **Test connection:**
   ```bash
   mysql -u cobbleranked -p -h MYSQL_IP cobbleranked
   ```

2. **Check credentials:**
   - Username correct?
   - Password correct?
   - Database name correct?

3. **Check firewall:**
   ```bash
   telnet MYSQL_IP 3306
   ```
   Should connect. If not, firewall blocking.

4. **Check MySQL running:**
   ```bash
   systemctl status mysql
   ```

### Redis connection failed

**Symptoms:**
- Console error: "Failed to connect to Redis"
- Queue doesn't sync across servers

**Solutions:**

1. **Test connection:**
   ```bash
   redis-cli -h REDIS_IP -p 6379 PING
   ```

2. **Check Redis running:**
   ```bash
   systemctl status redis-server
   ```

3. **Check bind address:**
   - `redis.conf` should have `bind 0.0.0.0`

4. **Check firewall:**
   ```bash
   telnet REDIS_IP 6379
   ```

### Queue not syncing

**Symptoms:**
- Player on Server A can't match with Player on Server B

**Solutions:**

1. **Check Redis connection** on both servers
2. **Check same Redis database:**
   ```json5
   "redis": {
     "database": 0  // Must be same on all servers
   }
   ```

3. **Check server logs:**
   ```bash
   tail -f logs/latest.log | grep -i redis
   ```

4. **Restart all servers** after config changes

### Multiple battle servers error

**Symptoms:**
- Console: "CRITICAL ERROR: Multiple Battle Servers Detected!"

**Solution:**

1. **Check ALL configs:**
   ```bash
   grep -r "battle_server" config/cobbleranked/config.json5
   ```

2. **Only ONE should be empty:**
   - Battle server: `"battle_server": ""`
   - All others: `"battle_server": "battle1"`

3. **Restart all servers**

---

## Performance Optimization

### MySQL Connection Pool

Tune for your server count:

```json5
{
  "connection_pool": {
    "maximum_pool_size": 10,  // Max connections per server
    "minimum_idle": 5,         // Always keep 5 ready
    "maximum_lifetime": 1800000,  // 30 minutes
    "connection_timeout": 5000    // 5 seconds
  }
}
```

**Recommendations:**
- 2-3 servers: `maximum_pool_size: 10`
- 4-6 servers: `maximum_pool_size: 15`
- 7+ servers: `maximum_pool_size: 20`

### Redis Performance

Redis is very fast, no tuning usually needed.

**If experiencing lag:**
- Check Redis server resources (CPU, RAM)
- Consider dedicated Redis server
- Monitor with: `redis-cli INFO`

---

## Advanced Configuration

### Separate Battle Servers by Format

**Currently not supported**, but you can:
- Have 1 battle server for all formats
- Use load balancing at Velocity level

**Future feature:** Format-specific battle servers may be added.

### Database Sharding

**Currently not supported**, but for very large networks (10,000+ players):
- Use MySQL replication
- Read replicas for stats queries
- Write to master for Elo updates

---

## Backup & Maintenance

### Database Backups

**Daily backup:**
```bash
mysqldump -u cobbleranked -p cobbleranked > backup-$(date +%Y%m%d).sql
```

**Restore backup:**
```bash
mysql -u cobbleranked -p cobbleranked < backup-20251026.sql
```

### Redis Backups

Redis persists data automatically (RDB snapshots).

**Manual save:**
```bash
redis-cli SAVE
```

**Backup file:** `/var/lib/redis/dump.rdb`

---

**Next:** Learn about [Database Configuration](database.md) for advanced MySQL setup.
