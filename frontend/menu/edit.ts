import { IMenu } from './menu.interface';

export const edit: IMenu = {
  name: 'Edit',
  items: [
    {
      name: 'Undo',
      action: 'undo',
      shortcut: 'Ctrl+Z',
    },
    {
      name: 'Redo',
      action: 'redo',
      shortcut: 'Ctrl+Y',
    },
    {
      name: '__',
    },
    {
      name: 'Cut',
      action: 'cut',
      shortcut: 'Ctrl+X',
    },
    {
      name: 'Copy',
      action: 'copy',
      shortcut: 'Ctrl+C',
    },
    {
      name: 'Paste',
      action: 'paste',
      shortcut: 'Ctrl+V',
    },
    {
      name: 'Delete',
      action: 'delete',
    },
    {
      name: '__',
    },
    {
      name: 'Select All',
      action: 'select_all',
      shortcut: 'Ctrl+A',
    },
  ],
};
