// Generic types for API responses
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

// Event state types based on backend
export type EventState = "ON_SALE" | "ON_GOING" | "FINISHED";

// Event type definition updated for backend API response
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
export interface ParticipantDashboard {
  walletAddress: string;
  registeredEvents: Event[];
  attendedEvents: Event[];
  upcomingEvents: Event[];
  totalEvents: number;
  totalAttended: number;
  totalRegistered: number;
}

export interface OrganizerDashboard {
  walletAddress: string;
  createdEvents: Event[];
  ongoingEvents: Event[];
  finishedEvents: Event[];
  totalEvents: number;
  totalAttendees: number;
  totalRevenue?: number;
}

// User types (for future use)
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

// Auth types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Common query parameters
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

// Event query parameters
export interface EventQueryParams extends PaginationParams {
  state?: EventState;
  organizer?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
}
