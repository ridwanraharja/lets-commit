import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services";
import {
  EventState,
  EventDetailOrganizer,
  EventDetailParticipant,
  PlatformStatistics,
} from "../services/types";

export const useEventService = () => {
  const useGetEventsByState = (state: EventState) => {
    return useQuery({
      queryKey: ["events", "state", state],
      queryFn: () => eventService.getEventsByState(state),
    });
  };

  const useGetEventById = (id: string, enabled: boolean = true) => {
    return useQuery<EventDetailOrganizer>({
      queryKey: ["event", id],
      queryFn: () => eventService.getEventById(id),
      enabled: !!id && enabled,
    });
  };

  const useGetEventDetailForParticipant = (
    eventId: string,
    walletAddress: string,
    enabled: boolean = true
  ) => {
    return useQuery<EventDetailParticipant>({
      queryKey: ["event", eventId, "participant", walletAddress],
      queryFn: () =>
        eventService.getEventDetailForParticipant(eventId, walletAddress),
      enabled: !!eventId && !!walletAddress && enabled,
    });
  };

  const useGetStatistics = () => {
    return useQuery<PlatformStatistics>({
      queryKey: ["statistics"],
      queryFn: () => eventService.getStatistics(),
    });
  };

  return {
    // Queries
    useGetEventsByState,
    useGetEventById,
    useGetEventDetailForParticipant,
    useGetStatistics,
  };
};
