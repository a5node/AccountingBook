import { type BrowserWindow, type App } from 'electron';

export class EventBrowserWindow {
  private win: BrowserWindow;
  private app: App;
  constructor(win: BrowserWindow, app: App) {
    this.app = app;
    this.win = win;
  }

  public listener = (): this => {
    if (!this.app) console.error('App not found!');
    if (!this.win) console.error('Window not found!');
    if (this.app && this.win) {
      this.readyToShow();
      this.close();
    }
    return this;
  };

  // Show window when its ready to
  private readyToShow = (): void => {
    this.win.on('ready-to-show', (): void => {
      if (process.env.START_MINIMIZED) this.win.minimize();
      else this.win.show();
    });
  };

  // Close all windows when main window is closed
  private close = (): void => {
    this.win.on('close', (): void => {
      this.app.quit();
    });
  };
}
