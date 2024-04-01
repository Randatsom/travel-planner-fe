import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { EditItemForm } from "./EditItemForm";

export const EditItemModal = ({ event, list, setSelectedList, item }) => {
  return (
    <Modal
      modalId={ModalId.EditItemEventList}
      title={`Добавление элемента в ${list.title}`}
    >
      <EditItemForm
        list={list}
        event={event}
        item={item}
        setSelectedList={setSelectedList}
      />
    </Modal>
  );
};
