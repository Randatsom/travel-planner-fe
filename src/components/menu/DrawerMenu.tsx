import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AnchorDrawerProps, DrawerWidth, MenuItems } from "./models";

const AnchorDrawer = ({
  anchor,
  handleDrawerClose,
  ...rest
}: AnchorDrawerProps) => {
  const handleListItemClick = () => {
    if (handleDrawerClose) {
      handleDrawerClose();
    }
  };
  const navigate = useNavigate();

  return (
    <MuiDrawer
      {...rest}
      anchor={anchor}
      sx={{
        width: DrawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DrawerWidth,
          boxSizing: "border-box",
        },
      }}
      ModalProps={{
        BackdropProps: {
          onClick: handleDrawerClose || (() => null),
        },
      }}
    >
      <List>
        {MenuItems.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => {
              handleListItemClick();
              navigate(item.link);
            }}
          >
            <ListItemButton>
              <ListItemIcon>{React.createElement(item.icon)}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
};

export default AnchorDrawer;
