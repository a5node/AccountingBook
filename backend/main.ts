import { resolve } from 'node:path';
import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

import { createWindow } from './helpers';
import { Dev, ListenerService, Prod, ServerPage } from './services';
import { EventApp } from './events';

new ServerPage(app).listener();

/*** Entry for Electron */
const init = async (): Promise<BrowserWindow> => {
  await app.whenReady();

  const mainWindow: BrowserWindow = createWindow('main', {
    width: 1000,
    height: 600,
    minHeight: 600,
    minWidth: 1000,
    // frame: isDev,
    title: 'ABook',
    icon: resolve('resources/icon.ico'),
    webPreferences: {
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      preload: resolve(__dirname, 'preload.js'),
    },
  });

  try {
    if (isDev) {
      const dev = new Dev(mainWindow, app);
      await dev.listener();
    } else {
      const prod = new Prod(mainWindow, app);
      await prod.listener();
    }

    mainWindow.on('closed', () => {
      mainWindow.destroy();
      process.exit(1);
    });

    new ListenerService(mainWindow, app).listener();
  } catch (error) {
    mainWindow.on('closed', () => {
      mainWindow.destroy();
      process.exit(1);
    });
  }

  return mainWindow;
};

new EventApp(app).ready(init).listener();
