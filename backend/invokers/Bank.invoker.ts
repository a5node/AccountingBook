import { InvokerBase } from './InvokerBase';
import { ChannelBank, ReqError } from '../types';

import {
  CreateBankCommand,
  DeleteBankCommand,
  UpdateBankCommand,
  AddUserBankCommand,
  RemoveUserBankCommand,
} from '../../contracts/commands';
import { GetUserBanksQuery } from '../../contracts/queries';

export class BankInvoker extends InvokerBase<ChannelBank> {
  constructor() {
    super();
  }

  public addUserBank = async (
    params: AddUserBankCommand.Request,
  ): Promise<AddUserBankCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddUserBankCommand.Request, AddUserBankCommand.Response | Partial<ReqError>>(
      AddUserBankCommand.channel,
      params,
    );
  };

  public getUserBanks = async (
    params: GetUserBanksQuery.Request,
  ): Promise<GetUserBanksQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetUserBanksQuery.Request, GetUserBanksQuery.Response | Partial<ReqError>>(
      GetUserBanksQuery.channel,
      params,
    );
  };

  public removeUserBank = async (
    params: RemoveUserBankCommand.Request,
  ): Promise<RemoveUserBankCommand.Response | Partial<ReqError>> => {
    return await this.invoker<RemoveUserBankCommand.Request, RemoveUserBankCommand.Response | Partial<ReqError>>(
      RemoveUserBankCommand.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteBankCommand.Request,
  ): Promise<DeleteBankCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteBankCommand.Request, DeleteBankCommand.Response | Partial<ReqError>>(
      DeleteBankCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateBankCommand.Request,
  ): Promise<UpdateBankCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateBankCommand.Request, UpdateBankCommand.Response | Partial<ReqError>>(
      UpdateBankCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreateBankCommand.Request,
  ): Promise<CreateBankCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateBankCommand.Request, CreateBankCommand.Response | Partial<ReqError>>(
      CreateBankCommand.channel,
      params,
    );
  };
}
