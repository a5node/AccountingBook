import installer, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import isDev from 'electron-is-dev';

export const installExtensions = async (): Promise<boolean> => {
  try {
    if (isDev) await installer([REDUX_DEVTOOLS]);
    return true;
  } catch (error) {
    return false;
  }
};
