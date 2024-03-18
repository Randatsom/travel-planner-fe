import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import EventsService from "../services/eventsService";
import Loading from "../components/system/Loading";
import { IEvent } from "../core/models/events";
import ActiveEvents from "../components/events/user-events/ActiveEvents";
import CustomTabs from "../components/tabs/CustomTabs";
import CompletedEvents from "../components/events/user-events/CompletedEvents";
import CreateEventForm from "../components/events/user-events/CreateEventForm";
import UsersService from "../services/UsersService";

const AccountPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(1);

  localStorage.removeItem("lastPath");

  const {
    refetch,
    isPending,
    data: events,
  } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: () => EventsService.getAllEvents(),
  });

  const { data: allUsers } = useQuery<IEvent[]>({
    queryKey: ["allUsers"],
    queryFn: () => UsersService.getAllUsers(),
  });

  if (isPending) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <CreateEventForm
        label="Создание"
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
        allUsers={allUsers}
      />
      <ActiveEvents
        label="Активные"
        events={events}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
        allUsers={allUsers}
      />
      <CompletedEvents
        label="Завершенные"
        events={events}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
        allUsers={allUsers}
      />
    </CustomTabs>
  );
};

export default AccountPage;
