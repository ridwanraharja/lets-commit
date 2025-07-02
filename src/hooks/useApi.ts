import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { eventService } from "../services";
import type { Event, EventPayload } from "../services/types";

// Query keys for better cache management
export const queryKeys = {
  // Event keys
  events: ["events"] as const,
  event: (id: string) => ["event", id] as const,
  eventsPaginated: (page: number, limit: number) =>
    ["events", "paginated", page, limit] as const,
  eventsByOrganizer: (organizerId: string) =>
    ["events", "organizer", organizerId] as const,
  upcomingEvents: ["events", "upcoming"] as const,
  eventAttendees: (eventId: string) => ["event", eventId, "attendees"] as const,
};

// Event hooks
export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: eventService.getEvents,
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: queryKeys.event(id),
    queryFn: () => eventService.getEventById(id),
    enabled: !!id,
  });
};

export const useEventsPaginated = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: queryKeys.eventsPaginated(page, limit),
    queryFn: () => eventService.getEventsPaginated(page, limit),
  });
};

export const useEventsByOrganizer = (organizerId: string) => {
  return useQuery({
    queryKey: queryKeys.eventsByOrganizer(organizerId),
    queryFn: () => eventService.getEventsByOrganizer(organizerId),
    enabled: !!organizerId,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: queryKeys.upcomingEvents,
    queryFn: eventService.getUpcomingEvents,
  });
};

export const useEventAttendees = (eventId: string) => {
  return useQuery({
    queryKey: queryKeys.eventAttendees(eventId),
    queryFn: () => eventService.getEventAttendees(eventId),
    enabled: !!eventId,
  });
};

// Event mutation hooks
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EventPayload> }) =>
      eventService.updateEvent(id, data),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.event(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
    },
  });
};

export const useUpdateEventStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Event["status"] }) =>
      eventService.updateEventStatus(id, status),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.event(variables.id), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.deleteEvent,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: queryKeys.event(deletedId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.upcomingEvents });
    },
  });
};

export const useJoinEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.joinEvent,
    onSuccess: (data, eventId) => {
      queryClient.setQueryData(queryKeys.event(eventId), data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.eventAttendees(eventId),
      });
    },
  });
};

export const useLeaveEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: eventService.leaveEvent,
    onSuccess: (data, eventId) => {
      queryClient.setQueryData(queryKeys.event(eventId), data);
      queryClient.invalidateQueries({
        queryKey: queryKeys.eventAttendees(eventId),
      });
    },
  });
};
