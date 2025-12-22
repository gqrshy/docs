# Commands

Complete reference for all CobbleRanked commands.

---

## Player Commands

Commands available to all players.

| Command | Description |
|---------|-------------|
| `/ranked` | Open ranked battle GUI |
| `/casual` | Open casual battle GUI (no Elo changes) |
| `/battlecamera` | Toggle battle spectator camera |

---

## Admin Commands

All admin commands require OP level 4 or `cobbleranked.admin` permission.

### Configuration

| Command | Description |
|---------|-------------|
| `/rankedadmin reload` | Reload all configuration files |

### Player Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setelo <player> <format> <elo>` | Set player's Elo rating |
| `/rankedadmin addelo <amount> <player> <format>` | Add Elo to player |
| `/rankedadmin removeelo <amount> <player> <format>` | Remove Elo from player |
| `/rankedadmin setflee <player> <count>` | Set player's flee count |

**Examples:**

```bash
# Set player's Singles Elo to 1500
/rankedadmin setelo Steve SINGLES 1500

# Add 100 Elo to player's Doubles rating
/rankedadmin addelo 100 Steve DOUBLES

# Reset flee count to 0
/rankedadmin setflee Steve 0
```

### Arena Management

| Command | Description |
|---------|-------------|
| `/rankedadmin setArena <name> <pos>` | Set arena position (pos1, pos2, exit, spectator) |
| `/rankedadmin setexit` | Set global exit position |
| `/rankedadmin teleportArena <name>` | Teleport to arena |
| `/rankedadmin arena status` | View all arena statuses |
| `/rankedadmin arena enable <name>` | Enable an arena |
| `/rankedadmin arena disable <name>` | Disable an arena |
| `/rankedadmin arena setcenter <name> [radius]` | Set arena center and radius |
| `/rankedadmin arena reset` | Reset arena in-use status |

**Examples:**

```bash
# Create a new arena called "arena1"
/rankedadmin setArena arena1 pos1    # Stand at player 1 position
/rankedadmin setArena arena1 pos2    # Stand at player 2 position
/rankedadmin setArena arena1 exit    # Stand at exit position

# Check arena status
/rankedadmin arena status

# Disable arena during maintenance
/rankedadmin arena disable arena1
```

---

## Command Permissions

### With LuckPerms

When LuckPerms is installed, use these permission nodes:

| Permission | Description |
|------------|-------------|
| `cobbleranked.ranked` | Access `/ranked` command |
| `cobbleranked.casual` | Access `/casual` command |
| `cobbleranked.camera` | Access `/battlecamera` command |
| `cobbleranked.admin` | Access all `/rankedadmin` commands |
| `cobbleranked.admin.reload` | Reload configuration |
| `cobbleranked.admin.elo` | Modify player Elo |
| `cobbleranked.admin.arena` | Manage arenas |

### Without LuckPerms

Default Minecraft permissions:

| Command | Requirement |
|---------|-------------|
| `/ranked` | None (all players) |
| `/casual` | None (all players) |
| `/rankedadmin *` | OP level 4 |

---

## Format Values

When specifying format in commands, use these values:

| Format | Value |
|--------|-------|
| Singles | `SINGLES` |
| Doubles | `DOUBLES` |
| Triples | `TRIPLES` |

---

## See Also

- [Quick Start](quick-start.md) - Basic setup
- [LuckPerms Integration](../integration/luckperms.md) - Permission configuration
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
