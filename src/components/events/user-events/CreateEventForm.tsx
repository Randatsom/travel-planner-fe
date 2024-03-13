import { Button, Grid, Stack } from "@mui/material";
import { IEvent } from "../../../core/models/events";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEventSchema } from "../../auth/utils";
import { useForm } from "react-hook-form";
import TextFieldController from "../../forms/textField/TextFieldController";
import { addNotification } from "../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../core/slices/notification/types";
import { handleError } from "../../../utils/errors";
import EventsService from "../../../services/eventsService";

const CreateEventForm = ({ refetch, setCurrentTabIndex }) => {
  const dispatch = useAppDispatch();
  const isLoading = false;

  const { handleSubmit, control } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
  });

  const onSubmit = async (data: IEvent) => {
    try {
      const requestData = {
        ...data,
      };

      await EventsService.createEvent(requestData);
      refetch();
      setCurrentTabIndex(1);

      dispatch(
        addNotification({
          text: "Новое событие успешно создано!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack direction="column" spacing={2}>
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
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={isLoading}>
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEventForm;
