import { FC, PropsWithChildren } from "react";
import { ContainerOwnProps } from "@mui/material";

export type RouteType = {
  path: string;
  component: FC;
  layout: FC<PropsWithChildren>;
  layoutProps?: ContainerOwnProps;
  protected?: boolean;
};
