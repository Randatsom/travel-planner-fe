import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import EventsService from "../services/eventsService";
import Loading from "../components/system/Loading";
import { IEvent } from "../core/models/events";
import ActiveEvents from "../components/events/user-events/ActiveEvents";
import CustomTabs from "../components/tabs/CustomTabs";
import CompletedEvents from "../components/events/user-events/CompletedEvents";
import CreateEventForm from "../core/components/create-event/CreateEventForm";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import { updateParticipantEvents } from "../core/slices/participantEvents/participantEventsSlice";

const ParticipationPage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const dispatch = useAppDispatch();

  const {
    refetch,
    isFetching,
    data: participantEvents,
  } = useQuery<IEvent[]>({
    queryKey: ["participantEvents"],
    queryFn: () => EventsService.getParticipationEvents(),
  });

  useEffect(() => {
    dispatch(updateParticipantEvents(participantEvents));
  }, [dispatch, participantEvents]);

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
        isParticipantEvents={true}
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <CompletedEvents
        label="Завершенные"
        isParticipantEvents={true}
        setCurrentTabIndex={setCurrentTabIndex}
      />
    </CustomTabs>
  );
};

export default ParticipationPage;
