---
title: Announcements Configuration
description: Configure broadcast messages for battle activity.
---

Broadcast messages to players about battle activity. Create excitement and competition by showing matches and results.

## Configuration

Configure in `battle.yaml`:

```yaml
# battle.yaml
announcements:
  broadcastMatchStart: true
  broadcastMatchResult: true
  showActionbarWhileQueued: true
  queueJoin:
    enabled: false
    showPlayerName: true
    showFormat: true
    showQueueCount: true
    showTier: false
    showElo: false
```

## Settings

### Broadcast Toggles

| Setting | Default | Description |
|---------|---------|-------------|
| `broadcastMatchStart` | `true` | Announce when matches start |
| `broadcastMatchResult` | `true` | Announce match results |
| `showActionbarWhileQueued` | `true` | Show queue info in action bar |

### Queue Join Announcements

| Setting | Default | Description |
|---------|---------|-------------|
| `queueJoin.enabled` | `false` | Announce when players join queue |
| `queueJoin.showPlayerName` | `true` | Show player name in announcement |
| `queueJoin.showFormat` | `true` | Show format being queued for |
| `queueJoin.showQueueCount` | `true` | Show total players in queue |
| `queueJoin.showTier` | `false` | Show player's rank tier |
| `queueJoin.showElo` | `false` | Show player's Elo rating |

## Announcement Examples

### Match Start

When enabled (`broadcastMatchStart: true`):

```
[Ranked] Battle starting: Player1 (1500 ELO) vs Player2 (1480 ELO)
```

### Match Result

When enabled (`broadcastMatchResult: true`):

```
[Ranked] Player1 defeated Player2 in Singles! (+12 ELO / -10 ELO)
```

### Queue Join

When enabled (`queueJoin.enabled: true`):

**Default (showPlayerName, showFormat, showQueueCount):**
```
[Ranked] Player123 joined the Singles queue! (3 in queue)
```

**With all options enabled:**
```
[Ranked] Player123 [Ultra Ball] (1520 ELO) joined the Singles queue! (3 in queue)
```

**Minimal (only showPlayerName):**
```
[Ranked] Player123 joined the queue!
```

### Action Bar (While Queued)

When enabled (`showActionbarWhileQueued: true`):

Players see their queue status in the action bar at the top of the screen:
```
Queue: Singles | 2/3 players | Time: 0:45
```

---

## See Also

- [Battle Configuration](/docs/cobbleranked/configuration/battle/) - Battle settings
- [Matchmaking Configuration](/docs/cobbleranked/configuration/matchmaking/) - Queue behavior
