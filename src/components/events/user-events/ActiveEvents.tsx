import React from "react";
import { IEvent } from "../../../core/models/events";
import EventsCards from "./event-card/EventsCards";

const ActiveEvents = ({ events, refetch, setCurrentTabIndex }) => {
  const activeEvents = events.filter((event: IEvent) => !event.completed);
  return (
    <EventsCards
      events={activeEvents}
      refetch={refetch}
      setCurrentTabIndex={setCurrentTabIndex}
    />
  );
};

export default ActiveEvents;
