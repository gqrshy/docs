---
title: Flee & Forfeit Penalties
description: Countermeasures for rage-quitting and ELO farming.
---

## Why Penalties?

Ranked battles only stay fair if players actually finish them. Rage-quitting, mid-battle disconnects, and alt-account ELO farming (forfeiting on purpose to feed another account rating) all break matchmaking. CobbleRanked tracks these and applies escalating penalties, so players who fight fair aren't punished for opponents who don't.

Penalties apply to **ranked** matches only. Casual matches are unaffected.

## What Counts

A penalty is applied when a player ends a ranked match early by any of these:

- **PvP forfeit** (surrendering mid-battle)
- **Leaving during a prep phase** (team selection, lead selection, or the pre-battle countdown)
- **Disconnecting mid-battle**, including across linked servers. The penalty follows the player.

Forfeits are detected across the battle's full lifecycle, including the cases that used to slip through.

## Tiered Penalties

Penalties escalate the more often a player forfeits or disconnects. Default tiers:

| Offense | Penalty |
|---------|---------|
| 1st | warning only |
| 2nd | 5 minutes |
| 3rd | 30 minutes |
| 4th to 5th | 3 hours |
| 6th to 9th | 6 hours |
| 10th and beyond | 1 day |

While a penalty is active, the player can't join the ranked queue. Flee counts decay over time, so the occasional legit disconnect won't strand a player in the high tiers.

> All durations and tiers are fully configurable. See [Battle Configuration](/docs/cobbleranked/configuration/battle/).

## Only the Player at Fault

If your opponent is the one who left or forfeited, **you** are not penalized. The penalty targets only the player who caused the early end. Your match is recorded normally (typically as a win), with the usual rating update.

## Early-Forfeit Penalty

To counter alt-account ELO farming, where someone repeatedly surrenders in the first turn or two to feed rating, forfeiting **within the first few turns** carries an extra penalty multiplier on top of the base tier.

- `earlyForfeit.maxTurns`: how many turns count as "early" (default 3).
- `earlyForfeit.penaltyMultiplier`: multiplier applied to the base penalty (default 3.0).

So an early forfeit on a player's 3rd offense becomes `30 minutes × 3 = 90 minutes` instead of 30.

## Forfeit Block (Optional)

For the strictest anti-farming setup, you can forbid forfeiting entirely during the early turns. When enabled:

- A player who tries to forfeit within the first `maxTurns` turns is **blocked**. The forfeit is cancelled, they're re-prompted to choose an action, and shown a message.
- The match continues. They either play on or let the [turn timer](/docs/cobbleranked/features/turn-timer/) run out.
- Once `maxTurns` has passed, forfeiting works normally again.

This is **off by default**. Enable it in [`battle.yaml`](/docs/cobbleranked/configuration/battle/) under `competitive.forfeitBlock` if you want to force engagement in the opening turns.

> Note: even with forfeit block on, a disconnect or a timed-out turn still ends the match. Block only stops the voluntary forfeit button.

See also: [Ranked Battles](/docs/cobbleranked/features/ranked-battles/), [Battle Configuration](/docs/cobbleranked/configuration/battle/).
