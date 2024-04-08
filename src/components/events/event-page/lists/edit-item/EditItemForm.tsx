import { useAppDispatch } from "../../../../../utils/hooks/useAppDispatch";
import { closeModal } from "../../../../../core/slices/modal/modalSlice";
import { useForm } from "react-hook-form";
import {
  IEvent,
  IEventList,
  IEventListItem,
} from "../../../../../core/models/events";
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
import {
  attendeesSelectOptions,
  attendeesSelectOptionsWithoutCurrentUser,
  sortItems,
} from "../../../utils";
import SelectController from "../../../../forms/textField/SelectController";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../core/slices/auth/authSelector";
import { selectUsers } from "../../../../../core/slices/users/usersSelector";
import { UserType } from "../../../../../core/slices/auth/types";

type EditItemFormProps = {
  event: IEvent;
  list: IEventList;
  item: IEventListItem;
};

export const EditItemForm = ({ event, list, item }: EditItemFormProps) => {
  const user = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCloseModal = () => dispatch(closeModal());
  const { eventId } = useParams();
  const editUserEventMutation = useEditEvent("eventInfo");

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(addItemToListSchema),
    defaultValues: {
      title: item.title,
      assignees: item.assignees.map((assignee: UserType) => assignee._id),
    },
  });

  const convertRequestData = ({
    title,
    assignees,
  }: {
    title: string;
    assignees: string[];
  }) => {
    const mappedAssignees = assignees.map((assigneeId: string) =>
      users.find((user: UserType) => user._id === assigneeId),
    );

    const updatedItem = { ...item, title, assignees: mappedAssignees };

    let foundList = {
      ...event.lists.find(
        (foundList: IEventList) => foundList._id === list._id,
      ),
    };
    foundList.items = foundList.items.map((mapItem: IEventListItem) => {
      if (mapItem._id === item._id) {
        return updatedItem;
      }

      return mapItem;
    });
    foundList.items = sortItems([...foundList.items]);

    const editedEvent = { ...event };
    editedEvent.lists = editedEvent.lists.filter(
      (filterList: IEventList) => filterList._id !== list._id,
    );
    editedEvent.lists = [foundList, ...editedEvent.lists];

    return editedEvent;
  };

  const onSubmit = (data: { title: string; assignees: string[] }) => {
    try {
      const editedEvent = convertRequestData(data);
      editUserEventMutation.mutate({
        eventId,
        data: editedEvent,
      });
      handleCloseModal();
      navigate(`/events/${event._id}`, {
        state: {
          tabIndexToSelect: 1,
          selectedList: editedEvent.lists[0],
        },
      });
      dispatch(
        addNotification({
          text: "Элементы обновлен!",
          status: NotificationStatus.Success,
        }),
      );
    } catch (error) {
      handleError(error, dispatch);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="edit-item-event-list">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack direction="column" spacing={2} sx={{ marginTop: "3px" }}>
            <TextFieldController
              label="Название"
              name="title"
              multiline
              control={control}
            />
            <SelectController
              name="assignees"
              label="Назначить на"
              options={attendeesSelectOptions(users)}
              control={control}
              multiple
            />
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
