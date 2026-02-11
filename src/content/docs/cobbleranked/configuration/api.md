---
title: Web API Integration
description: Sync ranked battle data to your external website.
---

Display live ranked data on your community website. Leaderboards, usage statistics, player rankings — all synced automatically.

---

## Quick Setup

### Step 1: Enable API Sync

Edit `config/cobbleranked/api.yaml`:

```yaml
enabled: true

endpoint:
  baseUrl: "https://your-website.com/api"

auth:
  apiKey: "your-secret-key-here"
```

### Step 2: Create API Endpoint

Your website needs endpoints to receive the data:

```javascript
app.post('/api/usage-stats', (req, res) => {
  const data = req.body;
  // Store data (database, cache, file)
  res.json({ success: true });
});

app.post('/api/leaderboard', (req, res) => {
  const data = req.body;
  res.json({ success: true });
});
```

### Step 3: Test

Run `/rankedadmin api test` in-game to verify connection.

---

## Data Format

### Usage Stats

**Endpoint:** `POST {baseUrl}/usage-stats`

```json
{
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "timestamp": "2026-01-02T12:00:00Z",
  "formats": {
    "SINGLES": {
      "tiers": {
        "1500+": {
          "minElo": 1500,
          "maxElo": null,
          "totalBattles": 1250,
          "species": [
            {
              "name": "Garchomp",
              "usagePercent": 45.2,
              "abilities": { "Rough Skin": 85.3 },
              "items": { "Choice Scarf": 42.1 },
              "moves": { "Earthquake": 98.2 }
            }
          ]
        }
      }
    }
  }
}
```

### Leaderboard

**Endpoint:** `POST {baseUrl}/leaderboard`

```json
{
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "timestamp": "2026-01-02T12:00:00Z",
  "formats": {
    "SINGLES": {
      "players": [
        {
          "rank": 1,
          "uuid": "550e8400-...",
          "playerName": "ChampionPlayer",
          "elo": 2150,
          "tier": "CHERISH",
          "wins": 245,
          "losses": 32,
          "winRate": 88.45
        }
      ]
    }
  }
}
```

---

## Configuration

| Setting | Description |
|---------|-------------|
| `enabled` | Enable API sync |
| `endpoint.baseUrl` | Your API base URL |
| `auth.apiKey` | Secret key sent in `X-API-Key` header |
| `sync.intervalMinutes` | How often to sync (default: 60) |
| `sync.dataTypes.usageStats` | Send usage statistics |
| `sync.dataTypes.leaderboard` | Send leaderboard data |
| `crossServer.battleServerOnly` | Only battle server syncs (cross-server mode) |

<details>
<summary><strong>Full Configuration</strong></summary>

```yaml
enabled: true

endpoint:
  baseUrl: "https://your-website.com/api"
  paths:
    pushUsageStats: "/usage-stats"
    pushLeaderboard: "/leaderboard"

auth:
  apiKey: "your-secret-key-here"

sync:
  intervalMinutes: 60
  dataTypes:
    usageStats: true
    leaderboard: true
  push:
    enabled: true
    onlyIfChanged: true

crossServer:
  battleServerOnly: true
```

</details>

---

## Authentication

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |
| `X-API-Key` | Your configured API key |

Validate `X-API-Key` on your server before processing data.

---

## Commands

| Command | Description |
|---------|-------------|
| `/rankedadmin api sync` | Force immediate sync |
| `/rankedadmin api status` | View sync status |
| `/rankedadmin api test` | Test configuration |

---

## See Also

- [Configuration](config/) - Main configuration guide
- [Leaderboards](../features/leaderboards/) - Leaderboard feature
- [FAQ](../support/faq/) - Common questions and troubleshooting
