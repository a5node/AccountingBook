import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelHireDate } from '../types';
import {
  CreateHireDateCommand,
  DeleteHireDateCommand,
  UpdateHireDateCommand,
  AddUserHireDateCommand,
  RemoveUserHireDateCommand,
} from '../../contracts/commands';
import { GetUserHireDateQuery } from '../../contracts/queries';

export class HireDateHandler extends HandlerBase<ChannelHireDate> {
  private win: BrowserWindow;
  private hireDate: Prisma.HireDateDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_hireDate_handler');
    this.win = win;
    if (this.db) this.hireDate = this.db.hireDate;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.hireDate) return this.logger.error('The hireDate database not found!');

    this.handler<CreateHireDateCommand.Request, CreateHireDateCommand.Response>(
      CreateHireDateCommand.channel,
      this.create,
    );
    this.handler<DeleteHireDateCommand.Request, DeleteHireDateCommand.Response>(
      DeleteHireDateCommand.channel,
      this.delete,
    );
    this.handler<UpdateHireDateCommand.Request, UpdateHireDateCommand.Response | null>(
      UpdateHireDateCommand.channel,
      this.update,
    );
    this.handler<AddUserHireDateCommand.Request, AddUserHireDateCommand.Response | null>(
      AddUserHireDateCommand.channel,
      this.addUserHireDate,
    );
    this.handler<GetUserHireDateQuery.Request, GetUserHireDateQuery.Response | null>(
      GetUserHireDateQuery.channel,
      this.getUserHireDates,
    );
    this.handler<RemoveUserHireDateCommand.Request, RemoveUserHireDateCommand.Response | null>(
      RemoveUserHireDateCommand.channel,
      this.removeUserHireDate,
    );

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  addUserHireDate = async (data: AddUserHireDateCommand.Request): Promise<AddUserHireDateCommand.Response | null> => {
    try {
      const hireDate = await this.hireDate.create({
        data: AddUserHireDateCommand.data(data),
      });
      if (hireDate.id) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getUserHireDates = async (data: GetUserHireDateQuery.Request): Promise<GetUserHireDateQuery.Response | null> => {
    try {
      const hireDate = await this.hireDate.findMany({
        where: GetUserHireDateQuery.where(data),
        select: GetUserHireDateQuery.select,
      });

      return GetUserHireDateQuery.filter(hireDate);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  removeUserHireDate = async (data: RemoveUserHireDateCommand.Request): Promise<RemoveUserHireDateCommand.Response> => {
    try {
      const hireDate = await this.hireDate.delete({
        where: RemoveUserHireDateCommand.where(data),
      });

      if (hireDate) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  create = async (data: CreateHireDateCommand.Request): Promise<CreateHireDateCommand.Response> => {
    try {
      return await this.hireDate.create({
        data: CreateHireDateCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateHireDateCommand.Request): Promise<UpdateHireDateCommand.Response | null> => {
    try {
      return this.hireDate.update({
        where: UpdateHireDateCommand.where(data),
        data: UpdateHireDateCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteHireDateCommand.Request): Promise<DeleteHireDateCommand.Response> => {
    try {
      return await this.hireDate.delete({
        where: DeleteHireDateCommand.where(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
