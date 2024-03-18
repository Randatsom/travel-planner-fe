import http from "./httpService";
import { UserType } from "../core/slices/auth/types";

class EventsService {
  getAllUsers() {
    return http.get<UserType[]>("/users/getAll");
  }
}

export default new EventsService();
