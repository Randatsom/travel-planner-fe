import TextFieldController from "../../../../forms/textField/TextFieldController";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewListListSchema } from "../../../../auth/utils";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { Button, Grid, Stack } from "@mui/material";
import { handleError } from "../../../../../utils/errors";
import { useEditEvent } from "../../../query/mutations";
import { useSelector } from "react-redux";
import { selectEvent } from "../../../../../core/slices/event/eventSelect";
import { IEvent } from "../../../../../core/models/events";

export const AddListForm = () => {
  const dispatch = useAppDispatch();
  const event: IEvent = useSelector(selectEvent);
  const handleCloseModal = () => dispatch(closeModal());
  const editUserEventMutation = useEditEvent("eventInfo");
  const { handleSubmit, control, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(addNewListListSchema),
  });

  const onSubmit = ({ title }) => {
    try {
      editUserEventMutation.mutate({
        eventId: event._id,
        data: { ...event, lists: [{ title, checked: false }, ...event.lists] },
      });
      handleCloseModal();
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="add-new-list">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack direction="column" spacing={2}>
            <TextFieldController control={control} name="title" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formState.isSubmitting}
            >
              Добавить
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
