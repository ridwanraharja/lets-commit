import {
  Session as ApiSession,
  ParticipantDashboard,
  OrganizerDashboard,
} from "../services/types";
import { Session as ComponentSession } from "../components/SessionCard";
import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { isSessionActive } from "./contractUtils";

export const mapApiSessionToComponentSession = (
  apiSession: ApiSession,
  type: "upcoming" | "completed" | "active" = "upcoming"
): ComponentSession => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDate = new Date(apiSession.startSession * 1000);

  // Convert UTC to user's local timezone
  const localDate = toZonedTime(utcDate, userTimezone);

  const date = format(localDate, "MMM dd, yyyy");
  const time = format(localDate, "h:mm a");

  const startSessionTime = BigInt(apiSession.startSession);
  const endSessionTime = BigInt(apiSession.endSession);
  const isActuallyActive = isSessionActive(startSessionTime, endSessionTime);
  const finalStatus = isActuallyActive ? "active" : type;

  return {
    id: `${apiSession.eventId}-${apiSession.sessionNumber}`,
    title: apiSession.sessionTitle,
    date,
    time,
    location: apiSession.eventTitle,
    totalParticipants: apiSession.totalParticipants || 0,
    status: finalStatus,
    deposit: 0,
    attendance: type === "completed" ? apiSession.attendance : undefined,
    startSessionTime,
    endSessionTime,
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
