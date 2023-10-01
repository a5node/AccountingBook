import fs from 'node:fs';
import path from 'node:path';
import { fork } from 'child_process';

import { App } from 'electron';
import isDev from 'electron-is-dev';
import { PrismaClient } from '@prisma/client';

import { Logger, Path, Files } from '../common';

interface Migration {
  id: string;
  checksum: string;
  migration_name: string;
  finished_at: Date;
  started_at: Date;
  applied_steps_count: bigint;
}

export class PrismaDB {
  protected db: PrismaClient | null = null;
  protected dbPath: string;
  protected app: App;
  private log: Logger;
  public readonly servicePath: Path = new Path();

  constructor(app: App) {
    this.app = app;
    this.log = new Logger('database');

    void this.connect();
  }

  private connect = async (): Promise<void> => {
    try {
      this.getPath();
      this.db = new PrismaClient({
        datasources: {
          db: { url: `file:${this.dbPath}` },
        },
      });
      this.log.message('Database connected!', 'green', '', 'cyan');
    } catch (error) {
      const err = error as Error;
      this.log.error(err);
    }
  };

  extends = (): void => {
    if (!this.db) return;
    this.db.$extends({});
  };

  /** database file does not exist, need to create */
  public copyFileSync = async (): Promise<void> => {
    if (!isDev) {
      const exist = fs.existsSync(this.dbPath);
      if (exist) return;
      const copyPath = this.servicePath.getPath('dbCopy', 'resources');
      try {
        fs.copyFileSync(copyPath, this.dbPath, fs.constants.COPYFILE_EXCL);
        this.log.logs.log('New database file created');
      } catch (err) {
        if (err instanceof Error) {
          this.log.error(`Failed creating sqlite file.`);
        } else this.log.error('Database file detected');
      }
    }
  };

  private getPath = (): void => {
    this.dbPath = isDev ? path.join('./dev.db') : path.join(this.app.getPath('userData'), 'databases', 'main.db');
    this.servicePath.setPath(this.dbPath, 'db', 'userDir');
    this.servicePath.setPath(`file:${this.dbPath}`, 'db', 'fileDir');
    this.servicePath.resources('dbSchema', 'node_modules', '.prisma', 'client', 'schema.prisma');
    this.servicePath.resources('dbCopy', 'prisma', 'dev.db');
    this.servicePath.resources('envFile', '..', '.env');
    this.servicePath.asar('dbPrisma', 'node_modules', 'prisma', 'build', 'index.js');
    return;
  };

  /** Get latest the migration version */
  public getLastMigration = async (): Promise<null | string> => {
    if (!this.db) return null;
    try {
      const latest: Migration[] = await this.db.$queryRaw`select * from _prisma_migrations order by finished_at`;
      await this.db.$disconnect();
      const last = latest[latest.length - 1]?.migration_name;
      this.log.logs.log('Last version of migration:', last);
      return last;
    } catch (error) {
      this.log.error('Error with database. When got the latest version of the migration.');
      return null;
    }
  };

  public command = async (command: string[], env?: Record<string, string>): Promise<boolean> => {
    const controller = new AbortController();
    const { signal } = controller;
    const prismaPath: string = this.servicePath.getPath('dbPrisma', 'asar');
    try {
      const exitCode = await new Promise(res => {
        const child = fork(prismaPath, command, { signal, env: { ...process.env, ...env }, stdio: 'pipe' });
        child.stdout?.on('data', data => this.log.logs.log(`command:${data.toString()}`));
        child.stderr?.on('data', data => this.log.logs.error(`command:${data.toString()}`));
        child.on('error', err => this.log.error(`command:${JSON.stringify(err)}`));
        child.on('close', code => res(code));
      });
      controller.abort();
      if (exitCode !== 0) throw Error(`command ${JSON.stringify(command)} failed with exit code ${String(exitCode)}`);
      return true;
    } catch (e) {
      this.log.error(JSON.stringify(e));
      return false;
    }
  };

  // TODO: caught a problem with the migration
  public migrate = async (version: string): Promise<boolean> => {
    if (isDev) return true;
    const lastVersionMigrate = await this.getLastMigration();
    if (!lastVersionMigrate) return true;
    if (version === lastVersionMigrate.substring(15, lastVersionMigrate.length)) return true;

    const schemaPath: string = this.servicePath.getPath('dbSchema', 'resources');
    const databasePath: string = this.servicePath.getPath('db', 'fileDir');
    const envPath: string = this.servicePath.getPath('envFile', 'resources');
    const command = ['migrate', 'deploy', '--schema', schemaPath];

    const existFile = Files.exist(envPath);
    if (!existFile) Files.createFile(envPath);
    else await Files.writeFile(envPath, `DATABASE_URL="${databasePath}"`);

    const state = await this.command(command, { DATABASE_URL: databasePath });

    await Files.removeFile(envPath);
    return state;
  };
}
