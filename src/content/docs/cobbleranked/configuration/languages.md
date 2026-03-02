---
title: Language Configuration
description: Customize messages and add translations for any language.
---

Customize all CobbleRanked messages in `config/cobbleranked/language/`.

**You can add translations for ANY language** - not just English and Japanese. Create your own language file by copying an existing one and translating the strings.

## Officially Provided Languages

These languages are included with CobbleRanked:

| File | Language |
|------|----------|
| `en-Us.json5` | English (default) |
| `ja-Jp.json5` | Japanese |

> 💡 **You can create translations for any language!** See [Creating Custom Languages](#creating-custom-languages) below.

## Setting Language

Edit `config/cobbleranked/config.yaml`:

```yaml
# config.yaml
language: "ja-jp"  # Use any language code matching your file
```

The language value must match your language file name (without extension).

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

---

## Creating Custom Languages

You can create a translation for **any language**. Here's how:

### Step-by-Step Guide

1. **Copy an existing language file as template**

   ```bash
   # From your server's config directory
   cp config/cobbleranked/language/en-Us.json5 config/cobbleranked/language/es-ES.json5
   ```

2. **Translate all strings in the new file**

   Open `es-ES.json5` and translate each message value.

3. **Set your custom language in config**

   ```yaml
   # config.yaml
   language: "es-ES"
   ```

4. **Reload the mod**

   ```
   /rankedadmin reload
   ```

### Language File Naming

Language files use **ISO 639-1** language codes:

| Format | Example | Language |
|--------|---------|----------|
| `xx-XX` | `en-Us`, `ja-Jp` | Language-Country |
| `xx-xx` | `es-ES`, `ko-KR` | Language-Region (uppercase country) |

**Common language codes:**

| Code | Language | File Name |
|------|----------|-----------|
| `ko` | Korean | `ko-KR.json5` |
| `zh` | Chinese | `zh-CN.json5` (Simplified), `zh-TW.json5` (Traditional) |
| `es` | Spanish | `es-ES.json5` |
| `fr` | French | `fr-FR.json5` |
| `de` | German | `de-DE.json5` |
| `pt` | Portuguese | `pt-BR.json5` (Brazil), `pt-PT.json5` (Portugal) |
| `ru` | Russian | `ru-RU.json5` |
| `it` | Italian | `it-IT.json5` |
| `vi` | Vietnamese | `vi-VN.json5` |
| `th` | Thai | `th-TH.json5` |

### Complete Example: Korean Translation

**Step 1:** Create `ko-KR.json5`

```json5
{
  "queue": {
    "joined": "&a{format} 대기열에 참가했습니다!",
    "left": "&e대기열에서 나왔습니다.",
    "already_in": "&c이미 대기열에 있습니다.",
    "match_found": "&6매칭을 찾았습니다! 클릭하여 수락하세요."
  },
  "battle": {
    "start": "&a&l배틀이 시작됩니다!",
    "win": "&6&l🎉 승리!",
    "lose": "&c&l패배..."
  },
  "elo": {
    "gained": "&a+{elo_change} ELO &7(현재: {elo})",
    "lost": "&c-{elo_change} ELO &7(현재: {elo})"
  }
}
```

**Step 2:** Set in config

```yaml
# config.yaml
language: "ko-KR"
```

**Step 3:** Reload

```
/rankedadmin reload
```

### Translation Tips

1. **Keep placeholders intact** - Don't modify `{player}`, `{format}`, etc.
2. **Preserve color codes** - Keep `&a`, `&c`, `&6` etc. for consistent styling
3. **Test thoroughly** - Some messages may be longer in your language; check GUI layouts
4. **Back up your work** - Keep a copy of your translation outside the config folder

### Sharing Your Translation

If you've created a translation that others might find useful:

1. Share it on the [Discord](https://discord.gg/VVVvBTqqyP)
2. Submit it to the community repository (if available)
3. Help other players by providing feedback

---

## Example Messages

### English (en-Us.json5)

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

### Japanese (ja-Jp.json5)

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

### Spanish Custom (es-ES.json5)

```json5
{
  "queue": {
    "joined": "&a¡Te uniste a la cola de {format}!",
    "match_found": "&6¡Partido encontrado! Haz clic para aceptar."
  },
  "elo": {
    "gained": "&a+{elo_change} ELO &7(Ahora: {elo})",
    "lost": "&c-{elo_change} ELO &7(Ahora: {elo})"
  }
}
```

## Hot Reload

Language changes apply immediately:

```
/rankedadmin reload
```

No server restart required!

---

## See Also

- [Main Configuration](config/) - General settings
- [GUI Customization](gui/) - Menu customization
- [FAQ](../support/faq/) - Common questions and troubleshooting
