import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { IEvent } from "../../../../core/models/events";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { handleError } from "../../../../utils/errors";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import EditUserEventModal from "./edit-user-event/EditUserEventModal";
import { openModal } from "../../../../core/slices/modal/modalSlice";
import { ModalId } from "../../../modal/types";
import DeleteUserEventModal from "./delete-user-event/DeleteUserEventModal";
import { useLocation } from "react-router-dom";
import { UserInlineAvatars } from "../../../shared/UserInlineAvatars";
import { useEditEvent } from "../../query/mutations";
import { useNavigate } from "react-router-dom";

const EventsCards = ({ events }) => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = React.useState<IEvent | null>(null);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  const isCurrentPathnameParticipation = location.pathname === "/participation";
  const editUserEventMutation = useEditEvent("events");

  const handleMenuClick = (event, ev) => {
    event.currentTarget.setAttribute("data-eventid", ev._id);
    setAnchorEl(event.currentTarget);
    setSelectedEvent(ev);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const eventStatusHandler = (ev: IEvent) => {
    try {
      const requestData = {
        ...ev,
        completed: !ev.completed,
      };

      editUserEventMutation.mutate({ eventId: ev._id, data: requestData });
    } catch (error) {
      handleError(error, dispatch);
    }
  };

  if (!events?.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">Сейчас здесь пусто</Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      {events.map((ev: IEvent) => (
        <Card
          sx={{
            width: 350,
            height: 215,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={ev._id}
        >
          <CardContent>
            {!isCurrentPathnameParticipation && (
              <IconButton
                edge="end"
                color="inherit"
                onClick={(event) => handleMenuClick(event, ev)}
                sx={{
                  float: "right",
                  color: "text.secondary",
                  marginRight: -2,
                  marginTop: -1,
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={
                anchorEl && ev._id === anchorEl.getAttribute("data-eventid")
                  ? anchorEl
                  : null
              }
              keepMounted
              open={
                Boolean(anchorEl) &&
                ev._id === anchorEl.getAttribute("data-eventid")
              }
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => {
                  eventStatusHandler(ev);
                  handleMenuClose();
                }}
              >
                {ev.completed ? "Сделать активным" : "Завершить событие"}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(openModal(ModalId.EditUserEvent));
                  handleMenuClose();
                }}
              >
                Редактировать
              </MenuItem>
              <EditUserEventModal event={selectedEvent} />
              <MenuItem
                onClick={() => {
                  dispatch(openModal(ModalId.DeleteUserEvent));
                  handleMenuClose();
                }}
              >
                Удалить
              </MenuItem>
              <DeleteUserEventModal event={selectedEvent} />
            </Menu>
            <Stack spacing={2}>
              <Typography variant="h5" component="div">
                {ev.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {ev.description ? ev.description : "Описание отсутствует"}
              </Typography>
              <Stack
                sx={{ display: "flex", alignItems: "center" }}
                direction="row"
                spacing={1}
              >
                {ev.attendees.length > 0 && (
                  <>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Участники:
                    </Typography>
                    <UserInlineAvatars
                      attendees={[ev.user, ...ev.attendees]}
                      maxAvatars={4}
                    />
                  </>
                )}
                {ev.attendees.length === 0 && (
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    У данного события нет участников
                  </Typography>
                )}
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/events/${ev._id}`)}>
              Перейти к событию
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default EventsCards;
