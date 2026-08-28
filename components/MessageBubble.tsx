'use client';

import { motion } from 'framer-motion';
import CharacterAvatar from '@/components/CharacterAvatar';
import type { Character, Message } from '@/lib/types';

interface Props {
  message: Message;
  character: Character;
  /** 같은 화자가 연속으로 말할 때 아바타/이름 생략 */
  showMeta?: boolean;
}

/** *지문* 은 이탤릭·연한 색으로, 나머지는 일반 대사로 렌더링 */
function renderContent(content: string) {
  return content.split(/(\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em key={i} className="italic text-zinc-400/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const formatTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

export default function MessageBubble({
  message,
  character,
  showMeta = true,
}: Props) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex w-full gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* AI 메시지에만 좌측 썸네일 */}
      {!isUser &&
        (showMeta ? (
          <CharacterAvatar character={character} size={32} className="mt-5" />
        ) : (
          <span className="w-8 shrink-0" />
        ))}

      <div className={`flex max-w-[78%] flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && showMeta && (
          <span className="mb-1 px-1 text-[11px] font-medium text-zinc-400">
            {character.name}
          </span>
        )}

        <div className={`flex items-end gap-1.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div
            className={[
              'whitespace-pre-wrap break-words px-3.5 py-2.5 text-[14px] leading-relaxed',
              isUser
                ? 'rounded-2xl rounded-br-md bg-brand-600 text-white'
                : 'rounded-2xl rounded-bl-md bg-zinc-800 text-zinc-100',
            ].join(' ')}
          >
            {renderContent(message.content)}
          </div>
          <span className="shrink-0 pb-0.5 text-[10px] text-zinc-600">
            {formatTime(message.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
