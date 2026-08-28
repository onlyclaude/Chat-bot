'use client';

import { create } from 'zustand';
import { CHARACTERS, MOCK_REPLIES, getCharacterById } from '@/lib/mock-data';
import type { Message } from '@/lib/types';

interface ChatState {
  /** characterId -> 메시지 목록 */
  conversations: Record<string, Message[]>;
  /** 현재 답변을 생성 중인 캐릭터 id (null이면 대기 상태) */
  typingFor: string | null;
  /** 캐릭터별 다음 더미 응답 인덱스 (같은 답변이 연속되지 않도록 순환) */
  replyCursor: Record<string, number>;

  /** 대화방 진입 시 초기 히스토리 주입 (이미 있으면 유지) */
  initConversation: (characterId: string) => void;
  /** 유저 메시지 전송 → 타이핑 표시 → 더미 AI 응답 */
  sendMessage: (characterId: string, text: string) => void;
  /** 대화 초기화 (초기 히스토리로 되돌림) */
  resetConversation: (characterId: string) => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

/** 답변 길이에 비례한 자연스러운 타이핑 지연 (0.9초 ~ 2.2초) */
const typingDelay = (text: string) =>
  Math.min(900 + text.length * 22, 2200);

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: {},
  typingFor: null,
  replyCursor: {},

  initConversation: (characterId) => {
    if (get().conversations[characterId]) return;
    const character = getCharacterById(characterId);
    if (!character) return;

    set((state) => ({
      conversations: {
        ...state.conversations,
        [characterId]: character.initialMessages,
      },
    }));
  },

  sendMessage: (characterId, text) => {
    const trimmed = text.trim();
    if (!trimmed || get().typingFor) return;

    const userMessage: Message = {
      id: uid(),
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    };

    // 1) 유저 메시지를 즉시 반영하고 타이핑 인디케이터를 켠다
    set((state) => ({
      conversations: {
        ...state.conversations,
        [characterId]: [...(state.conversations[characterId] ?? []), userMessage],
      },
      typingFor: characterId,
    }));

    // 2) 실제 LLM 호출 대신 더미 응답을 순환 사용 (여기를 fetch로 교체하면 됨)
    const pool = MOCK_REPLIES[characterId] ?? ['...'];
    const cursor = get().replyCursor[characterId] ?? 0;
    const reply = pool[cursor % pool.length];

    setTimeout(() => {
      // 대화가 초기화되는 등 상황이 바뀌었으면 응답을 버린다
      if (get().typingFor !== characterId) return;

      const aiMessage: Message = {
        id: uid(),
        role: 'ai',
        content: reply,
        createdAt: Date.now(),
      };

      set((state) => ({
        conversations: {
          ...state.conversations,
          [characterId]: [...(state.conversations[characterId] ?? []), aiMessage],
        },
        replyCursor: { ...state.replyCursor, [characterId]: cursor + 1 },
        typingFor: null,
      }));
    }, typingDelay(reply));
  },

  resetConversation: (characterId) => {
    const character = getCharacterById(characterId);
    if (!character) return;

    set((state) => ({
      conversations: {
        ...state.conversations,
        [characterId]: character.initialMessages,
      },
      replyCursor: { ...state.replyCursor, [characterId]: 0 },
      typingFor: state.typingFor === characterId ? null : state.typingFor,
    }));
  },
}));

/** 홈에서 미리 모든 대화를 채워 두고 싶을 때 사용 (선택) */
export const seedAllConversations = () =>
  CHARACTERS.forEach((c) => useChatStore.getState().initConversation(c.id));
