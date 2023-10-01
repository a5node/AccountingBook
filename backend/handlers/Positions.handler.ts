import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelPositions } from '../types';
import {
  UpdatePositionCommand,
  DeletePositionCommand,
  CreatePositionCommand,
  AddEmployeePositionCommand,
} from '../../contracts/commands';
import { GetEmployeePositionsQuery, GetEmployeesPositionsQuery, FindManyPositionsQuery } from '../../contracts/queries';

export class PositionsHandler extends HandlerBase<ChannelPositions> {
  private win: BrowserWindow;
  private positions: Prisma.PositionsDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_positions_handler');
    this.win = win;
    if (this.db) this.positions = this.db.positions;
    if (this.db) void this.addBasePositions();
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.positions) return this.logger.error('The positions database not found!');

    this.handler<CreatePositionCommand.Request, CreatePositionCommand.Response>(
      CreatePositionCommand.channel,
      this.create,
    );
    this.handler<DeletePositionCommand.Request, DeletePositionCommand.Response>(
      DeletePositionCommand.channel,
      this.delete,
    );
    this.handler<UpdatePositionCommand.Request, UpdatePositionCommand.Response | null>(
      UpdatePositionCommand.channel,
      this.update,
    );
    this.handler<AddEmployeePositionCommand.Request, AddEmployeePositionCommand.Response | null>(
      AddEmployeePositionCommand.channel,
      this.addEmployeePosition,
    );
    this.handler<GetEmployeePositionsQuery.Request, GetEmployeePositionsQuery.Response | null>(
      GetEmployeePositionsQuery.channel,
      this.getEmployeePositions,
    );
    this.handler<GetEmployeesPositionsQuery.Request, GetEmployeesPositionsQuery.Response[] | null>(
      GetEmployeesPositionsQuery.channel,
      this.getEmployeesPositions,
    );
    this.handler<FindManyPositionsQuery.Request, FindManyPositionsQuery.Response[] | null>(
      FindManyPositionsQuery.channel,
      this.findMany,
    );
    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  getEmployeesPositions = async (
    data: GetEmployeesPositionsQuery.Request,
  ): Promise<GetEmployeesPositionsQuery.Response[] | null> => {
    try {
      const employeesEp = await this.positions.findMany({
        where: GetEmployeesPositionsQuery.where(data),
        include: GetEmployeesPositionsQuery.include,
      });

      return GetEmployeesPositionsQuery.filter(employeesEp);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getEmployeePositions = async (
    data: GetEmployeePositionsQuery.Request,
  ): Promise<GetEmployeePositionsQuery.Response | null> => {
    try {
      const userPositions = await this.positions.findFirst({
        where: GetEmployeePositionsQuery.where(data),
      });
      return GetEmployeePositionsQuery.filter(userPositions);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addEmployeePosition = async (
    data: AddEmployeePositionCommand.Request,
  ): Promise<AddEmployeePositionCommand.Response | null> => {
    try {
      const userPosition = await this.positions.create({ data: AddEmployeePositionCommand.data(data) });
      if (userPosition) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findMany = async (): Promise<FindManyPositionsQuery.Response[]> => {
    try {
      const list = await this.positions.findMany();
      return list;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta };
      throw e;
    }
  };

  create = async (data: CreatePositionCommand.Request): Promise<CreatePositionCommand.Response> => {
    try {
      return await this.positions.create({
        data: CreatePositionCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async ({ id, name }: UpdatePositionCommand.Request): Promise<UpdatePositionCommand.Response | null> => {
    try {
      return this.positions.update({ where: { id }, data: { name } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id, name } };
      throw e;
    }
  };

  delete = async ({ id }: DeletePositionCommand.Request): Promise<DeletePositionCommand.Response> => {
    try {
      return await this.positions.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id } };
      throw e;
    }
  };

  private addBasePositions = async (): Promise<void> => {
    try {
      const count = await this.positions.count();
      if (count > 1) return;
      // createMany is not supported by SQLite.
      await this.positions.create({ data: { name: 'trainee' } });
      await this.positions.create({ data: { name: 'junior' } });
      await this.positions.create({ data: { name: 'middle' } });
      await this.positions.create({ data: { name: 'senior' } });
      await this.positions.create({ data: { name: 'senior_plus' } });
      await this.positions.create({ data: { name: 'seo' } });
    } catch (e) {
      throw e;
    }
  };
}
