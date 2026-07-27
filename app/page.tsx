"use client";

import { useState } from "react";

type StageId = "direction" | "script" | "identity" | "assets" | "promptPlan" | "storyboard";

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

const outputIndex: { label: string; stage: StageId; targetLabel: string }[] = [
  { label: "破题与梗概", stage: "direction", targetLabel: "01.2 梗概草稿" },
  { label: "分场大纲", stage: "direction", targetLabel: "01.6 分场大纲" },
  { label: "可拍摄剧本", stage: "direction", targetLabel: "01.8 场景写作" },
  { label: "真人身份基准", stage: "identity", targetLabel: "02.1—02.8 真人身份基准" },
  { label: "统一风格母版", stage: "assets", targetLabel: "03.1 统一风格母版" },
  { label: "场景提示词", stage: "assets", targetLabel: "03.3 场景提示词" },
  { label: "道具提示词", stage: "assets", targetLabel: "03.4 道具提示词" },
  { label: "真人提示词", stage: "assets", targetLabel: "03.5 真人提示词" },
  { label: "情绪融合最终稿", stage: "storyboard", targetLabel: "04.3 分镜 + 情绪一体稿" },
  { label: "关键帧提示词", stage: "assets", targetLabel: "03.6 关键帧提示词" },
  { label: "分镜规划", stage: "storyboard", targetLabel: "04.G1 Gate 1｜资产确认" },
  { label: "完整剧本分镜", stage: "storyboard", targetLabel: "04.1 完整镜头总表" },
  { label: "全片视频提示词", stage: "storyboard", targetLabel: "04.2 完整视频提示词 01 / 18" },
];

const stages: DemoStage[] = [
  {
    id: "direction",
    number: "01",
    eyebrow: "01/04｜确认01之前不进入真人基准",
    title: "故事创作与完整中文剧本",
    description:
      "严格执行01.1—01.9：破题、单一梗概、人物弧光、前史世界观、结构、分场、拉片节奏、可拍摄剧本和剧本医生。",
    button: "展开01故事创作",
    skills: ["chuanzhang-chuangzuo-v1"],
    deliverables: ["01.1—01.5 故事基础", "01.6 分场大纲", "01.7 拉片节奏解释", "01.8 可拍摄剧本", "01.9 剧本医生"],
  },
  {
    id: "identity",
    number: "02",
    eyebrow: "02/04｜只锁定真人身份与摄影基准",
    title: "真人身份基准",
    description:
      "先固定人物身份锚点、五官、年龄、肤色、妆发、服装、真人材质、镜头光线和一致性约束，不提前生成场景或分镜。",
    button: "展开02真人基准",
    skills: ["chuanzhangzhenren-prompts"],
    deliverables: ["02.1 角色清单", "02.2—02.4 身份与妆发", "02.5—02.6 真人摄影基准", "02.7 一致性约束", "02.8 定妆提示词"],
  },
  {
    id: "assets",
    number: "03",
    eyebrow: "03/04｜确认02后才生成静态视觉资产",
    title: "统一风格与静态视觉资产",
    description:
      "先建立全片统一风格母版，再让每条场景、道具、真人角色和关键帧静态图提示词完整继承；人物动态情绪统一写入最终逐镜剧本。",
    button: "展开03视觉资产",
    skills: [
      "chuanzhang-tuxiangtishici",
    ],
    deliverables: ["03.1 风格母版", "03.2 资产清单", "03.3 场景", "03.4 道具", "03.5 人物图", "03.6 关键帧", "03.7 连续性检查"],
  },
  {
    id: "storyboard",
    number: "04",
    eyebrow: "04/04｜六道确认完成后生成最终稿",
    title: "最终分镜、人物情绪与视频提示词",
    description:
      "融合技能在生成完整镜头总表和视频提示词时，直接把情绪技能的全部可见表演写进每一镜，最终一次性交付“分镜 + 情绪”的完整剧本。",
    button: "展开04最终分镜",
    skills: ["chuanzhang-fenjing-biaoqing"],
    deliverables: ["分镜与情绪融合原稿", "已确认分组的视频提示词", "逐镜完整表情字段", "逐镜写回可见表演", "摄影机与环境响应", "分镜 + 情绪最终完整稿"],
  },
];

const staticAssetStyleGuide = {
  en: "Unified STYLE-A01 — grounded live-action psychological suspense set in a contemporary but technologically restrained Chinese city, with late-1990s analog photographic equipment and no fashionable modern redesign. Restrained low-saturation palette: cool gray-blue ambient light, dirty muted amber practicals, and darkroom safety red used only as a motivated accent. All illumination must come from believable windows, bedside lamps, ceiling bulbs, corridor spill or darkroom safelights; preserve deep-shadow detail and natural highlight roll-off. Real-location photography, documentary-level material truth, subtle 35mm film grain, restrained halation, optical depth of field, physically correct scale, contact shadows, weight and wear. Art direction is unified through aged ivory paper, faded green paint, worn dark wood, chipped off-white enamel, oxidized charcoal metal, dusty glass and old red cotton fiber. No cyberpunk neon, luxury renovation, glossy commercial product styling, fantasy glow, 3D-render look, plastic surfaces, excessive teal-orange grading or unrelated color accents.",
  zh: "统一 STYLE-A01——中国城市真实实景的心理悬疑电影风格，故事发生在当代但技术环境刻意克制，核心摄影器材保持1990年代末的模拟胶片设备，禁止时髦现代化改造。全片使用克制低饱和色盘：灰蓝环境冷光、脏旧低亮度暖黄实景灯，暗房安全红只作为有来源的强调色。所有光线必须来自可信的窗光、床头灯、顶灯、走廊漏光或暗房安全灯；暗部保留细节，高光自然衰减。真实地点摄影、纪录片级材质可信度、轻微35mm胶片颗粒、克制光晕、真实光学景深，物体比例、接触阴影、重量和磨损必须正确。美术材质统一为旧暖白相纸、褪色浅绿墙漆、磨损深色木材、掉瓷暖白搪瓷、氧化深炭灰金属、积灰玻璃和旧红棉纤维。禁止赛博霓虹、豪华翻新、光亮商业产品棚拍、奇幻发光、三维渲染感、塑料材质、过度青橙调色和无关跳色。",
};

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
      label: "梗概草稿",
      title: "只给一个故事方向，不同时抛出多个版本",
      body: `故事方向：
照片确实由“未来的林晚”留下。她每天失忆前，利用延时冲印装置把线索交给第二天的自己。

观众体验：
前半段相信超自然，后半段发现是一个人跨越记忆断层完成的自救。

情绪重心：
从“我被未来追杀”转为“过去的我一直在保护今天的我”。

结尾：
门把转动，现实危险仍在；林晚没有逃，而是攥紧第七张照片面对门口。

此步骤结束后应等待用户回复“通过 / 修改 / 自检”，不能直接跳到人物和结构。`,
    },
    {
      label: "人物深度与弧光",
      title: "短片人物只建立 Want / Need / Arc",
      body: `人物：林晚，24岁，失忆后的自我调查者。

Want：
在记忆再次清空前，找出照片的来源和自己是否会死。

Need：
停止把“记得”当成唯一可信依据，学会相信自己留下的行动证据。

Arc：
她从怀疑昨天的自己、被照片驱赶，转为理解过去的自己一直在保护今天的自己；最终带着恐惧主动面对门外威胁。

可见行为：
反复核对笔迹、触摸录像中的同一处眉尾、把红线绑在右腕、在门把转动时先退后停。`,
    },
    {
      label: "前史与世界观",
      title: "故事开始前，世界已经运行",
      body: `前史：
林晚在一次照相馆事故后出现周期性失忆。她已经六次回到同一间暗房，也六次在恐惧中删除或藏起证据。

世界规则：
每天凌晨四点后，她会失去前一天形成的记忆；纸质照片、录像、红线和录音不会随记忆消失。

照片机制：
所谓“未来照片”来自她提前设置的延时冲印装置。照片不是魔法，而是昨天的她给今天的她留下的信息。

故事切入点：
不从事故或前六次失败讲起，而从第七张照片即将出现的最后一天切入。`,
    },
    {
      label: "结构大纲",
      title: "开场钩子、递进冲突、认知、高潮与尾钩",
      body: `开场钩子：
凌晨4:07，一张仍在显影的照片从门缝滑进卧室。

激励事件：
照片预言白瓷杯即将碎裂，数秒后现实完全应验。

递进冲突：
便签和录像证明她每天失忆；六张旧照片把她引向废弃照相馆；照片墙证明她已经来过六次。

认知：
录音与延时冲印装置揭示，照片由过去的她主动留给今天的自己。

危机与高潮：
第七张照片显示她倒在暗房；门外脚步逼近。她可以逃，也可以相信自己留下的证据。她选择停下，面对门口。

尾钩：
门把转动，录音机断电前说：“这一次，别再忘了。”`,
    },
  ],
  script: [
    {
      label: "分场大纲",
      title: "目标、阻碍、结果、价值转变、预估时长与双轨节奏",
      intro: "这里的时间是整场戏的预估总长，不是单个分镜时长；正式场景写作不把时长写进正文。",
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
      label: "拉片节奏解释",
      title: "情节节奏与情感节奏为什么不能同步拉满",
      body: `01.7 拉片节奏解释

00:00—00:15｜异常先行
情节快速：3秒内让照片滑入，15秒内建立“照片仍在显影”的异常。
情感克制：人物只从睡眠基线转为警觉，不立刻惊恐，让观众先于人物感到不安。

00:15—01:10｜证据逐级验证
情节逐渐加速：便签、录像、水杯预言依次增加信息密度。
情感延迟释放：林晚持续求证，直到杯子真实碎裂才出现第一次明显生理停顿。

01:10—01:35｜行动加速
情节快速：照片、红线和地址连续出现，把“发生了什么”转成“必须去哪里”。
情感转向控制：恐惧没有消失，而是被装袋、系线、开门等机械动作压住。

01:35—02:10｜空间压迫
情节降速：进入走廊后减少新信息，让脚步、距离、红光和空照片墙承担悬疑。
情感加重：镜头与人物一起放慢，观众开始等待不可见威胁。

02:10—02:40｜认知最重
情节中速：录音与冲印装置只提供必要事实。
情感最慢：发现“过去的自己一直在保护现在的自己”需要停顿、辨认和余波，不能用快速剪辑掠过。

02:40—03:00｜外部威胁再加速
情节重新收紧：第七张照片、脚步、门把形成倒计时。
情感在顶点后骤停：林晚从后退转为停住，最后的稳定比哭喊更有力量。

双轨原则：调查段让情节快于情感，认知段让情感慢于情节，高潮才让两条轨道同时收紧。`,
    },
    {
      label: "场景写作",
      title: "可拍摄中文分场剧本",
      intro: "只写摄影机能拍到、麦克风能听到的内容，不写心理解释。",
      body: `场1｜卧室｜凌晨
电子钟：04:07。
一张湿润的即时照片从门缝下缓慢滑进来。
床上的林晚睁眼。她没有立刻坐起，只盯着地面。
照片继续显影：画面里，林晚站在一栋废弃照相馆前。
她翻到背面。黑色手写字：“不要相信今天的你。”
林晚抬头。墙上贴满同一种笔迹的便签。

场2｜卧室墙面｜连续
林晚按下墙边相机的播放键。
屏幕里的林晚穿着同一件针织衫。
屏幕里的林晚：“如果现在是四点以后，你已经不记得昨天。”
现实中的林晚把屏幕暂停在自己的脸上。
她抬手摸自己的左眉尾。屏幕里的人做过同样动作。

场3｜小厨房｜清晨
第二张照片放在桌面：碎裂的白瓷杯，杯底有一条红线。
现实中的白瓷杯还完整地放在桌边。
水壶沸腾。林晚转身关火。
她的袖口擦过杯沿。
杯子掉落，碎裂形状与照片一致。
林晚的呼吸停住。她看向自己的右手腕。

场4｜抽屉与照片｜连续
林晚拉开抽屉。
六张照片用红线捆在一起。
第一张：卧室。第二张：水杯。第三张：她的手腕。
最后一张只有暗房红灯和地址：“同安路17号”。
她把红线绑上右手腕，将六张照片装进口袋。

场5｜废弃照相馆外/内｜上午
铁门半开。招牌只剩“照相”两个字。
林晚推门进入。
脚下胶片盒被踢开，滚进黑暗。
走廊尽头亮着红灯。
墙上挂着七排照片，每一排都是她自己。
她停在第七排前。第七排是空的。

场6｜暗房｜连续
桌上录音机亮着红点。
林晚按下播放。
录音里的林晚：“你已经来过六次。别再删掉它。”
延时冲印机突然启动。
一张照片缓慢吐出。
林晚没有去拿。她先看向角落的镜子。
镜中，她右手腕上的红线与墙上一张照片完全重合。

场7｜暗房｜连续
林晚拿起刚吐出的第七张照片。
照片里，她倒在这间暗房的地面。
录音里的林晚：“事故不是意外。”
门外传来一次脚步。
林晚关闭录音机。

场8｜暗房门口｜连续
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
  identity: [
    {
      label: "02.1—02.8 真人身份基准",
      title: "P01 林晚｜先锁身份，再进入全片视觉资产",
      intro: "02只建立稳定的真人身份与摄影基准；没有参考照片时，不虚假声称保留本人长相。",
      body: `02.1 真人角色清单
P01 林晚——24岁东亚女性，失忆后的自我调查者；本片唯一核心人物。

02.2 身份锚点
自然清瘦鹅蛋脸，下颌线柔和但不尖，颧骨位置自然；眉形平缓，眉眼间距正常，内双深棕眼睛；鼻梁高度和鼻翼宽度真实；嘴唇偏薄，嘴角轻微不对称。

02.3 年龄、肤色与发型
24岁真实年龄感，中性肤色，保留轻微毛孔、细小绒毛和自然肤色变化；黑色锁骨短发，固定发际线与碎发。

02.4 妆容、服装和记忆点
近似素颜，极薄底妆，眼妆几乎不可见，自然血色嘴唇；洗旧米白针织衫、深灰长裤；右手腕旧红棉线是固定记忆点。

02.5 真人摄影材质
皮肤保留毛孔、细发、眼神反光、唇纹和轻微疲惫阴影；禁止塑料皮肤、蜡像感和过度磨皮。

02.6 摄影基准
胸像平视，85mm人像镜头距离感，f/2.8适度浅景深；灰蓝窗光作为柔和主光，轻微负补光，中性低饱和调色、自然高光过渡和克制胶片颗粒。

02.7 身份一致性约束
全片固定同一脸型、五官比例、年龄、肤色、发际线、发型、服装和右腕红线；禁止网红脸、小V脸、放大眼睛、欧美化高鼻梁、年龄漂移、妆发或服装变化。

02.8 中文真人定妆提示词
请生成悬疑短片角色身份参考胸像：24岁东亚女性林晚，自然清瘦鹅蛋脸、柔和非尖下颌、自然颧骨、平缓眉形、内双深棕眼睛、真实鼻梁和鼻翼宽度、偏薄且轻微不对称的嘴唇；中性肤色保留毛孔、细小绒毛和轻微疲惫，黑色锁骨短发，近似素颜，洗旧米白针织衫、深灰长裤、右腕旧红棉线。平视胸像，85mm人像镜头感，f/2.8，灰蓝窗光、轻微负补光、自然眼神光、中性低饱和调色和克制胶片颗粒。固定人物身份、年龄、妆发、服装与右腕红线；禁止网红脸、塑料皮肤、过度磨皮、动漫感和身份漂移。

本步确认口令：确认02。`,
    },
  ],
  assets: [
    {
      label: "统一风格母版",
      title: "STYLE-A01｜所有场景、道具、真人和关键帧必须完整继承",
      intro: "技能核心不是给每个资产各写一套“电影感”，而是先锁定同一份风格简报，再逐条复用。",
      body: `风格控制维度：
类型｜中国城市真实实景心理悬疑
时代｜当代生活空间 + 1990年代末模拟摄影设备，禁止未来化改造
色彩｜灰蓝冷光 + 脏旧暖黄实景灯 + 有来源的暗房安全红
用光｜只允许窗光、床头灯、顶灯、走廊漏光、暗房安全灯等可信光源
写实等级｜真实地点摄影、纪录片级材质、正确比例、重量、接触阴影和磨损
摄影语言｜克制35mm胶片颗粒、自然高光衰减、真实光学景深、不过度青橙
美术材质｜旧暖白相纸、褪色浅绿墙漆、磨损深木、掉瓷暖白、氧化炭灰金属、积灰玻璃、旧红棉纤维
统一禁区｜赛博霓虹、豪华翻新、商业棚拍、奇幻发光、三维渲染、塑料质感、无关跳色

English Master Style
${staticAssetStyleGuide.en}

中文母版
${staticAssetStyleGuide.zh}

执行规则：
下面每一条场景、道具、真人和关键帧提示词都会完整重复这段母版；单独复制任意一条时也不会丢失全片风格。`,
    },
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
      title: "S01 凌晨卧室｜中英双语静态场景图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A cramped lived-in bedroom at 4:07 a.m., vertical 9:16 composition, viewed from the doorway with a 28mm lens. A narrow bed sits frame left; the wall above it is covered with handwritten memory notes, dated instant photographs and red pencil marks. A bedside digital clock clearly reads 4:07, lit by a weak amber practical lamp. Cold blue predawn light leaks through thin curtains on frame right, creating a believable mixed-color contrast. Worn ivory bedding, old wooden floor, half-open drawer, small camera on a chair, realistic dust and paper texture. Real location photography, restrained suspense, readable layout, no people, no luxury interior, no supernatural glow, no illegible decorative text.

中文提示词
${staticAssetStyleGuide.zh}

凌晨4:07的狭小旧卧室，9:16竖屏，从门口以28mm广角建立空间。画面左侧是窄床，床头墙贴满手写记忆便签、标注日期的即时照片和红铅笔记号；床头电子钟清晰显示4:07，由微弱暖黄色实景灯照亮。画面右侧薄窗帘透入灰蓝色黎明前冷光，形成可信的冷暖混合光。洗旧米白床品、旧木地板、半开的抽屉、椅子上的小相机，保留灰尘、纸张与生活磨损。真实地点摄影、克制悬疑、空间关系清楚；无人、无豪华装修、无超自然光效、无乱码装饰字。`,
    },
    {
      label: "场景提示词",
      title: "S02 小厨房｜中英双语静态场景图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A tiny aging apartment kitchen at cold dawn, vertical 9:16, eye-level 35mm lens from the hall entrance. An old scarred wooden table occupies the foreground with a white porcelain cup, aluminum kettle and a folded prediction photograph placed in a precise triangle. Pale blue morning light enters through a frosted window above the sink; a weak ceiling bulb adds a dirty warm cast. Faded green cabinets, stained tile joints, exposed water pipe, chipped enamel basin and restrained clutter. Realistic Chinese urban rental apartment, cinematic suspense, natural object scale, clear paths for actor movement, no people, no modern luxury appliances, no excessive mess, no stylized neon.

中文提示词
${staticAssetStyleGuide.zh}

寒冷清晨的老旧出租屋小厨房，9:16竖屏，从走廊入口平视，35mm镜头。前景旧木桌表面有划痕，白瓷杯、铝制水壶和折起的预言照片形成明确三角关系。水槽上方磨砂窗透入淡蓝晨光，微弱顶灯加入略脏的暖色。褪色浅绿橱柜、发黑瓷砖缝、外露水管、掉瓷水槽和克制生活杂物。真实中国城市出租屋质感，电影悬疑，物体比例正确，演员行动通道清楚；无人、无现代豪华电器、不过度脏乱、无霓虹风格。`,
    },
    {
      label: "场景提示词",
      title: "S03 废弃照相馆走廊｜中英双语静态场景图",
      body: `English Prompt
${staticAssetStyleGuide.en}

An abandoned street-level analog photo studio and its long narrow corridor, vertical 9:16, low eye-level 24mm lens looking inward from the broken storefront. A faded sign hangs above cracked glass; dusty sample portraits, empty film boxes and a toppled stool frame the entrance. The corridor narrows toward a closed darkroom door with a thin red light leaking underneath. Peeling cream paint, damp stains, old electrical conduit, scattered contact sheets and suspended dust. Natural overcast daylight dies gradually into darkness, one motivated red leak only. Real derelict location, tense perspective depth, no people, no ghosts, no cyberpunk neon, no impossible architecture.

中文提示词
${staticAssetStyleGuide.zh}

临街废弃胶片照相馆及其狭长走廊，9:16竖屏，从破损店面低机位向内看，24mm广角。裂玻璃上方悬着褪色招牌，积灰样片、空胶卷盒和倒下的木凳围住入口；走廊向深处收窄，尽头暗房门紧闭，门缝只漏出一线红光。奶油色墙漆剥落、潮湿水渍、老旧明线管、散落接触印样和空气浮尘。阴天自然光沿走廊逐渐衰减，只保留有来源的红色漏光。真实废弃地点、透视压迫感强；无人、无鬼影、无赛博霓虹、无不可能建筑结构。`,
    },
    {
      label: "场景提示词",
      title: "S04 暗房｜中英双语静态场景图",
      body: `English Prompt
${staticAssetStyleGuide.en}

An abandoned analog photography darkroom at the end of a narrow decaying photo-studio corridor, viewed from the doorway at eye level with a 35mm wide-angle lens. A red safelight hangs above a chemical-stained workbench; a delayed photo-developing machine, a worn cassette recorder and trays of developer sit in the midground. Seven horizontal rows of instant photographs cover the back wall, while a narrow aged mirror catches a partial reflection from frame right. Damp concrete, peeling paint, curled photo paper, dusty air and restrained deep shadows. Real location photography, practical red light only, readable spatial layout, subtle film grain, no people, no futuristic equipment, no neon cyberpunk styling.

中文提示词
${staticAssetStyleGuide.zh}

废弃胶片照相馆尽头的模拟暗房，从门口平视进入，35mm广角建立空间。画面中景是被药液染色的工作台，红色安全灯从上方照亮延时冲印机、旧微型录音机和显影托盘；背景墙横向挂满七排即时照片，画面右侧一面狭窄旧镜子只反射局部空间。潮湿混凝土、剥落墙漆、卷曲相纸、空气浮尘和克制深阴影。真实地点摄影，只使用有来源的红色实景灯，空间布局清晰，轻微胶片颗粒；无人、无未来科技、无霓虹赛博朋克。`,
    },
    {
      label: "道具提示词",
      title: "R01 第七张照片｜中英双语道具图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A single landscape-format instant photograph, approximately 11 cm by 8.5 cm, resting on a chemical-stained darkroom workbench. Thick warm-white paper border, still-developing emulsion with subtle wet gloss, slightly curled lower-right corner, tiny pressure marks from fingers. The image shows the same young East Asian woman collapsed on a red-lit darkroom floor; the back carries exact black handwritten Chinese text: “这一次，别再忘了”. 85mm macro-detail lens look, f/2.8 feel, focus strictly locked on paper fibers and handwriting, realistic contact shadow and physical weight, no floating object, no extra text.

中文提示词
${staticAssetStyleGuide.zh}

一张横版即时照片，约11厘米×8.5厘米，放在有药液痕迹的暗房工作台上。暖白色厚纸边框，仍在显影的乳剂表面带轻微湿润反光，右下角略微卷起，边缘有手指压痕。照片画面里是同一名年轻东亚女性倒在红灯照亮的暗房地面；背面黑色手写字必须为“这一次，别再忘了”。85mm微距细节感，f/2.8景深，焦点严格锁定纸纤维和字迹，保留真实接触阴影与重量；禁止漂浮、禁止多余文字。`,
    },
    {
      label: "道具提示词",
      title: "R02 右腕红线｜中英双语道具图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A short length of old faded red cotton thread tied in a simple double knot around the right wrist of the same young East Asian woman. The thread is thin, matte and slightly dirty, with visible twisted fibers, tiny frayed ends and one flattened section caused by long wear. Macro close-up, 100mm lens look, realistic skin pores, fine wrist hair, tendon structure and gentle contact pressure where the knot touches skin. The wrist rests on the same worn dark-wood apartment table used in S02, lit by cool gray-blue dawn window light with a weak dirty-amber practical fill; aged ivory instant photographs fall softly out of focus behind it. Forensic continuity reference within the established story world, no neutral studio backdrop, no bracelet, no glossy silk, no bright new red, no blood, no left wrist.

中文提示词
${staticAssetStyleGuide.zh}

一段长期佩戴的褪色红棉线，以简单双结固定绑在同一名年轻东亚女性的右手腕。线体细、哑光、略旧，能看见棉纤维捻线、细小毛边和长期摩擦形成的压扁段；结与皮肤接触处有轻微真实压痕。100mm微距特写，保留皮肤毛孔、腕部细汗毛和肌腱结构。手腕落在与S02一致的磨损深色木桌上，由灰蓝清晨窗光照亮，并保留微弱脏暖黄实景补光，背景虚化处能辨认旧暖白即时照片。必须是故事世界内部的连续性道具参考，禁止中性摄影棚背景、手链造型、丝绸高光、鲜艳新红色、血迹和左手腕。`,
    },
    {
      label: "道具提示词",
      title: "R03 裂纹白瓷杯｜中英双语道具图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A plain off-white porcelain drinking cup on an old wooden kitchen table, 10 cm tall, cylindrical body with a small rounded handle. A distinctive hairline crack begins under the base, branches into a narrow Y shape and climbs 3 cm up the lower wall; one tiny triangular chip is missing from the foot ring. Slight tea staining inside, faint scratches and realistic glazed ceramic reflections. 85mm product-detail lens, f/5.6, three-quarter view showing both the crack and handle, cold dawn window light from frame left. Continuity reference object, exact repeatable damage pattern, no logo, no printed text, no decorative pattern, not shattered.

中文提示词
${staticAssetStyleGuide.zh}

旧木质厨房桌上的素面暖白瓷杯，高约10厘米，直筒杯身、小圆弧杯把。标志性细裂纹从杯底开始，分成狭窄Y形并沿杯身下部向上延伸约3厘米；底足缺少一小块三角形瓷片。杯内有淡茶渍，釉面有轻微使用划痕和真实陶瓷反光。85mm产品细节镜头，f/5.6，四分之三角度同时看清裂纹与杯把，画面左侧冷清晨窗光。作为连续性参考，破损形状必须每次完全一致；无标志、无文字、无花纹、不要完全碎裂。`,
    },
    {
      label: "道具提示词",
      title: "R04 微型磁带录音机｜中英双语道具图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A worn pocket-size microcassette recorder from the late 1990s, dark charcoal ABS plastic body, approximately 12 by 7 cm. Transparent cassette window with a visible microcassette, mechanical play/stop/record buttons, tiny perforated speaker grille and one dim red recording LED. Scratched corners, fingerprint oils, faded white button labels and dust trapped along seams. Resting flat on a chemical-stained darkroom bench, 70mm close product shot, practical red safelight from rear-left and weak cold fill from front. Functional realistic hardware, no brand logo, no digital screen, no smartphone design, no futuristic controls.

中文提示词
${staticAssetStyleGuide.zh}

一台1990年代末的旧便携微型磁带录音机，深炭灰ABS塑料机身，约12×7厘米。透明磁带窗内能看见微型磁带，配机械播放、停止、录音按键，小型打孔扬声器和一枚微弱红色录音灯。边角有划痕与磨损，表面留有指纹油迹，白色按键标识褪色，接缝积灰。录音机平放在有药液痕迹的暗房工作台，70mm近距离产品镜头，后左侧红色安全灯，正面微弱冷补光。结构必须真实可用；无品牌标志、无数字屏、无手机造型、无未来控制面板。`,
    },
    {
      label: "道具提示词",
      title: "R05 延时冲印装置｜中英双语道具图",
      body: `English Prompt
${staticAssetStyleGuide.en}

A homemade delayed instant-photo developing apparatus built from an old analog processing unit, positioned on a darkroom workbench. Rectangular beige metal housing, two exposed black rubber rollers, narrow paper exit slot, small mechanical timer dial, red toggle switch, stained translucent chemical tubes and a shallow catch tray. One landscape instant photograph is physically gripped between the rollers and halfway emerging, with correct contact and paper curvature. Corrosion, dried developer residue, screws, ventilation slots and believable wiring. 35mm three-quarter technical reference view, red practical safelight, deep neutral shadows. Real functional machinery, no floating paper, no laser, no computer screen, no sci-fi design, no impossible mechanism.

中文提示词
${staticAssetStyleGuide.zh}

放在暗房工作台上的自制延时冲印装置，由旧式模拟相纸处理机改装。米灰色长方形金属外壳，两根外露黑色橡胶滚轴、狭窄出纸口、小型机械定时旋钮、红色拨动开关、染有药液的半透明软管和浅接纸盘。一张横版即时照片被滚轴真实夹住，正吐出一半，相纸弯曲、接触点与受力方向必须正确。保留金属腐蚀、干涸显影液痕迹、螺丝、散热孔和可信布线。35mm四分之三技术参考视角，红色实景安全灯，深色中性阴影。必须像真实可工作的机械；照片不能漂浮，无激光、无电脑屏幕、无科幻造型、无不可能机械结构。`,
    },
    {
      label: "真人提示词",
      title: "P01 林晚固定真人定妆",
      intro: "真人提示词的核心不是“漂亮”，而是身份锚点、摄影语言、真实材质和一致性。",
      body: `中文真人定妆提示词
${staticAssetStyleGuide.zh}

请生成一张电影角色定妆半身人像。主体为24岁东亚女性林晚，清瘦自然鹅蛋脸，下颌线柔和但不尖，颧骨位置自然；眉形平缓，眉眼间距正常，内双深棕眼睛，眼下有轻微疲惫阴影；鼻梁高度自然、鼻翼宽度真实；嘴唇偏薄，嘴角轻微不对称；肤色偏中性，保留真实年龄感、轻微毛孔、细小绒毛、肤色变化和自然眼神光。黑色锁骨短发，发际线与碎发保持稳定。近似素颜妆感，底妆极薄，眉毛自然整理，眼妆几乎不可见，自然血色嘴唇。穿洗旧的米白针织衫、深灰长裤，右手腕绑旧红棉线。

图像用途：悬疑短片角色身份参考。气质：警觉、克制、长期疲惫但不脆弱。构图：胸像，平视，身体微微偏向画面右侧，视线看向镜头左侧近处。85mm人像镜头距离感，f/2.8适度浅景深，面部清晰、背景仍可辨识。左侧灰蓝窗光作为柔和主光，右侧轻微负补光，眼中保留自然小面积眼神光。中性低饱和电影调色，轻微颗粒、自然高光过渡、真实布料纹理和细发。

身份锁定：
全片严格保持同一脸型、五官比例、眉眼结构、鼻子、嘴唇、肤色、年龄、发际线、发型、米白针织衫、深灰长裤和右腕红线。

负面约束：
不要陌生人脸、网红脸、小V脸、放大眼睛、欧美化高鼻梁、塑料皮肤、蜡像感、过度磨皮、夸张妆容、动漫感、年龄漂移、服装变化、发型变化、空洞凝视。

English identity prompt
${staticAssetStyleGuide.en}

Character-reference bust portrait of Lin Wan, a 24-year-old East Asian woman with a naturally slim oval face, soft non-pointed jawline, realistic cheekbone placement, straight soft brows, dark-brown inner double-lid eyes with subtle fatigue shadows, a natural nose bridge and nostril width, thin lips with mild real asymmetry, neutral skin tone with visible pores, fine facial hair and natural tone variation. Stable collarbone-length black hairline and flyaway strands, near-bare-face makeup, worn ivory knit sweater, charcoal trousers and an old red cotton thread on the right wrist. Restrained, alert and quietly exhausted temperament. Eye-level bust framing, 85mm portrait-lens look, f/2.8 feel, soft cool window key from frame left, slight negative fill from frame right, natural catchlights, restrained low-saturation cinematic grade, subtle grain, realistic fabric and skin. Lock the identical facial identity, age, hair, wardrobe and red thread across every image; no influencer face, V-line jaw, enlarged eyes, westernized nose, plastic skin, over-retouching, anime look or identity drift.`,
    },
    {
      label: "关键帧提示词",
      title: "真人感 + 情绪 + 场景合并后的最终静态图",
      body: `中文关键帧提示词
${staticAssetStyleGuide.zh}

9:16竖屏，暗房门口的紧特写。严格沿用P01林晚固定真人定妆：24岁东亚女性、自然清瘦鹅蛋脸、内双深棕眼睛、锁骨黑短发、米白针织衫、右腕旧红线，身份与年龄不可变化。她左手拿着仍带湿润显影光泽的第七张即时照片，视线刚从照片移向画面右侧门把；瞳孔短暂放大后的余波仍在，眼眶有水光但不落泪，下颌收紧，喉结刚完成一次吞咽，拇指压弯照片边缘，肩膀轻微上提。

85mm长焦紧特写，f/1.4极浅景深，眼睛和照片边缘处于同一关键焦面；林晚脸部位于画面左中部，右侧保留门把方向的负空间。暗房红色安全灯从后侧描出发丝边缘，门缝冷光轻扫面部，真实毛孔、细发、眼神光、唇纹和针织布料。低饱和悬疑电影调色，真实光学散景，轻微胶片颗粒。避免网红脸、塑料皮肤、夸张哭泣、空洞凝视、发型服装变化、多余手指、漂浮照片和红线位置错误。

English Keyframe Prompt
${staticAssetStyleGuide.en}

Vertical 9:16 tight close-up at a darkroom doorway. Strictly preserve the fixed P01 Lin Wan identity: the same 24-year-old East Asian woman, naturally slim oval face, dark-brown inner double-lid eyes, collarbone-length black hair, worn ivory knit sweater and old red thread on her right wrist. She holds the still-wet seventh instant photograph in her left hand; her gaze has just shifted from the photograph toward an off-screen door handle on frame right. Residue of pupil dilation, wet eyes without falling tears, tightened jaw, one just-finished swallow, thumb bending the paper edge, shoulders slightly raised. 85mm telephoto tight close-up, f/1.4 shallow depth of field, eyes and photo edge sharing the critical focus plane, face in left-center with threatening negative space on the right. Red safelight rims loose hair, cold door-gap light brushes the face, visible pores, fine hair, catchlights, lip texture and knit fabric, restrained low-saturation suspense grade, optical bokeh, subtle grain. No influencer face, plastic skin, exaggerated crying, empty stare, identity drift, wardrobe change, extra fingers, floating photograph or misplaced red thread.`,
    },
    {
      label: "资产连续性检查",
      title: "03.7｜把全部静态资产交给04之前的最终核对",
      body: `人物一致性：P01固定同一脸型、五官比例、年龄、发型、米白针织衫、深灰长裤和右腕红线。
风格一致性：S01—S04、R01—R05、P01和关键帧全部完整继承STYLE-A01。
时代一致性：当代生活空间中只出现可信的旧模拟摄影设备，不出现智能屏、未来设备和赛博设计。
色彩一致性：灰蓝环境光、脏旧暖黄实景灯和有来源的暗房安全红，不增加无关跳色。
材质一致性：旧暖白相纸、磨损深木、掉瓷暖白、氧化炭灰金属、积灰玻璃和旧红棉纤维保持稳定。
空间一致性：卧室、厨房、走廊、暗房的门、墙、工作台、镜子和关键道具位置可传递给04的空间确认。
道具一致性：照片尺寸与字迹、红线右腕位置、白瓷杯Y形裂纹、录音机机械结构和冲印机滚轴接触点均可重复。

本步确认口令：确认03。`,
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
已确认风格：是｜STYLE-A01 中国城市真实实景心理悬疑；统一时代、灰蓝/脏暖黄/安全红色盘、有来源实景光、35mm胶片质感和旧模拟摄影材质。`,
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
      title: "确认的是视频提示词分组，不是把每个分镜定成15秒",
      body: `技能原文规则：
每条视频提示词最多覆盖15秒，这是上限，不是目标；一个提示词组可以包含多个内部镜头。

示例｜场1“照片进入卧室”：
提示词1｜00:00—00:03｜约3秒｜照片从门缝滑入｜道具插入独立成段
提示词2｜00:03—00:10｜约7秒｜林晚醒来并看向地面｜同一人物、地点、情绪与摄影逻辑，合并
提示词3｜00:10—00:18｜约8秒｜拿起照片并看清画面｜道具焦点与人物反应构成完整单元

总计：约18秒，3条视频提示词。内部可以再包含不同长度的镜头。

必须等待用户回复“确认时间划分”；没有确认之前，不写正式提示词，也不生成网页。`,
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
单镜头长度由剧情决定，不默认15秒；每个镜头必须写绝对时间码与明确切点；每个镜头必须有音效；人物情绪拆成眼神、呼吸、嘴角、下颌、肩膀和手；运镜由情绪变化驱动。`,
    },
    {
      label: "Gate 4｜提示词结构确认",
      title: "结构发生变化时，必须先展示模板并确认",
      body: `确认口令：确认提示词结构。

固定顺序：
不要出现BGM，不要出现字幕
→【全局画质】
→【人物材质】
→【灯光与风格】
→【核心特效】
→ 本条素材句柄
→ 已确认空间与镜头数量
→ 每镜固定字段：画面动作概述 → 画面构图 → 机位 → 动作 → 音效
→ 环境活动 / 全场音效
→ 必要防错警告

故事板只有实际使用时才写编号；未使用时完全不出现故事板占位说明。`,
    },
    {
      label: "Gate 5｜交付形式确认",
      title: "生成网页，还是只要文字提示词",
      body: `必须等待用户二选一：

生成网页：
输出完整中文HTML分镜提示词表，保留时间安排列、镜头分解、资产图对照和复制区，并继续执行HTML QA。

只要文字提示词：
不生成HTML，直接按已确认顺序输出每条视频提示词。

确认口令：生成网页 / 只要文字提示词。`,
    },
    {
      label: "Gate 6｜HTML QA",
      title: "只有用户选择网页时执行",
      body: `网页必须全部使用简体中文。
不使用rowspan或colspan组织提示词组。
长中文提示词必须在容器内换行，不得压住相邻列。
每条提示词组在复制区外显示资产图对照、时间安排、约计字数和可删减建议。
每条可复制提示词正文不超过2200个中文字符。
检查并修复布局后，才交付网页。`,
    },
  ],
  storyboard: [
    {
      label: "先说清楚｜镜头不是生成批次",
      title: "为什么不再机械地每段15秒",
      body: `成片总长：180秒。
最终分镜：36个镜头，单镜头在3—7秒之间变化，不存在“每个镜头固定15秒”。
叙事段落：为了阅读，按每30秒归为一章；“章”不是镜头，也不是必须一次生成的视频。
生成批次：实际接入不同视频模型时，再根据模型上限，把相邻镜头按5秒、8秒、10秒或15秒组合。生成批次只是技术包装，不改变剪辑节奏。

每条分镜固定写清：
绝对时间码｜单镜头时长｜景别与构图｜镜头高度与方位｜焦段与光圈｜摄影机运动｜人物动作｜情绪微表演｜场景｜道具｜灯光风格｜声音｜切点｜连续性防错。`,
    },
    {
      label: "逐镜头01—06｜00:00—00:30",
      title: "照片进入：3、4、5、6、7、5秒",
      body: `01｜00:00—00:03｜3秒｜S01卧室｜R01照片、4:07电子钟
85mm俯拍道具特写，固定机位，f/2.8。电子钟清晰显示4:07，湿照片从门缝滑入并停住。音效：电流、相纸擦地。切点：照片完全静止时硬切。

02｜00:03—00:07｜4秒｜S01卧室｜床与门口
35mm低机位中远景，林晚在左、门口在右侧负空间。她睁眼但头不动，呼吸从均匀变为停顿。摄影机静止。音效：床单、一次鼻息。

03｜00:07—00:12｜5秒｜S01卧室｜R01照片
50mm床边中近景，极慢推进8厘米。她坐起，视线先找声音再落向地面，右手仍抓床单。内部压力2/5，外显1/5。切点：目光锁定照片。

04｜00:12—00:18｜6秒｜S01卧室｜R01照片
85mm手部近景，平视偏低。手指靠近、停顿0.5秒、捏住白边，避开湿显影区。真实接触阴影。音效：指腹摩擦纸边。

05｜00:18—00:25｜7秒｜S01卧室｜照片中的照相馆
100mm微距，焦点从湿乳剂缓慢拉到照片画面。林晚拇指轻颤一次后压住。禁止漂浮、禁止新增文字。音效：低频渐入。

06｜00:25—00:30｜5秒｜S01卧室｜林晚脸部
85mm紧特写，冷窗光，摄影机在第一次屏息时推进6厘米。瞳孔轻缩、下颌收紧、嘴唇分开但无声。切点：她突然看向便签墙。`,
    },
    {
      label: "逐镜头07—12｜00:30—01:00",
      title: "失忆规则与预言应验：镜头长短随信息变化",
      body: `07｜00:30—00:33｜3秒｜S01｜便签墙
24mm肩后全景，便签墙占画面上部，林晚前景虚焦。快速建立信息空间，固定镜头。

08｜00:33—00:37｜4秒｜S01｜核心便签
85mm字迹插入，焦点锁定“每天4点后会忘记”。食指停在最后一字前，不遮挡文字。纸角轻响。

09｜00:37—00:42｜5秒｜S01｜相机屏幕
50mm双层构图，现实林晚与屏幕中的昨日林晚同框，严格同脸、同发型、同服装。屏幕对白：“你已经不记得昨天。”

10｜00:42—00:48｜6秒｜S01｜林晚反应
85mm紧特写，轻微手持在她触摸眉尾时停止。听到“昨天”瞳孔轻缩，慢眨一次，喉结吞咽。

11｜00:48—00:55｜7秒｜S02厨房｜R01、R03
85mm照片特写，照片中是碎杯，现实完整白瓷杯在背景。焦点从照片裂纹拉到现实杯底同一位置。

12｜00:55—01:00｜5秒｜S02厨房｜R03白瓷杯
45mm低位近景，袖口擦过杯沿，杯子落地碎裂。真实重力、碎片数量克制、破损形状与照片一致。瓷器撞地声成为硬切点。`,
    },
    {
      label: "逐镜头13—18｜01:00—01:30",
      title: "从恐惧转为调查：动作加快，决定处放慢",
      body: `13｜01:00—01:03｜3秒｜S02｜林晚眼睛
100mm眼部特写，身体冻结0.4秒，瞳孔放大后出现一次延迟吸气。无夸张瞪眼。

14｜01:03—01:07｜4秒｜S02｜抽屉
35mm俯拍，抽屉被猛地拉开，六张照片按日期排列，R02红线压在上方。木轨摩擦声。

15｜01:07—01:12｜5秒｜S02｜六张照片
50mm垂直俯拍，手按日期快速翻看；每张都是同一林晚，照片数量固定六张。摄影机不旋转。

16｜01:12—01:18｜6秒｜S02｜R02红线
85mm手部近景，第一次打结失败，她短促呼气后重新绑在右腕。情绪从慌乱转向控制。

17｜01:18—01:25｜7秒｜S02｜地址照片
100mm微距，背面“同安路17号”清楚可读；4秒时拉焦到背景中的林晚眼睛。她缓慢深吸气，肩膀落下。

18｜01:25—01:30｜5秒｜门口｜外套、照片、红线
35mm门框遮挡中景，手停在门锁0.8秒后压下。摄影机在决定发生时横移10厘米。门锁声切到外景。`,
    },
    {
      label: "逐镜头19—24｜01:30—02:00",
      title: "进入照相馆：空间镜头短，压迫跟拍变长",
      body: `19｜01:30—01:33｜3秒｜S03外景｜破损招牌
24mm仰角快速建立，招牌只剩“照相”二字，阴天湿地反光。远车声。

20｜01:33—01:37｜4秒｜S03外景｜林晚
50mm侧面跟拍，右手隔口袋按住照片，步速略快但肩颈僵硬。克制手持。

21｜01:37—01:42｜5秒｜S03入口｜铁门
35mm背后中景，铁门被推开，黑暗走廊逐渐露出。摄影机先停后跟，铁门长摩擦声。

22｜01:42—01:48｜6秒｜S03走廊｜胶片盒
50mm低位跟随，鞋尖踢到胶片盒；盒子滚出画面，她立即停步。肩膀上提、呼吸变浅。

23｜01:48—01:55｜7秒｜S03走廊｜暗房红光
70mm压缩透视，林晚前景侧脸与尽头红光同框。焦点先在眼睛，再缓慢拉到门缝。走廊低频增强。

24｜01:55—02:00｜5秒｜S04入口｜暗房门
24mm肩后广角，她推门进入，照片墙、工作台、镜子只建立一次且方位固定。禁止镜像与额外房门。`,
    },
    {
      label: "逐镜头25—30｜02:00—02:30",
      title: "真相显形：照片墙、录音机、冲印装置",
      body: `25｜02:00—02:03｜3秒｜S04｜照片墙
35mm全景，七排照片墙占背景，林晚位于前景右侧。红灯主光，门缝冷轮廓光。

26｜02:03—02:07｜4秒｜S04｜照片墙
85mm横移扫描前六排，照片中均为同一林晚。照片夹轻碰，不显示第七排。

27｜02:07—02:12｜5秒｜S04｜空白第七排、镜子
85mm横移停在空白第七排，镜中出现林晚局部真实倒影。她眉心轻皱、肩膀下沉。

28｜02:12—02:18｜6秒｜S04工作台｜R04录音机
50mm中近景，手按下播放键后留在原位。录音：“你已经来过六次。”她闭眼0.3秒，下唇内收。

29｜02:18—02:25｜7秒｜S04工作台｜R04、R05
70mm双主体，前景录音机、背景冲印装置。录音说“别再删掉它”时，R05红灯亮起、滚轴启动。

30｜02:25—02:30｜5秒｜S04工作台｜R05冲印装置
85mm机械特写，相纸被两根滚轴真实咬合并吐出，接触点、弯曲和摩擦正确。无魔法光、无漂浮纸张。`,
    },
    {
      label: "逐镜头31—36｜02:30—03:00",
      title: "第七张照片与门外威胁：结尾镜头重新变短",
      body: `31｜02:30—02:33｜3秒｜S04｜R01第七张照片
100mm微距，照片完全吐出，湿乳剂中逐渐显出林晚倒地。机械停止声切断环境低频。

32｜02:33—02:37｜4秒｜S04｜林晚与照片
85mm紧特写，视线停在照片下缘后移到画面中央；身体冻结0.4秒，嘴唇微张无声。

33｜02:37—02:42｜5秒｜S04｜情绪泄漏
85mm极近，极慢推进8厘米。延迟鼻吸气、下颌收紧、喉结吞咽、眼眶水光增加但不落泪。

34｜02:42—02:48｜6秒｜S04｜照片背面
70mm手部近景，她翻到背面，“这一次，别再忘了”清楚可读；拇指压弯纸边，右腕红线保持可见。

35｜02:48—02:55｜7秒｜S04入口｜门把
85mm门把大特写，门外脚步靠近，门把缓慢转动20度。焦点锁定金属磨损，不出现门外人物。

36｜02:55—03:00｜5秒｜S04｜林晚最后选择
50mm中近景，她后退半步后停住，把照片攥紧，先屏息再稳定下颌，视线直对门口。摄影机随她后退轻微下沉，人物停住时镜头也稳定。录音机说“别再忘了”；切黑后保留0.5秒未完成吸气。`,
    },
    {
      label: "可复制视频提示词｜镜头33",
      title: "5秒单镜头示范，不再强行写15秒",
      body: `不要出现BGM，不要出现字幕。

【时长与镜头】本条只生成1个5秒镜头，不剪切，不自动续写前后剧情。
【画面】9:16竖屏，S04暗房，85mm紧特写，f/1.4，林晚脸部位于左中部，第七张照片边缘位于右下前景，门口方向保留负空间。
【人物一致性】严格沿用P01林晚：24岁东亚女性、固定清瘦鹅蛋脸、内双深棕眼睛、锁骨黑短发、米白针织衫、深灰长裤、右腕旧红线；不得换脸、变龄、换发型或服装。
【0.0—1.0秒】她刚认出照片中的自己，身体冻结0.4秒，瞳孔短暂放大，嘴唇微张但无声。
【1.0—2.5秒】一次延迟鼻吸气，下颌逐渐收紧，视线不离开照片。
【2.5—4.0秒】喉结完成一次吞咽，眼眶出现水光但不落泪，左手拇指压弯湿照片边缘。
【4.0—5.0秒】视线开始移向画面右侧门口，呼吸停止；动作未完成处结束镜头，为下一镜保留悬念。
【摄影机】0—1秒静止；1秒后极慢推进，总距离8厘米；4秒后停止。禁止变焦、绕拍、随机抖动和焦点漂移。
【灯光与材质】红色安全灯勾勒发丝，门缝冷光扫过面部；保留真实毛孔、细发、眼神光、唇纹、纸纤维和湿乳剂反光。
【声音】相纸轻响、延迟鼻吸气、吞咽、冲印机低频；无音乐。
【防错】不要瞬间最大情绪、夸张瞪眼、立刻流泪、随机眨眼、橡皮嘴、手指融合、照片漂浮或自动增加镜头。`,
    },
  ],
};

function getDisplayOutput(stageId: StageId): DetailSection[] {
  if (stageId === "direction") {
    return [...demoOutputs.direction, ...demoOutputs.script].map(
      (section, index) => ({
        ...section,
        label: `01.${index + 1} ${section.label}`,
      }),
    );
  }
  if (stageId === "identity") return demoOutputs.identity;
  if (stageId === "assets") {
    const assetNumbers: Record<string, string> = {
      统一风格母版: "03.1",
      资产清单: "03.2",
      场景提示词: "03.3",
      道具提示词: "03.4",
      真人提示词: "03.5",
      关键帧提示词: "03.6",
      资产连续性检查: "03.7",
    };
    return demoOutputs.assets
      .filter((section) => section.label !== "情绪提示词")
      .map((section) => ({
        ...section,
        label: `${assetNumbers[section.label] ?? "03"} ${section.label}`,
      }));
  }
  if (stageId !== "storyboard") return demoOutputs[stageId];

  const shotBlocks = demoOutputs.storyboard
    .filter((section) => section.label.startsWith("逐镜头"))
    .flatMap((section) => section.body.split("\n\n"));

  const shotTable: DetailSection = {
    label: "04.1 完整镜头总表",
    title: "《第七张照片》00:00—03:00 连续完整剧本分镜",
    intro:
      "这是一个连续交付，不按30秒拆成多个卡片。每行才是一个真实分镜；下方视频提示词组只是生成层。",
    body: shotBlocks.join("\n\n"),
  };
  const inlineEmotionDetails = [
    "触发：陌生湿照片进入卧室，照片里却是她自己；目标：确认危险来源，同时不让恐惧夺走判断；阻碍：记忆空白，无法确认昨天的自己是否可信；保护策略：冻结、观察、压住声音，只用视线与手指求证；压力：内部2/5、外显1/5、自控5/5；可见表演：上眼睑先抬、视线后移，呼吸延迟半拍，右手指尖抓紧床单，下颌轻收，伸手前停顿0.5秒，拇指只颤一次；峰值与余波：看清照片时嘴唇分开但不出声，随后视线突然转向便签墙；摄影机响应：第一次屏息后才轻微推进。",
    "触发：便签、自拍视频和水杯预言连续应验；目标：验证证据是否由自己留下，以及照片是否领先现实；阻碍：所有证据都指向她本人，她却没有制作记忆；保护策略：反复比对笔迹、脸和动作，用克制求证掩盖慌乱；压力：内部2/5升至4/5、外显1/5升至3/5、自控5/5降至4/5；可见表演：眨眼频率先变慢，吞咽受阻，嘴角失去支撑，下颌锁紧，肩膀在杯子碎裂后轻缩，手停在半空；峰值与余波：碎裂声后眼睛先定住，再快速回看照片，呼吸变浅；摄影机响应：证据确认后才切近，碎裂后立即回到眼睛。",
    "触发：六张照片构成死亡倒计时，地址指向废弃照相馆；目标：把恐惧转成行动并在记忆清空前抵达；阻碍：手抖、自我怀疑和时间不足；保护策略：把动作机械化，逐项装袋、系红线、核对地址；压力：内部4/5、外显2/5、自控4/5；可见表演：视线在照片与地址间快速折返，系红线时指腹压白，下颌保持稳定，肩膀随一次深呼吸下沉，手抖被主动握拳压住；峰值与余波：决定出门时眼神落点固定，嘴唇闭合，动作突然变得干净；摄影机响应：决定形成后才跟随起身。",
    "触发：进入废弃照相馆与暗房，环境像在等待她；目标：在未知空间内找到寄信人与控制记忆的证据；阻碍：黑暗、回声、狭窄通道和可能存在的人；保护策略：缩小动作幅度，贴墙移动，让耳朵先于身体搜索；压力：内部4/5、外显2/5、自控4/5；可见表演：眼球先扫暗处再转头，呼吸浅而慢，肩膀内收，右手隔着口袋压住照片，脚步落地前有短暂停顿；峰值与余波：听到异响时全身冻结，只有眼睛移动，随后缓慢吐气；摄影机响应：人物冻结时摄影机也停止。",
    "触发：照片墙、录音与装置证明未来的她正在给现在的她留证据；目标：重建事实并确认自己是否亲手设计了循环；阻碍：她开始怀疑最危险的人正是自己；保护策略：逐行核对照片、录音和装置，不允许情绪先于证据下结论；压力：内部4/5升至5/5、外显2/5升至4/5、自控4/5降至2/5；可见表演：视线沿照片行移动后骤停，眉心缓慢收紧，肩膀失去支撑，眼睛闭合一拍，嘴唇抿住，手指在录音机边缘反复摩擦；峰值与余波：认出自己声音时眼眶起水光但不落泪，呼吸破一次后重新压平；摄影机响应：认知完成后停住，不替人物提前煽情。",
    "触发：第七张死亡照片显影，门外脚步逼近；目标：在死亡恐惧中决定相信未来的自己并执行最后一步；阻碍：求生本能、自我怀疑与逼近的未知者；保护策略：压住哭腔，抓紧照片，正面对门，把恐惧集中成一个选择；压力：内部5/5、外显4/5、自控2/5；可见表演：先屏息，瞳孔定住，鼻翼轻张，嘴角向下失守又被抿回，下颌发颤，肩膀吸气抬起，手指把照片边缘压弯；峰值与余波：脚步停门外时眼泪只积在下眼睑，她抬眼直视门缝，呼吸由碎变稳；摄影机响应：峰值出现后才停止运动，让余波完整停留。",
  ];
  const promptGroups = Array.from(
    { length: Math.ceil(shotBlocks.length / 2) },
    (_, groupIndex): DetailSection => {
      const blocks = shotBlocks.slice(groupIndex * 2, groupIndex * 2 + 2);
      const parsed = blocks.map((block) => {
        const [header, ...detailLines] = block.split("\n");
        const [shot, time, duration, scene = "当前场景", assets = "本镜所需资产"] =
          header.split("｜");
        const seconds = Number.parseFloat(duration.replace(/[^\d.]/g, "")) || 0;
        const detail = detailLines.join(" ").trim();
        const sound =
          detail.match(/音效：([^。]+)/)?.[1] ??
          detail.match(/([^。]*(?:声|响|呼吸|低频)[^。]*)/)?.[1] ??
          "延续当前场景真实环境声";
        return { shot, time, seconds, scene, assets, detail, sound };
      });
      const totalSeconds = parsed.reduce((sum, shot) => sum + shot.seconds, 0);
      let relativeStart = 0;
      const shotPrompts = parsed
        .map((shot, index) => {
          const absoluteShotIndex = groupIndex * 2 + index;
          const relativeEnd = relativeStart + shot.seconds;
          const range = `${relativeStart.toFixed(1)}—${relativeEnd.toFixed(1)}秒`;
          relativeStart = relativeEnd;
          return `【镜头${index + 1}｜${range}】
画面动作概述：在${shot.scene}完成完整镜头总表${shot.shot}规定的叙事动作，人物状态与上一镜连续。
画面构图：严格沿用完整镜头总表${shot.shot}的景别、主体位置、前中后景和负空间；${shot.assets}的方位、接触点与重量保持稳定。
机位：${shot.detail}
动作：动作按镜头总表顺序发生；人物情绪先从眼神变化，再依次传到呼吸、嘴角、下颌、肩膀和手，变化错峰出现，结尾保留余波。
表情：${inlineEmotionDetails[Math.min(Math.floor(absoluteShotIndex / 6), inlineEmotionDetails.length - 1)]}；必须结合本镜具体动作控制眼神落点、眼睑、呼吸、嘴角、下颌、肩膀、手部受力、峰值和余波，禁止只写“害怕”“紧张”等抽象情绪词。
音效：${shot.sound}。`;
        })
        .join("\n\n");
      const firstTime = parsed[0]?.time.split("—")[0] ?? "00:00";
      const lastTime =
        parsed.at(-1)?.time.split("—")[1] ?? parsed.at(-1)?.time ?? "00:00";
      const assetNames = [...new Set(parsed.flatMap((shot) => shot.assets.split("、")))]
        .filter(Boolean)
        .join("、");
      const sceneNames = [...new Set(parsed.map((shot) => shot.scene))].join("、");
      const promptBody = `不要出现BGM，不要出现字幕

【全局画质】真实电影实拍质感，高解析，大画幅动态范围，真实物理接触、重量与光学运动模糊；不要游戏引擎、三维渲染、动画或插画感。
【人物材质】林晚的皮肤保留毛孔、细小绒毛、自然血色、眼眶水光、唇纹和碎发；手部受力、呼吸与布料牵拉必须真实。
【灯光与风格】依据已确认风格：低饱和悬疑，灰蓝自然光与有来源的暖灯或暗房红灯形成克制冷暖冲突，暗部保留细节，轻微胶片颗粒。
【核心特效】照片显影、陶瓷碎裂、滚轴出纸等全部遵守真实物理机制；湿乳剂反光、接触阴影、碎片受力和相纸弯曲必须可信。

@image1（P01林晚）——24岁东亚女性，固定脸型、五官比例、年龄、锁骨黑短发、米白针织衫、深灰长裤和右腕旧红线。
@image2（场景）——${sceneNames}，严格沿用已确认空间布局、材质、光源方向和出入口方位。
@image3（道具）——${assetNames}，严格沿用已确认尺寸、材质、文字、破损状态和摆放关系。

⚠️空间布局：人物、摄影机、门、墙面、工作台和关键道具保持已确认的前后左右、朝向、距离与遮挡关系，禁止空间镜像。
⚠️本视频严格只有${parsed.length}个镜头，禁止添加额外镜头或自动补镜头。

${shotPrompts}

环境活动 / 全场音效：保持${sceneNames}的真实底噪，近景拟音只在对应动作发生时出现，无音乐。

⚠️保持人物身份、服装、发型、红线位置和道具形态一致；禁止换脸、年龄漂移、手指融合、道具漂浮、焦点乱跳、无动机绕拍和瞬间最大情绪。`;

      return {
        label: `04.2 完整视频提示词 ${String(groupIndex + 1).padStart(2, "0")} / ${String(Math.ceil(shotBlocks.length / 2)).padStart(2, "0")}`,
        title: `${firstTime}—${lastTime}｜约${totalSeconds}秒｜${parsed.length}个内部镜头`,
        intro: `本段使用资产图对照：@image1=P01林晚；@image2=${sceneNames}；@image3=${assetNames}。正文约${promptBody.length}字符，可直接复制。`,
        body: promptBody,
      };
    },
  );

  const emotionPhases = [
    {
      trigger: "陌生湿照片进入卧室，照片里却是她自己",
      goal: "确认危险来源，同时不让恐惧夺走判断",
      obstacle: "记忆空白，她无法确认昨天的自己是否可信",
      strategy: "先冻结和观察，压住声音，只用视线与手指求证",
      pressure: "内部压力2/5；外显1/5；自控5/5",
      camera: "镜头保持安静，只有在她第一次屏息时轻微推进，避免盖过眼神变化",
      beats: [
        "人物尚未入画；让电子钟电流和照片擦地声先触发观众警觉，空间维持静止。",
        "上眼睑先抬起，头部保持不动；呼吸延迟半拍，视线寻找声音来源。",
        "视线落向门口，右手指尖抓紧床单，下颌只收紧一点，不立刻坐起。",
        "手伸向照片前停顿0.5秒；食指和拇指避开湿乳剂区，肩膀保持僵硬。",
        "看清照片时拇指轻颤一次，鼻吸气被压住，眼睛不离开显影画面。",
        "瞳孔短暂收缩，嘴唇分开但不出声，下颌进一步稳定；余波落在突然转向便签墙的视线。",
      ],
    },
    {
      trigger: "便签与录像证明她每天失忆，水杯预言随后应验",
      goal: "判断这些证据是否由自己留下，并验证照片是否领先现实",
      obstacle: "证据都指向她本人，但她不记得制作过程",
      strategy: "反复比对笔迹、脸和动作，以克制的求证掩盖慌乱",
      pressure: "内部压力由2/5升至4/5；外显1/5升至3/5；自控5/5降至4/5",
      camera: "信息镜头固定清楚，情绪出现时才切近或拉焦；杯子碎裂后镜头立即回到眼睛",
      beats: [
        "肩后看便签墙，眼睛逐行扫动，眉心尚未收紧，呼吸维持浅而均匀。",
        "食指停在关键词前而不触碰，慢眨一次，嘴唇轻压，喉结完成一次吞咽。",
        "看录像时现实与屏幕保持同一脸；听到“昨天”时瞳孔轻缩，身体不后退。",
        "触摸眉尾完成身份比对，手指离开后仍悬停半秒，视线继续锁定屏幕。",
        "照片与完整杯子同框时，她先看裂纹位置，再看现实杯底，鼻翼轻微张开。",
        "杯子碎裂后身体冻结0.4秒，嘴唇微张、呼吸停止；不要立刻哭或夸张瞪眼。",
      ],
    },
    {
      trigger: "预言应验，抽屉里又出现六张由自己留下的照片",
      goal: "把恐惧转成可执行线索，找到照片中的地址",
      obstacle: "手部发抖、时间有限，她仍怀疑自己可能被操控",
      strategy: "通过排列、打结、确认地址等机械动作恢复控制",
      pressure: "内部压力4/5；外显2/5；自控从3/5回升至4/5",
      camera: "动作阶段缩短停顿，决定发生时镜头才缓慢横移；手部特写必须保留真实受力",
      beats: [
        "碎裂声后眼睛维持放大，延迟吸气进入，视线从碎片移向自己的右腕。",
        "猛地拉开抽屉后手停在把手上，肩膀上提，看到照片数量时呼吸变浅。",
        "翻看照片的速度先快后慢，到最后一张时食指压住地址，不再继续翻。",
        "第一次打结失败，手指短暂停住；她短促吐气后重新系紧右腕红线。",
        "读地址时下颌由紧转稳，肩膀逐渐放下，目光从字迹抬向门口。",
        "手停在门锁0.8秒；一次深吸气后压下门把，恐惧未消失但行动已经开始。",
      ],
    },
    {
      trigger: "她抵达照片中的废弃照相馆，走廊尽头出现暗房红光",
      goal: "进入暗房找到寄照片的人",
      obstacle: "空间陌生、声音会暴露位置，黑暗不断放大预期恐惧",
      strategy: "压低动作幅度，依靠听觉和视线分段确认空间",
      pressure: "内部压力4/5升至5/5；外显维持2/5；自控4/5",
      camera: "手持幅度随紧张略增，人物停住时摄影机同步停止；红光出现后运镜减慢",
      beats: [
        "外景建立不要求人物表演；让湿地反光和残缺招牌先形成威胁。",
        "侧面跟拍中右手隔着口袋按住照片，步速略快，肩颈保持僵硬。",
        "推门时先只探入半个身体，眼神快速扫过左右，再让脚跨过门槛。",
        "踢到胶片盒时肩膀骤然上提，脚立刻停住，呼吸从鼻腔变成更浅的胸式呼吸。",
        "视线在地面胶片盒和尽头红光之间切换两次，右手持续压住口袋。",
        "推开暗房门前吞咽一次；门开启时下巴微抬，身体仍留一部分在门外。",
      ],
    },
    {
      trigger: "照片墙全部是她自己，录音又说她已经来过六次",
      goal: "从墙面、镜子和录音中拼出过去六次发生的事实",
      obstacle: "最值得怀疑的人变成了她自己，防御开始松动",
      strategy: "继续检查物证，不让情绪先于事实爆发",
      pressure: "内部压力5/5；外显由2/5升至3/5；自控由4/5降至3/5",
      camera: "照片墙用缓慢横移承载认知，录音出现时切近但不绕拍；闭眼0.3秒后镜头停止移动",
      beats: [
        "进入照片墙全景时身体位于画面边缘，头部缓慢抬起，眼睛先找到第一排。",
        "视线随横移逐排移动，嘴唇保持闭合，呼吸逐渐变浅，不连续眨眼。",
        "看到空白第七排时冻结，眉心中央轻皱，肩膀出现第一次明显下沉。",
        "按下录音键后手指留在按钮上；听见自己的声音时闭眼0.3秒，下唇内收。",
        "录音说“别再删掉它”时眼睛重新睁开，视线移向冲印机，身体没有后退。",
        "滚轴咬住相纸时手掌撑住桌沿，指节轻微发白，下颌重新收紧等待图像出现。",
      ],
    },
    {
      trigger: "第七张照片显示她倒在暗房，门外脚步随即靠近",
      goal: "看清最后信息，并决定逃走还是相信过去的自己",
      obstacle: "死亡图像打断呼吸，现实威胁正在门外逼近",
      strategy: "压住哭泣和退缩，把恐惧集中到握紧照片与直视门口",
      pressure: "内部压力5/5；外显由2/5升至4/5后回到2/5；自控由3/5降至2/5再回升至4/5",
      camera: "识别开始后极慢推进，顶点时停止；门把镜头锁焦，最后人物稳定时摄影机也恢复稳定",
      beats: [
        "相纸完全吐出时她不立即触碰；视线停在逐渐出现的人形轮廓，呼吸悬住。",
        "认出自己倒地后身体冻结0.4秒，瞳孔短暂放大，嘴唇微张但无声。",
        "延迟鼻吸气进入，下颌收紧，喉结吞咽，眼眶出现水光但不落泪。",
        "翻到背面时拇指压弯纸边；读完文字后视线从照片移向门口，右腕红线保持可见。",
        "门把转动时她先后退半步，胸腔短促起伏一次；脚后跟停住后不再继续退。",
        "把照片攥紧，缓慢吐气，下颌重新稳定，直视门口；切黑后保留未完成吸气作为余波。",
      ],
    },
  ];

  const emotionEnhancedBody = shotBlocks
    .map((block, shotIndex) => {
      const phase = emotionPhases[Math.floor(shotIndex / 6)] ?? emotionPhases.at(-1)!;
      const beat = phase.beats[shotIndex % 6];
      return `${block}
【分镜情绪融合】
触发：${phase.trigger}。
目标：${phase.goal}。
阻碍：${phase.obstacle}。
保护策略：${phase.strategy}。
三轴控制：${phase.pressure}。
可见微表演：${beat}
摄影机与环境响应：${phase.camera}。`;
    })
    .join("\n\n");

  const emotionEnhancedFinal: DetailSection = {
    label: "04.3 分镜 + 情绪一体稿",
    title: "《第七张照片》逐镜融合完整最终剧本",
    intro:
      "融合技能在同一镜头内保留时间码、构图、机位、动作、场景、道具和音效，并直接写入触发、目标、阻碍、保护策略、三轴控制、微表演及摄影机响应。",
    body: emotionEnhancedBody,
  };

  const numberedGates = demoOutputs.promptPlan.map((section) => {
    const gatePrefix =
      section.label.startsWith("Gate 1") ? "04.G1" :
      section.label.startsWith("Gate 2") ? "04.G2" :
      section.label.startsWith("Gate 3") ? "04.G3" :
      section.label === "风格四段" ? "04.G3附" :
      section.label === "固定提示词结构" ? "04.G4模板" :
      section.label.startsWith("Gate 4") ? "04.G4" :
      section.label.startsWith("Gate 5") ? "04.G5" :
      section.label.startsWith("Gate 6") ? "04.G6" :
      "04.G";
    return { ...section, label: `${gatePrefix} ${section.label}` };
  });
  const finalCheck: DetailSection = {
    label: "04.4 全片连续性与可生成性检查",
    title: "01—04依赖是否完整传到最终分镜",
    body: `01剧本依赖：所有镜头都能追溯到已确认的场次、戏剧动作、价值转变和180秒体量。
02人物依赖：P01固定同一脸型、五官比例、年龄、妆发、服装与右腕红线。
03视觉依赖：全部场景、道具、人物和关键帧继承同一STYLE-A01风格母版与资产编号。
04 Gate状态：资产、位置与风格、时间划分、提示词结构、交付形式和HTML QA均已确认。
镜头结构：每镜固定为画面动作概述 → 画面构图 → 机位 → 动作 → 表情 → 音效。
情绪结构：人物情绪包含触发、目标、阻碍、保护策略、三轴控制、可见微表演、顶点、余波和摄影机响应。
生成约束：单条视频提示词不超过15秒，镜头数量、空间左右、道具受力、声源与切点明确。

完整流程确认口令：确认04。`,
  };

  return [...numberedGates, shotTable, ...promptGroups, emotionEnhancedFinal, finalCheck];
}

function downloadDemo() {
  const sections = stages
    .flatMap((stage) => [
      `# ${stage.number} ${stage.title}`,
      ...getDisplayOutput(stage.id).map(
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
    ? getDisplayOutput(activeStage)
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
            <small>01—04固定顺序工作流Demo</small>
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
        <span>由总流程入口强制按01—04执行：故事创作、真人身份、统一视觉资产、最终分镜与逐镜情绪。</span>
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
            <span>01 → 02 → 03 → 04</span>
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
                  onClick={() => {
                    setActiveStage(item.stage);
                    window.setTimeout(() => {
                      document
                        .querySelector(`[data-detail-label="${item.targetLabel}"]`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 0);
                  }}
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
                <section
                  className="detail-section"
                  data-detail-label={section.label}
                  key={`${section.label}-${section.title}`}
                >
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
            <span>1个总流程入口 + 4个按序生产技能</span>
            <div>
              <p><code>chuanzhang-ai-shijie-workflow</code><strong>总入口：保存步骤状态，未确认前一步时禁止启动后一步</strong></p>
              <p><code>01｜chuanzhang-chuangzuo-v1</code><strong>破题、梗概、人物、结构、分场、拉片节奏、可拍摄剧本与剧本医生</strong></p>
              <p><code>02｜chuanzhangzhenren-prompts</code><strong>真人身份锚点、皮肤妆发、镜头光线与一致性</strong></p>
              <p><code>03｜chuanzhang-tuxiangtishici</code><strong>统一风格母版、场景、道具、人物和关键帧中英双语提示词</strong></p>
              <p><code>04｜chuanzhang-fenjing-biaoqing</code><strong>六道确认、镜头总表、视频提示词和逐镜完整表情</strong></p>
            </div>
          </section>

          <section className="ownership-cta">
            <span>想用自己的灵感真正生成？</span>
            <h2>选择属于你自己的运行方式</h2>
            <div>
              <a href={`${repositoryUrl}#安装全部技能`}>
                <small>推荐</small><strong>安装总流程 + 4个生产技能</strong>
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
