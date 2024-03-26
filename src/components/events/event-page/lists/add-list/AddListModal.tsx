import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { AddListForm } from "./AddListForm";

export const AddListModal = () => {
  return (
    <Modal modalId={ModalId.AddNewList} title={`Добавление нового списка`}>
      <AddListForm />
    </Modal>
  );
};
