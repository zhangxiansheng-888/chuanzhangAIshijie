---
name: chuanzhang-tuxiangtishici
description: Create polished bilingual image-generation prompts for still images. Use when the user asks for an image prompt, wants a visual idea translated into a generation-ready prompt, provides a script plus style description and wants key stills, posters, character images, scene concept art, or other static image prompts, describes a subject, scene, style, product, character, poster, illustration, or photo for a still image, needs prompt variants, or asks to improve or translate an image prompt. Always provide both an English prompt and a Chinese prompt. Do not create video prompts, shotlists, timestamped sequences, motion directions, duration notes, or audio instructions. Do not recommend, compare, or name image-generation models unless the user explicitly asks for model or tool advice.
---

# 船长AI视界 图像提示词

Turn a still-image idea, script excerpt, or style brief into ready-to-paste prompts: one English version and one Chinese version. Focus on visual specificity, composition, light, texture, camera language, and style. Do not include recommended generation models or platform suggestions.

## Scope

Use this skill only for static image prompts. If the source material is a script, turn it into key still images, poster frames, character concept images, environment concept art, or prop images. Keep every output suitable for image generation rather than video generation.

## Workflow

1. Infer the intended image from the user's description.
2. If the request is ambiguous but still workable, make a reasonable creative choice and proceed. Ask one focused question only when the subject, format, or purpose is impossible to infer.
3. Build the prompt with this structure:
   `[Subject + Action] + [Location / Context] + [Composition] + [Lighting] + [Style / Aesthetic] + [Camera / Lens] + [Color Grading]`
4. Output an English prompt first, then a Chinese prompt that preserves the same intent rather than translating word-for-word.
5. Add a short iteration note only when useful, such as alternate aspect ratio, lighting mood, style intensity, or detail density.

## Script + Style Workflow

When the user provides a script, synopsis, scene text, or dialogue plus a style description, treat the task as static image development:

1. Extract the most image-worthy still moments: character reveal, emotional close-up, environment establishing image, key prop, poster image, or climactic tableau.
2. Preserve the user's style brief across every prompt: genre, era, color mood, lighting philosophy, realism level, costume language, art direction, and texture.
3. Create one bilingual image prompt per selected still. Name each still with a short title if there are multiple prompts.
4. Keep the output image-focused. Use framing, lens, lighting, pose, expression, environment, and texture.
5. Avoid video-only details: no timestamps, no shot duration, no camera movement over time, no audio map, no dialogue timing, no scene transitions.

If the script is long and the user did not specify how many image prompts they want, choose a compact set of the strongest stills and say how many were selected.

## Input Handling

- For a short visual idea, create one bilingual prompt.
- For a script excerpt or scene, create prompts for the strongest still moments.
- For a full script, select a compact set of key stills unless the user specifies a number.
- For a style description, apply it consistently to composition, lighting, color, texture, wardrobe, set design, and realism level.
- For reference images, state what each reference controls without inventing unsupported details.

## Prompt Principles

- Lead with the subject and action. Make the first sentence clear enough that the image can be understood immediately.
- Describe visible facts with positive framing. Say what should appear in the image instead of focusing on exclusions.
- Ground the image in a specific location, background, era, or environment when the setting matters.
- Specify composition with photographic language: full shot, medium shot, close-up, eye level, low angle, bird's-eye view, rule of thirds, centered symmetry, over-the-shoulder, POV.
- Treat lighting as emotional direction: golden hour backlight, overcast diffusion, hard midday contrast, chiaroscuro, neon fill, candlelight, foggy streetlight, studio softbox.
- Use camera and lens language when it helps: 85mm portrait lens, 24mm wide angle, 50mm natural perspective, macro detail, telephoto compression, shallow depth of field, deep focus, soft focus.
- Define materiality and texture: silk, brushed metal, cracked concrete, translucent glass, wet asphalt, paper grain, weathered leather.
- Add style signatures when relevant: editorial photography, documentary realism, high-end product photography, architectural photography, 35mm film, watercolor, oil painting, graphic novel, hyperreal render.
- Specify color grading: warm amber, cool teal, desaturated matte, vibrant saturated color, high contrast deep blacks, lifted shadows, duotone.
- For visible text in the image, place exact text in quotation marks and specify typography or placement.
- If the user provides reference images, explain what each reference should control: character, pose, texture, style, lighting, environment, or color.

## Output Format

Use this format by default:

```markdown
**English Prompt**
[One polished prompt block in English.]

**中文提示词**
[一段可直接粘贴使用的中文提示词。]

**可迭代方向**
[Optional one short line. Omit this section if there is nothing useful to add.]
```

For multiple stills from a script, repeat the same bilingual structure under numbered still titles.

## Variants

Offer two versions only when the request clearly has multiple strong interpretations, such as photo vs illustration, luxury vs gritty, realistic vs surreal, or commercial vs cinematic. Keep each version bilingual.

## Avoid

- Do not recommend a specific image-generation model, platform, or tool.
- Do not output video prompts, moving-camera instructions, shotlists, timestamps, duration, sound effects, music cues, or audio directions.
- Do not add negative prompt sections unless the user asks for them.
- Do not overstuff prompts with unrelated style tags.
- Do not promise exact text rendering unless the user is using a tool known to support text; phrase text instructions as desired visible text.
- Do not change character identity, brand details, or product features supplied by the user.
