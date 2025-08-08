import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { ThemeWrapper } from '@/components/ThemeWrapper'; // ThemeWrapper 임포트
import { LayoutClient } from '@/components/LayoutClient'; // LayoutClient 임포트
import { getComponentPaths } from '@/lib/data'; // getComponentPaths 임포트
import { ThemeProvider } from 'next-themes'; // ThemeProvider 임포트

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Component Dashboard",
  description: "Radix UI Themes Component Documentation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const componentPaths = await getComponentPaths(); // 서버에서 데이터 가져오기

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <ThemeWrapper>
            <LayoutClient componentPaths={componentPaths}> {/* componentPaths 전달 */}
              {children}
            </LayoutClient>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
