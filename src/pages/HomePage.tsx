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

  if (isPending) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <CreateEventForm
        label="Создание события"
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <ActiveEvents
        label="Активные события"
        events={events}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <CompletedEvents
        label="Завершенные события"
        events={events}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
      />
    </CustomTabs>
  );
};

export default AccountPage;
