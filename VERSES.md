# Verse of the Day — Reference List

This is the human-readable index of every verse in the "Verse of the Day"
strip (the strip that appears under the header on every page). The actual
bilingual text lives in [`src/data/verses.ts`](src/data/verses.ts) — this
file is a quick-scan reference so you can see the full list at a glance
without opening the code.

## Translation

- **English: ERV** — extracted verbatim from the site's hosted `public/bibles/erv.pdf`.
- **Spanish: Reina Valera** — extracted verbatim from the site's hosted `public/bibles/spanish-reina.pdf`.

The feature now matches the Bible resources the church already links in the
footer. Text was extracted from those local PDFs and cleaned only for PDF
layout artifacts such as line-wrap whitespace; it was not paraphrased or
reconstructed from memory.

## Current status

**231 of a ~400 target.** Below 400 (really, below 365), the rotation cycles
through the full list roughly every `231` days rather than guaranteeing zero
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
2. Extract the ERV (English) / Reina Valera (Spanish) text from the hosted PDFs
   **verbatim** — no paraphrasing, no modernizing the wording.
3. Append one object to the `VERSES` array in `src/data/verses.ts`:
   `{ ref, refES, textEN, textES }`.
4. Add a line to the table below so this file stays in sync.
5. That's it — rotation picks up the new length automatically.

## The full list (231)

The table below is generated from `src/data/verses.ts`; the verse strings are
verbatim text extracted from `public/bibles/erv.pdf` and
`public/bibles/spanish-reina.pdf`.

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
| 119 | Genesis 1:27 | PDF-sourced addition |
| 120 | Genesis 2:18 | PDF-sourced addition |
| 121 | Genesis 12:2 | PDF-sourced addition |
| 122 | Genesis 50:20 | PDF-sourced addition |
| 123 | Exodus 14:14 | PDF-sourced addition |
| 124 | Exodus 15:2 | PDF-sourced addition |
| 125 | Judges 6:12 | PDF-sourced addition |
| 126 | 1 Samuel 16:7 | PDF-sourced addition |
| 127 | 2 Chronicles 7:14 | PDF-sourced addition |
| 128 | 2 Chronicles 16:9 | PDF-sourced addition |
| 129 | Ezra 8:22 | PDF-sourced addition |
| 130 | Nehemiah 9:17 | PDF-sourced addition |
| 131 | Job 19:25 | PDF-sourced addition |
| 132 | Psalm 1:1 | PDF-sourced addition |
| 133 | Psalm 19:14 | PDF-sourced addition |
| 134 | Psalm 34:8 | PDF-sourced addition |
| 135 | Psalm 37:5 | PDF-sourced addition |
| 136 | Psalm 37:7 | PDF-sourced addition |
| 137 | Psalm 37:23-24 | PDF-sourced addition |
| 138 | Psalm 39:7 | PDF-sourced addition |
| 139 | Psalm 51:10 | PDF-sourced addition |
| 140 | Psalm 84:11 | PDF-sourced addition |
| 141 | Psalm 90:12 | PDF-sourced addition |
| 142 | Psalm 91:4 | PDF-sourced addition |
| 143 | Psalm 103:1-5 | PDF-sourced addition |
| 144 | Psalm 121:1-2 | PDF-sourced addition |
| 145 | Psalm 139:14 | PDF-sourced addition |
| 146 | Psalm 145:18 | PDF-sourced addition |
| 147 | Psalm 147:3 | PDF-sourced addition |
| 148 | Proverbs 9:10 | PDF-sourced addition |
| 149 | Proverbs 27:17 | PDF-sourced addition |
| 150 | Proverbs 31:25 | PDF-sourced addition |
| 151 | Ecclesiastes 3:1 | PDF-sourced addition |
| 152 | Ecclesiastes 4:9-10 | PDF-sourced addition |
| 153 | Ecclesiastes 12:13 | PDF-sourced addition |
| 154 | Isaiah 43:4 | PDF-sourced addition |
| 155 | Isaiah 53:5 | PDF-sourced addition |
| 156 | Isaiah 54:17 | PDF-sourced addition |
| 157 | Isaiah 55:8-9 | PDF-sourced addition |
| 158 | Isaiah 58:11 | PDF-sourced addition |
| 159 | Isaiah 61:1 | PDF-sourced addition |
| 160 | Isaiah 64:8 | PDF-sourced addition |
| 161 | Jeremiah 1:5 | PDF-sourced addition |
| 162 | Jeremiah 17:7-8 | PDF-sourced addition |
| 163 | Ezekiel 36:26 | PDF-sourced addition |
| 164 | Daniel 3:17-18 | PDF-sourced addition |
| 165 | Daniel 6:23 | PDF-sourced addition |
| 166 | Habakkuk 2:4 | PDF-sourced addition |
| 167 | Habakkuk 3:17-18 | PDF-sourced addition |
| 168 | Malachi 3:10 | PDF-sourced addition |
| 169 | Matthew 5:14-16 | PDF-sourced addition |
| 170 | Matthew 18:20 | PDF-sourced addition |
| 171 | Matthew 22:37-39 | PDF-sourced addition |
| 172 | Matthew 28:19 | PDF-sourced addition |
| 173 | Mark 10:27 | PDF-sourced addition |
| 174 | Mark 11:24 | PDF-sourced addition |
| 175 | Mark 12:30 | PDF-sourced addition |
| 176 | Luke 1:37 | PDF-sourced addition |
| 177 | Luke 6:31 | PDF-sourced addition |
| 178 | Luke 9:23 | PDF-sourced addition |
| 179 | Luke 10:27 | PDF-sourced addition |
| 180 | Luke 12:32 | PDF-sourced addition |
| 181 | Luke 16:10 | PDF-sourced addition |
| 182 | Luke 18:27 | PDF-sourced addition |
| 183 | John 8:12 | PDF-sourced addition |
| 184 | John 10:10 | PDF-sourced addition |
| 185 | John 11:25-26 | PDF-sourced addition |
| 186 | John 13:34-35 | PDF-sourced addition |
| 187 | John 14:6 | PDF-sourced addition |
| 188 | John 15:5 | PDF-sourced addition |
| 189 | Acts 1:8 | PDF-sourced addition |
| 190 | Acts 2:38 | PDF-sourced addition |
| 191 | Acts 4:12 | PDF-sourced addition |
| 192 | Acts 16:31 | PDF-sourced addition |
| 193 | Acts 20:35 | PDF-sourced addition |
| 194 | Romans 1:16 | PDF-sourced addition |
| 195 | Romans 3:23-24 | PDF-sourced addition |
| 196 | Romans 6:23 | PDF-sourced addition |
| 197 | Romans 8:31 | PDF-sourced addition |
| 198 | Romans 12:1-2 | PDF-sourced addition |
| 199 | Romans 12:12 | PDF-sourced addition |
| 200 | Romans 12:21 | PDF-sourced addition |
| 201 | 1 Corinthians 10:13 | PDF-sourced addition |
| 202 | 1 Corinthians 13:4-7 | PDF-sourced addition |
| 203 | 1 Corinthians 15:58 | PDF-sourced addition |
| 204 | 2 Corinthians 4:16-18 | PDF-sourced addition |
| 205 | 2 Corinthians 9:8 | PDF-sourced addition |
| 206 | Galatians 5:22-23 | PDF-sourced addition |
| 207 | Ephesians 3:20-21 | PDF-sourced addition |
| 208 | Ephesians 4:32 | PDF-sourced addition |
| 209 | Ephesians 5:2 | PDF-sourced addition |
| 210 | Ephesians 6:11-12 | PDF-sourced addition |
| 211 | Philippians 1:6 | PDF-sourced addition |
| 212 | Philippians 4:8 | PDF-sourced addition |
| 213 | Colossians 3:2 | PDF-sourced addition |
| 214 | Colossians 3:17 | PDF-sourced addition |
| 215 | 1 Thessalonians 5:11 | PDF-sourced addition |
| 216 | 1 Thessalonians 5:21-22 | PDF-sourced addition |
| 217 | 2 Timothy 3:16-17 | PDF-sourced addition |
| 218 | 2 Timothy 4:7 | PDF-sourced addition |
| 219 | Hebrews 10:23 | PDF-sourced addition |
| 220 | Hebrews 12:1-2 | PDF-sourced addition |
| 221 | Hebrews 13:8 | PDF-sourced addition |
| 222 | James 2:17 | PDF-sourced addition |
| 223 | James 4:7-8 | PDF-sourced addition |
| 224 | 1 Peter 5:7 | PDF-sourced addition |
| 225 | 1 John 3:1 | PDF-sourced addition |
| 226 | 1 John 4:7-8 | PDF-sourced addition |
| 227 | 1 John 5:14 | PDF-sourced addition |
| 228 | Jude 1:24-25 | PDF-sourced addition |
| 229 | Revelation 3:20 | PDF-sourced addition |
| 230 | Revelation 21:5 | PDF-sourced addition |
| 231 | Revelation 22:12 | PDF-sourced addition |
