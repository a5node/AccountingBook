import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelAccounting } from '../types';

import { FindAccountingByUserQuery, GetAccountingByIdQuery } from '../../contracts/queries';
import { DeleteAccountingCommand, UpdateAccountingCommand, AddAccountingCommand } from '../../contracts/commands';

export class AccountingHandler extends HandlerBase<ChannelAccounting> {
  private win: BrowserWindow;
  private accounting: Prisma.AccountingDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'accounting_handler');
    this.win = win;
    if (this.db) this.accounting = this.db.accounting;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.accounting) return this.logger.error('The accounting database not found!');

    // list handlers

    this.handler<AddAccountingCommand.Request, AddAccountingCommand.Response | null>(
      AddAccountingCommand.channel,
      this.create,
    );
    this.handler<UpdateAccountingCommand.Request, UpdateAccountingCommand.Response | null>(
      UpdateAccountingCommand.channel,
      this.update,
    );
    this.handler<DeleteAccountingCommand.Request, DeleteAccountingCommand.Response | null>(
      DeleteAccountingCommand.channel,
      this.delete,
    );

    this.handler<FindAccountingByUserQuery.Request, FindAccountingByUserQuery.Response | null>(
      FindAccountingByUserQuery.channel,
      this.findAccountingByUser,
    );

    this.handler<GetAccountingByIdQuery.Request, GetAccountingByIdQuery.Response | null>(
      GetAccountingByIdQuery.channel,
      this.getAccountingById,
    );

    //logger
    this.logger.message('Started accounting listeners.', 'green', '', 'yellow');
  };

  findAccountingByUser = async (
    data: FindAccountingByUserQuery.Request,
  ): Promise<FindAccountingByUserQuery.Response | null> => {
    try {
      const accounting = await this.accounting.findUnique({
        where: FindAccountingByUserQuery.where(data),
        include: FindAccountingByUserQuery.include,
      });
      return FindAccountingByUserQuery.filter(accounting);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getAccountingById = async (data: GetAccountingByIdQuery.Request): Promise<GetAccountingByIdQuery.Response | null> => {
    try {
      const accounting = await this.accounting.findUnique({
        where: GetAccountingByIdQuery.where(data),
        include: GetAccountingByIdQuery.include,
      });

      return GetAccountingByIdQuery.filter(accounting);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateAccountingCommand.Request): Promise<UpdateAccountingCommand.Response | null> => {
    try {
      const accounting = await this.accounting.update({
        where: UpdateAccountingCommand.where(data),
        data: UpdateAccountingCommand.data(data),
        include: UpdateAccountingCommand.include,
      });

      return UpdateAccountingCommand.filter(accounting);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteAccountingCommand.Request): Promise<DeleteAccountingCommand.Response | null> => {
    try {
      const accounting = await this.accounting.delete({
        where: DeleteAccountingCommand.where(data),
      });
      return DeleteAccountingCommand.filter(accounting);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  create = async (data: AddAccountingCommand.Request): Promise<AddAccountingCommand.Response | null> => {
    try {
      const accounting = await this.accounting.create({
        data: AddAccountingCommand.data(data),
        include: AddAccountingCommand.include,
      });

      return AddAccountingCommand.filter(accounting);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
