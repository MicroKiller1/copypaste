#!/usr/bin/env python3
"""Extract quotes and emojis from copied text.

This script monitors the clipboard. When new text is copied, it looks for the
first substring enclosed in straight or curly quotes and for the first emoji in
that text. If either is found, it replaces the clipboard content with the
extracted pieces combined, separated by a space.
"""

import re
import time

try:
    import pyperclip
except ImportError:  # pragma: no cover - pyperclip must be installed
    raise SystemExit("pyperclip is required. Install with 'pip install pyperclip'.")

QUOTE_RE = re.compile(r'["“”]([^"“”]+)["“”]')
EMOJI_RE = re.compile(r'[\U00010000-\U0010ffff]')


def extract(text: str) -> str | None:
    """Return quoted text and emoji if present."""
    quote_match = QUOTE_RE.search(text)
    emoji_match = EMOJI_RE.search(text)
    quoted = quote_match.group(1) if quote_match else ""
    emoji = emoji_match.group(0) if emoji_match else ""
    if not quoted and not emoji:
        return None
    return f"{quoted} {emoji}".strip()


def main() -> None:
    """Continuously watch the clipboard and clean its contents."""
    previous = None
    while True:
        current = pyperclip.paste()
        if current != previous:
            cleaned = extract(current)
            if cleaned is not None:
                pyperclip.copy(cleaned)
                previous = cleaned
            else:
                previous = current
        time.sleep(0.5)


if __name__ == "__main__":
    main()
