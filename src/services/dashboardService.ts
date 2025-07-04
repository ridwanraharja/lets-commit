import api from "./api";
import { ParticipantDashboard, OrganizerDashboard } from "./types";

export const dashboardService = {
  getParticipantDashboard: async (
    walletAddress: string
  ): Promise<ParticipantDashboard> => {
    const response = await api.get(`/dashboard/${walletAddress}/participant`);
    return response.data;
  },

  getOrganizerDashboard: async (
    walletAddress: string
  ): Promise<OrganizerDashboard> => {
    const response = await api.get(`/dashboard/${walletAddress}/organizer`);
    return response.data;
  },
};
