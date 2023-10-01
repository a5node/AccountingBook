import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelBank } from '../types';
import {
  CreateBankCommand,
  DeleteBankCommand,
  UpdateBankCommand,
  AddUserBankCommand,
  RemoveUserBankCommand,
} from '../../contracts/commands';
import { GetUserBanksQuery } from '../../contracts/queries';

export class BankHandler extends HandlerBase<ChannelBank> {
  private win: BrowserWindow;
  private bank: Prisma.BankDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_bank_handler');
    this.win = win;
    if (this.db) this.bank = this.db.bank;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.bank) return this.logger.error('The bank database not found!');

    this.handler<CreateBankCommand.Request, CreateBankCommand.Response>(CreateBankCommand.channel, this.create);
    this.handler<DeleteBankCommand.Request, DeleteBankCommand.Response>(DeleteBankCommand.channel, this.delete);
    this.handler<UpdateBankCommand.Request, UpdateBankCommand.Response | null>(UpdateBankCommand.channel, this.update);
    this.handler<AddUserBankCommand.Request, AddUserBankCommand.Response | null>(
      AddUserBankCommand.channel,
      this.addUserBank,
    );
    this.handler<GetUserBanksQuery.Request, GetUserBanksQuery.Response | null>(
      GetUserBanksQuery.channel,
      this.getUserBanks,
    );
    this.handler<RemoveUserBankCommand.Request, RemoveUserBankCommand.Response | null>(
      RemoveUserBankCommand.channel,
      this.removeUserBank,
    );

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  addUserBank = async (data: AddUserBankCommand.Request): Promise<AddUserBankCommand.Response | null> => {
    try {
      const bank = await this.bank.create({
        data: AddUserBankCommand.data(data),
      });
      if (bank.id) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getUserBanks = async (data: GetUserBanksQuery.Request): Promise<GetUserBanksQuery.Response | null> => {
    try {
      const bank = await this.bank.findMany({
        where: GetUserBanksQuery.where(data),
        select: GetUserBanksQuery.select,
      });

      return GetUserBanksQuery.filter(bank);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  removeUserBank = async (data: RemoveUserBankCommand.Request): Promise<RemoveUserBankCommand.Response> => {
    try {
      const bank = await this.bank.delete({
        where: RemoveUserBankCommand.where(data),
      });

      if (bank) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  create = async (data: CreateBankCommand.Request): Promise<CreateBankCommand.Response> => {
    try {
      return await this.bank.create({
        data: CreateBankCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateBankCommand.Request): Promise<UpdateBankCommand.Response | null> => {
    try {
      return this.bank.update({
        where: UpdateBankCommand.where(data),
        data: UpdateBankCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteBankCommand.Request): Promise<DeleteBankCommand.Response> => {
    try {
      return await this.bank.delete({
        where: DeleteBankCommand.where(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
