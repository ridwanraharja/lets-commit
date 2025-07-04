// Export all services
export { eventService } from "./eventService";
export { dashboardService } from "./dashboardService";

// Export types
export type {
  ApiResponse,
  PaginatedResponse,
  Event,
  EventPayload,
  EventState,
  EventQueryParams,
  ParticipantDashboard,
  OrganizerDashboard,
  User,
  UserPayload,
  LoginPayload,
  AuthResponse,
  PaginationParams,
  SearchParams,
} from "./types";

// Export default api instance
export { default as api } from "./api";
