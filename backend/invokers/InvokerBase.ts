import { ipcRenderer } from 'electron';
import { ReqError } from '../types';

export class InvokerBase<Channels extends string> {
  protected invoke: Electron.IpcRenderer['invoke'];

  constructor() {
    this.invoke = ipcRenderer.invoke;
  }

  protected invoker = async <REQ, RES>(channel: Channels, args?: REQ): Promise<RES | Partial<ReqError>> => {
    try {
      const payload: RES = await this.invoke(channel, args);
      return payload;
    } catch (e) {
      if (e instanceof Error) return this.errReq(e.message, { target: [channel] });
      return e as Partial<ReqError>;
    }
  };

  private errReq = (msg: string, payload?: Partial<ReqError['payload']>): Partial<ReqError> => {
    return {
      error: 'Bad Request',
      payload: {
        message: msg,
        target: [],
        code: '400',
        codename: null,
        data: {},
        ...payload,
      },
    };
  };
}
