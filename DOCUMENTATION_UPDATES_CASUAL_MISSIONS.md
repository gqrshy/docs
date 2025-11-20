# Documentation Updates - Casual Missions System

## Overview

Documentation updated to reflect the new Casual Missions system and language support changes.

**Date:** 2025-01-20
**Version:** 1.0+

---

## New Features Documented

### Casual Missions System

**New File:** [cobbleranked/features/casual-missions.md](cobbleranked/features/casual-missions.md)

Comprehensive documentation for the complete mission and reward system:

**Mission Types Covered:**
- `MATCH_COUNT` - Play X matches
- `WIN_COUNT` - Win X matches
- `POKEMON_TYPE_USAGE` - Use specific Pokemon types
- `FORMAT_PARTICIPATION` - Play specific formats (Singles/Doubles/etc.)
- `POKEMON_DEFEATED` - Defeat cumulative Pokemon count
- `WIN_STREAK` - Achieve consecutive wins
- `GENERATION_USAGE` - Use Pokemon from specific generations (1-9)
- `EVOLUTION_STAGE` - Use Pokemon at specific evolution stages (FIRST/MIDDLE/FINAL/SINGLE)

**Systems Documented:**
- Daily missions (reset at configured time)
- Weekly missions (reset on configured day)
- Milestone rewards (one-time cumulative achievements)
- Pending rewards system (offline player rewards)
- Reset configuration (timezone, day, time)
- Database tables (casual_mission_progress, casual_milestone_claims, pending_rewards)

**User-Friendly Content:**
- Simple explanations for each mission type with examples
- Default mission list with rewards
- Step-by-step configuration guide
- GUI usage instructions
- Troubleshooting section
- Performance considerations

---

## Language Support Changes

**File Updated:** [cobbleranked/configuration/languages.md](cobbleranked/configuration/languages.md)

**Changes Made:**
- Updated supported languages from 4 to 2
- Removed: Portuguese (pt-Br), Russian (ru-Ru)
- Maintained: English (en-Us), Japanese (ja-Jp)
- Added deprecation notice for discontinued languages

**Before:**
```
CobbleRanked includes 4 built-in languages:
- English (en-Us.json5) - Default
- Japanese (ja-Jp.json5)
- Portuguese (pt-Br.json5)
- Russian (ru-Ru.json5)
```

**After:**
```
CobbleRanked includes 2 built-in languages:
- English (en-Us.json5) - Default
- Japanese (ja-Jp.json5)

Note: Portuguese (pt-Br) and Russian (ru-Ru) language support
has been discontinued as of version 1.0. Only English and
Japanese are officially maintained.
```

**Configuration Example Updated:**
```json5
{
  "language": "en-Us"  // Change to: en-Us or ja-Jp
}
```

---

## Table of Contents Update

**File Updated:** [cobbleranked/SUMMARY.md](cobbleranked/SUMMARY.md)

**Added:**
```markdown
* [Casual Missions](features/casual-missions.md)
```

**Position:** Under Features section, between Inventory Restrictions and Custom Music Pack

---

## Documentation Style

All new documentation follows user-focused guidelines:

**✅ User-Friendly Approach:**
- Written for players, not developers
- Simple explanations without technical jargon
- Practical examples throughout
- Step-by-step instructions
- Clear troubleshooting guides

**✅ Minimal Yet Complete:**
- Essential information only
- No unnecessary technical details
- Focus on "how to use" not "how it works internally"
- Examples for common use cases

**✅ Well-Organized:**
- Clear section headers
- Tables for quick reference
- Collapsible sections for long examples
- Related documentation links

---

## Files Modified

### New Files
1. `cobbleranked/features/casual-missions.md` (complete mission system guide)

### Updated Files
1. `cobbleranked/configuration/languages.md` (language support changes)
2. `cobbleranked/SUMMARY.md` (table of contents)

---

## Content Highlights

### Casual Missions Documentation

**Sections Included:**
1. Overview - What the system does
2. Mission Types - All 8 types with examples
3. Default Missions - Pre-configured daily/weekly/milestone missions
4. How to Use - Player and admin instructions
5. Pending Rewards System - Offline player rewards
6. GUI Customization - Visual configuration
7. Database Tables - Data storage reference
8. Commands - Available commands
9. Configuration Examples - Custom mission creation
10. Troubleshooting - Common issues and solutions
11. Performance Considerations - Server impact notes

**Key Features:**
- Complete default mission list with rewards
- All 8 mission types explained
- Evolution stages: FIRST, MIDDLE, FINAL, SINGLE
- Generations 1-9 support (Kanto to Paldea)
- All 18 Pokemon types
- Reset settings configuration
- Pending rewards database persistence

**Examples Provided:**
- Custom daily mission (Dragon-type usage)
- Custom milestone (200 wins)
- Multiple type mission (Fire + Water combo)
- Configuration snippets for all mission types

---

## Technical Accuracy

All documentation verified against source code:

**Source Files Referenced:**
- `CasualMissionManager.kt` - Mission logic
- `casual_missions.json5` - Default configuration
- `casual_missions_gui.json5` - GUI configuration
- `ConfigModels.kt` - Configuration models
- `RankedDatabase.kt` - Database interface

**Accuracy Checks:**
- ✅ All mission types match code enum
- ✅ Default missions match configuration file
- ✅ Database tables match schema
- ✅ Reset settings match implementation
- ✅ Placeholder support verified

---

## User Impact

### For Players

**New Benefits:**
- Clear understanding of mission system
- Know what missions are available
- Learn how to claim rewards
- Understand progress tracking

**Improved Experience:**
- Easy-to-find mission information
- Visual examples of mission types
- Troubleshooting help readily available

### For Server Admins

**New Capabilities:**
- Configure custom missions easily
- Understand reset system
- Customize rewards
- Troubleshoot issues independently

**Configuration Guidance:**
- Complete mission type reference
- Reset schedule configuration
- Database management info
- Performance considerations

---

## Language Support Clarity

### For International Users

**Clear Communication:**
- Explicit list of supported languages
- Deprecation notice for removed languages
- Migration path for affected users

**Maintained Languages:**
- English - Full support
- Japanese - Full support

**Community Contributions:**
- Users can still create custom language files
- Instructions provided for custom translations
- No official support for other languages

---

## Next Steps

### Recommended Future Updates

1. **Add Screenshots:**
   - Mission GUI example
   - Progress bar visualization
   - Reward claim interface

2. **Video Guides:**
   - Mission system walkthrough
   - Configuration tutorial
   - Custom mission creation

3. **Extended Examples:**
   - More custom mission templates
   - Common server configurations
   - Seasonal mission ideas

---

## Verification Checklist

### Documentation Accuracy
- ✅ All mission types documented match codebase
- ✅ Default missions match configuration file
- ✅ Database schema documented correctly
- ✅ Language support changes accurate

### Completeness
- ✅ All 8 mission types explained
- ✅ Daily, weekly, milestone systems covered
- ✅ Pending rewards system documented
- ✅ Configuration examples provided
- ✅ Troubleshooting section included

### User-Friendliness
- ✅ Written for end users, not developers
- ✅ Examples provided for all concepts
- ✅ Step-by-step instructions clear
- ✅ Minimal technical jargon
- ✅ Practical use cases emphasized

### Internal Consistency
- ✅ Links between documents valid
- ✅ Table of contents updated
- ✅ Language deprecation noted everywhere
- ✅ No conflicting information

---

## Summary

**Total Changes:**
- 1 new documentation file (Casual Missions)
- 2 updated files (Languages, SUMMARY)
- ~400 lines of new user-focused documentation
- Language support clarification (4 → 2 supported languages)

**Quality:**
- User-friendly writing style
- Verified against source code
- Complete coverage of new features
- Practical examples throughout

**Completeness:**
- All mission types documented
- Full configuration reference
- Troubleshooting guide included
- Database schema documented

---

**Documentation Status:** ✅ Complete and ready for users

**Target Audience:** Server administrators and players

**Maintenance:** Language files (en-Us, ja-Jp) will be updated with mission-related keys
