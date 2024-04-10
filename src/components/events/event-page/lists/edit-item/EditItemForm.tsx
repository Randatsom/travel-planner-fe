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
import { Button, Grid, Stack } from "@mui/material";
import { useUpdateEventList } from "../../../query/mutations";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import { attendeesSelectOptions } from "../../../utils";
import SelectController from "../../../../forms/textField/SelectController";
import { useSelector } from "react-redux";
import { selectUsers } from "../../../../../core/slices/users/usersSelector";
import { UserType } from "../../../../../core/slices/auth/types";

type EditItemFormProps = {
  event: IEvent;
  list: IEventList;
  item: IEventListItem;
};

export const EditItemForm = ({ event, list, item }: EditItemFormProps) => {
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const handleCloseModal = () => dispatch(closeModal());
  const editListMutation = useUpdateEventList();

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

    let listToUpdate = { ...list };
    listToUpdate.items = listToUpdate.items.map((mapItem: IEventListItem) => {
      if (mapItem._id === item._id) {
        return updatedItem;
      }

      return mapItem;
    });

    return listToUpdate;
  };

  const onSubmit = (data: { title: string; assignees: string[] }) => {
    try {
      const editedList = convertRequestData(data);
      editListMutation.mutate({
        eventId: event._id,
        listId: list._id,
        data: editedList,
      });
      handleCloseModal();
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
          <Stack direction="column" spacing={2} sx={{ marginTop: "4px" }}>
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
            Изменить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
