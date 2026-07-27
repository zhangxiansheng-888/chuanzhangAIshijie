"use client";

import { useState } from "react";

type StageId = "idea" | "story" | "visual" | "plan" | "storyboard";

const repositoryUrl =
  "https://github.com/zhangxiansheng-888/chuanzhangAIshijie";

const stages: Array<{
  id: StageId;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  button: string;
}> = [
  {
    id: "idea",
    number: "01",
    eyebrow: "从一句话开始",
    title: "灵感破题",
    description: "把一句灵感整理成高概念、核心悬念和明确的故事方向。",
    button: "查看故事方向 Demo",
  },
  {
    id: "story",
    number: "02",
    eyebrow: "建立故事世界",
    title: "故事创作",
    description: "建立人物、规则、三幕结构与三分钟可拍摄故事。",
    button: "查看完整故事 Demo",
  },
  {
    id: "visual",
    number: "03",
    eyebrow: "人物先定妆，再做画面",
    title: "真人视觉提示词",
    description: "把真人感与人物情绪合并进同一套角色定妆和关键帧提示词。",
    button: "查看真人提示词 Demo",
  },
  {
    id: "plan",
    number: "04",
    eyebrow: "开拍前的确认",
    title: "分镜确认",
    description: "确认人物资产、空间关系、节奏划分和视觉连续性。",
    button: "查看分镜规划 Demo",
  },
  {
    id: "storyboard",
    number: "05",
    eyebrow: "交付生产指令",
    title: "最终分镜",
    description: "输出镜头、表演、构图、机位、声音和视频生成提示词。",
    button: "查看最终分镜 Demo",
  },
];

const demoOutputs: Record<StageId, string> = {
  idea: `片名：《第七张照片》

一句话高概念
一个每天都会失去昨日记忆的女孩，连续收到“未来的自己”寄来的照片；当第七张照片显示她将在今晚死去，她必须在记忆再次清空前找出寄信人。

核心悬念
照片到底来自未来，还是有人利用她的失忆操纵她？

核心戏剧动作
女孩把照片上的细节当作坐标，在有限时间内追查自己的过去。

三分钟方向
前30秒建立失忆与照片规则；中段通过三张照片连续升级；最后一张照片把线索指向镜子中的她自己。`,

  story: `主角
林晚，24岁。事故后患有顺行性遗忘，每天凌晨四点后无法保留当天形成的记忆。她依靠墙上的便签和即时相机维持生活。

故事结构
00:00—00:30｜第一张照片
林晚醒来，床边出现一张并非她相机拍摄的照片：她站在一栋废弃照相馆前，背面写着“不要相信今天的你”。

00:30—01:30｜照片开始预告
第二张照片提前拍下即将碎裂的水杯。几秒后，水杯真的落地。第三张照片里，她的手腕绑着陌生红线。她在抽屉深处找到同样的红线和六张日期不同的照片。

01:30—02:30｜寻找寄信人
她按照照片进入废弃照相馆。暗房里挂满她过去七天留下的记录。录音机中传来她自己的声音：“如果你听到这里，说明我又忘了。”

02:30—03:00｜第七张照片
最后一张照片显示她倒在暗房中。林晚发现“未来的自己”不是超自然存在，而是每天失忆前的她，利用延时冲印装置把线索留给第二天。门外脚步逼近，她终于想起：事故并非意外。画面停在门把缓慢转动的一刻。`,

  visual: `A｜女主角真人定妆提示词（固定身份）

中文提示词
24岁东亚女性，清瘦鹅蛋脸，眉骨柔和，内双深棕眼睛，眼下有轻微疲惫阴影，鼻梁自然，嘴唇偏薄，黑色锁骨短发略微凌乱；无网红妆感，保留真实毛孔、细小绒毛和轻微肤色不均；穿洗旧的米白针织衫与深灰长裤。纪实电影摄影，真实镜头光学，克制调色，50mm镜头，浅景深，皮肤不过度磨皮，人物身份在所有镜头保持一致。

English prompt
24-year-old East Asian woman, slim oval face, soft brow ridge, dark-brown inner double-lid eyes with subtle fatigue shadows, natural nose bridge, thin lips, slightly messy collarbone-length black hair; no influencer makeup, visible pores, fine facial hair and mild uneven skin tone; worn ivory knit sweater and charcoal trousers. Documentary cinematic photography, authentic lens optics, restrained color grade, 50mm lens, shallow depth of field, no plastic skin, identical facial identity across every shot.

B｜人物情绪表演规则

主情绪：警觉压住恐惧。
可见表演：视线先停在照片边缘，呼吸短暂停顿，下颌轻轻收紧；右手拇指反复摩擦照片背面，肩膀保持克制，不做夸张瞪眼。情绪峰值后保留一次缓慢吐气和失焦凝视。

C｜关键帧提示词

竖屏9:16，中近景。凌晨灰蓝色卧室，林晚坐在床沿，手中捏着一张刚显影的照片；窗帘缝隙切出一道冷光，床头暖灯形成微弱色温对比。她的视线锁定照片背面，呼吸停顿，下颌轻收，手指因用力微微发白。真实皮肤纹理，克制悬疑电影感，角色外貌严格沿用固定定妆。

负面约束
避免塑料皮肤、过度磨皮、网红脸、夸张表情、五官漂移、年龄变化、发型变化、多余手指、文字乱码、动漫感。`,

  plan: `资产确认
✓ 林晚固定真人定妆：外貌、发型、服装不可变化
✓ 核心道具：即时照片、红线、录音机、延时冲印装置
✓ 主场景：卧室、走廊、废弃照相馆、暗房

节奏规划
段落1（0—30秒）：3个镜头，建立失忆规则与第一张照片
段落2（30—90秒）：7个镜头，用预言照片连续升级
段落3（90—150秒）：6个镜头，进入照相馆并发现自我留言
段落4（150—180秒）：4个镜头，揭示真相并留下门外威胁

连续性规则
所有人物镜头复用同一角色定妆；红线始终绑在右手腕；暗房主光固定为红色安全灯；单个生成片段不超过15秒；每个镜头只安排一个主要戏剧动作。`,

  storyboard: `镜头01｜0:00—0:07
景别/机位：俯拍特写，缓慢下降
画面：凌晨4:07，床头电子钟闪烁。即时照片从画外滑入桌面。
声音：电流声、远处冰箱压缩机启动。
视频提示词：9:16竖屏，真实悬疑电影摄影，俯拍床头桌，照片缓慢滑入，冷灰晨光，克制运动，7秒。

镜头02｜0:07—0:15
景别/机位：50mm中近景，固定机位
表演：林晚先看电子钟，再看照片；呼吸停顿，下颌轻收，拇指摩擦照片边缘。
连续性：严格复用林晚固定真人定妆。

镜头03｜0:15—0:24
景别/机位：照片主观特写，轻微手持
画面：照片中的林晚站在废弃照相馆前；背面手写“不要相信今天的你”。
声音：纸张摩擦被异常放大。

……

镜头20｜2:52—3:00
景别/机位：暗房中景，缓慢推近
画面：门把从静止到缓慢转动。林晚没有后退，只把第七张照片攥进掌心。红灯映出真实皮肤与眼中尚未散去的恐惧。
声音：门锁金属声，录音机最后一句“这一次，别再忘了”。
结束：切黑，保留一次未完成的吸气声。`,
};

function downloadDemo() {
  const sections = stages
    .map((stage) => `## ${stage.number} ${stage.title}\n\n${demoOutputs[stage.id]}`)
    .join("\n\n---\n\n");
  const text = `# 《第七张照片》完整流程 Demo\n\n> 一个失忆女孩每天收到未来自己寄来的照片。\n\n- 体量：3分钟\n- 类型：悬疑\n- 比例：9:16 竖屏\n- 品牌：船长AI视界\n\n${sections}`;
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "船长AI视界-第七张照片-Demo.md";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [activeStage, setActiveStage] = useState<StageId>("idea");
  const [revealed, setRevealed] = useState<StageId[]>([]);
  const currentIndex = stages.findIndex((stage) => stage.id === activeStage);
  const currentStage = stages[currentIndex];
  const currentOutput = revealed.includes(activeStage)
    ? demoOutputs[activeStage]
    : "";

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
        <button className="brand" onClick={() => setActiveStage("idea")}>
          <span className="brand-mark">船</span>
          <span>
            <strong>船长AI视界</strong>
            <small>完整流程演示</small>
          </span>
        </button>
        <div className="topbar-actions">
          <span className="demo-status">
            <i />
            纯演示 · 不调用AI
          </span>
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
        <strong>这是公开 Demo</strong>
        <span>所有结果均为预制样例，不收集API Key，不产生AI费用。</span>
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
            <span>DEMO</span>
            <p>演示站没有生成接口。真正创作请安装技能，或把网站部署到自己的账号。</p>
          </div>
        </aside>

        <section className="content">
          <div className="content-head">
            <div>
              <span className="section-number">{currentStage.number}</span>
              <p>{currentStage.eyebrow}</p>
              <h1>{currentStage.title}</h1>
              <div className="orange-rule" />
              <p className="stage-description">{currentStage.description}</p>
            </div>
            <div className="stage-pager">
              <span>{currentIndex + 1}</span>
              <i />
              <span>{stages.length}</span>
            </div>
          </div>

          {activeStage === "idea" && (
            <section className="brief-card">
              <div className="card-heading">
                <div>
                  <span>DEMO CREATIVE BRIEF</span>
                  <h2>一个失忆女孩每天收到未来自己寄来的照片</h2>
                </div>
                <em>预制案例</em>
              </div>
              <div className="demo-idea">
                <p>
                  从一个明确灵感出发，依次完成故事、真人角色定妆、情绪提示词、
                  分镜规划和最终镜头表。
                </p>
              </div>
              <div className="brief-grid demo-brief-grid">
                <span><small>影片体量</small><strong>3分钟</strong></span>
                <span><small>故事类型</small><strong>悬疑</strong></span>
                <span><small>画面比例</small><strong>9:16 竖屏</strong></span>
                <span><small>视觉方向</small><strong>电影写实 · 克制</strong></span>
              </div>
            </section>
          )}

          {activeStage !== "idea" && (
            <section className="context-strip">
              <div>
                <span>演示项目</span>
                <strong>《第七张照片》</strong>
              </div>
              <p>一个失忆女孩每天收到未来自己寄来的照片。</p>
              <button onClick={() => setActiveStage("idea")}>返回灵感</button>
            </section>
          )}

          {currentOutput && (
            <section className="output-card">
              <div className="output-head">
                <div>
                  <span>DEMO OUTPUT · {currentStage.number}</span>
                  <h2>{currentStage.title}样例</h2>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(currentOutput)}
                  className="copy-button"
                >
                  复制样例
                </button>
              </div>
              <article>{currentOutput}</article>
            </section>
          )}

          <section className="action-card demo-action-card">
            <div>
              <span className="demo-action-kicker">NO API · NO COST</span>
              <h2>{currentOutput ? "这一步已经展示完成" : "查看这一阶段的完整样例"}</h2>
              <p>
                Demo只展示船长AI视界的工作方法。要输入自己的灵感，请安装技能或部署自己的版本。
              </p>
            </div>
            <div className="demo-action-buttons">
              {!currentOutput && (
                <button className="generate-button" onClick={revealCurrent}>
                  <span>✦</span>
                  {currentStage.button}
                </button>
              )}
              {currentOutput && currentIndex < stages.length - 1 && (
                <button className="continue-button" onClick={continueToNext}>
                  进入下一步
                  <span>→</span>
                </button>
              )}
              {currentOutput && currentIndex === stages.length - 1 && (
                <button className="continue-button" onClick={downloadDemo}>
                  下载完整Demo
                  <span>↓</span>
                </button>
              )}
            </div>
          </section>

          <section className="ownership-cta">
            <span>想用自己的灵感真正生成？</span>
            <h2>选择属于你自己的运行方式</h2>
            <div>
              <a href={`${repositoryUrl}#安装全部技能`}>
                <small>推荐</small>
                <strong>安装5个技能</strong>
                <p>在自己的Codex中运行，使用自己的会员和模型。</p>
              </a>
              <a href={`${repositoryUrl}#部署自己的版本`}>
                <small>独立使用</small>
                <strong>部署网站副本</strong>
                <p>网站与使用额度都归部署者自己，不占用演示站作者的AI额度。</p>
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
          <p>
            分享AI影视故事创作、图像提示词、真人摄影质感、人物情绪表演、
            影视分镜与视频生成工作流。扫码获取技能更新、创作案例和实用方法。
          </p>
        </div>
      </section>
    </main>
  );
}
