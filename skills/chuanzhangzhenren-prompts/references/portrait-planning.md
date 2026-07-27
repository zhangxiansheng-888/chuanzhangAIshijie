# Portrait Planning Reference

Use this reference when a task needs more than one prompt, when the user wants an SOP, or when the portrait involves couples, contact, hands, or 3x3 grids. For lens, aperture, lighting, tone, and photography-language conversion, combine this with `photography-brief.md`. For variable maps and texture vocabulary, combine it with `variables-and-texture.md`.

## Minimum Prompt Skeleton

```text
请只把上传照片作为人物身份参考，用于保留本人真实长相。不要保留原照片里的背景、衣服、道具、坐姿、拍摄环境和原始构图。请重新生成一张全新的写真。

请严格保留人物真实身份特征，包括脸型、五官比例、眉眼结构、眼睛、鼻子、嘴唇、肤色、年龄感、发际线、发型基础和整体气质。不要把人物变成陌生人，不要欧美化，不要网红化，不要过度美颜，不要生成 AI 假脸。

[图像用途]
[写真风格与场景]
[主体气质]
[构图机位、镜头焦段感、景深]
[光线设计、色调锚点、真实感细节]
[发型变量]
[妆容体系]
[服装配色、配饰、道具]
[镜头构图、表情、眼神]
[身体比例、手部、空间关系]
[负面约束]
```

## Variables

### Identity

- face shape
- facial proportion
- brow and eye structure
- eye shape and expression
- nose and lip structure
- skin tone and skin texture
- age feel
- hairline and base hairstyle
- overall temperament

### Hair

Keep hair close to the reference person's base system.

- Length: short stays short, medium stays medium, long stays long.
- Bangs: keep bangs if present; do not force thick bangs on a no-bangs person.
- Color: if the reference hair is black, prefer deep brown black, black tea brown, or soft dark coffee instead of dead black.
- Allowed optimization: volume, layers, soft flyaway hair, curl direction, end shape, transparency.
- Avoid: large length change, forced bangs, unrelated hair color, plastic wig texture.

### Makeup

Makeup should carry the style, but must not erase identity.

For playful Korean girl portraits:

```text
韩系鬼马少女感妆容，清透奶油肌底妆，保留自然真实质感；自然柔和平眉；浅粉棕或蜜桃粉眼妆；卧蚕自然明显；睫毛纤长清晰；眼线细而自然；大面积粉色或蜜桃粉腮红，从脸颊延伸到眼下，并带一点鼻尖红晕；嘴唇为水润草莓粉、蜜桃粉或柔和玫瑰粉。
```

Control points:

- Eye-under-to-cheek blush creates liveliness.
- Watery but light lips keep the face fresh.
- In a set, keep the makeup direction unified with only slight changes.

### Memory Points

Choose 1-3 visible hooks, not a pile of props.

- transparent jelly hair clips
- star hair clips
- acrylic flower clips
- colored bead rings
- marshmallow
- bubble machine
- toy camera
- plush toy
- colored popsicle
- milkshake cup
- hand close-up
- cheek-to-cheek detail
- sleeve, collar, necklace, or hairpin detail

Always add:

```text
不要照搬参考图里的服装和道具，请进行二创设计。
```

## Shot Tables

A set should feel like selected frames from one shoot. Generate single images and pick the best results when quality matters.

### 3x3 Single Portrait Set

```text
01 正面半身，轻微抬眼看镜头，淡淡笑意
02 半侧脸近景，低头笑，像刚被逗到
03 侧脸中近景，看向画面外侧，情绪安静
04 手部局部特写，手拿道具，脸部轻微虚化
05 坐姿半身，身体偏向一侧，眼神看向镜头外
06 贴近镜头的脸部特写，允许轻微不对称
07 转头瞬间抓拍，头发有自然动态
08 道具互动，笑容正在展开
09 安静收束页，正面近景，眼神柔和
```

### Couple Portrait Set

```text
01 正面贴近双人半身，两人情绪轻松
02 女生从背后环抱男生，男生闭眼大笑
03 环抱但情绪收一点，两人低头轻笑
04 男生单人页，女生的手从画面边缘轻托他的脸
05 女生单人页，男生的手自然搭在她肩侧
06 贴脸特写，一人看镜头，一人看对方
07 牵手或手部细节特写
08 肩靠肩收束页，两人看向镜头外
09 一人从另一人肩后探出脸，像真实互动中被拍到
```

## Relationship Control

Write the movement inside the relationship.

Use:

```text
谁更主动，谁在回应，谁看镜头，谁看对方，谁闭眼笑，谁被逗笑，谁在承接对方靠近。
```

Avoid:

```text
亲密情侣合照
甜蜜互动
自然恩爱
```

Better example:

```text
女生从背后抱住男生，男生闭眼大笑，像被她逗到忍不住笑出来。女生也低头笑，把脸靠近男生肩后，动作像刚刚发生，而不是摆好再拍。
```

## Gaze And Expression Rhythm

A real set should vary gaze and expression:

- looking at camera, calm and warm
- looking at the other person, soft and focused
- looking outside the frame, like an emotion just moved
- eyes closed and lightly smiling
- low-head smile
- upward glance
- face peeking from behind shoulder
- half-face close-up

Captured-moment language:

```text
动作像正在发生，而不是已经完成后静止摆拍；表情像情绪刚刚流动出来；允许不完全看镜头；允许轻微不对称；允许刚靠近、刚转头、刚低头笑、刚抱住、刚贴脸的一瞬间；允许笑容正在展开或刚刚收住。
```

## Contact And Anatomy

For touch, specify:

- who is left and right
- who is foreground and background
- who is closer to the camera
- left hand or right hand
- where the hand touches
- where faces overlap or lean
- body proportion and natural contact

Example:

```text
男生坐在前景偏左位置，女生坐在他后方偏右位置。女生从男生肩后探出脸看向镜头，右手轻轻搭在男生右肩上。男生低头轻笑，看向画面左下方。
```

Proportion block:

```text
请特别注意两个人的脸部比例、头身比例、肩宽、脖颈长度、手臂长度、手掌大小和整体体态都要自然协调。两个人贴脸、靠肩、环抱、托脸、牵手时，身体接触必须符合真实人体结构，不要出现手臂穿插、身体重叠错误、脸部融合或 AI 拼接感。
```

## Negative Constraint Block

Use only the parts that fit the task.

```text
不要把人物变成陌生人，不要欧美化，不要网红化，不要过度美颜，不要生成 AI 假脸。不要保留原照片里的背景、衣服、道具、坐姿、拍摄环境和原始构图。不要出现相同角度、相同站位、相同构图和相同姿势的重复。不要出现塑料皮肤、过度磨皮、五官融合、脸部比例错误、手指错误、手臂穿插、身体重叠错误、脸部融合、AI 拼接感。
```

## Practical Defaults

- Use single-image generation for final quality; use 3x3 grids only for fast exploration.
- Keep one style system per set.
- Let props create memory, not clutter.
- Use specific camera language, but avoid irrelevant lens lists.
- Put the most important instruction near the beginning and repeat critical constraints near the end.
