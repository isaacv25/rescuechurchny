# Verse of the Day — Reference List

This is the human-readable index of every verse in the "Verse of the Day"
strip (the strip that appears under the header on every page). The actual
bilingual text lives in [`src/data/verses.ts`](src/data/verses.ts) — this
file is a quick-scan reference so you can see the full list at a glance
without opening the code.

## Translation

- **English: King James Version (KJV)** — public domain.
- **Spanish: Reina-Valera 1909 (RV1909)** — public domain.

**Why not the site's other Bible translations (ERV / Reina Valera 1960)?**
Those are the translations in the downloadable PDFs linked from the footer
("Read the Bible"), and they're copyrighted (ERV by World Bible Translation
Center; RV1960 by the United Bible Societies). Linking to a PDF someone
chooses to download is different from reproducing scripture text as UI
chrome shown to every visitor on every page — the safer, zero-licensing-risk
choice for that is a public-domain translation. KJV/RV1909 read close in
spirit and are the two classic translations most Christians recognize by
wording, even if not the exact modern phrasing of the PDFs.

**If you'd rather match the PDFs exactly:** it's possible, but requires
sourcing verified ERV/RVR1960 text (with permission/license) rather than
generating it from memory — flagged as a follow-up, not done here to avoid
misquoting scripture under a translation's name.

## Current status

**118 of a ~400 target.** Below 400 (really, below 365), the rotation cycles
through the full list roughly every `118` days rather than guaranteeing zero
repeats across a full calendar year — expected while the list is still
growing. See "How to add a verse" below; it's just appending to an array, no
code changes needed.

## Rotation logic

`getVerseOfDay()` in `src/data/verses.ts` picks a verse deterministically:
`(dayOfYear + year) % VERSES.length`. Same verse all day, changes at
midnight (local render time), no two people see a different verse on the
same day, and the year offset means the same calendar date doesn't always
land on the same verse across different years.

## How to add a verse

1. Pick a verse that reads as a **complete, standalone thought** — this
   matters more than length. Verses that only make sense mid-passage don't
   belong here even if they're short.
2. Quote the KJV (English) / RV1909 (Spanish) text **verbatim** — no
   paraphrasing, no modernizing the wording.
3. Append one object to the `VERSES` array in `src/data/verses.ts`:
   `{ ref, refES, textEN, textES }`.
4. Add a line to the table below so this file stays in sync.
5. That's it — rotation picks up the new length automatically.

## The full list (118)

| # | Reference | Theme |
|---|-----------|-------|
| 1 | Proverbs 3:5-6 | Faith & Trust |
| 2 | Hebrews 11:1 | Faith & Trust |
| 3 | Isaiah 41:10 | Faith & Trust |
| 4 | **Romans 8:28** | Faith & Trust |
| 5 | **Psalm 46:10** | Faith & Trust |
| 6 | Joshua 1:9 | Faith & Trust |
| 7 | Psalm 56:3 | Faith & Trust |
| 8 | Proverbs 16:3 | Faith & Trust |
| 9 | Jeremiah 29:11 | Hope |
| 10 | Romans 15:13 | Hope |
| 11 | Lamentations 3:22-23 | Hope |
| 12 | Psalm 42:11 | Hope |
| 13 | Romans 5:5 | Hope |
| 14 | Philippians 4:13 | Strength |
| 15 | Isaiah 40:31 | Strength |
| 16 | 2 Corinthians 12:9 | Strength |
| 17 | Psalm 28:7 | Strength |
| 18 | Nehemiah 8:10 | Strength |
| 19 | Ephesians 6:10 | Strength |
| 20 | Philippians 4:6-7 | Peace & Comfort |
| 21 | John 14:27 | Peace & Comfort |
| 22 | Psalm 34:18 | Peace & Comfort |
| 23 | Matthew 11:28 | Peace & Comfort |
| 24 | Psalm 23:1 | Peace & Comfort |
| 25 | Isaiah 26:3 | Peace & Comfort |
| 26 | 2 Thessalonians 3:16 | Peace & Comfort |
| 27 | Psalm 55:22 | Peace & Comfort |
| 28 | John 3:16 | Love |
| 29 | 1 John 4:19 | Love |
| 30 | Romans 8:38-39 | Love |
| 31 | 1 Corinthians 13:4 | Love |
| 32 | 1 John 4:18 | Love |
| 33 | Zephaniah 3:17 | Love |
| 34 | James 1:5 | Wisdom & Guidance |
| 35 | Psalm 119:105 | Wisdom & Guidance |
| 36 | Proverbs 22:6 | Wisdom & Guidance |
| 37 | Micah 6:8 | Wisdom & Guidance |
| 38 | Proverbs 4:23 | Wisdom & Guidance |
| 39 | Philippians 4:19 | Provision |
| 40 | Matthew 6:33 | Provision |
| 41 | Psalm 37:4 | Provision |
| 42 | Psalm 34:10 | Provision |
| 43 | Ephesians 2:8-9 | Salvation & Grace |
| 44 | Romans 10:9 | Salvation & Grace |
| 45 | 2 Corinthians 5:17 | Salvation & Grace |
| 46 | Titus 3:5 | Salvation & Grace |
| 47 | John 1:12 | Salvation & Grace |
| 48 | Psalm 16:11 | Joy |
| 49 | Psalm 30:5 | Joy |
| 50 | James 1:2-3 | Joy |
| 51 | Psalm 118:24 | Joy |
| 52 | 1 Thessalonians 5:16-18 | Prayer |
| 53 | Matthew 7:7 | Prayer |
| 54 | James 5:16 | Prayer |
| 55 | Jeremiah 33:3 | Prayer |
| 56 | Psalm 100:4-5 | Gratitude |
| 57 | 1 Chronicles 16:34 | Gratitude |
| 58 | Colossians 3:15 | Gratitude |
| 59 | Joshua 24:15 | Family |
| 60 | Psalm 127:3 | Family |
| 61 | Ephesians 6:1 | Family |
| 62 | Deuteronomy 6:6-7 | Family |
| 63 | James 1:12 | Perseverance & Trials |
| 64 | Romans 5:3-4 | Perseverance & Trials |
| 65 | 2 Corinthians 4:17 | Perseverance & Trials |
| 66 | Galatians 6:9 | Perseverance & Trials |
| 67 | James 1:4 | Perseverance & Trials |
| 68 | Psalm 91:1-2 | Protection |
| 69 | Psalm 121:7-8 | Protection |
| 70 | Proverbs 18:10 | Protection |
| 71 | 2 Thessalonians 3:3 | Protection |
| 72 | 1 John 1:9 | Forgiveness |
| 73 | Colossians 3:13 | Forgiveness |
| 74 | Psalm 103:12 | Forgiveness |
| 75 | Micah 7:19 | Forgiveness |
| 76 | Deuteronomy 31:6 | Courage |
| 77 | 1 Corinthians 16:13 | Courage |
| 78 | Psalm 27:1 | Courage |
| 79 | 2 Timothy 1:7 | Courage |
| 80 | Numbers 23:19 | God's Character |
| 81 | Malachi 3:6 | God's Character |
| 82 | James 1:17 | God's Character |
| 83 | Psalm 145:9 | God's Character |
| 84 | Exodus 34:6 | God's Character |
| 85 | Psalm 150:6 | Worship & Praise |
| 86 | Psalm 34:1 | Worship & Praise |
| 87 | Psalm 95:6 | Worship & Praise |
| 88 | Psalm 108:1 | Worship & Praise |
| 89 | Galatians 2:20 | Identity in Christ |
| 90 | Ephesians 2:10 | Identity in Christ |
| 91 | 1 Peter 2:9 | Identity in Christ |
| 92 | 2 Corinthians 3:17 | Identity in Christ |
| 93 | 2 Timothy 3:16 | The Word |
| 94 | Hebrews 4:12 | The Word |
| 95 | Matthew 4:4 | The Word |
| 96 | Philippians 2:3-4 | Humility & Service |
| 97 | James 4:10 | Humility & Service |
| 98 | Mark 10:45 | Humility & Service |
| 99 | Galatians 5:13 | Humility & Service |
| 100 | 1 Peter 5:6 | Humility & Service |
| 101 | John 14:3 | Second Coming & Eternal Hope |
| 102 | Revelation 21:4 | Second Coming & Eternal Hope |
| 103 | 1 Corinthians 15:57 | Second Coming & Eternal Hope |
| 104 | Titus 2:13 | Second Coming & Eternal Hope |
| 105 | Psalm 46:1 | Rest |
| 106 | Exodus 33:14 | Rest |
| 107 | Hebrews 4:9 | Rest |
| 108 | Philippians 4:11 | Contentment |
| 109 | 1 Timothy 6:6 | Contentment |
| 110 | Habakkuk 3:18 | Contentment |
| 111 | Psalm 34:19 | Trust in Hard Times |
| 112 | Nahum 1:7 | Trust in Hard Times |
| 113 | John 16:33 | Trust in Hard Times |
| 114 | Psalm 73:26 | Trust in Hard Times |
| 115 | Deuteronomy 31:8 | God's Presence |
| 116 | Psalm 139:7 | God's Presence |
| 117 | Matthew 28:20 | God's Presence |
| 118 | Isaiah 43:2 | God's Presence |

## Follow-ups

- Grow the list toward ~400 (append-only, no code changes needed).
- Decide whether to eventually source exact ERV/RVR1960 text (with proper
  licensing) to match the PDFs, or keep KJV/RV1909 as the permanent choice.
- Have a Spanish-fluent reviewer spot-check the RV1909 transcriptions.
