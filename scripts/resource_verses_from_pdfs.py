"""Replace verse strings in src/data/verses.ts with PDF-extracted text."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


def normalize_text(value: str) -> str:
    value = value.replace("\u202f", " ").replace("\u00a0", " ")
    value = re.sub(r"\s+", " ", value).strip()
    value = re.sub(r"\s+([,.;:!?])", r"\1", value)
    return value


def reference_parts(reference: str) -> tuple[str, list[int]]:
    book, chapter_verse = reference.rsplit(" ", 1)
    chapter, verses = chapter_verse.split(":")
    numbers = [int(part) for part in verses.split("-")]
    return book, [int(chapter), *numbers]


def lookup(candidates: dict[str, str], reference: str, spanish: bool = False) -> str | None:
    book, parts = reference_parts(reference)
    chapter, first, *rest = parts
    if spanish and book == "Salmo":
        book = "Salmos"
    if spanish and book == "Salmos":
        book = "Salmos"
    if spanish and book == "Cantares":
        book = "Cantares"
    if not rest:
        return candidates.get(f"{book} {chapter}:{first}")
    last = rest[0]
    values = [candidates.get(f"{book} {chapter}:{verse}") for verse in range(first, last + 1)]
    if any(value is None for value in values):
        return None
    return normalize_text(" ".join(value for value in values if value is not None))


def main() -> None:
    if len(sys.argv) != 4:
        raise SystemExit("usage: ressource_verses_from_pdfs.py verses.ts candidates.json report.json")
    source_path, candidate_path, report_path = map(Path, sys.argv[1:])
    source = source_path.read_text(encoding="utf-8")
    candidates = json.loads(candidate_path.read_text(encoding="utf-8"))
    review: list[dict[str, str]] = []
    updated = 0

    object_pattern = re.compile(r"(?ms)(  \{ ref: \"(?P<ref>[^\"]+)\", refES: \"(?P<ref_es>[^\"]+)\",\n    textEN: )\"(?P<en>(?:\\.|[^\"])*)\",\n    textES: \"(?P<es>(?:\\.|[^\"])*)\" \},")

    def replace(match: re.Match[str]) -> str:
        nonlocal updated
        ref = match.group("ref")
        ref_es = match.group("ref_es")
        english = lookup(candidates["en"], ref)
        spanish = lookup(candidates["es"], ref_es, spanish=True)
        if english is None or spanish is None:
            review.append({"ref": ref, "refES": ref_es, "missing": "English" if english is None else "Spanish"})
            return match.group(0)
        updated += 1
        prefix = match.group(1)
        return f'{prefix}"{normalize_text(english)}",\n    textES: "{normalize_text(spanish)}" }},'

    source = object_pattern.sub(replace, source)
    source_path.write_text(source, encoding="utf-8")
    report_path.write_text(json.dumps({"updated": updated, "review": review}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"updated {updated} entries; flagged {len(review)} for review")


if __name__ == "__main__":
    main()
