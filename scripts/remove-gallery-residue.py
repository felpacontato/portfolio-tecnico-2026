from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS_PATH = ROOT / "public/portfolio.css"

DEAD_SELECTOR_MARKERS = (
    ".portfolio-circular-gallery",
    ".pcg-",
    "#projects-circular-gallery",
    "#projects-circular-react",
    ".gallery-fallback",
    ".circular-gallery",
    ".cg-item",
    ".cg-track",
)

DEAD_TEXT_MARKERS = DEAD_SELECTOR_MARKERS + ("circular-drift",)


def contains_dead_marker(value: str) -> bool:
    return any(marker in value for marker in DEAD_TEXT_MARKERS)


def find_open_brace(source: str, start: int) -> int:
    quote: str | None = None
    escaped = False
    in_comment = False
    index = start

    while index < len(source):
        char = source[index]
        nxt = source[index + 1] if index + 1 < len(source) else ""

        if in_comment:
            if char == "*" and nxt == "/":
                in_comment = False
                index += 2
                continue
            index += 1
            continue

        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            index += 1
            continue

        if char == "/" and nxt == "*":
            in_comment = True
            index += 2
            continue
        if char in ("'", '"'):
            quote = char
            index += 1
            continue
        if char == "{":
            return index

        index += 1

    return -1


def find_matching_brace(source: str, open_index: int) -> int:
    depth = 1
    quote: str | None = None
    escaped = False
    in_comment = False
    index = open_index + 1

    while index < len(source):
        char = source[index]
        nxt = source[index + 1] if index + 1 < len(source) else ""

        if in_comment:
            if char == "*" and nxt == "/":
                in_comment = False
                index += 2
                continue
            index += 1
            continue

        if quote:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == quote:
                quote = None
            index += 1
            continue

        if char == "/" and nxt == "*":
            in_comment = True
            index += 2
            continue
        if char in ("'", '"'):
            quote = char
            index += 1
            continue
        if char == "{":
            depth += 1
        elif char == "}":
            depth -= 1
            if depth == 0:
                return index

        index += 1

    raise RuntimeError("Unbalanced CSS braces")


def strip_comments(value: str) -> str:
    return re.sub(r"/\*.*?\*/", "", value, flags=re.DOTALL).strip()


def leading_trivia(value: str) -> str:
    match = re.match(r"(?s)((?:\s|/\*.*?\*/)*)", value)
    return match.group(1) if match else ""


def process_rule_list(source: str) -> str:
    output: list[str] = []
    cursor = 0

    while cursor < len(source):
        open_index = find_open_brace(source, cursor)
        if open_index < 0:
            output.append(source[cursor:])
            break

        close_index = find_matching_brace(source, open_index)
        prelude = source[cursor:open_index]
        body = source[open_index + 1 : close_index]
        clean_prelude = strip_comments(prelude)
        lowered = clean_prelude.lower()

        if not clean_prelude:
            output.append(source[cursor : close_index + 1])
            cursor = close_index + 1
            continue

        if lowered.startswith("@keyframes") or lowered.startswith("@-webkit-keyframes"):
            if "circular-drift" not in lowered:
                output.append(source[cursor : close_index + 1])
            cursor = close_index + 1
            continue

        if lowered.startswith(("@media", "@supports", "@layer", "@container", "@scope", "@document")):
            processed_body = process_rule_list(body)
            if processed_body.strip():
                output.append(prelude)
                output.append("{")
                output.append(processed_body)
                output.append("}")
            cursor = close_index + 1
            continue

        if clean_prelude.startswith("@"):
            output.append(source[cursor : close_index + 1])
            cursor = close_index + 1
            continue

        selectors = [selector.strip() for selector in clean_prelude.split(",")]
        live_selectors = [selector for selector in selectors if selector and not contains_dead_marker(selector)]

        if live_selectors:
            if len(live_selectors) == len(selectors):
                output.append(source[cursor : close_index + 1])
            else:
                output.append(leading_trivia(prelude))
                output.append(",\n".join(live_selectors))
                output.append(" {")
                output.append(body)
                output.append("}")

        cursor = close_index + 1

    return "".join(output)


for component_path in (
    ROOT / "src/components/ui/CircularGallery.tsx",
    ROOT / "src/components/ui/CircularGallery.jsx",
    ROOT / "src/components/CircularGallery.tsx",
    ROOT / "src/components/CircularGallery.jsx",
):
    if component_path.exists():
        component_path.unlink()

css_source = CSS_PATH.read_text(encoding="utf-8")
css_source = process_rule_list(css_source)
css_source = re.sub(
    r"\n?\s*/\*[^*]*(?:\*(?!/)[^*]*)*(?:circular gallery|galeria circular)[^*]*(?:\*(?!/)[^*]*)*\*/\s*",
    "\n",
    css_source,
    flags=re.IGNORECASE,
)
css_source = re.sub(r"\n{3,}", "\n\n", css_source).rstrip() + "\n"

remaining = [marker for marker in DEAD_TEXT_MARKERS if marker in css_source]
if remaining:
    raise RuntimeError(f"Dead gallery CSS markers remain: {remaining}")

CSS_PATH.write_text(css_source, encoding="utf-8")

index_source = (ROOT / "src/routes/index.tsx").read_text(encoding="utf-8")
for marker in DEAD_TEXT_MARKERS:
    if marker in index_source:
        raise RuntimeError(f"Dead gallery marker remains in index.tsx: {marker}")

if index_source.count('class=\"pcard\"') != 9:
    raise RuntimeError("Canonical project grid no longer contains exactly nine cards")

print("Removed final circular-gallery component and CSS residue")
