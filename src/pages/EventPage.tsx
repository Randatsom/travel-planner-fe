import CustomTabs from "../components/tabs/CustomTabs";
import React, { useEffect } from "react";
import { MainInformation } from "../components/events/event-page/MainInformation";
import { EventLists } from "../components/events/event-page/lists/EventLists";
import { useParams, useLocation } from "react-router-dom";
import { useEvent } from "../components/events/query/queries";
import { IEvent } from "../core/models/events";
import Loading from "../components/system/Loading";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import { updateEvent } from "../core/slices/event/eventSlice";

export const EventPage = () => {
  const dispatch = useAppDispatch();
  const { eventId } = useParams();
  const location = useLocation();
  const tabIndexToSelect = location.state?.tabIndexToSelect;
  const [currentTabIndex, setCurrentTabIndex] = React.useState(
    tabIndexToSelect ?? 0,
  );
  const { data, isPending }: { data: IEvent } = useEvent(eventId);

  useEffect(() => {
    dispatch(updateEvent(data));
  }, [dispatch, data]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <MainInformation label="Информация" />
      <EventLists label="Списки" />
      <MainInformation label="Траты" />
      <MainInformation label="Заметки" />
    </CustomTabs>
  );
};
