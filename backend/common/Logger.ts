import path from 'node:path';
import { app } from 'electron';
import log, { LogFunctions } from 'electron-log';
import isDev from 'electron-is-dev';
import cleanStack from 'clean-stack';

import { Files } from './Files';

type COLOR = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | '';

export class Logger {
  protected logger: log.LogFunctions;
  private label: string;

  constructor(label: string = Logger.name) {
    this.crateFile(label.trim());
    this.logger = log.scope(label.trim() || Logger.name);
    this.label = label.trim();
  }

  private crateFile = (label: string): void => {
    log.transports.file.resolvePath = (): string => {
      let end = label.length;

      if (label.indexOf('_') !== -1) end = label.indexOf('_');
      if (label.indexOf('-') !== -1) end = label.indexOf('-');
      if (label.indexOf(' ') !== -1) end = label.indexOf(' ');

      const pathLogs = isDev
        ? path.resolve(`logs/${label.substring(0, end)}.log`)
        : path.join(app.getPath('userData'), `logs/${label.substring(0, end)}.log`);
      Files.createFile(pathLogs);

      return pathLogs;
    };
  };

  error = (args: string | Error | undefined): void => {
    if (!args) return;
    if (args instanceof Error) {
      const err = cleanStack(args.stack);
      this.logger.error(`\x1b[31m %c${err} \x1b[0m`);
      return;
    }
    this.logger.error(`\x1b[31m ${args} \x1b[0m`);
  };

  warn = (...args: string[]): void => {
    this.logger.warn(`\x1b[33m ${args.join(' ')} \x1b[0m`);
  };

  info = (...args: string[]): void => {
    if (isDev) this.logger.info(`\x1b[34m ${args.join(' ')} \x1b[0m`);
  };

  log = (...args: string[]): void => {
    if (isDev) this.logger.log(...args);
  };

  get logs(): LogFunctions {
    return this.logger;
  }

  bgColor = (color: COLOR, args: string | string[] | Record<string, unknown>): string => {
    const msg = typeof args === 'object' ? JSON.stringify(args) : Array.isArray(args) ? args.join(' ') : args;

    switch (color) {
      case 'black':
        return `\x1b[40m ${msg} \x1b[0m`;
      case 'red':
        return `\x1b[41m ${msg} \x1b[0m`;
      case 'green':
        return `\x1b[42m ${msg} \x1b[0m`;
      case 'yellow':
        return `\x1b[43m ${msg} \x1b[0m`;
      case 'blue':
        return `\x1b[44m ${msg} \x1b[0m`;
      case 'magenta':
        return `\x1b[45m ${msg} \x1b[0m`;
      case 'cyan':
        return `\x1b[46m ${msg} \x1b[0m`;
      case 'white':
        return `\x1b[47m ${msg} \x1b[0m`;
      default:
        return msg;
    }
  };

  textColor = (color: COLOR, args: string | string[] | Record<string, unknown>): string => {
    const msg = typeof args === 'object' ? JSON.stringify(args) : Array.isArray(args) ? args.join(' ') : args;
    switch (color) {
      case 'black':
        return `\x1b[30m ${msg} \x1b[0m`;
      case 'red':
        return `\x1b[31m ${msg} \x1b[0m`;
      case 'green':
        return `\x1b[32m ${msg} \x1b[0m`;
      case 'yellow':
        return `\x1b[33m ${msg} \x1b[0m`;
      case 'blue':
        return `\x1b[34m ${msg} \x1b[0m`;
      case 'magenta':
        return `\x1b[35m ${msg} \x1b[0m`;
      case 'cyan':
        return `\x1b[36m ${msg} \x1b[0m`;
      case 'white':
        return `\x1b[37m ${msg} \x1b[0m`;

      default:
        return msg;
    }
  };

  public message = (msg: string, tx?: COLOR, bg?: COLOR, lab?: COLOR): this => {
    if (!isDev) return this;

    if (tx) msg = this.textColor(tx, msg);
    if (bg) msg = this.bgColor(bg, msg);

    let label = this.label;
    if (lab) label = this.textColor(lab, label);

    console.log(`[${label}]:`, msg);
    return this;
  };
}
