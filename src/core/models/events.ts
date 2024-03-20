export interface IEventList {
  _id: string;
  title: string;
  iconName: string;
  items: any[];
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
}
