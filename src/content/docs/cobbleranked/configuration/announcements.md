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

## Usage Tips

### Enable Queue Join For:

- **Small servers** - Build awareness of queue activity
- **Competitive servers** - Show who's queuing for what format
- **Tournament events** - Create hype around matches

### Disable Queue Join For:

- **Large servers** - Prevent chat spam
- **Casual servers** - Reduce competitive pressure
- **Peak hours** - Reduce notification fatigue

### Recommended Combinations

**Competitive Server:**
```yaml
queueJoin:
  enabled: true
  showPlayerName: true
  showFormat: true
  showQueueCount: true
  showTier: true        # Show rank for competition
  showElo: false        # Hide exact Elo to reduce pressure
```

**Casual Server:**
```yaml
queueJoin:
  enabled: false
broadcastMatchStart: false
broadcastMatchResult: false
showActionbarWhileQueued: true   # Keep personal feedback
```

**Tournament Event:**
```yaml
queueJoin:
  enabled: true
  showPlayerName: true
  showFormat: true
  showQueueCount: true
  showTier: true
  showElo: true         # Full information for events
```

## Performance Considerations

Queue join announcements generate chat messages for every player who joins. On large servers with frequent queuing, this can create significant chat traffic.

**Impact by server size:**

| Server Size | Queue Join Impact |
|-------------|-------------------|
| Small (< 20 players) | Minimal - creates engagement |
| Medium (20-50 players) | Moderate - may need filtering |
| Large (50+ players) | High - consider disabling |

---

## See Also

- [Battle Configuration](battle) - Other battle settings
- [Matchmaking Configuration](matchmaking) - Queue behavior settings
