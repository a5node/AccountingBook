import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelRoles } from '../types';
import {
  UpdateRolesCommand,
  DeleteRolesCommand,
  CreateRoleCommand,
  AddUserRoleCommand,
  RemoveUserRoleCommand,
} from '../../contracts/commands';
import { GetUserRolesQuery, FindManyRolesQuery } from '../../contracts/queries';

export class RolesHandler extends HandlerBase<ChannelRoles> {
  private win: BrowserWindow;
  private roles: Prisma.RolesDelegate;
  private userRoles: Prisma.UserRolesDelegate;
  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_roles_handler');
    this.win = win;
    if (this.db) this.roles = this.db.roles;
    if (this.db) this.userRoles = this.db.userRoles;
    if (this.db) void this.addBaseRole();
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.roles) return this.logger.error('The roles database not found!');

    this.handler<CreateRoleCommand.Request, CreateRoleCommand.Response>(CreateRoleCommand.channel, this.create);
    this.handler<DeleteRolesCommand.Request, DeleteRolesCommand.Response>(DeleteRolesCommand.channel, this.delete);
    this.handler<AddUserRoleCommand.Request, AddUserRoleCommand.Response | null>(
      AddUserRoleCommand.channel,
      this.addUserRole,
    );
    this.handler<GetUserRolesQuery.Request, GetUserRolesQuery.Response | null>(
      GetUserRolesQuery.channel,
      this.getUserRoles,
    );
    this.handler<RemoveUserRoleCommand.Request, RemoveUserRoleCommand.Response | null>(
      RemoveUserRoleCommand.channel,
      this.removeUserRole,
    );
    this.handler<UpdateRolesCommand.Request, UpdateRolesCommand.Response | null>(
      UpdateRolesCommand.channel,
      this.update,
    );
    this.handler<FindManyRolesQuery.Request, FindManyRolesQuery.Response[] | null>(
      FindManyRolesQuery.channel,
      this.findMany,
    );

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  addUserRole = async (data: AddUserRoleCommand.Request): Promise<AddUserRoleCommand.Response | null> => {
    try {
      const userRoles = await this.userRoles.create({
        data: AddUserRoleCommand.data(data),
      });
      if (userRoles.userId) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getUserRoles = async (data: GetUserRolesQuery.Request): Promise<GetUserRolesQuery.Response | null> => {
    try {
      const userRoles = await this.userRoles.findMany({
        where: GetUserRolesQuery.where(data),
        select: GetUserRolesQuery.select,
      });

      return GetUserRolesQuery.filter(userRoles);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  removeUserRole = async (data: RemoveUserRoleCommand.Request): Promise<RemoveUserRoleCommand.Response> => {
    try {
      const userRoles = await this.userRoles.delete({
        where: RemoveUserRoleCommand.where(data),
      });

      if (userRoles) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findMany = async (): Promise<FindManyRolesQuery.Response[]> => {
    try {
      const list = await this.roles.findMany({
        where: FindManyRolesQuery.where(),
      });

      return list;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta };
      throw e;
    }
  };

  create = async (data: CreateRoleCommand.Request): Promise<CreateRoleCommand.Response> => {
    try {
      return await this.roles.create({
        data: CreateRoleCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateRolesCommand.Request): Promise<UpdateRolesCommand.Response | null> => {
    try {
      return this.roles.update({
        where: UpdateRolesCommand.where(data),
        data: UpdateRolesCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteRolesCommand.Request): Promise<DeleteRolesCommand.Response> => {
    try {
      return await this.roles.delete({
        where: DeleteRolesCommand.where(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  private addBaseRole = async (): Promise<void> => {
    try {
      const count = await this.roles.count();
      if (count > 1) return;
      // createMany is not supported by SQLite.
      await this.roles.create({ data: { id: 1, role: 'ADMIN' } });
      await this.roles.create({ data: { id: 2, role: 'CANDIDATE' } });
      await this.roles.create({ data: { id: 3, role: 'USER' } });
      await this.roles.create({ data: { id: 4, role: 'EMPLOYEE' } });
      await this.roles.create({ data: { id: 5, role: 'MANAGER' } });
    } catch (e) {
      throw e;
    }
  };
}
