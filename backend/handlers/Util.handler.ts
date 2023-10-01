import { BrowserWindow, App } from 'electron';

import { HandlerBase } from './HandlerBase';
import { IHashData, PasswordUtil } from '../helpers';
import { ChannelUtil, ConstantUtil } from '../types';

export class UtilHandler extends HandlerBase<ChannelUtil> {
  private win: BrowserWindow;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'util_handler');
    this.win = win;
    this.db = null;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');

    this.handler<undefined, string>(ConstantUtil.GENERATE_TOKEN, this.generateToken);

    this.logger.message('Started utils listeners.', 'green', '', 'yellow');
  };

  public generateToken = (): string => {
    const util = new PasswordUtil();
    return util.generateToken();
  };

  public generateBytes = (size: number): string => {
    return PasswordUtil.randomBytes(size);
  };
  public generateKey = (size: number): string => {
    return PasswordUtil.createKey(size);
  };

  public hashData = async (data: IHashData): Promise<string> => {
    const util = new PasswordUtil();
    return util.hashData(data);
  };
}
