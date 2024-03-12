import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import EventsService from "../services/eventsService";
import Loading from "../components/system/Loading";
import { IEvent } from "../core/models/events";

const AccountPage = () => {
  localStorage.removeItem("lastPath");
  const { isPending, data: events } = useQuery<IEvent[]>({
    queryKey: ["events"],
    queryFn: () => EventsService.getAllEvents(),
  });

  if (isPending) {
    return <Loading />;
  }

  if (!events?.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 115px)",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">Ты еще не создавал события</Typography>

          <Button
            sx={{ maxWidth: "220px", alignSelf: "center" }}
            variant="contained"
          >
            Создать событие
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Ваши события</Typography>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        {events.map((event: IEvent) => (
          <Card sx={{ minWidth: 275, maxWidth: 400 }} key={event._id}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5" component="div">
                  {event.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {event.description}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small">Перейти к событию</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Stack>
  );
};

export default AccountPage;
