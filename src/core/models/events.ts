import { UserType } from "../slices/auth/types";

export interface IEventListItem {
  _id: string;
  title: string;
  checked: boolean;
  assignees: UserType[];
}

export interface IEventList {
  _id: string;
  title: string;
  iconName: string;
  items: IEventListItem[];
  completed: number;
  updatedAt: string;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  attendees: any[];
  completed: boolean;
  lists: IEventList[];
  user: UserType;
}
