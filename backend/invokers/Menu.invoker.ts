import { ipcRenderer } from 'electron';
import cleanStack from 'clean-stack';

import { EventMenuChannels } from '../types';

export class MenuInvoker {
  invoke = async (channel: EventMenuChannels, args?: string): Promise<boolean> => {
    try {
      await ipcRenderer.invoke(channel, args);
      return true;
    } catch (error) {
      if (error instanceof Error) console.error(cleanStack(error.stack, { pretty: true }));
      return false;
    }
  };

  exit = async (): Promise<boolean> => this.invoke(EventMenuChannels.WindowClose);
  fixed = async (): Promise<boolean> => this.invoke(EventMenuChannels.WindowFixed);
  minimize = async (): Promise<boolean> => this.invoke(EventMenuChannels.WindowMinimize);
  maximize = async (): Promise<boolean> => this.invoke(EventMenuChannels.WindowMaximize);
  toggleMaximize = async (): Promise<boolean> => this.invoke(EventMenuChannels.WindowToggleMaximize);
  undo = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebUndo);
  redo = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebRedo);
  cut = (): Promise<boolean> => this.invoke(EventMenuChannels.WebCut);
  copy = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebCopy);
  paste = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebPaste);
  delete = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebDelete);
  selectAll = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebSelectAll);
  reload = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebReload);
  forceReload = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebForceReload);
  actualSize = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebActualSize);
  zoomIn = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebZoomIn);
  zoomOut = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebZoomOut);
  toggleDevtools = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebToggleDevtools);
  toggleFullscreen = async (): Promise<boolean> => this.invoke(EventMenuChannels.WebToggleFullscreen);
  updateTitle = async (arg: string): Promise<boolean> => this.invoke(EventMenuChannels.UpdateTitle, arg);
  openUrl = async (arg: string): Promise<boolean> => this.invoke(EventMenuChannels.OpenUrl, arg);
}
