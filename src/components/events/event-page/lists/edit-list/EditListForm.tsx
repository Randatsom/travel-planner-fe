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
import { useUpdateEventList } from "../../../query/mutations";

type EditListFormProps = {
  list: IEventList;
  event: IEvent;
};

export const EditListForm = ({ list, event }: EditListFormProps) => {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(addNewListSchema),
    defaultValues: {
      title: list.title,
    },
  });
  const editListMutation = useUpdateEventList();
  const handleCloseModal = () => dispatch(closeModal());

  const convertRequestData = (title: string) => {
    const listToEdit = { ...list };
    listToEdit.title = title;

    return listToEdit;
  };

  const onSubmit = ({ title }: { title: string }) => {
    try {
      const editedList = convertRequestData(title);
      editListMutation.mutate({
        eventId: event._id,
        listId: list._id,
        data: editedList,
      });
      handleCloseModal();
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
