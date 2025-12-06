# Commands

All commands available in CobbleRanked.

---

## Player Commands

**Permission:** None required

| Command | Description |
|---------|-------------|
| `/ranked` | Opens the ranked battle GUI |
| `/season` | Shows current season info |
| `/casual` | Opens casual battle GUI |
| `/casual missions` | Opens missions GUI directly |
| `/battlecamera toggle` | Toggle battle camera ON/OFF |
| `/battlecamera status` | Show current camera settings |

---

## Admin Commands

**Permission:** OP level 2 or `cobbleranked.admin.*`

### System

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload all configurations |
| `/battlecamera ml` | Toggle ML-enhanced camera mode |

---

### Arena Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> <pos>` | Set arena spawn position |
| `/rankedadmin setexit` | Set global exit location |
| `/rankedadmin teleportArena <arena>` | Teleport to arena's pos1 |
| `/rankedadmin arena status` | Show all arenas and status |
| `/rankedadmin arena enable <arena>` | Enable an arena |
| `/rankedadmin arena disable <arena>` | Disable an arena |
| `/rankedadmin arena setcenter <arena> [radius]` | Set battle camera center |

**Position Values:**

| Position | Description |
|----------|-------------|
| `pos1` | Player 1 spawn (Team 1) |
| `pos2` | Player 2 spawn (Team 2) |
| `pos3` | Player 3 spawn (Team 1 - MULTI only) |
| `pos4` | Player 4 spawn (Team 2 - MULTI only) |

> 📝 **Note:** pos3/pos4 are required for MULTI format (4-player battles). Without them, players are auto-positioned using offset fallback.

**Examples:**

```bash
# Basic arena (Singles/Doubles/Triples)
/rankedadmin setArena main_arena pos1
/rankedadmin setArena main_arena pos2

# MULTI format arena (4-player)
/rankedadmin setArena multi_arena pos1
/rankedadmin setArena multi_arena pos2
/rankedadmin setArena multi_arena pos3
/rankedadmin setArena multi_arena pos4

# Battle camera center
/rankedadmin arena setcenter main_arena
/rankedadmin arena setcenter main_arena 15

# Check status
/rankedadmin arena status
```

---

### Player Elo Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setelo <amount> <player> <format>` | Set player's Elo |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo to player |
| `/rankedadmin removeelo <amount> <player> <format>` | Remove Elo from player |
| `/rankedadmin setflee <player> <amount>` | Set flee count (0 clears penalty) |

**Valid Formats:** `SINGLES`, `DOUBLES`, `TRIPLES`, `MULTI`

**Examples:**

```bash
# Set Elo
/rankedadmin setelo 1500 Player123 SINGLES

# Add/Remove Elo
/rankedadmin addelo 100 Player123 DOUBLES
/rankedadmin removeelo 50 Player123 SINGLES

# Clear flee penalty
/rankedadmin setflee Player123 0
```

---

### Season Management

> ⚠️ **Battle Server Only:** Season management commands only work on the battle server in cross-server setups.

| Command | Description |
|---------|-------------|
| `/rankedadmin season info` | Show current season details |
| `/rankedadmin season history [limit]` | Show past seasons (default: 5) |
| `/rankedadmin season create <days> <name>` | Create new season |
| `/rankedadmin season rotate` | Force season rotation |
| `/rankedadmin season end` | End current season |
| `/rankedadmin season setend <minutes>` | Set season end time |
| `/rankedadmin season rename <name>` | Rename current season |

**Examples:**

```bash
# View season info
/rankedadmin season info
/rankedadmin season history 10

# Create new season
/rankedadmin season create 30 "Season 2 - Summer Cup"

# Modify season
/rankedadmin season rename "Winter Championship"
/rankedadmin season setend 1440  # End in 24 hours

# Force rotation
/rankedadmin season rotate
```

---

### Placeholder Commands

| Command | Description |
|---------|-------------|
| `/rankedplaceholder test <placeholder>` | Test a placeholder |
| `/rankedplaceholder list` | List all available placeholders |
| `/rankedplaceholder clear` | Clear placeholder cache |

**Placeholder Reference:**

| Category | Example | Description |
|----------|---------|-------------|
| **Player Stats** | `%cobbleranked_singles_elo%` | Player's Elo |
| | `%cobbleranked_singles_rank%` | Leaderboard position |
| | `%cobbleranked_singles_wins%` | Total wins |
| | `%cobbleranked_singles_tier%` | Tier name (Gold, etc.) |
| **Leaderboard** | `%cobbleranked_top_singles_1_name%` | #1 player name |
| | `%cobbleranked_top_singles_1_elo%` | #1 player Elo |
| | `%cobbleranked_top_doubles_1_name%` | #1 Doubles player |
| **Season** | `%cobbleranked_season_name%` | Season name |
| | `%cobbleranked_season_remaining%` | Time remaining |
| | `%cobbleranked_season_status%` | "active" or "ended" |

> 📝 **Note:** Replace `singles` with `doubles`, `triples`, or `multi` for other formats.

See [Placeholder API](../integration/placeholders.md) for complete list.

---

## Tab Completion

All commands have smart tab completion:

- **Arena names** - Auto-complete from configured arenas
- **Player names** - Show online players
- **Formats** - `SINGLES`, `DOUBLES`, `TRIPLES`, `MULTI`
- **Positions** - `pos1`, `pos2`, `pos3`, `pos4`

---

## Permissions

| Permission | Description |
|------------|-------------|
| Default | Player commands require no permission |
| OP Level 2 | Admin commands require OP level 2 |
| `cobbleranked.admin.*` | Alternative to OP for admin access |

For fine-grained permission control, see [LuckPerms Integration](../integration/luckperms.md).

---

## See Also

- [Arena Setup](../configuration/arenas.md) - Detailed arena configuration
- [LuckPerms Integration](../integration/luckperms.md) - Permission setup
- [Placeholder API](../integration/placeholders.md) - Full placeholder list
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
