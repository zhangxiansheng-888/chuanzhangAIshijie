import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://captain-ai-studio.openai.site";
  const socialImage = new URL("/og-demo.png", origin).toString();

  return {
    title: "船长AI视界｜完整创作流程 Demo",
    description:
      "无需 API Key，体验从灵感、故事、真人感与情绪提示词到最终影视分镜的完整演示。",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "船长AI视界",
      description: "无需 API Key，查看从一个灵感到最终分镜的完整流程 Demo。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "船长AI视界",
      description: "无需 API Key，查看从一个灵感到最终分镜的完整流程 Demo。",
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
