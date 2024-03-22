import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { AddItemForm } from "./AddItemForm";

export const AddItemModal = ({ event, list }) => {
  return (
    <Modal
      modalId={ModalId.AddItemToEventList}
      title={`Добавление элемента в ${list.title}`}
    >
      <AddItemForm list={list} event={event} />
    </Modal>
  );
};
