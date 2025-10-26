# Configuration Guide

Welcome to the CobbleRanked configuration documentation. This guide will help you set up and customize your ranked battles system.

## Quick Links

- [Blacklist Configuration](blacklist.md) - Ban Pokemon, moves, abilities, and items
- [Main Configuration](config.md) - Core server settings
- [Arena Setup](arenas.md) - Configure battle arenas
- [Rewards System](rewards.md) - Set up season and milestone rewards
- [Language Files](languages.md) - Customize messages and translations

## Configuration Format

CobbleRanked uses **JSON format** for all configuration files. JSON is:
- ✅ Easy to read and edit
- ✅ Standard format used by most Cobblemon mods
- ✅ No issues with line endings (CRLF/LF)
- ✅ Simple empty list syntax: `[]`

## Configuration Files Location

All configuration files are located in: `config/cobbleranked/`

```
config/cobbleranked/
├── config.json          # Main configuration
├── blacklist.json       # Pokemon/move/ability bans
├── arenas.json          # Battle arena locations
├── rewards.json         # Season & milestone rewards
├── gui/
│   ├── gui-enUs.json    # English GUI
│   ├── gui-jaJp.json    # Japanese GUI
│   ├── gui-ptBr.json    # Portuguese GUI
│   └── gui-ruRu.json    # Russian GUI
└── language/
    ├── en-Us.json       # English messages
    ├── ja-Jp.json       # Japanese messages
    ├── pt-Br.json       # Portuguese messages
    └── ru-Ru.json       # Russian messages
```

## First-Time Setup

1. **Start your server** - Configuration files will be auto-generated
2. **Stop the server**
3. **Edit the files** using any text editor (VS Code, Notepad++, etc.)
4. **Restart the server** - Changes will be applied

## Editing JSON Files

### Basic Rules

1. **Always use double quotes** for strings: `"legendary"` not `'legendary'`
2. **Use commas** between array items: `["Mewtwo", "Lugia"]`
3. **No trailing comma** on last item: `["A", "B"]` not `["A", "B",]`
4. **Empty lists**: `[]` not `[ ]`
5. **Empty objects**: `{}` not `{ }`

### Example: Banning Pokemon

```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",
    "Rayquaza"
  ]
}
```

### Common Mistakes

❌ **Wrong:**
```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia",  ← Trailing comma!
  ]
}
```

✅ **Correct:**
```json
{
  "black_list_pokemon": [
    "Mewtwo",
    "Lugia"
  ]
}
```

## Reloading Configuration

Use the `/rankedarena reload` command to reload configuration without restarting:

```
/rankedarena reload
```

## Getting Help

- **Documentation**: Read the specific configuration guides linked above
- **Examples**: Each JSON file includes `_comments` and `_examples` sections
- **Support**: Report issues at https://github.com/your-repo/issues

## Next Steps

- [Configure blacklist](blacklist.md) - Start by setting up Pokemon bans
- [Set up arenas](arenas.md) - Create battle locations
- [Customize rewards](rewards.md) - Configure season rankings
