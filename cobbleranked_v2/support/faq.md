# Frequently Asked Questions

Common questions about CobbleRanked Reloaded.

---

## General

<details>
<summary><strong>What's new in v2 compared to v1?</strong></summary>

Major changes include:
- **Config format:** JSON5 (single file) → YAML (modular files)
- **Architecture:** Complete rewrite with layered design (core/feature/infrastructure)
- **Code quality:** Improved maintainability and extensibility

> 📝 **Note:** Core features (Casual mode, missions, lead selection, match ready confirmation) existed in v1 and continue in v2. The Elo system settings (starting Elo: 1000) remain the same.

**See:** [Migration from v1](../getting-started/migration.md)

</details>

<details>
<summary><strong>Is CobbleRanked free?</strong></summary>

Check the official distribution channels for pricing and licensing information:
- [Discord](https://discord.gg/VVVvBTqqyP)

</details>

<details>
<summary><strong>What versions are supported?</strong></summary>

| Component | Version |
|-----------|---------|
| Minecraft | 1.21.1 |
| Fabric Loader | 0.17.2+ |
| Cobblemon | 1.7.0+ |

</details>

---

## Configuration

<details>
<summary><strong>Where are the config files?</strong></summary>

All configuration files are in `config/cobbleranked/`:

```
config/cobbleranked/
├── config.yaml        # Main settings
├── battle.yaml        # Battle formats
├── elo.yaml           # Rating system
├── matchmaking.yaml   # Queue settings
├── season.yaml        # Seasons
├── rewards.yaml       # Rewards
├── missions.yaml      # Missions
├── restrictions.yaml  # Restrictions
├── arenas.yaml        # Arenas
└── luckperms.yaml     # Permissions
```

</details>

<details>
<summary><strong>How do I change the language?</strong></summary>

Edit `config/cobbleranked/config.yaml`:

```yaml
language: "ja-jp"  # or "en-us"
```

Then reload: `/rankedadmin reload`

</details>

<details>
<summary><strong>How do I disable a format?</strong></summary>

Edit `config/cobbleranked/battle.yaml`:

```yaml
enabledFormats:
  - "SINGLES"
  # - "DOUBLES"  # Commented out = disabled
  # - "TRIPLES"
```

</details>

<details>
<summary><strong>How do I change the starting Elo?</strong></summary>

Edit `config/cobbleranked/elo.yaml`:

```yaml
startingElo: 1000  # Change to desired value (default: 1000)
floorElo: 1000     # Minimum Elo
```

</details>

---

## Gameplay

<details>
<summary><strong>What's the difference between ranked and casual?</strong></summary>

| Feature | Ranked | Casual |
|---------|--------|--------|
| Elo changes | ✅ | ❌ |
| Leaderboard | ✅ | ❌ |
| Mission progress | ✅ | ❌ |
| Flee penalty | ✅ | ❌ |
| Team validation | Full | Relaxed |

</details>

<details>
<summary><strong>Why can't I queue for ranked?</strong></summary>

Common reasons:
1. **Not enough Pokemon** - Need minimum team size (3 for Singles)
2. **Banned Pokemon/moves** - Team violates blacklist
3. **Fainted Pokemon** - All Pokemon must be healthy
4. **Flee penalty** - Banned for disconnecting
5. **Off-season** - No active season

</details>

<details>
<summary><strong>How is Elo calculated?</strong></summary>

CobbleRanked uses K-factor based calculation:

```
Change = K × (Result - Expected)
```

- Beating higher-rated players = more Elo
- Losing to lower-rated players = more Elo loss

**See:** [Elo System](../features/elo-system.md)

</details>

<details>
<summary><strong>What happens if I disconnect?</strong></summary>

Disconnecting during battle:
1. Counts as a loss
2. Opponent wins automatically
3. Flee count +1
4. Progressive ban (5/15/30 minutes)

Flee count decays over time (configurable).

</details>

---

## Seasons

<details>
<summary><strong>How do seasons work?</strong></summary>

Seasons are time-based competitive periods:
1. Define schedule in `season.yaml`
2. Players compete during season
3. At season end, rewards distributed
4. Stats reset based on configuration

**See:** [Season Configuration](../configuration/seasons.md)

</details>

<details>
<summary><strong>What is soft reset?</strong></summary>

Soft reset partially moves Elo toward the starting value:

```yaml
onSeasonEnd:
  softResetElo: true
  softResetFactor: 0.5  # 50% toward starting Elo
```

Example: 1600 Elo → 1300 (pulled toward 1000)

</details>

<details>
<summary><strong>Can I run without seasons?</strong></summary>

Yes, leave the schedule empty for endless mode:

```yaml
schedule: []  # Endless mode
```

</details>

---

## Missions

<details>
<summary><strong>How do missions work?</strong></summary>

Missions are daily/weekly challenges:
1. Enable in `missions.yaml`
2. Progress tracked automatically
3. Claim rewards in GUI

**Types:** Win count, match count, win streak, format-specific, Pokemon type usage

**See:** [Missions Configuration](../configuration/missions.md)

</details>

<details>
<summary><strong>When do missions reset?</strong></summary>

Configure in `missions.yaml`:

```yaml
dailyResetTime: "00:00"
dailyResetTimezone: "UTC"

weeklyResetDay: "MONDAY"
weeklyResetTime: "00:00"
```

</details>

---

## Multi-Server

<details>
<summary><strong>Can I use CobbleRanked on multiple servers?</strong></summary>

Yes, with cross-server mode:
- Requires MySQL/MongoDB for shared data
- Requires Redis for real-time communication
- One server handles battles, others handle queuing

**See:** [Cross-Server Setup](../advanced/cross-server.md)

</details>

<details>
<summary><strong>What database should I use?</strong></summary>

| Scenario | Recommendation |
|----------|----------------|
| Single server | SQLite (default) |
| Multi-server | MySQL |
| Large scale | MongoDB |

**See:** [Database Configuration](../advanced/database.md)

</details>

---

## See Also

- [Troubleshooting](troubleshooting.md) - Problem solving
- [Discord](https://discord.gg/VVVvBTqqyP) - Community support
