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

const ParticipationPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  const {
    refetch,
    isFetching,
    data: participantEvents,
  } = useQuery<IEvent[]>({
    queryKey: ["participantEvents"],
    queryFn: () => EventsService.getParticipationEvents(),
  });

  if (isFetching && !participantEvents) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <ActiveEvents
        label="Активные"
        events={participantEvents}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <CompletedEvents
        label="Завершенные"
        events={participantEvents}
        refetch={refetch}
        setCurrentTabIndex={setCurrentTabIndex}
      />
    </CustomTabs>
  );
};

export default ParticipationPage;
