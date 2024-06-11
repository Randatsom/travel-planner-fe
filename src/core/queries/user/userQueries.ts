import { useQuery } from "@tanstack/react-query";
import UsersService from "../../../services/UsersService";

export function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.getAllUsers(),
  });
}
