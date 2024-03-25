import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useForm } from "react-hook-form";
import { IEvent, IEventList } from "../../../../../core/models/events";
import { yupResolver } from "@hookform/resolvers/yup";
import { addItemToListSchema } from "../../../../auth/utils";
import TextFieldController from "../../../../forms/textField/TextFieldController";
import {
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { useEditEvent } from "../../../query/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";

type AddItemFormProps = {
  event: IEvent;
  list: IEventList;
};

export const AddItemForm = ({
  event,
  list,
  setSelectedList,
}: AddItemFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCloseModal = () => dispatch(closeModal());
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const { eventId } = useParams();
  const editUserEventMutation = useEditEvent("eventInfo");

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(addItemToListSchema),
  });

  const convertRequestData = (title: string) => {
    let listItems = [];
    if (isSwitchChecked) {
      title.split(",").forEach((el: string) => {
        el = el.trim();
        listItems = [...listItems, { title: el, checked: false }];
      });
    } else {
      listItems = [...listItems, { title, checked: false }];
    }

    let foundList = {
      ...event.lists.find(
        (foundList: IEventList) => foundList._id === list._id,
      ),
    };
    foundList.items = [...foundList.items, ...listItems];

    const editedEvent = { ...event };
    editedEvent.lists = editedEvent.lists.filter(
      (filterList: IEventList) => filterList._id !== list._id,
    );
    editedEvent.lists = [foundList, ...editedEvent.lists];

    return editedEvent;
  };

  const onSubmit = ({ title }: { title: string }) => {
    try {
      const editedEvent = convertRequestData(title);
      editUserEventMutation.mutate({
        eventId,
        data: editedEvent,
      });
      handleCloseModal();
      console.log(editedEvent);
      navigate(`/events/${event._id}`, {
        state: {
          tabIndexToSelect: 1,
          selectedList: editedEvent.lists[0],
        },
      });
      dispatch(
        addNotification({
          text: "Элементы добавлены!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="add-item-to-event-list">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack direction="column" spacing={2}>
            <Tooltip title="При включенной функции надо прописывать элементы через запятую. Все они будут разбиты на отдельные элементы списка">
              <FormControlLabel
                control={
                  <Switch
                    checked={isSwitchChecked}
                    onChange={(event) =>
                      setIsSwitchChecked(event.target.checked)
                    }
                  />
                }
                label="Быстрое создание элементов"
              />
            </Tooltip>
            {isSwitchChecked && (
              <TextFieldController
                label="Перечисление элементов"
                name="title"
                multiline
                control={control}
              />
            )}
            {!isSwitchChecked && (
              <TextFieldController
                label="Краткое описание"
                name="title"
                multiline
                control={control}
              />
            )}
            {/*<SelectController*/}
            {/*  name="attendees"*/}
            {/*  label="Участники"*/}
            {/*  options={attendeesSelectOptions(allUsers, user._id)}*/}
            {/*  control={control}*/}
            {/*  multiple*/}
            {/*/>*/}
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formState.isSubmitting}
          >
            Добавить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
