import React from "react";
import { IEvent } from "../../../core/models/events";
import EventsCards from "./event-card/EventsCards";

const CompletedEvents = ({ events, refetch, setCurrentTabIndex, allUsers }) => {
  const completedEvents = events.filter((event: IEvent) => event.completed);

  return (
    <EventsCards
      events={completedEvents}
      refetch={refetch}
      setCurrentTabIndex={setCurrentTabIndex}
      allUsers={allUsers}
    />
  );
};

export default CompletedEvents;
