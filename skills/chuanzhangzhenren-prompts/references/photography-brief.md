# Photography Brief Reference

Use this reference when the user has a portrait idea, photography terms, a style direction, or a vague phrase like "真实感 / 电影感 / 胶片感 / 高级感" and needs it turned into an executable prompt. For a larger variable library, texture vocabulary, and article-reading workflow, use `variables-and-texture.md`. For face detail, makeup, and filter constraints, use `face-makeup-filter.md`.

Core principle: an AI portrait prompt is a simplified shooting brief. It should tell the model what the image is for, who the person is, how close the camera is, where the light comes from, how much background information stays visible, what tone anchors the image, and where realism must appear.

## The 9-Module Prompt Order

```text
[图像用途] + [主体身份] + [人物气质] + [构图和机位] + [镜头语言] + [景深] + [光线设计] + [场景和服装] + [色调风格] + [真实感细节] + [限制项]
```

English shape:

```text
A [purpose] portrait of [subject], with [mood], framed as [composition] from [camera angle], using a [lens look] and [aperture feel], lit by [lighting setup], in [environment], wearing [wardrobe], with [tone/style anchor], emphasizing [realism details], avoiding [negative constraints].
```

Chinese shape:

```text
请生成一张【图像用途】人像。主体是【人物身份】，整体气质是【气质关键词】，表情为【表情状态】。构图为【脸部特写 / 胸像 / 半身 / 3/4 身 / 全身】，机位为【平视 / 略高 / 略低 / 45 度侧面】。画面呈现【24mm / 35mm / 50mm / 85mm / 105mm / 135mm】的镜头距离感，景深为【f/1.8 / f/2 / f/2.8 / f/4】。光线使用【光线类型】，光从【方向】来，呈现【柔和包裹 / 明确方向 / 低对比 / 高对比 / 眼神光明显】的效果。场景是【环境】，服装为【服装风格】，妆发为【妆发方向】。整体色调参考【胶片/商业/杂志/中性色调锚点】。请重点呈现【真实感细节】。避免【限制项】。
```

## Module 1: Image Purpose

Choose the purpose first. It controls the whole visual language.

- Social media avatar: clear face, stable gaze, clean background.
- Professional portrait: credible, natural, professional, approachable.
- Magazine/editorial portrait: composition, negative space, temperament, atmosphere.
- Commercial advertising: clean light, stable skin, controlled frame.
- Lifestyle portrait: relaxed, natural, like a real scene.
- Black-and-white documentary: emotion, texture, person state, presence.
- Cinematic night portrait: light color, shadows, air, atmosphere.

## Module 2: Subject And Temperament

Do not write only "a girl" or "a man." Specify identity, temperament, expression, and skin treatment.

- Identity: young woman, founder, designer, athlete creator, office worker, street passerby.
- Temperament: relaxed, restrained, professional, gentle, detached, mature, confident.
- Expression: calm direct gaze, slight smile, focused, thoughtful, relaxed, determined.
- Skin: natural skin texture, lightly retouched, clean commercial skin, documentary roughness.

For photo-based generation, preserve face shape, facial proportion, brow-eye structure, nose, lips, skin tone, hairstyle, age feel, and overall temperament.

## Module 3: Lens Language

Lens terms should express distance, perspective, and background treatment, not just equipment.

- 24mm: environmental portrait, strong space, obvious perspective.
- 35mm: street, documentary, story, in-scene distance.
- 50mm: natural, balanced, lifestyle portrait.
- 85mm: classic portrait, stable facial proportion, cleaner background.
- 105mm: beauty/commercial close-up, stronger compression.
- 135mm: restrained, detached, compressed background.

Write effects:

```text
85mm portrait lens look, natural facial proportions, clean background separation
```

## Module 4: Composition And Camera Angle

- face close-up: beauty, emotion close-up.
- bust-up: avatar, style portrait.
- half-body: professional portrait, lifestyle.
- three-quarter body: fashion, lookbook.
- full-body: styling, clothing, environment relation.
- cover composition: article cover, ad image, negative space.

Stable angles for realistic portraits:

- eye-level camera angle
- slightly high angle
- front-facing
- 45-degree side angle
- candid offset framing

Use slightly low angle only for fashion or power; it can feel oppressive.

## Module 5: Depth Of Field And Background Information

Do not only write "background blur." Specify blur strength and how much background remains readable.

- f/1.4 feel: dreamy and emotional, but can look fake.
- f/1.8 feel: atmosphere, night, emotional portrait.
- f/2 feel: subject separation, lifestyle and style portrait.
- f/2.8 feel: stable portrait, face sharp, background moderately softened.
- f/4 feel: keeps clothing, scene, and props more readable.
- deep depth of field: documentary, environmental portrait, street scene.

Reliable default:

```text
f/2.8 feel, moderate shallow depth of field, background still recognizable
```

## Module 6: Lighting

Write where light comes from, what texture it has, and how it lands on the face.

- soft window light: natural, daily, skin-friendly.
- large diffused window light: softbox-like, professional portrait.
- overcast soft light: urban, low contrast, stable.
- golden hour backlight: warm, gentle, outdoor atmosphere.
- clamshell lighting: beauty/commercial, obvious catchlights.
- hard direct light: fashion, strong, dramatic.
- neon and tungsten mixed light: night, cinema, city.
- available light: documentary, location feel, less controlled.

Better wording:

```text
soft natural window light from the left side, gentle shadow falloff, natural catchlights in the eyes
```

## Module 7: Tone And Style Anchor

Use one main tone anchor. Do not stack many film names.

- Kodak Portra 400: soft skin, lifestyle, natural film feeling.
- Kodak Gold 200: warm, sunny, light retro.
- Fujifilm Classic Chrome: muted, urban, restrained, editorial.
- Fujifilm Eterna: soft, narrative, cinematic.
- CineStill 800T: night, neon, tungsten, subtle halation.
- Ilford HP5: black-and-white documentary, grain, person state.
- neutral editorial tone: clean, professional, magazine.
- clean commercial tone: beauty/commercial, clean skin.

Treat film names as direction anchors, not physical guarantees.

## Module 8: Realism Details

"Realistic" must land on visible details.

- Skin: natural skin texture, subtle pores.
- Eyes: realistic catchlights, focused gaze.
- Hair: natural flyaway hairs.
- Fabric: real fabric texture.
- Background: optical bokeh, not artificial blur.
- Highlights: natural highlight roll-off.
- Face: slight facial asymmetry, realistic facial detail.
- Retouching: not over-retouched, no plastic skin.

## Module 9: Constraints

Keep a reusable negative block:

```text
no AI fake face, no plastic skin, no over-retouched skin, no westernized facial features, no influencer look, no excessive bokeh, no unnatural catchlights, no distorted hands
```

Add for night portraits:

```text
restrained neon glow, no excessive halation
```

Add for commercial portraits:

```text
natural expression, not stiff, not overly posed
```

## Style Presets

Use one row as a starting point.

- Black-and-white documentary: 35mm or 50mm, available light, Ilford HP5 inspired monochrome, natural skin texture, subtle grain.
- Film lifestyle: 50mm, f/2, large window natural light, Kodak Portra 400, half-body, relaxed expression.
- Muted urban editorial: 85mm, f/2, overcast soft light, Classic Chrome, bust-up, quiet editorial mood.
- Professional portrait: 85mm, f/2.8, large diffused window light, neutral editorial tone, half-body, calm confident expression.
- Commercial beauty: 105mm, f/2.8, clamshell lighting, face close-up, clean commercial tone, realistic catchlights.
- Cinematic night: 85mm, f/1.8, neon and tungsten mixed light, CineStill 800T, subtle halation, restrained glow.
- Clean Japanese-style portrait: 50mm, f/2.8, soft daylight, light warm tone, clean background, gentle expression.
- High-contrast fashion: 35mm or 85mm, hard light, strong shadow, full-body or 3/4 body, fashion editorial styling.
- Founder avatar: 85mm, f/2.8, soft window light, minimal workspace, natural skin texture, professional but relaxed.
- Outdoor golden hour: 50mm or 85mm, golden hour backlight, warm tone, soft flare, natural expression.

## Common Translations

- "高级感" -> choose purpose, restrained composition, clean light, one tone anchor, controlled wardrobe.
- "电影感" -> lens distance, mixed practical light or narrative soft light, restrained color, believable shadows.
- "胶片感" -> one film-inspired tone, subtle grain, soft skin tones, natural highlight roll-off.
- "朦胧感" -> moderate shallow depth of field, optical bokeh, soft diffusion, low contrast, subtle grain; avoid fake blur.
- "真实感" -> skin pores, catchlights, flyaway hairs, fabric texture, slight facial asymmetry, natural expression.

## Variable Expansion

If the request needs a more complete variable system, do not expand this file manually from memory. Read `variables-and-texture.md` and select the relevant variables for the image.
