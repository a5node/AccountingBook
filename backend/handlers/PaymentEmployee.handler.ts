import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelPaymentEmployee } from '../types';
import {
  CreatePaymentEmployeeCommand,
  DeletePaymentEmployeeCommand,
  UpdatePaymentEmployeeCommand,
  AddPaymentEmployeeCommand,
  RemovePaymentEmployeeCommand,
} from '../../contracts/commands';
import { GetPaymentsEmployeesQuery } from '../../contracts/queries';

export class PaymentEmployeeHandler extends HandlerBase<ChannelPaymentEmployee> {
  private win: BrowserWindow;
  private paymentEmployee: Prisma.PaymentEmployeeDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_payment_employee_handler');
    this.win = win;
    if (this.db) this.paymentEmployee = this.db.paymentEmployee;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.paymentEmployee) return this.logger.error('The payment employee database not found!');

    this.handler<CreatePaymentEmployeeCommand.Request, CreatePaymentEmployeeCommand.Response>(
      CreatePaymentEmployeeCommand.channel,
      this.create,
    );
    this.handler<DeletePaymentEmployeeCommand.Request, DeletePaymentEmployeeCommand.Response>(
      DeletePaymentEmployeeCommand.channel,
      this.delete,
    );
    this.handler<UpdatePaymentEmployeeCommand.Request, UpdatePaymentEmployeeCommand.Response | null>(
      UpdatePaymentEmployeeCommand.channel,
      this.update,
    );
    this.handler<AddPaymentEmployeeCommand.Request, AddPaymentEmployeeCommand.Response | null>(
      AddPaymentEmployeeCommand.channel,
      this.addPaymentEmployee,
    );
    this.handler<GetPaymentsEmployeesQuery.Request, GetPaymentsEmployeesQuery.Response | null>(
      GetPaymentsEmployeesQuery.channel,
      this.getPaymentEmployees,
    );
    this.handler<RemovePaymentEmployeeCommand.Request, RemovePaymentEmployeeCommand.Response | null>(
      RemovePaymentEmployeeCommand.channel,
      this.removePaymentEmployee,
    );

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  addPaymentEmployee = async (
    data: AddPaymentEmployeeCommand.Request,
  ): Promise<AddPaymentEmployeeCommand.Response | null> => {
    try {
      const paymentEmployee = await this.paymentEmployee.create({
        data: AddPaymentEmployeeCommand.data(data),
      });
      if (paymentEmployee.id) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getPaymentEmployees = async (
    data: GetPaymentsEmployeesQuery.Request,
  ): Promise<GetPaymentsEmployeesQuery.Response | null> => {
    try {
      const paymentEmployee = await this.paymentEmployee.findMany({
        where: GetPaymentsEmployeesQuery.where(data),
        select: GetPaymentsEmployeesQuery.select,
      });

      return GetPaymentsEmployeesQuery.filter(paymentEmployee);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  removePaymentEmployee = async (
    data: RemovePaymentEmployeeCommand.Request,
  ): Promise<RemovePaymentEmployeeCommand.Response> => {
    try {
      const paymentEmployee = await this.paymentEmployee.delete({
        where: RemovePaymentEmployeeCommand.where(data),
      });

      if (paymentEmployee) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  create = async (data: CreatePaymentEmployeeCommand.Request): Promise<CreatePaymentEmployeeCommand.Response> => {
    try {
      return await this.paymentEmployee.create({
        data: CreatePaymentEmployeeCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (
    data: UpdatePaymentEmployeeCommand.Request,
  ): Promise<UpdatePaymentEmployeeCommand.Response | null> => {
    try {
      return this.paymentEmployee.update({
        where: UpdatePaymentEmployeeCommand.where(data),
        data: UpdatePaymentEmployeeCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeletePaymentEmployeeCommand.Request): Promise<DeletePaymentEmployeeCommand.Response> => {
    try {
      return await this.paymentEmployee.delete({
        where: DeletePaymentEmployeeCommand.where(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
