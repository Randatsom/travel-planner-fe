import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import {
  IEvent,
  IEventList,
  IEventListItem,
} from "../../../../core/models/events";
import { useParams, useNavigate } from "react-router-dom";
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ModalId } from "../../../modal/types";
import { openModal } from "../../../../core/slices/modal/modalSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { AddItemModal } from "./add-item/AddItemModal";
import { useSelector } from "react-redux";
import { selectEvent } from "../../../../core/slices/event/eventSelect";
import { useEditEvent } from "../../query/mutations";
import { addNotification } from "../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../core/slices/notification/types";

export const EventList = ({ list, setSelectedList }) => {
  const [checked, setChecked] = useState([0]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const event = useSelector(selectEvent);
  const editUserEventMutation = useEditEvent("eventInfo");

  const handleToggle = (itemToCheck) => () => {
    const editedList: IEventList = {
      ...list,
      items: itemToCheck.checked
        ? [
            { ...itemToCheck, checked: !itemToCheck.checked },
            ...list.items.filter((item) => item._id !== itemToCheck._id),
          ]
        : [
            ...list.items.filter((item) => item._id !== itemToCheck._id),
            { ...itemToCheck, checked: !itemToCheck.checked },
          ],
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
  };

  const handleItemDelete = (itemId: string) => {
    console.log(itemId);
    const editedList: IEventList = {
      ...list,
      items: list.items.filter((item) => item._id !== itemId),
    };
    console.log(editedList);
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
        <Tooltip title="Добавить элемент в список">
          <IconButton
            color="primary"
            aria-label="add item to the list"
            sx={{ width: "55px" }}
            onClick={() => dispatch(openModal(ModalId.AddItemToEventList))}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        <AddItemModal
          event={event}
          list={list}
          setSelectedList={setSelectedList}
        />
      </Stack>
      <List
        key={list._id}
        sx={{ width: "100%", maxWidth: 550, bgcolor: "background.paper" }}
      >
        {list?.items?.map((item: IEventListItem) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleItemDelete(item._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{ marginLeft: 2 }}
                  >
                    <PersonAddAltIcon />
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
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
