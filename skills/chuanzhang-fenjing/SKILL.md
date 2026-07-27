---
name: chuanzhang-fenjing
description: 将剧本或场景拆解为中文影视分镜、Seedance 2.0 视频提示词、直接文本提示词或分镜网页。Use when the user uploads or references a screenplay and asks for shot breakdown, shotlist, cinematic blocking, Seedance prompts, video prompt sheets, storyboard-aware prompts, asset-image comparison, or an HTML production page. Enforce asset confirmation, optional storyboard use, spatial blocking confirmation, time division confirmation, delivery-format confirmation, per-shot action/composition/camera/sound fields, Chinese output, prompt length control, and HTML layout QA when generating a webpage.
---

# 船长AI视界 中文分镜提示词 v1

船长AI视界

Build Chinese production shotlist webpages for Seedance 2.0. Do not merely transcribe the script. Direct it: turn story beats into cinematography, spatial blocking, physical performance, lighting, background activity, and model-failure prevention.

## Non-Negotiable Gates

This skill has six hard gates. Never skip them, even if the user seems in a hurry.

1. **Asset Confirmation Gate**
   - During asset preparation, ask whether the user needs storyboard assets.
   - Storyboards may be images containing numbered frames, shot drawings, and text notes.
   - After the user uploads images, output an asset mapping table including storyboards if present.
   - Ask the user to reply `确认资产` or provide corrections.
   - Do not write prompts or generate HTML until the user confirms the asset mapping.
   - If any filename is ambiguous, missing, duplicated, or extra, ask before proceeding.
   - Use `reference/ASSET_CONFIRMATION.md` and `reference/STORYBOARD_ASSETS.md`.

2. **Spatial Confirmation Gate**
   - Before writing prompts for any scene containing two or more story characters, any important character relationship, any key prop on a specific surface, or any camera geometry that affects the shot, produce a top-down blocking schema.
   - Ask the user to reply `确认位置` or provide corrections.
   - Do not write prompts or generate HTML until the user confirms the required spatial blocking.
   - Use `reference/SPATIAL_BLOCKING.md`.

3. **Timing Division Confirmation Gate**
   - Before writing prompts or generating HTML, propose how the selected plot scope will be divided into time segments and how many video prompts it will produce.
   - Each prompt may cover at most 15 seconds of video.
   - Do not over-segment. Merge continuous beats when they share characters, location, mood, and camera logic, as long as the prompt remains clear and <=15 seconds.
   - Ask the user to reply `确认时间划分` or provide corrections.
   - Do not write prompts or generate HTML until the user confirms the time division and prompt count.
   - Use `reference/PROMPT_TIMING.md` and `reference/PROMPT_DENSITY.md`.

4. **Prompt Structure Confirmation Gate**
   - When the user asks to change the final video-prompt structure, update the proposed structure and show the user the exact template.
   - Ask the user to reply `确认提示词结构` or provide corrections.
   - Do not install or treat the structure as final until the user confirms.
   - Use `reference/PROMPT_PATTERNS.md`.

5. **Delivery Format Confirmation Gate**
   - Before final output, ask whether the user wants an HTML webpage or direct text prompts.
   - Ask the user to reply `生成网页` or `只要文字提示词`.
   - If the user chooses text-only, output prompts directly in chat and do not generate HTML.
   - If the user chooses webpage, generate the stable Chinese HTML and run HTML QA.
   - Use `reference/DELIVERY_FORMAT.md`.

6. **HTML QA Gate** (only when the user chooses webpage)
   - Before delivering the HTML, render or inspect the generated page for layout stability.
   - The page must not use `rowspan` or `colspan` for prompt grouping.
   - Long Chinese prompt text must wrap inside its container without overlapping adjacent columns.
   - Fix layout issues in the HTML before delivery.
   - Use `reference/HTML_QA.md` and `templates/HTML_TEMPLATE.md`.

If a later user message supplies new assets, changes storyboard use, changes scope, changes positions, changes style, changes rhythm/pacing, changes delivery format, or changes final prompt structure, return to the relevant gate and reconfirm before continuing.

## Output Language

The final HTML webpage must be entirely in Simplified Chinese:

- Chinese UI labels, headers, scene titles, metadata, table headings, action cells, scene-text cells, asset lists, prompt labels, buttons, empty states, filters, and notes.
- Chinese Seedance prompt blocks.
- Chinese action summaries and scene summaries.
- Translate dialogue into Chinese unless the user explicitly asks to preserve the original spoken language. If original-language dialogue is required for lip-sync or performance, keep only the quoted spoken line in that language and write all surrounding direction in Chinese.
- Use English only for filenames, model-specific tokens, or user-requested technical terms.

## Style Basis

Do not use a fixed default style. Do not assume the original skill's director style.

Derive style in this order:

1. User's explicit style direction.
2. Uploaded style references: previous shotlist HTML, director notes, mood board, visual references, look bible, sample prompts, screenshots.
3. The screenplay itself: genre, period, locations, emotional register, camera language, recurring motifs.

Before prompt writing, confirm the Style Basis in Chinese. If no useful style can be inferred, ask one short style question and stop.

## Phase 1 — Read Script

Read the entire script and identify:

- Scene numbers and scene headers
- Characters and first appearances
- Locations
- Significant props and readable text
- Dialogue and action beats
- Mood and emotional register
- Style signals from script and references

## Phase 2 — Request Assets

Output a Chinese asset list grouped by category:

```markdown
**人物**
- 角色名：一句话外观和叙事功能

**场景**
- 场景名：空间结构和主要视觉特征

**道具**
- 道具名：尺寸、文字、材质、使用场景

**风格参考（可选）**
- 参考名：用途

**故事板 / 分镜图（可选）**
- 询问用户是否需要上传带编号的故事板图片。故事板可以包含分镜图、镜头编号、动作说明、文字说明。
```

End with:

```text
请生成并上传这些参考图。文件名尽量让我能直接对应，例如 roko.png、apartment.png、polaroid_nov14.png。
另外，你是否需要使用故事板/分镜图参考？如果需要，请上传带编号的故事板图片，例如 storyboard_01.png、SB_03.png。故事板可包含分镜图和文字信息，但最终视频画面不会保留故事板编号、标注、线段或台词框。
上传后请告诉我先做哪些场景。
```

Stop. Do not continue to phase 3 in the same turn.

## Phase 3 — Confirm Scope, Assets, Style, and Positions

When the user uploads images or provides asset files:

1. Confirm the scene scope in Chinese.
2. Output the required asset confirmation table from `reference/ASSET_CONFIRMATION.md`, including storyboard files and storyboard frame numbers if present.
3. Ask for `确认资产`.
4. Confirm Style Basis in Chinese.
5. Create top-down spatial blocking schemas for all required scenes using `reference/SPATIAL_BLOCKING.md`.
6. Ask for `确认位置`.

Do not start prompt writing until the user has confirmed both required gates:

```text
已确认资产：是
已确认位置：是 / 本次范围无需位置图，原因：...
已确认风格：是
```

If a scene truly does not need spatial confirmation, state the reason explicitly. Example: `单人无关键道具的纯表情特写，无需位置图。`

## Phase 4 — Confirm Time Division and Prompt Count

Only after asset/style/position gates are complete:

1. Break the selected plot into proposed prompt groups using `reference/PROMPT_DENSITY.md`.
2. Assign a time plan to each proposed prompt group using `reference/PROMPT_TIMING.md`.
3. Output a Chinese timing proposal table that shows plot segment, time range, estimated duration, prompt count, and grouping reason.
4. Ensure every proposed prompt is <=15 seconds.
5. Ensure the proposal does not over-segment the plot. Merge short adjacent beats when they form one continuous emotional or action unit.
6. Ask the user to reply `确认时间划分` or tell you where to merge/split.
7. Stop. Do not write prompts or generate HTML in the same turn.

Proceed only after the user confirms:

```text
已确认时间划分：是
```

## Phase 5 — Confirm Final Prompt Structure

If the user has changed the final prompt structure in this project or skill version, show the exact final prompt template and ask for:

```text
确认提示词结构
```

Only after confirmation, proceed to formal prompt writing.

## Phase 6 — Confirm Delivery Format

Before final output, ask:

```text
请确认最终交付形式：回复 `生成网页`，我会输出完整中文 HTML 分镜提示词表；回复 `只要文字提示词`，我会不生成网页，直接输出按顺序排列的文字提示词。
```

Stop until the user confirms.

## Phase 7 — Generate Final Output

Only after the gates are complete:

1. Use the confirmed time division and prompt count. Do not invent new prompt groups silently.
2. Write Chinese Seedance 2.0 prompts using `reference/PROMPT_PATTERNS.md`, `reference/STYLE_BLOCK.md`, `reference/CAMERA_EMOTION.md`, and `reference/MICRO_BEATS.md`.
3. If storyboards are actually used in a prompt or shot, cite the storyboard frame numbers used.
4. If no storyboard is used in a prompt or shot, omit all storyboard-related labels, placeholders, and warnings from that prompt or shot. Never write `故事板参考：本条不使用故事板。`, `故事板参考：无。`, or any equivalent unused-storyboard note.
5. Keep each copyable video prompt body within 2200 Chinese characters. If a draft is longer, compress it before delivery using the reduction rules in `reference/PROMPT_PATTERNS.md`.
6. If the user chose `只要文字提示词`, output direct text prompt blocks in chat and stop.
7. If the user chose `生成网页`, assemble the webpage with `templates/HTML_TEMPLATE.md`; each prompt group must include a per-segment asset-image comparison table outside the copyable prompt body.
8. Use the stable group-row layout. Do not use `rowspan` or `colspan`.
9. Run the HTML QA checklist from `reference/HTML_QA.md`.
10. Save as `Shotlist_<scope>_ZH_v2_7.html`.
11. Deliver the final HTML.

## Prompt Rules

- Handles renumber per prompt. Declare handles at the start of every prompt.
- Every prompt starts with `不要出现BGM，不要出现字幕`.
- Immediately after that, write style before handles using exactly these four headings: `【全局画质】`、`【人物材质】`、`【灯光与风格】`、`【核心特效】`.
- All four style modules must be written in Chinese. Do not use English labels such as `Photorealistic`, `Texture`, `Lighting`, `Visual Style`, or `VFX` in final prompts; translate their control intent into Chinese.
- `【全局画质】` controls overall realism and generation direction: real-film photography, high resolution, large-format feeling, real physics, non-game, non-3D-render, non-animation/illustration, or any other direction required by the user/materials/script.
- `【人物材质】` controls close-up human realism: pores, fine hair, skin blood color, wetness, sweat, wounds, lip texture, eye redness, subsurface scattering, body strain, and other skin/body-surface details. Do not repeat character identity, full costume, or plot background here.
- `【灯光与风格】` controls light, color, mood, cinematic feeling, and visual taste: key/fill/negative fill, contrast, color tendency, grain, representative film influence if provided, and spatial contrast. It must come from user requirements, references, or script analysis.
- `【核心特效】` controls the most memorable visual mechanism in the prompt. If there is a VFX element, write its shape, material, color, movement, particles/fluid/energy behavior, generation/dissipation, and physical interaction with characters/environment. If there is no supernatural VFX, write the core physical visual mechanism such as underwater resistance, smoke, real fire, rain splash, glass breakage, dust, or impact debris.
- Then declare handles. Do not put handles before the four style headings.
- Do not include a standalone `时间安排：` paragraph in the copyable video prompt body; timing stays in the HTML timing column and timing proposal.
- Do not include the global line `⚠️对白规则：`.
- Before every shot's `机位：`, write `画面动作概述：...`, including the character state.
- After `画面动作概述：...` and before `机位：`, write `画面构图：...` as the initial composition, using screen zones and spatial locks first: left/center/right third, upper/lower area, foreground/midground/background, frame occupancy, negative space, contact points, occlusion, and relative front/behind/left/right relationships.
- Percentage anchors are optional assistance only, not mathematical guarantees. If used, follow screen coordinates: x=0% left edge, x=50% center, x=100% right edge; y=0% top edge, y=50% center, y=100% bottom edge. Write them as approximate anchors such as `身体中心约在x=32%` or `脚靠近y=88%`.
- Every shot must keep the fixed internal field order: `画面动作概述：` → `画面构图：` → `机位：` → `动作：` → `音效：`. If a storyboard is actually used, add `故事板参考：SB-xx。` before `画面动作概述：`.
- Every shot must include `音效：...`. If a sound continues through the whole scene, describe it under `环境活动 / 全场音效：...`.
- Each copyable final prompt body must be no more than 2200 Chinese characters. When HTML is requested, show the approximate character count and manual trimming suggestions outside the copyable prompt block.
- When HTML is requested, each prompt group must include a Chinese asset-image comparison table for that segment: asset handle, asset name, original file/image number, type, segment use, used shots, and notes.
- When storyboard assets are used in a specific prompt/shot, that prompt/shot must cite storyboard frame numbers and explicitly forbid storyboard marks from appearing in the final video.
- When storyboard assets are not used in a specific prompt/shot, omit all storyboard-related content completely. Do not write `故事板参考：本条不使用故事板。`, `故事板参考：无。`, `未使用故事板`, or any equivalent placeholder.
- Do not append `15秒。21:9。` or any equivalent fixed footer to every prompt.
- Every final prompt group must have explicit timing metadata: scene-relative time range, estimated duration, and internal shot durations.
- Every prompt must cover at most 15 seconds of video.
- Avoid excessive fragmentation. Prefer one coherent 8-15 second prompt over several tiny prompts when the plot beat, location, characters, and emotional movement are continuous.
- Duration and aspect ratio may appear as metadata, HTML fields, prompt header tags, or per-shot notes, but not as mandatory closing text.
- Style must come from user/materials/script analysis.
- Camera movement must track emotion.
- No generic emotions: decompose emotion into muscles, breath, eyes, skin, posture, and timing.
- Every prompt with spatial relationships must mirror the approved top-down schema.
- Spatial descriptions must include main relative relationships such as in front of, behind, left/right of, facing, occluding, next to, above/below, and distance when relevant.
- Add `⚠️` warnings for likely model failures and `⚠️⚠️⚠️` for critical failures.

## Iteration Rules

When the user requests changes after delivery:

- Edit the HTML file directly.
- If changes affect assets, return to Asset Confirmation Gate.
- If changes affect positions, return to Spatial Confirmation Gate.
- If changes affect style, reconfirm style.
- If changes affect storyboard use or storyboard frame mapping, return to Asset Confirmation Gate.
- If changes affect pacing, duration, scene scope, or number of prompts, return to Timing Division Confirmation Gate.
- If changes affect delivery format, return to Delivery Format Confirmation Gate.
- Re-run HTML QA before redelivery.

## File Map

- `reference/ASSET_CONFIRMATION.md` — mandatory asset mapping format and gate language
- `reference/STORYBOARD_ASSETS.md` — storyboard asset rules, frame-number use, and no-markup warnings
- `reference/DELIVERY_FORMAT.md` — choose webpage or direct text prompts
- `reference/SPATIAL_BLOCKING.md` — mandatory top-down position confirmation
- `reference/HTML_QA.md` — layout QA checklist before delivery
- `reference/PROMPT_TIMING.md` — per-prompt time ranges and internal shot-duration rules
- `templates/HTML_TEMPLATE.md` — stable Chinese webpage template without rowspan/colspan
- `reference/STYLE_BLOCK.md` — user/material-derived style construction
- `reference/PROMPT_PATTERNS.md` — prompt structure and warnings
- `reference/CAMERA_EMOTION.md` — camera-emotion mapping
- `reference/MICRO_BEATS.md` — actor performance micro-beats
- `reference/PROMPT_DENSITY.md` — prompt grouping rules
- `reference/PLAN_TYPES.md` — Chinese visible shot-plan labels
