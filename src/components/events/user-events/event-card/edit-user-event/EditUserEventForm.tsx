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

type CreateEventFormProps = {
  refetch: any;
  event: IEvent;
};

const CreateEventForm = ({ refetch, event }: CreateEventFormProps) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const { handleSubmit, control } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
    defaultValues: {
      title: event.title,
      description: event.description,
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
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEventForm;
