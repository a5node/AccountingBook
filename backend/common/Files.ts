import fs from 'node:fs';
import path from 'node:path';

export type TFineDone = (err: NodeJS.ErrnoException | null, files?: string[]) => void;
export type TPredicate = (file: string, stat: fs.Stats) => string | boolean;

export class Files {
  /*** Unlinks a file or folder.
   * Resolves with true if a deletion occurred,
   * false if no deletion occurred,
   * and rejects if there is an exception.
   * ```ts
   * const filePath = './temp.test';
   * ```
   */
  static deleteIfExists = async (path: string): Promise<boolean | NodeJS.ErrnoException> => {
    const normalizedPath: string = path.normalize(path);
    return await new Promise<boolean | NodeJS.ErrnoException>((resolve, reject): void => {
      fs.unlink(normalizedPath, (err: NodeJS.ErrnoException | null): void => {
        if (err === null) return resolve(true);
        if (err && err.code === 'ENOENT') return resolve(false);
        return reject(err);
      });
    });
  };
  /*** Links a file or folder.
   * Resolves with true if exists,
   * false if no exists,
   * and rejects if there is an exception.
   * ```ts
   * const filePath = './temp.test';
   * ```
   */
  static fileExists = async (path: string): Promise<boolean | NodeJS.ErrnoException> => {
    const normalizedPath: string = path.normalize(path);
    return await new Promise<boolean | NodeJS.ErrnoException>((resolve, reject): void => {
      fs.stat(normalizedPath, (err: NodeJS.ErrnoException | null): void => {
        if (err === null) return resolve(true);
        if (err && err.code === 'ENOENT') return resolve(false);
        return reject(err);
      });
    });
  };

  /*** Checking the existence of a file.
   * ```ts
   * const path = './temp.test';
   * Files.exist(path)
   * ```
   */
  static exist = async (path: string): Promise<boolean> => fs.existsSync(path);

  /*** By using COPYFILE_EXCL, the operation will fail if destination.txt exists.
   * ```ts
   * File.copyFileSync('source.txt', 'destination.txt', constants.COPYFILE_EXCL);
   * ```
   */
  static copyFileSync = (
    {
      from,
      to,
      mode = fs.constants.COPYFILE_EXCL,
    }: {
      /** source filename to copy */
      from: string;
      /** destination filename of the copy operation */
      to: string;
      /** modifiers for copy operation. `default 1`*/
      mode: number;
    },
    {
      isDev = true,
      fromApp = true,
      toApp = true,
    }: {
      /** Source copy file from `app`.
       ** `default true`*/
      fromApp: boolean;
      /** Destination copy file to `app`.
       ** `default true`*/
      toApp: boolean;
      /** Copy file from the `app` directory or to the `resources` directory.
       **  `default true` */
      isDev: boolean;
    },
  ): string | Error => {
    const toPath = toApp ? (isDev ? path.resolve(to) : path.join(process.resourcesPath, to)) : to;
    const fromPath = fromApp ? (isDev ? path.resolve(from) : path.join(process.resourcesPath, from)) : from;

    try {
      fs.copyFileSync(fromPath, toPath, mode);
      return toPath;
    } catch (err) {
      return Error('File is not copy.');
    }
  };

  static createFile = (path: string, data: string = ''): boolean | Error => {
    try {
      if (fs.existsSync(path)) return false;
      fs.appendFileSync(path, data, 'utf8');
      return true;
    } catch (err) {
      return Error('File is not create.');
    }
  };

  static createFolder = (path: string): boolean | Error => {
    try {
      if (fs.existsSync(path)) return false;
      fs.mkdirSync(path);
      return true;
    } catch (err) {
      return Error('File is not create.');
    }
  };

  static walk = (dir: string, existingResults: string[], predicate: TPredicate, done: TFineDone): void => {
    const results: string[] = existingResults;
    fs.readdir(dir, (err: NodeJS.ErrnoException | null, listFiles: string[]): void => {
      if (err) {
        done(err);
        return;
      }
      let pending = listFiles.length;

      if (pending === 0) {
        done(null, results);
        return;
      }

      return listFiles.forEach(file => {
        const filePath: string = path.resolve(dir, file);

        fs.stat(filePath, (_statErr: NodeJS.ErrnoException | null, stat: fs.Stats): void => {
          if (predicate(filePath, stat)) results.push(filePath);

          if (stat && stat.isDirectory()) {
            Files.walk(filePath, results, predicate, (): void => {
              pending -= 1;
              if (!pending) done(null, results);
            });
          } else {
            pending -= 1;
            if (!pending) done(null, results);
          }
        });
      });
    });
  };
  /***
 * Looking for a file or a folder.
 * ```ts
 * find(path.normalize('./src'), (file, stat) => {
      return file.match(/find.js$/) && !stat.isDirectory();
    }
 * ```
 *
 */
  static find = async (dir: string, predicate: TPredicate): Promise<NodeJS.ErrnoException | string[]> => {
    const normalizedPath: string = path.normalize(dir);
    return await new Promise((res, rej): void => {
      const done = (err: NodeJS.ErrnoException | null, files?: string[]): void => {
        if (err) return rej(err);
        if (!files) return res([]);
        return res(files.map(file => path.relative('', file)));
      };

      Files.walk(normalizedPath, [], predicate, done);
    });
  };

  static writeFile = async (path: string, data: string): Promise<NodeJS.ErrnoException | Error | string> => {
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej('fils not found  and Cannot write to file');
      fs.writeFile(path, data, err => {
        if (err) return rej(err);
        res(`Recorded to file: ${path}`);
      });
    });
  };

  static appendFile = async (path: string, data: string): Promise<NodeJS.ErrnoException | string> => {
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej(new Error('Fils not found'));
      fs.appendFile(path, data, err => {
        if (err) return rej(err);
        res(`Append to file: ${path}`);
      });
    });
  };

  static removeFile = async (path: string): Promise<NodeJS.ErrnoException | Error | string> => {
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej(new Error('Fils not found'));
      fs.rm(path, err => {
        if (err) return rej(err);
        res(`File remove: ${path}`);
      });
    });
  };

  static readFile = async (
    path: string,
    encoding: BufferEncoding = 'utf-8',
  ): Promise<NodeJS.ErrnoException | Error | string> => {
    const controller = new AbortController();
    const { signal } = controller;
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej(new Error('Fils not found.'));
      fs.readFile(path, { encoding, signal }, (err, data) => {
        if (err) {
          controller.abort();
          rej(err);
          return;
        }
        res(data);
        controller.abort();
      });
    });
  };

  static rmdir = async (path: string): Promise<NodeJS.ErrnoException | Error | string> => {
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej(new Error('Folder not found'));
      fs.rmdir(path, err => {
        if (err) return rej(err);
        res(`Folder remove: ${path}`);
      });
    });
  };

  static mkdir = async (path: string): Promise<NodeJS.ErrnoException | Error | string> => {
    return new Promise((res, rej) => {
      if (!Files.exist(path)) return rej(new Error('Folder exist'));
      fs.mkdir(path, err => {
        if (err) return rej(err);
        res(`Folder created: ${path}`);
      });
    });
  };
}
