---
title: Player Timer
description: A chess-clock style cumulative time control, per format.
---

## What is the Player Timer?

The **Player Timer** is a chess-clock / Pokémon Showdown-style **cumulative** time control. Each player gets a total time budget for the entire match, and a small increment is added back after each of their turns. Run out of time and you lose on the clock.

It works alongside the [Turn Timer](/docs/cobbleranked/features/turn-timer/); the two are independent and can both be active. The Turn Timer is per-turn ("you have 90s to pick a move"), while the Player Timer is per-match ("you have 20 minutes total, plus 10s each turn").

- **Cumulative.** Your clock only ticks down during *your* turns.
- **Increment.** A configurable number of seconds is added to your clock at the end of each of your turns (Showdown-style).
- **Tie-break on timeout.** When a player's clock hits zero, the winner is decided by a configurable rule (time or remaining HP) instead of always defaulting one way.

## Enabling It

The Player Timer is **off by default** and enabled **per format** in your season preset:

```yaml
# season_presets/default.yml
singles:
  playerTimerSeconds: 1200        # 20 minutes total per player
  playerTimerIncrement: 10        # +10s added after each of your turns
  playerTimerTieBreak: TIME       # how to decide the winner on timeout
```

- `playerTimerSeconds`: total time per player, in seconds. `0` (the default) disables the Player Timer for that format.
- `playerTimerIncrement`: seconds added back after each of your turns.
- `playerTimerTieBreak`: what decides the winner when someone times out. `TIME` (who ran out) or `HEALTH` (compare remaining force).

It stacks on top of the overall [Battle Timer](/docs/cobbleranked/features/turn-timer/) (the hard match-duration cap). Both can be active at once.

## How It Plays

- Your remaining time is tracked across the whole match, not reset each turn.
- Thinking long on a move spends your own clock, not your opponent's.
- The per-turn [Turn Timer](/docs/cobbleranked/features/turn-timer/) still applies, so a single stalled turn can't exceed the turn limit. But repeatedly burning most of each turn's allowance will drain your Player Timer over time.
- On timeout, the result is decided by the configured tie-break, then recorded like any other match end (rating updates, rewards, and so on).

See also: [Turn Timer](/docs/cobbleranked/features/turn-timer/).
