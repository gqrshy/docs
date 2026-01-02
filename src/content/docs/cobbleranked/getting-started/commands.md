---
title: Commands
description: Complete list of CobbleRanked commands.
---

Complete list of CobbleRanked commands.

## Player Commands

### Ranked Battles

| Command | Description | Permission |
|---------|-------------|------------|
| `/ranked` | Open ranked battle GUI | `cobbleranked.player.use` |

> All stats, leaderboard, and queue functions are accessible through the `/ranked` GUI.

### Casual Battles

| Command | Description | Permission |
|---------|-------------|------------|
| `/casual` | Open casual battle GUI | `cobbleranked.player.casual.use` |
| `/casual missions` | View daily/weekly missions | `cobbleranked.player.casual.use` |

### Battle Camera

| Command | Description | Permission |
|---------|-------------|------------|
| `/battlecamera` | Show camera help | `cobbleranked.player.use` |
| `/battlecamera toggle` | Enable/disable battle camera | `cobbleranked.player.use` |
| `/battlecamera status` | Show detailed camera status | `cobbleranked.player.use` |

## Admin Commands

All admin commands require OP level 4 or `cobbleranked.admin` permission.

### Configuration

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload configuration files |

### Season Management

| Command | Description |
|---------|-------------|
| `/rankedadmin season info` | Show current season info |
| `/rankedadmin season rotate` | Check and apply season rotation |

### Arena Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> <pos1\|pos2\|exit\|spectator>` | Set arena position |
| `/rankedadmin setexit` | Set global exit position |
| `/rankedadmin teleportArena <name>` | Teleport to an arena |
| `/rankedadmin arena status` | Show all arena statuses |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena |
| `/rankedadmin arena setcenter <name> [radius]` | Set field effect center |
| `/rankedadmin arena reset` | Reset all arena states |

### Player Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setelo <player> <format> <elo>` | Set player's ELO |
| `/rankedadmin addelo <amount> <player> <format>` | Add ELO to player |
| `/rankedadmin removeelo <amount> <player> <format>` | Remove ELO from player |
| `/rankedadmin setflee <player> <amount>` | Set player's flee count |

### Queue Management

| Command | Description |
|---------|-------------|
| `/rankedadmin queue clear` | Clear all queues |

### Usage Stats

| Command | Description |
|---------|-------------|
| `/rankedadmin usage info` | Show usage stats info |
| `/rankedadmin usage export [seasonName]` | Export usage stats |
| `/rankedadmin usage clear <seasonName>` | Clear usage stats for season |

### Leaderboard Export

| Command | Description |
|---------|-------------|
| `/rankedadmin leaderboard export [seasonName] [limit]` | Export leaderboard data |

### Placeholders

| Command | Description |
|---------|-------------|
| `/rankedadmin placeholder list` | List all available placeholders |
| `/rankedadmin placeholder test <placeholder>` | Test a placeholder |
| `/rankedadmin placeholder clear` | Clear placeholder cache |

### Data Migration (v1 to v2)

| Command | Description |
|---------|-------------|
| `/rankedadmin migrate sqlite <v1_db_path> <season_name>` | Migrate from v1 SQLite |
| `/rankedadmin migrate mysql <host> <db> <user> <pass> <season>` | Migrate from v1 MySQL |
| `/rankedadmin migrate mongodb <uri> <db> <season_name>` | Migrate from v1 MongoDB |
| `/rankedadmin migrate season <v1_config_path>` | Migrate v1 season config |

## Permission Nodes

### Player Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.player.use` | Use /ranked and /battlecamera commands | true |
| `cobbleranked.player.casual.use` | Use /casual command | true |
| `cobbleranked.player.queue.join` | Join ranked queue | true |
| `cobbleranked.player.queue.leave` | Leave ranked queue | true |
| `cobbleranked.player.stats.view` | View own stats | true |
| `cobbleranked.player.leaderboard.view` | View leaderboard | true |

### Format Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.player.format.singles` | Queue for Singles format | true |
| `cobbleranked.player.format.doubles` | Queue for Doubles format | true |
| `cobbleranked.player.format.triples` | Queue for Triples format | true |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.admin.*` | All admin commands | op |
| `cobbleranked.admin.arena.*` | Arena management | op |
| `cobbleranked.admin.config.reload` | Reload configuration | op |
| `cobbleranked.admin.player.setelo` | Set player ELO | op |
| `cobbleranked.admin.queue.clear` | Clear queues | op |
| `cobbleranked.admin.season.*` | Season management | op |

### Bypass Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.player.bypass.cooldown` | Bypass queue cooldown | false |
| `cobbleranked.player.bypass.queuelimit` | Bypass queue player limit | false |

## Examples

### Open Ranked Menu
```
/ranked
```
Access stats, leaderboard, and queue from the GUI.

### Toggle Battle Camera
```
/battlecamera toggle
```

### Admin: Set player ELO
```
/rankedadmin setelo Steve SINGLES 1800
```

### Admin: View season info
```
/rankedadmin season info
```

### Admin: Set up arena
```
/rankedadmin setArena arena1 pos1
/rankedadmin setArena arena1 pos2
```

---

## See Also

- [LuckPerms Integration](/docs/cobbleranked/integration/luckperms/) - Permission management
- [Arena Setup](/docs/cobbleranked/configuration/arenas/) - Configure battle arenas
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
