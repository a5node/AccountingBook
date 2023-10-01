export type IMenuItem = {
  name: string;
  action?: string;
  shortcut?: string;
  value?: string | number;
  items?: IMenuItem[];
};

export type IMenu = {
  name: string;
  items: IMenuItem[];
};
