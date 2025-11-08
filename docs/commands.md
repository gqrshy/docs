# Commands Reference

Complete reference for all CobbleRanked commands - player and admin.

## Table of Contents

1. [Player Commands](#player-commands)
2. [Admin Commands](#admin-commands)
3. [Arena Management](#arena-management)
4. [Elo Management](#elo-management)
5. [Season Management](#season-management)
6. [System Commands](#system-commands)
7. [Command Permissions](#command-permissions)

---

## Player Commands

Commands available to all players.

### /ranked

Opens the main ranked battle menu.

**Usage:**
```
/ranked
```

**Features:**
- View your current stats (Elo, wins, losses)
- Join/leave matchmaking queue
- Select battle format (Singles or Doubles)
- View leaderboards
- Check blacklist rules
- Claim rewards

**Permission:** None (all players)

**Examples:**
```
/ranked
```

---

### /season

View current season information.

**Usage:**
```
/season
```

**Shows:**
- Current season name
- Season status (Active/Ended)
- Start date and end date
- Time remaining in season
- Your current rank

**Permission:** None (all players)

**Examples:**
```
/season
```

**Sample Output:**
```
Season 1
Status: Active
Time Remaining: 15 days, 6 hours
Your Rank: #42
```

---

## Admin Commands

All admin commands require OP level 2 or higher.

### /rankedadmin

Root command for all admin features.

**Usage:**
```
/rankedadmin <subcommand>
```

**Permission:** Requires OP level 2

**Available Subcommands:**
- Arena management: `setArena`, `setexit`, `teleportArena`
- Elo management: `setelo`, `addelo`, `removeelo`, `setflee`
- Season management: `season`
- System: `reload`, `closeRanked`

---

## Arena Management

Commands for creating and managing battle arenas.

### /rankedadmin setArena

Set player spawn positions for an arena.

**Usage:**
```
/rankedadmin setArena <name> <pos1|pos2>
```

**Parameters:**
- `<name>` - Arena name (can be anything, no spaces)
- `<pos1|pos2>` - Which spawn position to set (pos1 = Player 1, pos2 = Player 2)

**Permission:** OP level 2

**Examples:**
```
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2

/rankedadmin setArena vgcarena pos1
/rankedadmin setArena vgcarena pos2
```

**How to use:**
1. Stand at Player 1's spawn position
2. Run command with `pos1`
3. Move to Player 2's spawn position (10-20 blocks away)
4. Run command with `pos2`
5. Arena is now created!

**Tab Completion:**
- Existing arena names
- "Create new arena" hint

**Important Notes:**
- Arena name cannot contain spaces
- Arenas are stored in `config/cobbleranked/arenas.json5`
- Place spawn positions 10-20 blocks apart for best results
- Players will automatically face each other when teleported to these positions

---

### /rankedadmin setexit

Set the exit point where players spawn after battles.

**Usage:**
```
/rankedadmin setexit
```

**Permission:** OP level 2

**How to use:**
1. Stand where you want players to exit
2. Run the command
3. All players will be teleported here after battles end

**Examples:**
```
/rankedadmin setexit
```

**Typical Locations:**
- Server spawn
- Lobby area
- Outside battle arena entrance

---

### /rankedadmin teleportArena

Teleport to a specific arena.

**Usage:**
```
/rankedadmin teleportArena <arena>
```

**Parameters:**
- `<arena>` - Name of the arena

**Permission:** OP level 2

**Examples:**
```
/rankedadmin teleportArena arena1
/rankedadmin teleportArena vgcarena
```

**Tab Completion:**
- Shows all existing arena names

**Use cases:**
- Check arena boundaries
- Test arena size
- Build/decorate arenas
- Debug battle locations

---

## Elo Management

Commands for modifying player Elo ratings.

### /rankedadmin setelo

Set a player's Elo to a specific value.

**Usage:**
```
/rankedadmin setelo <amount> <player> <format>
```

**Parameters:**
- `<amount>` - Elo value to set
- `<player>` - Player name
- `<format>` - `SINGLES` or `DOUBLES`

**Permission:** OP level 2

**Examples:**
```
/rankedadmin setelo 1500 Notch SINGLES
/rankedadmin setelo 2000 Steve DOUBLES
/rankedadmin setelo 1000 Alex SINGLES
```

**Tab Completion:**
- Amount: `1000`, `1200`, `1500`, `0` (reset)
- Player: Online player names
- Format: `SINGLES`, `DOUBLES`

**Use cases:**
- Reset a player's Elo: `setelo 1000 Player SINGLES`
- Correct errors from bugs
- Testing different Elo ranges
- Reward/punish for special events

---

### /rankedadmin addelo

Add Elo points to a player.

**Usage:**
```
/rankedadmin addelo <amount> <player> <format>
```

**Parameters:**
- `<amount>` - Elo to add
- `<player>` - Player name
- `<format>` - `SINGLES` or `DOUBLES`

**Permission:** OP level 2

**Examples:**
```
/rankedadmin addelo 100 Notch SINGLES
/rankedadmin addelo 250 Steve DOUBLES
```

**Use cases:**
- Reward for winning tournaments
- Compensation for server issues
- Event prizes

---

### /rankedadmin removeelo

Remove Elo points from a player.

**Usage:**
```
/rankedadmin removeelo <amount> <player> <format>
```

**Parameters:**
- `<amount>` - Elo to remove
- `<player>` - Player name
- `<format>` - `SINGLES` or `DOUBLES`

**Permission:** OP level 2

**Examples:**
```
/rankedadmin removeelo 50 Notch SINGLES
/rankedadmin removeelo 100 Steve DOUBLES
```

**Use cases:**
- Punish for cheating (also consider ban)
- Correct accidental Elo gains
- Balance adjustments

---

### /rankedadmin setflee

Set a player's flee count (disconnect penalty).

**Usage:**
```
/rankedadmin setflee <player> <amount>
```

**Parameters:**
- `<player>` - Player name
- `<amount>` - Flee count to set (0 = clear penalty)

**Permission:** OP level 2

**Examples:**
```
/rankedadmin setflee Steve 0       # Clear penalty
/rankedadmin setflee Alex 5        # Set to 5 flees
/rankedadmin setflee Notch 10      # Set to 10 flees
```

**Tab Completion:**
- Player: Online player names
- Amount: `0` (clear), `3`, `5`, `10`

**Flee Count Effects:**
- 1-5 flees: 5 minute queue ban
- 6-10 flees: 15 minute queue ban
- 11+ flees: 30 minute queue ban

**Use cases:**
- Forgive accidental disconnects: `setflee Player 0`
- Punish intentional rage quits
- Reset after network issues

---

## Season Management

Commands for creating and managing competitive seasons.

**Important:** Season commands only work on the **battle server** in cross-server setups!

### /rankedadmin season info

View current season details.

**Usage:**
```
/rankedadmin season info
```

**Permission:** OP level 2 (works on all servers)

**Shows:**
- Season name
- Start and end dates
- Status (Active/Ended)
- Time remaining
- Total seasons played

**Examples:**
```
/rankedadmin season info
```

**Sample Output:**
```
Current Season: Season 1
Status: Active
Start Date: 2025-01-01
End Date: 2025-01-31
Time Remaining: 15 days, 6 hours
Total Seasons: 3
```

---

### /rankedadmin season history

View past seasons.

**Usage:**
```
/rankedadmin season history [limit]
```

**Parameters:**
- `[limit]` - Number of seasons to show (optional, default: 5)

**Permission:** OP level 2 (works on all servers)

**Examples:**
```
/rankedadmin season history         # Show last 5 seasons
/rankedadmin season history 10      # Show last 10 seasons
/rankedadmin season history 20      # Show last 20 seasons
```

**Sample Output:**
```
Season History:
1. Season 3 - 2025-03-01 to 2025-03-31 (Ended)
2. Season 2 - 2025-02-01 to 2025-02-28 (Ended)
3. Season 1 - 2025-01-01 to 2025-01-31 (Ended)
```

---

### /rankedadmin season create

Create a new season.

**Usage:**
```
/rankedadmin season create <days> <name>
```

**Parameters:**
- `<days>` - Duration in days
- `<name>` - Season name (can contain spaces)

**Permission:** OP level 2 (battle server only)

**Examples:**
```
/rankedadmin season create 30 Season 1
/rankedadmin season create 14 Spring Championships
/rankedadmin season create 60 Summer Season 2025
```

**Tab Completion:**
- Days: `7`, `14`, `30`, `60`, `90`
- Name: Example names

**What happens:**
1. Previous season ends (if active)
2. End-of-season rewards distributed
3. New season starts immediately
4. Elo reset (if configured in config.json5)

**Best practices:**
- Standard: 30 days (monthly)
- Short: 7-14 days (weekly/bi-weekly)
- Long: 60-90 days (quarterly)

---

### /rankedadmin season rotate

Force immediate season rotation.

**Usage:**
```
/rankedadmin season rotate
```

**Permission:** OP level 2 (battle server only)

**What it does:**
- Ends current season
- Distributes rewards
- Starts new season with default duration
- Same as waiting for automatic rotation

**Examples:**
```
/rankedadmin season rotate
```

**Use cases:**
- Manual season end before auto-rotation
- Emergency season restart
- Event-based season changes

---

### /rankedadmin season end

End the current season.

**Usage:**
```
/rankedadmin season end
```

**Permission:** OP level 2 (battle server only)

**What it does:**
- Ends current season immediately
- Distributes end-of-season rewards
- Starts new season with default duration

**Examples:**
```
/rankedadmin season end
```

**Note:** This is functionally the same as `season rotate`.

---

### /rankedadmin season setend

Extend or shorten current season.

**Usage:**
```
/rankedadmin season setend <minutes>
```

**Parameters:**
- `<minutes>` - Minutes to add to season (use negative to shorten)

**Permission:** OP level 2 (battle server only)

**Examples:**
```
/rankedadmin season setend 10080    # Add 7 days (10080 minutes)
/rankedadmin season setend 1440     # Add 1 day (1440 minutes)
/rankedadmin season setend 43200    # Add 30 days
/rankedadmin season setend -1440    # Subtract 1 day
```

**Common Values:**
- 1 hour = 60 minutes
- 1 day = 1440 minutes
- 1 week = 10080 minutes
- 1 month (30 days) = 43200 minutes

**Tab Completion:**
- Shows common time values with labels

**Use cases:**
- Extend season due to server downtime
- Shorten season for special events
- Adjust to holidays/schedules

---

### /rankedadmin season rename

Rename the current season.

**Usage:**
```
/rankedadmin season rename <name>
```

**Parameters:**
- `<name>` - New season name (can contain spaces)

**Permission:** OP level 2 (battle server only)

**Examples:**
```
/rankedadmin season rename "Season 1: Battle of Champions"
/rankedadmin season rename "Winter Cup 2025"
/rankedadmin season rename "Pre-Season Testing"
```

**Tab Completion:**
- Shows example naming conventions

**Use cases:**
- Add theme to generic season name
- Rename for special events
- Correct typos in season name

---

## System Commands

General system management commands.

### /rankedadmin reload

Reload configuration files.

**Usage:**
```
/rankedadmin reload
```

**Permission:** OP level 2

**What it reloads:**
- `config.json5`
- `blacklist/singles.json5`
- `blacklist/doubles.json5`
- Language files
- GUI configurations
- Rewards configuration

**Examples:**
```
/rankedadmin reload
```

**Important Notes:**
- Some settings require full server restart
- Active battles are not affected
- Players in queue remain in queue
- Use after editing config files

**What requires restart:**
- Cross-server settings
- Database configuration
- Redis settings
- Some Elo system changes

---

### /rankedadmin closeRanked

Toggle the entire ranked system on/off.

**Usage:**
```
/rankedadmin closeRanked
```

**Permission:** OP level 2

**What it does:**
- Toggles ranked system between enabled/disabled
- When disabled:
  - Players cannot join queue
  - `/ranked` shows "System disabled" message
  - Active battles continue normally
- When re-enabled:
  - Everything returns to normal

**Examples:**
```
/rankedadmin closeRanked    # Disable system
/rankedadmin closeRanked    # Enable system
```

**Use cases:**
- Server maintenance
- Testing changes
- Temporarily disable for events
- Emergency stop for bugs

---

## Command Permissions

### Permission Levels

| Level | Who Has It | Commands Available |
|-------|-----------|-------------------|
| 0 | All players | `/ranked`, `/season` |
| 2 | Server operators | All `/rankedadmin` commands |

### Giving Permissions

**Via OP (Vanilla):**
```
/op PlayerName 2
```

**Via LuckPerms (Recommended):**
```
/lp user PlayerName permission set cobbleranked.admin true
```

### Cross-Server Season Restrictions

In cross-server mode, season management commands are **battle server only**:

**Available Everywhere:**
- `/rankedadmin season info`
- `/rankedadmin season history`

**Battle Server Only:**
- `/rankedadmin season create`
- `/rankedadmin season rotate`
- `/rankedadmin season end`
- `/rankedadmin season setend`
- `/rankedadmin season rename`

**Why?** Only one server should manage seasons to prevent conflicts.

---

## Command Examples by Use Case

### Setting Up a New Server

```bash
# 1. Create your first arena
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2

# 2. Set exit point
/rankedadmin setexit

# 3. Create first season
/rankedadmin season create 30 "Season 1"

# 4. Reload config after editing blacklists
/rankedadmin reload
```

### Managing a Tournament

```bash
# Before tournament: Give participants starting Elo
/rankedadmin setelo 1500 Player1 SINGLES
/rankedadmin setelo 1500 Player2 SINGLES

# After tournament: Reward winner
/rankedadmin addelo 500 WinnerName SINGLES

# Clear flee penalties for participants
/rankedadmin setflee Player1 0
/rankedadmin setflee Player2 0
```

### Handling Server Issues

```bash
# If server had downtime, extend season
/rankedadmin season setend 1440    # Add 1 day

# If bug caused Elo loss, compensate
/rankedadmin addelo 100 AffectedPlayer SINGLES

# If need to reset everything, restart season
/rankedadmin season rotate
```

### Testing Changes

```bash
# Disable system while testing
/rankedadmin closeRanked

# Test your changes...

# Re-enable when done
/rankedadmin closeRanked
```

### Moderating Players

```bash
# Reset rage-quitter's flee count after apology
/rankedadmin setflee Player 0

# Punish cheater (remove Elo)
/rankedadmin removeelo 1000 Cheater SINGLES

# Reward helpful community member
/rankedadmin addelo 100 Helper DOUBLES
```

---

## Tab Completion Reference

CobbleRanked provides helpful tab completion for all commands.

### Arena Commands

```
/rankedadmin setArena <TAB>
→ Existing arenas + "Create new arena" hint

/rankedadmin teleportArena <TAB>
→ List of all arenas
```

### Elo Commands

```
/rankedadmin setelo <TAB>
→ 0, 1000, 1200, 1500, 2000

/rankedadmin setelo 1500 <TAB>
→ Online player names

/rankedadmin setelo 1500 Notch <TAB>
→ SINGLES, DOUBLES
```

### Season Commands

```
/rankedadmin season create <TAB>
→ 7, 14, 30, 60, 90 (days)

/rankedadmin season create 30 <TAB>
→ Example season names
```

### Flee Commands

```
/rankedadmin setflee <TAB>
→ Online player names

/rankedadmin setflee Player <TAB>
→ 0 (clear), 3, 5, 10
```

---

## Quick Reference

### Player Commands

| Command | Description |
|---------|-------------|
| `/ranked` | Open ranked menu |
| `/season` | View season info |

### Arena Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> <pos1\|pos2>` | Set arena corners |
| `/rankedadmin setexit` | Set exit point |
| `/rankedadmin teleportArena <arena>` | Teleport to arena |

### Elo Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setelo <amount> <player> <format>` | Set player Elo |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo points |
| `/rankedadmin removeelo <amount> <player> <format>` | Remove Elo points |
| `/rankedadmin setflee <player> <amount>` | Set flee count |

### Season Management

| Command | Description |
|---------|-------------|
| `/rankedadmin season info` | Current season details |
| `/rankedadmin season history [limit]` | Past seasons |
| `/rankedadmin season create <days> <name>` | Create new season |
| `/rankedadmin season rotate` | Force season rotation |
| `/rankedadmin season end` | End current season |
| `/rankedadmin season setend <minutes>` | Extend/shorten season |
| `/rankedadmin season rename <name>` | Rename season |

### System

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload configurations |
| `/rankedadmin closeRanked` | Toggle system on/off |

---

**Next Steps:**
- [Admin Guide](admin-guide.md) - Full server setup guide
- [Configuration](configuration.md) - Config file reference
- [FAQ](faq.md) - Common questions

---

Need help with a specific command? Check the [FAQ](faq.md) or join our Discord!
