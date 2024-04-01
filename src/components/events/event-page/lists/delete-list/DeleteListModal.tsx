import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { IEvent, IEventList } from "../../../../../core/models/events";
import { DeleteListForm } from "./DeleteListForm";

type DeleteListModalProps = {
  list: IEventList;
  event: IEvent;
};

export const DeleteListModal = ({ list, event }: DeleteListModalProps) => {
  return (
    <Modal modalId={ModalId.DeleteEventList} title={`Удаление списка`}>
      <DeleteListForm list={list} event={event} />
    </Modal>
  );
};
