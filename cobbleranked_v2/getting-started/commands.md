# Commands & Permissions

Complete reference for all CobbleRanked commands.

---

## Player Commands

**Permission:** None required

| Command | Description |
|---------|-------------|
| `/ranked` | Opens the ranked battle GUI |
| `/casual` | Opens casual battle GUI |
| `/season` | Shows current season info |
| `/rewards` | View available rewards |
| `/battlecamera toggle` | Toggle battle camera ON/OFF |
| `/battlecamera status` | Show current camera settings |

---

## Admin Commands

**Permission:** OP level 4 or `cobbleranked.admin`

### System Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload all configuration files |
| `/rankedadmin closeRanked` | Toggle ranked system on/off |

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
| `/rankedadmin arena reset` | Reset arena in-use status |

**Position Values:**

| Position | Description |
|----------|-------------|
| `pos1` | Player 1 spawn position |
| `pos2` | Player 2 spawn position |
| `exit` | Return location after battle |
| `spectator` | Camera center (optional) |

**Examples:**

```bash
# Create a new arena
/rankedadmin setArena main_arena pos1    # Stand at player 1 position
/rankedadmin setArena main_arena pos2    # Stand at player 2 position
/rankedadmin setArena main_arena exit    # Stand at exit position

# Battle camera center (optional)
/rankedadmin arena setcenter main_arena
/rankedadmin arena setcenter main_arena 15

# Check status
/rankedadmin arena status

# Disable arena during maintenance
/rankedadmin arena disable main_arena
```

---

### Player Elo Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setelo <player> <format> <elo>` | Set player's Elo |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo to player |
| `/rankedadmin removeelo <amount> <player> <format>` | Remove Elo from player |
| `/rankedadmin setflee <player> <count>` | Set flee count (0 clears penalty) |

**Valid Formats:** `SINGLES`, `DOUBLES`, `TRIPLES`

**Examples:**

```bash
# Set Elo
/rankedadmin setelo Steve SINGLES 1500

# Add/Remove Elo
/rankedadmin addelo 100 Steve DOUBLES
/rankedadmin removeelo 50 Steve SINGLES

# Clear flee penalty
/rankedadmin setflee Steve 0
```

---

### Season Management

| Command | Description |
|---------|-------------|
| `/rankedadmin season info` | Show current season details |
| `/rankedadmin season history [limit]` | Show past seasons (default: 10) |
| `/rankedadmin season rotate` | Force season rotation |
| `/rankedadmin season end` | End current season |
| `/rankedadmin season setend <minutes>` | Set season end time |
| `/rankedadmin season rename <name>` | Rename current season |

**Examples:**

```bash
# View season info
/rankedadmin season info
/rankedadmin season history 10

# Modify season
/rankedadmin season rename "Winter Championship"
/rankedadmin season setend 1440  # End in 24 hours (1440 minutes)

# Force rotation
/rankedadmin season rotate
```

> ⚠️ **Cross-Server:** Season management commands only work on the battle server in cross-server setups.

---

### Placeholder Commands

| Command | Description |
|---------|-------------|
| `/rankedplaceholder test <placeholder>` | Test a placeholder value |
| `/rankedplaceholder list` | List all available placeholders |
| `/rankedplaceholder clear` | Clear placeholder cache |

**Examples:**

```bash
# Test placeholder
/rankedplaceholder test %cobbleranked_singles_elo%

# List all placeholders
/rankedplaceholder list
```

---

## Placeholder Reference

### Player Stats

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `%cobbleranked_singles_elo%` | Singles Elo | `1250` |
| `%cobbleranked_singles_rank%` | Leaderboard position | `#5` |
| `%cobbleranked_singles_wins%` | Total wins | `42` |
| `%cobbleranked_singles_losses%` | Total losses | `15` |
| `%cobbleranked_singles_winrate%` | Win percentage | `73` |
| `%cobbleranked_singles_tier%` | Rank tier name | `Ultra Ball` |
| `%cobbleranked_singles_streak%` | Current win streak | `5` |

> 📝 **Note:** Replace `singles` with `doubles` or `triples` for other formats.

### Leaderboard

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_top_singles_1_name%` | #1 player name |
| `%cobbleranked_top_singles_1_elo%` | #1 player Elo |
| `%cobbleranked_top_singles_N_name%` | #N player name |
| `%cobbleranked_top_singles_N_elo%` | #N player Elo |

### Season

| Placeholder | Description |
|-------------|-------------|
| `%cobbleranked_season_name%` | Current season name |
| `%cobbleranked_season_remaining%` | Time remaining |
| `%cobbleranked_season_status%` | `active` or `ended` |

**See:** [Placeholder API](../integration/placeholders.md)

---

## Tab Completion

All commands have smart tab completion:

| Type | Completion |
|------|------------|
| Arena names | Auto-complete from configured arenas |
| Player names | Online players |
| Formats | `SINGLES`, `DOUBLES`, `TRIPLES` |
| Positions | `pos1`, `pos2`, `exit`, `spectator` |

---

## Permissions

### Default Permissions

| Command | Requirement |
|---------|-------------|
| `/ranked` | None (all players) |
| `/casual` | None (all players) |
| `/season` | None (all players) |
| `/rankedadmin *` | OP level 4 |

### LuckPerms Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.ranked` | Access `/ranked` command |
| `cobbleranked.casual` | Access `/casual` command |
| `cobbleranked.camera` | Access `/battlecamera` command |
| `cobbleranked.admin` | Access all admin commands |
| `cobbleranked.admin.reload` | Reload configuration |
| `cobbleranked.admin.elo` | Modify player Elo |
| `cobbleranked.admin.arena` | Manage arenas |
| `cobbleranked.admin.season` | Manage seasons |

**See:** [LuckPerms Integration](../integration/luckperms.md)

---

## Command Shortcuts

Common command aliases:

| Alias | Full Command |
|-------|--------------|
| `/cr` | `/ranked` |
| `/cc` | `/casual` |
| `/cra` | `/rankedadmin` |

---

## See Also

- [Quick Start](quick-start.md) - Basic setup guide
- [Arena Setup](../configuration/arenas.md) - Detailed arena configuration
- [LuckPerms Integration](../integration/luckperms.md) - Permission setup
- [Placeholder API](../integration/placeholders.md) - Full placeholder list
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
