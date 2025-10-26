# Commands & Permissions

Complete reference for all CobbleRanked commands and their permission nodes.

## Player Commands

Commands available to all players:

### `/ranked`

Opens the main ranked GUI for queue management and leaderboards.

- **Aliases:** `/rankedgui`, `/rankgui`
- **Permission:** `cobbleranked.gui` (default: true)
- **Usage:** `/ranked`

**GUI Features:**
- Join queue for Singles/Doubles/Multi
- View leaderboard
- Check your stats
- Claim milestone rewards

---

### `/elo [player]`

Check your current Elo rating or another player's rating.

- **Permission:** `cobbleranked.elo` (default: true)
- **Usage:**
  ```
  /elo                    # Check your own Elo
  /elo PlayerName         # Check another player's Elo
  ```

**Output:**
```
Your Elo Rating: 1247
Wins: 15 | Losses: 8 | Win Rate: 65.2%
Flee Count: 0
```

---

### `/leaderboard [format]`

Display the top 10 ranked players.

- **Aliases:** `/lb`, `/top`, `/ranktop`
- **Permission:** `cobbleranked.leaderboard` (default: true)
- **Usage:**
  ```
  /leaderboard            # Overall leaderboard
  /leaderboard singles    # Singles format only
  /leaderboard doubles    # Doubles format only
  /leaderboard multi      # Multi format only
  ```

---

### `/queue join [format]`

Join the ranked queue directly (alternative to GUI).

- **Permission:** `cobbleranked.queue` (default: true)
- **Usage:**
  ```
  /queue join singles
  /queue join doubles
  /queue join multi
  ```

---

### `/queue leave`

Leave the ranked queue.

- **Permission:** `cobbleranked.queue` (default: true)
- **Usage:** `/queue leave`

---

### `/stats [player]`

View detailed ranked statistics.

- **Permission:** `cobbleranked.stats` (default: true)
- **Usage:**
  ```
  /stats                  # Your stats
  /stats PlayerName       # Another player's stats
  ```

**Output:**
```
═══════════════════════════════
  Ranked Stats - PlayerName
═══════════════════════════════
Elo Rating: 1247
Total Battles: 23
Wins: 15 | Losses: 8
Win Rate: 65.2%
Flee Count: 0
Current Season: Season 1
```

---

## Admin Commands

Commands for server administrators:

### `/rankedarena`

Main admin command for CobbleRanked management.

- **Permission:** `cobbleranked.admin`
- **Aliases:** `/radmin`

---

### `/rankedarena reload`

Reload all configuration files without restarting the server.

- **Permission:** `cobbleranked.admin.reload`
- **Usage:** `/rankedarena reload`

**Reloads:**
- `config.json5`
- `blacklist.json5`
- `arenas.json5`
- `rewards.json5`
- All language files
- All GUI files

---

### `/rankedarena arena set <name>`

Create or update a battle arena at your current location.

- **Permission:** `cobbleranked.admin.arena`
- **Usage:** `/rankedarena arena set <arena_name>`
- **Example:**
  ```
  /rankedarena arena set volcano_arena
  ```

**Notes:**
- Stand at the desired spawn point before running the command
- Coordinates and world are automatically saved
- Arenas are saved to `arenas.json5`

---

### `/rankedarena arena remove <name>`

Delete a battle arena.

- **Permission:** `cobbleranked.admin.arena`
- **Usage:** `/rankedarena arena remove <arena_name>`
- **Example:**
  ```
  /rankedarena arena remove old_arena
  ```

---

### `/rankedarena arena list`

List all configured arenas.

- **Permission:** `cobbleranked.admin.arena`
- **Usage:** `/rankedarena arena list`

**Output:**
```
Configured Arenas (3):
  1. main_arena (world: minecraft:overworld, x: 100, y: 64, z: 200)
  2. volcano_arena (world: minecraft:nether, x: 50, y: 80, z: -150)
  3. ice_arena (world: minecraft:overworld, x: -200, y: 70, z: 300)
```

---

### `/rankedarena arena tp <name>`

Teleport to a specific arena.

- **Permission:** `cobbleranked.admin.arena`
- **Usage:** `/rankedarena arena tp <arena_name>`

---

### `/rankedarena season info`

Display current season information.

- **Permission:** `cobbleranked.admin.season`
- **Usage:** `/rankedarena season info`

**Output:**
```
Current Season: Season 1
Season ID: 1
Started: 2025-10-26 00:00:00
Ends: 2025-11-25 23:59:59
Days Remaining: 30
```

---

### `/rankedarena season rotate`

Manually start a new season.

- **Permission:** `cobbleranked.admin.season`
- **Usage:** `/rankedarena season rotate`

**Actions:**
1. Ends current season
2. Distributes season rewards to top 3 players
3. Clears reward collection flags
4. Creates new season
5. Announces to all online players

**Warning:** This does NOT reset Elo ratings. Player stats are preserved across seasons.

---

### `/rankedarena season rewards <player>`

Manually grant season rewards to a player.

- **Permission:** `cobbleranked.admin.season`
- **Usage:** `/rankedarena season rewards <player>`

---

### `/rankedarena elo set <player> <amount>`

Set a player's Elo rating.

- **Permission:** `cobbleranked.admin.elo`
- **Usage:** `/rankedarena elo set <player> <elo>`
- **Example:**
  ```
  /rankedarena elo set PlayerName 1500
  ```

---

### `/rankedarena elo add <player> <amount>`

Add Elo points to a player.

- **Permission:** `cobbleranked.admin.elo`
- **Usage:** `/rankedarena elo add <player> <amount>`
- **Example:**
  ```
  /rankedarena elo add PlayerName 100
  ```

---

### `/rankedarena elo remove <player> <amount>`

Remove Elo points from a player.

- **Permission:** `cobbleranked.admin.elo`
- **Usage:** `/rankedarena elo remove <player> <amount>`

---

### `/rankedarena stats reset <player>`

Reset a player's ranked statistics.

- **Permission:** `cobbleranked.admin.stats`
- **Usage:** `/rankedarena stats reset <player>`

**Resets:**
- Elo to 1000
- Wins to 0
- Losses to 0
- Flee count to 0
- Milestone reward flags

---

### `/rankedarena flee reset <player>`

Reset a player's flee count (disconnect penalties).

- **Permission:** `cobbleranked.admin.flee`
- **Usage:** `/rankedarena flee reset <player>`

---

### `/rankedarena database migrate <from> <to>`

Migrate database from SQLite to MySQL or vice versa.

- **Permission:** `cobbleranked.admin.database`
- **Usage:** `/rankedarena database migrate sqlite mysql`

**Supported migrations:**
- `sqlite` → `mysql`
- `mysql` → `sqlite`

---

### `/rankedarena debug toggle`

Toggle debug mode for detailed logging.

- **Permission:** `cobbleranked.admin.debug`
- **Usage:** `/rankedarena debug toggle`

**Debug info:**
- Queue state
- Matchmaking logic
- Battle flow
- Database queries
- Config loading

---

## Permission Nodes

Complete list of permission nodes for permission plugin configuration.

### Player Permissions

| Permission | Default | Description |
|------------|---------|-------------|
| `cobbleranked.gui` | true | Access `/ranked` GUI |
| `cobbleranked.elo` | true | Check Elo ratings |
| `cobbleranked.leaderboard` | true | View leaderboards |
| `cobbleranked.queue` | true | Join/leave queue |
| `cobbleranked.stats` | true | View statistics |

### Admin Permissions

| Permission | Default | Description |
|------------|---------|-------------|
| `cobbleranked.admin` | op | Parent admin permission |
| `cobbleranked.admin.reload` | op | Reload configurations |
| `cobbleranked.admin.arena` | op | Manage arenas |
| `cobbleranked.admin.season` | op | Manage seasons |
| `cobbleranked.admin.elo` | op | Modify Elo ratings |
| `cobbleranked.admin.stats` | op | Reset player stats |
| `cobbleranked.admin.flee` | op | Reset flee counts |
| `cobbleranked.admin.database` | op | Database operations |
| `cobbleranked.admin.debug` | op | Debug mode |

### Wildcard Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.*` | All player permissions |
| `cobbleranked.admin.*` | All admin permissions |

## Permission Plugin Examples

### LuckPerms

Grant all player permissions:
```
/lp group default permission set cobbleranked.* true
```

Grant admin permissions to moderators:
```
/lp group moderator permission set cobbleranked.admin.* true
```

Grant specific permission:
```
/lp user PlayerName permission set cobbleranked.admin.arena true
```

### PermissionsEx (PEx)

```yaml
groups:
  default:
    permissions:
      - cobbleranked.gui
      - cobbleranked.elo
      - cobbleranked.leaderboard
      - cobbleranked.queue
      - cobbleranked.stats

  admin:
    permissions:
      - cobbleranked.admin.*
```

## Command Aliases

Quick reference for command aliases:

| Full Command | Aliases |
|--------------|---------|
| `/ranked` | `/rankedgui`, `/rankgui` |
| `/leaderboard` | `/lb`, `/top`, `/ranktop` |
| `/rankedarena` | `/radmin` |

## Auto-Completion

All commands support tab completion:

```
/rankedarena arena <TAB>        # Shows: set, remove, list, tp
/rankedarena season <TAB>       # Shows: info, rotate, rewards
/queue join <TAB>               # Shows: singles, doubles, multi
```

---

**Next:** Learn about [Ranked Battles](../features/ranked-battles.md) to understand battle flow.
