import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IEvent } from "../../../core/models/events";
import EventsService from "../../../services/eventsService";

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IEvent) => EventsService.createEvent(data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["events"] });
      }
    },
  });
}

export function useEditEvent(queryKey: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: IEvent }) =>
      EventsService.editEvent(eventId, data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    },
  });
}

export function useEditEventWithoutUpdate() {
  return useMutation({
    mutationFn: ({ eventId, data }: { eventId: string; data: IEvent }) =>
      EventsService.editEvent(eventId, data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      }
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => EventsService.deleteEvent(eventId),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["events"] });
      }
    },
  });
}

export function useDeleteEventList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, listId }) =>
      EventsService.deleteListById(eventId, listId),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["eventInfo"] });
      }
    },
  });
}

export function useUpdateEventList() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, listId, data }) =>
      EventsService.updateListById(eventId, listId, data),
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["listInfo"] });
      }
    },
  });
}
