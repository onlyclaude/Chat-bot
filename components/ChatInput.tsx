'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ArrowUp, Plus } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_HEIGHT = 120; // 약 5줄

/**
 * 하단 고정 입력창.
 * - textarea 높이가 내용에 따라 늘어나고 MAX_HEIGHT 이후로는 내부 스크롤
 * - Enter 전송 / Shift+Enter 줄바꿈 (모바일 터치 환경에서는 전송 버튼 사용)
 * - safe-area-inset 반영으로 홈 인디케이터 영역 침범 방지
 */
export default function ChatInput({ onSend, disabled = false, placeholder = '메시지 보내기…' }: Props) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);

  // 입력값이 바뀔 때마다 높이 재계산
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, MAX_HEIGHT)}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  }, [value]);

  const canSend = value.trim().length > 0 && !disabled;

  const submit = () => {
    if (!canSend) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <div
      className="sticky bottom-0 z-20 border-t border-white/5 bg-zinc-950/90 backdrop-blur-md"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="flex items-end gap-2 px-3 py-2.5"
      >
        <button
          type="button"
          aria-label="첨부"
          className="mb-0.5 rounded-full p-2 text-zinc-400 transition active:scale-90 active:bg-white/10"
        >
          <Plus className="h-5 w-5" />
        </button>

        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              submit();
            }
          }}
          placeholder={placeholder}
          className="no-scrollbar max-h-[120px] flex-1 resize-none rounded-2xl bg-zinc-900 px-4 py-2.5 text-[14px] leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-500/60"
        />

        <button
          type="submit"
          disabled={!canSend}
          aria-label="전송"
          className={[
            'mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition',
            canSend
              ? 'bg-brand-600 text-white active:scale-90'
              : 'bg-zinc-800 text-zinc-600',
          ].join(' ')}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
