import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelCurrency } from '../types';

import { FindCurrencyQuery, FindCurrencysQuery, GetCurrencyByIdQuery } from '../../contracts/queries';
import { DeleteCurrencyCommand, UpdateCurrencyCommand, AddCurrencyCommand } from '../../contracts/commands';

export class CurrencyHandler extends HandlerBase<ChannelCurrency> {
  private win: BrowserWindow;
  private currency: Prisma.CurrencyDelegate;
  private accounting: Prisma.AccountingDelegate;
  constructor(win: BrowserWindow, app: App) {
    super(app, 'currency_handler');
    this.win = win;
    if (this.db) this.accounting = this.db.accounting;
    if (this.db) this.currency = this.db.currency;
    if (this.db) void this.addBaseCurrencies();
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.currency) return this.logger.error('The currency database not found!');
    // list handlers
    this.handler<FindCurrencyQuery.Request, FindCurrencyQuery.Response | null>(FindCurrencyQuery.channel, this.find);
    this.handler<FindCurrencysQuery.Request, FindCurrencysQuery.Response[] | null>(
      FindCurrencysQuery.channel,
      this.findCurrencys,
    );
    this.handler<AddCurrencyCommand.Request, AddCurrencyCommand.Response | null>(
      AddCurrencyCommand.channel,
      this.addCurrency,
    );
    this.handler<UpdateCurrencyCommand.Request, UpdateCurrencyCommand.Response | null>(
      UpdateCurrencyCommand.channel,
      this.update,
    );
    this.handler<DeleteCurrencyCommand.Request, DeleteCurrencyCommand.Response | null>(
      DeleteCurrencyCommand.channel,
      this.delete,
    );
    this.handler<GetCurrencyByIdQuery.Request, GetCurrencyByIdQuery.Response | null>(
      GetCurrencyByIdQuery.channel,
      this.getCurrencyById,
    );
    //logger
    this.logger.message('Started currency listeners.', 'green', '', 'yellow');
  };

  find = async (data: FindCurrencyQuery.Request): Promise<FindCurrencyQuery.Response | null> => {
    try {
      const currency = await this.currency.findUnique({
        where: FindCurrencyQuery.where(data),
        include: FindCurrencyQuery.include,
      });
      return FindCurrencyQuery.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  findCurrencys = async (data: FindCurrencysQuery.Request): Promise<FindCurrencysQuery.Response[] | null> => {
    try {
      const currency = await this.currency.findMany({
        where: FindCurrencysQuery.where(data),
        include: FindCurrencysQuery.include,
      });
      return FindCurrencysQuery.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getCurrencyById = async (data: GetCurrencyByIdQuery.Request): Promise<GetCurrencyByIdQuery.Response | null> => {
    try {
      const currency = await this.currency.findUnique({
        where: GetCurrencyByIdQuery.where(data),
        include: GetCurrencyByIdQuery.include,
      });

      return GetCurrencyByIdQuery.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateCurrencyCommand.Request): Promise<UpdateCurrencyCommand.Response | null> => {
    try {
      const currency = await this.currency.update({
        where: UpdateCurrencyCommand.where(data),
        data: UpdateCurrencyCommand.data(data),
        include: UpdateCurrencyCommand.include,
      });

      return UpdateCurrencyCommand.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteCurrencyCommand.Request): Promise<DeleteCurrencyCommand.Response | null> => {
    try {
      const currency = await this.currency.delete({
        where: DeleteCurrencyCommand.where(data),
        include: DeleteCurrencyCommand.include,
      });
      return DeleteCurrencyCommand.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addCurrency = async (data: AddCurrencyCommand.Request): Promise<AddCurrencyCommand.Response | null> => {
    try {
      const currency = await this.currency.create({
        data: AddCurrencyCommand.data(data),
        include: AddCurrencyCommand.include,
      });

      return AddCurrencyCommand.filter(currency);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
  private addBaseCurrencies = async (): Promise<void> => {
    try {
      const count = await this.currency.count();
      if (count > 1) return;
      const accounting = await this.accounting.findFirst({
        select: { id: true, currencies: true },
      });
      if (accounting === null) return;
      if (accounting.currencies.length > 0) return;
      // createMany is not supported by SQLite.
      await this.currency.create({
        data: { name: 'U.S. dollar', shortName: 'USD', accounting: { connect: { id: accounting.id } } },
      });
      await this.currency.create({
        data: { name: 'Euro', shortName: 'EUR', accounting: { connect: { id: accounting.id } } },
      });
    } catch (e) {
      throw e;
    }
  };
}
