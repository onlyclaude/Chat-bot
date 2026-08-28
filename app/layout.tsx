import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zeta — AI 캐릭터 채팅',
  description: 'AI 캐릭터와 나누는 몰입형 롤플레잉 채팅',
};

export const viewport: Viewport = {
  themeColor: '#09090b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className="h-full bg-zinc-950 text-zinc-100">
        {/* 데스크톱에서도 모바일 앱처럼 보이도록 중앙 정렬 컨테이너 */}
        <div className="mx-auto flex h-full w-full max-w-md flex-col bg-zinc-950 shadow-2xl shadow-black/50">
          {children}
        </div>
      </body>
    </html>
  );
}
