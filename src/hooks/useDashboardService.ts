import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

export const useDashboardService = () => {
  const useGetParticipantDashboard = (
    walletAddress: string,
    enabled: boolean = true
  ) => {
    return useQuery({
      queryKey: ["dashboard", "participant", walletAddress],
      queryFn: () => dashboardService.getParticipantDashboard(walletAddress),
      enabled: !!walletAddress && enabled,
    });
  };

  const useGetOrganizerDashboard = (
    walletAddress: string,
    enabled: boolean = true
  ) => {
    return useQuery({
      queryKey: ["dashboard", "organizer", walletAddress],
      queryFn: () => dashboardService.getOrganizerDashboard(walletAddress),
      enabled: !!walletAddress && enabled,
    });
  };

  return {
    useGetParticipantDashboard,
    useGetOrganizerDashboard,
  };
};
