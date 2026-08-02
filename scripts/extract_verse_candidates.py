"""Map references in the site's verse list to text extracted from both PDFs."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

BOOKS = [
    ("Genesis", "Génesis", 50), ("Exodus", "Éxodo", 40), ("Leviticus", "Levítico", 27),
    ("Numbers", "Números", 36), ("Deuteronomy", "Deuteronomio", 34), ("Joshua", "Josué", 24),
    ("Judges", "Jueces", 21), ("Ruth", "Rut", 4), ("1 Samuel", "1 Samuel", 31),
    ("2 Samuel", "2 Samuel", 24), ("1 Kings", "1 Reyes", 22), ("2 Kings", "2 Reyes", 25),
    ("1 Chronicles", "1 Crónicas", 29), ("2 Chronicles", "2 Crónicas", 36),
    ("Ezra", "Esdras", 10), ("Nehemiah", "Nehemías", 13), ("Esther", "Ester", 10),
    ("Job", "Job", 42), ("Psalm", "Salmos", 150), ("Proverbs", "Proverbios", 31),
    ("Ecclesiastes", "Eclesiastés", 12), ("Song of Solomon", "Cantares", 8),
    ("Isaiah", "Isaías", 66), ("Jeremiah", "Jeremías", 52), ("Lamentations", "Lamentaciones", 5),
    ("Ezekiel", "Ezequiel", 48), ("Daniel", "Daniel", 12), ("Hosea", "Oseas", 14),
    ("Joel", "Joel", 3), ("Amos", "Amós", 9), ("Obadiah", "Abdías", 1),
    ("Jonah", "Jonás", 4), ("Micah", "Miqueas", 7), ("Nahum", "Nahúm", 3),
    ("Habakkuk", "Habacuc", 3), ("Zephaniah", "Sofonías", 3), ("Haggai", "Hageo", 2),
    ("Zechariah", "Zacarías", 14), ("Malachi", "Malaquías", 4), ("Matthew", "Mateo", 28),
    ("Mark", "Marcos", 16), ("Luke", "Lucas", 24), ("John", "Juan", 21),
    ("Acts", "Hechos", 28), ("Romans", "Romanos", 16), ("1 Corinthians", "1 Corintios", 16),
    ("2 Corinthians", "2 Corintios", 13), ("Galatians", "Gálatas", 6), ("Ephesians", "Efesios", 6),
    ("Philippians", "Filipenses", 4), ("Colossians", "Colosenses", 4),
    ("1 Thessalonians", "1 Tesalonicenses", 5), ("2 Thessalonians", "2 Tesalonicenses", 3),
    ("1 Timothy", "1 Timoteo", 6), ("2 Timothy", "2 Timoteo", 4), ("Titus", "Tito", 3),
    ("Philemon", "Filemón", 1), ("Hebrews", "Hebreos", 13), ("James", "Santiago", 5),
    ("1 Peter", "1 Pedro", 5), ("2 Peter", "2 Pedro", 3), ("1 John", "1 Juan", 5),
    ("2 John", "2 Juan", 1), ("3 John", "3 Juan", 1), ("Jude", "Judas", 1),
    ("Revelation", "Apocalipsis", 22),
]


def clean(value: str) -> str:
    value = re.sub(r"===== PAGE \d+ =====", " ", value)
    value = re.sub(r"Anonymous.*?(?:\n|$)", " ", value)
    value = value.replace("\u202f", " ").replace("\u00a0", " ")
    value = re.sub(r"\s+", " ", value)
    return value.strip(" ​")


def parse_english(text: str) -> dict[str, str]:
    result: dict[str, str] = {}
    book_names = sorted((book for book, _, _ in BOOKS), key=len, reverse=True)
    heading_pattern = re.compile(rf"(?m)^({'|'.join(map(re.escape, book_names))}) (\d+)\s*$")
    headings = list(heading_pattern.finditer(text))
    for index, match in enumerate(headings):
        book = match.group(1)
        chapter = int(match.group(2))
        end = headings[index + 1].start() if index + 1 < len(headings) else len(text)
        chapter_text = text[match.end():end]
        verse_matches = list(re.finditer(r"(?<!\d)(\d{1,3})\s*(?=[\u202f \n]*[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿])", chapter_text))
        for verse_index, verse_match in enumerate(verse_matches):
            verse = int(verse_match.group(1))
            verse_end = verse_matches[verse_index + 1].start() if verse_index + 1 < len(verse_matches) else len(chapter_text)
            value = clean(chapter_text[verse_match.end():verse_end])
            if verse <= 200 and value:
                result[f"{book} {chapter}:{verse}"] = value
    return result


def parse_spanish(text: str) -> dict[str, str]:
    result: dict[str, str] = {}
    chapter_matches = list(re.finditer(r"(?m)^Chapter (\d+)\s*$", text))
    chapter_index = 0
    for book, book_es, chapter_count in BOOKS:
        for chapter in range(1, chapter_count + 1):
            if chapter_index >= len(chapter_matches):
                return result
            match = chapter_matches[chapter_index]
            chapter_index += 1
            end = chapter_matches[chapter_index].start() if chapter_index < len(chapter_matches) else len(text)
            chapter_text = text[match.end():end]
            verses = list(re.finditer(r"(?<!\d)(\d{1,3})(?=[A-ZÁÉÍÓÚÜÑ¿])", chapter_text))
            for index, verse_match in enumerate(verses):
                verse = int(verse_match.group(1))
                next_start = verses[index + 1].start() if index + 1 < len(verses) else len(chapter_text)
                value = clean(chapter_text[verse_match.end():next_start])
                if verse <= 200 and value:
                    result[f"{book_es} {chapter}:{verse}"] = value
    return result


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: extract_verse_candidates.py EN.txt ES.txt OUTPUT.json")
    en = parse_english(Path(sys.argv[1]).read_text(encoding="utf-8"))
    es = parse_spanish(Path(sys.argv[2]).read_text(encoding="utf-8"))
    refs = sorted(set(en) | set(es))
    Path(sys.argv[3]).write_text(json.dumps({"en": en, "es": es}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"parsed {len(en)} English and {len(es)} Spanish verse candidates")


if __name__ == "__main__":
    main()
