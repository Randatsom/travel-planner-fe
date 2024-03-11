import { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";
import Notification from "../components/notification/Notification";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <Container maxWidth="sm" sx={{ py: 2 }}>
    {children}

    <Notification />
  </Container>
);

export default AuthLayout;
