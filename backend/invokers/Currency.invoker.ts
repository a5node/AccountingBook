import { InvokerBase } from './InvokerBase';
import { ChannelCurrency, ReqError } from '../types';

import { FindCurrencyQuery, FindCurrencysQuery, GetCurrencyByIdQuery } from '../../contracts/queries';
import { DeleteCurrencyCommand, UpdateCurrencyCommand, AddCurrencyCommand } from '../../contracts/commands';

export class CurrencyInvoker extends InvokerBase<ChannelCurrency> {
  constructor() {
    super();
  }

  public find = async (params: FindCurrencyQuery.Request): Promise<FindCurrencyQuery.Response | Partial<ReqError>> => {
    return await this.invoker<FindCurrencyQuery.Request, FindCurrencyQuery.Response | Partial<ReqError>>(
      FindCurrencyQuery.channel,
      params,
    );
  };

  public findCurrencys = async (
    params: FindCurrencysQuery.Request,
  ): Promise<FindCurrencysQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindCurrencysQuery.Request, FindCurrencysQuery.Response[] | Partial<ReqError>>(
      FindCurrencysQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteCurrencyCommand.Request,
  ): Promise<DeleteCurrencyCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteCurrencyCommand.Request, DeleteCurrencyCommand.Response | Partial<ReqError>>(
      DeleteCurrencyCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateCurrencyCommand.Request,
  ): Promise<UpdateCurrencyCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateCurrencyCommand.Request, UpdateCurrencyCommand.Response | Partial<ReqError>>(
      UpdateCurrencyCommand.channel,
      params,
    );
  };

  public getCurrencyById = async (
    params: GetCurrencyByIdQuery.Request,
  ): Promise<GetCurrencyByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetCurrencyByIdQuery.Request, GetCurrencyByIdQuery.Response | Partial<ReqError>>(
      GetCurrencyByIdQuery.channel,
      params,
    );
  };

  public addCurrency = async (
    params: AddCurrencyCommand.Request,
  ): Promise<AddCurrencyCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddCurrencyCommand.Request, AddCurrencyCommand.Response | Partial<ReqError>>(
      AddCurrencyCommand.channel,
      params,
    );
  };
}
