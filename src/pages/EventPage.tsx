import CustomTabs from "../components/tabs/CustomTabs";
import React from "react";
import { MainInformation } from "../components/events/event-page/MainInformation";
import { EventLists } from "../components/events/event-page/lists/EventLists";
import { useParams } from "react-router-dom";
import { useEvent } from "../components/events/query/queries";
import { IEvent } from "../core/models/events";
import Loading from "../components/system/Loading";

export const EventPage = () => {
  const { eventId } = useParams();
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
  const { data, isPending }: { data: IEvent } = useEvent(eventId);

  if (isPending) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <MainInformation label="Информация" />
      <EventLists label="Списки" event={data} />
      <MainInformation label="Траты" />
      <MainInformation label="Заметки" />
    </CustomTabs>
  );
};
