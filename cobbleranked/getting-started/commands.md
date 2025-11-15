# Commands

All commands available in CobbleRanked.

## Player Commands

**Permission:** None required

### `/ranked`

Opens the ranked GUI for queue, stats, and leaderboards.

### `/season`

Shows current season info (name, status, time remaining).

## Admin Commands

**Permission:** OP level 2 required

### System

**`/rankedadmin reload`** - Reload all configs (except cross-server mode)

### Arena Management

**`/rankedadmin setArena <name> <pos1|pos2>`** - Set arena corner positions
- Stand at location and run command
- Example: `/rankedadmin setArena arena1 pos1`

**`/rankedadmin setexit`** - Set player exit location after battles
- Stand at desired exit location and run command

**`/rankedadmin teleportArena <arena>`** - Teleport to arena center

**`/rankedadmin arena status`** - Show all arenas and their in-use status

**`/rankedadmin arena enable <arena>`** - Enable an arena

**`/rankedadmin arena disable <arena>`** - Disable an arena

### Player Elo Management

**`/rankedadmin setelo <amount> <player> <format>`** - Set player's Elo
- Format: `SINGLES`, `DOUBLES`, `TRIPLES`, `MULTI`
- Example: `/rankedadmin setelo 1500 Player123 SINGLES`

**`/rankedadmin addelo <amount> <player> <format>`** - Add Elo points

**`/rankedadmin removeelo <amount> <player> <format>`** - Remove Elo points

**`/rankedadmin setflee <player> <amount>`** - Set flee count
- Use `0` to clear flee penalty

### Season Management

**Battle server only** - These commands only work on the server configured as battle server (`cross_server.battle_server: ""`).

**`/rankedadmin season info`** - Show current season details

**`/rankedadmin season history [limit]`** - Show past seasons (default: 5)

**`/rankedadmin season create <days> <name>`** - Create new season
- Automatically ends current season
- Example: `/rankedadmin season create 30 "Season 2 - Summer Cup"`

**`/rankedadmin season rotate`** - Force season rotation (start next season)

**`/rankedadmin season end`** - End current season immediately

**`/rankedadmin season setend <minutes>`** - Set season end time from now

**`/rankedadmin season rename <name>`** - Rename current season

## Tab Completion

All commands have smart tab completion:

- Arena names auto-complete from configured arenas
- Player names show online players
- Formats suggest valid options (SINGLES, DOUBLES, etc.)
- Elo amounts suggest common values (1000, 1200, 1500)
- Season durations suggest common periods (7, 14, 30 days)

## Permission Nodes

With LuckPerms installed, you can use these permission nodes:

- `cobbleranked.command.ranked` - /ranked command
- `cobbleranked.command.season` - /season command
- `cobbleranked.command.admin.*` - All admin commands
- `cobbleranked.command.admin.reload` - Reload command
- `cobbleranked.command.admin.arena` - Arena commands
- `cobbleranked.command.admin.elo` - Elo management
- `cobbleranked.command.admin.season` - Season management

**Note:** Permission system defaults to OP level 2 checks if LuckPerms is not installed.
