import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import DrawerMenu from "../menu/DrawerMenu";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { logout } from "../../core/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import paths from "../../routes/paths";

const HeaderComponent = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Travel Planner
        </Typography>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate(paths.ACCOUNT);
                handleMenuClose();
              }}
            >
              Настройки аккаунта
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logout());
                handleMenuClose();
              }}
            >
              Выйти из аккаунта
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <DrawerMenu
        anchor="left"
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
    </AppBar>
  );
};

export default HeaderComponent;
