import paths from "../../routes/paths";
import { NavPages } from "./models";

export const pages: NavPages[] = [
  { name: "Организация", path: paths.HOME, selected: true },
  { name: "Участие", path: paths.HOME, selected: false },
];
