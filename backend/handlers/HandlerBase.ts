import { App, IpcMainInvokeEvent, ipcMain } from 'electron';
import { Prisma } from '@prisma/client';
import { PrismaError } from 'prisma-error-enum';

import { PrismaDB } from '../services';
import { ErrorEx, Logger } from '../common';
import { ReqError } from '../types';

export class HandlerBase<Channels extends string> extends PrismaDB {
  protected handle: Electron.IpcMain['handle'];
  protected logger: Logger;

  constructor(app: App, label?: string) {
    super(app);
    this.logger = new Logger(label || 'handler');
    this.handle = ipcMain.handle;
  }

  protected handler = <REQ, RES>(channel: Channels, fn: (data: REQ) => Promise<RES> | RES): void => {
    this.handle(channel, async (e: IpcMainInvokeEvent, data: REQ): Promise<RES | ReqError> => {
      e.preventDefault();
      try {
        this.logger.info(`${channel}: ${JSON.stringify(data)}`);
        return await fn(data);
      } catch (e) {
        let err: ErrorEx = new ErrorEx({});
        if (e instanceof ErrorEx) err = e;
        if (e instanceof Error) err = new ErrorEx({ message: e.message });
        if (e instanceof Prisma.PrismaClientKnownRequestError) err = new ErrorEx(e);
        if (e instanceof Prisma.PrismaClientUnknownRequestError) err = new ErrorEx(e);
        if (e instanceof Prisma.PrismaClientValidationError) {
          err = new ErrorEx({
            ...e,
            message: e.message.slice(e.message.indexOf('Argument'), e.message.length),
            code: PrismaError.InvalidValueForFieldType,
          });
        }
        if (e instanceof Prisma.PrismaClientInitializationError) err = new ErrorEx(e);
        if (e instanceof Prisma.PrismaClientRustPanicError) err = new ErrorEx(e);
        this.logger.error(`${channel}: ${err.message}`);
        return err.req();
      }
    });
  };

  listener = (): void => {
    return;
  };
}
