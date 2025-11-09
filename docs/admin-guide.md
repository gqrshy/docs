# Admin Guide

Complete guide for server owners to install, configure, and manage CobbleRanked on your Cobblemon server.

## Table of Contents

1. [Installation](#installation)
2. [First Time Setup](#first-time-setup)
3. [Basic Configuration](#basic-configuration)
4. [Arena Setup](#arena-setup)
5. [Managing Seasons](#managing-seasons)
6. [Managing Players](#managing-players)
7. [Cross-Server Setup (Advanced)](#cross-server-setup-advanced)
8. [Troubleshooting](#troubleshooting)

---

## Installation

### Requirements

- **Minecraft**: 1.21.1
- **Cobblemon**: 1.6.1 or higher
- **Fabric Loader**: Latest recommended version
- **Fabric API**: Latest version
- **Server**: Fabric server (single or multi-server with Velocity)

### Single Server Installation

1. **Download CobbleRanked**
   - Get the latest `.jar` file from Discord or Modrinth
   - Place it in your server's `mods` folder

2. **Start the Server**
   - CobbleRanked will create default configuration files
   - Server will generate: `config/cobbleranked/`

3. **Configure Basic Settings**
   - Edit `config/cobbleranked/config.json5`
   - See [Basic Configuration](#basic-configuration) below

4. **Set Up Arenas**
   - Use `/rankedadmin setArena` commands
   - See [Arena Setup](#arena-setup) below

5. **Restart the Server**
   - Changes take effect after restart
   - Players can now use `/ranked`!

### Multi-Server Installation (Velocity Network)

For larger networks with multiple servers, see [Cross-Server Setup](#cross-server-setup-advanced).

---

## First Time Setup

After installing CobbleRanked, follow these steps to get started:

### Step 1: Verify Installation

1. Start your server
2. Check the console for: `CobbleRanked loaded successfully`
3. Confirm config files were created in `config/cobbleranked/`

### Step 2: Set Up Your First Arena

You need at least one battle arena. Here's how to create one:

1. **Go to your desired arena location**
   - Find a flat area or build a custom arena
   - **Important:** pos1/pos2 are just teleport destinations, NOT arena boundaries

2. **Stand at Player 1's spawn position**
   - This is where the first player will teleport when a match starts
   - The system will automatically calculate yaw to make players face each other
   ```
   /rankedadmin setArena myarena pos1
   ```

3. **Move to Player 2's spawn position**
   - This is where the second player will teleport
   - Place this 10-20 blocks away from pos1 for best battle spacing
   - Facing direction will be auto-calculated to face Player 1
   ```
   /rankedadmin setArena myarena pos2
   ```









4. **Set the exit point** (where players teleport after battle)
   - Stand where you want players to exit
   ```
   /rankedadmin setexit
   ```

5. **Test the arena**
   - Teleport to it: `/rankedadmin teleportArena myarena`
   - Verify the spawn positions are appropriate

### Step 3: Configure Battle Rules

1. **Edit Singles Blacklist**
   - Open `config/cobbleranked/blacklist/singles.json5`
   - Add banned Pokemon, moves, abilities, items
   - Example: Ban legendaries by adding `"legendary"` to `black_list_labels`

2. **Edit Doubles Blacklist**
   - Open `config/cobbleranked/blacklist/doubles.json5`
   - Set VGC-style rules with `restricted_label_limits`
   - Example: Allow 2 restricted legendaries

3. **Reload Configuration**
   ```
   /rankedadmin reload
   ```

### Step 4: Test the System

1. Have a player (or yourself in offline mode) run `/ranked`
2. Try joining a queue
3. Verify matchmaking works
4. Check battle starts correctly
5. Confirm rewards are given

---

## Basic Configuration

The main configuration file is `config/cobbleranked/config.json5`.

### Essential Settings

#### Language

```json5
"language": "en-Us"
```

Available languages:
- `en-Us` - English (US)
- `pt-Br` - Portuguese (Brazil)
- `ja-Jp` - Japanese
- `ru-Ru` - Russian

#### Blocked Commands

Commands that players cannot use during battles:

```json5
"blockedCommands": [
  "tp",
  "warp",
  "spawn",
  "home",
  "kit"
]
```

Add any command you want to prevent during battles.

#### Battle Level

Force all Pokemon to a specific level:

```json5
"battle": {
  "levelMatch": 70  // 0 = use original levels
}
```

- `0` = Pokemon keep their original levels
- `1-100` = Force all Pokemon to this level
- Default: `70` (competitive standard)

#### Starting Elo

Set the starting Elo for new players:

```json5
"eloSystem": {
  "mode": "POKEMON_SHOWDOWN",
  "pokemonShowdown": {
    "initialElo": 1000,
    "floorElo": 1000
  }
}
```

#### Season Duration

Set how long seasons last:

```json5
"ranked_match": {
  "reset_days": 30  // Days per season
}
```

- `30` = Monthly seasons
- `14` = Bi-weekly seasons
- `7` = Weekly seasons
- `0` = No automatic rotation

#### Matchmaking Settings

Configure queue matchmaking:

```json5
"matchmaking": {
  "dynamicEloRange": {
    "enabled": true,
    "initialRange": 200,        // ±200 Elo initial range
    "expansionDelay": 30,       // Wait 30s before expanding
    "expansionRate": 5,         // +5 Elo range per second
    "maxMultiplier": 3.0,       // Max 3x initial range (±600)
    "immediateMatchRange": 100  // ±100 Elo = instant match
  }
}
```

### Elo System Modes

CobbleRanked supports three Elo calculation systems:

#### 1. Pokemon Showdown (Default - Recommended)

```json5
"eloSystem": {
  "mode": "POKEMON_SHOWDOWN",
  "pokemonShowdown": {
    "initialElo": 1000,
    "floorElo": 1000,
    "decay": {
      "enabled": true,
      "runAtUtcHour": 9,
      "slowDecayReduction": 2
    }
  }
}
```

- Same system as Pokemon Showdown
- K-factor based on Elo difference
- Prevents dropping below floor Elo
- Optional inactive decay

#### 2. Glicko-2 (Advanced)

```json5
"eloSystem": {
  "mode": "GLICKO2",
  "glicko2": {
    "initialRating": 1500.0,
    "initialRD": 350.0,
    "initialVolatility": 0.06,
    "systemConstant": 0.5
  }
}
```

- More accurate than basic Elo
- Accounts for rating certainty
- Better for smaller player bases
- Used by chess federations

#### 3. Legacy (Simple)

```json5
"eloSystem": {
  "mode": "LEGACY"
},
"ranked_match": {
  "elo_initial": 500,
  "gainMatch": "50,100",  // Random 50-100 Elo on win
  "loseMatch": "30,50"    // Random 30-50 Elo on loss
}
```

- Simple random point gain/loss
- Good for casual servers
- Less accurate for competitive balance

### Flee Penalty System

Configure disconnect penalties:

```json5
"competitive": {
  "flee_penalty": {
    "tiers": [
      {
        "flee_min": 1,
        "flee_max": 5,
        "penalty_minutes": 5
      },
      {
        "flee_min": 6,
        "flee_max": 10,
        "penalty_minutes": 15
      },
      {
        "flee_min": 11,
        "flee_max": 999,
        "penalty_minutes": 30
      }
    ]
  },
  "flee_decay": {
    "enabled": true,
    "decay_rate": 1,
    "decay_interval_hours": 24
  }
}
```

### GUI Sounds

Enable or customize GUI sounds:

```json5
"gui_sounds": {
  "enabled": true,
  "button_click": {
    "sound": "minecraft:ui.button.click",
    "volume": 0.5,
    "pitch": 1.0
  },
  "match_found": {
    "sound": "minecraft:entity.experience_orb.pickup",
    "volume": 1.0,
    "pitch": 1.5
  }
  // ... many more customizable sounds
}
```

Set `"enabled": false` to disable all GUI sounds.

---

## Arena Setup

Arenas are the locations where ranked battles take place.

### Creating an Arena

1. **Choose a Location**
   - Flat terrain recommended for aesthetics
   - Give players ~10-20 blocks of space between spawn points
   - Away from player structures (battles can be destructive)
   - **Note:** Arena boundaries are NOT enforced by the system - pos1/pos2 are just player spawn locations

2. **Set Player Spawn Positions**
   - Stand at Player 1's spawn position
   - `/rankedadmin setArena <name> pos1`
   - Move 10-20 blocks away to Player 2's spawn position
   - `/rankedadmin setArena <name> pos2`
   - **Note**: Players will automatically face each other when teleported to these positions

3. **Set Exit Point**
   - Stand where players should spawn after battles
   - `/rankedadmin setexit`

### Managing Arenas

**Teleport to Arena**
```
/rankedadmin teleportArena <arena_name>
```

**List All Arenas**
Check `config/cobbleranked/arenas.json5`:
```json5
{
  "myarena": {
    "display": "My Arena",
    "pos1": {
      "x": 100.0,
      "y": 64.0,
      "z": 200.0,
      "yaw": 0.0,
      "pitch": 0.0,
      "world": "minecraft:overworld"
    },
    "pos2": {
      "x": 120.0,
      "y": 64.0,
      "z": 200.0,
      "yaw": 180.0,
      "pitch": 0.0,
      "world": "minecraft:overworld"
    }
  }
}
```

**Note:** The `yaw` values are automatically calculated when you use `/rankedadmin setArena`, making players face each other. You can manually edit these values to adjust player facing direction.

**Delete an Arena**
Edit `arenas.json5` manually and remove the arena entry.

### Multiple Arenas

You can create multiple arenas:

```
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2

/rankedadmin setArena arena2 pos1
/rankedadmin setArena arena2 pos2
```

The system will randomly select an available arena for each match.

---

## Managing Seasons

Seasons are competitive periods with automatic rotation and rewards.

### Creating a Season

**Syntax:**
```
/rankedadmin season create <days> <season_name>
```

**Examples:**
```
/rankedadmin season create 30 Season 1
/rankedadmin season create 14 Spring Championships
/rankedadmin season create 60 Summer Season 2025
```

- `<days>`: How long the season lasts
- `<season_name>`: Name shown to players (can contain spaces)

### Viewing Season Info

**Current Season:**
```
/rankedadmin season info
```

Shows:
- Season name
- Start date
- End date
- Status (Active/Ended)
- Time remaining

**Season History:**
```
/rankedadmin season history [limit]
```

Shows past seasons. Default limit: 5

**Examples:**
```
/rankedadmin season history
/rankedadmin season history 10
```

### Managing Active Seasons

**Rename Current Season:**
```
/rankedadmin season rename <new_name>
```

Example:
```
/rankedadmin season rename "Season 1: Battle of Champions"
```

**Extend Season:**
```
/rankedadmin season setend <minutes>
```

Add time to current season:
```
/rankedadmin season setend 10080  # Add 7 days (10080 minutes)
```

**End Season Early:**
```
/rankedadmin season end
```

This will:
1. End the current season
2. Distribute end-of-season rewards
3. Start a new season automatically

**Force Season Rotation:**
```
/rankedadmin season rotate
```

Manually trigger season rotation (same as `season end` but explicitly named).

### Season Reset Settings

Configure what happens when a season ends:

```json5
"ranked_match": {
  "season_reset": {
    "reset_elo": true,           // Reset Elo to initial value
    "reset_wins_losses": false   // Keep win/loss records
  }
}
```

**Common Configurations:**

**Full Reset (Fresh Start):**
```json5
"reset_elo": true,
"reset_wins_losses": true
```

**Soft Reset (Keep Stats):**
```json5
"reset_elo": true,
"reset_wins_losses": false
```

**No Reset (Continuous Ladder):**
```json5
"reset_elo": false,
"reset_wins_losses": false
```

### Automatic Season Rotation

Seasons can rotate automatically:

```json5
"ranked_match": {
  "reset_days": 30,  // Auto-rotate after 30 days
  "season_check": {
    "enabled": true,
    "check_interval_minutes": 10  // Check every 10 minutes
  }
}
```

### Season Announcements

Broadcast season info to all players:

```json5
"ranked_match": {
  "season_announcement": {
    "enabled": true,
    "interval_minutes": 30,
    "show_remaining_days": true
  }
}
```

Players will see announcements like:
> **Season 1** is currently active! 15 days remaining. Type `/season` for details.

### Cross-Server Note

**Important:** Only the **battle server** should manage seasons!

If using cross-server mode:
- Main/lobby servers: `"battle_server": "battle"`
- Battle server: `"battle_server": ""`

Season commands only work on the battle server.

---

## Managing Players

Commands for managing player data and rankings.

### Elo Management

**Set Player Elo:**
```
/rankedadmin setelo <amount> <player> <format>
```

Examples:
```
/rankedadmin setelo 1500 Notch SINGLES
/rankedadmin setelo 2000 Steve DOUBLES
```

**Add Elo Points:**
```
/rankedadmin addelo <amount> <player> <format>
```

Examples:
```
/rankedadmin addelo 100 Notch SINGLES  # Add 100 Elo
```

**Remove Elo Points:**
```
/rankedadmin removeelo <amount> <player> <format>
```

Examples:
```
/rankedadmin removeelo 50 Notch SINGLES  # Subtract 50 Elo
```

### Flee Penalty Management

**Set Flee Count:**
```
/rankedadmin setflee <player> <amount>
```

Examples:
```
/rankedadmin setflee Steve 0      # Clear flee penalty
/rankedadmin setflee Steve 5      # Set to 5 flees
```

Use `0` to clear a player's disconnect penalties.

### System Commands

**Reload Configuration:**
```
/rankedadmin reload
```

Reloads:
- `config.json5`
- Blacklist files (`singles.json5`, `doubles.json5`)
- Language files
- GUI configurations
- Rewards configuration

**Toggle Ranked System:**
```
/rankedadmin closeRanked
```

Toggles the entire ranked system on/off. Useful for:
- Server maintenance
- Testing changes
- Temporarily disabling competitive play

When disabled:
- Players cannot join queue
- Existing battles continue
- `/ranked` command shows "System disabled" message

---

## Cross-Server Setup (Advanced)

For networks with multiple servers connected via Velocity proxy.

### Architecture Overview

**Typical Setup:**
- **Main/Lobby Servers** (`main1`, `main2`): Players queue here
- **Battle Server** (`battle`): All battles happen here
- **MySQL Database**: Shared player data
- **Redis**: Real-time communication

### Requirements

- **Velocity Proxy**: Latest version
- **MySQL Server**: 5.7+ or MariaDB 10.3+
- **Redis Server**: 5.0+
- **All servers**: Same CobbleRanked version

### Database Setup

1. **Install MySQL**
   ```sql
   CREATE DATABASE cobbleranked;
   CREATE USER 'cobbleranked'@'%' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON cobbleranked.* TO 'cobbleranked'@'%';
   FLUSH PRIVILEGES;
   ```

2. **Install Redis**
   - Ubuntu: `sudo apt install redis-server`
   - Docker: `docker run -d -p 6379:6379 redis`

### Configuration

#### Battle Server Config

File: `config/cobbleranked/config.json5`

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "battle",
    "battle_server": "",  // ← Empty string = THIS is the battle server

    "database_type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

#### Main/Lobby Server Config

File: `config/cobbleranked/config.json5`

```json5
{
  "cross_server": {
    "enabled": true,
    "server_id": "main1",  // or "main2", "lobby", etc.
    "battle_server": "battle",  // ← Points to battle server

    "database_type": "mysql",
    "mysql": {
      "host": "localhost",
      "port": 3306,
      "database": "cobbleranked",
      "username": "cobbleranked",
      "password": "your_password"
    },

    "redis": {
      "host": "localhost",
      "port": 6379,
      "password": "",
      "database": 0
    }
  }
}
```

### Velocity Configuration

Ensure servers are registered in `velocity.toml`:

```toml
[servers]
main1 = "localhost:25566"
main2 = "localhost:25567"
battle = "localhost:25568"
```

### How It Works

1. **Player joins queue on main1**
   - Stats loaded from MySQL
   - Added to Redis global queue

2. **Matchmaking finds opponent**
   - Could be on main2 or main1
   - Both players notified

3. **Both accept match**
   - Transferred to battle server
   - Battle starts

4. **Battle ends**
   - Results saved to MySQL
   - Cached in Redis (60s TTL)
   - Players returned to original servers

5. **Stats updated everywhere**
   - MySQL = source of truth
   - Redis = fast cache
   - All servers read from Redis first

### Important Rules

**Only ONE battle server allowed!**

The battle server manages:
- Season creation and rotation
- Global matchmaking queue
- Battle arena allocation
- Reward distribution

Main/lobby servers are read-only for seasons.

### Testing Cross-Server

1. Start all servers and verify connectivity
2. Check console for: `Redis connection established`
3. Check console for: `MySQL connection pool initialized`
4. Have players queue from different servers
5. Verify they can match across servers
6. Confirm stats sync across all servers

### Troubleshooting Cross-Server

**Players can't match across servers:**
- Check Redis connection on all servers
- Verify `cross_server.enabled: true` on all servers
- Check server IDs are unique

**Stats not syncing:**
- Verify MySQL credentials are correct
- Check Redis cache TTL settings
- Restart all servers to clear cache

**Battle server errors:**
- Only ONE server should have `battle_server: ""`
- Check for duplicate battle server warning in logs
- Verify Velocity server IDs match config

---

## Troubleshooting

### Common Issues

#### "Not enough Pokemon to queue"

**Problem:** Player doesn't have required Pokemon count.

**Solution:**
- Singles requires 3+ Pokemon
- Doubles requires 4+ Pokemon
- Check `limitPokemon_singles` and `limitPokemon_doubles` in config

#### "Cannot queue with banned items"

**Problem:** Player has banned items in inventory or trinket slots.

**Solution:**
- Check `config/cobbleranked/blacklist/inventory.json5` for banned items list
- Default bans: Tera Orb, Dynamax Band, Mega Bracelet, Z-Ring, Omni Ring (from Mega Showdown mod)
- Player must remove items from inventory and trinket slots before queueing
- See [Banned Items Guide](../cobbleranked/features/banned-items.md) for details

#### "Your Pokemon contains banned species/moves/abilities"

**Problem:** Player's team violates blacklist rules.

**Solution:**
- Check `blacklist/singles.json5` or `doubles.json5`
- Remove banned Pokemon from team
- View blacklist GUI in-game for full list

#### Matchmaking takes forever

**Problem:** Not enough players or Elo range too narrow.

**Solutions:**
- Enable dynamic Elo range expansion:
  ```json5
  "matchmaking": {
    "dynamicEloRange": {
      "enabled": true,
      "maxMultiplier": 3.0  // Increase this
    }
  }
  ```
- Lower initial range: `"initialRange": 150`
- Reduce expansion delay: `"expansionDelay": 20`

#### Players stuck in pending match

**Problem:** Match found but battle didn't start.

**Solution:**
- Reduced from 30 to 5 minutes in latest version
- Check battle server is running (cross-server mode)
- Verify Redis connection active
- Player will auto-exit pending state after timeout

#### Config changes not applying

**Problem:** Changed config but nothing happened.

**Solution:**
- Always restart server after config changes
- OR use `/rankedadmin reload` (some settings require restart)
- Check console for config syntax errors

#### Rewards not being given

**Problem:** Players aren't receiving milestone/season rewards.

**Solution:**
- Check `rewards.json5` syntax
- Verify commands are valid (e.g., `give`, `eco`)
- Test commands manually: `/{command}` replacing `{player}`
- Check console for command execution errors

### Getting Help

1. **Check Console Logs**
   - Look for `[CobbleRanked]` errors
   - Share relevant error messages

2. **Verify Configuration**
   - Use a JSON5 validator
   - Check for typos in Pokemon names
   - Verify mod IDs for items

3. **Ask for Support**
   - Join Discord server
   - Provide: version, config files, error logs
   - Describe what you expected vs what happened

---

## Best Practices

### Security

- **Don't give OP to untrusted players**: They can modify Elo and seasons
- **Backup your database regularly**: Especially before season rotations
- **Use strong MySQL passwords**: Protect player data
- **Keep Redis secured**: Use password if exposed to internet

### Performance

- **Use Redis caching**: Significantly improves cross-server performance
- **Adjust connection pools**: Increase for high player count
- **Monitor database queries**: Optimize if experiencing lag
- **Clean up old season data**: Archive historical data

### Player Experience

- **Communicate rule changes**: Announce blacklist updates
- **Balance rewards**: Make them valuable but not exploitable
- **Set appropriate season length**: 30 days is standard
- **Test before deploying**: Try new configs on test server first

---

**Need more help?** Check the [FAQ](faq.md) or join our Discord community!
