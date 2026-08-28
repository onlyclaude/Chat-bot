'use client';

import { useState } from 'react';
import type { Character } from '@/lib/types';

interface Props {
  character: Pick<Character, 'name' | 'avatarUrl' | 'gradient'>;
  /** px 단위 크기 (정사각 원형) */
  size?: number;
  className?: string;
}

/**
 * 원형 아바타. 이미지 로드 실패 시 캐릭터 고유 그라데이션 + 이니셜로 폴백한다.
 */
export default function CharacterAvatar({
  character,
  size = 36,
  className = '',
}: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      style={{ width: size, height: size }}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br ${character.gradient} ring-1 ring-white/10 ${className}`}
    >
      {failed ? (
        <span
          className="font-semibold text-white/90"
          style={{ fontSize: size * 0.4 }}
        >
          {character.name.slice(0, 1)}
        </span>
      ) : (
        // 프로토타입이므로 next/image 대신 img 사용 (외부 이미지 폴백 처리 용이)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={character.avatarUrl}
          alt={character.name}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
