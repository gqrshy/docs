---
title: Commands
description: Complete list of CobbleRanked commands.
---

Complete list of CobbleRanked commands.

## Player Commands

### Ranked Battles

| Command | Description | Permission |
|---------|-------------|------------|
| `/ranked` | Open ranked battle GUI | `cobbleranked.command.ranked` |

> All stats, leaderboard, and queue functions are accessible through the `/ranked` GUI.

### Casual Battles

| Command | Description | Permission |
|---------|-------------|------------|
| `/casual` | Open casual battle GUI | `cobbleranked.command.casual` |
| `/casual missions` | View daily/weekly missions | `cobbleranked.command.casual` |

### Battle Camera

| Command | Description | Permission |
|---------|-------------|------------|
| `/battlecamera` | Show camera help | `cobbleranked.command.battlecamera` |
| `/battlecamera toggle` | Enable/disable battle camera | `cobbleranked.command.battlecamera` |
| `/battlecamera status` | Show detailed camera status | `cobbleranked.command.battlecamera` |

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
| `cobbleranked.command.ranked` | Use /ranked command | true |
| `cobbleranked.command.casual` | Use /casual command | true |
| `cobbleranked.command.battlecamera` | Use /battlecamera command | true |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.admin` | All admin commands | op |

### Bypass Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.bypass.cooldown` | Bypass queue cooldown | op |
| `cobbleranked.bypass.blacklist` | Bypass Pokemon blacklist | false |

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
