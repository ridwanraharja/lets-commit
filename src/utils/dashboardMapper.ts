import {
  Session as ApiSession,
  ParticipantDashboard,
  OrganizerDashboard,
} from "../services/types";
import { Session as ComponentSession } from "../components/SessionCard";
import { parse, format, isToday } from "date-fns";

export const mapApiSessionToComponentSession = (
  apiSession: ApiSession,
  type: "upcoming" | "completed" | "active" = "upcoming"
): ComponentSession => {
  const startDate = parse(
    apiSession.startSessionHumanReadable,
    "dd-MM-yyyy HH:mm:ss",
    new Date()
  );

  const date = format(startDate, "MMM dd, yyyy");
  const time = format(startDate, "h:mm a");

  const sessionIsToday = isToday(startDate);
  const finalStatus = sessionIsToday ? "active" : type;

  return {
    id: `${apiSession.eventId}-${apiSession.sessionNumber}`,
    title: apiSession.sessionTitle,
    date,
    time,
    location: apiSession.eventTitle,
    participants: 0,
    maxParticipants: 0,
    status: finalStatus,
    deposit: 0,
    attendance: type === "completed" ? 85 : undefined,
  };
};

export const mapParticipantDashboard = (apiData: ParticipantDashboard) => {
  return {
    totalDeposits: apiData.statistic.totalDeposit || 0,
    availableCashback: apiData.statistic.totalCommitmentFeeAvailable || 0,
    totalClaimed: apiData.statistic.totalCommitmentFeeClaimed || 0,
    upcomingSessions: apiData.upcomingSession.map((session) =>
      mapApiSessionToComponentSession(session, "upcoming")
    ),
    completedSessions: apiData.completedSession.map((session) =>
      mapApiSessionToComponentSession(session, "completed")
    ),
  };
};

export const mapOrganizerDashboard = (apiData: OrganizerDashboard) => {
  return {
    totalRevenue: apiData.statistic.totalRevenue || 0,
    availableWithdrawal: apiData.statistic.availableWithdraw || 0,
    totalWithdrawn: apiData.statistic.totalClaimedRevenue || 0,
    activeSessions: apiData.upcomingSession.map((session) =>
      mapApiSessionToComponentSession(session, "active")
    ),
    completedSessions: apiData.completedSession.map((session) =>
      mapApiSessionToComponentSession(session, "completed")
    ),
  };
};
