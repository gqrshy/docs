---
title: Quick Start
description: Get your first ranked battle started in 5 minutes.
---

Get your first ranked battle started in 5 minutes.

## Prerequisites

- CobbleRanked installed and server running
- At least one arena configured
- Two players with Pokemon teams

## Starting a Ranked Battle

### Player 1

1. Open the ranked menu: `/ranked`
2. Click "Join Queue" for your desired format (Singles/Doubles/Triples)
3. Wait for matchmaking

### Player 2

1. Open the ranked menu: `/ranked`
2. Click "Join Queue" for the same format
3. Matchmaking will pair you together

### Match Found

1. Both players see "Match Found!" notification
2. Click "Ready" within the time limit
3. Both players are teleported to the arena
4. Battle begins!

## Battle Flow

```
Queue → Match Found → Ready Check → Team Selection → Lead Selection → Battle → Results
```

### Team Selection (if enabled)

- Select 3-6 Pokemon from your party for the battle
- Time limit applies

### Lead Selection (if enabled)

- Choose which Pokemon to send out first
- Opponent's selection is hidden

### During Battle

- Use Cobblemon's battle UI to select moves
- Turn timer prevents stalling
- Camera system provides cinematic view (toggle with `/battlecamera toggle`)

### After Battle

- ELO is updated based on result
- Stats are recorded
- Players return to their original positions

## Casual Battles

For practice without affecting your rank:

```
/casual
```

Same flow as ranked, but no ELO changes.

## Common Commands

| Command | Description |
|---------|-------------|
| `/ranked` | Open ranked battle menu (stats, leaderboard, queue) |
| `/casual` | Open casual battle menu |
| `/battlecamera toggle` | Toggle battle camera on/off |

## Tips for New Players

1. **Practice in Casual** - Get familiar with the system before ranked
2. **Check Blacklist** - Some Pokemon/moves may be restricted
3. **Mind the Timer** - Don't take too long on turns
4. **Camera Toggle** - Use `/battlecamera toggle` if you prefer manual camera

## Troubleshooting

### "No arenas available"

Admin needs to configure at least one arena in `arenas.yaml`.

### "You don't have enough Pokemon"

You need at least 1 Pokemon (or more depending on format settings).

### Queue not finding matches

- Ensure both players are in the same format queue
- Check if matchmaking range is too narrow in config
