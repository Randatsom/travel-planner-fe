import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { EditListForm } from "./EditListForm";
import { IEvent, IEventList } from "../../../../../core/models/events";

type EditListModalProps = {
  list: IEventList;
  event: IEvent;
};

export const EditListModal = ({ list, event }: EditListModalProps) => {
  return (
    <Modal
      modalId={ModalId.EditEventList}
      title={`Редактирование списка "${list?.title}"`}
    >
      <EditListForm list={list} event={event} />
    </Modal>
  );
};
