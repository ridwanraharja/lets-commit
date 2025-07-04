import api from "./api";
import {
  ApiResponse,
  Event,
  // EventPayload,
  // EventQueryParams,
  ParticipantDashboard,
  OrganizerDashboard,
  EventState,
} from "./types";

export const eventService = {
  // getEvents: async (
  //   params?: EventQueryParams
  // ): Promise<ApiResponse<Event[]>> => {
  //   const response = await api.get("/event", { params });
  //   return response.data;
  // },

  getEventsByState: async (state: EventState): Promise<Event[]> => {
    const response = await api.get(`/event?state=${state}`);
    return response.data;
  },

  getEventById: async (id: string): Promise<ApiResponse<Event>> => {
    const response = await api.get(`/event/${id}`);
    return response.data;
  },

  getEventDetailForParticipant: async (
    eventId: string,
    walletAddress: string
  ): Promise<ApiResponse<Event>> => {
    const response = await api.get(`/event/${eventId}/${walletAddress}`);
    return response.data;
  },

  getParticipantDashboard: async (
    walletAddress: string
  ): Promise<ApiResponse<ParticipantDashboard>> => {
    const response = await api.get(`/dashboard/${walletAddress}/participant`);
    return response.data;
  },

  getOrganizerDashboard: async (
    walletAddress: string
  ): Promise<ApiResponse<OrganizerDashboard>> => {
    const response = await api.get(`/dashboard/${walletAddress}/organizer`);
    return response.data;
  },
};
