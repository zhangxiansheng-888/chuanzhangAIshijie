# HTML 稳定模板 v2

输出必须是单个自包含 HTML 文件，网页内所有可见文字使用简体中文。

## 关键规则

- 禁止使用 `rowspan`。
- 禁止使用 `colspan`。
- 一条提示词组对应一个 `<tr class="prompt-row">`。
- 每条提示词组必须有独立“时间安排”列。
- 每条提示词组必须有独立“本段使用资产图对照表”，放在提示词单元格内、复制提示词正文外。
- 每条提示词组必须显示可复制提示词正文字数，正文不超过 2200 字。
- 每条提示词组可显示“可手动删减建议”，但删减建议不得进入复制提示词正文。
- 同一提示词组内的多个镜头，用 `.shot-line` 在“镜头分解”单元格里纵向排列。
- 长提示词必须在 `.prompt-block` 内换行，不能撑破表格。
- 表格必须可横向滚动，不能在窄屏上挤压错位。

## 完整结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>分镜提示词表——场景 {SCOPE}</title>
  <style>
    :root {
      --bg: #09090b;
      --panel: #111113;
      --panel2: #18181b;
      --line: #2f2f35;
      --line2: #3f3f46;
      --text: #e7e7ea;
      --muted: #a1a1aa;
      --subtle: #71717a;
      --green: #22c55e;
      --red: #ef4444;
      --amber: #f59e0b;
      --blue: #38bdf8;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif;
      line-height: 1.55;
    }
    .container {
      width: min(1780px, calc(100vw - 32px));
      margin: 0 auto;
      padding: 28px 0 48px;
    }
    .top {
      border: 1px solid var(--line);
      background: var(--panel);
      padding: 22px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    h1 {
      margin: 0 0 8px;
      font-size: 26px;
      line-height: 1.25;
      letter-spacing: 0;
    }
    .sub { color: var(--muted); font-size: 14px; }
    .author { color: #d4d4d8; font-size: 13px; margin-top: 4px; }
    .stats {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 14px;
    }
    .stat {
      min-width: 112px;
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 10px 12px;
      background: #0c0c0f;
    }
    .stat .v { font-size: 22px; font-weight: 700; }
    .stat .l { color: var(--subtle); font-size: 12px; }
    .toolbar {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
      margin: 14px 0;
    }
    input, select, button {
      min-height: 36px;
      border: 1px solid var(--line2);
      border-radius: 6px;
      background: var(--panel2);
      color: var(--text);
      padding: 7px 10px;
      font-size: 13px;
    }
    input { min-width: 280px; flex: 1; }
    button { cursor: pointer; white-space: nowrap; }
    .toc {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 18px;
      background: var(--panel);
    }
    .toc-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    .toc-label { color: var(--muted); margin-right: 4px; }
    .toc a {
      color: var(--text);
      text-decoration: none;
      border: 1px solid var(--line2);
      border-radius: 999px;
      padding: 3px 9px;
      font-size: 12px;
    }
    .block-title { margin: 22px 0 12px; font-size: 18px; }
    .scene {
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 18px;
      background: var(--panel);
    }
    .scene-head {
      padding: 16px 18px;
      border-bottom: 1px solid var(--line);
      background: #121214;
    }
    .scene-num {
      display: inline-block;
      color: #fecaca;
      border: 1px solid rgba(239, 68, 68, .45);
      border-radius: 999px;
      padding: 2px 9px;
      font-size: 12px;
      margin-bottom: 8px;
    }
    .scene-title {
      margin: 0 0 8px;
      font-size: 19px;
      letter-spacing: 0;
    }
    .scene-meta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 13px;
    }
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      overscroll-behavior-x: contain;
    }
    table.shotlist {
      width: 100%;
      min-width: 1560px;
      border-collapse: collapse;
      table-layout: fixed;
    }
    .shotlist th, .shotlist td {
      border-bottom: 1px solid var(--line);
      border-right: 1px solid var(--line);
      padding: 10px;
      vertical-align: top;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .shotlist th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: #151518;
      color: #d4d4d8;
      font-size: 12px;
      text-align: left;
      white-space: nowrap;
    }
    .shotlist td { font-size: 12px; }
    .c-num { width: 70px; color: var(--muted); }
    .c-plan { width: 120px; }
    .c-time { width: 160px; color: #d4d4d8; }
    .c-breakdown { width: 300px; }
    .c-script { width: 280px; color: #d8d8dd; }
    .c-prompt { width: 630px; background: #0d0d10; }
    .badge {
      display: inline-block;
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      border: 1px solid var(--line2);
      color: var(--text);
      background: #222226;
      white-space: normal;
      max-width: 100%;
    }
    .p-ws { border-color: #38bdf8; color: #bae6fd; }
    .p-ms { border-color: #22c55e; color: #bbf7d0; }
    .p-cu { border-color: #f59e0b; color: #fde68a; }
    .p-ecu, .p-macro { border-color: #ef4444; color: #fecaca; }
    .p-pan, .p-dis { border-color: #a78bfa; color: #ddd6fe; }
    .p-os, .p-vo { border-color: #94a3b8; color: #cbd5e1; }
    .shot-line {
      border: 1px solid var(--line);
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 8px;
      background: #141417;
    }
    .shot-line:last-child { margin-bottom: 0; }
    .shot-line .meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: 11px;
      margin-bottom: 4px;
    }
    .script-inner {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    .prompt-head {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      border-top: 1px solid var(--line2);
      margin: 10px 0 8px;
      padding-top: 8px;
    }
    .prompt-head:first-child {
      border-top: 0;
      margin-top: 0;
      padding-top: 0;
    }
    .prompt-title { color: var(--green); font-weight: 700; }
    .prompt-tag { color: var(--subtle); font-size: 11px; }
    .prompt-time {
      color: #bae6fd;
      font-size: 11px;
      border: 1px solid rgba(56, 189, 248, .35);
      border-radius: 999px;
      padding: 1px 7px;
    }
    .prompt-count {
      color: #bbf7d0;
      font-size: 11px;
      border: 1px solid rgba(34, 197, 94, .35);
      border-radius: 999px;
      padding: 1px 7px;
    }
    .asset-map {
      border: 1px solid var(--line);
      border-radius: 6px;
      background: #101013;
      padding: 8px;
      margin-bottom: 10px;
    }
    .asset-title {
      color: #d4d4d8;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    table.asset-table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      font-size: 11px;
    }
    .asset-table th, .asset-table td {
      border: 1px solid var(--line);
      padding: 5px 6px;
      vertical-align: top;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .asset-table th {
      position: static;
      background: #18181b;
      color: var(--muted);
      white-space: normal;
    }
    .trim-note {
      color: #fde68a;
      font-size: 11px;
      border: 1px solid rgba(245, 158, 11, .35);
      border-radius: 6px;
      padding: 6px 8px;
      margin: 0 0 8px;
      background: rgba(245, 158, 11, .08);
    }
    .copy-btn {
      min-height: 24px;
      padding: 2px 8px;
      font-size: 11px;
      color: var(--muted);
      margin-left: auto;
    }
    .prompt-block {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      word-break: break-word;
      line-height: 1.68;
      color: #f4f4f5;
      background: #08080a;
      border: 1px solid #27272a;
      border-radius: 6px;
      padding: 10px;
      max-width: 100%;
    }
    .qa-note {
      color: var(--muted);
      font-size: 12px;
      margin: 14px 0 0;
    }
    .empty-state {
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 16px;
      color: var(--muted);
      background: var(--panel);
    }
    @media print {
      body { background: #fff; color: #000; }
      .toolbar, .toc, .copy-btn { display: none !important; }
      .container { width: 100%; padding: 0; }
      .scene, .top { break-inside: avoid; border-color: #999; }
      table.shotlist { min-width: 0; }
      .prompt-block { color: #000; background: #fff; border-color: #999; }
    }
  </style>
</head>
<body>
<div class="container">
  <header class="top">
    <h1>分镜提示词表——<span>场景 {SCOPE}</span></h1>
    <div class="sub">为 {USERNAME} 准备 · {N_SCENES} 个场景 · {N_SHOTS} 个镜头 · {N_PROMPTS} 条中文 Seedance 2.0 提示词</div>
    <div class="author">船长AI视界</div>
    <div class="stats">
      <div class="stat"><div class="v">{N_SCENES}</div><div class="l">场景数</div></div>
      <div class="stat"><div class="v">{N_SHOTS}</div><div class="l">镜头数</div></div>
      <div class="stat"><div class="v">{N_PROMPTS}</div><div class="l">提示词数</div></div>
    </div>
    <div class="qa-note">网页布局检查：已检查，无 rowspan/colspan，长提示词可换行，表格可横向滚动。</div>
  </header>

  <div class="toolbar">
    <input type="text" id="search" placeholder="搜索文字、对白、地点、道具...">
    <select id="planFilter">
      <option value="">全部景别</option>
      {PLAN_OPTIONS}
    </select>
    <button onclick="window.print()">打印 / 导出 PDF</button>
    <button onclick="resetFilters()">重置</button>
  </div>

  <div class="toc">
    <div class="toc-row"><span class="toc-label">场景</span>{TOC_LINKS}</div>
  </div>

  {SCENE_BLOCKS}

  <div class="empty-state" id="emptyState" style="display:none;">没有找到匹配内容，请重置筛选。</div>
</div>

<script>
  function normalizeText(s) {
    return (s || '').toLowerCase();
  }
  function applyFilters() {
    const q = normalizeText(document.getElementById('search').value);
    const plan = document.getElementById('planFilter').value;
    let visible = 0;
    document.querySelectorAll('.prompt-row').forEach(row => {
      const textOk = !q || normalizeText(row.textContent).includes(q);
      const planOk = !plan || (row.dataset.plan || '').split(' ').includes(plan);
      const show = textOk && planOk;
      row.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    document.getElementById('emptyState').style.display = visible ? 'none' : '';
    document.querySelectorAll('.scene').forEach(scene => {
      const any = Array.from(scene.querySelectorAll('.prompt-row')).some(r => r.style.display !== 'none');
      scene.style.display = any ? '' : 'none';
    });
  }
  function resetFilters() {
    document.getElementById('search').value = '';
    document.getElementById('planFilter').value = '';
    applyFilters();
  }
  function copyPrompt(btn) {
    const block = btn.closest('.prompt-cell').querySelector('.prompt-block');
    navigator.clipboard.writeText(block.textContent);
    btn.textContent = '已复制';
    setTimeout(() => btn.textContent = '复制', 1200);
  }
  document.getElementById('search').addEventListener('input', applyFilters);
  document.getElementById('planFilter').addEventListener('change', applyFilters);
</script>
</body>
</html>
```

## 场景区块

```html
<section class="scene pal-red" id="sc{N}">
  <div class="scene-head">
    <span class="scene-num">场景 {N}</span>
    <h2 class="scene-title">{SCENE_HEADER_ZH}</h2>
    <div class="scene-meta">
      <span><b>地点：</b>{LOCATION_DESC_ZH}</span>
      <span><b>情绪：</b>{MOOD_ZH}</span>
      <span><b>风格依据：</b>{STYLE_SOURCE_ZH}</span>
    </div>
  </div>
  <div class="table-wrap">
    <table class="shotlist">
      <colgroup>
        <col style="width:70px">
        <col style="width:120px">
        <col style="width:160px">
        <col style="width:300px">
        <col style="width:280px">
        <col style="width:630px">
      </colgroup>
      <thead>
        <tr>
          <th>编号</th>
          <th>景别</th>
          <th>时间安排</th>
          <th>镜头分解</th>
          <th>剧本内容</th>
          <th>Seedance 2.0 提示词</th>
        </tr>
      </thead>
      <tbody>
        {PROMPT_ROWS}
      </tbody>
    </table>
  </div>
</section>
```

## 提示词组行

每条提示词组只生成一个 `<tr>`。不要跨行。

```html
<tr class="prompt-row" data-scene="{SCENE_N}" data-plan="{PLAN_CODES_SPACE_SEPARATED}">
  <td class="c-num">{SHOT_RANGE}</td>
  <td class="c-plan">{PLAN_BADGES_ZH}</td>
  <td class="c-time">
    <div><b>场景内：</b>{PROMPT_TIME_RANGE}</div>
    <div><b>预计：</b>{PROMPT_DURATION}</div>
    <div><b>内部：</b>{INTERNAL_DURATIONS_ZH}</div>
    <div><b>生成：</b>{GENERATION_DURATION_HINT_ZH}</div>
  </td>
  <td class="c-breakdown">
    <div class="shot-line">
      <div class="meta"><span>{SHOT_NUM}</span><span>{PLAN_LABEL_ZH}</span><span>{CAMERA_NOTE_ZH}</span></div>
      <div>{ACTION_BEAT_ZH}</div>
    </div>
    {MORE_SHOT_LINES}
  </td>
  <td class="c-script"><div class="script-inner">{FULL_SCENE_TEXT_ZH}</div></td>
  <td class="c-prompt prompt-cell">
    <div class="asset-map">
      <div class="asset-title">本段使用资产图对照表</div>
      <table class="asset-table">
        <thead>
          <tr>
            <th>句柄</th>
            <th>资产名称</th>
            <th>原始文件 / 图号</th>
            <th>类型</th>
            <th>本段用途</th>
            <th>使用镜头</th>
            <th>注意事项</th>
          </tr>
        </thead>
        <tbody>
          {ASSET_USAGE_ROWS}
        </tbody>
      </table>
    </div>
    <div class="prompt-head">
      <span class="prompt-title">提示词 {PROMPT_N}</span>
      <span class="prompt-tag">[{TAG_ZH}]</span>
      <span class="prompt-time">{PROMPT_TIME_RANGE} · {PROMPT_DURATION}</span>
      <span class="prompt-count">约 {PROMPT_CHAR_COUNT} / 2200 字</span>
      <button class="copy-btn" onclick="copyPrompt(this)">复制</button>
    </div>
    <div class="trim-note">可手动删减：{TRIM_SUGGESTION_ZH}</div>
    <div class="prompt-block">{CHINESE_PROMPT}</div>
  </td>
</tr>
```

## 生成后静态检查

交付前检查最终 HTML：

- 不包含 `rowspan`
- 不包含 `colspan`
- 每个 `.prompt-row` 都有 6 个直接 `td`
- CSS 包含 `table-layout: fixed`
- `.prompt-block` 包含 `white-space: pre-wrap` 和 `overflow-wrap: anywhere`
- 每条提示词组都有“本段使用资产图对照表”
- 每条提示词组显示 `约 {PROMPT_CHAR_COUNT} / 2200 字`
- `可手动删减` 文本不在 `.prompt-block` 内
