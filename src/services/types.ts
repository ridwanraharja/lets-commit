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

// Event type definition
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  attendees?: number;
  maxAttendees?: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Event creation/update payload
export interface EventPayload {
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  maxAttendees?: number;
  status?: "upcoming" | "ongoing" | "completed" | "cancelled";
}

// User types (for future use)
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin" | "moderator";
  createdAt: string;
  updatedAt: string;
}

export interface UserPayload {
  name: string;
  email: string;
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
