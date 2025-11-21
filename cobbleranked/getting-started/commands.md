# Commands

All commands available in CobbleRanked.

## Player Commands

**Permission:** None required

| Command | Description |
|---------|-------------|
| `/ranked` | Opens the ranked GUI for queue, stats, and leaderboards |
| `/season` | Shows current season info (name, status, time remaining) |
| `/casual` | Opens casual battle/missions GUI |

> **[📸 IMAGE NEEDED: /rankedコマンド実行時のGUI表示例]**

> **[📸 IMAGE NEEDED: /seasonコマンド実行結果（シーズン名、開始日、終了日、残り時間の表示）]**

---

## Admin Commands

**Permission:** OP level 2 required

### System Management

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload all configs (excludes cross-server database settings) |

---

### Arena Management

| Command | Parameters | Description |
|---------|------------|-------------|
| `/rankedadmin setArena <name> <pos>` | `<name>` Arena name<br>`<pos>` Position (pos1, pos2, pos3, pos4) | Set arena spawn position at current location |
| `/rankedadmin setexit` | None | Set player exit location after battles (teleport to this location after battle ends) |
| `/rankedadmin teleportArena <arena>` | `<arena>` Arena name | Teleport to arena center |
| `/rankedadmin arena status` | None | Show all arenas and their in-use status |
| `/rankedadmin arena enable <arena>` | `<arena>` Arena name | Enable an arena |
| `/rankedadmin arena disable <arena>` | `<arena>` Arena name | Disable an arena |

**Examples:**
```bash
# Create arena with 2 spawn points (for Singles/Doubles/Triples)
/rankedadmin setArena main_arena pos1
/rankedadmin setArena main_arena pos2

# Create arena with 4 spawn points (for MULTI mode)
/rankedadmin setArena multi_arena pos1
/rankedadmin setArena multi_arena pos2
/rankedadmin setArena multi_arena pos3
/rankedadmin setArena multi_arena pos4

# Check arena status
/rankedadmin arena status
```

> **[📸 IMAGE NEEDED: /rankedadmin arena statusコマンド実行結果（アリーナ一覧と使用状況）]**

---

### Player Elo Management

| Command | Parameters | Description |
|---------|------------|-------------|
| `/rankedadmin setelo <amount> <player> <format>` | `<amount>` New Elo value<br>`<player>` Player name<br>`<format>` Battle format | Set player's Elo to specific value |
| `/rankedadmin addelo <amount> <player> <format>` | `<amount>` Elo to add<br>`<player>` Player name<br>`<format>` Battle format | Add Elo points to player |
| `/rankedadmin removeelo <amount> <player> <format>` | `<amount>` Elo to remove<br>`<player>` Player name<br>`<format>` Battle format | Remove Elo points from player |
| `/rankedadmin setflee <player> <amount>` | `<player>` Player name<br>`<amount>` Flee count | Set flee count (use 0 to clear penalty) |

**Valid Formats:**
- `SINGLES` - 1v1 battles
- `DOUBLES` - 2v2 battles
- `TRIPLES` - 3v3 battles
- `MULTI` - Team battles (2v2 players)

**Examples:**
```bash
# Set player Elo to 1500 for Singles
/rankedadmin setelo 1500 Player123 SINGLES

# Add 100 Elo points
/rankedadmin addelo 100 Player123 DOUBLES

# Clear flee penalty
/rankedadmin setflee Player123 0
```

---

### Season Management

**Battle server only** - These commands only work on the server configured as battle server (`cross_server.battle_server: ""`).

| Command | Parameters | Description |
|---------|------------|-------------|
| `/rankedadmin season info` | None | Show current season details (name, start/end dates, duration) |
| `/rankedadmin season history [limit]` | `[limit]` Number of seasons (default: 5) | Show past seasons |
| `/rankedadmin season create <days> <name>` | `<days>` Season duration<br>`<name>` Season name | Create new season (automatically ends current season) |
| `/rankedadmin season rotate` | None | Force season rotation (start next season immediately) |
| `/rankedadmin season end` | None | End current season immediately |
| `/rankedadmin season setend <minutes>` | `<minutes>` Minutes from now | Set season end time |
| `/rankedadmin season rename <name>` | `<name>` New season name | Rename current season |

**Examples:**
```bash
# Create a 30-day season
/rankedadmin season create 30 "Season 2 - Summer Cup"

# Rotate to next season immediately
/rankedadmin season rotate

# End season in 24 hours
/rankedadmin season setend 1440
```

---

### Random Battle Management

| Command | Parameters | Description |
|---------|------------|-------------|
| `/rankedadmin randombattle reload` | None | Reload all random battle pool configurations |
| `/rankedadmin randombattle list` | None | Show all available pools and their status |
| `/rankedadmin randombattle generate <pool> [player]` | `<pool>` Pool name<br>`[player]` Target player (optional) | Generate a random team for testing |

---

### Placeholder Commands

| Command | Description |
|---------|-------------|
| `/rankedplaceholder test <placeholder>` | Test a placeholder (e.g., `%cobbleranked_top_1_name%`) |
| `/rankedplaceholder list` | List all available placeholders |
| `/rankedplaceholder clear` | Clear placeholder cache |

---

## Tab Completion

All commands have smart tab completion:

- **Arena names** - Auto-complete from configured arenas
- **Player names** - Show online players
- **Formats** - Suggest valid options (SINGLES, DOUBLES, TRIPLES, MULTI)
- **Elo amounts** - Suggest common values (1000, 1200, 1500)
- **Season durations** - Suggest common periods (7, 14, 30 days)

---

## Permission Nodes

With LuckPerms installed, you can use these permission nodes:

| Permission Node | Description |
|-----------------|-------------|
| `cobbleranked.command.ranked` | `/ranked` command |
| `cobbleranked.command.season` | `/season` command |
| `cobbleranked.command.admin.*` | All admin commands |
| `cobbleranked.command.admin.reload` | Reload command |
| `cobbleranked.command.admin.arena` | Arena commands |
| `cobbleranked.command.admin.elo` | Elo management |
| `cobbleranked.command.admin.season` | Season management |

**Note:** Permission system defaults to OP level 2 checks if LuckPerms is not installed.
