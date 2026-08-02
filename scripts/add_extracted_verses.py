"""Append a curated batch of PDF-sourced standalone verses to verses.ts."""

from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ADDITIONAL_REFS = """
Genesis 1:27
Genesis 2:18
Genesis 12:2
Genesis 50:20
Exodus 14:14
Exodus 15:2
Deuteronomy 31:6
Deuteronomy 31:8
Joshua 24:15
Judges 6:12
1 Samuel 16:7
2 Chronicles 7:14
2 Chronicles 16:9
Ezra 8:22
Nehemiah 9:17
Job 19:25
Psalm 1:1
Psalm 19:14
Psalm 23:1
Psalm 27:1
Psalm 34:8
Psalm 37:4
Psalm 37:5
Psalm 37:7
Psalm 37:23-24
Psalm 39:7
Psalm 51:10
Psalm 55:22
Psalm 84:11
Psalm 90:12
Psalm 91:1-2
Psalm 91:4
Psalm 103:1-5
Psalm 119:105
Psalm 121:1-2
Psalm 127:3
Psalm 139:14
Psalm 145:18
Psalm 147:3
Psalm 150:6
Proverbs 4:23
Proverbs 9:10
Proverbs 18:10
Proverbs 22:6
Proverbs 27:17
Proverbs 31:25
Ecclesiastes 3:1
Ecclesiastes 4:9-10
Ecclesiastes 12:13
Isaiah 26:3
Isaiah 43:2
Isaiah 43:4
Isaiah 53:5
Isaiah 54:17
Isaiah 55:8-9
Isaiah 58:11
Isaiah 61:1
Isaiah 64:8
Jeremiah 1:5
Jeremiah 17:7-8
Jeremiah 33:3
Ezekiel 36:26
Daniel 3:17-18
Daniel 6:23
Micah 6:8
Nahum 1:7
Habakkuk 2:4
Habakkuk 3:17-18
Zephaniah 3:17
Malachi 3:10
Matthew 5:14-16
Matthew 6:33
Matthew 7:7
Matthew 11:28
Matthew 18:20
Matthew 22:37-39
Matthew 28:19
Mark 10:27
Mark 11:24
Mark 12:30
Luke 1:37
Luke 6:31
Luke 9:23
Luke 10:27
Luke 12:32
Luke 16:10
Luke 18:27
John 3:16
John 8:12
John 10:10
John 11:25-26
John 13:34-35
John 14:6
John 14:27
John 15:5
John 16:33
Acts 1:8
Acts 2:38
Acts 4:12
Acts 16:31
Acts 20:35
Romans 1:16
Romans 3:23-24
Romans 6:23
Romans 8:31
Romans 12:1-2
Romans 12:12
Romans 12:21
1 Corinthians 10:13
1 Corinthians 13:4-7
1 Corinthians 15:58
2 Corinthians 4:16-18
2 Corinthians 5:17
2 Corinthians 9:8
Galatians 2:20
Galatians 5:22-23
Galatians 6:9
Ephesians 3:20-21
Ephesians 4:32
Ephesians 5:2
Ephesians 6:11-12
Philippians 1:6
Philippians 4:8
Philippians 4:19
Colossians 3:2
Colossians 3:17
1 Thessalonians 5:11
1 Thessalonians 5:21-22
2 Timothy 1:7
2 Timothy 3:16-17
2 Timothy 4:7
Hebrews 4:12
Hebrews 10:23
Hebrews 12:1-2
Hebrews 13:8
James 1:5
James 1:17
James 2:17
James 4:7-8
James 5:16
1 Peter 5:7
1 John 1:9
1 John 3:1
1 John 4:7-8
1 John 4:18
1 John 5:14
Jude 1:24-25
Revelation 3:20
Revelation 21:5
Revelation 22:12
""".splitlines()
ADDITIONAL_REFS = [reference.strip() for reference in ADDITIONAL_REFS if reference.strip()]

SPANISH_BOOKS = {
    "Genesis": "Génesis", "Exodus": "Éxodo", "Deuteronomy": "Deuteronomio", "Joshua": "Josué",
    "Judges": "Jueces", "1 Samuel": "1 Samuel", "2 Chronicles": "2 Crónicas", "Ezra": "Esdras",
    "Nehemiah": "Nehemías", "Job": "Job", "Psalm": "Salmo", "Proverbs": "Proverbios",
    "Ecclesiastes": "Eclesiastés", "Isaiah": "Isaías", "Jeremiah": "Jeremías", "Ezekiel": "Ezequiel",
    "Daniel": "Daniel", "Micah": "Miqueas", "Nahum": "Nahúm", "Habakkuk": "Habacuc",
    "Zephaniah": "Sofonías", "Malachi": "Malaquías", "Matthew": "Mateo", "Mark": "Marcos",
    "Luke": "Lucas", "John": "Juan", "Acts": "Hechos", "Romans": "Romanos",
    "1 Corinthians": "1 Corintios", "2 Corinthians": "2 Corintios", "Galatians": "Gálatas",
    "Ephesians": "Efesios", "Philippians": "Filipenses", "Colossians": "Colosenses",
    "1 Thessalonians": "1 Tesalonicenses", "2 Timothy": "2 Timoteo", "Hebrews": "Hebreos",
    "James": "Santiago", "1 Peter": "1 Pedro", "1 John": "1 Juan", "Jude": "Judas",
    "Revelation": "Apocalipsis",
}


def lookup(candidates: dict[str, str], reference: str) -> str | None:
    book, chapter_verse = reference.rsplit(" ", 1)
    chapter, verses = chapter_verse.split(":")
    numbers = [int(part) for part in verses.split("-")]
    values = [candidates.get(f"{book} {chapter}:{verse}") for verse in range(numbers[0], numbers[-1] + 1)]
    return " ".join(value for value in values if value) if all(values) else None


def clean_text(value: str) -> str:
    replacements = {
        "bond age": "bondage", "f ormed": "formed", "l ight": "light", "t hings": "things",
        "thathe": "that he",
        " t he ": " the ", "so n": "son", "rive rs": "rivers", "b read": "bread",
        " lo ok ": " look ", "a t the": "at the", " i t was": " it was", " a nd ": " and ",
    }
    for old, new in replacements.items():
        value = value.replace(old, new)
    value = re.sub(r"^(?:BOOK I|NUN\.)\s+", "", value)
    value = re.sub(r"^A Psalm of David;?\s+", "", value)
    value = re.sub(r"^A Song, a Psalm Of David\.\s+", "", value)
    value = value.replace(" Parting the Red Sea", "")
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    return re.sub(r"\s+", " ", value).strip()


def main() -> None:
    if len(sys.argv) not in (3, 4):
        raise SystemExit("usage: add_extracted_verses.py verses.ts candidates.json [--from-main]")
    source_path, candidate_path = map(Path, sys.argv[1:3])
    source = (subprocess.check_output(["git", "show", "main:src/data/verses.ts"]).decode("utf-8")
              if len(sys.argv) == 4 and sys.argv[3] == "--from-main"
              else source_path.read_text(encoding="utf-8"))
    candidates = json.loads(candidate_path.read_text(encoding="utf-8"))
    existing = set(re.findall(r'ref: "([^"]+)"', source))
    entries: list[str] = []
    missing: list[str] = []
    for reference in ADDITIONAL_REFS:
        if reference in existing:
            continue
        book, chapter_verse = reference.rsplit(" ", 1)
        ref_es = f"{SPANISH_BOOKS[book]} {chapter_verse}"
        english = lookup(candidates["en"], reference)
        spanish = lookup(candidates["es"], ref_es.replace("Salmo ", "Salmos "))
        if not english or not spanish:
            missing.append(reference)
            continue
        entries.append(
            f'  {{ ref: {json.dumps(reference, ensure_ascii=False)}, refES: {json.dumps(ref_es, ensure_ascii=False)},\n'
            f'    textEN: {json.dumps(clean_text(english), ensure_ascii=False)},\n'
            f'    textES: {json.dumps(clean_text(spanish), ensure_ascii=False)} }},'
        )
    if entries:
        source = source.replace("\n];\n\n/**", "\n\n  // PDF-sourced additions\n" + "\n".join(entries) + "\n];\n\n/**", 1)
        source_path.write_text(source, encoding="utf-8")
    print(f"added {len(entries)} entries; missing {len(missing)}")
    if missing:
        print("\n".join(missing))


if __name__ == "__main__":
    main()
