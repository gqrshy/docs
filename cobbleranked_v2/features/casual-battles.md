# Casual Battles

Practice battles without Elo changes.

---

## Overview

Casual mode allows players to practice competitive battles without affecting their ranked Elo rating. Perfect for:

- Testing new teams
- Learning new formats
- Practice with friends
- Warming up before ranked

---

## How to Play

Open the casual menu:

```bash
/casual
```

1. Select a format (Singles/Doubles/Triples)
2. Click "Join Queue"
3. Wait for opponent
4. Battle!

---

## Differences from Ranked

| Feature | Ranked | Casual |
|---------|--------|--------|
| Elo Changes | ✅ | ❌ |
| Leaderboard | ✅ | ❌ |
| Season Stats | ✅ | ❌ |
| Mission Progress | ✅ | ❌ |
| Flee Penalty | ✅ | ❌ |
| Matchmaking | Elo-based | Random |
| Team Validation | Full | Relaxed |

---

## Relaxed Validation

Casual mode has relaxed team validation:

- ✅ Checks for fainted Pokemon
- ❌ No blacklist enforcement
- ❌ No banned item checks
- ❌ No team composition rules

This allows players to test any team configuration.

---

## Queue Separation

Casual and ranked queues are completely separate:

- Casual players only match with casual players
- Ranked players only match with ranked players
- No cross-queue matching

---

## Off-Season Play

During off-season periods, casual battles may be the only option:

```yaml
# season.yaml
offSeason:
  allowCasual: true      # Allow casual battles
  allowRankedView: true  # Allow viewing stats
```

---

## Use Cases

### Team Testing

Test new team compositions without risking Elo:

1. Build experimental team
2. Queue for casual matches
3. Identify weaknesses
4. Refine before ranked play

### Format Learning

Learn new formats without penalty:

1. Try unfamiliar format (e.g., Doubles)
2. Practice positioning and strategies
3. Build confidence
4. Transition to ranked

### Friend Battles

While not direct friend battles, casual mode allows:

1. Both players queue at same time
2. Low queue population increases match chance
3. Practice together without Elo impact

---

## See Also

- [Ranked Battles](ranked-battles.md) - Competitive play
- [Battle Config](../configuration/battle.md) - Format settings
- [FAQ](../support/faq.md) - Common questions
- [Troubleshooting](../support/troubleshooting.md) - Problem solving
