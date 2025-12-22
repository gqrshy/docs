# LuckPerms Integration

Permission management with LuckPerms.

---

## Overview

When LuckPerms is installed, CobbleRanked uses permission nodes instead of OP levels for access control.

---

## Permission Nodes

### Player Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.ranked` | Access `/ranked` command | true |
| `cobbleranked.casual` | Access `/casual` command | true |
| `cobbleranked.camera` | Access `/battlecamera` command | true |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `cobbleranked.admin` | Access all admin commands | op |
| `cobbleranked.admin.reload` | Reload configuration | op |
| `cobbleranked.admin.elo` | Modify player Elo | op |
| `cobbleranked.admin.arena` | Manage arenas | op |
| `cobbleranked.admin.flee` | Reset flee counts | op |

---

## Configuration

Edit `config/cobbleranked/luckperms.yaml`:

```yaml
# Permission node mappings
permissions:
  ranked: "cobbleranked.ranked"
  casual: "cobbleranked.casual"
  camera: "cobbleranked.camera"
  admin: "cobbleranked.admin"
  admin_reload: "cobbleranked.admin.reload"
  admin_elo: "cobbleranked.admin.elo"
  admin_arena: "cobbleranked.admin.arena"
  admin_flee: "cobbleranked.admin.flee"
```

---

## Setup Examples

### Basic Player Access

```bash
# Allow all players to use ranked
lp group default permission set cobbleranked.ranked true
lp group default permission set cobbleranked.casual true
```

### VIP Permissions

```bash
# VIP group can use camera
lp group vip permission set cobbleranked.camera true
```

### Staff Permissions

```bash
# Moderators can modify Elo
lp group mod permission set cobbleranked.admin.elo true

# Admins have full access
lp group admin permission set cobbleranked.admin true
```

---

## Without LuckPerms

When LuckPerms is not installed:

| Command | Requirement |
|---------|-------------|
| `/ranked` | All players |
| `/casual` | All players |
| `/rankedadmin` | OP level 4 |

---

## See Also

- [Commands](../getting-started/commands.md) - Command reference
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
