import api from "./api";
import { ApiResponse, PaginatedResponse, Event, EventPayload } from "./types";

export const eventService = {
  // GET requests
  getEvents: async (): Promise<ApiResponse<Event[]>> => {
    const response = await api.get("/events");
    return response.data;
  },

  getEventById: async (id: string): Promise<ApiResponse<Event>> => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  getEventsPaginated: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Event>> => {
    const response = await api.get(`/events?page=${page}&limit=${limit}`);
    return response.data;
  },

  getEventsByOrganizer: async (
    organizerId: string
  ): Promise<ApiResponse<Event[]>> => {
    const response = await api.get(`/events/organizer/${organizerId}`);
    return response.data;
  },

  getUpcomingEvents: async (): Promise<ApiResponse<Event[]>> => {
    const response = await api.get("/events/upcoming");
    return response.data;
  },

  getEventAttendees: async (
    eventId: string
  ): Promise<
    ApiResponse<{ id: string; name: string; email: string; joinedAt: string }[]>
  > => {
    const response = await api.get(`/events/${eventId}/attendees`);
    return response.data;
  },

  // POST requests
  createEvent: async (eventData: EventPayload): Promise<ApiResponse<Event>> => {
    const response = await api.post("/events", eventData);
    return response.data;
  },

  joinEvent: async (eventId: string): Promise<ApiResponse<Event>> => {
    const response = await api.post(`/events/${eventId}/join`);
    return response.data;
  },

  leaveEvent: async (eventId: string): Promise<ApiResponse<Event>> => {
    const response = await api.post(`/events/${eventId}/leave`);
    return response.data;
  },

  // PUT requests
  updateEvent: async (
    id: string,
    eventData: Partial<EventPayload>
  ): Promise<ApiResponse<Event>> => {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  },

  updateEventStatus: async (
    id: string,
    status: Event["status"]
  ): Promise<ApiResponse<Event>> => {
    const response = await api.patch(`/events/${id}/status`, { status });
    return response.data;
  },

  // DELETE requests
  deleteEvent: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};
