import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ModalAction, ModalProps } from "./types";
import { closeModal } from "../../core/slices/modal/modalSlice";
import { selectIsLoading } from "../../core/slices/notification/notificationSelector";
import { LoadingButton } from "@mui/lab";
import { RootState } from "../../core/types";
import { modalStyles, StyledCloseIcon } from "./styled";

const Modal = ({
  modalId,
  children,
  title,
  data = {},
  actions = [],
}: ModalProps) => {
  const openModalId = useSelector(
    (state: RootState) => state.modal.openModalId,
  );
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  const isVisible = openModalId === modalId;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleOnClick =
    (callback: ModalAction["onClick"], autoClose = true) =>
    () => {
      if (typeof callback === "function") {
        callback(data);
        if (autoClose) {
        }
      }
    };

  if (!isVisible) {
    return null;
  }

  return (
    <Dialog open={true} onClose={handleClose} sx={modalStyles}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: title ? "space-between" : "end",
          alignItems: "center",
        }}
      >
        {title}
        <StyledCloseIcon onClick={handleClose} />
      </DialogTitle>

      {children && <DialogContent>{children}</DialogContent>}

      {actions.length > 0 && (
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {actions.map(
            ({
              variant = "contained",
              onClick = () => {},
              text,
              autoClose = true,
              ...props
            }) => (
              <LoadingButton
                variant={variant}
                onClick={handleOnClick(onClick, autoClose)}
                key={text}
                loading={isLoading}
                {...props}
              >
                {text}
              </LoadingButton>
            ),
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;
