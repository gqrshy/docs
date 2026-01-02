---
title: CobbleRanked
description: The ultimate competitive Pokemon battle system for Cobblemon
---

> **Transform your Cobblemon server into a competitive Pokemon arena**

[Get Started](/docs/cobbleranked/getting-started/installation/) | [View on Polymart](https://polymart.org/product/8733/cobbleranked)

---

## Core Features

### Battle Formats
Three competitive formats to master - **Singles**, **Doubles**, and **Triples**. Each format has its own leaderboard, meta, and rewards.

### Smart Matchmaking
Choose between **Pokemon Showdown ELO** or **Glicko-2** rating systems. Dynamic Elo range expansion ensures quick matches while maintaining competitive balance. Recent opponent avoidance prevents repetitive matchups.

### Season System
Run competitive seasons with scheduled start/end dates, soft or hard ELO resets, and automatic stat carryover. Archive previous season leaderboards and distribute exclusive rewards to top performers.

### Rank Tiers
Six progression tiers from **Poké Ball** (1000+) to **Cherish Ball** (2100+). Players climb through Great Ball, Ultra Ball, Master Ball, and Beast Ball as they improve.

---

## Battle Experience

### Turn Timer
Keep battles moving with configurable turn timeouts. Visual action bar shows remaining time with color stages - white → yellow → orange → red. Auto-select moves when time runs out.

### Battle Camera
Cinematic camera system with orbit, terrain-adaptive, and dynamic tracking modes. ML-enhanced camera learns player preferences. Syncs with background music for immersive battles.

### Battle Music
Queue music, team selection music, and ELO-based battle tracks. High-rated battles get epic soundtracks. Fully customizable via resource packs.

### Arena System
Multiple arenas with hot-swap support. Random or sequential selection. Configure player positions, spectator spots, and field effect centers per arena.

---

## Progression & Rewards

### Missions
Daily and weekly missions keep players engaged. Mission types include match count, win count, win streaks, Pokemon type usage, format participation, and more.

### Rewards
Reward top 100 players per format each season. Tier-based rewards for reaching Elo milestones. Delivered via MailLib integration with command execution support.

### Leaderboards
Real-time cached leaderboards with 30-second refresh. Format-specific rankings. Off-season displays archived top 100 from previous season.

---

## Competitive Integrity

### Team Validation
Comprehensive blacklist system - ban Pokemon by species, form, or label (Legendary, Pseudo-Legendary). Item blacklists and item clause. Level caps and shiny restrictions per format.

### Player Restrictions
Two-phase restriction system (Queue and Arena). Block item use, block interaction, combat, teleportation, PC access, and commands during battles. Fully configurable.

### Casual Mode
Practice without affecting ratings. Available during off-season or anytime for friendly matches.

---

## Server Infrastructure

### Cross-Server Support
Connect multiple servers via Redis pub/sub. Global queue, unified rankings, and automatic battle server election. Perfect for large networks with lobby/battle server architecture.

### Database Options
SQLite for single servers, MySQL for cross-server setups, MongoDB for cloud deployments. Automatic schema management.

### Web API
Sync leaderboards and Pokemon usage statistics to your website in real-time. Authenticated API endpoints with configurable sync intervals.

**Live Demos:** [Leaderboard](/demo/leaderboard/) | [Usage Stats](/demo/usage-stats/)

---

## Integrations

- **LuckPerms** - Permission-based rank assignment
- **PlaceholderAPI** - Stats placeholders for chat and scoreboards
- **MailLib** - Reward delivery via in-game mail
- **Velocity** - Cross-server player transfers

---

## Quick Links

- [Installation](/docs/cobbleranked/getting-started/installation/)
- [Quick Start](/docs/cobbleranked/getting-started/quick-start/)
- [Commands](/docs/cobbleranked/getting-started/commands/)
- [Configuration](/docs/cobbleranked/configuration/config/)

---

**Available on [Polymart](https://polymart.org/product/8733/cobbleranked) - $10 USD**
