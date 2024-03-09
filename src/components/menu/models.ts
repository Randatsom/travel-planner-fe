import Home from "@mui/icons-material/Home";
import paths from "../../routes/paths";

type Anchor = "top" | "left" | "bottom" | "right";

export type AnchorDrawerProps = {
  anchor: Anchor;
  open: boolean;
  handleDrawerClose: () => void;
};

export const DrawerWidth = 240;

export const MenuItems = [
  {
    name: "Главная страница",
    icon: Home,
    link: paths.HOME,
  },
];
