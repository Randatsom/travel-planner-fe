import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { Button, Grid } from "@mui/material";
import EventsService from "../../../../../services/eventsService";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import { useState } from "react";

const DeleteUserEventModal = ({ refetch, event }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());

  const handleDeleteEvent = async () => {
    setIsDeleting(true);
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
      setIsDeleting(false);
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
            disabled={isDeleting}
          >
            Удалить событие
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DeleteUserEventModal;
