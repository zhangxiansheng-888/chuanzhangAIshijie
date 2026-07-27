import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the chuanzhangAIshijie creative workspace", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const source = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );
  const workflowSkill = await readFile(
    new URL("../skills/chuanzhang-ai-shijie-workflow/SKILL.md", import.meta.url),
    "utf8",
  );
  assert.match(html, /船长AI视界/);
  assert.match(html, /船长AI视界公众号二维码/);
  assert.match(html, /纯演示/);
  assert.match(html, /不调用AI/);
  assert.match(html, /部署自己的版本/);
  assert.match(html, /故事创作与完整中文剧本/);
  assert.match(html, /真人身份基准/);
  assert.match(html, /统一风格与静态视觉资产/);
  assert.match(html, /最终分镜、人物情绪与视频提示词/);
  assert.match(html, /完整交付目录/);
  assert.match(html, /场景提示词/);
  assert.match(html, /道具提示词/);
  assert.match(html, /真人提示词/);
  assert.match(html, /情绪融合最终稿/);
  assert.match(html, /关键帧提示词/);
  assert.match(source, /R01 第七张照片/);
  assert.match(source, /R02 右腕红线/);
  assert.match(source, /R03 裂纹白瓷杯/);
  assert.match(source, /R04 微型磁带录音机/);
  assert.match(source, /R05 延时冲印装置/);
  assert.match(source, /S01 凌晨卧室/);
  assert.match(source, /S02 小厨房/);
  assert.match(source, /S03 废弃照相馆走廊/);
  assert.match(source, /S04 暗房/);
  assert.match(source, /完整镜头总表/);
  assert.match(source, /完整视频提示词/);
  assert.match(source, /04｜分镜 \+ 情绪一体稿/);
  assert.match(source, /【分镜情绪融合】/);
  assert.match(source, /逐镜融合完整最终剧本/);
  assert.match(source, /本段使用资产图对照/);
  assert.match(source, /画面动作概述：/);
  assert.match(source, /画面构图：/);
  assert.match(source, /STYLE-A01/);
  assert.match(source, /Demo已确认风格说明/);
  assert.match(source, /案例管理信息｜不是图像技能固定输出/);
  assert.match(source, /类型｜中国城市真实实景心理悬疑/);
  assert.match(source, /时代｜当代生活空间 \+ 1990年代末模拟摄影设备/);
  assert.ok(
    (source.match(/\$\{staticAssetStyleGuide\.en\}/g) ?? []).length >= 12,
    "every static asset prompt should inherit the same English style guide",
  );
  assert.ok(
    (source.match(/\$\{staticAssetStyleGuide\.zh\}/g) ?? []).length >= 12,
    "every static asset prompt should inherit the same Chinese style guide",
  );
  assert.doesNotMatch(source, /label: "情绪提示词"/);
  assert.match(source, /Gate 6｜HTML QA/);
  assert.match(source, /15秒，这是上限，不是目标/);
  assert.doesNotMatch(source, /label: "拉片节奏解释"/);
  assert.doesNotMatch(source, /02\.1—02\.8 真人身份基准/);
  assert.match(source, /01\.6 分场大纲 \/ 场景拆解（含双轨节奏）/);
  assert.match(source, /01\.7 场景写作/);
  assert.match(source, /01\.8 剧本医生/);
  assert.match(source, /01\.9 量化评分/);
  assert.match(source, /身份参考\(如有\) → 图像用途 → 身份锚点/);
  assert.match(source, /\*\*真人写真提示词\*\*/);
  assert.match(source, /\*\*这版控制的重点\*\*/);
  assert.doesNotMatch(source, /12组视频提示词覆盖180秒/);
  assert.match(html, /01 → 02 → 03 → 04/);
  assert.match(html, /最终分镜、人物情绪与视频提示词/);
  assert.match(html, /chuanzhang-ai-shijie-workflow/);
  assert.match(html, /chuanzhang-chuangzuo-v1/);
  assert.match(html, /chuanzhang-tuxiangtishici/);
  assert.match(html, /chuanzhangzhenren-prompts/);
  assert.match(html, /chuanzhang-fenjing-biaoqing/);
  assert.match(source, /动作：[\s\S]*表情：\$\{[\s\S]*音效：/);
  assert.ok(
    workflowSkill.indexOf("## 01/04 中文影视创作") <
      workflowSkill.indexOf("## 02/04 真人感人像提示词") &&
      workflowSkill.indexOf("## 02/04 真人感人像提示词") <
        workflowSkill.indexOf("## 03/04 静态图像提示词") &&
      workflowSkill.indexOf("## 03/04 静态图像提示词") <
        workflowSkill.indexOf("## 04/04 分镜与人物情绪融合"),
    "workflow skill must preserve the 01-to-04 production order",
  );
  assert.match(workflowSkill, /确认01/);
  assert.match(workflowSkill, /确认02/);
  assert.match(workflowSkill, /确认03/);
  assert.match(workflowSkill, /确认04/);
  assert.match(workflowSkill, /不得增加生产技能原文中找不到的强制步骤/);
  assert.match(workflowSkill, /不得擅自拆成“02\.1—02\.8身份包”/);
  assert.match(workflowSkill, /不得另造“拉片节奏解释”步骤/);
  assert.doesNotMatch(html, /OpenAI API Key|设置 API/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
