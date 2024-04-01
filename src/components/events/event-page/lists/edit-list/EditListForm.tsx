import TextFieldController from "../../../../forms/textField/TextFieldController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewListSchema } from "../../../../auth/utils";
import { Button, Grid, Stack } from "@mui/material";
import { IEvent, IEventList } from "../../../../../core/models/events";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";

import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import { useEditEvent } from "../../../query/mutations";
import { useNavigate } from "react-router-dom";

type EditListFormProps = {
  list: IEventList;
  event: IEvent;
};

export const EditListForm = ({ list, event }: EditListFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(addNewListSchema),
    defaultValues: {
      title: list.title,
    },
  });
  const editUserEventMutation = useEditEvent("eventInfo");
  const handleCloseModal = () => dispatch(closeModal());

  const convertRequestData = (title: string) => {
    let foundList = {
      ...event.lists.find(
        (foundList: IEventList) => foundList._id === list._id,
      ),
    };
    foundList.title = title;

    const editedEvent = { ...event };
    editedEvent.lists = editedEvent.lists.filter(
      (filterList: IEventList) => filterList._id !== list._id,
    );
    editedEvent.lists = [foundList, ...editedEvent.lists];

    return editedEvent;
  };

  const onSubmit = ({ title }: { title: string }) => {
    try {
      const editedEvent = convertRequestData(title);
      editUserEventMutation.mutate({
        eventId: event._id,
        data: editedEvent,
      });
      handleCloseModal();
      navigate(`/events/${event._id}`, {
        state: {
          tabIndexToSelect: 1,
          selectedList: editedEvent.lists[0],
        },
      });
      dispatch(
        addNotification({
          text: "Список обновлен!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="edit-event-list">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction="column" spacing={2} sx={{ marginTop: "3px" }}>
            <TextFieldController
              control={control}
              name="title"
              label="Название"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formState.isSubmitting}
            >
              Редактировать
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
