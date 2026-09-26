---
license: cc-by-4.0
language:
  - en
pretty_name: AI Video Camera Movements
size_categories:
  - n<1K
task_categories:
  - text-to-video
  - image-to-video
tags:
  - camera-movement
  - cinematography
  - prompt-engineering
  - prompts
  - ai-video
  - video-generation
configs:
  - config_name: default
    data_files:
      - split: train
        path: data/camera-moves.csv
---

# AI Video Camera Movements: 43 prompt recipes with example clips

43 camera moves for AI video (pans, tilts, zooms, dollies, tracking shots, orbits, cranes, drone moves, FPV, and specials like infinite zoom and time-lapse). Each record has a ready-to-paste prompt recipe, practical tips, negatives, a recommended clip length, and a 1280×720 example clip.

The recipes are plain cinematography language, so they work with any text-to-video or image-to-video model.

- **Watch every move in motion:** [FXI Studio Prompt Recipes](https://www.fxi.studio/tutorials/prompt-recipes?utm_source=huggingface&utm_medium=oss&utm_campaign=camera-moves&utm_content=dataset-card)
- **Source, schema, and full reference table:** [github.com/fueledximagination/fxi-camera-moves](https://github.com/fueledximagination/fxi-camera-moves)

## Usage

```python
from datasets import load_dataset

moves = load_dataset("fueledximagination/ai-video-camera-movements", split="train")
move = moves.filter(lambda m: m["id"] == "dolly-in")[0]

prompt = move["prompt_template"].replace("{scene}", "A lighthouse keeper at a rain-streaked window at night")
negative = move["negatives"].replace(" | ", ", ")
```

`tips` and `negatives` are lists joined with ` | ` in the CSV. The JSON file (`data/camera-moves.json`) keeps them as arrays.

## Fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Stable kebab-case key, e.g. `dolly-in`. |
| `name` | string | Display name. |
| `category` | string | `Pan/Tilt`, `Zoom/Lens`, `Dolly/Track`, `Physical Moves`, `Human Camera`, `Drone/Crane`, or `Specials`. |
| `description` | string | One-line description of the move. |
| `prompt` | string | The recipe, in four parts: Movement, Speed, Framing, End. |
| `prompt_template` | string | `{scene}. Camera: <prompt>`. |
| `best_for` | string | When to use the move. |
| `tips` | list of strings | How to make the move land. |
| `negatives` | list of strings | Competing motions to rule out in a negative prompt. |
| `recommended_duration_min_s`, `recommended_duration_max_s` | number | Clip length where the move reads best. |
| `dramatic` | bool | Visually dynamic move. |
| `example_clip_url`, `example_clip_webm_url`, `poster_url` | string | Example clip (MP4, WebM) and still frame. |
| `example_clip_duration_s`, `example_clip_width`, `example_clip_height` | number | Example clip metadata. |
| `tutorial_url` | string | The recipe's page with the clip playing. |

## How it was made

The move list covers standard cinematography vocabulary plus a few AI-native specials. The recipes were written and tested by the FXI Studio team for image-to-video generation. Every recipe follows the same Movement / Speed / Framing / End structure. Tips, negatives, and recommended durations are editorial guidance from production use, not measured benchmarks. The example clips were generated with FXI Studio from a start frame per move.

## License

The data is licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution: *"Camera movement recipes by FXI Studio (fxi.studio), CC BY 4.0"*.

The example clips and poster frames are linked, not included. They are © FUELED BY IMAGINATION, LLC, all rights reserved, and are not covered by CC BY 4.0.

## Citation

```bibtex
@misc{fxi_camera_moves_2026,
  title        = {AI Video Camera Movements: 43 prompt recipes with example clips},
  author       = {{FUELED BY IMAGINATION, LLC}},
  year         = {2026},
  howpublished = {\url{https://github.com/fueledximagination/fxi-camera-moves}},
  note         = {Dataset, CC BY 4.0. FXI Studio, https://www.fxi.studio}
}
```
