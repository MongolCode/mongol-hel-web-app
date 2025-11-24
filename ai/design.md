
You are an expert in developing Angular V20+ applications.

## Task

Create a Mongolian letter and vocabulary learning app based on the provided data structure. All data are located in the `data` directory.

## Overview

The app should facilitate learning Mongolian script (ᠠ ᠡ ᠢ ᠤ ᠥ ᠦ) with 8 primary lessons covering vowels and consonants, vocabulary items with images and audio pronunciation, and supplementary poem content.

---

## 1. Course Index Data

**Source:** `data/course.json`

This is the entry point containing all available lessons.

### Structure
```json
{
  "mongolian": "ᠠ",                  // Mongolian character in vertical script
  "english": "a",                     // English letter equivalent
  "image_uri": "",                    // Placeholder (currently unused)
  "a_url": "./course_a.html",         // HTML reference to convert to Angular route
  "mongolian_pronounce": ""           // Placeholder (currently unused)
}
```

### Available Courses (8 total)
| # | Mongolian | English | Course File | Notes |
|---|-----------|---------|------------|-------|
| 1 | ᠠ | A | course_a.json | 7 vocabulary items |
| 2 | ᠡ | E | course_e.json | 6 vocabulary items |
| 3 | ᠢ | I | course_i.json | 5 vocabulary items |
| 4 | ᠤ | O | course_o.json | 5 vocabulary items |
| 5 | ᠤ | U | course_u.json | 5 vocabulary items |
| 6 | ᠥ | V | course_v.json | 5 vocabulary items |
| 7 | ᠦ | W | course_w.json | 5 vocabulary items |
| 8 | ᠰᠢᠯᠦᠭ | Poem | course_shulug.json | Special format (see section 3) |

---

## 2. Vocabulary/Lesson Data

**Source:** `data/course_*.json` (e.g., `course_a.json`, `course_e.json`, etc.)

Each course contains an array of vocabulary items learners will master.

### Structure
```json
{
  "mongolian": "ᠠᠯᠮᠤᠷᠠᠳ",                          // Mongolian word in vertical script
  "chinese": "苹果",                                // Chinese translation (optional, may be empty)
  "english": "Apple",                              // English translation
  "image_uri": "https://cdn.pixabay.com/...",    // External image URL (Pixabay, Wikimedia Commons)
  "mongolian_pronounce": "data/audios/a_apple1.mp3"  // Audio file path for pronunciation
}
```

### Field Details
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mongolian` | string | ✓ | Mongolian word in vertical script |
| `english` | string | ✓ | English translation |
| `chinese` | string | ✗ | Chinese translation (optional, may be empty string) |
| `image_uri` | string | ✓ | Image URL for visual reference |
| `mongolian_pronounce` | string | ✓ | Relative path to MP3 pronunciation audio |

### Example: course_a.json Content (7 items)
- ᠠᠯᠮᠤᠷᠠᠳ - Apple (苹果)
- ᠠᠯᠲᠠ - Gold (金)
- ᠠᠮᠠ - Mouth
- ᠠᠯᠴᠢᠭᠤᠷ - Towel
- ᠠᠷᠰᠯᠠᠨ - Lion
- ᠠᠶᠠᠭ᠎ᠠ - Bowl (碗)
- ᠠᠨᠠᠱᠢ - Giraffe

### Similar Courses
- `course_e.json` (6 items)
- `course_i.json` (5 items)
- `course_o.json` (5 items)
- `course_u.json` (5 items)
- `course_v.json` (5 items)
- `course_w.json` (5 items)

---

## 3. Poem Content (Supplementary Material)

**Source:** `data/course_shulug.json`

Poems provide cultural enrichment and reading practice. Each poem has a unique structure with multiple verses.

### Structure
```json
{
  "title": "ᠪᠢ ᠮᠣᠩᠭᠣᠯ ᠬᠥᠮᠦᠨ",                       // Poem title in Mongolian
  "lines": [                                          // Array of poem verses/lines
    "ᠠᠷᠭᠠᠯ ‍ᠤᠨ ᠤᠲᠤᠭ᠎ᠠ ᠪᠤᠷᠭᠢᠯᠤᠭᠰᠠᠨ",
    "ᠮᠠᠯᠴᠢᠨ ‍ᠤ ᠭᠡᠷ ᠲᠦ᠍ ᠲᠥᠷᠥᠭᠰᠡᠨ ᠪᠢ",
    "ᠠᠲᠠᠷ ᠬᠡᠭᠡᠷ᠎ᠡ ᠨᠤᠲᠤᠭ ‍ᠢᠶ᠋ᠠᠨ",
    "ᠥᠯᠥᠭᠡᠢ ᠮᠢᠨᠢ ᠬᠢᠵᠦ ᠪᠤᠳᠤᠳᠠᠭ ᠃"
  ],
  "image_uri": "",                                    // Placeholder (currently unused)
  "mongolian_pronounce": "data/audios/p_bi mongol huun.mp3"  // Audio pronunciation of poem
}
```

### Available Poems (2 total)

| # | Title | Lines | Audio File |
|---|-------|-------|-----------|
| 1 | ᠪᠢ ᠮᠣᠩᠭᠣᠯ ᠬᠥᠮᠦᠨ | 4 | `p_bi mongol huun.mp3` |
| 2 | ᠰᠠᠢᠬᠠᠨ ᠳ᠋ᠠ | 8 | `p_saihn da.mp3` |

### Field Details
| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Poem title in Mongolian |
| `lines` | array | Array of poem verses/lines |
| `image_uri` | string | Placeholder (not used) |
| `mongolian_pronounce` | string | Path to MP3 audio file of poem recitation |

---

## Application Requirements

### Core Features
1. **Course Navigation** - Display all 8 courses with letter navigation
2. **Vocabulary Learning** - Present vocabulary items with:
   - Mongolian script and English/Chinese translations
   - Visual aids (images)
   - Audio pronunciation playback
3. **Poem Recitation** - Display poems with audio playback
4. **Progress Tracking** - Track user progress through lessons (optional but recommended)

### Technical Implementation
- Build using **Angular V20+** with TypeScript
- Load data from JSON files in `data/` directory using Angular services
- Implement routing for each course (e.g., `/course/a`, `/course/e`, etc.)
- Ensure responsive design for mobile and desktop
- Audio playback using HTML5 `<audio>` element or Angular audio library
- Lazy-load images from external URLs

### User Experience
- Clean, intuitive navigation between courses
- Responsive text layout for Mongolian vertical script
- Playable audio for each vocabulary item and poem
- Visual feedback for selected items or completed lessons

---

## 4. Audio Assets

**Location:** `data/audios/`

All audio files are in MP3 format with a consistent naming convention: `<letter_prefix>_<content>.mp3`

### Audio File Inventory (41 total)

**Letter A (7 files):**
- a_apple1.mp3, a_bowl.mp3, a_giraffe.mp3, a_gold.mp3, a_lion.mp3, a_mouth.mp3, a_towel.mp3

**Letter E (6 files):**
- e_butterfly.mp3, e_cloud.mp3, e_donkey.mp3, e_grass.mp3, e_horn.mp3, e_nest.mp3

**Letter I (5 files):**
- i_fly.mp3, i_goat.mp3, i_iron.mp3, i_kangaroo.mp3, i_smile.mp3

**Letter O (5 files):**
- o_boat.mp3, o_night.mp3, o_socks.mp3, o_star.mp3, o_universe.mp3

**Letter U (5 files):**
- u_read.mp3, u_red.mp3, u_sleep.mp3, u_string.mp3, u_water.mp3

**Letter V (5 files):**
- v_egg.mp3, v_feather.mp3, v_hungry.mp3, v_pants.mp3, v_raisin.mp3

**Letter W (5 files):**
- w_cow.mp3, w_fox.mp3, w_hair.mp3, w_root.mp3, w_seeds.mp3

**Poems (2 files):**
- p_bi mongol huun.mp3
- p_saihn da.mp3
