# Installation

This guide will walk you through installing CobbleRanked on your Minecraft server.

## Prerequisites

Before installing CobbleRanked, ensure your server meets these requirements:

### Required Software

| Software | Version | Download |
|----------|---------|----------|
| **Minecraft** | 1.21.1 | [minecraft.net](https://www.minecraft.net) |
| **Fabric Loader** | 0.17.2+ | [fabricmc.net](https://fabricmc.net/use/server/) |
| **Fabric API** | 0.116.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-api) |
| **Cobblemon** | 1.7.0+ | [Modrinth](https://modrinth.com/mod/cobblemon) |
| **Fabric Language Kotlin** | 1.13.6+ | [CurseForge](https://www.curseforge.com/minecraft/mc-mods/fabric-language-kotlin) |

### Optional (For Cross-Server)

Cross-server setup requires additional infrastructure:

| Software | Version | Purpose |
|----------|---------|---------|
| **MySQL** | 8.0+ | Player data, stats, seasons (shared across servers) |
| **Redis** | 6.0+ | Real-time queue, matchmaking, messaging (pub/sub) |
| **Velocity** | 3.4.0+ | Proxy for server transfers |

See [Cross-Server Setup Guide](../advanced/cross-server.md) for detailed instructions.

## Installation Steps

### 1. Download CobbleRanked

Download the latest release from:
- **[Discord Server](https://discord.gg/VVVvBTqqyP)** (currently the only official source)
- Modrinth _(coming soon)_
- CurseForge _(coming soon)_

### 2. Install the Mod

1. **Stop your server** if it's running
2. Place `CobbleRanked-1.0.0.jar` in your server's `mods/` folder
3. Ensure all dependencies are installed in `mods/`:
   - `fabric-api-*.jar`
   - `cobblemon-*.jar`
   - `fabric-language-kotlin-*.jar`

### 3. Start the Server

Start your server for the first time. CobbleRanked will:
- Create configuration files in `config/cobbleranked/`
- Initialize the SQLite database (default)
- Generate default arenas, blacklist, and language files

### 4. Verify Installation

Check the server console for:

```
[CobbleRanked] Mod initialized successfully
[CobbleRanked] Configuration loaded
[CobbleRanked] Database initialized (SQLite)
[CobbleRanked] Season manager initialized
```

If you see these messages, installation was successful!

## File Structure

After first launch, you'll find these files:

```
config/cobbleranked/
├── config.json5          # Main configuration
├── blacklist.json5       # Pokemon/move/ability bans
├── arenas.json5          # Battle arena locations
├── rewards.json5         # Season & milestone rewards
├── gui/
│   ├── gui-enUs.json5    # English GUI
│   ├── gui-jaJp.json5    # Japanese GUI
│   ├── gui-ptBr.json5    # Portuguese GUI
│   └── gui-ruRu.json5    # Russian GUI
└── language/
    ├── en-Us.json5       # English messages
    ├── ja-Jp.json5       # Japanese messages
    ├── pt-Br.json5       # Portuguese messages
    └── ru-Ru.json5       # Russian messages
```

## Database Setup

### SQLite (Default)

No additional setup required. CobbleRanked uses SQLite by default, which stores data in:
```
config/cobbleranked/ranked.db
```

**Pros:**
- No configuration needed
- Works out of the box
- Perfect for single-server setups

**Cons:**
- Cannot share data across multiple servers

### MySQL (Cross-Server)

For cross-server setups, configure MySQL on **all servers**:

1. **Create a database (run once on MySQL server):**
```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

2. **Configure each server's [config.json5](../configuration/config.md#cross-server-configuration):**

**Battle Server (handles battles):**
```json5
"cross_server": {
  "enabled": true,
  "server_id": "battle",        // Unique ID for this server
  "battle_server": "",           // Empty = this is battle server
  "database": {
    "type": "MYSQL",
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "cobbleranked",
    "password": "your_password"
  }
}
```

**Lobby/Main Servers (redirect players):**
```json5
"cross_server": {
  "enabled": true,
  "server_id": "main1",         // Unique per server: "main1", "main2", etc.
  "battle_server": "battle",    // Must match battle server_id AND Velocity name
  "database": {
    "type": "MYSQL",
    "host": "localhost",
    "port": 3306,
    "database": "cobbleranked",
    "username": "cobbleranked",
    "password": "your_password"
  }
}
```

3. **Important: Only ONE battle server!**
   - ⚠️ Only one server should have `battle_server: ""`
   - All other servers must specify battle server name
   - Multiple battle servers cause duplicate seasons

4. **Restart all servers**

## Redis Setup (Cross-Server)

For real-time cross-server queue sync, **all servers** must connect to the same Redis instance:

1. **Install Redis (run once on Redis server):**
```bash
# Ubuntu/Debian
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server

# Windows: Download from https://redis.io/download
# Or use WSL for testing
```

2. **Configure Redis for remote access (if needed):**
```bash
# Edit /etc/redis/redis.conf
bind 0.0.0.0  # Allow remote connections (security risk - use firewall!)
# requirepass your_secure_password  # Recommended for production
```

3. **Configure [config.json5](../configuration/config.md#redis-configuration) on ALL servers:**
```json5
"cross_server": {
  "redis": {
    "host": "localhost",       // Redis server IP (same for all servers)
    "port": 6379,
    "password": "",            // Leave empty if no password
    "database": 0              // Use database 0-15
  }
}
```

4. **Verify Redis connection:**
```bash
# On each Minecraft server
redis-cli -h localhost -p 6379 PING
# Should return: PONG
```

5. **Restart all servers**

**Redis Usage:**
- Queue data (sorted sets per format)
- Matchmaking coordination
- Ready state synchronization
- Server heartbeats (30s interval)
- Player origin tracking (TTL: 30 minutes)
- Transfer locks (TTL: 30 seconds)

## Verification Commands

### Single-Server Mode

Run these commands to verify installation:

```
/rankedadmin reload          # Reload all configs
/rankedadmin arena list      # View configured arenas
/rankedadmin season info     # Check current season
/ranked                      # Open ranked GUI
```

### Cross-Server Mode

**On each server, check logs for:**

**Battle Server:**
```
[CrossServer] Connected to MySQL
[CrossServer] Connected to Redis
[CrossServer] Server heartbeat started: battle
[SeasonManager] Initialized season manager
[CobbleRanked] Battle server ready
```

**Lobby/Main Servers:**
```
[CrossServer] Connected to MySQL
[CrossServer] Connected to Redis
[CrossServer] Server heartbeat started: main1
[CrossServer] Battle server: battle
[CobbleRanked] Lobby server ready
```

**Verify cross-server communication:**
```bash
# In Redis CLI
redis-cli
> KEYS cobbleranked:*
# Should show queue keys, heartbeat keys

> KEYS server_heartbeat:*
# Should show all connected servers
```

**Test matchmaking:**
1. Join queue on main1: `/ranked` → Join Queue → Select Format
2. Join queue on main2: `/ranked` → Join Queue → Same Format
3. Should match across servers within Elo range

## Troubleshooting

### Mod not loading

**Symptoms:** No CobbleRanked messages in console

**Solution:**
- Verify Fabric Loader is installed
- Check `mods/` folder for all dependencies
- Review `logs/latest.log` for errors

### Configuration not found

**Symptoms:** `Failed to load config.json5`

**Solution:**
- Stop server
- Delete `config/cobbleranked/` folder
- Restart server (configs will regenerate)

### Database connection failed

**Symptoms:** `Failed to connect to MySQL database`

**Solution:**
- Verify MySQL is running
- Check credentials in `config.json5`
- Ensure database exists
- Test connection: `mysql -u cobbleranked -p -h localhost cobbleranked`

### Permission errors

**Symptoms:** `You do not have permission to use this command`

**Solution:**
- Grant permissions using your permissions plugin
- Default permission: `cobbleranked.admin`
- See [Commands & Permissions](commands.md) for full list

### Cross-server players can't match

**Symptoms:** Players on different servers don't match

**Solution:**
1. **Verify MySQL shared across servers:**
   ```sql
   SELECT * FROM format_stats;
   # Should show players from all servers
   ```

2. **Verify Redis shared across servers:**
   ```bash
   redis-cli
   > KEYS cobbleranked:queue:*
   # Should show queue entries
   ```

3. **Check server IDs are unique:**
   - Each server needs unique `server_id`
   - Battle server must have `battle_server: ""`

4. **Check format matches:**
   - Players in Singles queue won't match Doubles queue
   - Check format with `/rankedadmin queue list`

5. **Check Elo ranges:**
   - Default ±200 Elo range
   - Expands over time (50s per expansion)

### Players stuck on battle server

**Symptoms:** Players don't return after battle

**Solution:**
1. **Check Velocity server names:**
   - `battle_server` must match Velocity `servers` name exactly
   - Case-sensitive!

2. **Verify player origin saved:**
   ```bash
   redis-cli
   > GET player_origin:{uuid}
   # Should show origin server ID
   ```

3. **Check logs:**
   - Look for `[BATTLE-END] Transferring players back`
   - Check for transfer errors

## Next Steps

Now that CobbleRanked is installed:

### Single-Server Setup
1. **Configure blacklist** - [Blacklist Guide](../configuration/blacklist.md)
2. **Set up arenas** - [Arena Setup](../configuration/arenas.md)
3. **Customize rewards** - [Rewards System](../configuration/rewards.md)
4. **Read Quick Start** - [Quick Start Guide](quick-start.md)

### Cross-Server Setup
1. **Complete cross-server guide** - [Cross-Server Setup](../advanced/cross-server.md)
2. **Configure Velocity/BungeeCord** - Server transfer plugin
3. **Set up arenas (battle server only)** - [Arena Setup](../configuration/arenas.md)
4. **Test cross-server matchmaking** - Try joining from different servers
5. **Configure rewards** - [Rewards System](../configuration/rewards.md)

---

**Need help?**
- Cross-server issues: [Cross-Server Guide](../advanced/cross-server.md#troubleshooting)
- General issues: [Troubleshooting Guide](../support/troubleshooting.md)
- Common questions: [FAQ](../support/faq.md)
