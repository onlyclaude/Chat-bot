'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Character } from '@/lib/types';

interface Props {
  character: Character;
  /** grid: 2열 그리드용(세로 3:4) / carousel: 가로 스와이프용(고정 폭) */
  variant?: 'grid' | 'carousel';
  index?: number;
}

/**
 * 꽉 찬 세로형 썸네일 + 하단 그라데이션 오버레이 위에 이름/한 줄 소개를 얹은 캐릭터 카드.
 */
export default function CharacterCard({
  character,
  variant = 'grid',
  index = 0,
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
      className={variant === 'carousel' ? 'w-[62vw] max-w-[240px] shrink-0 snap-start' : ''}
    >
      <Link
        href={`/chat/${character.id}`}
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/5"
      >
        {/* 썸네일 (실패 시 그라데이션 폴백) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${character.gradient}`}
        />
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={character.avatarUrl}
            alt={character.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-active:scale-105"
          />
        )}

        {/* 하단 그라데이션 오버레이 — 텍스트 가독성 확보 */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* 대화 수 뱃지 */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium text-zinc-200 backdrop-blur-sm">
          <MessageCircle className="h-3 w-3" />
          {character.chatCount}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="truncate text-[15px] font-bold leading-tight text-white">
            {character.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-zinc-300">
            {character.tagline}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {character.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-zinc-200 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
