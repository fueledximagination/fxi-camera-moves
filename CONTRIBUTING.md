# Contributing

Thanks for helping. The goal is a small, accurate, model-agnostic reference.

## Setup

```bash
node --version   # 20 or newer
npm run build    # regenerates data/camera-moves.csv and the README table
npm test
npm run lint
```

There are no npm dependencies. Please keep it that way.

## Editing the data

`data/camera-moves.json` is the only file to edit by hand. The CSV and the README table are generated from it; `npm test` fails if they are out of sync.

Good contributions:

- Recipe wording that makes a move more reliable across models. Say which models you tested it on in the pull request.
- Better tips, negatives, or recommended durations, backed by your own generations.
- New moves. Keep the four-part `Movement / Speed / Framing / End` shape and a kebab-case `id`. Ids never change once published.

## Ground rules

- Recipes stay in plain cinematography language: no model-specific syntax, weights, or tokens.
- Don't add media files. Example clips are linked, not bundled.
- Never commit secrets, private hostnames or IP addresses, or personal file paths.
- Contributions to `data/` are licensed CC BY 4.0; contributions to code are licensed MIT.

## Pull requests

1. Fork, branch, and keep the change focused.
2. Run `npm run build`, `npm test`, and `npm run lint`.
3. Describe what changed and how you tested it.
