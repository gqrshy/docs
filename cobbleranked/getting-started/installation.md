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

- **MySQL** 8.0+ or **MariaDB** 10.5+
- **Redis** 6.0+

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

For cross-server setups, configure MySQL:

1. **Create a database:**
```sql
CREATE DATABASE cobbleranked CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
FLUSH PRIVILEGES;
```

2. **Edit [config.json5](../configuration/config.md#cross-server-configuration):**
```json5
"cross_server": {
  "enabled": true,
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

3. **Restart the server**

## Redis Setup (Cross-Server)

For real-time cross-server queue sync:

1. **Install Redis:**
```bash
# Ubuntu/Debian
sudo apt install redis-server

# Windows: Download from https://redis.io/download
```

2. **Configure [config.json5](../configuration/config.md#redis-configuration):**
```json5
"cross_server": {
  "redis": {
    "host": "localhost",
    "port": 6379,
    "password": "",  // Leave empty if no password
    "database": 0
  }
}
```

3. **Restart the server**

## Verification Commands

Run these commands to verify installation:

```
/rankedarena reload          # Reload all configs
/rankedarena arena list      # View configured arenas
/rankedarena season info     # Check current season
```

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

## Next Steps

Now that CobbleRanked is installed:

1. **Configure blacklist** - [Blacklist Guide](../configuration/blacklist.md)
2. **Set up arenas** - [Arena Setup](../configuration/arenas.md)
3. **Customize rewards** - [Rewards System](../configuration/rewards.md)
4. **Read Quick Start** - [Quick Start Guide](quick-start.md)

---

**Need help?** Check the [Troubleshooting Guide](../support/troubleshooting.md) or [FAQ](../support/faq.md).
