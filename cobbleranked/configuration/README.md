# Configuration Guide

Welcome to the CobbleRanked configuration documentation. This guide will help you set up and customize your ranked battles system.

## Quick Links

- [Main Configuration](config.md) - Core server settings and Elo system
- [Blacklist Configuration](blacklist.md) - Ban Pokemon, moves, abilities, and items
- [Arena Setup](arenas.md) - Configure battle arenas
- [Rewards System](rewards.md) - Set up season and milestone rewards
- [Language Files](languages.md) - Customize messages and translations
- [GUI Customization](gui.md) - Customize menu appearance

## Configuration Format

CobbleRanked uses **JSON5 format** for all configuration files. JSON5 is:
- ✅ Easy to read and edit
- ✅ Supports comments (`//` or `/* */`)
- ✅ Allows trailing commas
- ✅ More flexible than standard JSON

## Configuration Files Location

All configuration files are located in: `config/cobbleranked/`

```
config/cobbleranked/
├── config.json5         # Main configuration
├── blacklist.json5      # Pokemon/move/ability bans
├── arenas.json5         # Battle arena locations
├── rewards.json5        # Season & milestone rewards
├── gui/
│   ├── gui-enUs.json5   # English GUI
│   ├── gui-jaJp.json5   # Japanese GUI
│   ├── gui-ptBr.json5   # Portuguese GUI
│   └── gui-ruRu.json5   # Russian GUI
└── language/
    ├── en-Us.json5      # English messages
    ├── ja-Jp.json5      # Japanese messages
    ├── pt-Br.json5      # Portuguese messages
    └── ru-Ru.json5      # Russian messages
```

## First-Time Setup

1. **Start your server** - Configuration files will be auto-generated
2. **Stop the server**
3. **Edit the files** using any text editor (VS Code, Notepad++, etc.)
4. **Restart the server** - Changes will be applied

## Editing JSON5 Files

### Basic Rules

1. **Double quotes for strings**: `"legendary"` (single quotes also work: `'legendary'`)
2. **Trailing commas allowed**: `["A", "B",]` is valid
3. **Comments allowed**: Use `//` or `/* */`
4. **Empty lists**: `[]`
5. **Empty objects**: `{}`

### Example: Banning Pokemon

```json5
{
  // Ban legendary Pokemon
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",
    "Rayquaza",  // Trailing comma is OK in JSON5
  ]
}
```

### JSON5 Features

✅ **Comments:**
```json5
{
  // This is a comment
  "black_list_pokemon": ["Mewtwo"], // End-of-line comment

  /* Multi-line
     comment */
  "black_list_labels": ["legendary"]
}
```

✅ **Trailing commas:**
```json5
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",  // Trailing comma is fine
  ],  // Also fine here
}
```

## Reloading Configuration

Use the `/rankedarena reload` command to reload configuration without restarting:

```
/rankedarena reload
```

## Getting Help

- **Documentation**: Read the specific configuration guides linked above
- **Examples**: Each JSON5 file includes comments explaining options
- **Support**: Report issues at https://github.com/gqrshy/CobbleRanked/issues

## Next Steps

- [Configure blacklist](blacklist.md) - Start by setting up Pokemon bans
- [Set up arenas](arenas.md) - Create battle locations
- [Customize rewards](rewards.md) - Configure season rankings
