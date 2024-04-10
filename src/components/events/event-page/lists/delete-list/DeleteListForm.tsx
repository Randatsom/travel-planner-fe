import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDeleteEventList } from "../../../query/mutations";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { IEvent, IEventList } from "../../../../../core/models/events";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import TextFieldController from "../../../../forms/textField/TextFieldController";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { deleteEventListSchema } from "../../../../auth/utils";
import { useNavigate } from "react-router-dom";

type DeleteListFormProps = {
  list: IEventList;
  event: IEvent;
};

export const DeleteListForm = ({ list, event }: DeleteListFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(deleteEventListSchema(list.title)),
  });
  const deleteListMutation = useDeleteEventList();
  const handleCloseModal = () => dispatch(closeModal());

  const onSubmit = () => {
    try {
      deleteListMutation.mutate({
        eventId: event._id,
        listId: list._id,
      });
      navigate(`/events/${event._id}`, {
        state: {
          tabIndexToSelect: 1,
        },
      });
      handleCloseModal();
      dispatch(
        addNotification({
          text: "Список удален!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="delete-event-list">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction="column" spacing={2} sx={{ marginTop: "3px" }}>
            <Typography variant="body1">
              Введите{" "}
              <Typography variant="h6" sx={{ color: "red", display: "inline" }}>
                {list.title}
              </Typography>{" "}
              в поле ниже, чтобы удалить список "{list.title}"
            </Typography>
            <TextFieldController
              control={control}
              name="title"
              label="Кодовое слово"
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formState.isSubmitting}
            >
              Удалить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
