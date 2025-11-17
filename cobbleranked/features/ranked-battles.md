# Ranked Battles

---
**CobbleRanked** > **Features** > **Ranked Battles**
---

Learn how ranked battles work in CobbleRanked.

## Overview

Ranked battles are competitive Pokemon battles where players compete for Elo rating and leaderboard positions. CobbleRanked manages the entire battle flow from queue to results.

> **[📸 IMAGE NEEDED: バトルフローチャート（キュー参加→マッチング→検証→テレポート→バトル→結果処理→報酬の流れ）]**

## Battle Flow

### 1. Queue Phase

**Player joins queue:**
1. Opens ranked GUI (`/ranked`)
2. Selects battle format (Singles or Doubles)
3. Clicks queue button
4. Enters matchmaking pool

**Queue status:**
- In queue: Searching for opponent
- Wait time displayed
- Can leave queue anytime

### 2. Matchmaking

**Automated pairing:**
- Players matched by Elo range
- Same battle format required
- Range expands over time if no match found

**Matchmaking criteria:**
1. **Same format:** Both players queued for same format (Singles or Doubles)
2. **Elo range:** Within configured range (default ±200, expands over time)
3. **Valid party:** Both players have valid Pokemon teams

**Example:**
```
Player A: 1000 Elo, Singles queue
Player B: 1050 Elo, Singles queue
Result: Match found! (within 200 Elo range)
```

### 3. Pre-Battle Validation

Before battle starts, both teams are validated:

**Validation checks:**
- ✅ Team size matches requirements (default: 6)
- ✅ No banned Pokemon (blacklist)
- ✅ No banned moves
- ✅ No banned abilities
- ✅ No banned items
- ✅ Special format requirements (if enabled)

**If validation fails:**
- Player removed from queue
- Error message displayed with reason
- Other player returns to queue

### 4. Teleportation

**Arena selection:**
1. Random arena selected from configuration
2. Both players teleport simultaneously
3. Previous location saved for return

**Teleport features:**
- Works across dimensions (Overworld, Nether, End, custom)
- Preserves inventory and effects
- Instant teleportation (no loading screen)

### 5. Battle Start

**Battle initialization:**
1. Players face each other
2. Battle GUI appears
3. Pokemon teams loaded
4. Battle begins!

**Battle settings:**
- Level cap enforced (if configured)
- Turn limit active (default: 100 turns)
- Battle format applied
- Clauses enabled

### 6. Battle Phase

**During battle:**
- Standard Cobblemon battle mechanics
- Turn-based combat
- Move selection
- Switch mechanics
- Item usage (if allowed)

**Special mechanics:**
- Terastallization (if enabled)
- Mega Evolution (if enabled)
- Z-Moves (if enabled)
- Dynamax (if enabled)

**Battle tracking:**
- Turn counter
- Battle time
- Format recorded
- Player actions logged

### 7. Battle End

**Possible outcomes:**

| Outcome | Description | Elo Change |
|---------|-------------|------------|
| **Victory** | All opponent Pokemon fainted | Winner gains, loser loses |
| **Defeat** | All your Pokemon fainted | Loser loses, winner gains |
| **Forfeit** | Player manually forfeited | Counts as loss |
| **Disconnect** | Player disconnected during battle | Flee count +1, counts as loss |
| **Draw** | Turn limit reached | No Elo change |

### 8. Results Processing

**After battle ends:**

1. **Elo calculation:**
   - Winner gains Elo
   - Loser loses Elo
   - Amount based on Elo system configuration

2. **Stats update:**
   - Wins/losses incremented
   - Win rate recalculated
   - Flee count updated (if disconnect)
   - Format-specific stats updated

3. **Database save:**
   - Player stats persisted
   - Battle history recorded
   - Leaderboard updated

4. **Return teleport:**
   - Players return to previous location
   - Inventory restored
   - Effects preserved

### 9. Rewards

**Post-battle rewards:**

**Milestone rewards** (if configured):
- 10 wins
- 25 wins
- 50 wins
- 100 wins

**Notification:**
Players receive messages about:
- Elo change
- New rank position
- Milestone rewards (if unlocked)

## Battle Formats

CobbleRanked supports multiple battle formats with independent rankings for Singles, Doubles, Triples, Multi, and Random Battle formats.

Each battle format has:
- **Separate Elo ratings**
- **Independent leaderboards**
- **Format-specific stats** (wins, losses, matches)
- **Separate queues**

**Winning in Singles doesn't affect your Doubles Elo.**

### Available Formats

#### Competitive Formats

| Format | Description | Team Size | Party Size | Ranked |
|--------|-------------|-----------|------------|--------|
| **SINGLES** | 1v1 battles | 3-6 Pokemon | 1 player | ✅ |
| **DOUBLES** | 2v2 battles | 4-6 Pokemon | 1 player | ✅ |
| **TRIPLES** | 3v3 battles | 5-6 Pokemon | 1 player | ✅ |
| **MULTI** | 2v2 team battles | 1-3 Pokemon each | 2 players | ✅ |

#### Random Battle Formats

| Format | Description | Team Size | Generation | Ranked |
|--------|-------------|-----------|------------|--------|
| **RANDOM_SINGLES** | Random 1v1 | 6 Pokemon (auto) | Pool-based | ✅ |
| **RANDOM_DOUBLES** | Random 2v2 | 6 Pokemon (auto) | Pool-based | ✅ |
| **RANDOM_3V3** | Quick random | 3 Pokemon (auto) | Pool-based | ✅ |

### Singles

Traditional 1v1 Pokemon battles.

**Rules:**
- Bring 3-6 Pokemon
- 1v1 format
- Select lead Pokemon before battle

**Example:** Player A vs Player B (solo)

### Doubles

1 player controls 2 Pokemon simultaneously.

**Rules:**
- Bring 4-6 Pokemon
- Both Pokemon on field at once
- Select 2 leads before battle

**Example:** Player A (2 Pokemon) vs Player B (2 Pokemon)

### Multi (2v2 Singles)

Team battles - 2 players vs 2 players.

**Rules:**
- Each player brings 1-3 Pokemon
- Partners must be in same party
- Both players select leads

**Example:** Party (Player A + Player B) vs Party (Player C + Player D)

#### How to Queue for Multi

1. Form party with partner
2. Both players open `/ranked` GUI
3. Select "Multi" format
4. Both must click queue

**Matchmaking:** System pairs two parties with similar combined Elo.

### Format Selection

Players choose format before queuing:

1. Open `/ranked` GUI
2. Click format selection (Singles/Doubles/Multi)
3. Click "Join Queue"

### Independent Stats

Each format tracks separately:

| Stat | Per Format |
|------|-----------|
| Elo Rating | ✅ |
| Wins | ✅ |
| Losses | ✅ |
| Win Streak | ✅ |
| Total Matches | ✅ |

**Example:**
- Singles: 1500 Elo, 50 wins, 30 losses
- Doubles: 1000 Elo, 5 wins, 5 losses
- Multi: 1200 Elo, 20 wins, 15 losses

### Format Leaderboards

Each format has a separate leaderboard.

**Access:**
1. `/ranked` GUI
2. Click "Leaderboards"
3. Select format

**Display:**
- Top players by Elo
- Format-specific rankings
- Filter by Singles/Doubles/Multi

### Format-Specific Rewards

Season and milestone rewards can be format-specific.

**Example:**
```json5
{
  "season_rewards": {
    "singles": { /* Singles rewards */ },
    "doubles": { /* Doubles rewards */ }
  }
}
```

Players can earn rewards in **all formats**.

See [Rewards System](../configuration/rewards.md) for configuration.

### Team Size Configuration

Configure team size limits per format in `config/cobbleranked/config.json5`:

```json5
{
  "ranked_match": {
    "singles": {
      "min_team_size": 3,
      "max_team_size": 6
    },
    "doubles": {
      "min_team_size": 4,
      "max_team_size": 6
    },
    "multi": {
      "min_team_size": 1,
      "max_team_size": 3
    }
  }
}
```

### Format Troubleshooting

**Can't queue for Multi?**
- Verify party formed (2 players)
- Both players must have enough Pokemon
- Check both selected same format

**Stats not tracking correctly?**
- Verify playing correct format
- Check format in leaderboard
- Stats are format-independent

**Matchmaking slow for specific format?**
- Doubles/Multi have smaller player pools
- See [Dynamic Matchmaking](dynamic-matchmaking.md)

## Disconnect Handling

### Intentional Disconnect (Rage Quit)

**Detection:**
- Player closes game during battle
- Client disconnects from server
- No forfeit button used

**Penalty:**
- Flee count +1
- Counts as loss
- Elo penalty applied
- Opponent wins automatically

**Flee count tracking:**
- Visible in player stats
- Never decreases automatically
- Admin can reset: `/rankedadmin flee reset <player>`

### Unintentional Disconnect (Crash/Internet)

**Same penalty:**
- CobbleRanked cannot distinguish intentional vs unintentional
- All disconnects treated the same
- Prevents abuse

**Protection:**
- Admin can manually reset flee count for legitimate crashes
- Elo can be manually adjusted: `/rankedadmin elo add <player> <amount>`

### Connection Issues

**Before battle starts:**
- Player removed from queue
- No penalty
- Can rejoin queue

**During battle:**
- Treated as disconnect
- Flee count incremented
- Opponent wins

## Draw Conditions

### Turn Limit Reached

**Trigger:** Battle reaches max turns (default: 100)

**Result:**
- Battle ends in draw
- No Elo change for either player
- Does not count as win or loss
- No flee count penalty

**Configuration:**
```json5
"battle": {
  "maxTurns": 100  // Increase for longer battles
}
```

### Both Players Disconnect

**Rare scenario:** Both players disconnect simultaneously

**Result:**
- Battle canceled
- No Elo change
- No stats update
- No penalty

## Special Cases

### Invalid Team Mid-Battle

**Scenario:** Team becomes invalid during battle (e.g., banned Pokemon obtained via hack)

**Result:**
- Battle ends immediately
- Invalid team player loses
- Opponent wins
- Severe warning issued

### Arena Issues

**Scenario:** Arena world unloads or becomes invalid during battle

**Result:**
- Battle continues (battle instance is separate)
- Return teleport uses fallback location (spawn)
- Error logged for admin review

### Server Crash

**Scenario:** Server crashes during battle

**Result:**
- Battle canceled on restart
- No Elo change
- No stats update
- Players return to previous location

## Battle Statistics

### Tracked Per Format

- **Total battles:** Wins + losses
- **Win rate:** Wins / (wins + losses) * 100%
- **Current Elo:** Real-time rating
- **Peak Elo:** Highest Elo reached (future feature)
- **Flee count:** Disconnect penalties

### Global Statistics

- **Total battles:** Sum across all formats
- **Favorite format:** Most played
- **Best format:** Highest Elo
- **Overall win rate:** Combined win rate

## Competitive Features

### Level Scaling

**Force level cap:**
```json5
"battle": {
  "levelMatch": 70,        // All Pokemon become level 70
  "forceLevelCap": true    // Enforce scaling
}
```

**Benefits:**
- Fair competition
- No grinding advantage
- Skill-based battles

### Original Trainer Requirement

**Prevent traded teams:**
```json5
"competitive": {
  "requireOriginalTrainer": true  // Must be OT
}
```

**Effect:**
- Player must be original trainer of all Pokemon
- Prevents buying/trading for perfect teams
- Encourages legitimate catching/breeding

### Team Size Enforcement

**Fixed party size:**
```json5
"competitive": {
  "teamSize": 6  // Must have exactly 6 Pokemon
}
```

**Rationale:**
- Standard competitive format
- Prevents unfair advantages
- Consistent with official tournaments

## Battle Commands

### During Battle

No special commands required - use standard Cobblemon battle UI:
- Click moves to attack
- Click Pokemon to switch
- Use items (if allowed)
- Forfeit button to surrender

### Pre-Battle

Commands before battle starts:

```bash
/ranked              # Open GUI
/queue join singles  # Join queue
/queue leave         # Leave queue
```

### Post-Battle

Commands after battle:

```bash
/stats               # View your stats
/leaderboard        # Check leaderboard
/elo                # Check your Elo
```

## Troubleshooting

### Battle not starting

**Symptom:** Matched but battle doesn't begin

**Causes:**
- Invalid Pokemon team
- Blacklist violation
- Arena configuration error

**Solution:**
1. Check blacklist validation message
2. Verify arena exists: `/rankedadmin arena list`
3. Check console for errors

### Elo not updating

**Symptom:** Battle ends but Elo unchanged

**Causes:**
- Draw (turn limit)
- Database connection error
- Elo system configuration error

**Solution:**
1. Check if battle ended in draw
2. Verify database connection
3. Check console for errors

### Return teleport failed

**Symptom:** Player stuck in arena after battle

**Causes:**
- Previous world unloaded
- Coordinates invalid
- Dimension error

**Solution:**
1. Manually teleport player: `/tp <player> <x> <y> <z>`
2. Check `logs/latest.log` for teleport errors
3. Verify arena configuration

---

## Next Steps

### For Understanding Battle Flow
1. **[Elo Rating System](elo-system.md)** - Learn how ratings are calculated
2. **[Dynamic Matchmaking](elo-system.md#dynamic-matchmaking)** - Understand queue expansion
3. **[Disconnect Penalties](disconnect-penalties.md)** - Flee count system explained

### For Configuration
1. **[Blacklist Setup](../configuration/blacklist.md)** - Configure Pokemon restrictions
2. **[Battle Clauses](../configuration/config.md#battle-clauses)** - Enable competitive rules
3. **[Team Size Requirements](../configuration/config.md#ranked-match)** - Customize team sizes

### For Competitive Play
1. **[Season System](seasons.md)** - Competitive periods and rotation
2. **[Leaderboards](leaderboards.md)** - Rankings and top players
3. **[Rewards](../configuration/rewards.md)** - Prize configuration

---

## Related Pages
- [Quick Start Guide](../getting-started/quick-start.md) - Your first ranked battle
- [Commands Reference](../getting-started/commands.md) - Battle management commands
- [Troubleshooting](../support/troubleshooting.md#battle-issues) - Common battle problems
