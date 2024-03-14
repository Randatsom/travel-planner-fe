import http from "./httpService";
import { IEvent } from "../core/models/events";

class EventsService {
  getAllEvents() {
    return http.get<IEvent>("/events/getAll");
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
}

export default new EventsService();
