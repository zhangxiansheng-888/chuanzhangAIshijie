---
name: chuanzhangbiaoqing
description: Direct believable character performance and generate complete AI video prompts for text-to-video models. Use for facial acting, microexpressions, emotional transitions, dialogue performance, or vague character ideas such as “an ancient beauty breaks down.” When the brief is vague or asks for a video prompt, expand it into a complete prompt with an adult character, scene, dramatic motivation, emotional progression, facial and body performance, camera and lighting, adaptively chosen duration and exact timeline, audio, consistency locks, and negative constraints. When the user explicitly asks only for expression detail, return a focused performance block.
---

# Character Performance and Video Prompting

Direct the character from the inside out, then construct the world and camera needed to make the performance readable.

Use this causal chain:

`trigger → goal → obstacle → protective strategy → recognition → resistance → leakage → apex → residue → camera and environment response`

Describe visible behavior. Do not diagnose a real person's internal state.

## Route the request

### Complete video mode

Use this by default when the user provides a vague idea, a one-line scene, an emotion plus a character, or asks for an AI video prompt. Examples include “古代美女崩溃”, “a soldier sees his daughter again”, and “她笑着拒绝前任”.

Infer sensible creative details and deliver a copy-ready prompt without forcing the user to answer a questionnaire. State major creative assumptions briefly when they materially shape the result.

Read [full-video-framework.md](references/full-video-framework.md) and include every required video element.

### Performance block mode

Use this when the user explicitly asks only for facial expression, acting detail, microexpressions, or a performance block to insert into an existing prompt. Keep the face primary and include only the supporting breath, body, voice, camera, and lighting cues needed to read the expression.

If the user says the scene, camera, or lighting already exists, do not replace or extend those decisions. Return a clean performance block that can be inserted into the existing prompt. Put any camera compatibility advice in one optional note and never make it part of the required prompt.

### Analysis and optimization mode

Use this for source images, videos, or existing prompts. Separate visible evidence from interpretation, diagnose missing control layers, then rewrite at the requested scope.

## Expand vague briefs

When details are missing, infer them in this order:

1. Identify the character archetype, setting, emotional event, and likely video purpose
2. Make an ambiguous visual subject explicitly adult
3. Choose a concrete location and time of day that reinforce the emotion
4. Invent a plausible trigger, goal, obstacle, and protective strategy
5. Choose exact duration and aspect ratio
6. Select a material source identity, camera grammar, and lighting behavior
7. Build an emotional curve and environmental response
8. Add audio, dialogue only when useful, and a motivated ending

Choose duration from the actual dramatic work required. Do not assign a fixed default duration to vague briefs.

Estimate each required beat before writing the timeline:

1. Environment or baseline establishment, only when the scene needs it
2. Trigger recognition
3. Resistance or concealment
4. Physiological or facial leakage
5. Approach, interaction, action, or escalation
6. Spoken dialogue at a natural pace
7. Decision, apex, or loss of control
8. Emotional residue and motivated ending

Allocate enough time for each selected beat to remain readable, then choose the shortest total duration that preserves the intended acting. A tiny reaction may need about 3 to 4 seconds. Recognition plus concealment and residue may need 5 to 6 seconds. An approach, exchange, or short dialogue may need 7 to 9 seconds. A scene with environment, multiple actions, or a larger emotional turn may need 10 to 15 seconds. These are estimation ranges, not defaults.

When a target model supports only fixed lengths, choose the nearest supported duration that can hold the required beats and redistribute the timeline without accelerating facial actions unnaturally.

Use 9:16 for a generic social video brief and 16:9 for an explicitly cinematic, narrative, or landscape brief. State the exact total duration inside every standalone prompt.

## Construct the dramatic engine

Define these causes before writing expression:

1. Trigger: what just happened
2. Goal: what the character wants now
3. Obstacle: why direct action or expression is difficult
4. Protective strategy: hide, joke, appease, attack, withdraw, freeze, or collapse
5. Concealed subtext: what the character cannot say aloud

Prefer conflict between outward behavior and inward desire. Example: the character tells someone to leave while secretly hoping they will stay.

## Direct the emotional progression

Choose only the phases that fit the duration:

1. Baseline
2. Trigger recognition
3. Resistance or social mask
4. Physiological leakage through gaze, breath, or jaw
5. Facial and bodily escalation
6. Spoken line, decision, or loss of control
7. Partial recovery or emotional residue

Let the eyes reveal the change first, then mouth and jaw, followed by breath, head, shoulders, hands, and voice. Stagger channels by a few frames. Do not activate the whole face at maximum intensity simultaneously.

Control performance with three separate values:

1. Internal emotional pressure from 1 to 5
2. Outward expression amplitude from 1 to 5
3. Self-control from 1 to 5

Translate all three values into concrete visible actions. Keep numeric values in control notes, not as a substitute for production language.

Read [facial-action-language.md](references/facial-action-language.md) for facial anatomy and [performance-recipes.md](references/performance-recipes.md) for reusable emotional chains. Prefer plain visual language over Action Unit codes in the final prompt.

## Build the character and scene

For complete video mode, describe:

1. Adult age, visible ancestry or regional context when story-relevant, facial structure, skin texture, hair, makeup, clothing, footwear, and accessories
2. A temperament cue that drives posture and movement
3. A consistency lock for identity, facial proportions, hair, clothing, and age
4. Time, location, architecture, furnishings, weather, surface textures, and six to ten mutually consistent environmental elements
5. Dynamic light, air, fabric, dust, rain, flame, foliage, or background movement that reacts naturally during the performance

Avoid empty adjectives such as “beautiful”, “premium”, or “cinematic”. Translate them into visible materials, light behavior, composition, and movement. If a broad style word is retained for model compatibility, immediately qualify it with concrete physical details and never use it as the only style instruction.

## Direct camera, light, and spatial relationships

Read [performance-camera-language.md](references/performance-camera-language.md) for automatic camera selection.

Specify:

1. Shot size, angle, lens feel, camera height, and subject placement
2. Eyeline target and whether the off-screen person is left, right, near lens, or far away
3. Focus target and depth behavior
4. Camera movement tied to a named emotional beat
5. Key light direction, softness, color temperature, shadow behavior, and any motivated lighting change
6. Negative space and screen direction that express intimacy, threat, or withdrawal

Keep the camera quiet enough to preserve eyelid, gaze, lip, and jaw detail. Camera movement must stop after serving its emotional beat.

## Write the complete timeline

Divide the exact duration into chronological ranges. Every range should contain:

1. Character action and facial change
2. Internal dramatic function
3. Camera or focus behavior
4. Environment or lighting response
5. At most one natural imperfection when realism benefits

End with a motivated residue: held gaze, lowered camera, character leaving frame, empty-space hold, interrupted recording, or quiet cut to black.

## Write audio and dialogue

Match every sound to something present in the scene. Include relevant ambience, clothing or prop Foley, breathing, voice weight, pace, pitch, tremor, and pauses.

Do not invent dialogue when silence communicates the idea more strongly. When dialogue is used, state the exact line and keep lip movement compatible with it.

## Deliver the result

### Complete video mode output

Return:

1. Creative interpretation and assumptions
2. Exact duration, plus aspect ratio and source identity
3. Character description and identity lock
4. Scene and environment
5. Dramatic motivation and concealed subtext
6. Visual style, camera, lighting, focus, and spatial relationships
7. Exact chronological timeline
8. Audio and dialogue
9. Tailored negative constraints
10. One consolidated copy-ready prompt
11. English version only when requested or clearly useful

Before the copy-ready prompt, provide one brief labeled `Duration rationale` sentence that names the beats requiring the chosen length. Keep this rationale outside the prompt block. The prompt block itself must state the exact duration, but must not contain duration-selection commentary, planning logic, or explanatory notes intended for the user.

### Performance block output

Return:

1. Performance intent
2. Exact duration and a compact camera plan only when the user has not already supplied one
3. Chronological facial, breath, body, and voice performance
4. Tailored negative constraints
5. Three-axis control notes

When existing scene or camera instructions are in scope, output the performance block as insert-ready text and preserve those instructions unchanged.

### Quick mode

When the user says “快速”, “直接出”, or gives a usable brief, infer missing details and return the copy-ready prompt first. Do not delay delivery with optional questions.

## Quality check

Verify before delivery:

1. The prompt is complete at the scope selected by routing
2. Every standalone video prompt states an exact total duration
3. Vague input has been expanded into a specific adult character and coherent scene
4. Trigger, goal, obstacle, protective strategy, and subtext explain the performance
5. Emotion has recognition, resistance or leakage, apex, and residue when duration permits
6. Facial actions are visible and anatomically compatible
7. Internal pressure, outward amplitude, and self-control are distinguishable
8. Character, clothing, face, age, and environment remain consistent
9. Camera and lighting respond to emotional beats without hiding the face
10. Eyeline and off-screen spatial relationships are explicit when another person is implied
11. Audio corresponds to visible sources
12. Negative constraints target likely identity, anatomy, motion, lighting, and style failures
13. The final prompt contains no unresolved placeholders
14. Performance block mode does not overwrite a scene, camera, or lighting plan the user already has
15. Duration is derived from the selected dramatic beats, dialogue, and platform limits rather than a category default
16. Complete video mode includes an explicit duration rationale outside the copy-ready prompt, while the prompt itself contains only the exact duration and executable generation instructions
