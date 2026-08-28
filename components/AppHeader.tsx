'use client';

import { Bell, Sparkles, User } from 'lucide-react';

/** 홈 화면 상단 헤더 — 로고 + 알림/프로필 아이콘 */
export default function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/5 bg-zinc-950/85 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-1.5">
        <Sparkles className="h-5 w-5 text-brand-400" />
        <span className="text-lg font-bold tracking-tight text-zinc-100">
          Zeta
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="알림"
          className="relative rounded-full p-2 text-zinc-300 transition active:scale-90 active:bg-white/10"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
        </button>
        <button
          type="button"
          aria-label="내 프로필"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-600 text-white transition active:scale-90"
        >
          <User className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
