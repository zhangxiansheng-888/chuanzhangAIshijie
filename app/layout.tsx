import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://captain-ai-studio.openai.site";
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: "船长AI视界｜从灵感到分镜",
    description:
      "输入一个灵感，逐步完成故事创作、真人感与情绪图片提示词以及最终影视分镜。",
    icons: {
      icon: "/og.png",
      shortcut: "/og.png",
    },
    openGraph: {
      title: "船长AI视界",
      description: "从一个灵感，到最终分镜。",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "船长AI视界",
      description: "从一个灵感，到最终分镜。",
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
