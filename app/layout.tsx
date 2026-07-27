import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://captain-ai-studio.openai.site";
  const socialImage = new URL("/og-detailed-demo.png", origin).toString();

  return {
    title: "船长AI视界｜完整创作流程 Demo",
    description:
      "无需 API Key，完整体验船长AI视界创作、静态图资产、分镜视频提示词与情绪二次加工工作流。",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "船长AI视界",
      description:
        "从灵感、剧本、场景道具与真人提示词，到分镜视频提示词和情绪二次加工最终稿。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "船长AI视界",
      description:
        "从灵感、剧本、场景道具与真人提示词，到分镜视频提示词和情绪二次加工最终稿。",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
