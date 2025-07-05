import { SessionCard, Session } from "./SessionCard";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface SessionListProps {
  sessions: Session[];
  type: "participant" | "organizer";
  onGenerateQR?: (s: Session) => void;
  sessionType?: "upcoming" | "completed";
}

export function SessionList({
  sessions,
  type,
  onGenerateQR,
  sessionType = "upcoming",
}: SessionListProps) {
  const sortedSessions = [...sessions].sort((a, b) => {
    if (sessionType === "upcoming") {
      // Sort upcoming sessions by closest start time (earliest first)
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    } else {
      // Sort completed sessions by most recently completed (latest first)
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB.getTime() - dateA.getTime();
    }
  });

  if (sortedSessions.length === 0) {
    // More specific empty state for active/completed
    let title = "No sessions found";
    let message =
      type === "participant"
        ? "You haven't enrolled in any sessions yet. Join an event to start your learning journey!"
        : "You don't have any sessions at the moment. Create an event to get started!";
    let actionText = type === "participant" ? "Explore Events" : "Create Event";
    let actionLink = type === "participant" ? "/explore" : "/create";
    const icon =
      type === "participant" ? (
        <Users className="w-8 h-8 text-gray-400" />
      ) : (
        <Calendar className="w-8 h-8 text-gray-400" />
      );

    if (sessionType === "completed") {
      title =
        type === "participant"
          ? "No completed sessions"
          : "No completed sessions";
      message =
        type === "participant"
          ? "You haven't completed any sessions yet. Attend your enrolled sessions to see your progress here!"
          : "You haven't completed any sessions yet. Once you run your events, completed sessions will appear here!";
      actionText =
        type === "participant" ? "View Upcoming" : "View Active Sessions";
      actionLink = type === "participant" ? "#" : "#";
    } else if (sessionType === "upcoming") {
      if (type === "participant") {
        title = "No upcoming sessions";
        message =
          "You haven't enrolled in any upcoming sessions yet. Explore events to join your first session!";
        actionText = "Explore Events";
        actionLink = "/explore";
      }
    }

    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
          {message}
        </p>
        <Link
          to={actionLink}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {type === "participant" ? (
            <>
              <Users className="w-4 h-4 mr-2" />
              {actionText}
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              {actionText}
            </>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      {sortedSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          type={type}
          onGenerateQR={onGenerateQR}
          sessionType={sessionType}
        />
      ))}
    </div>
  );
}
