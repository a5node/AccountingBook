import { InvokerBase } from './InvokerBase';
import { ChannelPaymentEmployee, ReqError } from '../types';

import {
  CreatePaymentEmployeeCommand,
  DeletePaymentEmployeeCommand,
  UpdatePaymentEmployeeCommand,
  AddPaymentEmployeeCommand,
  RemovePaymentEmployeeCommand,
} from '../../contracts/commands';
import { GetPaymentsEmployeesQuery } from '../../contracts/queries';

export class PaymentEmployeeInvoker extends InvokerBase<ChannelPaymentEmployee> {
  constructor() {
    super();
  }

  public addPaymentEmployee = async (
    params: AddPaymentEmployeeCommand.Request,
  ): Promise<AddPaymentEmployeeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      AddPaymentEmployeeCommand.Request,
      AddPaymentEmployeeCommand.Response | Partial<ReqError>
    >(AddPaymentEmployeeCommand.channel, params);
  };

  public getPaymentEmployees = async (
    params: GetPaymentsEmployeesQuery.Request,
  ): Promise<GetPaymentsEmployeesQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<
      GetPaymentsEmployeesQuery.Request,
      GetPaymentsEmployeesQuery.Response[] | Partial<ReqError>
    >(GetPaymentsEmployeesQuery.channel, params);
  };

  public removePaymentEmployee = async (
    params: RemovePaymentEmployeeCommand.Request,
  ): Promise<RemovePaymentEmployeeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      RemovePaymentEmployeeCommand.Request,
      RemovePaymentEmployeeCommand.Response | Partial<ReqError>
    >(RemovePaymentEmployeeCommand.channel, params);
  };

  public delete = async (
    params: DeletePaymentEmployeeCommand.Request,
  ): Promise<DeletePaymentEmployeeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      DeletePaymentEmployeeCommand.Request,
      DeletePaymentEmployeeCommand.Response | Partial<ReqError>
    >(DeletePaymentEmployeeCommand.channel, params);
  };

  public update = async (
    params: UpdatePaymentEmployeeCommand.Request,
  ): Promise<UpdatePaymentEmployeeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      UpdatePaymentEmployeeCommand.Request,
      UpdatePaymentEmployeeCommand.Response | Partial<ReqError>
    >(UpdatePaymentEmployeeCommand.channel, params);
  };

  public create = async (
    params: CreatePaymentEmployeeCommand.Request,
  ): Promise<CreatePaymentEmployeeCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      CreatePaymentEmployeeCommand.Request,
      CreatePaymentEmployeeCommand.Response | Partial<ReqError>
    >(CreatePaymentEmployeeCommand.channel, params);
  };
}
