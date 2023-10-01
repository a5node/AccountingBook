import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelIncome } from '../types';

import { FindIncomeByCurrencyNameQuery, FindIncomesQuery, GetIncomeByIdQuery } from '../../contracts/queries';
import { DeleteIncomeCommand, UpdateIncomeCommand, AddIncomeCommand } from '../../contracts/commands';

export class IncomeHandler extends HandlerBase<ChannelIncome> {
  private win: BrowserWindow;
  private income: Prisma.IncomeDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'income_handler');
    this.win = win;
    if (this.db) this.income = this.db.income;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.income) return this.logger.error('The income database not found!');
    // list handlers
    this.handler<FindIncomeByCurrencyNameQuery.Request, FindIncomeByCurrencyNameQuery.Response[] | null>(
      FindIncomeByCurrencyNameQuery.channel,
      this.findIncomeByCurrencyName,
    );
    this.handler<FindIncomesQuery.Request, FindIncomesQuery.Response[] | null>(
      FindIncomesQuery.channel,
      this.findIncomes,
    );
    this.handler<AddIncomeCommand.Request, AddIncomeCommand.Response | null>(AddIncomeCommand.channel, this.addIncome);
    this.handler<UpdateIncomeCommand.Request, UpdateIncomeCommand.Response | null>(
      UpdateIncomeCommand.channel,
      this.update,
    );
    this.handler<DeleteIncomeCommand.Request, DeleteIncomeCommand.Response | null>(
      DeleteIncomeCommand.channel,
      this.delete,
    );
    this.handler<GetIncomeByIdQuery.Request, GetIncomeByIdQuery.Response | null>(
      GetIncomeByIdQuery.channel,
      this.getIncomeById,
    );
    //logger
    this.logger.message('Started income listeners.', 'green', '', 'yellow');
  };

  findIncomeByCurrencyName = async (
    data: FindIncomeByCurrencyNameQuery.Request,
  ): Promise<FindIncomeByCurrencyNameQuery.Response[] | null> => {
    try {
      const income = await this.income.findMany({
        where: FindIncomeByCurrencyNameQuery.where(data),
        include: FindIncomeByCurrencyNameQuery.include,
      });
      return FindIncomeByCurrencyNameQuery.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findIncomes = async (data: FindIncomesQuery.Request): Promise<FindIncomesQuery.Response[] | null> => {
    try {
      const income = await this.income.findMany({
        where: FindIncomesQuery.where(data),
        include: FindIncomesQuery.include,
      });
      return FindIncomesQuery.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getIncomeById = async (data: GetIncomeByIdQuery.Request): Promise<GetIncomeByIdQuery.Response | null> => {
    try {
      const income = await this.income.findUnique({
        where: GetIncomeByIdQuery.where(data),
        include: GetIncomeByIdQuery.include,
      });

      return GetIncomeByIdQuery.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateIncomeCommand.Request): Promise<UpdateIncomeCommand.Response | null> => {
    try {
      const income = await this.income.update({
        where: UpdateIncomeCommand.where(data),
        data: UpdateIncomeCommand.data(data),
        include: UpdateIncomeCommand.include,
      });

      return UpdateIncomeCommand.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteIncomeCommand.Request): Promise<DeleteIncomeCommand.Response | null> => {
    try {
      const income = await this.income.delete({
        where: DeleteIncomeCommand.where(data),
        include: DeleteIncomeCommand.include,
      });
      return DeleteIncomeCommand.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addIncome = async (data: AddIncomeCommand.Request): Promise<AddIncomeCommand.Response | null> => {
    try {
      const income = await this.income.create({
        data: AddIncomeCommand.data(data),
        include: AddIncomeCommand.include,
      });

      return AddIncomeCommand.filter(income);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
