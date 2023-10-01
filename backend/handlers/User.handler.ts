import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelUser } from '../types';

import { FindUserQuery, FindUsersQuery, GetUserByIdQuery } from '../../contracts/queries';
import { DeleteUserCommand, UpdateUserCommand, AddUserCommand } from '../../contracts/commands';

export class UserHandler extends HandlerBase<ChannelUser> {
  private win: BrowserWindow;
  private user: Prisma.UserDelegate;
  private linksProfile: Prisma.LickProfileDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_handler');
    this.win = win;
    if (this.db) this.user = this.db.user;
    if (this.db) this.linksProfile = this.db.lickProfile;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.user) return this.logger.error('The user database not found!');
    // list handlers
    this.handler<FindUserQuery.Request, FindUserQuery.Response | null>(FindUserQuery.channel, this.find);
    this.handler<FindUsersQuery.Request, FindUsersQuery.Response[] | null>(FindUsersQuery.channel, this.findUsers);
    this.handler<AddUserCommand.Request, AddUserCommand.Response | null>(AddUserCommand.channel, this.addUser);
    this.handler<UpdateUserCommand.Request, UpdateUserCommand.Response | null>(UpdateUserCommand.channel, this.update);
    this.handler<DeleteUserCommand.Request, DeleteUserCommand.Response | null>(DeleteUserCommand.channel, this.delete);
    this.handler<GetUserByIdQuery.Request, GetUserByIdQuery.Response | null>(
      GetUserByIdQuery.channel,
      this.getUserById,
    );
    //logger
    this.logger.message('Started user listeners.', 'green', '', 'yellow');
  };

  find = async (where: FindUserQuery.Request): Promise<FindUserQuery.Response | null> => {
    try {
      const user = await this.user.findUnique({
        where,
        include: FindUserQuery.include,
      });
      return FindUserQuery.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  findUsers = async (where: FindUsersQuery.Request): Promise<FindUsersQuery.Response[] | null> => {
    try {
      const user = await this.user.findMany({
        where,
        include: FindUsersQuery.include,
      });
      return FindUsersQuery.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  getUserById = async (data: GetUserByIdQuery.Request): Promise<GetUserByIdQuery.Response | null> => {
    try {
      const user = await this.user.findUnique({
        where: { id: data.id },
        include: GetUserByIdQuery.include,
      });

      return GetUserByIdQuery.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async ({ id, ...data }: UpdateUserCommand.Request): Promise<UpdateUserCommand.Response | null> => {
    try {
      const user = await this.user.update({
        where: { id },
        data: UpdateUserCommand.data(data),
        include: UpdateUserCommand.include,
      });

      return UpdateUserCommand.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id, ...data } };
      throw e;
    }
  };

  delete = async (data: DeleteUserCommand.Request): Promise<DeleteUserCommand.Response | null> => {
    try {
      const user = await this.user.delete({ where: { id: data.id } });
      return DeleteUserCommand.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addUser = async (data: AddUserCommand.Request): Promise<AddUserCommand.Response | null> => {
    try {
      const user = await this.user.create({
        data: AddUserCommand.data(data),
        include: AddUserCommand.include,
      });

      const cvUrl = await this.linksProfile.create({
        data: AddUserCommand.cvUrl(data, user),
      });

      if (user?.profile?.links) {
        if (cvUrl) user.profile.links.push(cvUrl);
      }

      return AddUserCommand.filter(user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
