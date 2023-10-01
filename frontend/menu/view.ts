import { IMenu } from './menu.interface';

export const view: IMenu = {
  name: 'View',
  items: [
    {
      name: 'Reload',
      action: 'reload',
      shortcut: 'Ctrl+R',
    },
    {
      name: 'Force Reload',
      action: 'force_reload',
      shortcut: 'Ctrl+Shift+R',
    },
    {
      name: 'Toogle Developer Tools',
      action: 'toggle_devtools',
      shortcut: 'Ctrl+Shift+I',
    },
    {
      name: '__',
    },
    {
      name: 'Actual Size',
      action: 'actual_size',
      shortcut: 'Ctrl+0',
    },
    {
      name: 'Zoom In',
      action: 'zoom_in',
      shortcut: 'Ctrl +',
    },
    {
      name: 'Zoom Out',
      action: 'zoom_out',
      shortcut: 'Ctrl -',
    },
  ],
};
