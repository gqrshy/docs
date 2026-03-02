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
| `cobbleranked.admin.arena.*` | All arena commands |
| `cobbleranked.admin.arena.create` | Create arenas |
| `cobbleranked.admin.arena.delete` | Delete arenas |
| `cobbleranked.admin.arena.edit` | Edit arena positions |
| `cobbleranked.admin.arena.list` | List all arenas |
| `cobbleranked.admin.arena.teleport` | Teleport to arenas |
| `cobbleranked.admin.config.reload` | Reload configuration |
| `cobbleranked.admin.config.view` | View configuration |
| `cobbleranked.admin.player.setelo` | Set player ELO |
| `cobbleranked.admin.player.viewothers` | View other players' stats |
| `cobbleranked.admin.queue.clear` | Clear all queues |
| `cobbleranked.admin.queue.view` | View queue status |
| `cobbleranked.admin.queue.kick` | Kick players from queue |
| `cobbleranked.admin.season.*` | All season commands |
| `cobbleranked.admin.season.info` | View season info |
| `cobbleranked.admin.season.rotate` | Trigger season rotation |
| `cobbleranked.admin.debug` | Access debug commands |

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

## Rank Display Permissions

CobbleRanked automatically grants rank-based permissions and display features:

| Permission | Description |
|------------|-------------|
| `cobbleranked.rank.<tier>` | Current rank tier permission |
| `cobbleranked.rank.title.<tier>` | Persistent title permission (earned once, kept forever) |

**Example:** When a player reaches Ultra Ball tier:
- They get `cobbleranked.rank.ULTRABALL` permission (current rank)
- They get `cobbleranked.rank.title.ULTRABALL` permission (permanent, kept even after tier loss)

## Rank Display Settings

Configure in `config/cobbleranked/luckperms.yaml`:

```yaml
luckperms:
  enabled: true
  syncMode: SUFFIX          # PREFIX, SUFFIX, GROUP, or ALL
  removeOnRankLoss: true   # Remove display when losing rank

  tierMappings:
    POKEBALL:
      suffix: " &f[Poké Ball]&r"
      weight: 100
    GREATBALL:
      suffix: " &9[Great Ball]&r"
      weight: 101
    # ... other tiers
```

| Setting | Description |
|---------|-------------|
| `syncMode` | How rank display is applied (suffix, prefix, group) |
| `removeOnRankLoss` | Whether to remove display when player drops below tier |
| `permissionMode` | ALLOW_BY_DEFAULT or REQUIRE_PERMISSION for command access |

---

## Without LuckPerms

If LuckPerms is not installed:

- All players can use basic commands
- Only OP Level 2+ can use admin commands
- Bypass permissions are not available
- Rank display features are disabled

---

## See Also

- [Commands](/docs/cobbleranked/getting-started/commands/) - Command list
- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions
