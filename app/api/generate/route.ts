import { NextResponse } from "next/server";
import { stagePrompts, type WorkflowStage } from "./prompts";

export const runtime = "edge";

type RequestBody = {
  apiKey?: string;
  model?: string;
  stage?: WorkflowStage;
  project?: {
    name?: string;
    idea?: string;
    format?: string;
    genre?: string;
    ratio?: string;
    style?: string;
  };
  previousContext?: string;
  currentDraft?: string;
  revision?: string;
};

function extractText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const response = payload as {
    output_text?: string;
    output?: Array<{
      type?: string;
      content?: Array<{ type?: string; text?: string }>;
    }>;
  };
  if (typeof response.output_text === "string") return response.output_text;
  return (response.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((content) => content.type === "output_text")
    .map((content) => content.text ?? "")
    .join("\n")
    .trim();
}

function safeMessage(status: number, raw: unknown): string {
  if (status === 401) return "API Key 无效，请在设置中检查后重试。";
  if (status === 429) return "当前 API 额度不足或请求过快，请检查账户额度后重试。";
  if (status === 403) return "这个 API Key 暂时没有所选模型的访问权限，请更换模型或检查账户。";
  if (raw && typeof raw === "object") {
    const message = (raw as { error?: { message?: string } }).error?.message;
    if (message && message.length < 240) return message;
  }
  return "OpenAI 暂时没有完成这次生成，请稍后重试。";
}

export async function POST(request: Request) {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return NextResponse.json(
      { error: "请求内容无法读取。" },
      { status: 400 },
    );
  }

  const apiKey = body.apiKey?.trim();
  const stage = body.stage;
  const model = body.model?.trim() || "gpt-5.6-terra";

  if (!apiKey) {
    return NextResponse.json(
      { error: "请先填写自己的 OpenAI API Key。" },
      { status: 400 },
    );
  }
  if (!stage || !(stage in stagePrompts)) {
    return NextResponse.json({ error: "创作步骤无效。" }, { status: 400 });
  }
  if (!/^[a-zA-Z0-9._:-]{2,80}$/.test(model)) {
    return NextResponse.json({ error: "模型名称无效。" }, { status: 400 });
  }

  const input = [
    `【项目设定】\n${JSON.stringify(body.project ?? {}, null, 2)}`,
    body.previousContext
      ? `【此前已经确认的创作结果】\n${body.previousContext}`
      : "",
    body.currentDraft
      ? `【当前步骤上一版草稿】\n${body.currentDraft}`
      : "",
    body.revision
      ? `【用户本次修改或补充要求】\n${body.revision}`
      : "【用户本次要求】\n请生成当前步骤的第一版结果。",
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    const upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions: stagePrompts[stage],
        input,
        store: false,
        max_output_tokens: stage === "storyboard" ? 12000 : 8000,
      }),
    });

    const payload = (await upstream.json()) as unknown;
    if (!upstream.ok) {
      return NextResponse.json(
        { error: safeMessage(upstream.status, payload) },
        {
          status: upstream.status,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const text = extractText(payload);
    if (!text) {
      return NextResponse.json(
        { error: "模型返回了空结果，请重试。" },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { text },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "暂时无法连接 OpenAI，请检查网络后重试。" },
      {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
