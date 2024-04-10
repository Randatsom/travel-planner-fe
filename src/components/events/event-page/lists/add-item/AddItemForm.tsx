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
import { useEditEvent, useUpdateEventList } from "../../../query/mutations";
import { useParams, useNavigate } from "react-router-dom";
import { addNotification } from "../../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../../core/slices/notification/types";
import { handleError } from "../../../../../utils/errors";
import {
  attendeesSelectOptionsWithoutCurrentUser,
  sortItems,
} from "../../../utils";
import SelectController from "../../../../forms/textField/SelectController";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../../core/slices/auth/authSelector";
import { selectUsers } from "../../../../../core/slices/users/usersSelector";
import { UserType } from "../../../../../core/slices/auth/types";

type AddItemFormProps = {
  event: IEvent;
  list: IEventList;
};

export const AddItemForm = ({ event, list }: AddItemFormProps) => {
  const user = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCloseModal = () => dispatch(closeModal());
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const { eventId } = useParams();
  const editListMutation = useUpdateEventList();

  const { handleSubmit, control, formState } = useForm<IEvent>({
    mode: "onChange",
    resolver: yupResolver(addItemToListSchema),
  });

  const convertRequestData = ({
    title,
    assignees,
  }: {
    title: string;
    assignees: string[];
  }) => {
    let listItems = [];
    const mappedAssignees = assignees.map((assigneeId: string) =>
      users.find((user: UserType) => user._id === assigneeId),
    );
    if (isSwitchChecked) {
      title.split(",").forEach((el: string) => {
        el = el.trim();
        listItems = [
          ...listItems,
          { title: el, checked: false, assignees: mappedAssignees },
        ];
      });
    } else {
      listItems = [
        ...listItems,
        { title: title, checked: false, assignees: mappedAssignees },
      ];
    }

    let listToUpdate = { ...list };
    listToUpdate.items = sortItems([...listToUpdate.items, ...listItems]);

    return listToUpdate;
  };

  const onSubmit = (data: { title: string; assignees: string[] }) => {
    try {
      const editedEvent = convertRequestData(data);
      editListMutation.mutate({
        eventId: event._id,
        listId: list._id,
        data: editedEvent,
      });
      handleCloseModal();
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
          <Stack direction="column" spacing={2} sx={{ marginTop: "3px" }}>
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
            <SelectController
              name="assignees"
              label="Назначить на"
              options={attendeesSelectOptionsWithoutCurrentUser(
                users,
                user._id,
              )}
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
