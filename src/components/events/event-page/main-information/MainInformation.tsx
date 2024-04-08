import { Box, Paper, Typography } from "@mui/material";
import { ListsInfo } from "./ListsInfo";

export const MainInformation = () => {
  const paperStyles = {
    width: "450px",
  };
  const paperHeaderStyles = {
    height: "35px",
    bgcolor: "primary.main",
    display: "flex",
    alignItems: "center",
    paddingLeft: 2,
  };
  const mainContainerStyles = {
    padding: 2,
    height: "calc(100vh - 285px)",
    overflow: "auto",
  };
  return (
    <Paper elevation={3} sx={paperStyles}>
      <Box sx={paperHeaderStyles}>
        <Typography variant="body1" sx={{ color: "white" }}>
          Сводка из списков
        </Typography>
      </Box>
      <Box sx={mainContainerStyles}>
        <ListsInfo />
      </Box>
    </Paper>
  );
};
