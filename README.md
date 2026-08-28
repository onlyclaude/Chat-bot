# Zeta — AI 캐릭터 롤플레잉 채팅 (프론트엔드 프로토타입)

제타 / Character.ai 스타일의 모바일 퍼스트 AI 캐릭터 채팅 UI 프로토타입입니다.

## 실행

```bash
npm install
npm run dev   # http://localhost:3000
```

## 기술 스택

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Zustand · Framer Motion · lucide-react

## 구조

```
app/
├─ layout.tsx                  # 다크 테마 루트 (max-w-md, 100dvh 모바일 컨테이너)
├─ page.tsx                    # 홈/탐색 — 캐러셀 + 2열 그리드
└─ chat/[characterId]/page.tsx # 채팅 (SSG, 잘못된 id는 404)
components/                    # AppHeader, CharacterCard, ChatRoom, MessageBubble 등
lib/                           # types.ts, mock-data.ts (캐릭터 3인 + 초기 대화)
store/useChatStore.ts          # 대화/타이핑 상태
```

## 실제 LLM 연동 지점

`store/useChatStore.ts` 의 `sendMessage` 안에서 `MOCK_REPLIES` 를 꺼내 쓰는
`setTimeout` 블록을 API 호출(스트리밍 응답)로 교체하면 됩니다.
`typingFor` 상태가 그대로 로딩 인디케이터로 재사용됩니다.
