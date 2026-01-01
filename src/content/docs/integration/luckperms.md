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
| Admin commands | OP Level 4 |

## Permission Nodes

### Player Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.command.ranked` | Use /ranked |
| `cobbleranked.command.casual` | Use /casual |
| `cobbleranked.command.battlecamera` | Use /battlecamera |

### Admin Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.admin` | All admin commands |

### Bypass Permissions

| Permission | Description |
|------------|-------------|
| `cobbleranked.bypass.cooldown` | Bypass queue cooldown |
| `cobbleranked.bypass.blacklist` | Bypass Pokemon blacklist |

## LuckPerms Setup

### Grant Player Permissions

```
/lp group default permission set cobbleranked.command.ranked true
/lp group default permission set cobbleranked.command.casual true
/lp group default permission set cobbleranked.command.battlecamera true
```

### Grant Admin Permissions

```
/lp group admin permission set cobbleranked.admin true
```

### Grant Specific Admin Commands

```
/lp user Steve permission set cobbleranked.bypass.blacklist true
```

## Example Configuration

### Staff Group

```
/lp group staff permission set cobbleranked.admin true
```

### VIP Group (Bypass Cooldowns)

```
/lp group vip permission set cobbleranked.bypass.cooldown true
```

## Without LuckPerms

If LuckPerms is not installed:

- All players can use basic commands
- Only OP Level 4 can use admin commands
- Bypass permissions are not available

## Troubleshooting

### "You don't have permission"

1. Check if LuckPerms is installed
2. Verify permission node spelling
3. Check group inheritance
4. Use `/lp user <name> permission check <node>`
