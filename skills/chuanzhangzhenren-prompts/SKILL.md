---
name: chuanzhangzhenren-prompts
description: Generate realistic AI portrait photography prompts by translating photo references, portrait ideas, photography judgments, or style articles into executable shooting-brief prompts. Use when the user asks for 真人写真提示词, AI人像写真, 上传真人照片生成写真, 保留本人长相, 脸部细节, 五官锚点, 妆容, 滤镜, 质感词, 摄影感prompt, 焦段/光圈/景深/光线/色调怎么写进人像prompt, 单人写真, 情侣写真, 九宫格写真, 职业写真, 头像, 生活方式人像, 人像变量库, 填空模板, prompt for realistic portrait photos, or a reusable portrait prompt framework. Do not use for non-human illustration, product/scene/poster prompts without real-person portrait intent, video prompts, storyboards, or purely illustrated characters.
---

# Real Person Portrait Prompts

Create model-agnostic prompts for realistic AI portrait photography. Treat each prompt as a compact shooting brief, not a pile of style words.

The skill has two jobs:

1. Preserve real-person identity when a photo is provided.
2. Translate photography intent into prompt language: purpose, subject temperament, lens distance, camera angle, depth of field, light, background information, tone, realism details, and constraints.
3. Read a user's rough idea, article, reference style, or failed prompt into a variable map, then choose only the variables needed for the final image.

## Core Rule

Lead with identity control:

```text
请只把上传照片作为人物身份参考，用于保留本人真实长相。不要保留原照片里的背景、衣服、道具、坐姿、拍摄环境和原始构图。请重新生成一张全新的写真。
```

Then build the portrait with controlled modules:

1. Image purpose: avatar, professional portrait, lifestyle portrait, magazine editorial, commercial beauty, documentary, cinematic night portrait.
2. Identity anchors: face shape, facial proportion, brows and eyes, nose, lips, skin tone, age feel, hairline, base hairstyle, overall temperament.
3. Subject temperament: relaxed, calm, professional, gentle, detached, mature, candid, confident.
4. Face detail: face shape, facial proportion, brow-eye structure, eyes, nose, lips, skin tone, age feel, hairline, texture, and what must not be beautified away.
5. Makeup and filter: base makeup, brow, eye makeup, blush area, lip color, retouching level, diffusion, grain, tone, glow, and highlight behavior.
6. Camera language: crop, camera angle, lens look, aperture feel, background information.
7. Light and tone: light direction, softness, catchlights, color style, film/editorial anchor.
8. Scene rebuild: new background, wardrobe, props, hairstyle, memory point.
9. Expression rhythm: gaze, micro-expression, captured moment, mild asymmetry.
10. Relationship and body control for couples/contact: left/right, foreground/background, hand ownership, contact point, realistic anatomy.
11. Negative constraints: avoid stranger face, influencer face, over-beautification, westernization, AI plastic skin, excessive blur, broken hands, fused faces.

## Workflow

1. Identify the task type: single portrait, portrait set, 3x3 grid, couple portrait, detail close-up, or prompt framework.
2. If a real photo is referenced or attached, start with the identity-reference sentence. If no photo is provided, state that identity preservation requires a reference photo and continue with a generic portrait prompt only if useful.
3. Ask at most one question when the missing information changes the result materially: subject count, desired style, or output format. Otherwise make a reasonable choice and proceed.
4. Build the prompt in this order:
   `身份参考(如有) -> 图像用途 -> 身份锚点 -> 脸部细节 -> 主体气质 -> 妆容体系 -> 滤镜质感 -> 构图机位 -> 镜头焦段感 -> 景深背景 -> 光线设计 -> 场景服装发型 -> 真实感细节 -> 人体空间 -> 负面约束`
5. For users who know photography terms but cannot write prompts, translate their choices into visible effects. Example: "85mm" becomes "85mm portrait lens look, natural facial proportions, clean background separation"; "f/2.8" becomes "moderate shallow depth of field, face sharp, background still recognizable".
6. For a set, write a shot table before the final prompt. Each shot must differ in angle, pose, gaze, crop, and emotional moment.
7. For couples or physical contact, explicitly assign left/right, front/back, hand ownership, gaze direction, and contact point.
8. If the user asks for variables, texture, SOP, article distillation, or "更全面", first extract a variable map, then output the prompt. Read `references/variables-and-texture.md`.
9. If the user asks about face detail, makeup, filter, identity similarity, "不像本人", "AI脸", "网红脸", "朦胧滤镜", "胶片滤镜", or a style like campus/Korean/professional/beauty/night, read `references/face-makeup-filter.md`.
10. Output a copy-ready Chinese prompt by default. Add an English prompt only when the user asks for bilingual output or a tool expects English.

## Output Shapes

### Single Portrait

```markdown
**真人写真提示词**
[copy-ready prompt]

**这版控制的重点**
[1-3 short bullets: identity, style, body/contact, or set rhythm]
```

### Portrait Set

```markdown
**镜头表**
01 [angle + pose + gaze + emotion]
02 ...

**整组统一提示词**
[global prompt]

**单张补充提示词**
01 [shot-specific prompt]
02 ...
```

### Framework

When the user asks for a reusable skill, template, SOP, or method, output:

1. Minimum reusable prompt skeleton.
2. Fill-in variables.
3. Negative prompt block.
4. Example for one concrete style.
5. Common failure fixes.

### Variable Map

When the user asks how to use an article, reference style, variables, texture words, or a failed prompt:

```markdown
**读取结果**
[purpose / subject / scene / lens / light / tone / texture / constraints]

**可选变量**
[short grouped variables, not every possible word]

**推荐组合**
[one best combination for this task]

**真人写真提示词**
[copy-ready prompt]
```

## Style Guidance

Use concrete photographic language instead of empty tags.

- Weak: 韩系, 高级感, 胶片感, 自然光.
- Better: 浅色摄影棚, 柔和窗边漫射光, 50mm 自然视角, 半身近景, 皮肤保留真实纹理, 米白针织衫和浅粉发夹.
- Weak: 电影感, 背景虚化, 真实感.
- Better: 夜景街边半身人像, 85mm portrait lens look, f/1.8 feel, mixed neon and tungsten practical lights, restrained glow, realistic catchlights, optical bokeh, natural highlight roll-off.
- Weak: 亲密情侣合照.
- Better: 女生从男生肩后探出脸看向镜头, 右手轻轻搭在男生右肩, 男生低头轻笑看向画面左下方, 像刚被她逗笑的一瞬间.

## Failure Fixes

- If the result looks like the original photo: strengthen "do not retain original background, outfit, props, pose, composition".
- If the result is pretty but not like the person: expand identity anchors and reduce hairstyle, makeup, face-shape changes.
- If every image repeats: create a shot table with distinct crop, angle, gaze, pose, and emotion.
- If couples feel empty: write the emotional action, not only the relationship label.
- If contact breaks anatomy: specify left/right, hand ownership, contact point, body proportion, and natural overlap.
- If the image feels AI-made: reduce generic beauty words, add imperfect captured-moment language, mild asymmetry, natural skin texture, and non-studio emotional timing.
- If the image is pretty but directionless: add image purpose first, then choose one lens look, one aperture feel, one lighting setup, and one tone anchor.
- If blur or film effects look fake: replace vague "朦胧/胶片/虚化" with moderate shallow depth of field, optical bokeh, subtle grain, restrained halation, natural highlight roll-off.

## Boundaries

- Do not create video prompts, camera movement over time, storyboards, timestamps, or sound cues.
- Do not use this for generic product, poster, scene, concept art, illustration, or non-human character prompts. Use the general still-image prompt skill instead.
- Do not promise exact identity preservation; phrase it as prompt control.
- If the subject is or appears to be under 18, keep the portrait non-sexual, age-appropriate, and everyday/editorial.

## Optional Reference

For complex sets, couples, grids, or when the user asks for the full method, read `references/portrait-planning.md`.

For photography-language conversion, style presets, lens/aperture/light/tone choices, or when the user says they know the image but cannot write the prompt, read `references/photography-brief.md`.

For article reading, prompt-writing modes, variable libraries, texture vocabulary, style recipes, and completeness checks, read `references/variables-and-texture.md`.

For face anchors, facial detail, makeup systems, filter recipes, retouching levels, and identity-preservation constraints, read `references/face-makeup-filter.md`.
