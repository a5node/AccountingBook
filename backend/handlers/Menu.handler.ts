import { BrowserWindow, IpcMainInvokeEvent, ipcMain, shell } from 'electron';

import { EventMenuChannels } from '../types';

//https://www.electronjs.org/ru/docs/latest/api/browser-window
export class MenuHandler {
  private win: BrowserWindow;

  constructor(win: BrowserWindow) {
    this.win = win;
  }

  public listener = (): this => {
    if (!this.win) console.error('Window not found!');
    if (this.win) {
      this.windowMinimize();
      this.windowMaximize();
      this.windowToggleMaximize();
      this.windowFixed();
      this.windowClose();
      this.webUndo();
      this.webCut();
      this.webCopy();
      this.webPaste();
      this.webDelete();
      this.webSelectAll();
      this.webReload();
      this.webForceReload();
      this.webToggleDevtools();
      this.webActualSize();
      this.webZoomIn();
      this.webZoomOut();
      this.webToggleFullscreen();
      this.webUpdateTitle();
      this.openUrl();
      this.webRedo();
    }
    return this;
  };

  private windowMinimize = (): this => {
    ipcMain.handle(EventMenuChannels.WindowMinimize, (): void => {
      this.win.minimize();
    });
    return this;
  };

  private windowMaximize = (): this => {
    ipcMain.handle(EventMenuChannels.WindowMaximize, () => {
      this.win.maximize();
    });
    return this;
  };

  private windowToggleMaximize = (): this => {
    ipcMain.handle(EventMenuChannels.WindowToggleMaximize, (): void => {
      if (this.win.isMaximized()) this.win.unmaximize();
      else this.win.maximize();
    });

    return this;
  };

  private windowClose = (): this => {
    ipcMain.handle(EventMenuChannels.WindowClose, (): void => {
      this.win.close();
    });
    return this;
  };

  private webUndo = (): this => {
    ipcMain.handle(EventMenuChannels.WebUndo, (): void => {
      this.win.webContents.undo();
    });
    return this;
  };
  private webRedo = (): this => {
    ipcMain.handle(EventMenuChannels.WebRedo, (): void => {
      this.win.webContents.redo();
    });
    return this;
  };
  private webCut = (): this => {
    ipcMain.handle(EventMenuChannels.WebCut, (): void => {
      this.win.webContents.cut();
    });
    return this;
  };
  private webCopy = (): this => {
    ipcMain.handle(EventMenuChannels.WebCopy, (): void => {
      this.win.webContents.copy();
    });
    return this;
  };
  private webPaste = (): this => {
    ipcMain.handle(EventMenuChannels.WebPaste, (): void => {
      this.win.webContents.paste();
    });
    return this;
  };
  private webDelete = (): this => {
    ipcMain.handle(EventMenuChannels.WebDelete, (): void => {
      this.win.webContents.delete();
    });
    return this;
  };
  private webSelectAll = (): this => {
    ipcMain.handle(EventMenuChannels.WebSelectAll, (): void => {
      this.win.webContents.selectAll();
    });
    return this;
  };

  private webReload = (): this => {
    ipcMain.handle(EventMenuChannels.WebReload, (): void => {
      this.win.webContents.reload();
    });
    return this;
  };

  private webForceReload = (): this => {
    ipcMain.handle(EventMenuChannels.WebForceReload, (): void => {
      this.win.webContents.reloadIgnoringCache();
    });
    return this;
  };

  private webToggleDevtools = (): this => {
    ipcMain.handle(EventMenuChannels.WebToggleDevtools, (): void => {
      this.win.webContents.toggleDevTools();
    });
    return this;
  };

  private webActualSize = (): this => {
    ipcMain.handle(EventMenuChannels.WebActualSize, (): void => {
      this.win.webContents.setZoomLevel(0);
    });
    return this;
  };

  private webZoomIn = (): this => {
    ipcMain.handle(EventMenuChannels.WebZoomIn, (): void => {
      this.win.webContents.setZoomLevel(this.win.webContents.zoomLevel + 0.2);
    });
    return this;
  };

  private webZoomOut = (): this => {
    ipcMain.handle(EventMenuChannels.WebZoomOut, (): void => {
      this.win.webContents.setZoomLevel(this.win.webContents.zoomLevel - 0.2);
    });
    return this;
  };
  private webToggleFullscreen = (): this => {
    ipcMain.handle(EventMenuChannels.WebToggleFullscreen, (): void => {
      this.win.setFullScreen(!this.win.fullScreen);
    });
    return this;
  };

  private webUpdateTitle = (): this => {
    ipcMain.handle(EventMenuChannels.UpdateTitle, (_e, arg: string): void => {
      this.win.setTitle(`Electron App: ${arg}`);
    });
    return this;
  };

  private windowFixed = (): this => {
    ipcMain.handle(EventMenuChannels.WindowFixed, (): void => {
      const onTop = this.win.isAlwaysOnTop();
      this.win.setAlwaysOnTop(!onTop, 'status');
    });
    return this;
  };

  private openUrl = (): this => {
    ipcMain.handle(EventMenuChannels.OpenUrl, async (e: IpcMainInvokeEvent, url: string): Promise<void> => {
      e.preventDefault();
      await shell.openExternal(url);
    });
    return this;
  };
}
