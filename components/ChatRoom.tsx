'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, RotateCcw } from 'lucide-react';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import MessageBubble from '@/components/MessageBubble';
import TypingIndicator from '@/components/TypingIndicator';
import { useChatStore } from '@/store/useChatStore';
import type { Character } from '@/lib/types';

export default function ChatRoom({ character }: { character: Character }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = useChatStore((s) => s.conversations[character.id]);
  const isTyping = useChatStore((s) => s.typingFor === character.id);
  const initConversation = useChatStore((s) => s.initConversation);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const resetConversation = useChatStore((s) => s.resetConversation);

  // 진입 시 초기 히스토리 주입 (이미 대화 중이면 그대로 유지)
  useEffect(() => {
    initConversation(character.id);
  }, [character.id, initConversation]);

  // 새 메시지 / 타이핑 상태가 바뀔 때마다 하단으로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages?.length, isTyping]);

  const list = messages ?? [];

  return (
    <div className="relative flex h-full flex-col bg-zinc-950">
      <ChatHeader
        character={character}
        onMenuClick={() => setMenuOpen((v) => !v)}
      />

      {/* 바깥 영역 탭 시 메뉴 닫힘 */}
      {menuOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
      )}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-3 top-14 z-30 w-44 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl shadow-black/50"
          >
            <button
              type="button"
              onClick={() => {
                resetConversation(character.id);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3.5 py-3 text-[13px] text-zinc-200 transition active:bg-white/10"
            >
              <RotateCcw className="h-4 w-4" />
              대화 처음부터
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="flex w-full items-center gap-2 border-t border-white/5 px-3.5 py-3 text-[13px] text-red-400 transition active:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              채팅방 나가기
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메시지 영역 */}
      <div className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-3 py-4">
        {/* 캐릭터 인트로 */}
        <div className="mb-4 flex flex-col items-center px-6 text-center">
          <p className="text-[12px] font-medium text-zinc-300">
            {character.name}
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
            {character.description}
          </p>
        </div>

        {list.map((message, i) => (
          <MessageBubble
            key={message.id}
            message={message}
            character={character}
            // 직전 메시지와 화자가 다를 때만 아바타/이름 노출
            showMeta={i === 0 || list[i - 1].role !== message.role}
          />
        ))}

        <AnimatePresence>
          {isTyping && <TypingIndicator character={character} />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <ChatInput
        onSend={(text) => sendMessage(character.id, text)}
        disabled={isTyping}
        placeholder={
          isTyping ? `${character.name} 님이 입력 중…` : '메시지 보내기…'
        }
      />
    </div>
  );
}
