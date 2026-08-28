'use client';

import { motion } from 'framer-motion';
import CharacterAvatar from '@/components/CharacterAvatar';
import type { Character } from '@/lib/types';

/** AI가 답변을 생성하는 동안 표시되는 점 3개 애니메이션 */
export default function TypingIndicator({ character }: { character: Character }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex items-end gap-2"
    >
      <CharacterAvatar character={character} size={32} />
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3.5">
        {[0, 0.2, 0.4].map((delay) => (
          <span
            key={delay}
            style={{ animationDelay: `${delay}s` }}
            className="h-1.5 w-1.5 animate-bubble-blink rounded-full bg-zinc-400"
          />
        ))}
      </div>
    </motion.div>
  );
}
