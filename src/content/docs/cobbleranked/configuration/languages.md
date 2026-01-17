---
title: Language Configuration
description: Customize messages and add translations.
---

Customize all CobbleRanked messages in `config/cobbleranked/language/`.

## Available Languages

| File | Language |
|------|----------|
| `en-Us.json5` | English (default) |
| `ja-Jp.json5` | Japanese |

## Setting Language

Edit `config/cobbleranked/config.yaml`:

```yaml
# config.yaml
language: "ja-jp"  # en-us or ja-jp
```

Reload with `/rankedadmin reload`.

## Message Structure

```json5
{
  "queue": {
    "joined": "&aYou joined the {format} queue!",
    "left": "&eYou left the queue.",
    "already_in": "&cYou're already in queue."
  },
  "battle": {
    "start": "&a&lBattle starting!",
    "win": "&6&l🎉 Victory!",
    "lose": "&c&lDefeat..."
  }
}
```

## Placeholders

Messages support dynamic placeholders:

| Placeholder | Description |
|-------------|-------------|
| `{player}` | Player name |
| `{opponent}` | Opponent name |
| `{format}` | Battle format |
| `{elo}` | Current ELO |
| `{elo_change}` | ELO gained/lost |
| `{rank}` | Current rank |
| `{season}` | Season name |

## Creating Custom Languages

1. Copy `en-Us.json5` to new file (e.g., `ko-Kr.json5`)
2. Translate all strings
3. Set language in config

## Example Messages

### English

```json5
{
  "queue": {
    "joined": "&aYou joined the {format} queue!",
    "match_found": "&6Match found! Click to accept."
  },
  "elo": {
    "gained": "&a+{elo_change} ELO &7(Now: {elo})",
    "lost": "&c-{elo_change} ELO &7(Now: {elo})"
  }
}
```

### Japanese

```json5
{
  "queue": {
    "joined": "&a{format}キューに参加しました！",
    "match_found": "&6対戦相手が見つかりました！クリックして承認。"
  },
  "elo": {
    "gained": "&a+{elo_change} ELO &7(現在: {elo})",
    "lost": "&c-{elo_change} ELO &7(現在: {elo})"
  }
}
```

## Hot Reload

Language changes apply immediately:

```
/rankedadmin reload
```

---

## See Also

- [Main Configuration](config/) - General settings
- [GUI Customization](gui/) - Menu customization
- [FAQ](../support/faq/) - Common questions and troubleshooting
