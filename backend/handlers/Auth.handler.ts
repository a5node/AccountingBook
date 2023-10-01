import { App, BrowserWindow } from 'electron';
import { PrismaError } from 'prisma-error-enum';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelAuth } from '../types';

import { CreateAdminCommand } from '../../contracts/commands';
import { GetUserByEmailQuery, SignInQuery } from '../../contracts/queries';
import { PasswordUtil, JwtUtil } from '../helpers';

export class AuthHandler extends HandlerBase<ChannelAuth> {
  private win: BrowserWindow;
  private user: Prisma.UserDelegate;
  private userRoles: Prisma.UserRolesDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'auth_handler');
    this.win = win;
    if (this.db) this.user = this.db.user;
    if (this.db) this.userRoles = this.db.userRoles;
  }

  public override listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.user) return this.logger.error('The user database not found!');
    // list handlers
    this.handler<CreateAdminCommand.Request, CreateAdminCommand.Response | null>(
      CreateAdminCommand.channel,
      this.create,
    );
    this.handler<GetUserByEmailQuery.Request, GetUserByEmailQuery.Response | null>(
      GetUserByEmailQuery.channel,
      this.getUserByEmail,
    );
    this.handler<SignInQuery.Request, SignInQuery.Response | null>(SignInQuery.channel, this.signin);
    this.handler<undefined, boolean>('is_admin', this.isAdmin);
    //logger
    this.logger.message('Started auth listeners.', 'green', '', 'yellow');
  };

  create = async (data: CreateAdminCommand.Request): Promise<CreateAdminCommand.Response | null> => {
    try {
      const passU = new PasswordUtil();
      if (data.password) data.password = await passU.hash({ password: data.password });

      const user = await this.user.create({
        data: CreateAdminCommand.data(data),
        select: CreateAdminCommand.select,
      });

      return CreateAdminCommand.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        e.meta = { ...e.meta, data };
        if (e.code === PrismaError.UniqueConstraintViolation) e.message = `User cannot be created`;
      }
      throw e;
    }
  };

  signin = async (data: SignInQuery.Request): Promise<SignInQuery.Response | null> => {
    try {
      const passU = new PasswordUtil();
      const user = await this.user.findUnique({
        where: SignInQuery.where(data),
        include: SignInQuery.include,
      });

      if (!user) return null;
      if (!user.password) return null;

      const chackPass = await passU.compare({ password: data.password, hashed: user.password });

      if (!chackPass?.pass) return null;

      const refreshToken: string = await JwtUtil.signJWT(user, chackPass.salt);
      const accessToken: string = await JwtUtil.signJWT(user, chackPass.salt, '1h');

      return SignInQuery.filter({ ...user, refreshToken, accessToken });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        e.meta = { ...e.meta, data };
        if (e.code === PrismaError.UniqueConstraintViolation) e.message = `User not found!`;
      }
      throw e;
    }
  };

  getUserByEmail = async ({ email }: GetUserByEmailQuery.Request): Promise<GetUserByEmailQuery.Response | null> => {
    try {
      const user = await this.user.findUnique({
        where: { email },
        include: GetUserByEmailQuery.include,
      });

      return GetUserByEmailQuery.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        e.meta = { ...e.meta, data: { email } };
      }
      throw e;
    }
  };

  isAdmin = async (): Promise<boolean> => {
    try {
      const user = await this.userRoles.findFirst({
        where: { role: { role: 'ADMIN' } },
      });

      return user !== null ? true : false;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        e.meta = { ...e.meta, data: { role: 'ADMIN' } };
      }
      throw e;
    }
  };
}
