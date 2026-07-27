# Complete character video framework

Use this reference whenever the request is vague or asks for a complete AI video prompt.

## Required elements

### 1. Video specification

State exact duration, aspect ratio, intended generation mode, and material source identity.

Examples of source identity:

1. A controlled period-drama close-up captured by a patient camera operator
2. A contemporary phone video recorded by a close friend
3. A professional documentary observation using available light
4. A fixed surveillance view unknown to the character
5. A worn consumer DV recording from a specific era

Let the source identity determine lens behavior, stability, focus, exposure, framing, and sound.

Do not rely on the phrase “cinematic quality” by itself. Pair any broad style label with concrete lens behavior, light direction, contrast, texture, camera stability, and color response.

### 2. Character

Describe only visible details:

1. Explicit adult age
2. Face shape, brows, eyes, nose, lips, and skin texture only when useful for continuity
3. Hair construction and loose strands
4. Makeup behavior under the chosen light
5. Garment color, material, cut, layers, footwear, and accessories
6. Temperament cue that drives posture
7. Identity and costume consistency lock

### 3. Scene

Start with time and place. Add six to ten mutually supporting elements, including foreground, middle ground, background, surfaces, practical light sources, weather or air, and one moving environmental detail.

For a historical setting, keep architecture, objects, fabrics, light sources, and sound consistent with the chosen period. Avoid modern signage, plastics, electrical fixtures, or contemporary makeup unless intentionally stylized.

### 4. Dramatic engine

Write:

`trigger + goal + obstacle + protective strategy + concealed subtext`

Example expansion for “古代美女崩溃”:

1. Trigger: a blood-stained letter proves that the person she waited for will never return
2. Goal: preserve composure long enough to dismiss the servant and remain alone
3. Obstacle: grief is already disrupting breath and focus
4. Protective strategy: press the letter flat, hold the jaw still, and deny the loss
5. Concealed subtext: if she speaks the truth aloud, the loss becomes final

Treat this only as one creative option. Choose a different trigger when the user's tone implies betrayal, fear, shame, relief, or rage.

### 5. Three-axis acting control

Record:

1. Internal emotional pressure
2. Outward expression amplitude
3. Self-control

Example for restrained breakdown:

`internal pressure 5/5, outward amplitude rising from 1/5 to 4/5, self-control falling from 5/5 to 1/5`

Translate the curve into gaze, blink, brows, eyelids, cheeks, lips, jaw, breath, posture, hands, and voice. Numbers belong in control notes and should never replace visible language.

### 6. Camera and light

Specify shot size, camera height, angle, lens feel, eyeline, screen direction, focus target, movement, stopping point, key light, fill or shadow, practical lights, and negative space.

Automatic choices:

1. Suppressed hurt: eye-level close-up, slow push-in during breath catch, soft side light
2. Disappointment: three-quarter close-up, slow pull-back, growing negative space, cooling background
3. Anger: frontal close-up, slight low angle, small push then locked frame, harder side light
4. Breakdown: tight close-up, slight handheld drift, one restrained reactive jolt, unstable practical flame or moving shadow
5. Numbness: locked profile or three-quarter close-up, no push-in, long hold, low-contrast side light and empty space
6. Intimacy: eye-level close-up, warm soft source, shallow focus, restrained push-in after mutual eye contact

### 7. Adaptive duration selection

Choose duration after defining the scene and dramatic engine.

1. Respect an explicit user duration or platform limit first
2. List the beats that must be visible
3. Remove any beat that does not materially change the performance
4. Estimate natural dialogue time from the actual line and include pre-speech and post-speech pauses
5. Give recognition, gaze shifts, breath changes, and restrained mouth actions enough time to be read
6. Add establishment time only when the environment contributes meaning
7. Preserve at least one residue beat after the apex
8. Choose the shortest supported duration that can contain the remaining beats without rushed acting

Useful estimation ranges:

1. 3 to 4 seconds for one close-up recognition or microexpression with no scene development
2. 5 to 6 seconds for recognition, concealment, and residue, or one short line
3. 7 to 9 seconds for an approach, interaction, short exchange, or multi-stage emotional response
4. 10 to 15 seconds for environment establishment, multiple actions, several characters, or a major emotional reversal

Treat these only as planning ranges. The final prompt must state one exact duration. Explain why that duration fits the chosen beats in a brief note outside the copy-ready prompt.

Before the prompt block, write a labeled sentence in this form:

`Duration rationale: X seconds are needed for [beat 1], [beat 2], [beat 3], and [residue or closure].`

### 8. Timeline

Use exact ranges. Choose a structure that fits duration.

#### Example five-second allocation

1. 0.0 to 0.8: baseline
2. 0.8 to 1.7: recognition
3. 1.7 to 2.8: resistance and leakage
4. 2.8 to 3.8: line or apex
5. 3.8 to 5.0: residue

#### Example eight-second allocation

1. 0.0 to 1.2: world and baseline
2. 1.2 to 2.5: trigger recognition
3. 2.5 to 4.0: resistance and first physiological leak
4. 4.0 to 5.6: escalation
5. 5.6 to 6.8: apex or decision
6. 6.8 to 8.0: residue and ending

#### Example ten-second allocation

1. 0.0 to 1.5: environment and baseline action
2. 1.5 to 3.0: trigger
3. 3.0 to 4.8: processing and resistance
4. 4.8 to 6.5: leakage and body response
5. 6.5 to 8.2: apex, dialogue, or decision
6. 8.2 to 10.0: residue and motivated closure

Do not change every facial region, camera, lighting, and environment at the same instant.

### 9. Audio

Use three layers:

1. Environment: wind, rain, insects, street noise, room tone, fire, distant activity
2. Foley: fabric, jewelry, paper, cup, footsteps, wood, metal, bedding
3. Performance: breath, swallow, lip separation, voice, crying pressure, silence

Keep audio synchronized with visible sources. Decide explicitly whether music, narration, and subtitles are absent or present.

### 10. Negative constraints

Tailor constraints across five categories:

1. Identity: no face drift, age change, costume mutation, hair change
2. Anatomy: no rubber mouth, melted features, mismatched eyes, extra fingers
3. Acting: no instant maximum emotion, generic crying, random blinking, mechanical head motion
4. Camera: no unmotivated orbit, uncontrolled zoom, repeated focus hunting, excessive shake
5. World: no period errors, random people, text, watermark, commercial elements, or unrelated props

## Vague brief decision rules

For `character + emotion`, infer the missing layers:

1. Choose a plausible trigger that makes the emotion specific
2. Give the character a goal that conflicts with the emotion
3. Place the character in a scene where props and environment can participate
4. Pick one primary emotion and one undertone
5. Select duration from the required beats and use the shortest readable result
6. Choose one motivated camera movement and one motivated environmental response
7. End on residue rather than the emotional peak

For `character + action`, infer why the action matters and what changes internally.

For `scene + mood`, introduce an adult character only when the request implies character performance. Otherwise keep the scene primary.

## Copy-ready template

```text
Total duration and aspect ratio:
Material source identity:

Character:

Scene and environment:

Dramatic motivation:

Visual style, camera, lighting, focus, and spatial relationships:

Timeline:

Audio and dialogue:

Negative constraints:

Soul anchor:
```
