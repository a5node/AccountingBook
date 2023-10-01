import { App } from 'electron';
import serve from 'electron-serve';
import isDev from 'electron-is-dev';
/*** Making a page web app.
 ** Important : Should be called before app is `ready` or `app.whenReady`.
 */
export class ServerPage {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  public listener = (): this => {
    if (!this.app) console.error('App not found!');

    if (!isDev) {
      if (this.app.isReady()) throw Error('ServerPage: Should be called before app is ready!!!');

      serve({ directory: __dirname });
    } else {
      if (this.app) {
        this.app.setPath('userData', `${this.app.getPath('userData')} (development)`);
      }
    }
    return this;
  };
}
