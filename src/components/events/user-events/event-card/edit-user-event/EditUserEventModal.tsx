import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import EditUserEventForm from "./EditUserEventForm";

const EditUserEventModal = ({ refetch, event, allUsers }) => (
  <Modal modalId={ModalId.EditUserEvent} title="Быстрое редактирование события">
    <EditUserEventForm refetch={refetch} event={event} allUsers={allUsers} />
  </Modal>
);

export default EditUserEventModal;
