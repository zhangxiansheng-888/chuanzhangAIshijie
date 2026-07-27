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
  assert.match(html, /船长AI视界/);
  assert.match(html, /船长AI视界公众号二维码/);
  assert.match(html, /纯演示/);
  assert.match(html, /不调用AI/);
  assert.match(html, /部署自己的版本/);
  assert.match(html, /破题、梗概、人物与结构/);
  assert.match(html, /分场大纲、场景写作与剧本医生/);
  assert.match(html, /场景／道具／真人／关键帧提示词/);
  assert.match(html, /完整交付目录/);
  assert.match(html, /场景提示词/);
  assert.match(html, /道具提示词/);
  assert.match(html, /真人提示词/);
  assert.match(html, /人物情绪表演/);
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
  assert.match(source, /人物情绪与表演轨/);
  assert.match(source, /本段使用资产图对照/);
  assert.match(source, /画面动作概述：/);
  assert.match(source, /画面构图：/);
  assert.match(source, /Gate 6｜HTML QA/);
  assert.match(source, /15秒，这是上限，不是目标/);
  assert.doesNotMatch(source, /12组视频提示词覆盖180秒/);
  assert.match(html, /分镜六道确认 Gate/);
  assert.match(html, /最终分镜与视频提示词/);
  assert.match(html, /chuanzhang-chuangzuo-v1/);
  assert.match(html, /chuanzhang-tuxiangtishici/);
  assert.match(html, /chuanzhangzhenren-prompts/);
  assert.match(html, /chuanzhangbiaoqing/);
  assert.match(html, /chuanzhang-fenjing/);
  assert.doesNotMatch(html, /OpenAI API Key|设置 API/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
