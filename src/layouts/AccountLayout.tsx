import React, { FC, PropsWithChildren } from "react";
import { Container, ContainerOwnProps } from "@mui/material";
import Header from "../components/header/Header";
import Notification from "../components/notification/Notification";

type AccountLayoutProps = PropsWithChildren & ContainerOwnProps;

const AccountLayout: FC<AccountLayoutProps> = ({ maxWidth, children }) => (
  <>
    <Header />
    <Container maxWidth={maxWidth} sx={{ py: 2 }}>
      {children}

      <Notification />
    </Container>
  </>
);

export default AccountLayout;
