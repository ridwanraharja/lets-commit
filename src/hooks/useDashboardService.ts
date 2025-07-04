import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export const useDashboardService = () => {
  const useGetParticipantDashboard = (walletAddress: string) => {
    return useQuery({
      queryKey: ["dashboard", "participant", walletAddress],
      queryFn: () => dashboardService.getParticipantDashboard(walletAddress),
      enabled: !!walletAddress,
    });
  };

  const useGetOrganizerDashboard = (walletAddress: string) => {
    return useQuery({
      queryKey: ["dashboard", "organizer", walletAddress],
      queryFn: () => dashboardService.getOrganizerDashboard(walletAddress),
      enabled: !!walletAddress,
    });
  };

  return {
    useGetParticipantDashboard,
    useGetOrganizerDashboard,
  };
};
