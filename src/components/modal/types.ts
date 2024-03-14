import React, { ReactNode } from "react";
import { ButtonProps } from "@mui/material";

export enum ModalId {
  EditUserEvent = "edit-user-event",
  DeleteUserEvent = "delete-user-event",
}

export type ModalData = {
  [key: string]: string | number;
};

export type ModalAction = Omit<ButtonProps, "onClick"> & {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  autoClose?: boolean;
};

export type ModalProps = {
  modalId: string;
  title: string;
  children?: ReactNode;
  data?: ModalData;
  actions?: ModalAction[];
};
