import { Button, Stack } from "@mui/material";
import { IEvent } from "../../models/events";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEventSchema } from "../../../components/auth/utils";
import { useForm } from "react-hook-form";
import TextFieldController from "../../../components/forms/textField/TextFieldController";
import { addNotification } from "../../slices/notification/notificationSlice";
import { NotificationStatus } from "../../slices/notification/types";
import { handleError } from "../../../utils/errors";
import SelectController from "../../../components/forms/textField/SelectController";
import { attendeesSelectOptionsWithoutCurrentUser } from "../../../components/events/utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../slices/auth/authSelector";
import { useCreateEvent } from "../../../components/events/query/mutations";
import { useAllUsers } from "../../queries/user/userQueries";

const CreateEventForm = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectCurrentUser);
  const createEventMutation = useCreateEvent();

  const allUsersQuery = useAllUsers();

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(createEventSchema),
  });

  const onSubmit = async (data: IEvent) => {
    try {
      createEventMutation.mutate(data);

      dispatch(
        addNotification({
          text: "Новое событие успешно создано!",
          status: NotificationStatus.Success,
        })
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="column" spacing={3}>
        <TextFieldController label="Название" name="title" control={control} />
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
            allUsersQuery.data,
            user._id
          )}
          control={control}
          multiple
        />
        <Button
          type="submit"
          variant="contained"
          disabled={formState.isSubmitting}
          sx={{ width: "220px", alignSelf: "center" }}
        >
          Создать
        </Button>
      </Stack>
    </form>
  );
};

export default CreateEventForm;
