import { useQuery } from "@tanstack/react-query";
import { eventService } from "../services";
import {
  EventState,
  // EventPayload,
  // EventQueryParams
} from "../services/types";

export const useEventService = () => {
  //   const queryClient = useQueryClient();

  // Queries
  //   const useGetEvents = (params?: EventQueryParams) => {
  //     return useQuery({
  //       queryKey: ["events", params],
  //       queryFn: () => eventService.getEvents(params),
  //     });
  //   };

  const useGetEventsByState = (state: EventState) => {
    return useQuery({
      queryKey: ["events", "state", state],
      queryFn: () => eventService.getEventsByState(state),
    });
  };

  const useGetEventById = (id: string) => {
    return useQuery({
      queryKey: ["event", id],
      queryFn: () => eventService.getEventById(id),
      enabled: !!id,
    });
  };

  const useGetEventDetailForParticipant = (
    eventId: string,
    walletAddress: string
  ) => {
    return useQuery({
      queryKey: ["event", eventId, "participant", walletAddress],
      queryFn: () =>
        eventService.getEventDetailForParticipant(eventId, walletAddress),
      enabled: !!eventId && !!walletAddress,
    });
  };

  return {
    // Queries
    useGetEventsByState,
    useGetEventById,
    useGetEventDetailForParticipant,
    // Mutations
  };
};
