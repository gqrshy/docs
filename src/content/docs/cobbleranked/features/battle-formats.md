---
title: Battle Formats
description: Three ways to prove your skills. Singles, Doubles, and Triples.
---

## Singles

The classic duel. One Pokemon at a time. Pure strategy, no distractions.

- **Active**: 1 Pokemon
- **Team**: 3+ Pokemon
- **Style**: Traditional competitive play

Fast-paced matches where every prediction matters. Perfect for players who love mind games and one-on-one showdowns.

## Doubles

VGC-style 2v2 battles. Teamwork wins fights.

- **Active**: 2 Pokemon
- **Team**: 4+ Pokemon
- **Style**: Team synergy and positioning

Spread moves, partner combos, and Protect mind games. The format where coordination is king.

## Triples

Full-scale warfare. Three Pokemon clash at once.

- **Active**: 3 Pokemon
- **Team**: 6 Pokemon
- **Style**: Complex positioning and team coordination

Position matters. Center Pokemon can hit anyone; side Pokemon have limited reach. The ultimate test of team building.

## Independent Rankings

Each format has its own:
- **Queue** — Singles players only match with Singles players
- **ELO rating** — Climb separately in each format
- **Leaderboard** — Dominate one format or conquer them all
- **Blacklist rules** — Different bans per format if configured

```
Player: Steve
├── SINGLES: 1850 ELO, Rank #5
├── DOUBLES: 1620 ELO, Rank #23
└── TRIPLES: 1540 ELO, Rank #8
```

## Format Configuration

As of v2.0.13, all format settings are configured in **season presets** (`config/cobbleranked/season_presets/*.yml`).

### Enable/Disable Formats

Control which formats are available by setting `enabled` in each format section:

```yaml
# season_presets/default.yml
singles:
  enabled: true
doubles:
  enabled: true
triples:
  enabled: false    # Disabled
```

### Season Presets

Run a VGC-only season? A Singles tournament? Each preset has complete format configuration:

```yaml
# season_presets/vgc.yml
name: "VGC Rules"

singles:
  enabled: false

doubles:
  enabled: true
  teamSize: 6
  selectCount: 4
  levelCap: 50
  turnTimer: 45
  matchDuration: 20
  megaEvolution: false
  zMoves: false
  dynamax: false
  terastallize: true

triples:
  enabled: false
```

### Per-Format Settings

Each format has its own complete configuration:

```yaml
# season_presets/default.yml
singles:
  enabled: true
  teamSize: 3
  selectCount: 3
  levelCap: 100
  turnTimer: 90
  matchDuration: 15
  megaEvolution: true
  zMoves: true
  dynamax: false
  terastallize: false

  # Clauses
  speciesClause: true
  itemClause: 1
  ohkoClause: true
  evasionClause: true
  endlessBattleClause: true

  # Restricted Pokemon
  restrictedCount: 1

  # Matchmaking
  matchmaking:
    enforceEloRange: true
    initialRange: 200
    expansionDelay: 30
    expansionRate: 50
    maxMultiplier: 3.0
    immediateMatchRange: 100

  # Blacklist
  blacklist:
    pokemon: []
    moves: []
    abilities: []
    heldItems: []
    labels: []
    labelLimits: {}
    inventoryItems: []
    consumables:
      blockAllHealingItems: true
      blockedHealingItems: []
      blockStatusHealingItems: true
      blockedStatusItems: []
      blockRevivalItems: true
      blockedRevivalItems: []

doubles:
  enabled: true
  teamSize: 4
  selectCount: 4
  levelCap: 50
  turnTimer: 120
  matchDuration: 20
  # ... similar structure
```

### Matchmaking Settings

Control how players are matched within each format:

| Setting | Default | Description |
|---------|---------|-------------|
| `enforceEloRange` | `true` | Enable Elo-based matchmaking |
| `initialRange` | `200` | Starting ELO range (±100 = 200 total) |
| `expansionDelay` | `30` | Seconds before range starts expanding |
| `expansionRate` | `50` | ELO added per expansion cycle |
| `maxMultiplier` | `3.0` | Maximum range multiplier (3× initial range) |
| `immediateMatchRange` | `100` | ELO range for instant matches |

**How range expansion works:**
- Start: ±100 ELO (200 total range)
- After 30s: ±150 ELO (expands by 50)
- After 60s: ±200 ELO (expands by another 50)
- Maximum: ±300 ELO (3× initial range)

### Restricted Pokemon System

Some presets use a restricted Pokemon system (VGC-style):

| Setting | Description |
|---------|-------------|
| `restrictedCount` | Max number of restricted Pokemon allowed |
| `restrictedPokemon` | List of specific Pokemon marked as restricted |

When `restrictedCount > 0`, players can only include that many Pokemon from the restricted list in their team.

## Multi-Format Rewards

Season rewards are distributed per format. Rank high in all three? Get rewards for all three.

---

**Related**: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) | [ELO System](/docs/cobbleranked/features/elo-system/) | [Seasons](/docs/cobbleranked/features/seasons/)
