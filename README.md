# copypaste

This repository provides a simple clipboard watcher that extracts quoted text and an emoji from whatever you copy. The resulting text is written back to the clipboard so you can paste the cleaned output directly.

## Usage

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the watcher:
   ```bash
   python clipfilter.py
   ```
3. Copy any text that contains quoted words and an emoji. When you paste, only the quoted words and the first emoji will remain.

Example input:
```
FIRST PERSON TO REACT, MESSAGE ME “MEME COIN MAFIA CTO” AND A “🐳” EMOJI GETS THE 1 SOL.
```
After copying, you can paste:
```
MEME COIN MAFIA CTO 🐳
```

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
