import { Button, Grid, Stack } from "@mui/material";
import { IEvent } from "../../../../../core/models/events";
import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEventSchema } from "../../../../auth/utils";
import { useForm } from "react-hook-form";
import TextFieldController from "../../../../forms/textField/TextFieldController";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import EventsService from "../../../../../services/eventsService";
import { attendeesSelectOptionsWithoutCurrentUser } from "../../../utils";
import SelectController from "../../../../forms/textField/SelectController";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../core/slices/auth/authSelector";
import { UserType } from "../../../../../core/slices/auth/types";
import { useEditEvent } from "../../../query/mutations";
import { selectUsers } from "../../../../../core/slices/users/usersSelector";

type CreateEventFormProps = {
  event: IEvent;
};

const EditUserEventForm = ({ event }: CreateEventFormProps) => {
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const handleCloseModal = () => dispatch(closeModal());
  const editUserEventMutation = useEditEvent("events");

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      attendees: event.attendees.map((attendee: UserType) => attendee._id),
    },
  });

  const onSubmit = (data: IEvent) => {
    try {
      editUserEventMutation.mutate({ eventId: event._id, data });
      handleCloseModal();

      dispatch(
        addNotification({
          text: "Событие успешно изменено!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="editUserEvent">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack direction="column" spacing={2} sx={{ marginTop: 1 }}>
            <TextFieldController
              label="Название"
              name="title"
              control={control}
            />
            <TextFieldController
              label="Краткое описание"
              name="description"
              multiline
              control={control}
            />
            <SelectController
              name="attendees"
              label="Участники"
              options={attendeesSelectOptionsWithoutCurrentUser(
                users,
                user._id,
              )}
              control={control}
              multiple
            />
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formState.isSubmitting}
          >
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditUserEventForm;
