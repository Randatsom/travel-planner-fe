import React, { useState } from "react";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import { IEventList, IEventListItem } from "../../../../core/models/events";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SpeedDial,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { ModalId } from "../../../modal/types";
import { openModal } from "../../../../core/slices/modal/modalSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EditIcon from "@mui/icons-material/Edit";
import { AddItemModal } from "./add-item/AddItemModal";
import { useSelector } from "react-redux";
import { selectEvent } from "../../../../core/slices/event/eventSelect";
import { useEditEvent } from "../../query/mutations";
import { addNotification } from "../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../core/slices/notification/types";
import { sortItems } from "../../utils";
import { UserType } from "../../../../core/slices/auth/types";
import { EditItemModal } from "./edit-item/EditItemModal";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { EditListModal } from "./edit-list/EditListModal";
import { DeleteListModal } from "./delete-list/DeleteListModal";

export const EventList = ({ list, setSelectedList }) => {
  const [selectedItem, setSelectedItem] = useState<IEventListItem | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const event = useSelector(selectEvent);
  const editUserEventMutation = useEditEvent("eventInfo");

  const actions = [
    {
      icon: (
        <IconButton
          aria-label="add new list"
          sx={{ width: "55px" }}
          onClick={() => dispatch(openModal(ModalId.AddItemToEventList))}
        >
          <AddIcon />
        </IconButton>
      ),
      name: "Добавить элементы",
    },
    {
      icon: (
        <IconButton
          aria-label="edit list"
          sx={{ width: "55px" }}
          onClick={() => dispatch(openModal(ModalId.EditEventList))}
        >
          <EditIcon />
        </IconButton>
      ),
      name: "Редактировать список",
    },
    {
      icon: (
        <IconButton
          aria-label="delete list"
          sx={{ width: "55px" }}
          onClick={() => dispatch(openModal(ModalId.DeleteEventList))}
        >
          <DeleteIcon />
        </IconButton>
      ),
      name: "Удалить список",
    },
  ];

  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: "2px",
      left: theme.spacing(2),
    },
  }));

  const handleToggle = (itemToCheck) => () => {
    const editedList: IEventList = {
      ...list,
      items: [
        { ...itemToCheck, checked: !itemToCheck.checked },
        ...list.items.filter((item) => item._id !== itemToCheck._id),
      ],
    };
    editedList.items = sortItems(editedList.items);

    const editedEvent = {
      ...event,
      lists: [
        editedList,
        ...event.lists.filter(
          (list: IEventList) => list._id !== editedList._id,
        ),
      ],
    };

    editUserEventMutation.mutate({
      eventId: event._id,
      data: editedEvent,
    });

    navigate(`/events/${event._id}`, {
      state: {
        tabIndexToSelect: 1,
        selectedList: editedEvent.lists[0],
      },
    });
  };

  const handleItemDelete = (itemId: string) => {
    const editedList: IEventList = {
      ...list,
      items: list.items.filter((item) => item._id !== itemId),
    };
    const editedEvent = {
      ...event,
      lists: [
        editedList,
        ...event.lists.filter(
          (list: IEventList) => list._id !== editedList._id,
        ),
      ],
    };

    editUserEventMutation.mutate({
      eventId: event._id,
      data: editedEvent,
    });

    navigate(`/events/${event._id}`, {
      state: {
        tabIndexToSelect: 1,
        selectedList: editedEvent.lists[0],
      },
    });
    dispatch(
      addNotification({
        text: "Элемент удален!",
        status: NotificationStatus.Success,
      }),
    );
  };

  const getAssigneesNames = (assignees: UserType[]) => {
    return (
      "Назначены: " +
      assignees.map((assignee: UserType) => assignee.username).join(", ")
    );
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Tooltip title="Вернуться к спискам">
          <IconButton
            edge="end"
            color="inherit"
            sx={{ width: "55px" }}
            onClick={() =>
              navigate(`/events/${event._id}`, {
                state: { tabIndexToSelect: 1 },
              })
            }
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h3">{list.title}</Typography>
        <Box sx={{ position: "relative" }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<SpeedDialIcon />}
            direction="right"
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </StyledSpeedDial>
        </Box>
        <EditListModal list={list} event={event} />
        <DeleteListModal list={list} event={event} />
        <AddItemModal
          event={event}
          list={list}
          setSelectedList={setSelectedList}
        />
      </Stack>
      <List
        key={list._id}
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "background.paper",
          maxHeight: "calc(100vh - 290px)",
          overflow: "auto",
        }}
      >
        {list?.items?.map((item: IEventListItem) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="delete">
                    {item.assignees.length > 0 ? (
                      <Tooltip title={getAssigneesNames(item.assignees)}>
                        <PersonIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Никто не назначен">
                        <PersonOffIcon />
                      </Tooltip>
                    )}
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ marginLeft: 2 }}
                    onClick={() => {
                      setSelectedItem(item);
                      dispatch(openModal(ModalId.EditItemEventList));
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ marginLeft: 2 }}
                    onClick={() => handleItemDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(item)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={item.checked}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${item.title}`} />
              </ListItemButton>
              <EditItemModal
                event={event}
                list={list}
                item={selectedItem}
                setSelectedList={setSelectedList}
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
