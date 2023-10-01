import Electron, { screen, BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import Store from 'electron-store';

export const createWindow = (windowName: string, options: BrowserWindowConstructorOptions): BrowserWindow => {
  const key = 'window-state';
  const name = `window-state-${windowName}`;

  const store = new Store<Electron.Rectangle>({ name });

  const defaultSize: Electron.Rectangle = {
    width: options.width || 800,
    height: options.height || 600,
    x: 0,
    y: 0,
  };

  let state = {};
  let win: BrowserWindow | null = null;

  const restore = (): Electron.Rectangle => store.get(key, defaultSize);

  const getCurrentPosition = (): undefined | { x: number; y: number; width: number; height: number } => {
    if (win) {
      const position = win.getPosition();
      const size = win.getSize();
      return {
        x: position[0],
        y: position[1],
        width: size[0],
        height: size[1],
      };
    }
    return;
  };

  const windowWithinBounds = (windowState: Electron.Rectangle, bounds: Electron.Rectangle) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    );
  };

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds;
    return Object.assign({}, defaultSize, {
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    });
  };

  const ensureVisibleOnSomeDisplay = (windowState: Electron.Rectangle) => {
    const visible = screen.getAllDisplays().some(display => {
      return windowWithinBounds(windowState, display.bounds);
    });

    if (!visible) return resetToDefaults();

    return windowState;
  };

  const saveState = () => {
    if (win && !win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition());
    }
    store.set(key, state);
  };

  state = ensureVisibleOnSomeDisplay(restore());

  const browserOptions: BrowserWindowConstructorOptions = {
    ...options,
    ...state,
    webPreferences: {
      ...options.webPreferences,
    },
  };
  win = new BrowserWindow(browserOptions);

  win.on('close', saveState);

  return win;
};
