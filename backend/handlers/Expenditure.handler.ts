import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelExpenditure } from '../types';

import {
  FindExpenditureByCurrencyNameQuery,
  FindExpendituresQuery,
  GetExpenditureByIdQuery,
} from '../../contracts/queries';
import { DeleteExpenditureCommand, UpdateExpenditureCommand, AddExpenditureCommand } from '../../contracts/commands';

export class ExpenditureHandler extends HandlerBase<ChannelExpenditure> {
  private win: BrowserWindow;
  private expenditure: Prisma.ExpenditureDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'expenditure_handler');
    this.win = win;
    if (this.db) this.expenditure = this.db.expenditure;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.expenditure) return this.logger.error('The expenditure database not found!');
    // list handlers
    this.handler<FindExpenditureByCurrencyNameQuery.Request, FindExpenditureByCurrencyNameQuery.Response[] | null>(
      FindExpenditureByCurrencyNameQuery.channel,
      this.findExpenditureByCurrencyName,
    );
    this.handler<FindExpendituresQuery.Request, FindExpendituresQuery.Response[] | null>(
      FindExpendituresQuery.channel,
      this.findExpenditures,
    );
    this.handler<AddExpenditureCommand.Request, AddExpenditureCommand.Response | null>(
      AddExpenditureCommand.channel,
      this.addExpenditure,
    );
    this.handler<UpdateExpenditureCommand.Request, UpdateExpenditureCommand.Response | null>(
      UpdateExpenditureCommand.channel,
      this.update,
    );
    this.handler<DeleteExpenditureCommand.Request, DeleteExpenditureCommand.Response | null>(
      DeleteExpenditureCommand.channel,
      this.delete,
    );
    this.handler<GetExpenditureByIdQuery.Request, GetExpenditureByIdQuery.Response | null>(
      GetExpenditureByIdQuery.channel,
      this.getExpenditureById,
    );
    //logger
    this.logger.message('Started expenditure listeners.', 'green', '', 'yellow');
  };

  findExpenditureByCurrencyName = async (
    data: FindExpenditureByCurrencyNameQuery.Request,
  ): Promise<FindExpenditureByCurrencyNameQuery.Response[] | null> => {
    try {
      const expenditure = await this.expenditure.findMany({
        where: FindExpenditureByCurrencyNameQuery.where(data),
        include: FindExpenditureByCurrencyNameQuery.include,
      });
      return FindExpenditureByCurrencyNameQuery.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findExpenditures = async (data: FindExpendituresQuery.Request): Promise<FindExpendituresQuery.Response[] | null> => {
    try {
      const expenditure = await this.expenditure.findMany({
        where: FindExpendituresQuery.where(data),
        include: FindExpendituresQuery.include,
      });
      return FindExpendituresQuery.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getExpenditureById = async (
    data: GetExpenditureByIdQuery.Request,
  ): Promise<GetExpenditureByIdQuery.Response | null> => {
    try {
      const expenditure = await this.expenditure.findUnique({
        where: GetExpenditureByIdQuery.where(data),
        include: GetExpenditureByIdQuery.include,
      });

      return GetExpenditureByIdQuery.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateExpenditureCommand.Request): Promise<UpdateExpenditureCommand.Response | null> => {
    try {
      const expenditure = await this.expenditure.update({
        where: UpdateExpenditureCommand.where(data),
        data: UpdateExpenditureCommand.data(data),
        include: UpdateExpenditureCommand.include,
      });

      return UpdateExpenditureCommand.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteExpenditureCommand.Request): Promise<DeleteExpenditureCommand.Response | null> => {
    try {
      const expenditure = await this.expenditure.delete({
        where: DeleteExpenditureCommand.where(data),
        include: DeleteExpenditureCommand.include,
      });
      return DeleteExpenditureCommand.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addExpenditure = async (data: AddExpenditureCommand.Request): Promise<AddExpenditureCommand.Response | null> => {
    try {
      const expenditure = await this.expenditure.create({
        data: AddExpenditureCommand.data(data),
        include: AddExpenditureCommand.include,
      });

      return AddExpenditureCommand.filter(expenditure);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
