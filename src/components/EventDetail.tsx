import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  format,
  formatDistance,
  differenceInDays,
  isSameDay,
  fromUnixTime,
} from "date-fns";
// import { useAccount } from "wagmi";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle,
  QrCode,
  User,
  Building,
  ArrowLeft,
  Info,
  Star,
  Trophy,
  Target,
} from "lucide-react";
import { useEventService } from "../hooks/useEventService";
import { useRole } from "../context/RoleContext";
import { SessionDetail, SessionDetailParticipant } from "../services/types";
import ImgFake from "../assets/BlockDevId.jpg";

const EventDetail = () => {
  const { eventId } = useParams();
  // const { address } = useAccount();
  const { role } = useRole();
  const [selectedSession, setSelectedSession] = useState<
    SessionDetail | SessionDetailParticipant | null
  >(null);

  const { useGetEventById, useGetEventDetailForParticipant } =
    useEventService();

  const organizerEventQuery = useGetEventById(
    eventId || "",
    role === "organizer"
  );
  const participantEventQuery = useGetEventDetailForParticipant(
    eventId || "",
    "0x0000000000000000000000000000000000000021",
    role === "participant"
  );

  const eventQuery =
    role === "organizer" ? organizerEventQuery : participantEventQuery;
  const event = eventQuery.data;

  if (eventQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (eventQuery.isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Event
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Failed to load event details. Please try again.
          </p>
          <Link
            to="/explore"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Event Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The event you're looking for doesn't exist.
          </p>
          <Link
            to="/explore"
            className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const calculateDuration = () => {
    if (!event.session || event.session.length === 0) return "1 day";
    const firstSession = event.session[0];
    const lastSession = event.session[event.session.length - 1];

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

  const formatDateRange = () => {
    if (!event.session || event.session.length === 0) return "TBD";

    const firstSession = event.session[0];
    const lastSession = event.session[event.session.length - 1];

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

  const formatSessionDate = (
    session: SessionDetail | SessionDetailParticipant
  ) => {
    const timestamp =
      "startSession" in session
        ? session.startSession
        : session.startSessionEpochSecond;
    const date = fromUnixTime(timestamp);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  const getRelativeTime = (
    session: SessionDetail | SessionDetailParticipant
  ) => {
    const timestamp =
      "startSession" in session
        ? session.startSession
        : session.startSessionEpochSecond;
    const date = fromUnixTime(timestamp);
    return formatDistance(date, new Date(), { addSuffix: true });
  };

  const formatSessionDuration = (
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
            Upcoming
          </span>
        );
      case "RUNNING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
            Live
          </span>
        );
      case "COMPLETE":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            Completed
          </span>
        );
      case "ON_SALE":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
            On Sale
          </span>
        );
      case "ON_GOING":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
            Live
          </span>
        );
      case "FINISHED":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            Finished
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            {status}
          </span>
        );
    }
  };

  const formatPrice = (amount: number) => {
    return `$${(amount / 1000000).toFixed(2)}`;
  };

  const participantPercentage =
    (event.participant / event.maxParticipant) * 100;
  const totalPrice = event.priceAmount + event.commitmentAmount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-950 dark:via-blue-950/10 dark:to-purple-950/10 transition-colors duration-700 ease-in-out">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={event.imageUri || ImgFake}
                  alt={event.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  {getStatusBadge(event.status)}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {calculateDuration()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                  {event.title}
                </h1>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                      role === "participant"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    <User className="w-4 h-4 mr-1 inline" />
                    {role === "participant"
                      ? "Participant View"
                      : "Organizer View"}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                {event.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {formatDateRange()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Location
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <Users className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Participants
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.participant}/{event.maxParticipant}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <Building className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Organizer
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {event.organizer}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Registration Progress
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {Math.round(participantPercentage)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${participantPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Event Price
                </h3>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(event.priceAmount)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                One-time payment
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/30 rounded-2xl p-6 border border-orange-200/50 dark:border-orange-700/50">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Commitment Fee
                </h3>
              </div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatPrice(event.commitmentAmount)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Refundable deposit
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50">
              <div className="flex items-center gap-3 mb-3">
                <Trophy className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Total Investment
                </h3>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(totalPrice)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Initial payment required
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  💰 Commitment Cashback System
                </h4>
                <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                  <li>
                    • Attend each session → Get partial cashback immediately
                  </li>
                  <li>
                    • Complete all sessions → Get 100% commitment fee back
                  </li>
                  <li>
                    • Miss sessions → Forfeit corresponding deposit amount
                  </li>
                  <li>
                    • Smart contract ensures automatic and transparent payouts
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Sessions Management
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {role === "participant"
                ? "Track your session attendance and claim cashbacks"
                : "Manage session attendance and generate QR codes for check-ins"}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Session
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Deposit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {event.session?.map((session, index) => (
                  <motion.tr
                    key={session.sessionNumber}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {session.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {formatSessionDate(session)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {getRelativeTime(session)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatSessionDuration(session)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {session.peopleAttend}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      {formatPrice(
                        event.commitmentAmount / (event.session?.length || 1)
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(session.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {role === "participant" ? (
                          <>
                            {session.status === "UPCOMING" && (
                              <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                                Register
                              </button>
                            )}
                            {session.status === "COMPLETE" && (
                              <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" />
                                Claim{" "}
                                {formatPrice(
                                  event.commitmentAmount /
                                    (event.session?.length || 1)
                                )}
                              </button>
                            )}
                            {session.status === "RUNNING" && (
                              <span className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                                <Clock className="w-3 h-3" />
                                Live
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            {"activeQrButton" in session &&
                              session.activeQrButton && (
                                <button
                                  onClick={() => setSelectedSession(session)}
                                  className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"
                                >
                                  <QrCode className="w-4 h-4" />
                                  Generate QR
                                </button>
                              )}
                            <button className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              View Details
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {role === "participant" ? (
            <>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Deposits
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(event.commitmentAmount)}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sessions Attended
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.statistic?.sessionAttend || 0}/
                      {event.statistic?.sessionLength || 0}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Available Cashback
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {event.statistic?.availableCommitment
                        ? formatPrice(event.statistic.availableCommitment)
                        : "$0.00"}
                    </p>
                  </div>
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.statistic?.totalRevenue
                        ? formatPrice(event.statistic.totalRevenue)
                        : "$0.00"}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sessions Completed
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.statistic?.sessionCompleted || 0}/
                      {event.statistic?.sessionLength || 0}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Attendance Rate
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {event.statistic?.avgAttendanceRatePercent || 0}%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </>
          )}
        </motion.div>

        {selectedSession && role === "organizer" && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Session Check-in QR
                </h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-2xl text-gray-500 dark:text-gray-400">
                    ×
                  </span>
                </button>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-blue-300 dark:border-blue-600">
                    <QrCode className="w-24 h-24 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedSession.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {formatSessionDate(selectedSession)}
                  </p>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
                      Generate New QR Code
                    </button>
                    <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      Download QR Code
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {event.status === "ON_SALE" ? (
            <>
              <Link
                to={`/events/${event.eventId}/register`}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-center"
              >
                Register for Event - {formatPrice(totalPrice)}
              </Link>
              <button className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                Add to Wishlist
              </button>
            </>
          ) : event.status === "ON_GOING" ? (
            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Join Live Session
            </button>
          ) : (
            <button
              disabled
              className="px-8 py-4 bg-gray-400 text-white font-bold text-lg rounded-2xl cursor-not-allowed opacity-60"
            >
              Event Ended
            </button>
          )}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500" />
              Event Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Duration:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {calculateDuration()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Sessions:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {event.session?.length || 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Session Duration:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {event.session?.[0]
                    ? formatSessionDuration(event.session[0])
                    : "TBD"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Language:
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  English
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Certificate:
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  ✓ Included
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-500" />
              About Organizer
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {event.organizer.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {event.organizer}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      4.8 (124 reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Leading blockchain education provider with over 50+ successful
                events and 5,000+ satisfied learners.
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                  Verified
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-xs rounded-full">
                  Top Rated
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-700/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            What You'll Learn & Achieve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Learning Outcomes:
              </h4>
              <ul className="space-y-2">
                {[
                  "Master fundamental concepts and practical applications",
                  "Hands-on experience with real-world projects",
                  "Industry best practices and professional techniques",
                  "Networking with like-minded professionals",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                What's Included:
              </h4>
              <ul className="space-y-2">
                {[
                  "Live interactive sessions with Q&A",
                  "Downloadable resources and materials",
                  "Certificate of completion",
                  "Access to exclusive community",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventDetail;
