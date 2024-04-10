import { useSelector } from "react-redux";
import { selectEvent } from "../../../../core/slices/event/eventSelect";
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { selectCurrentUser } from "../../../../core/slices/auth/authSelector";
import { IEventList, IEventListItem } from "../../../../core/models/events";
import React, { Fragment } from "react";
import { openModal } from "../../../../core/slices/modal/modalSlice";
import { ModalId } from "../../../modal/types";
import { EditItemModal } from "../lists/edit-item/EditItemModal";
import { sortItems } from "../../utils";
import { useEditEvent } from "../../query/mutations";
import { UserType } from "../../../../core/slices/auth/types";

type userListsInfoType = {
  id: string;
  name: string;
  items: IEventListItem[];
};

export const ListsInfo = () => {
  const event =
    useSelector(selectEvent) ??
    JSON.parse(localStorage.getItem("currentEvent"));
  const user = useSelector(selectCurrentUser);
  const editUserEventMutation = useEditEvent("eventInfo");

  const filterListItems = (items: IEventListItem[]) => {
    return items.filter((item: IEventListItem) =>
      item.assignees.some((assignee: UserType) => assignee._id === user._id),
    );
  };

  const userListsInfo = event?.lists.map((list: IEventList) => {
    return {
      id: list._id,
      name: list.title,
      items: filterListItems(list.items),
    };
  });

  const handleToggle =
    (listInfo: userListsInfoType, itemToCheck: IEventListItem) => () => {
      console.log(listInfo, itemToCheck);
      const list = event.lists.find(
        (foundList: IEventList) => foundList._id === listInfo.id,
      );
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
        lists: event.lists.map((list: IEventList) =>
          list._id === editedList._id ? editedList : list,
        ),
      };

      editUserEventMutation.mutate({
        eventId: event._id,
        data: editedEvent,
      });
    };

  return (
    <>
      {userListsInfo?.map(
        (list: userListsInfoType) =>
          list?.items.length > 0 && (
            <Fragment key={list?.name}>
              <Typography variant="h6">{list?.name}</Typography>
              <List
                key={list?.id}
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
                    <ListItem key={item._id} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(list, item)}
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
              {list?.items?.map((item: IEventListItem) => {})}
            </Fragment>
          ),
      )}
    </>
  );
};
