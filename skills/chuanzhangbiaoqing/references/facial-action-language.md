# Facial action language

Use this reference to translate emotion into visible anatomy. Keep Action Unit labels optional in the final production prompt.

## Intensity scale

1. Trace: visible mainly in close-up
2. Mild: readable but restrained
3. Clear: obvious conversational expression
4. Strong: dramatic performance with preserved anatomy
5. Extreme: use only when the scene requires loss of control

## Common facial actions

| Region | Visible action | FACS shorthand | Prompt language |
|---|---|---:|---|
| Brow | inner brows lift | AU1 | inner ends of the brows rise slightly, forming faint vertical tension |
| Brow | outer brows lift | AU2 | outer brow arches rise |
| Brow | brows draw together and lower | AU4 | brows knit and press downward |
| Eye | upper lids rise | AU5 | upper eyelids lift, exposing more of the iris |
| Eye | cheeks lift | AU6 | cheeks rise and create soft creases near the outer eyes |
| Eye | lids tighten | AU7 | lower lids firm and the eyes narrow |
| Nose | nose wrinkles | AU9 | bridge of the nose wrinkles and upper lip lifts slightly |
| Lip | upper lip lifts | AU10 | upper lip rises and deepens the nasolabial fold |
| Lip | corners pull up | AU12 | lip corners rise |
| Lip | corners pull down | AU15 | lip corners turn down with chin tension |
| Lip | lower lip lifts | AU16 | lower lip pushes upward |
| Lip | chin tightens | AU17 | chin dimples and lower lip protrudes slightly |
| Lip | lips stretch sideways | AU20 | mouth corners stretch laterally |
| Lip | lips tighten | AU23 | lips narrow under tension |
| Lip | lips press together | AU24 | lips compress into a sealed line |
| Mouth | lips part | AU25 | lips separate without a large jaw drop |
| Jaw | jaw drops | AU26 | jaw lowers and the mouth opens |
| Mouth | lips purse | AU18 | lips gather forward into a small purse |
| Mouth | lips funnel | AU22 | lips round into a broader funnel |
| Eye | blink or eye closure | AU45 | eyelids close briefly or remain shut |

## Reliable combinations

### Genuine restrained amusement

Use mild cheek lift and lip corner rise, with slightly narrowed outer eyes. Add a delayed asymmetry at one lip corner. Avoid an instant full tooth smile.

### Hurt held back

Use lifted inner brows, mild lower lid tension, lips pressed then released, and chin tension. Keep the jaw small and let eye moisture rise without immediate tears.

### Disappointment

Begin with attentive eyes, then reduce focus and lower the gaze. Add a soft inner brow lift, slight lip corner drop, jaw release, and a longer exhale.

### Anger

Use lowered knitted brows, tightened lids, pressed lips or a firm jaw, and stable direct fixation. Widening the eyes too much changes the read toward fear or shock.

### Fear or alarm

Use lifted brows, raised upper lids, tense lower lids, parted lips, and a brief inhale. Preserve lower lid tension so the expression does not read as simple surprise.

### Disgust

Use nose wrinkle, upper lip lift, slight head withdrawal, and narrowed eyes. Keep lip corner rise out unless contempt or amusement is intended.

### Contempt

Use a unilateral lip corner tighten or lift, mild lid tension, and a small sideways gaze. Preserve asymmetry.

### Emotional numbness

Reduce facial activity instead of erasing it. Use unfixed gaze, slower blinks, a softly released jaw, minimal lip movement, and delayed reaction.

## Conflict checks

1. Strong cheek lift plus fully widened eyes often looks anatomically inconsistent
2. A broad symmetric smile weakens grief, contempt, and restrained anger
3. Strong jaw drop and tight lip compression cannot occupy the same instant
4. Completely relaxed brows weaken intense anger
5. Maximum inner brow lift with a broad smile often reads as stylized pleading
6. Perfect bilateral symmetry looks posed or synthetic
7. Repeated identical blinks and constant eye contact look mechanical

## Plain language first

Write production prompts with anatomy and motion. Example:

`Her gaze fixes on the other person; the brows draw slightly inward, lower lids firm, lips compress for half a second, then part as the jaw sets.`

Optional diagnostic note:

`Approximate FACS: AU4 B, AU7 B, AU24 B, followed by AU25 A.`
