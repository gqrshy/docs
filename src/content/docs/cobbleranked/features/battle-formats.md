---
title: Battle Formats
description: Three ways to prove your skills. Singles, Doubles, and Triples.
---

Three ways to prove your skills. Choose your battlefield.

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

### Enable/Disable Formats

Control which formats appear in the GUI:

```yaml
# battle.yaml
enabledFormats:
  - SINGLES
  - DOUBLES
  - TRIPLES    # Remove to disable
```

### Season Presets

Run a VGC-only season? A Singles tournament? Season presets let you dynamically enable formats:

```yaml
# season_presets/vgc.yml
formats:
  SINGLES:
    enabled: false
  DOUBLES:
    enabled: true
    teamSize: 6
    selectCount: 4
  TRIPLES:
    enabled: false
```

### Per-Format Rules

Different bans for different formats:

```yaml
formats:
  SINGLES:
    blacklist:
      moves: ["baton_pass"]
  DOUBLES:
    blacklist:
      moves: ["dark_void"]
  TRIPLES:
    turnTimeoutSeconds: 150  # More time for complex decisions
```

## Multi-Format Rewards

Season rewards are distributed per format. Rank high in all three? Get rewards for all three.

---

**Related**: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/) | [ELO System](/docs/cobbleranked/features/elo-system/) | [Seasons](/docs/cobbleranked/features/seasons/)
