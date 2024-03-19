import React from "react";
import { IEvent } from "../../../core/models/events";
import EventsCards from "./event-card/EventsCards";

const ActiveEvents = ({ events, setCurrentTabIndex, allUsers }) => {
  const activeEvents = events.filter((event: IEvent) => !event.completed);
  return (
    <EventsCards
      events={activeEvents}
      setCurrentTabIndex={setCurrentTabIndex}
      allUsers={allUsers}
    />
  );
};

export default ActiveEvents;
