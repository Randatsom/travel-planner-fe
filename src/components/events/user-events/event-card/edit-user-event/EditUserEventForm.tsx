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
import { attendeesSelectOptions } from "../../../utils";
import SelectController from "../../../../forms/textField/SelectController";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../core/slices/auth/authSelector";
import { UserType } from "../../../../../core/slices/auth/types";

type CreateEventFormProps = {
  refetch: any;
  event: IEvent;
};

const CreateEventForm = ({
  refetch,
  event,
  allUsers,
}: CreateEventFormProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const handleCloseModal = () => dispatch(closeModal());

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
      attendees: event.attendees.map((attendee: UserType) => attendee._id),
    },
  });

  const onSubmit = async (data: IEvent) => {
    try {
      await EventsService.editEvent(event._id, data);
      refetch();
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
              options={attendeesSelectOptions(allUsers, user._id)}
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

export default CreateEventForm;
