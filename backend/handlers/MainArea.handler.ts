import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelMainArea } from '../types';
import {
  UpdateMainAreaCommand,
  DeleteMainAreaCommand,
  CreateMainAreaCommand,
  AddEmployeeMainAreaCommand,
} from '../../contracts/commands';
import { GetEmployeeMainAreaQuery, GetEmployeesMainAreaQuery, FindManyMainAreaQuery } from '../../contracts/queries';

export class MainAreaHandler extends HandlerBase<ChannelMainArea> {
  private win: BrowserWindow;
  private mainArea: Prisma.MainAreaDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_mainArea_handler');
    this.win = win;
    if (this.db) this.mainArea = this.db.mainArea;
    if (this.db) void this.addBaseMainArea();
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.mainArea) return this.logger.error('The mainArea database not found!');

    this.handler<CreateMainAreaCommand.Request, CreateMainAreaCommand.Response>(
      CreateMainAreaCommand.channel,
      this.create,
    );
    this.handler<DeleteMainAreaCommand.Request, DeleteMainAreaCommand.Response>(
      DeleteMainAreaCommand.channel,
      this.delete,
    );
    this.handler<UpdateMainAreaCommand.Request, UpdateMainAreaCommand.Response | null>(
      UpdateMainAreaCommand.channel,
      this.update,
    );
    this.handler<AddEmployeeMainAreaCommand.Request, AddEmployeeMainAreaCommand.Response | null>(
      AddEmployeeMainAreaCommand.channel,
      this.addEmployeeMainArea,
    );
    this.handler<GetEmployeeMainAreaQuery.Request, GetEmployeeMainAreaQuery.Response | null>(
      GetEmployeeMainAreaQuery.channel,
      this.getEmployeeMainArea,
    );
    this.handler<GetEmployeesMainAreaQuery.Request, GetEmployeesMainAreaQuery.Response[] | null>(
      GetEmployeesMainAreaQuery.channel,
      this.getEmployeesMainArea,
    );
    this.handler<FindManyMainAreaQuery.Request, FindManyMainAreaQuery.Response[] | null>(
      FindManyMainAreaQuery.channel,
      this.findMany,
    );

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  getEmployeesMainArea = async (
    data: GetEmployeesMainAreaQuery.Request,
  ): Promise<GetEmployeesMainAreaQuery.Response[] | null> => {
    try {
      const employees = await this.mainArea.findMany({
        where: GetEmployeesMainAreaQuery.where(data),
        include: GetEmployeesMainAreaQuery.include,
      });
      return GetEmployeesMainAreaQuery.filter(employees);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getEmployeeMainArea = async (
    data: GetEmployeeMainAreaQuery.Request,
  ): Promise<GetEmployeeMainAreaQuery.Response | null> => {
    try {
      const userMainArea = await this.mainArea.findFirst({
        where: GetEmployeeMainAreaQuery.where(data),
      });
      return GetEmployeeMainAreaQuery.filter(userMainArea);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addEmployeeMainArea = async (
    data: AddEmployeeMainAreaCommand.Request,
  ): Promise<AddEmployeeMainAreaCommand.Response | null> => {
    try {
      const userMainArea = await this.mainArea.create({ data: AddEmployeeMainAreaCommand.data(data) });
      if (userMainArea) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findMany = async (): Promise<FindManyMainAreaQuery.Response[]> => {
    try {
      const list = await this.mainArea.findMany();
      return list;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta };
      throw e;
    }
  };

  create = async (data: CreateMainAreaCommand.Request): Promise<CreateMainAreaCommand.Response> => {
    try {
      return await this.mainArea.create({
        data: CreateMainAreaCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async ({ id, name }: UpdateMainAreaCommand.Request): Promise<UpdateMainAreaCommand.Response | null> => {
    try {
      return this.mainArea.update({ where: { id }, data: { name } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id, name } };
      throw e;
    }
  };

  delete = async ({ id }: DeleteMainAreaCommand.Request): Promise<DeleteMainAreaCommand.Response> => {
    try {
      return await this.mainArea.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id } };
      throw e;
    }
  };

  private addBaseMainArea = async (): Promise<void> => {
    try {
      const count = await this.mainArea.count();
      if (count > 1) return;
      // createMany is not supported by SQLite.
      await this.mainArea.create({ data: { name: 'student' } });
      await this.mainArea.create({ data: { name: 'backend' } });
      await this.mainArea.create({ data: { name: 'frontend' } });
      await this.mainArea.create({ data: { name: 'mobile' } });
      await this.mainArea.create({ data: { name: 'fullstack' } });
      await this.mainArea.create({ data: { name: 'devops' } });
      await this.mainArea.create({ data: { name: 'seo' } });
      await this.mainArea.create({ data: { name: 'hr' } });
    } catch (e) {
      throw e;
    }
  };
}
