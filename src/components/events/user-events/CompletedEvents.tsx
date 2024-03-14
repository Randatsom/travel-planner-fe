import React from "react";
import { IEvent } from "../../../core/models/events";
import EventsCards from "./event-card/EventsCards";

const CompletedEvents = ({ events, refetch, setCurrentTabIndex }) => {
  const completedEvents = events.filter((event: IEvent) => event.completed);

  return (
    <EventsCards
      events={completedEvents}
      refetch={refetch}
      setCurrentTabIndex={setCurrentTabIndex}
    />
  );
};

export default CompletedEvents;
