import React, { useEffect } from "react";
import ActiveEvents from "../components/events/user-events/ActiveEvents";
import CustomTabs from "../components/tabs/CustomTabs";
import CompletedEvents from "../components/events/user-events/CompletedEvents";
import CreateEventForm from "../components/events/user-events/CreateEventForm";
import Loading from "../components/system/Loading";
import { useEvents } from "../components/events/query/queries";
import { useAppDispatch } from "../utils/hooks/useAppDispatch";
import { updateEvents } from "../core/slices/events/eventsSlice";

const HomePage = () => {
  const [currentTabIndex, setCurrentTabIndex] = React.useState(1);
  const dispatch = useAppDispatch();

  localStorage.removeItem("lastPath");

  const eventsQuery = useEvents();

  useEffect(() => {
    dispatch(updateEvents(eventsQuery.data));
  }, [dispatch, eventsQuery.data]);

  if (eventsQuery.isFetching && !eventsQuery.data) {
    return <Loading />;
  }

  return (
    <CustomTabs
      currentTabIndex={currentTabIndex}
      setCurrentTabIndex={setCurrentTabIndex}
    >
      <CreateEventForm
        label="Создание"
        setCurrentTabIndex={setCurrentTabIndex}
      />
      <ActiveEvents label="Активные" setCurrentTabIndex={setCurrentTabIndex} />
      <CompletedEvents
        label="Завершенные"
        setCurrentTabIndex={setCurrentTabIndex}
      />
    </CustomTabs>
  );
};

export default HomePage;
