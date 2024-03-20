import { useQuery } from "@tanstack/react-query";
import EventsService from "../../../services/eventsService";
import { IEvent } from "../../../core/models/events";

export function useEvents() {
  return useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: EventsService.getAllEvents,
  });
}

export function useEvent(eventId: string) {
  return useQuery<IEvent[]>({
    queryKey: ["eventInfo"],
    queryFn: () => EventsService.getEvent(eventId),
  });
}
