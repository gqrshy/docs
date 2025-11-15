# Commands Reference

Complete reference for all CobbleRanked commands.

---

## Player Commands

Commands available to all players (no special permissions required).

### `/ranked`

Opens the main ranked GUI for queue management, leaderboards, and stats.

**Permission:** None required (all players)
**Usage:** `/ranked`

**What the GUI provides:**
- Join queue for SINGLES or DOUBLES format
- View your current Elo rating and stats
- Check global and format-specific leaderboards
- Claim milestone rewards

---

### `/season`

Display current season information in a compact format.

**Permission:** None required (all players)
**Usage:** `/season`

**Output shows:**
- Season name
- Active/Ended status
- Time remaining until season end
- Formatted countdown (days, hours, minutes)

**Example output:**
```
========== Current Season ==========
Season: Season 1
Status: Active
Time Remaining: 29 days, 14 hours, 23 minutes
====================================
```

---

## Admin Commands

All admin commands require OP level 2 or equivalent permission.

**Permission System:**
- **Default:** Requires OP level 2 (vanilla Minecraft permissions)
- **With LuckPerms:** Commands can be controlled via LuckPerms permissions
- Permission nodes follow the pattern: `cobbleranked.command.<command_name>`
- For granular control, install LuckPerms and assign specific command permissions to groups/players

**Note:** LuckPerms integration for rank syncing (groups/prefixes/suffixes) is configured but not yet fully implemented. Command permissions work via standard OP level checks.

### Core Commands

#### `/rankedadmin reload`

Reload all configuration files without restarting the server.

**Permission:** OP level 2
**Usage:** `/rankedadmin reload`

**What gets reloaded:**
- `config/cobbleranked/config.json5` - Main configuration
- `config/cobbleranked/blacklist.json5` - Pokemon/item restrictions
- `config/cobbleranked/arenas.json5` - Arena locations
- `config/cobbleranked/rewards.json5` - Season rewards
- All GUI files (`gui/*.json5`)
- All language files (`language/*.json5`)

**What does NOT reload (requires restart):**
- Cross-server mode enable/disable
- Database type change (SQLite ↔ MySQL)
- Redis connection settings

---

### Arena Management

#### `/rankedadmin setArena <arena_name> <pos1|pos2>`

Set arena spawn positions for battles.

**Permission:** OP level 2
**Usage:**
```
/rankedadmin setArena main_arena pos1
/rankedadmin setArena main_arena pos2
```

**How it works:**
1. Stand at the desired spawn point
2. Run the command with `pos1` for Player 1's spawn
3. Run again with `pos2` for Player 2's spawn
4. Both positions are automatically saved with coordinates, world, yaw, and pitch

**Automatic features:**
- Players face each other automatically (yaw is calculated)
- World/dimension is saved
- Rotation (yaw/pitch) is preserved

**Tab completion:** Suggests existing arena names

---

#### `/rankedadmin setexit`

Set the fallback exit location where players teleport if position restore fails.

**Permission:** OP level 2
**Usage:** `/rankedadmin setexit`

**How it works:**
1. Stand at the desired exit location (typically spawn)
2. Run the command
3. Location is saved with coordinates, world, yaw, and pitch

**When exit location is used:**
- Original position restoration fails
- Player disconnects during battle
- Arena release errors

---

#### `/rankedadmin teleportArena <arena>`

Teleport to an arena's Player 1 position (pos1).

**Permission:** OP level 2
**Usage:** `/rankedadmin teleportArena main_arena`

**Use cases:**
- Check arena positioning
- Build/modify arena structures
- Test arena setup

**Tab completion:** Suggests all configured arenas

---

#### `/rankedadmin arena status`

Display real-time status of all configured arenas.

**Permission:** OP level 2
**Usage:** `/rankedadmin arena status`

**Output shows for each arena:**
- Arena name
- Status: Available (§a✓) or In Use (§c✖)
- Position 1 coordinates (x, y, z)
- Position 2 coordinates (x, y, z)
- Exit location coordinates (or "[Not set]" if not configured)

**Summary statistics:**
- Total arenas configured
- Number available
- Number in use

**Example output:**
```
=== Arena Status ===
Total arenas: 3

main_arena: ✓ Available
  Pos1: (100, 64, 200) Pos2: (110, 64, 200)
  Exit: (0, 100, 0)

volcano_arena: ✖ In Use
  Pos1: (50, 80, -150) Pos2: (60, 80, -150)
  Exit: (0, 100, 0)

=== Summary ===
✓ Available: 2
✖ In Use: 1
```

---

### Elo Management

All Elo commands require specifying the format (SINGLES or DOUBLES).

#### `/rankedadmin setelo <amount> <player> <format>`

Set a player's Elo rating to a specific value.

**Permission:** OP level 2
**Usage:** `/rankedadmin setelo 1500 PlayerName SINGLES`

**Arguments:**
- `<amount>` - Elo value to set
- `<player>` - Target player (must be online)
- `<format>` - SINGLES or DOUBLES

**What it does:**
- Directly sets the player's Elo for the specified format
- Overwrites existing Elo value
- Changes are saved to database immediately
- Stats (wins/losses) are NOT affected

**Tab completion:** Format suggestions show "SINGLES" and "DOUBLES"

---

#### `/rankedadmin addelo <amount> <player> <format>`

Add Elo points to a player's current rating.

**Permission:** OP level 2
**Usage:** `/rankedadmin addelo 100 PlayerName SINGLES`

**Arguments:**
- `<amount>` - Elo points to add
- `<player>` - Target player (must be online)
- `<format>` - SINGLES or DOUBLES

**What it does:**
- Adds specified amount to current Elo
- New Elo = Current Elo + Amount
- Changes are saved to database immediately

---

#### `/rankedadmin removeelo <amount> <player> <format>`

Remove Elo points from a player's current rating.

**Permission:** OP level 2
**Usage:** `/rankedadmin removeelo 50 PlayerName SINGLES`

**Arguments:**
- `<amount>` - Elo points to remove
- `<player>` - Target player (must be online)
- `<format>` - SINGLES or DOUBLES

**What it does:**
- Subtracts specified amount from current Elo
- New Elo = max(0, Current Elo - Amount)
- Elo cannot go below 0
- Changes are saved to database immediately

---

### Disconnect Penalty Management

#### `/rankedadmin setflee <player> <amount>`

Set a player's flee count (disconnect penalty counter).

**Permission:** OP level 2
**Usage:**
```
/rankedadmin setflee PlayerName 0     # Reset flee count
/rankedadmin setflee PlayerName 5     # Set to 5
```

**Arguments:**
- `<player>` - Target player (must be online)
- `<amount>` - Flee count value to set

**What it does:**
1. Sets the player's flee count to specified value
2. Resets the flee decay timer (starts fresh)
3. Recalculates queue ban penalty based on new flee count:
   - If flee count >= threshold (default: 3), applies penalty from config tiers
   - If flee count < threshold, clears any active penalty

**Penalty tiers (from config):**
```
Flee 1-5: 5 minute ban
Flee 6-10: 15 minute ban
Flee 11+: 30 minute ban
```

**Use cases:**
- Reset flee count for players with legitimate disconnects (crashes/internet issues)
- Clear penalties after investigating reports
- Manually adjust for testing

**Note:** This also clears any active queue ban penalty if amount is set to 0.

---

### Season Management

Season commands check if the current server is authorized to manage seasons.

**Authorization rules:**
- **Single-server mode:** All season commands work
- **Cross-server mode:**
  - Battle server (`battle_server: ""` in config) - All commands work
  - Lobby/main servers - Read-only commands only (info, history)

**Battle-server-only commands:**
Commands that modify seasons are restricted to the battle server in cross-server setups. If run on a lobby server, you'll see:
```
§c[ERROR] This command can only be run on the battle server.
§7Hint: Season management is restricted to prevent duplicate seasons across servers.
```

---

#### `/rankedadmin season info`

Display detailed current season information.

**Permission:** OP level 2
**Usage:** `/rankedadmin season info`
**Allowed on:** All servers

**Output shows:**
- Season ID
- Season name
- Active/Ended status
- Time remaining (formatted countdown)
- Start date
- End date

**Example output:**
```
====== Season Information ======
ID: 1
Name: Season 1
Status: Active
Time Remaining: 29 days, 14 hours, 23 minutes
  Start: 2025-01-01 00:00:00
  End: 2025-01-30 23:59:59
================================
```

---

#### `/rankedadmin season history [limit]`

Display past season history.

**Permission:** OP level 2
**Usage:**
```
/rankedadmin season history        # Show last 5 seasons
/rankedadmin season history 10     # Show last 10 seasons
```
**Allowed on:** All servers

**Arguments:**
- `[limit]` - Number of seasons to display (optional, default: 5)

**Output shows for each season:**
- Season number
- Season name
- Status (Active/Ended) with color coding
- Season ID
- Start and end dates

**Example output:**
```
=== Season History (Last 5) ===

1. Season 2 (Active)
   ID: 2
   Period: 2025-02-01 00:00:00 to 2025-03-02 23:59:59

2. Season 1 (Ended)
   ID: 1
   Period: 2025-01-01 00:00:00 to 2025-01-31 23:59:59

================================
```

---

#### `/rankedadmin season rotate`

Manually start a new season (ends current season and creates next one).

**Permission:** OP level 2
**Usage:** `/rankedadmin season rotate`
**Allowed on:** Battle server only (single-server mode always allowed)

**What it does:**
1. Ends the current active season
2. Distributes season rewards to top 3 players
3. Clears reward collection flags (players can claim new season rewards)
4. Creates a new season with default duration (from `reset_days` config)
5. Announces to all online players

**Warning:** Player Elo and stats are NOT reset. All statistics are preserved across seasons.

**Use cases:**
- Manually rotate seasons before scheduled end
- Start a new competitive season early
- Reset reward flags

---

#### `/rankedadmin season end`

End the current season without starting a new one.

**Permission:** OP level 2
**Usage:** `/rankedadmin season end`
**Allowed on:** Battle server only (single-server mode always allowed)

**What it does:**
1. Marks current season as ended (`is_active = false`)
2. Sets end date to current time
3. Does NOT create a new season automatically
4. Reward collection flags remain (players can still claim)

**Difference from rotate:**
- `end` - Stops current season only
- `rotate` - Stops current AND creates new season

**Use cases:**
- Pause ranked system temporarily
- End a season early without starting replacement
- Prepare for maintenance

**Note:** A new season will auto-create when server restarts if no active season exists.

---

#### `/rankedadmin season setend <minutes>`

Set when the current season will end (relative to now).

**Permission:** OP level 2
**Usage:** `/rankedadmin season setend 1440`  # End in 24 hours
**Allowed on:** Battle server only (single-server mode always allowed)

**Arguments:**
- `<minutes>` - Minutes until season end
  - Example: 1440 = 1 day
  - Example: 10080 = 1 week

**What it does:**
1. Calculates new end date = Current time + specified minutes
2. Updates season end date in database
3. Season will auto-rotate when end time is reached
4. Does NOT change season start date

**Use cases:**
- Extend a season: `/rankedadmin season setend 10080` (extend by 1 week)
- Shorten a season: `/rankedadmin season setend 60` (end in 1 hour)
- Align season end with events

**Note:** Auto-rotation check runs every 10 minutes. Season will end within 10 minutes of scheduled time.

---

#### `/rankedadmin season create <duration_days> <name>`

Create a new custom season with specific duration and name.

**Permission:** OP level 2
**Usage:** `/rankedadmin season create 14 Winter Cup 2025`
**Allowed on:** Battle server only (single-server mode always allowed)

**Arguments:**
- `<duration_days>` - Season length in days
- `<name>` - Season name (can include spaces)

**What it does:**
1. Ends current active season if one exists
2. Creates new season with:
   - Custom name
   - Custom duration
   - Start date = current time
   - End date = current time + duration_days
3. Sets as active season
4. Clears reward collection flags

**Examples:**
```
/rankedadmin season create 7 Week 1 Sprint
/rankedadmin season create 30 January 2025 Season
/rankedadmin season create 14 Valentines Event
```

**Use cases:**
- Special event seasons (shorter durations)
- Named competitive seasons
- Testing season rotation

---

#### `/rankedadmin season rename <new_name>`

Rename the current active season.

**Permission:** OP level 2
**Usage:** `/rankedadmin season rename Spring Championship 2025`
**Allowed on:** Battle server only (single-server mode always allowed)

**Arguments:**
- `<new_name>` - New season name (can include spaces)

**What it does:**
1. Updates current season's name in database
2. Does NOT affect season ID, dates, or status
3. Changes are saved immediately

**Use cases:**
- Fix typos in season name
- Update season name for events
- Rebrand current season

**Example:**
```
Old name: Season 1
Command: /rankedadmin season rename Winter Championship
New name: Winter Championship
```

---

### Placeholder Management

#### `/rankedplaceholder test <placeholder>`

Test how a placeholder resolves to actual data.

**Permission:** OP level 2
**Usage:** `/rankedplaceholder test %cobbleranked_top_1_name%`

**What it does:**
1. Takes the placeholder string as input
2. Resolves it using PlaceholderService
3. Displays both input and resolved output

**Example output:**
```
[CobbleRanked Placeholder Test]
Input: %cobbleranked_top_1_name%
Result: Notch
```

**Use cases:**
- Verify placeholders work before using in holograms
- Test placeholder syntax
- Debug placeholder issues

---

#### `/rankedplaceholder clear`

Clear the placeholder resolution cache.

**Permission:** OP level 2
**Usage:** `/rankedplaceholder clear`

**What it does:**
1. Clears all cached placeholder values
2. Next placeholder resolution will query database
3. Cache rebuilds automatically (60-second TTL)

**Use cases:**
- Force immediate data refresh
- Test placeholder updates
- Debug caching issues

**Note:** Cache clears automatically every 60 seconds, so this is mainly for testing.

---

#### `/rankedplaceholder list`

Display all available placeholder formats with examples.

**Permission:** OP level 2
**Usage:** `/rankedplaceholder list`

**Output shows:**
- All format categories (All formats, Singles, Doubles)
- All available fields (name, elo, wins, losses, winrate, games)
- Syntax examples
- Rank range (1-100)
- Cache information

**Use cases:**
- Learn placeholder syntax
- Reference while setting up holograms
- Documentation

---

## Tab Completion

All commands support intelligent tab completion:

**Arena management:**
```
/rankedadmin setArena <TAB>          # Suggests existing arena names
/rankedadmin setArena main_arena <TAB>  # Suggests: pos1, pos2
/rankedadmin teleportArena <TAB>     # Suggests configured arenas
```

**Elo management:**
```
/rankedadmin setelo <amount> <player> <TAB>  # Suggests: SINGLES, DOUBLES
```

**Season management:**
```
/rankedadmin season <TAB>            # Suggests: info, history, rotate, end, setend, create, rename
```

**Placeholders:**
```
/rankedplaceholder <TAB>             # Suggests: test, clear, list
```

---

## Permission Summary

| Command | Permission Required | Cross-Server Notes |
|---------|-------------------|-------------------|
| `/ranked` | None (all players) | Works on all servers |
| `/season` | None (all players) | Works on all servers |
| `/rankedadmin reload` | OP level 2 | Works on all servers |
| `/rankedadmin setArena` | OP level 2 | Works on all servers |
| `/rankedadmin setexit` | OP level 2 | Works on all servers |
| `/rankedadmin teleportArena` | OP level 2 | Works on all servers |
| `/rankedadmin arena status` | OP level 2 | Works on all servers |
| `/rankedadmin setelo` | OP level 2 | Works on all servers |
| `/rankedadmin addelo` | OP level 2 | Works on all servers |
| `/rankedadmin removeelo` | OP level 2 | Works on all servers |
| `/rankedadmin setflee` | OP level 2 | Works on all servers |
| `/rankedadmin season info` | OP level 2 | Works on all servers |
| `/rankedadmin season history` | OP level 2 | Works on all servers |
| `/rankedadmin season rotate` | OP level 2 | **Battle server only** |
| `/rankedadmin season end` | OP level 2 | **Battle server only** |
| `/rankedadmin season setend` | OP level 2 | **Battle server only** |
| `/rankedadmin season create` | OP level 2 | **Battle server only** |
| `/rankedadmin season rename` | OP level 2 | **Battle server only** |
| `/rankedplaceholder test` | OP level 2 | Works on all servers |
| `/rankedplaceholder clear` | OP level 2 | Works on all servers |
| `/rankedplaceholder list` | OP level 2 | Works on all servers |

---

## Common Use Cases

### Setting up a new arena

```bash
# 1. Build the arena structure

# 2. Stand at Player 1 spawn point
/rankedadmin setArena volcano_arena pos1

# 3. Stand at Player 2 spawn point (facing Player 1)
/rankedadmin setArena volcano_arena pos2

# 4. Verify setup
/rankedadmin arena status

# 5. Test teleport
/rankedadmin teleportArena volcano_arena
```

### Adjusting player Elo

```bash
# Reset player to starting Elo
/rankedadmin setelo 1000 PlayerName SINGLES

# Reward player for event participation
/rankedadmin addelo 50 PlayerName SINGLES

# Correct accidental Elo gain
/rankedadmin removeelo 100 PlayerName DOUBLES
```

### Managing seasons

```bash
# Check current season
/rankedadmin season info

# View past seasons
/rankedadmin season history 10

# Create special 2-week event season
/rankedadmin season create 14 Valentine's Day Cup

# Extend current season by 1 week
/rankedadmin season setend 10080

# Manually start next season early
/rankedadmin season rotate
```

### Testing placeholders

```bash
# Test a placeholder
/rankedplaceholder test %cobbleranked_top_1_name%

# List all available placeholders
/rankedplaceholder list

# Clear cache to force refresh
/rankedplaceholder clear
```

---

**Related Documentation:**
- [Quick Start Guide](quick-start.md) - Initial setup
- [Arena Configuration](../configuration/arenas.md) - Detailed arena setup
- [Season Management](../features/seasons.md) - Season system details
- [Placeholder API](../integration/placeholders.md) - Complete placeholder reference
