export type MessageRole = 'ai' | 'user';

export interface Message {
  id: string;
  role: MessageRole;
  /** 대사 본문 */
  content: string;
  /** '*미소를 지으며*' 같은 지문은 content 안에서 *...* 로 표기 */
  createdAt: number;
}

export interface Character {
  id: string;
  name: string;
  /** 카드 하단에 노출되는 한 줄 세계관 */
  tagline: string;
  /** 상세 소개 (채팅 진입 인트로 등에 사용) */
  description: string;
  /** 세로형 썸네일 (3:4 이상 비율 권장) */
  avatarUrl: string;
  /** 이미지 로드 실패 시 사용할 그라데이션 */
  gradient: string;
  tags: string[];
  /** 카드에 표시할 대화 수 (예: 12.4만) */
  chatCount: string;
  /** 채팅방 진입 시 보여줄 초기 히스토리 */
  initialMessages: Message[];
}
