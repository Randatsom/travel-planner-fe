import React from "react";
import { useQuery } from "@tanstack/react-query";
import { IEvent } from "../core/models/events";
import ActiveEvents from "../components/events/user-events/ActiveEvents";
import CustomTabs from "../components/tabs/CustomTabs";
import CompletedEvents from "../components/events/user-events/CompletedEvents";
import CreateEventForm from "../components/events/user-events/CreateEventForm";
import UsersService from "../services/UsersService";
import Loading from "../components/system/Loading";
import { useEvents } from "../components/events/query/queries";

const AccountPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(1);

  localStorage.removeItem("lastPath");

  const eventsQuery = useEvents();

  const allUsersQuery = useQuery<IEvent[]>({
    queryKey: ["allUsers"],
    queryFn: () => UsersService.getAllUsers(),
  });

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
        allUsers={allUsersQuery.data}
      />
      <ActiveEvents
        label="Активные"
        events={eventsQuery.data}
        setCurrentTabIndex={setCurrentTabIndex}
        allUsers={allUsersQuery.data}
      />
      <CompletedEvents
        label="Завершенные"
        events={eventsQuery.data}
        setCurrentTabIndex={setCurrentTabIndex}
        allUsers={allUsersQuery.data}
      />
    </CustomTabs>
  );
};

export default AccountPage;
