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
import SelectController from "../../forms/textField/SelectController";
import { attendeesSelectOptions } from "../utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../core/slices/auth/authSelector";
import { useCreateEvent } from "../query/mutations";
import { selectUsers } from "../../../core/slices/users/usersSelector";

const CreateEventForm = ({ setCurrentTabIndex }) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const createEventMutation = useCreateEvent();

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
  });

  const onSubmit = async (data: IEvent) => {
    try {
      createEventMutation.mutate(data);
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
        <Grid item xs={12} sm={12} md={8} lg={6} xl={4}>
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
            <SelectController
              name="attendees"
              label="Участники"
              options={attendeesSelectOptions(users, user._id)}
              control={control}
              multiple
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            disabled={formState.isSubmitting}
          >
            Создать
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEventForm;
