# Turn Timer System

The Turn Timer system enforces time limits on battle turns to keep matches moving and prevent stalling.

---

## Overview

When enabled, players have a limited time to select their move each turn. If time runs out, a random legal move is automatically selected.

**Key Features:**
- Color-coded countdown display
- Automatic move selection on timeout
- Configurable time limits
- Visual and audio warnings
- Per-format configuration support

---

## How It Works

### Timer Display

The turn timer appears as a colored action bar message:

| Time Remaining | Color | Example |
|---------------|-------|---------|
| > 20 seconds | Green (§a) | `§a[Turn Timer] 30s remaining` |
| 11-20 seconds | Yellow (§e) | `§e[Turn Timer] 15s remaining` |
| ≤ 10 seconds | Red (§c) | `§c[Turn Timer] 5s remaining` |

### Timer Behavior

1. **Turn Starts:** Timer begins when move selection GUI opens
2. **Countdown:** Updates every second on action bar
3. **Timeout:** If timer reaches 0:
   - Random legal move is selected automatically
   - Player receives timeout message
   - Battle continues normally
4. **Move Selected:** Timer stops when player chooses a move

---

## Configuration

### Enable/Disable

```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 60
  }
}
```

**Options:**
- `enabled` (boolean) - Enable turn timer system
  - `true` - Turn timers active in battles
  - `false` - No time limits on turns
- `defaultTimeSeconds` (integer) - Default time limit per turn in seconds
  - Recommended: 60-90 seconds
  - Minimum: 15 seconds
  - Maximum: 300 seconds (5 minutes)

### Format-Specific Timers

You can set different timer durations for each battle format:

```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 60,
    "formatTimers": {
      "SINGLES": 60,
      "DOUBLES": 90,
      "TRIPLES": 120
    }
  }
}
```

**Format-specific rules:**
- Doubles battles get more time (more complex decisions)
- Random battles can use shorter timers (less team preview needed)
- If format not specified, uses `defaultTimeSeconds`

---

## Player Experience

### What Players See

**Start of Turn:**
```
§a[Turn Timer] 60s remaining - Select your move!
```

**Mid-Turn Warning:**
```
§e[Turn Timer] 15s remaining - Hurry!
```

**Final Warning:**
```
§c[Turn Timer] 5s remaining - TIMEOUT SOON!
```

**Timeout:**
```
§c[Turn Timer] Time's up! Random move selected: Thunderbolt
```

### Timeout Behavior

When a player times out:
1. System selects a **random legal move** from available moves
2. Move targets are chosen randomly if applicable
3. Player is notified which move was auto-selected
4. Battle continues normally (no penalties)

**No Penalties:**
- No Elo loss
- No flee count increase
- No queue ban
- Simply auto-selects a move

---

## Implementation Details

### Technical Flow

**File:** `/src/main/kotlin/com/gashi/cobbleranked/manager/TurnTimerManager.kt`

1. **Timer Creation:**
   ```kotlin
   startTimer(battleId: UUID, playerId: UUID, timeSeconds: Int)
   ```
   - Creates coroutine job for countdown
   - Stores timer in concurrent map
   - Begins countdown loop

2. **Countdown Loop:**
   - Updates every 1 second
   - Sends action bar message with color coding
   - Checks if move was selected (early exit)

3. **Timeout Handling:**
   ```kotlin
   handleTimeout(battleId: UUID, playerId: UUID)
   ```
   - Selects random legal move
   - Notifies player
   - Executes move via Cobblemon battle controller

4. **Cleanup:**
   ```kotlin
   cancelTimer(battleId: UUID, playerId: UUID)
   ```
   - Stops countdown coroutine
   - Removes from active timers map

### Integration Points

**Battle Event Listeners:**
- `TurnStartEvent` - Start timer when turn begins
- `MoveSelectedEvent` - Cancel timer when player selects move
- `BattleEndEvent` - Clean up all timers for battle

**Move Selection:**
- Integrates with Cobblemon's battle controller
- Uses `BattleActor.sendUpdate()` to send random move
- Respects move legality (no disabled/locked moves)

---

## Best Practices

### Recommended Settings

**Competitive Servers:**
```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 60,
    "formatTimers": {
      "SINGLES": 60,
      "DOUBLES": 90
    }
  }
}
```

**Casual Servers:**
```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 90
  }
}
```

**Fast-Paced Events:**
```json5
{
  "turnTimer": {
    "enabled": true,
    "defaultTimeSeconds": 45,
    "formatTimers": {
      "RANDOM_SINGLES": 30,
      "RANDOM_DOUBLES": 40
    }
  }
}
```

### Player Communication

**Announce to Players:**
- Turn timer duration in server rules
- Timeout behavior (random move, no penalty)
- Format-specific timers if different

**Example Server Message:**
```
All ranked battles have a 60-second turn timer!
- Singles: 60s per turn
- Doubles: 90s per turn
- If time runs out, a random move is selected (no penalty)
```

---

## Troubleshooting

### Timer Not Appearing

**Check:**
1. `turnTimer.enabled: true` in config
2. Server restart after config change
3. Player has turn selection GUI open
4. Battle is ranked (timers may be disabled for casual battles)

### Timer Too Short/Long

**Adjust:**
```json5
{
  "turnTimer": {
    "defaultTimeSeconds": 90  // Increase from 60
  }
}
```

Run `/rankedadmin reload` or restart server.

### Random Move Selection Issues

**Possible Causes:**
- Move is disabled (Torment, Disable, etc.)
- Move has no PP remaining
- Move selection logic needs update

**Debug:**
- Check battle logs for move selection
- Verify Cobblemon battle controller integration
- Report to developer if persistent

---

## Related Features

- [Battle Formats](battle-formats.md) - Format-specific timer configuration
- [Disconnect Penalties](disconnect-penalties.md) - Different from timeout (no penalty)
- [Dynamic Matchmaking](dynamic-matchmaking.md) - Timer doesn't affect matchmaking

---

**Configuration File:** `config/cobbleranked/config.json5` → `turnTimer` section
