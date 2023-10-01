import path from 'node:path';
import { app } from 'electron';

import { NamesPath, FromAndTo } from './path.interface';

export class Path {
  private static instance: Path;
  public resolvePath: Map<string, string> = new Map();
  public userDirPath: Map<string, string> = new Map();
  public resourcesPath: Map<string, string> = new Map();
  public asarPath: Map<string, string> = new Map();
  public asarPathUnpacked: Map<string, string> = new Map();
  public appDirPath: Map<string, string> = new Map();
  public fileDirPath: Map<string, string> = new Map();

  constructor() {
    if (Path.instance instanceof Path) return Path.instance;
    Path.instance = this;
    return this;
  }

  public static getInstance(): Path {
    if (!Path.instance) Path.instance = new Path();
    return Path.instance;
  }

  /*** It's folder `file:./<name file/folder>` in app.*/
  public fileDir = (name: NamesPath, ...url: string[]): this => {
    const dirPath = path.join(...url);
    this.fileDirPath.set(name, `file:${dirPath}`);
    return this;
  };

  /*** It's folder `C:\\Users\\<user name>\\AppData\\Roaming\\Electron (development)\\<name file/folder>` in app */
  public userDir = (name: NamesPath, appName: Parameters<typeof app.getPath>[0], ...url: string[]): this => {
    const appPath = app.getPath(appName);
    this.userDirPath.set(name, path.join(appPath, ...url));
    return this;
  };

  /*** It's folder `./resources/<name file/folder>` in app.*/
  public appDir = (name: NamesPath, ...url: string[]): this => {
    const appPath = app.getAppPath().replace('app.asar', '');
    const dirPath = path.join(appPath, ...url);
    this.appDirPath.set(name, dirPath);
    return this;
  };

  /*** It's folder `./resources/app.asar.unpacked/<name file/folder>` in app.*/
  public appDirUnpacked = (name: NamesPath, ...url: string[]): this => {
    const appPath = app.getAppPath().replace('app.asar', 'app.asar.unpacked');
    const dirPath = path.join(appPath, ...url);
    this.asarPathUnpacked.set(name, dirPath);
    return this;
  };

  /*** It's folder `./resources/app.asar/<name file/folder>` in app.*/
  public asar = (name: NamesPath, ...url: string[]): this => {
    const appPath = app.getAppPath();
    const asarPath = path.join(appPath, ...url);
    this.asarPath.set(name, asarPath);
    return this;
  };

  /*** It's folder `./resources/<name file/folder>` in app.
   ** or `G:\\<smth path>\\ABook\\node_modules\\electron\\dist\\resources\\<name file/folder>`
   ** Path when `prod`
   */
  public resources = (name: NamesPath, ...url: string[]): this => {
    this.resourcesPath.set(name, path.join(process.resourcesPath, ...url));
    return this;
  };

  /*** It's folder `G:\\<smth path>\\ABook\\<name file/folder>` in app.
   ** Path when `dev`
   */
  public resolve = (name: NamesPath, ...url: string[]): this => {
    this.resolvePath.set(name, path.resolve(...url));
    return this;
  };

  public platformName = (): NodeJS.Platform | 'darwinArm64' => {
    const isDarwin = process.platform === 'darwin';
    if (isDarwin && process.arch === 'arm64') {
      return (process.platform + 'Arm64') as 'darwinArm64';
    }
    return process.platform;
  };

  public setPath = (url: string, name: NamesPath, to: FromAndTo): this => {
    switch (to) {
      case 'userDir': {
        this.userDirPath.set(name, url);
        return this;
      }
      case 'appDir': {
        this.appDirPath.set(name, url);
        return this;
      }
      case 'asar': {
        this.asarPath.set(name, url);
        return this;
      }
      case 'appDirUnpacked': {
        this.asarPathUnpacked.set(name, url);
        return this;
      }
      case 'fileDir': {
        this.fileDirPath.set(name, url);
        return this;
      }
      case 'resources': {
        this.resourcesPath.set(name, url);
        return this;
      }
      case 'resolve': {
        this.resolvePath.set(name, url);
        return this;
      }
      default:
        return this;
    }
  };

  public getPath = (name: NamesPath, from: FromAndTo): string => {
    switch (from) {
      case 'userDir': {
        return this.userDirPath.get(name) || '';
      }
      case 'appDir': {
        return this.appDirPath.get(name) || '';
      }
      case 'appDirUnpacked': {
        return this.asarPathUnpacked.get(name) || '';
      }
      case 'fileDir': {
        return this.fileDirPath.get(name) || '';
      }
      case 'asar': {
        return this.asarPath.get(name) || '';
      }
      case 'resources': {
        return this.resourcesPath.get(name) || '';
      }
      case 'resolve': {
        return this.resolvePath.get(name) || '';
      }
      default:
        return '';
    }
  };
}
