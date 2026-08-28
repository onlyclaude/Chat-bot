'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import CharacterAvatar from '@/components/CharacterAvatar';
import type { Character } from '@/lib/types';

interface Props {
  character: Character;
  onMenuClick?: () => void;
}

/** 채팅 화면 상단 고정 헤더 (뒤로가기 / 캐릭터 / 더보기) */
export default function ChatHeader({ character, onMenuClick }: Props) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex items-center gap-2 border-b border-white/5 bg-zinc-950/85 px-2 py-2 backdrop-blur-md">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="rounded-full p-2 text-zinc-300 transition active:scale-90 active:bg-white/10"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex min-w-0 flex-1 items-center gap-2">
        <CharacterAvatar character={character} size={34} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">
            {character.name}
          </p>
          <p className="truncate text-[11px] text-zinc-500">
            {character.tagline}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onMenuClick}
        aria-label="더보기"
        className="rounded-full p-2 text-zinc-300 transition active:scale-90 active:bg-white/10"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
    </header>
  );
}
