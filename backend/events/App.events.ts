import { BrowserWindow, type App, session } from 'electron';
import { AppUpdaterService } from '../services';

export class EventApp {
  private app: App;
  private win: BrowserWindow;
  private initWindow: () => Promise<BrowserWindow>;

  constructor(app: App) {
    this.app = app;
  }

  public listener = (): this => {
    if (!this.app) console.error('App not found!');
    if (this.app) {
      this.windowAllClosed();
    }
    return this;
  };

  public ready = (initWindow: () => Promise<BrowserWindow>): this => {
    this.app.on('ready', async (): Promise<void> => {
      if (!initWindow) return console.error('initWindow not found!');
      // if (!isDev) this.adjustRenderer(__dirname);

      new AppUpdaterService();
      this.initWindow = initWindow;
      const win = await initWindow();
      if (win) this.win = win;

      this.activate(win, initWindow);
      this.secondInstance(win, initWindow);
      this.appSession();
    });

    return this;
  };

  private windowAllClosed = (): void => {
    this.app.on('window-all-closed', (): void => {
      if (process.platform !== 'darwin') this.app.quit();
    });
  };

  private secondInstance = (win: BrowserWindow, initWindow: () => Promise<BrowserWindow>): void => {
    this.app.on('second-instance', async (): Promise<void> => {
      if (win === null) {
        if (BrowserWindow.getAllWindows().length === 0) {
          if (initWindow) await initWindow();
        }
      }
    });
  };

  private activate = (win: BrowserWindow, initWindow: () => Promise<BrowserWindow>): void => {
    this.app.on('activate', async (): Promise<void> => {
      if (BrowserWindow.getAllWindows().length === 0) {
        if (initWindow) await initWindow();
      }
      if (win === null) {
        if (initWindow) await initWindow();
      }
    });
  };

  appSession = (): void => {
    const origin = 'abook.com';
    session.defaultSession.webRequest.onBeforeSendHeaders(
      (details: Electron.OnBeforeSendHeadersListenerDetails, callback): void => {
        callback({
          cancel: false,
          requestHeaders: {
            ...details.requestHeaders,
            Origin: origin,
            // 'Content-Security-Policy': ["default-src 'none'"],
            'Content-Security-Policy': ["script-src 'self'"],
          },
        });
      },
    );
    session.defaultSession.webRequest.onHeadersReceived(
      (
        details: Electron.OnHeadersReceivedListenerDetails,
        callback: (headersReceivedResponse: Electron.HeadersReceivedResponse) => void,
      ): void => {
        callback({
          cancel: false,
          responseHeaders: {
            ...details.responseHeaders,
            'Access-Control-Allow-Origin': origin,
          },
        });
      },
    );
  };
}
