import { Stack, Typography } from "@mui/material";
import CreateEventForm from "../../core/components/create-event/CreateEventForm";

const MainComponent = () => {
  return (
    <Stack sx={{ width: "500px", margin: "0 auto" }} spacing={3}>
      <Typography variant="h5" sx={{ alignSelf: "center" }}>
        Позови друзей!
      </Typography>
      <CreateEventForm />
    </Stack>
  );
};

export default MainComponent;
