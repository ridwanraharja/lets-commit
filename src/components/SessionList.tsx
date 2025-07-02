import { SessionCard, Session } from "./SessionCard";

interface SessionListProps {
  sessions: Session[];
  type: "participant" | "organizer";
  onGenerateQR?: (s: Session) => void;
}

export function SessionList({
  sessions,
  type,
  onGenerateQR,
}: SessionListProps) {
  return (
    <div className="space-y-4 lg:space-y-6">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          type={type}
          onGenerateQR={onGenerateQR}
        />
      ))}
    </div>
  );
}
