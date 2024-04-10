import http from "./httpService";
import { IEvent, IEventList } from "../core/models/events";

class EventsService {
  getAllEvents() {
    return http.get<IEvent[]>("/events/getAll");
  }

  getParticipationEvents() {
    return http.get<IEvent[]>("/events/getParticipationEvents");
  }

  getEvent(eventId) {
    return http.get<IEvent>(`/events/${eventId}`);
  }

  createEvent(data: IEvent) {
    return http.post<IEvent>("/events/create", data);
  }

  editEvent(eventId: string, data) {
    return http.patch<IEvent>(`/events/${eventId}`, data);
  }

  deleteEvent(eventId: string) {
    return http.delete(`/events/${eventId}`);
  }

  getListById(eventId: string, listId: string) {
    return http.get(`/events/${eventId}/lists/${listId}`);
  }

  deleteListById(eventId: string, listId: string) {
    return http.delete(`/events/${eventId}/lists/${listId}`);
  }

  updateListById(eventId: string, listId: string, data: IEventList) {
    return http.patch(`/events/${eventId}/lists/${listId}`, data);
  }
}

export default new EventsService();
