import React from "react";
import { IEvent } from "../../../core/models/events";
import EventsCards from "./event-card/EventsCards";
import { useSelector } from "react-redux";
import { selectEvents } from "../../../core/slices/events/eventsSelector";
import { selectParticipantEvents } from "../../../core/slices/participantEvents/participantEventsSelector";

const ActiveEvents = ({ setCurrentTabIndex, isParticipantEvents = false }) => {
  const events = isParticipantEvents
    ? useSelector(selectParticipantEvents)
    : useSelector(selectEvents);

  const activeEvents = events.filter((event: IEvent) => !event.completed);
  return (
    <EventsCards
      events={activeEvents}
      setCurrentTabIndex={setCurrentTabIndex}
    />
  );
};

export default ActiveEvents;
