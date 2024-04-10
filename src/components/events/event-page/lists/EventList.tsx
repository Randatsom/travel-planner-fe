import React from "react";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import { IEventList, IEventListItem } from "../../../../core/models/events";
import { useNavigate, useParams } from "react-router-dom";
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
import {useEditEventWithoutUpdate, useUpdateEventList, useUpdateEventListWithoutUpdate} from "../../query/mutations";
import { addNotification } from "../../../../core/slices/notification/notificationSlice";
import { NotificationStatus } from "../../../../core/slices/notification/types";
import { sortItems } from "../../utils";
import { UserType } from "../../../../core/slices/auth/types";
import { EditItemModal } from "./edit-item/EditItemModal";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { EditListModal } from "./edit-list/EditListModal";
import { DeleteListModal } from "./delete-list/DeleteListModal";
import { useList } from "../../query/queries";
import Loading from "../../../system/Loading";

export const EventList = () => {
  const { eventId, listId } = useParams();
  const [selectedItem, setSelectedItem] = React.useState<IEventListItem | null>(
    null,
  );

  const event =
    useSelector(selectEvent) ??
    JSON.parse(localStorage.getItem("currentEvent"));
  const [localList, setLocalList] = React.useState<IEventList | null>(
      event.lists.find((list => list._id === listId)),
  );
  const { isLoading, data } = useList(eventId, listId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const editListMutation = useUpdateEventList();
  const editListWithoutUpdateMutation = useUpdateEventListWithoutUpdate();

  React.useEffect(() => {
    setLocalList(data)
  }, [data])

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
    console.log(itemToCheck)
    const editedList: IEventList = {
      ...localList,
      items: [
        { ...itemToCheck, checked: !itemToCheck.checked },
        ...localList?.items.filter((item) => item._id !== itemToCheck._id),
      ],
    };
    editedList.items = sortItems(editedList.items);

    setLocalList(editedList)

    editListWithoutUpdateMutation.mutate({
      eventId,
      listId,
      data: editedList,
    });
  };

  const handleItemDelete = (itemId: string) => {
    const editedList: IEventList = {
      ...data,
      items: data.items.filter((item) => item._id !== itemId),
    };


    editListMutation.mutate({
      eventId,
      listId,
      data: editedList,
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

  if (isLoading) {
    return <Loading />;
  }

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
        <Typography variant="h3">{data.title}</Typography>
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
        <EditListModal list={data} event={event} />
        <DeleteListModal list={data} event={event} />
        <AddItemModal event={event} list={data} />
      </Stack>
      <List
        key={data?._id}
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "background.paper",
          maxHeight: "calc(100vh - 290px)",
          overflow: "auto",
        }}
      >
        {localList?.items?.map((item: IEventListItem) => {
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
              <EditItemModal event={event} list={data} item={selectedItem} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
