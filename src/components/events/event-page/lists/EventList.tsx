import React, { ReactNode } from "react";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import {
  IEvent,
  IEventList,
  IEventListItems,
} from "../../../../core/models/events";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEvent } from "../../query/queries";
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

export const EventList = () => {
  const [checked, setChecked] = React.useState([0]);
  const dispatch = useAppDispatch();
  const { eventId, listId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const listData = location.state.listData;

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
              navigate(`/event/${eventId}`, { state: { tabIndexToSelect: 1 } })
            }
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h3">{listData.title}</Typography>
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
        {/*<AddItemModal />*/}
      </Stack>
      <List sx={{ width: "100%", maxWidth: 550, bgcolor: "background.paper" }}>
        {listData?.items.map((item: IEventListItems) => {
          const labelId = `checkbox-list-label-${item._id}`;

          return (
            <ListItem
              key={item._id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
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
