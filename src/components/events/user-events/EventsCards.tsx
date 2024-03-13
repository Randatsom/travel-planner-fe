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
import { IEvent } from "../../../core/models/events";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EventsService from "../../../services/eventsService";
import { handleError } from "../../../utils/errors";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";

const EventsCards = ({ events, refetch, setCurrentTabIndex }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event, ev) => {
    event.currentTarget.setAttribute("data-eventid", ev._id);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const eventStatusHandler = async (ev: IEvent) => {
    try {
      const requestData = {
        ...ev,
        completed: !ev.completed,
      };

      await EventsService.editEvent(ev._id, requestData);
      refetch();
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
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 210px)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">Сейчас здесь пусто</Typography>

          <Button
            sx={{ maxWidth: "220px", alignSelf: "center" }}
            variant="contained"
            onClick={() => setCurrentTabIndex(0)}
          >
            Создать событие
          </Button>
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
            width: 300,
            height: 175,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          key={ev._id}
        >
          <CardContent>
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
              <MenuItem onClick={handleMenuClose}>Редактировать</MenuItem>
              <MenuItem onClick={handleMenuClose}>Удалить</MenuItem>
            </Menu>
            <Stack spacing={2}>
              <Typography variant="h5" component="div">
                {ev.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {ev.description ? ev.description : "Описание отсутствует"}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button size="small">Перейти к событию</Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default EventsCards;
