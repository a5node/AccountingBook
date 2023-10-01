import { InvokerBase } from './InvokerBase';
import { ChannelIncome, ReqError } from '../types';

import { FindIncomeByCurrencyNameQuery, FindIncomesQuery, GetIncomeByIdQuery } from '../../contracts/queries';
import { DeleteIncomeCommand, UpdateIncomeCommand, AddIncomeCommand } from '../../contracts/commands';

export class IncomeInvoker extends InvokerBase<ChannelIncome> {
  constructor() {
    super();
  }

  public find = async (
    params: FindIncomeByCurrencyNameQuery.Request,
  ): Promise<FindIncomeByCurrencyNameQuery.Response | Partial<ReqError>> => {
    return await this.invoker<
      FindIncomeByCurrencyNameQuery.Request,
      FindIncomeByCurrencyNameQuery.Response | Partial<ReqError>
    >(FindIncomeByCurrencyNameQuery.channel, params);
  };

  public findIncomes = async (
    params: FindIncomesQuery.Request,
  ): Promise<FindIncomesQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindIncomesQuery.Request, FindIncomesQuery.Response[] | Partial<ReqError>>(
      FindIncomesQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteIncomeCommand.Request,
  ): Promise<DeleteIncomeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteIncomeCommand.Request, DeleteIncomeCommand.Response | Partial<ReqError>>(
      DeleteIncomeCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateIncomeCommand.Request,
  ): Promise<UpdateIncomeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateIncomeCommand.Request, UpdateIncomeCommand.Response | Partial<ReqError>>(
      UpdateIncomeCommand.channel,
      params,
    );
  };

  public getIncomeById = async (
    params: GetIncomeByIdQuery.Request,
  ): Promise<GetIncomeByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetIncomeByIdQuery.Request, GetIncomeByIdQuery.Response | Partial<ReqError>>(
      GetIncomeByIdQuery.channel,
      params,
    );
  };

  public addIncome = async (
    params: AddIncomeCommand.Request,
  ): Promise<AddIncomeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddIncomeCommand.Request, AddIncomeCommand.Response | Partial<ReqError>>(
      AddIncomeCommand.channel,
      params,
    );
  };
}
