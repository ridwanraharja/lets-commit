import api from "./api";
import {
  Event,
  EventState,
  EventDetailOrganizer,
  EventDetailParticipant,
} from "./types";

export const eventService = {
  getEventsByState: async (state: EventState): Promise<Event[]> => {
    const response = await api.get(`/event?state=${state}`);
    return response.data;
  },

  getEventById: async (id: string): Promise<EventDetailOrganizer> => {
    const response = await api.get(`/event/${id}`);
    return response.data;
  },

  getEventDetailForParticipant: async (
    eventId: string,
    walletAddress: string
  ): Promise<EventDetailParticipant> => {
    const response = await api.get(`/event/${eventId}/${walletAddress}`);
    return response.data;
  },
};
