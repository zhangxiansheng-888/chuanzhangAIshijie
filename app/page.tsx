"use client";

import { useState } from "react";

type StageId = "direction" | "script" | "assets" | "promptPlan" | "storyboard";

type DetailSection = {
  label: string;
  title: string;
  intro?: string;
  body: string;
};

type DemoStage = {
  id: StageId;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
  skills: string[];
  deliverables: string[];
};

const repositoryUrl =
  "https://github.com/zhangxiansheng-888/chuanzhangAIshijie";

const outputIndex: { label: string; stage: StageId }[] = [
  { label: "三种故事方向", stage: "direction" },
  { label: "拉片节奏", stage: "script" },
  { label: "详细剧本", stage: "script" },
  { label: "场景提示词", stage: "assets" },
  { label: "道具提示词", stage: "assets" },
  { label: "真人提示词", stage: "assets" },
  { label: "情绪提示词", stage: "assets" },
  { label: "关键帧提示词", stage: "assets" },
  { label: "分镜规划", stage: "promptPlan" },
  { label: "180秒最终分镜", stage: "storyboard" },
];

const stages: DemoStage[] = [
  {
    id: "direction",
    number: "01",
    eyebrow: "一个灵感，先做三种方向",
    title: "故事方向与核心提炼",
    description:
      "先提炼高概念、戏剧动作、情绪点和视听钩子，再给出故事创作一、二、三的不同方向。",
    button: "展开三种故事方向",
    skills: ["chuanzhang-chuangzuo-v1"],
    deliverables: ["核心命题", "戏剧动作", "情绪点", "三种创作方向", "方向选择理由"],
  },
  {
    id: "script",
    number: "02",
    eyebrow: "先解释节奏，再交付剧本",
    title: "拉片节奏与详细剧本",
    description:
      "剧本输出拆成两部分：A为拉片式节奏解释，B为只写可拍画面、动作、声音和对白的详细剧本。",
    button: "展开拉片与剧本",
    skills: ["chuanzhang-chuangzuo-v1"],
    deliverables: ["拉片节拍", "情节/情感双轨", "价值转变", "详细分场剧本", "剧本自检"],
  },
  {
    id: "assets",
    number: "03",
    eyebrow: "把剧本拆成可复用资产",
    title: "场景／道具／真人／情绪／关键帧提示词",
    description:
      "分别生成场景、道具、真人角色、人物情绪和关键帧提示词；人物画面必须同时融合真人感与情绪表演。",
    button: "展开全部资产提示词",
    skills: [
      "chuanzhang-tuxiangtishici",
      "chuanzhangzhenren-prompts",
      "chuanzhangbiaoqing",
    ],
    deliverables: ["场景提示词", "道具提示词", "真人定妆提示词", "情绪提示词", "关键帧提示词"],
  },
  {
    id: "promptPlan",
    number: "04",
    eyebrow: "分镜前先锁定资产、位置和时间",
    title: "分镜规划与提示词结构",
    description:
      "展示资产确认、空间调度、时间划分、风格四段和最终视频提示词的固定字段顺序。",
    button: "展开分镜规划",
    skills: ["chuanzhang-fenjing"],
    deliverables: ["资产映射", "空间位置", "时间划分", "风格四段", "视频提示词模板"],
  },
  {
    id: "storyboard",
    number: "05",
    eyebrow: "180秒生产级交付",
    title: "最终分镜与视频提示词",
    description:
      "每组写清具体秒数、人物情绪、微表演、构图、摄像机、拍摄风格、场景、道具、动作和音效。",
    button: "展开完整180秒分镜",
    skills: ["chuanzhang-fenjing", "chuanzhangbiaoqing"],
    deliverables: ["12组时间段", "人物情绪微节拍", "摄影机与拍摄", "场景道具", "可复制视频提示词"],
  },
];

const demoOutputs: Record<StageId, DetailSection[]> = {
  direction: [
    {
      label: "核心提炼",
      title: "这个故事真正讲什么",
      intro: "不是先写剧本，而是先确定故事脊柱。",
      body: `片名：《第七张照片》

一句话高概念：
一个每天都会失去昨日记忆的女孩，连续收到“未来的自己”寄来的照片；第七张照片显示她将在今晚死去。

戏剧动作 = 目标 + 阻碍：
目标：林晚必须在凌晨四点记忆清空前，找出照片寄信人和事故真相。
阻碍：她无法相信昨天的自己，也无法确认今天的判断有没有被操纵。

控制性理念：
生活从“被记忆控制”变成“主动留下证据”，因为林晚选择相信自己的行动，而不是相信残缺记忆。

核心情绪点：
不是“害怕死亡”，而是“发现最值得怀疑的人就是自己”。主情绪从警觉、怀疑、恐惧，转向理解自己、重新掌控。

开场视听钩子：
凌晨4:07，电子钟闪烁；一张仍在显影的照片自己滑入画面。照片中的林晚正站在她从未去过的废弃照相馆前。

核心视觉母题：
照片显影、红线、镜中错位、凌晨4:07、暗房红灯。`,
    },
    {
      label: "故事创作一",
      title: "方向A｜时间闭环悬疑",
      body: `方向：
照片确实由“未来的林晚”留下。她每天失忆前，利用延时冲印装置把线索交给第二天的自己。

观众体验：
前半段相信超自然，后半段发现是一个人跨越记忆断层完成的自救。

情绪重心：
从“我被未来追杀”转为“过去的我一直在保护今天的我”。

优势：
高概念清晰、3分钟内能闭环、道具和视觉规则集中，适合AI短片。

风险：
真相解释过多会削弱悬疑，必须通过暗房装置、录音和照片顺序让观众自己拼出来。`,
    },
    {
      label: "故事创作二",
      title: "方向B｜现实犯罪操控",
      body: `方向：
照片由事故肇事者伪造，对方利用林晚失忆，让她反复删除证据并回到同一地点。

观众体验：
从超自然预言转为现实控制与追踪，危险来自门外真实的人。

情绪重心：
从自我怀疑转为愤怒和反击。

优势：
外部威胁强、追逐感明显、结尾容易制造下一集钩子。

风险：
3分钟内需要交代反派逻辑，可能挤压人物情绪和真人表演空间。`,
    },
    {
      label: "故事创作三",
      title: "方向C｜心理自我救援",
      body: `方向：
照片不是未来信息，而是治疗师为她设计的记忆重建实验；第七张照片迫使她面对自己主动封锁的创伤。

观众体验：
从寻找外部寄信人，转为进入记忆内部。

情绪重心：
压抑、抗拒、认知和接受。

优势：
表演空间最大，适合做强情绪近景和非线性视觉。

风险：
容易变成抽象心理片，需要避免“原来都是幻觉”的廉价反转。`,
    },
    {
      label: "本Demo选择",
      title: "选择方向A：时间闭环悬疑",
      body: `选择理由：
1. 高概念在前5秒就能建立。
2. 人物、场景和关键道具数量可控。
3. 真相既有悬疑回收，也能落到人物情绪。
4. 可以自然展示真人定妆、微表情、照片道具、暗房场景和逐秒分镜。
5. 结尾门把转动，保留现实危险与开放钩子。`,
    },
  ],
  script: [
    {
      label: "第一部分｜拉片",
      title: "180秒节奏解释",
      intro: "拉片不是复述剧情，而是解释每一段为什么放在这里、观众此刻应该知道什么和感受什么。",
      body: `00:00—00:15｜冷开场：先给异常，不解释设定
画面任务：电子钟4:07、湿照片滑入、照片中的女主。
情节节奏：紧；情感节奏：中。
观众问题：谁拍的？照片为什么还在显影？
价值转变：日常 → 异常。

00:15—00:40｜建立失忆规则
画面任务：墙面便签“每天4点后会忘记”、录像中的昨日林晚。
情节节奏：中；情感节奏：轻。
功能：只给最低限度规则，不用旁白解释病史。
价值转变：无知 → 局部知晓。

00:40—01:10｜预言验证
画面任务：照片中的水杯碎裂；现实中的水杯随后落地。
情节节奏：紧；情感节奏：中。
情绪点：林晚第一次确认照片领先现实。
价值转变：怀疑 → 相信危险。

01:10—01:35｜线索升级
画面任务：红线、六张旧照片、重复日期与暗房地址。
情节节奏：紧；情感节奏：重。
功能：把超自然疑问转为可行动的地点目标。
价值转变：被动 → 主动追查。

01:35—02:10｜进入照相馆
画面任务：走廊、暗房红灯、挂满墙面的昨日记录。
情节节奏：中；情感节奏：重。
摄影策略：从手持警觉逐渐转为缓慢推进，让空间压住人物。
价值转变：寻找他人 → 发现自己。

02:10—02:40｜认知与反转
画面任务：录音机播放她自己的声音；延时冲印装置启动。
情节节奏：中；情感节奏：最重。
核心情绪点：过去的她没有背叛，而是在保护今天的她。
价值转变：自我怀疑 → 自我信任。

02:40—03:00｜第七张照片与尾钩
画面任务：照片显示她倒地；门外脚步；门把转动。
情节节奏：紧；情感节奏：重后骤停。
结尾策略：不解释门外是谁，让人物完成选择——她不逃，把照片攥进掌心。
价值转变：恐惧失控 → 带着恐惧行动。`,
    },
    {
      label: "第二部分｜详细剧本",
      title: "可拍摄中文分场剧本",
      intro: "只写摄影机能拍到、麦克风能听到的内容，不写心理解释。",
      body: `场1｜卧室｜凌晨｜约25秒
电子钟：04:07。
一张湿润的即时照片从门缝下缓慢滑进来。
床上的林晚睁眼。她没有立刻坐起，只盯着地面。
照片继续显影：画面里，林晚站在一栋废弃照相馆前。
她翻到背面。黑色手写字：“不要相信今天的你。”
林晚抬头。墙上贴满同一种笔迹的便签。

场2｜卧室墙面｜连续｜约20秒
林晚按下墙边相机的播放键。
屏幕里的林晚穿着同一件针织衫。
屏幕里的林晚：“如果现在是四点以后，你已经不记得昨天。”
现实中的林晚把屏幕暂停在自己的脸上。
她抬手摸自己的左眉尾。屏幕里的人做过同样动作。

场3｜小厨房｜清晨｜约25秒
第二张照片放在桌面：碎裂的白瓷杯，杯底有一条红线。
现实中的白瓷杯还完整地放在桌边。
水壶沸腾。林晚转身关火。
她的袖口擦过杯沿。
杯子掉落，碎裂形状与照片一致。
林晚的呼吸停住。她看向自己的右手腕。

场4｜抽屉与照片｜连续｜约25秒
林晚拉开抽屉。
六张照片用红线捆在一起。
第一张：卧室。第二张：水杯。第三张：她的手腕。
最后一张只有暗房红灯和地址：“同安路17号”。
她把红线绑上右手腕，将六张照片装进口袋。

场5｜废弃照相馆外/内｜上午｜约35秒
铁门半开。招牌只剩“照相”两个字。
林晚推门进入。
脚下胶片盒被踢开，滚进黑暗。
走廊尽头亮着红灯。
墙上挂着七排照片，每一排都是她自己。
她停在第七排前。第七排是空的。

场6｜暗房｜连续｜约30秒
桌上录音机亮着红点。
林晚按下播放。
录音里的林晚：“你已经来过六次。别再删掉它。”
延时冲印机突然启动。
一张照片缓慢吐出。
林晚没有去拿。她先看向角落的镜子。
镜中，她右手腕上的红线与墙上一张照片完全重合。

场7｜暗房｜连续｜约20秒
林晚拿起刚吐出的第七张照片。
照片里，她倒在这间暗房的地面。
录音里的林晚：“事故不是意外。”
门外传来一次脚步。
林晚关闭录音机。

场8｜暗房门口｜连续｜约20秒
门把缓慢转动。
林晚后退半步，又停住。
她把第七张照片攥进掌心。
红灯扫过她湿润但没有落泪的眼睛。
录音机在断电前挤出最后一句：“这一次，别再忘了。”
切黑。保留一声未完成的吸气。`,
    },
    {
      label: "剧本自检",
      title: "创作技能实际检查什么",
      body: `开场钩子：前5秒出现异常照片，成立。
因果链：照片 → 预言验证 → 地址 → 暗房 → 录音 → 第七张照片，全部由“因为”连接。
双轨节奏：中段调查加速，情绪在暗房放慢并加重。
场景价值：每场都有知晓/无知、控制/失控或怀疑/信任的变化。
视听化：失忆、害怕、自我怀疑均由便签、停顿、照片、红线、呼吸和动作表达。
台词控制：只保留录音中的必要信息，不让人物解释情绪。
体量：8场约180秒，核心人物1名，主场景4个，符合3分钟AI短片。`,
    },
  ],
  assets: [
    {
      label: "资产清单",
      title: "先从剧本识别人物、场景与道具",
      body: `人物：
P01 林晚——24岁东亚女性，失忆后的自我调查者，全片固定同一外貌、发型、服装和年龄。

场景：
S01 凌晨卧室——便签墙、床头电子钟、灰蓝窗光。
S02 小厨房——白瓷杯、旧木桌、水壶、冷清晨光。
S03 废弃照相馆——破损招牌、胶片盒、狭长走廊。
S04 暗房——红色安全灯、冲印机、照片墙、镜子、录音机。

道具：
R01 即时照片——横版白边、显影层、背面黑色手写字。
R02 红线——棉质、旧、有细小毛边，固定绑在右手腕。
R03 白瓷杯——杯底细裂纹，碎裂形状要与照片一致。
R04 录音机——老式微型磁带机，红色录音灯。
R05 延时冲印装置——机械滚轴、药液痕迹、吐出照片。`,
    },
    {
      label: "场景提示词",
      title: "S04 暗房｜中英双语静态场景图",
      body: `English Prompt
An abandoned analog photography darkroom at the end of a narrow decaying photo-studio corridor, viewed from the doorway at eye level with a 35mm wide-angle lens. A red safelight hangs above a chemical-stained workbench; a delayed photo-developing machine, a worn cassette recorder and trays of developer sit in the midground. Seven horizontal rows of instant photographs cover the back wall, while a narrow aged mirror catches a partial reflection from frame right. Damp concrete, peeling paint, curled photo paper, dusty air and restrained deep shadows. Real location photography, practical red light only, readable spatial layout, subtle film grain, no people, no futuristic equipment, no neon cyberpunk styling.

中文提示词
废弃胶片照相馆尽头的模拟暗房，从门口平视进入，35mm广角建立空间。画面中景是被药液染色的工作台，红色安全灯从上方照亮延时冲印机、旧微型录音机和显影托盘；背景墙横向挂满七排即时照片，画面右侧一面狭窄旧镜子只反射局部空间。潮湿混凝土、剥落墙漆、卷曲相纸、空气浮尘和克制深阴影。真实地点摄影，只使用有来源的红色实景灯，空间布局清晰，轻微胶片颗粒；无人、无未来科技、无霓虹赛博朋克。`,
    },
    {
      label: "道具提示词",
      title: "R01 第七张照片｜中英双语道具图",
      body: `English Prompt
A single landscape-format instant photograph, approximately 11 cm by 8.5 cm, resting on a chemical-stained darkroom workbench. Thick warm-white paper border, still-developing emulsion with subtle wet gloss, slightly curled lower-right corner, tiny pressure marks from fingers. The image shows the same young East Asian woman collapsed on a red-lit darkroom floor; the back carries exact black handwritten Chinese text: “这一次，别再忘了”. 85mm macro-detail lens look, f/2.8 feel, focus strictly locked on paper fibers and handwriting, realistic contact shadow and physical weight, no floating object, no extra text.

中文提示词
一张横版即时照片，约11厘米×8.5厘米，放在有药液痕迹的暗房工作台上。暖白色厚纸边框，仍在显影的乳剂表面带轻微湿润反光，右下角略微卷起，边缘有手指压痕。照片画面里是同一名年轻东亚女性倒在红灯照亮的暗房地面；背面黑色手写字必须为“这一次，别再忘了”。85mm微距细节感，f/2.8景深，焦点严格锁定纸纤维和字迹，保留真实接触阴影与重量；禁止漂浮、禁止多余文字。`,
    },
    {
      label: "真人提示词",
      title: "P01 林晚固定真人定妆",
      intro: "真人提示词的核心不是“漂亮”，而是身份锚点、摄影语言、真实材质和一致性。",
      body: `中文真人定妆提示词
请生成一张电影角色定妆半身人像。主体为24岁东亚女性林晚，清瘦自然鹅蛋脸，下颌线柔和但不尖，颧骨位置自然；眉形平缓，眉眼间距正常，内双深棕眼睛，眼下有轻微疲惫阴影；鼻梁高度自然、鼻翼宽度真实；嘴唇偏薄，嘴角轻微不对称；肤色偏中性，保留真实年龄感、轻微毛孔、细小绒毛、肤色变化和自然眼神光。黑色锁骨短发，发际线与碎发保持稳定。近似素颜妆感，底妆极薄，眉毛自然整理，眼妆几乎不可见，自然血色嘴唇。穿洗旧的米白针织衫、深灰长裤，右手腕绑旧红棉线。

图像用途：悬疑短片角色身份参考。气质：警觉、克制、长期疲惫但不脆弱。构图：胸像，平视，身体微微偏向画面右侧，视线看向镜头左侧近处。85mm人像镜头距离感，f/2.8适度浅景深，面部清晰、背景仍可辨识。左侧灰蓝窗光作为柔和主光，右侧轻微负补光，眼中保留自然小面积眼神光。中性低饱和电影调色，轻微颗粒、自然高光过渡、真实布料纹理和细发。

身份锁定：
全片严格保持同一脸型、五官比例、眉眼结构、鼻子、嘴唇、肤色、年龄、发际线、发型、米白针织衫、深灰长裤和右腕红线。

负面约束：
不要陌生人脸、网红脸、小V脸、放大眼睛、欧美化高鼻梁、塑料皮肤、蜡像感、过度磨皮、夸张妆容、动漫感、年龄漂移、服装变化、发型变化、空洞凝视。

English identity prompt
Character-reference bust portrait of Lin Wan, a 24-year-old East Asian woman with a naturally slim oval face, soft non-pointed jawline, realistic cheekbone placement, straight soft brows, dark-brown inner double-lid eyes with subtle fatigue shadows, a natural nose bridge and nostril width, thin lips with mild real asymmetry, neutral skin tone with visible pores, fine facial hair and natural tone variation. Stable collarbone-length black hairline and flyaway strands, near-bare-face makeup, worn ivory knit sweater, charcoal trousers and an old red cotton thread on the right wrist. Restrained, alert and quietly exhausted temperament. Eye-level bust framing, 85mm portrait-lens look, f/2.8 feel, soft cool window key from frame left, slight negative fill from frame right, natural catchlights, restrained low-saturation cinematic grade, subtle grain, realistic fabric and skin. Lock the identical facial identity, age, hair, wardrobe and red thread across every image; no influencer face, V-line jaw, enlarged eyes, westernized nose, plastic skin, over-retouching, anime look or identity drift.`,
    },
    {
      label: "情绪提示词",
      title: "看见第七张照片｜8秒表演块",
      intro: "情绪不能只写“震惊”或“害怕”，必须写因果、保护策略和可见微表演。",
      body: `情绪因果：
触发：照片显示她倒在当前暗房。
目标：在门外的人进来前看清照片背面的字。
阻碍：恐惧打断呼吸，她不确定自己能否相信这张照片。
保护策略：压住表情，不出声，把照片边缘捏紧。
潜台词：如果我承认照片是真的，死亡就已经开始。

三轴控制：
内部压力 5/5；外显幅度从1/5升到3/5；自我控制从5/5降到3/5后重新回到4/5。

8秒微表演时间线：
0.0—1.0秒｜基线：视线停在照片下缘，呼吸均匀，肩膀略向前。
1.0—2.0秒｜识别：瞳孔短暂放大，身体冻结0.4秒，嘴唇微张但无声。
2.0—3.4秒｜抵抗：一次延迟鼻吸气，下颌立刻收紧，眼睛仍锁定照片。
3.4—5.0秒｜泄漏：喉结用力吞咽，拇指压弯照片边缘，眼眶出现水光但不落泪。
5.0—6.5秒｜顶点：视线从照片移向门把，肩膀轻微上提，屏息。
6.5—8.0秒｜余波：缓慢吐气，下颌放松半秒又重新收紧，把照片攥进掌心。

摄像机配合：
85mm紧特写，f/1.4极浅景深，焦点锁在眼睛；镜头前1秒严格静止，从识别开始极慢推进，总距离不超过12厘米；顶点后停止移动，保留余波。

表演负面约束：
不要瞬间最大情绪、不要夸张瞪眼、不要立刻流泪、不要所有五官同时变化、不要随机眨眼、不要机械转头、不要橡皮嘴、不要身份漂移。`,
    },
    {
      label: "关键帧提示词",
      title: "真人感 + 情绪 + 场景合并后的最终静态图",
      body: `中文关键帧提示词
9:16竖屏，暗房门口的紧特写。严格沿用P01林晚固定真人定妆：24岁东亚女性、自然清瘦鹅蛋脸、内双深棕眼睛、锁骨黑短发、米白针织衫、右腕旧红线，身份与年龄不可变化。她左手拿着仍带湿润显影光泽的第七张即时照片，视线刚从照片移向画面右侧门把；瞳孔短暂放大后的余波仍在，眼眶有水光但不落泪，下颌收紧，喉结刚完成一次吞咽，拇指压弯照片边缘，肩膀轻微上提。

85mm长焦紧特写，f/1.4极浅景深，眼睛和照片边缘处于同一关键焦面；林晚脸部位于画面左中部，右侧保留门把方向的负空间。暗房红色安全灯从后侧描出发丝边缘，门缝冷光轻扫面部，真实毛孔、细发、眼神光、唇纹和针织布料。低饱和悬疑电影调色，真实光学散景，轻微胶片颗粒。避免网红脸、塑料皮肤、夸张哭泣、空洞凝视、发型服装变化、多余手指、漂浮照片和红线位置错误。

English Keyframe Prompt
Vertical 9:16 tight close-up at a darkroom doorway. Strictly preserve the fixed P01 Lin Wan identity: the same 24-year-old East Asian woman, naturally slim oval face, dark-brown inner double-lid eyes, collarbone-length black hair, worn ivory knit sweater and old red thread on her right wrist. She holds the still-wet seventh instant photograph in her left hand; her gaze has just shifted from the photograph toward an off-screen door handle on frame right. Residue of pupil dilation, wet eyes without falling tears, tightened jaw, one just-finished swallow, thumb bending the paper edge, shoulders slightly raised. 85mm telephoto tight close-up, f/1.4 shallow depth of field, eyes and photo edge sharing the critical focus plane, face in left-center with threatening negative space on the right. Red safelight rims loose hair, cold door-gap light brushes the face, visible pores, fine hair, catchlights, lip texture and knit fabric, restrained low-saturation suspense grade, optical bokeh, subtle grain. No influencer face, plastic skin, exaggerated crying, empty stare, identity drift, wardrobe change, extra fingers, floating photograph or misplaced red thread.`,
    },
  ],
  promptPlan: [
    {
      label: "Gate 1｜资产确认",
      title: "资产映射表",
      body: `P01｜林晚｜人物｜全片｜固定脸、年龄、发型、服装、右腕红线
S01｜卧室｜场景｜00:00—00:40｜便签墙与4:07电子钟
S02｜厨房｜场景｜00:40—01:10｜旧木桌、白瓷杯、水壶
S03｜照相馆走廊｜场景｜01:35—01:55｜破招牌、胶片盒、暗房入口
S04｜暗房｜场景｜01:55—03:00｜红灯、照片墙、镜子、工作台
R01｜即时照片｜道具｜全片｜白边、显影状态、背面手写字
R02｜红线｜道具｜01:10后｜始终绑在林晚右手腕
R03｜白瓷杯｜道具｜00:40—01:10｜碎裂形状与照片一致
R04｜录音机｜道具｜02:10—03:00｜红灯和机械按键
R05｜冲印装置｜道具｜02:10—02:40｜滚轴真实接触相纸

确认状态：
已确认资产：是
已确认风格：电影写实、低饱和悬疑、真实实景灯。`,
    },
    {
      label: "Gate 2｜空间确认",
      title: "暗房俯视调度文字图",
      body: `北墙：七排照片墙；照片墙中央留出第七排空位。
东墙：狭窄旧镜子；镜子与工作台相距约1.2米。
南侧：唯一入口，门把在画面右侧。
西侧：工作台；冲印机位于桌面北端，录音机在南端。
林晚初始位置：入口内侧0.8米，身体朝北，右肩靠近东墙。
第七张照片吐出后：林晚向西移动1.1米，站在工作台前。
摄影机A：入口外南侧，向北拍35mm空间建立。
摄影机B：林晚东南侧0.7米，向西北拍85mm情绪特写。

关键关系：
林晚始终在工作台东侧；照片墙在她正前方；镜子在她右后方；门把在她背后右侧。禁止左右镜像、禁止红线换到左手。`,
    },
    {
      label: "Gate 3｜时间划分",
      title: "12组视频提示词覆盖180秒",
      body: `01｜00:00—00:15｜异常照片进入卧室｜15秒｜2个内部镜头
02｜00:15—00:30｜便签墙与失忆规则｜15秒｜2个内部镜头
03｜00:30—00:45｜录像确认身份｜15秒｜2个内部镜头
04｜00:45—01:00｜水杯预言与碎裂｜15秒｜3个内部镜头
05｜01:00—01:15｜红线与六张照片｜15秒｜2个内部镜头
06｜01:15—01:30｜地址出现与出门决定｜15秒｜2个内部镜头
07｜01:30—01:45｜抵达废弃照相馆｜15秒｜2个内部镜头
08｜01:45—02:00｜走廊进入暗房｜15秒｜2个内部镜头
09｜02:00—02:15｜照片墙与空白第七排｜15秒｜2个内部镜头
10｜02:15—02:30｜录音揭示与冲印启动｜15秒｜2个内部镜头
11｜02:30—02:45｜第七张照片与认知｜15秒｜1个完整情绪镜头
12｜02:45—03:00｜门把转动与最后选择｜15秒｜2个内部镜头

总计：180秒，12条视频提示词；每条不超过15秒。
拆分理由：地点、焦点道具、情绪大转折或摄影逻辑改变时才分组；完整情绪弧线不切碎。`,
    },
    {
      label: "风格四段",
      title: "每条视频提示词固定在句柄之前",
      body: `不要出现BGM，不要出现字幕

【全局画质】
真实电影实拍质感，高解析，大画幅动态范围，真实物理接触与重量，克制光学运动模糊；禁止游戏引擎感、三维渲染感、动画和插画感。

【人物材质】
林晚皮肤保留毛孔、细小绒毛、自然血色变化和轻微疲惫；眼眶水光、唇纹、碎发和针织布料真实；禁止塑料皮肤、磨皮和年龄漂移。

【灯光与风格】
低饱和灰蓝与暗房红色形成冷暖冲突；只使用窗光、床头灯、走廊灯、暗房安全灯等有来源实景光；负补光保持面部立体，轻微胶片颗粒，暗部保留细节。

【核心特效】
照片显影为核心物理机制：乳剂从灰白逐渐出现图像，表面湿润反光随角度变化；冲印机滚轴必须真实接触相纸，禁止魔法发光、粒子特效和悬浮。`,
    },
    {
      label: "固定提示词结构",
      title: "不是一句“电影感”，而是完整生产字段",
      body: `1. 固定开头：不要出现BGM，不要出现字幕
2. 风格四段：全局画质 / 人物材质 / 灯光与风格 / 核心特效
3. 本条素材句柄：@image1人物、@image2场景、@image3道具
4. 空间布局与镜头数量警告
5. 【镜头N｜具体起止秒数】
6. 画面动作概述
7. 画面构图
8. 机位：位置、景别、角度、焦段、光圈感、运镜
9. 动作：人物、道具、微表演、环境变化
10. 音效：环境、拟音、呼吸或对白
11. 环境活动 / 全场音效
12. 防错警告：身份、空间、道具、焦点、镜头数

硬规则：
每组不超过15秒；每个镜头必须有音效；人物情绪必须拆成眼神、呼吸、嘴角、下颌、肩膀和手；运镜由情绪变化驱动。`,
    },
  ],
  storyboard: [
    {
      label: "分镜01｜00:00—00:15",
      title: "异常照片进入卧室",
      body: `场景：S01凌晨卧室。道具：R01即时照片、电子钟。
人物情绪：林晚从睡眠残留转为警觉；内部压力2/5，外显1/5，自控5/5。
镜头A 0.0—3.0秒：85mm道具特写，f/2.8，焦点锁定电子钟4:07；湿照片从门缝滑入前景。固定机位，不变焦。
镜头B 3.0—15.0秒：50mm中近景，林晚位于画面左三分之一，门口留在右侧负空间；镜头在她第一次屏息时缓慢推进约12厘米。
微表演：眼睛先睁开但头不动；视线落向地面；鼻吸气停顿；右手指尖抓紧床单；下颌轻收。
拍摄风格：灰蓝窗光、暖色床头灯未开启，真实低照度，轻微颗粒。
音效：电子钟电流声、照片摩擦地板、床单细响、一次被压住的鼻息。
提示词核心：严格2个镜头；照片必须接触地面并有湿润反光；禁止自动增加女主起身镜头。`,
    },
    {
      label: "分镜02｜00:15—00:30",
      title: "便签墙建立失忆规则",
      body: `场景：S01卧室。道具：便签墙、墙边相机。
人物情绪：警觉转为熟悉又不安；看见自己的笔迹，但不记得写过。
镜头A 0.0—5.0秒：35mm肩后中景，林晚前景虚焦，便签墙在背景清晰；平视固定机位。
镜头B 5.0—15.0秒：85mm手部与字迹插入，焦点锁定“每天4点后会忘记”；她的食指停在最后一个字前，没有碰上去。
微表演：慢眨眼一次；嘴唇轻压；喉结吞咽；肩膀保持僵硬。
拍摄风格：自然晨光逐渐增强，便签纸纹理和卷边清晰。
音效：窗外远车声、纸角轻响、相机待机电流。
提示词核心：字迹只出现指定内容；手指不遮挡关键词；禁止焦点漂移。`,
    },
    {
      label: "分镜03｜00:30—00:45",
      title: "录像中的自己确认身份",
      body: `场景：S01卧室。道具：墙边相机屏幕。
人物情绪：难以置信压住求证欲；内部压力3/5，外显1/5。
镜头A 0.0—7.0秒：50mm双层构图，现实林晚侧脸在左，屏幕中的昨日林晚在右；两张脸保持同一身份。
镜头B 7.0—15.0秒：85mm紧特写，现实林晚触摸左眉尾，视线对齐屏幕。
机位：严格平视，轻微真实手持；触摸动作开始后摄影机停止漂移。
对白：屏幕里的林晚：“如果现在是四点以后，你已经不记得昨天。”
微表演：台词前屏息；听到“昨天”时瞳孔轻缩；台词后视线不离开屏幕。
音效：相机扬声器轻微失真、指腹擦过眉毛、房间低频。
防错：屏幕人物和现实人物不得换脸、换发型、换服装。`,
    },
    {
      label: "分镜04｜00:45—01:00",
      title: "水杯预言应验",
      body: `场景：S02小厨房。道具：R01预言照片、R03白瓷杯、水壶。
人物情绪：怀疑 → 意外 → 冻结；顶点是“照片领先现实”。
镜头A 0.0—4.0秒：85mm照片特写，照片中的碎杯清晰，现实完整杯子在背景虚化。
镜头B 4.0—9.0秒：50mm半身，林晚转身关水壶，袖口擦过杯沿。
镜头C 9.0—15.0秒：45mm微距跟随杯子落地并碎裂，随后硬切林晚眼睛紧特写。
微表演：身体冻结0.4秒；瞳孔放大；嘴唇微张无声；延迟鼻吸气。
拍摄风格：冷清晨光，白瓷碎片真实物理碰撞和细小水滴。
音效：水壶沸腾、瓷杯撞地、碎片滑动、吸气。
防错：碎裂形状与照片一致；禁止慢动作夸张爆炸；禁止多余碎片穿模。`,
    },
    {
      label: "分镜05｜01:00—01:15",
      title: "红线与六张照片",
      body: `场景：S02厨房抽屉。道具：R02红线、六张照片。
人物情绪：恐惧开始变成主动调查；内部压力4/5，自控4/5。
镜头A 0.0—6.0秒：35mm俯拍抽屉，照片按日期排列，红线真实缠绕。
镜头B 6.0—15.0秒：50mm手部近景，林晚把红线绑在右手腕；背景中她的脸虚化但持续观察照片。
微表演：手指第一次打结失败；她短促呼气后重新绑紧；下颌由紧转稳。
拍摄风格：自然光与抽屉内阴影，纸张和棉线材质清晰。
音效：木抽屉摩擦、照片翻动、棉线勒紧皮肤的细响。
防错：红线只能在右手腕；六张照片数量固定；禁止手指融合。`,
    },
    {
      label: "分镜06｜01:15—01:30",
      title: "地址出现与出门决定",
      body: `场景：S02厨房到门口。道具：写有地址的照片、外套。
人物情绪：犹豫 → 决定；不是突然勇敢，而是带着恐惧行动。
镜头A 0.0—8.0秒：85mm照片背面特写，“同安路17号”；焦点从字迹物理拉焦到林晚眼睛。
镜头B 8.0—15.0秒：35mm门口中景，她穿上外套，手停在门锁上0.8秒后压下。
摄影机：前段静止，决定发生时轻微向前横移，保持门框前景遮挡。
微表演：一次深而慢的吸气；肩膀放下；手掌先松开再握住门把。
音效：纸张、衣料、门锁机械声、走廊回响。
防错：地址必须清晰一致；红线和照片不能消失。`,
    },
    {
      label: "分镜07｜01:30—01:45",
      title: "抵达废弃照相馆",
      body: `场景：S03照相馆外。道具：破损招牌、口袋中的照片。
人物情绪：警觉上升，试图维持冷静。
镜头A 0.0—5.0秒：24mm竖屏远景，林晚位于下方中央，破损招牌压在上方；轻微雨后湿地反光。
镜头B 5.0—15.0秒：50mm侧面跟拍，她走向半开的铁门，右手隔着口袋按住照片。
摄影机：克制手持，呼吸式微动；靠近门口时逐渐减弱。
拍摄风格：阴天漫射光，低饱和城市边缘，真实湿地和锈蚀。
音效：远处车辆、鞋底踩湿地、铁门被风推动。
防错：不增加路人围观；招牌只剩“照相”二字；禁止赛博朋克霓虹。`,
    },
    {
      label: "分镜08｜01:45—02:00",
      title: "走廊进入暗房",
      body: `场景：S03走廊连接S04暗房。道具：胶片盒、暗房红灯。
人物情绪：紧张接近边缘，但仍压住声音。
镜头A 0.0—3.0秒：35mm广角闪现，铁门后的狭长走廊，红灯在尽头。
镜头B 3.0—15.0秒：50mm低位手持跟随，林晚踢到胶片盒；她停下，先看盒子，再看红灯。
微表演：肩膀突然上提；呼吸变浅；眼神在地面和尽头之间切换；右手握紧口袋。
摄影机：紧张手持但不乱抖，接近红灯时运动减慢。
音效：胶片盒滚动、鞋底停顿、走廊长回声、暗房机器低频。
防错：空间关系保持走廊尽头为暗房；禁止镜像和额外房门。`,
    },
    {
      label: "分镜09｜02:00—02:15",
      title: "照片墙与空白第七排",
      body: `场景：S04暗房。道具：照片墙、镜子。
人物情绪：寻找别人 → 发现自己；震惊后出现压抑悲伤。
镜头A 0.0—5.0秒：35mm广角，林晚在前景右侧，七排照片墙占据背景。
镜头B 5.0—15.0秒：85mm缓慢横移扫描照片，最终停在空白第七排和镜中林晚的局部倒影。
微表演：眼睛逐排移动；到第七排时冻结；眉头中央轻皱；肩膀轻微下沉。
拍摄风格：暗房红灯为主光，门缝冷光为弱轮廓光，阴影保留细节。
音效：照片夹轻碰、机器风扇、一次吞咽。
防错：照片中的人物均为同一林晚；第七排必须空白；镜子只反射真实空间。`,
    },
    {
      label: "分镜10｜02:15—02:30",
      title: "录音揭示与冲印启动",
      body: `场景：S04暗房工作台。道具：R04录音机、R05冲印装置。
人物情绪：认知开始，防御被撬开；主情绪是“难以相信过去的自己”。
镜头A 0.0—8.0秒：50mm双主体中近景，林晚按下录音机，冲印机在背景静止。
镜头B 8.0—15.0秒：85mm道具近景，录音说到“六次”时冲印机启动，相纸被滚轴咬入。
对白：“你已经来过六次。别再删掉它。”
微表演：听到自己的声音先闭眼0.3秒；下唇内收；手指没有离开播放键。
音效：磁带底噪、机械按键、滚轴启动、相纸摩擦。
防错：录音口型不出现在现实人物；冲印机滚轴真实接触相纸；禁止魔法光效。`,
    },
    {
      label: "分镜11｜02:30—02:45",
      title: "第七张照片与完整情绪弧线",
      body: `场景：S04暗房。道具：第七张照片。单镜头15秒，不剪切。
人物情绪：识别 → 抵抗 → 泄漏 → 顶点 → 余波。
0.0—2.0秒：视线停在照片下缘，呼吸均匀。
2.0—4.0秒：看见自己倒地，身体冻结0.4秒，瞳孔放大。
4.0—7.0秒：延迟鼻吸气，下颌收紧，拇指压弯照片边缘。
7.0—10.0秒：喉结吞咽，眼眶水光增加但不落泪。
10.0—12.5秒：视线移向门外，肩膀上提，屏息。
12.5—15.0秒：缓慢吐气，把照片攥进掌心。
机位：85mm极致紧特写，f/1.4，焦点锁眼睛；识别开始后极慢推进总计12厘米，顶点后停止。
拍摄风格：红灯轮廓、冷门缝光扫面部、真实毛孔和唇纹。
音效：纸张压弯、呼吸、录音中的一句“事故不是意外”。
防错：不要瞬间哭泣、不要夸张瞪眼、不要随机眨眼、不要换脸。`,
    },
    {
      label: "分镜12｜02:45—03:00",
      title: "门把转动与最后选择",
      body: `场景：S04暗房入口。道具：门把、第七张照片、录音机。
人物情绪：恐惧仍在，但控制重新建立；结尾不是胜利，而是选择不逃。
镜头A 0.0—5.0秒：85mm门把大特写，门把缓慢转动约20度，焦平面全程锁定金属磨损。
镜头B 5.0—15.0秒：50mm中近景，林晚后退半步后停住；人物在左三分之一，门在右侧负空间。
微表演：脚后跟先移；胸腔一次短促起伏；她看向门，右手在口袋外攥紧照片；下颌重新稳定。
摄影机：镜头B低位缓慢手持，前5秒轻微下沉；她停住后摄影机也稳定，只剩规律呼吸感。
拍摄风格：红色安全灯与门缝冷光，暗部真实，禁止炫技环绕。
音效：门锁金属摩擦、录音机断电前说“这一次，别再忘了”、一次未完成吸气；切黑后保留0.5秒室内低频。
防错：严格2个镜头；门外人物不出现；红线仍在右腕；照片不得消失。`,
    },
    {
      label: "完整视频提示词样例",
      title: "分镜11可复制结构示范",
      body: `不要出现BGM，不要出现字幕

【全局画质】真实电影实拍质感，高解析，大画幅动态范围，真实物理接触与重量；禁止游戏引擎、三维渲染、动画和插画感。
【人物材质】林晚皮肤保留毛孔、细小绒毛、自然血色、眼眶水光、唇纹和碎发；禁止塑料皮肤、磨皮和年龄漂移。
【灯光与风格】暗房红色安全灯从后侧勾勒发丝，门缝冷光从右侧轻扫面部，负补光保持颧骨和下颌立体；低饱和悬疑电影调色，轻微颗粒。
【核心特效】即时照片乳剂仍在显影，表面湿润反光随手指角度变化；只使用真实化学显影效果，不出现魔法发光。

@image1（林晚）——24岁东亚女性，固定清瘦鹅蛋脸、内双深棕眼睛、锁骨黑短发、米白针织衫、深灰长裤、右腕旧红线。
@image2（暗房）——北墙七排照片，西侧工作台，东墙旧镜子，南侧唯一入口，红色安全灯。
@image3（第七张照片）——横版白边即时照片，仍有湿润显影光泽，画面是林晚倒在暗房地面。

⚠️空间布局：林晚站在工作台东侧，照片墙在正前方，镜子在右后方，入口在背后右侧。禁止左右镜像。
⚠️本视频严格只有1个镜头，单镜头15秒，无剪辑。

【单镜头｜0.0—15.0秒】
画面动作概述：林晚看清第七张照片中的自己，努力压住恐惧，情绪经历识别、抵抗、泄漏、顶点和重新控制。
画面构图：85mm极致紧特写，林晚脸部占画面左中部，额头到下巴填满画幅；第七张照片边缘位于右下前景，门方向在画面右侧保留负空间；暗房背景完全虚化为红黑色块。
机位：摄影机位于林晚东南侧约0.7米，平视，85mm长焦，f/1.4极浅景深，焦点严格锁定双眼。0—2秒严格静止；2秒识别开始后极慢推进，总距离约12厘米；10秒情绪顶点后停止移动，保留真实摄影师呼吸式微动，禁止变焦。
动作：0—2秒视线停在照片下缘，呼吸均匀；2—4秒看见自己倒地，身体冻结0.4秒，瞳孔短暂放大，嘴唇微张无声；4—7秒一次延迟鼻吸气，下颌收紧，左手拇指压弯照片边缘；7—10秒喉结用力吞咽，眼眶水光增加但泪不落下；10—12.5秒视线移向画面右侧门口，肩膀轻微上提并屏息；12.5—15秒缓慢吐气，下颌放松半秒又重新稳定，把照片攥进掌心。所有变化错开出现，不让整张脸同时达到最大幅度。
音效：湿润相纸被压弯的细声、一次延迟鼻吸气、吞咽、布料轻响；录音机在7秒处说“事故不是意外”，声音带磁带底噪；无音乐。

环境活动 / 全场音效：冲印机风扇维持低频，红色安全灯轻微电流声，远处门外只有一次模糊脚步。

⚠️保持@image1脸型、五官比例、年龄、发型、服装和右腕红线一致；禁止瞬间最大情绪、夸张瞪眼、立刻流泪、随机眨眼、机械转头、橡皮嘴、手指融合、照片漂浮、焦点漂移和自动增加镜头。`,
    },
  ],
};

function downloadDemo() {
  const sections = stages
    .flatMap((stage) => [
      `# ${stage.number} ${stage.title}`,
      ...demoOutputs[stage.id].map(
        (section) =>
          `## ${section.label}｜${section.title}\n\n${section.intro ? `${section.intro}\n\n` : ""}${section.body}`,
      ),
    ])
    .join("\n\n---\n\n");
  const text = `# 《第七张照片》船长AI视界完整工作流 Demo

灵感：一个失忆女孩每天收到未来自己寄来的照片。
体量：3分钟｜类型：悬疑｜画幅：9:16｜风格：电影写实

${sections}`;
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "船长AI视界-第七张照片-完整工作流Demo.md";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [activeStage, setActiveStage] = useState<StageId>("direction");
  const [revealed, setRevealed] = useState<StageId[]>(
    stages.map((stage) => stage.id),
  );
  const currentIndex = stages.findIndex((stage) => stage.id === activeStage);
  const currentStage = stages[currentIndex];
  const currentOutput = revealed.includes(activeStage)
    ? demoOutputs[activeStage]
    : null;

  function revealCurrent() {
    setRevealed((current) =>
      current.includes(activeStage) ? current : [...current, activeStage],
    );
  }

  function continueToNext() {
    if (currentIndex >= stages.length - 1) return;
    setActiveStage(stages[currentIndex + 1].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveStage("direction")}>
          <span className="brand-mark">船</span>
          <span>
            <strong>船长AI视界</strong>
            <small>五技能完整工作流Demo</small>
          </span>
        </button>
        <div className="topbar-actions">
          <span className="demo-status"><i />纯演示 · 不调用AI</span>
          <a className="ghost-button link-button" href={`${repositoryUrl}#安装全部技能`}>
            安装技能
          </a>
          <a className="api-button link-button" href={`${repositoryUrl}#部署自己的版本`}>
            <span className="api-dot" />
            部署自己的版本
          </a>
        </div>
      </header>

      <section className="demo-notice" aria-label="演示说明">
        <strong>完整教学Demo</strong>
        <span>所有交付明细默认展开，点击下方目录可直接查看场景、道具、真人、情绪等提示词。</span>
        <a href={repositoryUrl}>查看开源项目 ↗</a>
      </section>

      <div className="workspace">
        <aside className="sidebar">
          <div className="project-block">
            <label>演示项目</label>
            <strong className="demo-project-name">《第七张照片》</strong>
            <div className="progress-row">
              <span>{revealed.length} / {stages.length} 已查看</span>
              <span>{Math.round((revealed.length / stages.length) * 100)}%</span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(revealed.length / stages.length) * 100}%` }} />
            </div>
          </div>

          <nav className="stage-nav" aria-label="创作步骤">
            {stages.map((stage, index) => {
              const isActive = stage.id === activeStage;
              const isDone = revealed.includes(stage.id);
              return (
                <button
                  key={stage.id}
                  className={`${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                  onClick={() => setActiveStage(stage.id)}
                >
                  <span className="stage-index">{isDone ? "✓" : stage.number}</span>
                  <span>
                    <small>{stage.eyebrow}</small>
                    <strong>{stage.title}</strong>
                  </span>
                  {index < stages.length - 1 && <i className="stage-line" />}
                </button>
              );
            })}
          </nav>

          <div className="privacy-note">
            <span>5 SKILLS</span>
            <p>每一步都标明负责技能、实际输出字段和《第七张照片》的完整示例。</p>
          </div>
        </aside>

        <section className="content">
          <section className="output-index" aria-label="完整交付目录">
            <div>
              <span>完整交付目录</span>
              <strong>核心内容不再隐藏 · 点击直达</strong>
            </div>
            <nav>
              {outputIndex.map((item) => (
                <button
                  key={item.label}
                  className={item.stage === activeStage ? "active" : ""}
                  onClick={() => setActiveStage(item.stage)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </section>

          <div className="content-head">
            <div>
              <span className="section-number">{currentStage.number}</span>
              <p>{currentStage.eyebrow}</p>
              <h1>{currentStage.title}</h1>
              <div className="orange-rule" />
              <p className="stage-description">{currentStage.description}</p>
            </div>
            <div className="stage-pager">
              <span>{currentIndex + 1}</span><i /><span>{stages.length}</span>
            </div>
          </div>

          <section className="skill-contract">
            <div>
              <span>本步骤调用技能</span>
              <div className="skill-chips">
                {currentStage.skills.map((skill) => <code key={skill}>{skill}</code>)}
              </div>
            </div>
            <div>
              <span>必须交付的明细</span>
              <ul>
                {currentStage.deliverables.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          <section className="context-strip">
            <div>
              <span>统一创作依据</span>
              <strong>《第七张照片》</strong>
            </div>
            <p>一个失忆女孩每天收到未来自己寄来的照片｜3分钟｜悬疑｜9:16</p>
            <button onClick={() => setActiveStage("direction")}>返回起点</button>
          </section>

          {currentOutput && (
            <div className="detail-stack">
              {currentOutput.map((section, index) => (
                <section className="detail-section" key={`${section.label}-${section.title}`}>
                  <header>
                    <div>
                      <span>{section.label}</span>
                      <h2>{section.title}</h2>
                      {section.intro && <p>{section.intro}</p>}
                    </div>
                    <button
                      className="copy-button"
                      onClick={() => navigator.clipboard.writeText(section.body)}
                    >
                      复制本节
                    </button>
                  </header>
                  <article>{section.body}</article>
                  <footer>{String(index + 1).padStart(2, "0")} / {String(currentOutput.length).padStart(2, "0")}</footer>
                </section>
              ))}
            </div>
          )}

          <section className="action-card demo-action-card">
            <div>
              <span className="demo-action-kicker">NO API · FULL DETAIL</span>
              <h2>{currentOutput ? "本步骤明细已全部展开" : "查看技能真实交付明细"}</h2>
              <p>Demo只展示预制案例，不请求API Key。每个输出字段都来自对应技能规则。</p>
            </div>
            <div className="demo-action-buttons">
              {!currentOutput && (
                <button className="generate-button" onClick={revealCurrent}>
                  <span>✦</span>{currentStage.button}
                </button>
              )}
              {currentOutput && currentIndex < stages.length - 1 && (
                <button className="continue-button" onClick={continueToNext}>
                  进入下一步<span>→</span>
                </button>
              )}
              {currentOutput && currentIndex === stages.length - 1 && (
                <button className="continue-button" onClick={downloadDemo}>
                  下载完整Demo<span>↓</span>
                </button>
              )}
            </div>
          </section>

          <section className="skill-ledger">
            <span>5个技能在完整流程中的位置</span>
            <div>
              <p><code>chuanzhang-chuangzuo-v1</code><strong>故事方向、结构、拉片节奏、详细剧本</strong></p>
              <p><code>chuanzhang-tuxiangtishici</code><strong>场景、道具、关键帧中英双语图像提示词</strong></p>
              <p><code>chuanzhangzhenren-prompts</code><strong>真人身份锚点、皮肤妆发、镜头光线与一致性</strong></p>
              <p><code>chuanzhangbiaoqing</code><strong>情绪因果、微表演、逐秒表演弧线和摄影机响应</strong></p>
              <p><code>chuanzhang-fenjing</code><strong>资产、位置、时间、构图、机位、动作、音效和视频提示词</strong></p>
            </div>
          </section>

          <section className="ownership-cta">
            <span>想用自己的灵感真正生成？</span>
            <h2>选择属于你自己的运行方式</h2>
            <div>
              <a href={`${repositoryUrl}#安装全部技能`}>
                <small>推荐</small><strong>安装5个技能</strong>
                <p>在自己的Codex中运行，使用自己的会员和模型。</p>
              </a>
              <a href={`${repositoryUrl}#部署自己的版本`}>
                <small>独立使用</small><strong>部署网站副本</strong>
                <p>托管和API额度都归部署者自己。</p>
              </a>
            </div>
          </section>
        </section>
      </div>

      <section className="official-account" aria-labelledby="official-account-title">
        <img
          src="/wechat-official-account-qr.jpg"
          alt="船长AI视界公众号二维码"
          width="258"
          height="258"
        />
        <div>
          <span>WECHAT OFFICIAL ACCOUNT</span>
          <h2 id="official-account-title">关注船长AI视界</h2>
          <p>分享AI影视故事创作、拉片节奏、真人与情绪提示词、影视分镜和视频生成工作流。</p>
        </div>
      </section>
    </main>
  );
}
