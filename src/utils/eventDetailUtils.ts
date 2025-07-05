import {
  format,
  formatDistance,
  differenceInDays,
  isSameDay,
  fromUnixTime,
} from "date-fns";
import {
  EventDetailOrganizer,
  EventDetailParticipant,
  SessionDetail,
  SessionDetailParticipant,
} from "../services/types";
import numeral from "numeral";

export const calculateDuration = (
  sessions: SessionDetailParticipant[] | SessionDetail[]
) => {
  if (!sessions || sessions.length === 0) return "1 day";

  const firstSession = sessions[0];
  const lastSession = sessions[sessions.length - 1];

  const startTimestamp =
    "startSession" in firstSession
      ? firstSession.startSession
      : firstSession.startSessionEpochSecond;
  const endTimestamp =
    "endSession" in lastSession
      ? lastSession.endSession
      : lastSession.endSessionEpochSecond;

  const startDate = fromUnixTime(startTimestamp);
  const endDate = fromUnixTime(endTimestamp);
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return diffDays === 1 ? "1 day" : `${diffDays} days`;
};

export const formatDateRange = (
  sessions: SessionDetailParticipant[] | SessionDetail[]
) => {
  if (!sessions || sessions.length === 0) return "TBD";

  const firstSession = sessions[0];
  const lastSession = sessions[sessions.length - 1];

  const startTimestamp =
    "startSession" in firstSession
      ? firstSession.startSession
      : firstSession.startSessionEpochSecond;
  const endTimestamp =
    "endSession" in lastSession
      ? lastSession.endSession
      : lastSession.endSessionEpochSecond;

  const startDate = fromUnixTime(startTimestamp);
  const endDate = fromUnixTime(endTimestamp);

  if (isSameDay(startDate, endDate)) {
    return format(startDate, "MMMM d, yyyy");
  }

  return `${format(startDate, "MMMM d, yyyy")} - ${format(
    endDate,
    "MMMM d, yyyy"
  )}`;
};

export const formatSessionDate = (
  session: SessionDetail | SessionDetailParticipant
) => {
  const timestamp =
    "startSession" in session
      ? session.startSession
      : session.startSessionEpochSecond;
  const date = fromUnixTime(timestamp);
  return format(date, "MMM d, yyyy 'at' h:mm a");
};

export const getRelativeTime = (
  session: SessionDetail | SessionDetailParticipant
) => {
  const timestamp =
    "startSession" in session
      ? session.startSession
      : session.startSessionEpochSecond;
  const date = fromUnixTime(timestamp);
  return formatDistance(date, new Date(), { addSuffix: true });
};

export const formatSessionDuration = (
  session: SessionDetail | SessionDetailParticipant
) => {
  const hours = session.durationInHours;
  const minutes = session.durationInMinute;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  }
  return "TBD";
};

export const getStatusBadgeConfig = (status: string) => {
  const statusConfig = {
    UPCOMING: {
      bg: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
      text: "Upcoming",
    },
    RUNNING: {
      bg: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      text: "Live",
    },
    COMPLETE: {
      bg: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      text: "Completed",
    },
    ON_SALE: {
      bg: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
      text: "On Sale",
    },
    ON_GOING: {
      bg: "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300",
      text: "Live",
    },
    FINISHED: {
      bg: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
      text: "Finished",
    },
  };

  return (
    statusConfig[status as keyof typeof statusConfig] || {
      bg: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
      text: status,
    }
  );
};

export const formatPrice = (amount: number) => {
  return `${numeral(amount).format("0,0")} IDRX`;
};

export const validateEnrollment = (
  isConnected: boolean,
  isEventFinished: boolean,
  isEventFull: boolean,
  isOwnEvent: boolean
) => {
  if (!isConnected) {
    return "Please connect your wallet first";
  }

  if (isEventFinished) {
    return "This event has already ended";
  }

  if (isEventFull) {
    return "Event is full";
  }

  if (isOwnEvent) {
    return "You cannot enroll in your own event";
  }

  return null;
};

export const getEventState = (
  event: EventDetailOrganizer | EventDetailParticipant,
  address: string | undefined
) => {
  const isEnrolled =
    event?.participantList?.includes(address?.toLowerCase() ?? "") || false;
  const isOwnEvent = event?.organizer === address?.toLowerCase();
  const isEventFull = (event?.participant || 0) >= (event?.maxParticipant || 0);
  const isEventFinished = event?.status === "FINISHED";
  const participantPercentage =
    (event.participant / event.maxParticipant) * 100;
  const totalPrice = event.priceAmount + event.commitmentAmount;

  return {
    isEnrolled,
    isOwnEvent,
    isEventFull,
    isEventFinished,
    participantPercentage,
    totalPrice,
  };
};

export const getSessionDepositAmount = (
  event: EventDetailOrganizer | EventDetailParticipant
) => {
  return event.commitmentAmount / (event.session?.length || 1);
};

export const getSessionTimestamp = (
  session: SessionDetail | SessionDetailParticipant,
  type: "start" | "end"
) => {
  if (type === "start") {
    return "startSession" in session
      ? session.startSession
      : session.startSessionEpochSecond;
  } else {
    return "endSession" in session
      ? session.endSession
      : session.endSessionEpochSecond;
  }
};
