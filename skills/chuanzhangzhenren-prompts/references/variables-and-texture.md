# Variables And Texture Reference

Use this reference when the user says the skill is not comprehensive, asks for variables, texture, reading methods, writing methods, fill-in templates, or wants to turn an article/reference style into a reusable portrait prompt system. For face anchors, makeup systems, filter recipes, and identity constraints, combine this with `face-makeup-filter.md`.

Core idea: do not dump every variable into one prompt. Read the task, extract the variables, choose the minimum useful combination, then write a prompt that feels like a real photography plan.

## Read The User Input

Parse any request into this variable map:

```text
1. 图像用途: 头像 / 职业写真 / 生活方式 / 杂志风 / 商业美妆 / 校园写真 / 情侣写真 / 九宫格 / 封面
2. 人物身份: 年龄安全表达 / 地区气质 / 职业或生活状态 / 单人或双人
3. 人物气质: 松弛 / 清爽 / 克制 / 温柔 / 专注 / 自信 / 疏离 / 活泼 / 鬼马
4. 场景: 地点 / 时间 / 季节 / 前景 / 中景 / 背景 / 可识别信息
5. 动作: 正在做什么 / 手在哪里 / 身体朝向 / 动作是否正在发生
6. 表情眼神: 看镜头 / 看镜头外 / 低头 / 回头 / 闭眼笑 / 轻微笑 / 大笑
7. 镜头: 构图 / 机位 / 焦段感 / 景深 / 背景保留多少信息
8. 光线: 光源类型 / 方向 / 质地 / 阴影 / 眼神光 / 高光过渡
9. 色调: 胶片锚点 / 商业干净 / 中性杂志 / 暖白 / 低饱和 / 夜景霓虹
10. 脸部细节: 脸型 / 五官比例 / 眉眼结构 / 鼻子 / 嘴唇 / 肤色 / 年龄感 / 发际线
11. 妆容: 底妆 / 眉毛 / 眼妆 / 卧蚕 / 睫毛 / 眼线 / 腮红 / 唇色
12. 滤镜: 对比度 / 柔焦 / 颗粒 / 光晕 / 高光过渡 / 光学散景 / 背景可识别度
13. 质感: 皮肤 / 眼睛 / 头发 / 布料 / 背景虚化 / 高光 / 空气感 / 颗粒
14. 身份保留: 脸型 / 五官比例 / 眉眼结构 / 肤色 / 年龄感 / 发型基础 / 气质
15. 负面约束: 假脸 / 网红脸 / 欧美化 / 过度美颜 / 手部错误 / 过度虚化 / 棚拍感
```

Decision rule:

- If only a rough idea is given, infer a safe and coherent combination.
- If a photo is provided, prioritize identity preservation before style.
- If a style article or reference text is provided, extract variables rather than copying phrasing.
- If the user asks for "全面", show variable map + selected variables + final prompt.
- If the user asks for a direct prompt, output the final prompt only, with a short control note.

## Writing Modes

### Fast Mode

Use for simple requests.

```text
用途 + 主体 + 场景 + 构图机位 + 光线 + 色调 + 真实质感 + 负面约束
```

### Complete Mode

Use for higher-quality single images.

```text
图像用途 -> 人物身份和气质 -> 场景层次 -> 动作和表情 -> 构图机位 -> 镜头焦段感 -> 景深背景 -> 光线方向和质地 -> 服装妆发 -> 色调风格 -> 真实质感 -> 负面约束
```

### Photo Reference Mode

Use when the user uploads a real person photo.

```text
只把上传照片作为身份参考 -> 身份锚点 -> 不保留原图背景/衣服/姿势 -> 新写真企划 -> 发型变量 -> 妆容风格 -> 镜头和光线 -> 真实质感 -> 负面约束
```

### Set Mode

Use for 3x3 grids, group photos, or a series.

```text
统一设定 -> 镜头表 -> 每张差异 -> 全局提示词 -> 单张补充提示词
```

### Repair Mode

Use when the user says the result is fake, not like the person, repetitive, or too AI.

```text
问题诊断 -> 缺失变量 -> 需要加强的约束 -> 修复版提示词
```

## Variable Library

### Image Purpose

- 社交媒体头像: 脸清楚, 眼神稳, 背景干净.
- 职业写真: 可信, 自然, 专业, 有亲和力.
- 杂志风人像: 构图, 留白, 气质, 整体氛围.
- 商业广告: 光线干净, 皮肤稳定, 画面控制感强.
- 生活方式人像: 自然, 松弛, 像真实场景中拍到.
- 黑白纪实: 情绪, 纹理, 人物状态, 现场感.
- 夜景电影感: 光色, 暗部, 空气感, 氛围.
- 校园写真: 青春, 干净, 场景可识别, 非性感化.
- 情侣写真: 关系流向, 主动回应, 眼神交流, 身体归属.

### Subject Identity

- 18 岁以上中国大学女生
- 年轻中国女性创作者
- 中国职场女性
- 中国创业者
- 普通上班族
- 设计师气质女性
- 街头路人感年轻女性
- 运动创作者

Keep minors or ambiguous-age subjects non-sexual, everyday, and age-appropriate. Prefer "18 岁以上" for youthful portrait prompts.

### Temperament

- 自然松弛
- 清爽明亮
- 克制冷静
- 干练专业
- 亲和温柔
- 高级疏离
- 沉稳成熟
- 活泼鬼马
- 安静专注
- 青春洋溢

### Expression And Gaze

- 平静直视镜头
- 看向镜头旁边一点点
- 微微低头看书或道具
- 回头的一瞬间
- 闭眼轻笑
- 被逗笑后的自然大笑
- 轻微害羞但放松
- 若有所思但温柔
- 笑容刚刚展开
- 笑容刚刚收住

### Composition

- face close-up: 美妆, 情绪特写.
- bust-up: 头像, 风格人像.
- half-body: 职业写真, 生活方式.
- three-quarter body: 时尚, lookbook, 场景关系.
- full-body: 造型, 服装, 环境关系.
- cover composition: 封面, 留白, 标题空间.
- candid offset framing: 抓拍感偏移构图.
- over-the-shoulder: 互动或纪实感.

### Camera Angle

- 平视: 最稳, 真人感强.
- 略高机位: 亲近, 清爽, 校园和生活方式常用.
- 略低机位: 力量感, 时尚感, 少用.
- 正面直视: 头像和职业照.
- 45 度侧面: 情绪和杂志风.
- 轻微偏移机位: 生活抓拍感.

### Lens Feel

- 24mm: 环境人像, 空间感强, 透视明显.
- 35mm: 街头, 纪实, 故事感, 有现场距离.
- 50mm: 自然均衡, 生活方式人像.
- 85mm: 经典人像, 脸部比例稳, 背景干净.
- 105mm: 美妆, 商业特写, 压缩感强.
- 135mm: 克制疏离, 背景压缩明显.

Write the lens as visible effect:

```text
50mm natural perspective, balanced facial proportions, realistic everyday distance
85mm portrait lens look, natural facial proportions, clean background separation
```

### Depth Of Field

- f/1.4 feel: 梦幻, 强虚化, 但容易假.
- f/1.8 feel: 氛围, 夜景, 情绪人像.
- f/2 feel: 人物突出, 生活方式和风格人像.
- f/2.8 feel: 稳定, 脸清楚, 背景适度柔化.
- f/4 feel: 服装, 场景, 道具信息保留更多.
- deep depth of field: 纪实, 环境人像, 街头场景.

Default for realism:

```text
f/2.8 feel, moderate shallow depth of field, face sharp, background still recognizable
```

### Lighting

- soft window light: 自然, 日常, 皮肤舒服.
- large diffused window light: 像大柔光箱, 职业写真.
- overcast soft light: 都市, 低对比, 稳定.
- golden hour backlight: 温暖, 柔和, 户外氛围.
- clamshell lighting: 美妆, 商业, 眼神光明显.
- hard direct light: 时尚, 强烈, 戏剧化.
- neon and tungsten mixed light: 夜景, 电影感, 城市氛围.
- available light: 纪实, 现场感, 少控制.
- tree-filtered sunlight: 校园/公园, 树影光斑, 青春感.
- side backlight: 头发边缘光, 空气感.

Write light as direction + texture + face effect:

```text
soft natural light from the left side, gentle shadow falloff, natural catchlights in the eyes
warm side backlight through tree leaves, soft rim light on hair, natural highlight roll-off
```

### Tone Anchors

- Kodak Portra 400: 柔和肤色, 生活方式, 自然胶片感.
- Kodak Gold 200: 温暖, 阳光, 轻复古.
- Fujifilm Classic Chrome: 低饱和, 城市, 克制, 杂志感.
- Fujifilm Eterna: 柔和, 叙事, 电影感.
- CineStill 800T: 夜景, 霓虹, 钨丝灯, 轻微光晕.
- Ilford HP5: 黑白纪实, 颗粒, 人物状态.
- neutral editorial tone: 中性, 干净, 职业和杂志人像.
- clean commercial tone: 商业广告, 美妆, 干净肤色.
- light warm campus tone: 暖白, 浅绿, 低对比, 清爽校园感.

Use one main tone anchor. Do not stack multiple film stocks.

## Texture Vocabulary

Use texture words to make "realistic" visible.

### Skin Texture

- natural skin texture
- subtle pores
- slight facial asymmetry
- natural skin tone variation
- not over-retouched
- no plastic skin
- clean but not waxy skin
- light peach-fuzz detail

Chinese:

```text
皮肤保留自然纹理、轻微毛孔和真实肤色变化，修饰干净但不过度磨皮，不要塑料皮肤。
```

### Eye Texture

- realistic catchlights
- focused gaze
- soft eye moisture
- natural eyelid detail
- no unnatural catchlights
- no empty stare

Chinese:

```text
眼睛有自然眼神光，目光真实聚焦，不要空洞眼神或不自然高光。
```

### Hair Texture

- natural flyaway hairs
- soft hair volume
- visible hair strands
- translucent edge light on hair
- deep brown black / black tea brown / soft dark coffee
- no plastic wig texture
- no dead black hair

Chinese:

```text
头发为自然黑茶色或深棕黑，发丝有轻微蓬松感、自然碎发和边缘透光，不要死黑或假发质感。
```

### Fabric Texture

- real fabric texture
- cotton shirt texture
- soft knit texture
- canvas bag texture
- natural folds
- sleeve and collar detail
- no plastic clothing

Chinese:

```text
服装有真实布料纹理、自然褶皱和衣领袖口细节。
```

### Background Texture

- optical bokeh, not artificial blur
- background still recognizable
- layered background
- distant students softly blurred
- recognizable campus track/building/trees
- no studio backdrop feeling

Chinese:

```text
背景柔和虚化但仍能识别场景信息，虚化像真实镜头光学散景，不要人工糊背景。
```

### Light Texture

- natural highlight roll-off
- gentle shadow falloff
- soft diffusion
- subtle halation
- restrained glow
- low contrast
- soft rim light
- leaf-shaped light spots

Chinese:

```text
高光过渡自然，阴影柔和，光线有轻微扩散感但不过曝。
```

### Atmosphere Texture

- subtle film grain
- clean air perspective
- soft haze
- gentle backlit atmosphere
- campus afternoon air
- warm white and light green color mood

Chinese:

```text
画面有轻微空气感、非常淡的胶片颗粒和清透低对比色调。
```

## Style Recipes

For makeup and filter recipes, read `face-makeup-filter.md` before producing final prompt.

### Campus Fresh Portrait

Use for Chinese campus girl, reading, playground, library, classroom, graduation season.

```text
18 岁以上中国大学女生 + 校园生活方式人像 + 50mm natural perspective + f/2.8 feel + tree-filtered sunlight / soft side backlight + light warm campus tone + natural skin texture + fabric texture + recognizable campus background
```

### Misty Soft Portrait

Use for 朦胧滤镜 without fake blur.

```text
moderate shallow depth of field + optical bokeh + soft diffusion + low contrast + natural highlight roll-off + subtle film grain + background still recognizable
```

### Clean Professional Portrait

```text
85mm portrait lens look + half-body + eye-level angle + large diffused window light + neutral editorial tone + calm confident expression + natural skin texture + real fabric texture
```

### Film Lifestyle Portrait

```text
50mm natural perspective + f/2 feel + large window natural light + Kodak Portra 400 inspired tone + relaxed expression + subtle grain + real fabric texture
```

### Black-And-White Documentary

```text
35mm or 50mm + available light + Ilford HP5 inspired monochrome + subtle grain + slight facial asymmetry + candid atmosphere
```

### Cinematic Night Portrait

```text
85mm portrait lens look + f/1.8 feel + mixed neon and tungsten practical lights + CineStill 800T inspired tone + subtle halation + restrained neon glow + realistic skin under mixed lighting
```

### Playful Korean Girl Portrait

```text
身份锚点 + 发型三变量 + 韩系鬼马少女妆容 + 1-3 个记忆点道具 + 抓拍表情 + 不网红化 + 不照搬参考图
```

### Couple Relationship Portrait

```text
双人身份锚点 + 谁主动谁回应 + 看镜头/看对方/看镜头外 + 左右前后 + 手部归属 + 接触点 + 人体比例约束
```

## Prompt Assembly Rules

1. Choose one purpose.
2. Choose one subject identity and one temperament.
3. Choose one composition, one angle, one lens feel, and one depth-of-field feel.
4. Choose one lighting setup and describe direction + face effect.
5. Choose one tone anchor.
6. Choose 3-5 texture details, not all of them.
7. Add identity preservation only when a photo is provided.
8. Add anatomy/contact constraints only when hands, couples, contact, or close-up body parts appear.
9. Add negative constraints that match the risk. Do not paste every negative word by default.

## Completeness Checklist

Before final output, check:

- Does the prompt say what the image is for?
- Is the subject more specific than "girl/person"?
- Is the scene readable?
- Are composition, angle, lens feel, and depth of field present?
- Does the light have direction and texture?
- Is there one clear tone anchor?
- Are realism details tied to visible body/material parts?
- Are hands, props, contact, or body ownership clear?
- Are the main failure modes blocked?
- Does the final prompt still read naturally, not like a dumped keyword list?
