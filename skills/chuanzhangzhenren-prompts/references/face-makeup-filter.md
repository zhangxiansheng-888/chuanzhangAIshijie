# Face Makeup Filter Reference

Use this reference when the user asks for face details, makeup, filters, identity preservation, "不像本人", "网红脸", "AI假脸", "朦胧滤镜", "胶片感", or any style where the face must feel real.

Do not treat "pretty" as the goal. The goal is: recognizable identity, coherent makeup, believable retouching, and a filter that behaves like photography.

## Face Reading Order

When a real reference photo is used, read the face in this order and preserve it before applying style:

```text
脸型 -> 五官比例 -> 眉眼结构 -> 眼睛形态 -> 鼻子结构 -> 嘴唇结构 -> 肤色和肤质 -> 年龄感 -> 发际线 -> 发型基础 -> 整体气质
```

Identity anchor block:

```text
请严格保留人物真实身份特征，包括脸型、面部轮廓、下颌线、颧骨位置、五官比例、眉眼结构、眼睛形态、鼻梁和鼻翼结构、嘴唇厚薄和嘴角形态、肤色、真实年龄感、发际线、发型基础和整体气质。
```

Negative identity block:

```text
不要把人物变成陌生人，不要改成网红脸，不要欧美化，不要把脸型改成统一小 V 脸，不要过度抬高鼻梁，不要放大眼睛，不要削弱原本的年龄感，不要过度美颜，不要生成 AI 假脸。
```

## Face Detail Variables

### Face Shape And Structure

- oval face, round face, long face, square face, heart-shaped face
- natural jawline
- soft cheekbone structure
- original cheek volume
- realistic chin shape
- natural face width
- slight facial asymmetry
- realistic facial detail

Chinese phrasing:

```text
保留原本脸型、自然下颌线、颧骨位置、面部宽窄比例和轻微真实不对称，不要统一改成尖下巴小 V 脸。
```

### Brow And Eye Structure

- brow shape and brow spacing
- brow-eye distance
- eyelid structure
- eye shape and eye size
- inner and outer eye corners
- natural under-eye area
- realistic catchlights
- focused gaze
- no empty stare

Chinese phrasing:

```text
保留眉形、眉眼间距、眼睛形态、眼角走势和眼神气质；眼睛有自然眼神光，不要夸张大眼、假眼神光或空洞凝视。
```

### Nose Structure

- nose bridge height
- nose tip shape
- nostril/nose wing width
- natural nose shadow
- no over-sculpted nose

Chinese phrasing:

```text
保留鼻梁高度、鼻头形态和鼻翼宽度，鼻影自然，不要过度立体化或欧美化高鼻梁。
```

### Lip Structure

- lip thickness
- cupid's bow
- mouth width
- mouth corner shape
- natural lip texture
- soft lip moisture

Chinese phrasing:

```text
保留嘴唇厚薄、唇峰、嘴角走势和嘴部比例，唇妆水润但不要厚重。
```

### Skin And Age Feel

- natural skin texture
- subtle pores
- skin tone variation
- light peach-fuzz detail
- clean but not waxy skin
- true age feel
- no plastic skin
- not over-retouched

Chinese phrasing:

```text
皮肤干净但保留自然纹理、轻微毛孔、真实肤色变化和年龄感，不要塑料皮肤、蜡像感或过度磨皮。
```

## Makeup Systems

Makeup is a style anchor. Keep one makeup direction across a set. Do not let makeup erase identity.

### Clean Campus Makeup

Use for campus, reading, playground, library, youthful but adult portraits.

```text
清淡校园感妆容，底妆轻薄干净但保留真实皮肤质感；自然柔和眉形；极淡粉棕眼影；卧蚕自然不夸张；睫毛清晰但不浓密；眼线细而自然；腮红很淡，集中在脸颊自然泛红位置；嘴唇为自然豆沙粉、蜜桃粉或淡玫瑰粉，水润但不厚重。
```

Avoid:

```text
不要浓妆、不要网红妆、不要舞台妆、不要夸张眼影、不要过度粉嫩低龄化。
```

### Korean Playful Girl Makeup

Use for 鬼马少女, cute-but-real portraits.

```text
韩系鬼马少女感妆容，清透奶油肌底妆，保留自然真实质感；自然柔和平眉；浅粉棕或蜜桃粉眼妆；卧蚕自然明显；睫毛纤长清晰；眼线细而自然；大面积粉色或蜜桃粉腮红，从脸颊延伸到眼下，并带一点鼻尖红晕；嘴唇为水润草莓粉、蜜桃粉或柔和玫瑰粉。
```

Control points:

- Eye-under-to-cheek blush creates liveliness.
- Watery but light lips keep the face fresh.
- Nose-tip blush adds playfulness, but use lightly.
- Do not create an unrelated idol face.

### Bare-Face Realism Makeup

Use for 素颜特写, documentary, natural profile photos.

```text
近似素颜的自然妆感，底妆非常轻薄，保留肤色不均、轻微毛孔和真实皮肤纹理；眉毛自然整理；眼妆几乎不可见；嘴唇是自然血色；整体像真实生活中状态很好的一次抓拍。
```

### Professional Clean Makeup

```text
干净职业妆容，底妆均匀但不过度磨皮；眉形清晰自然；眼妆低调，增强精神感；腮红克制；唇色为自然豆沙色或柔和玫瑰色；整体可信、亲和、专业。
```

### Commercial Beauty Makeup

```text
商业美妆妆容，干净稳定的皮肤表现，清晰眼神光，睫毛和眼线精致但不过分，唇部质感清楚，面部高光自然，适合美妆近景特写。
```

### Cinematic Night Makeup

```text
夜景电影感妆容，底妆自然，保留真实肤质；眼妆略微加深但不过脏；唇色为低饱和玫瑰色或豆沙色；皮肤能真实承接霓虹和钨丝灯混合光，不要变成塑料反光。
```

## Filter And Retouching Systems

Filters must describe optical behavior, not just style names.

### Misty Soft Filter

Use for 朦胧滤镜, 校园, 清透, 梦幻但真实.

```text
朦胧清透柔焦滤镜，低对比，柔和高光，轻微扩散光，适度浅景深，真实光学散景，背景仍能识别，空气中有淡淡透光感，非常轻微胶片颗粒，自然高光过渡，不要人工糊背景。
```

Avoid:

```text
不要过度虚化，不要雾到看不清脸，不要磨皮成塑料，不要强行梦幻滤镜，不要廉价美颜相机质感。
```

### Film Lifestyle Filter

```text
自然胶片生活方式滤镜，柔和肤色，低到中等对比，轻微暖调，细腻颗粒，阴影不过黑，高光不过曝，整体像真实胶片扫出来的生活照片。
```

### Muted Editorial Filter

```text
低饱和城市杂志滤镜，色彩克制，阴影干净，肤色自然，背景有秩序，整体安静、有留白、有编辑感。
```

### Clean Commercial Filter

```text
干净商业修图风格，肤色稳定，光线均匀，背景简洁，细节清楚，修饰干净但保留皮肤质感，不要蜡像感。
```

### Documentary Monochrome Filter

```text
黑白纪实滤镜，真实皮肤纹理，细腻颗粒，明暗层次自然，人物状态优先，不要完美美颜。
```

### Cinematic Night Filter

```text
夜景电影滤镜，霓虹和钨丝灯混合光，暗部保留细节，轻微光晕，克制霓虹反光，肤色在混合光下仍真实可信。
```

Add:

```text
restrained neon glow, subtle halation, no excessive halation, no unnatural catchlights
```

## Style Bundles

### Chinese Campus Girl, Soft Mist

```text
18 岁以上中国大学女生；清爽青春但不低龄化；清淡校园感妆容；自然黑茶色头发，真实发丝和边缘透光；50mm 自然视角；f/2.8 feel；树影柔光或操场侧逆光；朦胧清透柔焦滤镜；浅绿色、暖白色和校园红色点缀；真实皮肤纹理、自然眼神光、布料纹理；避免网红脸、动漫感、低龄化、性感化。
```

### Real Bare-Face Close-Up

```text
真实素颜特写；保留脸型、五官比例、眉眼结构、鼻子嘴唇结构和年龄感；近似素颜妆感；85mm portrait lens look；f/2.8 feel；soft window light；natural skin texture, subtle pores, slight facial asymmetry；no plastic skin, no influencer face.
```

### Korean Playful Portrait

```text
身份锚点优先；韩系鬼马少女感妆容；轻薄奶油肌；眼下到脸颊的粉感；水润草莓粉/蜜桃粉唇；透明果冻发夹或彩色串珠戒指等 1-3 个记忆点；抓拍表情；不照搬参考图；不网红化。
```

### Professional Founder Portrait

```text
职业头像或半身写真；干净职业妆容；85mm portrait lens look；f/2.8 feel；large diffused window light；neutral editorial tone；可信、自然、专业、有亲和力；皮肤真实但干净；布料纹理清楚。
```

## Face Makeup Filter Checklist

- If a reference photo exists, did the prompt say "only identity reference"?
- Did it preserve face shape, facial proportion, brow-eye structure, nose, lips, skin tone, age feel, hairline, hairstyle base, and temperament?
- Did it block stranger face, influencer face, westernized features, V-face, oversized eyes, over-sculpted nose, and over-retouching?
- Is the makeup style named and described by base, brow, eye, blush, lip, and retouching level?
- Is the filter described by contrast, diffusion, grain, glow/halation, highlight roll-off, bokeh, and background readability?
- Are skin, eyes, hair, fabric, and background textures visible?
- Does the portrait stay age-safe and non-sexual when youthful/campus wording appears?
