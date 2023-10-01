import { InvokerBase } from './InvokerBase';
import { ChannelMainArea, ReqError } from '../types';

import {
  UpdateMainAreaCommand,
  DeleteMainAreaCommand,
  CreateMainAreaCommand,
  AddEmployeeMainAreaCommand,
} from '../../contracts/commands';
import { GetEmployeeMainAreaQuery, GetEmployeesMainAreaQuery, FindManyMainAreaQuery } from '../../contracts/queries';

export class MainAreaInvoker extends InvokerBase<ChannelMainArea> {
  constructor() {
    super();
  }

  public findMany = async (): Promise<FindManyMainAreaQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindManyMainAreaQuery.Request, FindManyMainAreaQuery.Response[] | Partial<ReqError>>(
      FindManyMainAreaQuery.channel,
    );
  };

  public getEmployeesMainAreas = async (
    params: GetEmployeesMainAreaQuery.Request,
  ): Promise<GetEmployeesMainAreaQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<
      GetEmployeesMainAreaQuery.Request,
      GetEmployeesMainAreaQuery.Response[] | Partial<ReqError>
    >(GetEmployeesMainAreaQuery.channel, params);
  };

  public getEmployeeMainAreas = async (
    params: GetEmployeeMainAreaQuery.Request,
  ): Promise<GetEmployeeMainAreaQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetEmployeeMainAreaQuery.Request, GetEmployeeMainAreaQuery.Response | Partial<ReqError>>(
      GetEmployeeMainAreaQuery.channel,
      params,
    );
  };

  public addEmployeeMainArea = async (
    params: AddEmployeeMainAreaCommand.Request,
  ): Promise<AddEmployeeMainAreaCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      AddEmployeeMainAreaCommand.Request,
      AddEmployeeMainAreaCommand.Response | Partial<ReqError>
    >(AddEmployeeMainAreaCommand.channel, params);
  };

  public delete = async (
    params: DeleteMainAreaCommand.Request,
  ): Promise<DeleteMainAreaCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteMainAreaCommand.Request, DeleteMainAreaCommand.Response | Partial<ReqError>>(
      DeleteMainAreaCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateMainAreaCommand.Request,
  ): Promise<UpdateMainAreaCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateMainAreaCommand.Request, UpdateMainAreaCommand.Response | Partial<ReqError>>(
      UpdateMainAreaCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreateMainAreaCommand.Request,
  ): Promise<CreateMainAreaCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateMainAreaCommand.Request, CreateMainAreaCommand.Response | Partial<ReqError>>(
      CreateMainAreaCommand.channel,
      params,
    );
  };
}
