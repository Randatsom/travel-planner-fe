import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import EditUserEventForm from "./EditUserEventForm";

const EditUserEventModal = ({ event }) => (
  <Modal modalId={ModalId.EditUserEvent} title="Быстрое редактирование события">
    <EditUserEventForm event={event} />
  </Modal>
);

export default EditUserEventModal;
