import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { IEvent } from "../core/models/events";
import ActiveEvents from "../components/events/user-events/ActiveEvents";
import CustomTabs from "../components/tabs/CustomTabs";
import CompletedEvents from "../components/events/user-events/CompletedEvents";
import CreateEventForm from "../components/events/user-events/CreateEventForm";
import UsersService from "../services/UsersService";
import Loading from "../components/system/Loading";
import { useEvents } from "../components/events/query/queries";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import { updateEvents } from "../core/slices/events/eventsSlice";
import { useSelector } from "react-redux";
import { selectEvents } from "../core/slices/events/eventsSelector";
import { updateUsers } from "../core/slices/users/usersSlice";
import { selectUsers } from "../core/slices/users/usersSelector";

const HomePage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(1);
  const dispatch = useAppDispatch();
  const events = useSelector(selectEvents);
  const users = useSelector(selectUsers);

  localStorage.removeItem("lastPath");

  const eventsQuery = useEvents();

  const allUsersQuery = useQuery<IEvent[]>({
    queryKey: ["allUsers"],
    queryFn: () => UsersService.getAllUsers(),
  });

  useEffect(() => {
    dispatch(updateEvents(eventsQuery.data));
  }, [dispatch, eventsQuery.data]);

  useEffect(() => {
    dispatch(updateUsers(allUsersQuery.data));
  }, [dispatch, eventsQuery.data]);

  if (eventsQuery.isFetching && !eventsQuery.data) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <CreateEventForm
        label="Создание"
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <ActiveEvents label="Активные" setCurrentTabIndex={setCurrentTabIndex} />
      <CompletedEvents
        label="Завершенные"
        setCurrentTabIndex={setCurrentTabIndex}
      />
    </CustomTabs>
  );
};

export default HomePage;
