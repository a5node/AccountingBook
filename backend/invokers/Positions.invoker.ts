import { InvokerBase } from './InvokerBase';
import { ChannelPositions, ReqError } from '../types';

import {
  UpdatePositionCommand,
  DeletePositionCommand,
  CreatePositionCommand,
  AddEmployeePositionCommand,
} from '../../contracts/commands';
import { GetEmployeePositionsQuery, GetEmployeesPositionsQuery, FindManyPositionsQuery } from '../../contracts/queries';

export class PositionsInvoker extends InvokerBase<ChannelPositions> {
  constructor() {
    super();
  }

  public findMany = async (): Promise<FindManyPositionsQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindManyPositionsQuery.Request, FindManyPositionsQuery.Response[] | Partial<ReqError>>(
      FindManyPositionsQuery.channel,
    );
  };

  public getEmployeesPositions = async (
    params: GetEmployeesPositionsQuery.Request,
  ): Promise<GetEmployeesPositionsQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<
      GetEmployeesPositionsQuery.Request,
      GetEmployeesPositionsQuery.Response[] | Partial<ReqError>
    >(GetEmployeesPositionsQuery.channel, params);
  };

  public getEmployeePositions = async (
    params: GetEmployeePositionsQuery.Request,
  ): Promise<GetEmployeePositionsQuery.Response | Partial<ReqError>> => {
    return await this.invoker<
      GetEmployeePositionsQuery.Request,
      GetEmployeePositionsQuery.Response | Partial<ReqError>
    >(GetEmployeePositionsQuery.channel, params);
  };

  public addEmployeePosition = async (
    params: AddEmployeePositionCommand.Request,
  ): Promise<AddEmployeePositionCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      AddEmployeePositionCommand.Request,
      AddEmployeePositionCommand.Response | Partial<ReqError>
    >(AddEmployeePositionCommand.channel, params);
  };

  public delete = async (
    params: DeletePositionCommand.Request,
  ): Promise<DeletePositionCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeletePositionCommand.Request, DeletePositionCommand.Response | Partial<ReqError>>(
      DeletePositionCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdatePositionCommand.Request,
  ): Promise<UpdatePositionCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdatePositionCommand.Request, UpdatePositionCommand.Response | Partial<ReqError>>(
      UpdatePositionCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreatePositionCommand.Request,
  ): Promise<CreatePositionCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreatePositionCommand.Request, CreatePositionCommand.Response | Partial<ReqError>>(
      CreatePositionCommand.channel,
      params,
    );
  };
}
