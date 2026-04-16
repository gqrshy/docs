---
title: Web API Integration
description: Sync ranked battle data to your external website.
---

Display live ranked data on your community website. Leaderboards, usage statistics, player rankings. All synced automatically.

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
  res.json({ success: true });
});

app.post('/api/leaderboard', (req, res) => {
  const data = req.body;
  res.json({ success: true });
});

app.post('/api/battle-replay', (req, res) => {
  const data = req.body;
  res.json({ success: true });
});

app.post('/api/match-result', (req, res) => {
  const data = req.body;
  res.json({ success: true });
});
```

### Step 3: Verify

Check server logs for sync confirmation after the configured interval.

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
                  "winRate": 62.3,
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

### Battle Replay

**Endpoint:** `POST {baseUrl}/battle-replay`

Full Showdown protocol log pushed after each ranked battle ends.

```json
{
  "matchId": "abc-123",
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "format": "SINGLES",
  "timestamp": "2026-01-02T12:00:00Z",
  "turnCount": 24,
  "players": [
    {
      "uuid": "550e8400-...",
      "playerName": "PlayerA",
      "team": ["Garchomp", "Rotom-Wash", "Togekiss"],
      "isWinner": true
    }
  ],
  "battleLog": [
    "|start|",
    "|switch|p1a: Garchomp|Garchomp, L100|100/100",
    "|turn|1"
  ],
  "endReason": "VICTORY"
}
```

### Match Result

**Endpoint:** `POST {baseUrl}/match-result`

Per-match data including ELO changes and full team composition.

```json
{
  "matchId": "abc-123",
  "serverId": "battle-server-1",
  "seasonName": "Season 1",
  "format": "SINGLES",
  "matchType": "RANKED",
  "timestamp": "2026-01-02T12:00:00Z",
  "durationSeconds": 540,
  "endReason": "VICTORY",
  "players": [
    {
      "uuid": "550e8400-...",
      "playerName": "PlayerA",
      "eloBefore": 1500,
      "eloAfter": 1524,
      "eloChange": 24,
      "isWinner": true,
      "faintedCount": 1,
      "team": [
        {
          "species": "Garchomp",
          "ability": "Rough Skin",
          "item": "Choice Scarf",
          "moves": ["Earthquake", "Outrage", "Stone Edge", "Fire Fang"],
          "nature": "Jolly",
          "evSpread": "4/252/0/0/0/252"
        }
      ]
    }
  ]
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
| `sync.dataTypes.battleReplays` | Send full Showdown battle logs |
| `sync.dataTypes.matchResults` | Send per-match ELO changes and team composition |
| `sync.leaderboardLimit` | Max players per format (default: 100, 0 or negative = unlimited) |
| `sync.push.enabled` | Enable pushing data to external API |
| `sync.push.onlyIfChanged` | Only sync when data changes |
| `http.timeoutSeconds` | Request timeout (default: 30) |
| `http.retryAttempts` | Number of retries on failure |

<details>
<summary><strong>Full Configuration</strong></summary>

```yaml
enabled: true

endpoint:
  baseUrl: "https://your-website.com/api"

auth:
  apiKey: "your-secret-key-here"

sync:
  intervalMinutes: 60
  leaderboardLimit: 100
  dataTypes:
    usageStats: true
    leaderboard: true
    battleReplays: false
    matchResults: false
  push:
    enabled: true
    onlyIfChanged: true
  pull:
    enabled: false

http:
  timeoutSeconds: 30
  retryAttempts: 3
  retryDelaySeconds: 5
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

## See Also

- [Configuration](/docs/cobbleranked/configuration/config/) - Main configuration guide
- [Leaderboards](/docs/cobbleranked/features/leaderboards/) - Leaderboard feature
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
