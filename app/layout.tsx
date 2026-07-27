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
      "无需 API Key，查看三种故事方向、拉片节奏、详细剧本、五类资产提示词与180秒最终影视分镜。",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "船长AI视界",
      description: "三种故事方向、拉片节奏、真人与情绪提示词、180秒最终分镜。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "船长AI视界",
      description: "三种故事方向、拉片节奏、真人与情绪提示词、180秒最终分镜。",
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
