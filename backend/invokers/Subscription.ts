import { IpcRendererEvent, ipcRenderer } from 'electron';

const validChannels = ['toMain', 'ipcRenderChannel'];

export class Subscription {
  send(channel: string, args: unknown[]): void {
    if (validChannels.includes(channel)) ipcRenderer.send(channel, args);
  }

  on(channel: string, callback: (...args: unknown[]) => void): () => void {
    const subscription = (event: IpcRendererEvent, ...args: unknown[]): void => callback(event, ...args);
    if (validChannels.includes(channel)) ipcRenderer.on(channel, subscription);

    return (): void => {
      ipcRenderer.removeListener(channel, subscription);
    };
  }
  once(channel: string, callback: (...args: unknown[]) => void): void {
    const subscription = (event: IpcRendererEvent, ...args: unknown[]): void => callback(event, ...args);
    if (validChannels.includes(channel)) ipcRenderer.once(channel, subscription);
    return;
  }
  removeListener(channel: string, callback: (...args: unknown[]) => void): void {
    if (validChannels.includes(channel)) ipcRenderer.removeListener(channel, callback);
  }
  removeAllListeners(channel: string): void {
    if (validChannels.includes(channel)) ipcRenderer.removeAllListeners(channel);
  }
}
