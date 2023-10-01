import { type App, type BrowserWindow } from 'electron';

import { Logger } from '../common';
import { PrismaDB } from './PrismaDB.service';

export class Prod {
  private win: BrowserWindow;
  private app: App;
  private log: Logger;
  constructor(win: BrowserWindow, app: App) {
    this.app = app;
    this.win = win;
    this.log = new Logger('prod');
  }
  /**
   * Run dependents for production application.
   */
  public listener = async (url: string = 'app:// ./index.html'): Promise<void> => {
    if (!this.win) this.log.error('Window not found!');
    try {
      if (this.win) {
        await this.win.loadURL(url);

        const db = new PrismaDB(this.app);
        await db.copyFileSync();
        // await db.migrate('20230918124658_delete_msg');
        this.log.logs.info('Started the production app!');
      }
    } catch (error) {
      this.log.error(error as Error);
      throw error;
    }
  };

  get getApp(): App {
    return this.app;
  }
}
