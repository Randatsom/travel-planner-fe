import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { Button, Grid } from "@mui/material";
import EventsService from "../../../../../services/eventsService";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";

const DeleteUserEventModal = ({ refetch, event }) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const handleDeleteEvent = async () => {
    try {
      await EventsService.deleteEvent(event._id);
      refetch();
      handleCloseModal();

      dispatch(
        addNotification({
          text: "Событие успешно удалено!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  return (
    <Modal
      modalId={ModalId.DeleteUserEvent}
      title="Вы действительно хотите удалить событие?"
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Button
            onClick={handleDeleteEvent}
            variant="contained"
            color="primary"
          >
            Удалить событие
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteUserEventModal;
