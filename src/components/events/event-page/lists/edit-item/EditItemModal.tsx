import { ModalId } from "../../../../modal/types";
import Modal from "../../../../modal/Modal";
import { EditItemForm } from "./EditItemForm";
import {
  IEvent,
  IEventList,
  IEventListItem,
} from "../../../../../core/models/events";

type EditItemModalProps = {
  event: IEvent;
  list: IEventList;
  item: IEventListItem;
};

export const EditItemModal = ({ event, list, item }: EditItemModalProps) => {
  return (
    <Modal
      modalId={ModalId.EditItemEventList}
      title={`Изменение элемента ${item?.title}`}
    >
      <EditItemForm list={list} event={event} item={item} />
    </Modal>
  );
};
