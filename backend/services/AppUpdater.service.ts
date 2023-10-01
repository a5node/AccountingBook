import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export class AppUpdaterService {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    void this.init();
  }

  init = async (): Promise<void> => {
    await autoUpdater.checkForUpdatesAndNotify();
  };
}
