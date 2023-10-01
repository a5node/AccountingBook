import { InvokerBase } from './InvokerBase';
import { ChannelExpenditure, ReqError } from '../types';

import {
  FindExpenditureByCurrencyNameQuery,
  FindExpendituresQuery,
  GetExpenditureByIdQuery,
} from '../../contracts/queries';
import { DeleteExpenditureCommand, UpdateExpenditureCommand, AddExpenditureCommand } from '../../contracts/commands';

export class ExpenditureInvoker extends InvokerBase<ChannelExpenditure> {
  constructor() {
    super();
  }

  public find = async (
    params: FindExpenditureByCurrencyNameQuery.Request,
  ): Promise<FindExpenditureByCurrencyNameQuery.Response | Partial<ReqError>> => {
    return await this.invoker<
      FindExpenditureByCurrencyNameQuery.Request,
      FindExpenditureByCurrencyNameQuery.Response | Partial<ReqError>
    >(FindExpenditureByCurrencyNameQuery.channel, params);
  };

  public findExpenditures = async (
    params: FindExpendituresQuery.Request,
  ): Promise<FindExpendituresQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindExpendituresQuery.Request, FindExpendituresQuery.Response[] | Partial<ReqError>>(
      FindExpendituresQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteExpenditureCommand.Request,
  ): Promise<DeleteExpenditureCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteExpenditureCommand.Request, DeleteExpenditureCommand.Response | Partial<ReqError>>(
      DeleteExpenditureCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateExpenditureCommand.Request,
  ): Promise<UpdateExpenditureCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateExpenditureCommand.Request, UpdateExpenditureCommand.Response | Partial<ReqError>>(
      UpdateExpenditureCommand.channel,
      params,
    );
  };

  public getExpenditureById = async (
    params: GetExpenditureByIdQuery.Request,
  ): Promise<GetExpenditureByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetExpenditureByIdQuery.Request, GetExpenditureByIdQuery.Response | Partial<ReqError>>(
      GetExpenditureByIdQuery.channel,
      params,
    );
  };

  public addExpenditure = async (
    params: AddExpenditureCommand.Request,
  ): Promise<AddExpenditureCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddExpenditureCommand.Request, AddExpenditureCommand.Response | Partial<ReqError>>(
      AddExpenditureCommand.channel,
      params,
    );
  };
}
