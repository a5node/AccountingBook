import { InvokerBase } from './InvokerBase';
import { ChannelAccounting, ReqError } from '../types';

import { FindAccountingByUserQuery, GetAccountingByIdQuery } from '../../contracts/queries';
import { DeleteAccountingCommand, UpdateAccountingCommand, AddAccountingCommand } from '../../contracts/commands';

export class AccountingInvoker extends InvokerBase<ChannelAccounting> {
  constructor() {
    super();
  }

  public delete = async (
    params: DeleteAccountingCommand.Request,
  ): Promise<DeleteAccountingCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteAccountingCommand.Request, DeleteAccountingCommand.Response | Partial<ReqError>>(
      DeleteAccountingCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateAccountingCommand.Request,
  ): Promise<UpdateAccountingCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateAccountingCommand.Request, UpdateAccountingCommand.Response | Partial<ReqError>>(
      UpdateAccountingCommand.channel,
      params,
    );
  };

  public getAccountingById = async (
    params: GetAccountingByIdQuery.Request,
  ): Promise<GetAccountingByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetAccountingByIdQuery.Request, GetAccountingByIdQuery.Response | Partial<ReqError>>(
      GetAccountingByIdQuery.channel,
      params,
    );
  };

  public findAccountingByUser = async (
    params: FindAccountingByUserQuery.Request,
  ): Promise<FindAccountingByUserQuery.Response | Partial<ReqError>> => {
    return await this.invoker<
      FindAccountingByUserQuery.Request,
      FindAccountingByUserQuery.Response | Partial<ReqError>
    >(FindAccountingByUserQuery.channel, params);
  };

  public addAccounting = async (
    params: AddAccountingCommand.Request,
  ): Promise<AddAccountingCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddAccountingCommand.Request, AddAccountingCommand.Response | Partial<ReqError>>(
      AddAccountingCommand.channel,
      params,
    );
  };
}
