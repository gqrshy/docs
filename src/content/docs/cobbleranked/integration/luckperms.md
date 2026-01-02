---
title: LuckPerms
description: Permission management integration.
---

LuckPerms integration for granular permission control.

## Default Permissions

Without LuckPerms, permissions work via OP level:

| Permission | Default |
|------------|---------|
| Player commands | Everyone |
| Admin commands | OP Level 2+ |

## Permission Nodes

### Player Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.player.use` | Use /ranked and /battlecamera |
| `cobbleranked.player.casual.use` | Use /casual |
| `cobbleranked.player.queue.join` | Join queue |
| `cobbleranked.player.queue.leave` | Leave queue |
| `cobbleranked.player.stats.view` | View own stats |
| `cobbleranked.player.leaderboard.view` | View leaderboard |

### Format Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.player.format.singles` | Queue for Singles |
| `cobbleranked.player.format.doubles` | Queue for Doubles |
| `cobbleranked.player.format.triples` | Queue for Triples |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.admin.*` | All admin commands |
| `cobbleranked.admin.arena.*` | Arena management |
| `cobbleranked.admin.config.reload` | Reload configuration |
| `cobbleranked.admin.player.setelo` | Set player ELO |
| `cobbleranked.admin.queue.clear` | Clear queues |
| `cobbleranked.admin.season.*` | Season management |

### Bypass Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.player.bypass.cooldown` | Bypass queue cooldown |
| `cobbleranked.player.bypass.queuelimit` | Bypass queue limit |

## LuckPerms Setup

### Grant Player Permissions

```bash
/lp group default permission set cobbleranked.player.use true
/lp group default permission set cobbleranked.player.casual.use true
```

### Grant Admin Permissions

```bash
/lp group admin permission set cobbleranked.admin.* true
```

### Grant Specific Bypass

```bash
/lp group vip permission set cobbleranked.player.bypass.cooldown true
```

## Without LuckPerms

If LuckPerms is not installed:

- All players can use basic commands
- Only OP Level 2+ can use admin commands
- Bypass permissions are not available

---

## See Also

- [Commands](/docs/cobbleranked/getting-started/commands/) - Command list
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
