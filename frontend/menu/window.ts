import { IMenu } from './menu.interface';

export const window: IMenu = {
  name: 'Window',
  items: [
    {
      name: 'Minimize',
      action: 'minimize',
      shortcut: 'Ctrl+M',
    },
    {
      name: 'Close',
      action: 'exit',
      shortcut: 'Ctrl+W',
    },
    {
      name: 'Fixed window',
      action: 'fixed_window',
      shortcut: 'Ctrl+Q',
    },
  ],
};
