"""Extract searchable page-delimited text from a Bible PDF."""

from pathlib import Path
import sys

from pypdf import PdfReader


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract_pdf_text.py INPUT.pdf OUTPUT.txt")

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    reader = PdfReader(str(input_path))

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", encoding="utf-8") as output:
        for page_number, page in enumerate(reader.pages, start=1):
            output.write(f"\n\n===== PAGE {page_number} =====\n")
            output.write(page.extract_text() or "")

    print(f"extracted {len(reader.pages)} pages from {input_path} to {output_path}")


if __name__ == "__main__":
    main()
