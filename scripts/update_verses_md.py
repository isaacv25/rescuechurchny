"""Regenerate the human-readable verse index from verses.ts."""

from pathlib import Path
import re


def main() -> None:
    data_path = Path("src/data/verses.ts")
    docs_path = Path("VERSES.md")
    source = data_path.read_text(encoding="utf-8")
    docs = docs_path.read_text(encoding="utf-8")
    refs = re.findall(r'ref: "([^"]+)", refES: "([^"]+)"', source)
    old_themes = dict(re.findall(r"\| \d+ \| (?:\*\*)?([^|*]+?)(?:\*\*)? \| ([^|]+) \|", docs))
    rows = ["| # | Reference | Theme |", "|---|-----------|-------|"]
    for index, (reference, _) in enumerate(refs, start=1):
        theme = old_themes.get(reference, "PDF-sourced addition")
        marked = f"**{reference}**" if reference in {"Romans 8:28", "Psalm 46:10"} else reference
        rows.append(f"| {index} | {marked} | {theme} |")
    replacement = f"""## The full list ({len(refs)})

The table below is generated from `src/data/verses.ts`; the verse strings are
verbatim text extracted from `public/bibles/erv.pdf` and
`public/bibles/spanish-reina.pdf`.

{chr(10).join(rows)}
"""
    docs = re.sub(r"## The full list \(.*", replacement, docs, flags=re.S)
    docs_path.write_text(docs, encoding="utf-8")
    print(f"wrote {len(refs)} indexed references")


if __name__ == "__main__":
    main()
