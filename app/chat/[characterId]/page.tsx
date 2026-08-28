import { notFound } from 'next/navigation';
import ChatRoom from '@/components/ChatRoom';
import { CHARACTERS, getCharacterById } from '@/lib/mock-data';

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ characterId: c.id }));
}

export default function ChatPage({
  params,
}: {
  params: { characterId: string };
}) {
  const character = getCharacterById(params.characterId);
  if (!character) notFound();

  return <ChatRoom character={character} />;
}
