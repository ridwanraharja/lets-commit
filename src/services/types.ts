export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type EventState = "ON_SALE" | "ON_GOING" | "FINISHED";

export interface Event {
  eventId: number;
  title: string;
  description: string;
  imageUri: string;
  priceAmount: number;
  commitmentAmount: number;
  totalAmount: number;
  priceAmountUsdFormat: string;
  commitmentAmountUsdFormat: string;
  totalAmountUsdFormat: string;
  startSaleDate: number;
  endSaleDate: number;
  startSaleDateHumanReadable: string;
  endSaleDateHumanReadable: string;
  organizer: string;
  location: string;
  participant: number;
  maxParticipant: number;
  status: EventState;
}

// Event creation/update payload
export interface EventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  organizerWalletAddress: string;
  maxAttendees?: number;
  state?: EventState;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  registrationDeadline?: string;
}

// Dashboard types
export interface Session {
  eventId: number;
  eventTitle: string;
  sessionNumber: number;
  sessionTitle: string;
  startSession: number;
  endSession: number;
  startSessionHumanReadable: string;
  endSessionHumanReadable: string;
  durationInHours: number;
  durationInMinute: number;
  isLinkGenerated?: boolean | null;
}

export interface DashboardStatistic {
  totalDeposit?: number | null;
  totalCommitmentFeeAvailable?: number;
  totalCommitmentFeeClaimed?: number;
  totalRevenue?: number;
  availableWithdraw?: number;
  totalClaimedRevenue?: number;
}

export interface ParticipantDashboard {
  statistic: DashboardStatistic;
  upcomingSession: Session[];
  completedSession: Session[];
}

export interface OrganizerDashboard {
  statistic: DashboardStatistic;
  upcomingSession: Session[];
  completedSession: Session[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  avatar?: string;
  role: "user" | "admin" | "moderator";
  createdAt: string;
  updatedAt: string;
}

export interface UserPayload {
  name: string;
  email: string;
  walletAddress: string;
  password?: string;
  avatar?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchParams extends PaginationParams {
  search?: string;
  filter?: Record<string, string | number | boolean>;
}

export interface EventQueryParams extends PaginationParams {
  state?: EventState;
  organizer?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Event Detail Types
export interface SessionDetail {
  sessionNumber: number;
  title: string;
  startSession: number;
  endSession: number;
  startSessionHumanReadable: string;
  endSessionHumanReadable: string;
  willStartIn: number;
  willStartInHumanReadable: string;
  durationInHours: number;
  durationInMinute: number;
  peopleAttend: number;
  status: "COMPLETE" | "RUNNING" | "UPCOMING";
  activeQrButton?: boolean;
}

export interface SessionDetailParticipant {
  sessionNumber: number;
  title: string;
  startSessionEpochSecond: number;
  endSessionEpochSecond: number;
  startSessionHumanReadable: string;
  endSessionHumanReadable: string;
  willStartIn: number;
  willStartInHumanReadable: string;
  durationInHours: number;
  durationInMinute: number;
  peopleAttend: number;
  status: "COMPLETE" | "RUNNING" | "UPCOMING";
}

export interface EventStatistic {
  totalRevenue?: number;
  sessionCompleted?: number;
  sessionLength: number;
  avgAttendanceRatePercent?: number;
  sessionAttend?: number;
  availableCommitment?: number | null;
}

export interface EventDetailOrganizer {
  eventId: number;
  title: string;
  description: string;
  imageUri: string;
  priceAmount: number;
  commitmentAmount: number;
  totalAmount: number;
  startSaleDate: number;
  endSaleDate: number;
  organizer: string;
  location: string;
  participantList: string[];
  participant: number;
  maxParticipant: number;
  status: EventState;
  canWithdraw: boolean;
  session: SessionDetail[];
  statistic: EventStatistic;
}

export interface EventDetailParticipant {
  eventId: number;
  title: string;
  description: string;
  imageUri: string;
  priceAmount: number;
  commitmentAmount: number;
  totalAmount: number;
  startSaleDate: number;
  endSaleDate: number;
  organizer: string;
  location: string;
  participantList: string[];
  participant: number;
  maxParticipant: number;
  status: EventState;
  session: SessionDetailParticipant[];
  statistic: EventStatistic;
}
