import http from "./httpService";
import { IEvent } from "../core/models/events";

class EventsService {
  getAllEvents() {
    return http.get<IEvent>("/events/getAll");
  }
}

export default new EventsService();
