"use client";

import { useEffect, useMemo, useState } from "react";

type StageId = "idea" | "story" | "visual" | "plan" | "storyboard";

type ProjectState = {
  name: string;
  idea: string;
  format: string;
  genre: string;
  ratio: string;
  style: string;
  outputs: Partial<Record<StageId, string>>;
};

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
    description: "把零散想法整理成高概念、核心戏剧动作和明确的故事方向。",
    button: "生成故事方向",
  },
  {
    id: "story",
    number: "02",
    eyebrow: "建立故事世界",
    title: "故事创作",
    description: "完成人物、世界观、结构大纲和可拍摄的中文分场故事。",
    button: "生成完整故事",
  },
  {
    id: "visual",
    number: "03",
    eyebrow: "把文字变成画面",
    title: "视觉提示词",
    description: "统一角色长相、真人质感、情绪表演、场景与关键帧图片提示词。",
    button: "生成视觉方案",
  },
  {
    id: "plan",
    number: "04",
    eyebrow: "开拍前的确认",
    title: "分镜确认",
    description: "核对资产、人物位置、视觉风格和每段不超过15秒的时间划分。",
    button: "生成分镜方案",
  },
  {
    id: "storyboard",
    number: "05",
    eyebrow: "交付生产指令",
    title: "最终分镜",
    description: "输出镜头表、表演、构图、机位、声音与可复制的视频提示词。",
    button: "生成最终分镜",
  },
];

const emptyProject: ProjectState = {
  name: "未命名影片",
  idea: "",
  format: "1—3分钟概念短片",
  genre: "悬疑",
  ratio: "9:16 竖屏",
  style: "电影写实，克制、有真实摄影质感",
  outputs: {},
};

const exampleIdeas = [
  "一个失去记忆的女孩，每天醒来都会收到未来的自己寄来的照片。",
  "深夜末班地铁里，老人发现所有乘客都是年轻时的自己。",
  "古代女将军凯旋回城，却在城门下看见已经战死的爱人。",
];

function downloadProject(project: ProjectState) {
  const sections = stages
    .filter((stage) => project.outputs[stage.id])
    .map(
      (stage) =>
        `## ${stage.number} ${stage.title}\n\n${project.outputs[stage.id]}`,
    )
    .join("\n\n---\n\n");
  const text = `# ${project.name}\n\n> ${project.idea}\n\n- 体量：${project.format}\n- 类型：${project.genre}\n- 比例：${project.ratio}\n- 风格：${project.style}\n\n${sections}`;
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${project.name || "船长AI创作项目"}.md`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Home() {
  const [project, setProject] = useState<ProjectState>(emptyProject);
  const [activeStage, setActiveStage] = useState<StageId>("idea");
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("gpt-5.6-terra");
  const [rememberKey, setRememberKey] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [revision, setRevision] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedProject = localStorage.getItem("captain-ai-project");
      const storedModel = localStorage.getItem("captain-ai-model");
      const storedKey = localStorage.getItem("captain-ai-api-key");
      if (storedProject) setProject(JSON.parse(storedProject));
      if (storedModel) setModel(storedModel);
      if (storedKey) {
        setApiKey(storedKey);
        setRememberKey(true);
      }
    } catch {
      // A damaged local draft should never block the workspace.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("captain-ai-project", JSON.stringify(project));
  }, [project, hydrated]);

  const currentIndex = stages.findIndex((stage) => stage.id === activeStage);
  const currentStage = stages[currentIndex];
  const currentOutput = project.outputs[activeStage] ?? "";
  const completedCount = stages.filter((stage) => project.outputs[stage.id]).length;

  const previousContext = useMemo(
    () =>
      stages
        .slice(0, currentIndex)
        .filter((stage) => project.outputs[stage.id])
        .map(
          (stage) =>
            `【${stage.title}】\n${project.outputs[stage.id]}`,
        )
        .join("\n\n"),
    [currentIndex, project.outputs],
  );

  function updateProject<K extends keyof ProjectState>(
    key: K,
    value: ProjectState[K],
  ) {
    setProject((current) => ({ ...current, [key]: value }));
  }

  function saveSettings() {
    localStorage.setItem("captain-ai-model", model);
    if (rememberKey) {
      localStorage.setItem("captain-ai-api-key", apiKey);
    } else {
      localStorage.removeItem("captain-ai-api-key");
    }
    setSettingsOpen(false);
    setError("");
  }

  function resetProject() {
    if (!window.confirm("新建项目会清空当前本地草稿，是否继续？")) return;
    setProject(emptyProject);
    setActiveStage("idea");
    setRevision("");
    setError("");
  }

  async function generate() {
    setError("");
    if (!apiKey.trim()) {
      setSettingsOpen(true);
      setError("请先填写你自己的 OpenAI API Key。");
      return;
    }
    if (!project.idea.trim()) {
      setError("先写下一句话灵感，再开始创作。");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: apiKey.trim(),
          model: model.trim(),
          stage: activeStage,
          project: {
            name: project.name,
            idea: project.idea,
            format: project.format,
            genre: project.genre,
            ratio: project.ratio,
            style: project.style,
          },
          previousContext,
          currentDraft: currentOutput,
          revision: revision.trim(),
        }),
      });
      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !data.text) {
        throw new Error(data.error || "生成失败，请稍后重试。");
      }
      setProject((current) => ({
        ...current,
        outputs: { ...current.outputs, [activeStage]: data.text },
      }));
      setRevision("");
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "生成失败，请稍后重试。",
      );
    } finally {
      setLoading(false);
    }
  }

  function continueToNext() {
    if (currentIndex < stages.length - 1) {
      setActiveStage(stages[currentIndex + 1].id);
      setRevision("");
      setError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setActiveStage("idea")}>
          <span className="brand-mark">船</span>
          <span>
            <strong>船长AI视界</strong>
            <small>创作工作台</small>
          </span>
        </button>
        <div className="topbar-actions">
          <span className="save-state">
            <i />
            草稿已保存在本机
          </span>
          <button className="ghost-button" onClick={resetProject}>
            新建项目
          </button>
          <button className="ghost-button" onClick={() => downloadProject(project)}>
            导出项目
          </button>
          <button
            className={`api-button ${apiKey ? "connected" : ""}`}
            onClick={() => setSettingsOpen(true)}
          >
            <span className="api-dot" />
            {apiKey ? "API 已填写" : "设置 API"}
          </button>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="project-block">
            <label htmlFor="project-name">当前项目</label>
            <input
              id="project-name"
              value={project.name}
              onChange={(event) => updateProject("name", event.target.value)}
              aria-label="项目名称"
            />
            <div className="progress-row">
              <span>{completedCount} / {stages.length} 已完成</span>
              <span>{Math.round((completedCount / stages.length) * 100)}%</span>
            </div>
            <div className="progress-track">
              <span style={{ width: `${(completedCount / stages.length) * 100}%` }} />
            </div>
          </div>

          <nav className="stage-nav" aria-label="创作步骤">
            {stages.map((stage, index) => {
              const isActive = stage.id === activeStage;
              const isDone = Boolean(project.outputs[stage.id]);
              return (
                <button
                  key={stage.id}
                  className={`${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
                  onClick={() => {
                    setActiveStage(stage.id);
                    setRevision("");
                    setError("");
                  }}
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
            <span>KEY</span>
            <p>
              你的 API Key 不进入项目文件，也不会保存在本站服务器。
            </p>
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
                  <span>CREATIVE BRIEF</span>
                  <h2>这次想讲一个什么故事？</h2>
                </div>
                <em>必填</em>
              </div>
              <textarea
                className="idea-input"
                value={project.idea}
                onChange={(event) => updateProject("idea", event.target.value)}
                placeholder="写下一句话灵感，不需要完整。例如：一个失去记忆的女孩，每天收到未来的自己寄来的照片……"
              />
              <div className="idea-examples">
                <span>没有头绪？试试：</span>
                {exampleIdeas.map((idea, index) => (
                  <button key={idea} onClick={() => updateProject("idea", idea)}>
                    灵感 {index + 1}
                  </button>
                ))}
              </div>
              <div className="brief-grid">
                <label>
                  影片体量
                  <select
                    value={project.format}
                    onChange={(event) => updateProject("format", event.target.value)}
                  >
                    <option>1—3分钟概念短片</option>
                    <option>5—10分钟短片</option>
                    <option>长片</option>
                    <option>多集微短剧</option>
                  </select>
                </label>
                <label>
                  故事类型
                  <select
                    value={project.genre}
                    onChange={(event) => updateProject("genre", event.target.value)}
                  >
                    <option>悬疑</option>
                    <option>爱情</option>
                    <option>科幻</option>
                    <option>动作</option>
                    <option>喜剧</option>
                    <option>奇幻</option>
                    <option>现实主义</option>
                  </select>
                </label>
                <label>
                  画面比例
                  <select
                    value={project.ratio}
                    onChange={(event) => updateProject("ratio", event.target.value)}
                  >
                    <option>9:16 竖屏</option>
                    <option>16:9 横屏</option>
                    <option>2.39:1 宽银幕</option>
                    <option>1:1 方形</option>
                  </select>
                </label>
                <label>
                  视觉方向
                  <input
                    value={project.style}
                    onChange={(event) => updateProject("style", event.target.value)}
                  />
                </label>
              </div>
            </section>
          )}

          {activeStage !== "idea" && (
            <section className="context-strip">
              <div>
                <span>创作依据</span>
                <strong>{project.name}</strong>
              </div>
              <p>{project.idea}</p>
              <button onClick={() => setActiveStage("idea")}>修改基础设定</button>
            </section>
          )}

          {currentOutput && (
            <section className="output-card">
              <div className="output-head">
                <div>
                  <span>AI OUTPUT · {currentStage.number}</span>
                  <h2>{currentStage.title}结果</h2>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(currentOutput)}
                  className="copy-button"
                >
                  复制结果
                </button>
              </div>
              <article>{currentOutput}</article>
            </section>
          )}

          <section className="action-card">
            <label htmlFor="revision">
              {currentOutput ? "需要修改什么？" : "补充要求（可选）"}
            </label>
            <textarea
              id="revision"
              value={revision}
              onChange={(event) => setRevision(event.target.value)}
              placeholder={
                currentOutput
                  ? "只写要调整的部分，例如：让主角更克制，结尾不要反转……"
                  : "例如：不需要对白、偏冷色、人物要有东方气质……"
              }
            />
            {error && <p className="error-message">{error}</p>}
            <div className="action-row">
              <p>
                <span className="spark">✦</span>
                {currentOutput
                  ? "修改会保留已经确认的方向，只重做当前步骤。"
                  : "系统会读取此前已经确认的全部创作结果。"}
              </p>
              <div>
                <button
                  className="generate-button"
                  onClick={generate}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner" />
                      正在创作
                    </>
                  ) : (
                    <>
                      <span>✦</span>
                      {currentOutput ? "按意见重新生成" : currentStage.button}
                    </>
                  )}
                </button>
                {currentOutput && currentIndex < stages.length - 1 && (
                  <button className="continue-button" onClick={continueToNext}>
                    确认并进入下一步
                    <span>→</span>
                  </button>
                )}
                {currentOutput && currentIndex === stages.length - 1 && (
                  <button
                    className="continue-button"
                    onClick={() => downloadProject(project)}
                  >
                    导出完整项目
                    <span>↓</span>
                  </button>
                )}
              </div>
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
            分享 AI 影视故事创作、图像提示词、真人摄影质感、人物情绪表演、
            影视分镜与视频生成工作流。扫码获取技能更新、创作案例和实用方法。
          </p>
        </div>
      </section>

      {settingsOpen && (
        <div className="modal-backdrop" role="presentation">
          <section
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
          >
            <button
              className="modal-close"
              onClick={() => setSettingsOpen(false)}
              aria-label="关闭设置"
            >
              ×
            </button>
            <span className="modal-kicker">AI CONNECTION</span>
            <h2 id="settings-title">连接你自己的 OpenAI API</h2>
            <p className="modal-intro">
              每位使用者填写自己的 Key，费用由各自的 OpenAI API 账户结算。本站不提供共享 Key。
            </p>
            <label>
              OpenAI API Key
              <input
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="sk-..."
                autoComplete="off"
              />
            </label>
            <label>
              使用模型
              <select value={model} onChange={(event) => setModel(event.target.value)}>
                <option value="gpt-5.6-terra">GPT-5.6 Terra · 均衡推荐</option>
                <option value="gpt-5.6">GPT-5.6 · 质量优先</option>
                <option value="gpt-5.6-luna">GPT-5.6 Luna · 速度优先</option>
              </select>
            </label>
            <label className="remember-row">
              <input
                type="checkbox"
                checked={rememberKey}
                onChange={(event) => setRememberKey(event.target.checked)}
              />
              <span>
                <strong>仅保存在这台设备</strong>
                <small>取消勾选后，关闭页面即需要重新填写。</small>
              </span>
            </label>
            <div className="security-box">
              <strong>Key 如何使用？</strong>
              <p>
                Key 只在你点击生成时发送给本站的安全转发接口，再交给 OpenAI；接口不会记录或写入数据库。
              </p>
            </div>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noreferrer"
              className="key-help"
            >
              我还没有 API Key，去 OpenAI 创建
              <span>↗</span>
            </a>
            <button className="save-settings" onClick={saveSettings}>
              保存并开始使用
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
