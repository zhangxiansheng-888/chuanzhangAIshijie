import assert from "node:assert/strict";
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
  assert.match(html, /船长AI视界/);
  assert.match(html, /船长AI视界公众号二维码/);
  assert.match(html, /纯演示/);
  assert.match(html, /不调用AI/);
  assert.match(html, /部署自己的版本/);
  assert.match(html, /故事方向与核心提炼/);
  assert.match(html, /拉片节奏与详细剧本/);
  assert.match(html, /五类视觉资产提示词/);
  assert.match(html, /分镜规划与提示词结构/);
  assert.match(html, /最终分镜与视频提示词/);
  assert.match(html, /chuanzhang-chuangzuo-v1/);
  assert.match(html, /chuanzhang-tuxiangtishici/);
  assert.match(html, /chuanzhangzhenren-prompts/);
  assert.match(html, /chuanzhangbiaoqing/);
  assert.match(html, /chuanzhang-fenjing/);
  assert.doesNotMatch(html, /OpenAI API Key|设置 API/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
