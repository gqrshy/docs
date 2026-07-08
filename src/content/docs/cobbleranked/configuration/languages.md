---
title: Language Configuration
description: Customize messages and add translations for any language.
---

Customize all CobbleRanked messages in `config/cobbleranked/language/`. Battle format names, mission titles and descriptions, GUI text, and every `/rankedadmin` message and admin notification are fully translatable.

**You can add translations for ANY language** - not just English and Japanese. Create your own language file by copying an existing one and translating the strings.

## Officially Provided Languages

These languages are included with CobbleRanked:

| File | Language |
|------|----------|
| `en-Us.json5` | English (default) |
| `ja-Jp.json5` | Japanese |

French, Portuguese, Russian, and other languages are not bundled. Create them yourself following [Creating Custom Languages](#creating-custom-languages) below.

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

## Text Formatting: Legacy Codes & MiniMessage

Message values support two text-formatting syntaxes, and you can freely mix them in the same file:

### Legacy color codes (`&`)

The classic Minecraft format — a `&` followed by a single character. Limited to 16 colors.

| Code | Color | Code | Color |
|------|-------|------|-------|
| `&0` Black | `&1` Dark Blue | `&2` Dark Green | `&3` Dark Aqua |
| `&4` Dark Red | `&5` Dark Purple | `&6` Gold | `&7` Gray |
| `&8` Dark Gray | `&9` Blue | `&a` Green | `&b` Aqua |
| `&c` Red | `&d` Light Purple | `&e` Yellow | `&f` White |

Modifiers: `&l` bold, `&o` italic, `&n` underline, `&m` strikethrough, `&k` obfuscated, `&r` reset.

### MiniMessage tags (rich text)

For HEX colors and gradients, use [MiniMessage](https://docs.advntr.dev/minimessage/) syntax. Required for anything beyond the 16 legacy colors.

```json5
// Gradients (left → right)
"player_info_title": "<gradient:#FFD54F:#FF8A00><bold>{player_name}'s Stats</bold></gradient>",
"common_separator": "<gradient:#5FD3E8:#2A2F45>━━━━━━━━━━━━━━━━━</gradient>",

// HEX colors
"tooltip_label_ability": "<color:#5FD3E8>Ability:</color>",

// Design-system tags (palette aliases — easier to read than raw hex)
"player_info_elo": "<label>ELO:</label> <value>{stats_elo}</value>",
"battle_result_victory": "<positive><bold>VICTORY!</bold></positive>",
"battle_result_defeat": "<negative><bold>DEFEAT...</bold></negative>",
```

#### Built-in design-system tags

CobbleRanked ships these palette tags, ready to use in any message:

| Tag | Color | Use for |
|-----|-------|---------|
| `<label>` | `#5FD3E8` (cyan) | Field labels (`ELO:`, `Record:`) |
| `<value>` | `#FFFFFF` (white) | Values (numbers, names) |
| `<positive>` | `#7CFC8E` (green) | Wins, +ELO, success |
| `<negative>` | `#FF6B6B` (red) | Losses, -ELO, errors |
| `<hint>` | `#9BA3AF` (gray) | Hints (`Click to switch`) |
| `<brand>` | `#FFD54F` (gold) | Brand accent |
| `<dark>` | `#3A4155` (dark) | Separators (`/`, `•`) |
| `<bold>` | — | Bold text |
| `<gradient:#A:#B>...</gradient>` | — | Left → right color gradient |

Standard MiniMessage tags (`<color:#RRGGBB>`, `<italic>`, `<underlined>`, `<strikethrough>`, `<rainbow>`, etc.) also work.

### How the hybrid parser picks a format

Each message is parsed independently:

- If the string contains a `<` character → parsed as **MiniMessage** (`<gradient>`, `<label>`, etc. work).
- Otherwise → parsed as **legacy** (`&` codes are converted to `§`).

Your existing `&`-coded custom translations keep working unchanged. You can introduce MiniMessage tags in any individual key without touching the rest.

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
