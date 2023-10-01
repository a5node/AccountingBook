import { type App, type BrowserWindow } from 'electron';

import { installExtensions } from '../helpers';
import { Logger } from '../common';

export class Dev {
  private win: BrowserWindow;
  private app: App;
  private log: Logger;
  constructor(win: BrowserWindow, app: App) {
    this.app = app;
    this.win = win;
    this.log = new Logger('dev');
  }
  /**
   * Run dependents for development application.
   */
  public listener = async (url: string = `http://localhost:3000`): Promise<this> => {
    try {
      if (!this.win) this.log.error('Window not found!');
      if (this.win) {
        await installExtensions();
        await this.win.loadURL(url);
        this.log.info('Started the development app.');
      }
      return this;
    } catch (error) {
      this.log.error(error as Error);
      return this;
    }
  };
}
