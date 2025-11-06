# Leaderboards

Learn how leaderboards work and how players are ranked in CobbleRanked.

## Overview

Leaderboards display the top-ranked players based on Elo rating. CobbleRanked features:
- **Format-specific leaderboards** - Singles and Doubles separate
- **Real-time updates** - Rankings update after each battle
- **Top 10 display** - Shows top 10 players
- **GUI and command access** - View via `/ranked` or `/leaderboard`

---

## Viewing Leaderboards

### Via Command

**View Singles leaderboard:**
```bash
/leaderboard singles
```

**View Doubles leaderboard:**
```bash
/leaderboard doubles
```

**Output:**
```
━━━━━━━━━━━━━━━━━━━━━━━━
   SINGLES LEADERBOARD
━━━━━━━━━━━━━━━━━━━━━━━━

1. PlayerA - 1847 Elo (25W - 10L)
2. PlayerB - 1726 Elo (30W - 15L)
3. PlayerC - 1689 Elo (28W - 14L)
4. PlayerD - 1654 Elo (22W - 12L)
5. PlayerE - 1621 Elo (20W - 10L)
6. PlayerF - 1589 Elo (18W - 11L)
7. PlayerG - 1567 Elo (16W - 9L)
8. PlayerH - 1543 Elo (15W - 10L)
9. PlayerI - 1521 Elo (14W - 11L)
10. PlayerJ - 1498 Elo (12W - 10L)
```

### Via GUI

1. **Open ranked GUI:** `/ranked`
2. **Click "Leaderboard" button**
3. **Select format:**
   - Singles Leaderboard
   - Doubles Leaderboard
4. **View top 10 players**

**GUI features:**
- Player head icons
- Elo rating display
- Win/loss record
- Current rank position

---

## How Rankings Work

### Ranking Calculation

**Leaderboards rank by Elo rating (highest to lowest):**

| Rank | Player | Elo | Record |
|------|--------|-----|--------|
| #1 | PlayerA | 1847 | 25W - 10L |
| #2 | PlayerB | 1726 | 30W - 15L |
| #3 | PlayerC | 1689 | 28W - 14L |

**Tiebreaker:**
- If two players have identical Elo, ranking order is arbitrary (database order)
- In practice, Elo is rarely exactly equal

### Real-Time Updates

**Rankings update immediately after battles:**

**Before battle:**
```
1. PlayerA - 1200 Elo
2. PlayerB - 1195 Elo
```

**After battle (PlayerB wins):**
```
1. PlayerB - 1211 Elo  ← Moved up!
2. PlayerA - 1184 Elo  ← Moved down
```

**No delay** - Leaderboards reflect current Elo instantly.

---

## Format-Specific Leaderboards

### Independent Rankings

Each format has its own leaderboard:

**Singles Leaderboard:**
```
1. PlayerA - 1847 Elo
2. PlayerB - 1726 Elo
3. PlayerC - 1689 Elo
```

**Doubles Leaderboard:**
```
1. PlayerX - 1654 Elo
2. PlayerY - 1621 Elo
3. PlayerZ - 1589 Elo
```

**Key points:**
- Different players may dominate each format
- Player can be #1 in both formats
- Elo ratings don't carry over between formats

### Viewing Your Rank

**Check your rank:**
```bash
/stats
```

**Output:**
```
═══════════════════════════════
  Ranked Stats - YourName
═══════════════════════════════

Singles:
  Elo: 1247
  Rank: #8
  Wins: 15 | Losses: 8
  Win Rate: 65.2%

Doubles:
  Elo: 1050
  Rank: #25
  Wins: 7 | Losses: 5
  Win Rate: 58.3%
```

---

## Top 10 Leaderboard

### Why Only Top 10?

**Design decision:**
- Encourages competition for top spots
- Prevents leaderboard clutter
- Focuses on elite players

**To view beyond top 10:**
- Use `/stats PlayerName` to check individual rank
- Full leaderboard not currently displayed

### Climbing the Leaderboard

**To reach top 10:**

1. **Win battles** → Gain Elo
2. **Beat higher-ranked opponents** → Gain more Elo
3. **Maintain consistency** → Avoid large losing streaks
4. **Play actively** → Avoid Elo decay (if enabled)

**Example climb:**
```
Start: 1000 Elo, Rank #50
After 10 wins: 1200 Elo, Rank #15
After 20 wins: 1400 Elo, Rank #5
After 30 wins: 1600 Elo, Rank #2
```

---

## Season Leaderboards

### Season-End Rankings

When a season ends, leaderboard is finalized:

**Final Singles Leaderboard (Season 5):**
```
1. PlayerA - 1847 Elo → 🥇 Champion Reward
2. PlayerB - 1726 Elo → 🥈 Master Reward
3. PlayerC - 1689 Elo → 🥉 Master Reward
4. PlayerD - 1654 Elo → Elite Reward
...
10. PlayerJ - 1498 Elo → Elite Reward
```

**Rewards distributed based on final rank:**
- See [Rewards System](../configuration/rewards.md)

### Historical Leaderboards

**Currently:** Only current season leaderboard is displayed.

**Future feature:** View past season leaderboards (stored in database).

---

## Leaderboard GUI Customization

### GUI Items

Leaderboard items are customizable via `gui/gui-*.json5`:

**Example leaderboard entry:**
```json5
{
  "rank_1": {
    "item": "minecraft:gold_block",
    "display": "&6&l#1 {player}",
    "lore": [
      "&7Elo: &f{elo}",
      "&7Record: &f{wins}W - {losses}L",
      "&7Win Rate: &a{winrate}%"
    ]
  }
}
```

**Placeholders:**
- `{player}` - Player name
- `{elo}` - Elo rating
- `{wins}` - Total wins
- `{losses}` - Total losses
- `{winrate}` - Win percentage

See [GUI Customization](../configuration/gui.md) for details.

---

## Cross-Server Leaderboards

### Shared Rankings

In cross-server mode, leaderboards are **shared across all servers**:

**Setup:**
- MySQL database stores all player Elo
- All servers query same database
- Rankings reflect entire network

**Benefits:**
- Compete with players from all servers
- True network-wide rankings
- Fair competition

**Example:**
- Player A on Server 1: 1500 Elo
- Player B on Server 2: 1600 Elo
- Leaderboard shows Player B as #1

See [Cross-Server Setup](../advanced/cross-server.md) for configuration.

---

## Leaderboard Statistics

### What's Displayed

**Standard leaderboard info:**
- Rank position (#1, #2, etc.)
- Player name
- Elo rating
- Win/loss record
- Win rate (calculated)

**Not displayed (but tracked):**
- Flee count
- Provisional status
- Milestone progress
- Total matches

**Why?** Focus on competitive performance (Elo and record).

---

## Inactive Players

### Elo Decay & Leaderboards

If Elo decay is enabled, inactive players gradually drop:

**Example:**
```
Day 1: PlayerA - 1500 Elo, Rank #1
Day 30 (no matches): PlayerA - 1440 Elo, Rank #3
```

**Benefits:**
- Keeps leaderboard fresh
- Rewards active players
- Prevents "sitting on" top rank

**Configuration:**
```json5
{
  "eloSystem": {
    "pokemonShowdown": {
      "decay": {
        "enabled": true,
        "slowDecayReduction": 2  // Lose 2 Elo per day
      }
    }
  }
}
```

See [Elo System](elo-system.md#elo-decay-system) for details.

---

## Leaderboard Commands

### Player Commands

**View leaderboard:**
```bash
/leaderboard singles
/leaderboard doubles
```

**Aliases:**
```bash
/lb singles
/top singles
/ranktop singles
```

**Check your rank:**
```bash
/stats
/elo
```

### Admin Commands

**No special admin leaderboard commands.**

Leaderboards are **read-only** for all players.

**To modify rankings:**
- Use Elo admin commands: `/rankedadmin elo set <player> <amount>`
- See [Commands](../getting-started/commands.md)

---

## Frequently Asked Questions

### Why am I not on the leaderboard?

**Possible reasons:**

1. **Not in top 10** - Only top 10 displayed
2. **Wrong format** - Check Singles vs Doubles leaderboard
3. **No matches played** - Need to play at least one match
4. **Tied with others** - Multiple players at same Elo

**Solution:** Keep winning to climb higher!

### How often does leaderboard update?

**Instantly after each battle.**

- Battle ends → Elo updates → Leaderboard refreshes
- No delay or caching
- Always shows current rankings

### Can I see my exact rank if I'm not top 10?

**Yes!** Use `/stats` command:

```bash
/stats YourName
```

Shows your rank (e.g., "Rank: #15") even if not in top 10 display.

### Do wins/losses affect leaderboard?

**Indirectly:**

- Wins → Elo increases → Rank improves
- Losses → Elo decreases → Rank drops

**Directly:** Leaderboard ranks by Elo only.

**Example:**
- PlayerA: 1200 Elo, 50W - 10L (83% win rate)
- PlayerB: 1250 Elo, 15W - 14L (52% win rate)

**PlayerB ranks higher** despite worse win rate (Elo is what matters).

### Can I see historical leaderboards?

**Not currently.**

Season-end leaderboards are stored in database but not accessible via command/GUI.

**Future feature:** Historical season leaderboards may be added.

---

## Competitive Strategies

### Climbing the Leaderboard

**Tips for reaching top 10:**

1. **Consistency > Big wins**
   - Steady Elo gain is better than streaks
   - Avoid large losing streaks

2. **Target higher-ranked opponents**
   - Beating higher Elo = more points gained
   - Matchmaking expands range over time

3. **Play during active hours**
   - More opponents available
   - Better matchmaking

4. **Study your losses**
   - Learn from mistakes
   - Improve team/strategy

5. **Stay active**
   - Avoid Elo decay (if enabled)
   - Practice makes perfect

### Maintaining Top Rank

**Tips for staying #1:**

1. **Play regularly**
   - Prevent decay
   - Defend your position

2. **Accept challenges**
   - Others will target you
   - Embrace competition

3. **Adapt your team**
   - Meta changes
   - Counter popular strategies

4. **Don't be afraid to lose**
   - Small Elo loss is normal
   - Focus on long-term improvement

---

**Next:** Learn about [Cross-Server Setup](../advanced/cross-server.md) for network-wide rankings.
