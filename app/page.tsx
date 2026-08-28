'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Flame, LayoutGrid } from 'lucide-react';
import AppHeader from '@/components/AppHeader';
import CharacterCard from '@/components/CharacterCard';
import { CHARACTERS } from '@/lib/mock-data';

const CATEGORIES = ['전체', '로맨스판타지', '일상', '힐링', '판타지'] as const;

export default function HomePage() {
  const [category, setCategory] = useState<string>('전체');

  const filtered =
    category === '전체'
      ? CHARACTERS
      : CHARACTERS.filter((c) => c.tags.includes(category));

  return (
    <div className="flex h-full flex-col">
      <AppHeader />

      <main className="no-scrollbar flex-1 overflow-y-auto pb-10">
        {/* 검색 (프로토타입 — 비기능) */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 rounded-xl bg-zinc-900 px-3.5 py-2.5 ring-1 ring-white/5">
            <Search className="h-4 w-4 shrink-0 text-zinc-500" />
            <input
              placeholder="캐릭터, 세계관 검색"
              className="w-full bg-transparent text-[13px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>

        {/* 카테고리 칩 */}
        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={[
                'shrink-0 rounded-full px-3.5 py-1.5 text-[12px] font-medium transition',
                category === c
                  ? 'bg-brand-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 ring-1 ring-white/5 active:bg-zinc-800',
              ].join(' ')}
            >
              {c}
            </button>
          ))}
        </div>

        {/* 인기 캐릭터 — 가로 스와이프 캐러셀 */}
        <section className="mt-6">
          <div className="flex items-center gap-1.5 px-4">
            <Flame className="h-4 w-4 text-orange-400" />
            <h2 className="text-[15px] font-bold text-zinc-100">지금 인기 있는</h2>
          </div>
          <div className="no-scrollbar mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {CHARACTERS.map((character, i) => (
              <CharacterCard
                key={character.id}
                character={character}
                variant="carousel"
                index={i}
              />
            ))}
          </div>
        </section>

        {/* 전체 목록 — 2열 그리드 */}
        <section className="mt-7 px-4">
          <div className="flex items-center gap-1.5">
            <LayoutGrid className="h-4 w-4 text-brand-400" />
            <h2 className="text-[15px] font-bold text-zinc-100">
              {category === '전체' ? '모든 캐릭터' : `${category} 캐릭터`}
            </h2>
            <span className="text-[12px] text-zinc-600">{filtered.length}</span>
          </div>

          {filtered.length > 0 ? (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {filtered.map((character, i) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 text-center text-[13px] text-zinc-600"
            >
              아직 이 카테고리의 캐릭터가 없어요.
            </motion.p>
          )}
        </section>
      </main>
    </div>
  );
}
