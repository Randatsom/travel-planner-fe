import { FC, PropsWithChildren } from "react";
import { Container } from "@mui/material";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <Container maxWidth="sm" sx={{ py: 2 }}>
    {children}
  </Container>
);

export default AuthLayout;
