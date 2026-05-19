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
| `fr-Fr.json5` | French |
| `pt-Br.json5` | Portuguese (Brazil) |
| `ru-Ru.json5` | Russian |

> 📝 **You can create translations for any language!** See [Creating Custom Languages](#creating-custom-languages) below.

## Setting Language

Edit `config/cobbleranked/config.yaml`:

```yaml
# config.yaml
language: "ja-jp"  # Use any language code matching your file
```

The language value is auto-normalized to match your language file name (e.g., "ja-jp" → "ja-Jp.json5", "pt-br" → "pt-Br.json5").

Reload with `/rankedadmin reload`.

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

### Example: Korean Translation

```json5
// ko-KR.json5
{
  "queue": {
    "joined": "&a{format} queue joined!",
    "left": "&eLeft the queue.",
    "match_found": "&6Match found!"
  },
  "elo": {
    "gained": "&a+{elo_change} ELO &7(current: {elo})",
    "lost": "&c-{elo_change} ELO &7(current: {elo})"
  }
}
```

> 📝 Keep placeholders (`{player}`, `{format}`, etc.) and color codes (`&a`, `&c`) intact. Share translations on [Discord](https://discord.gg/VVVvBTqqyP).

---

## See Also

- [Main Configuration](/docs/cobbleranked/configuration/config/) - General settings
- [GUI Customization](/docs/cobbleranked/configuration/gui/) - Menu customization
- [FAQ](/docs/cobbleranked/support/faq/) - Common questions and troubleshooting
