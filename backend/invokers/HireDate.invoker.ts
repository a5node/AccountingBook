import { InvokerBase } from './InvokerBase';
import { ChannelHireDate, ReqError } from '../types';

import {
  CreateHireDateCommand,
  DeleteHireDateCommand,
  UpdateHireDateCommand,
  AddUserHireDateCommand,
  RemoveUserHireDateCommand,
} from '../../contracts/commands';
import { GetUserHireDateQuery } from '../../contracts/queries';

export class HireDateInvoker extends InvokerBase<ChannelHireDate> {
  constructor() {
    super();
  }

  public addUserHireDate = async (
    params: AddUserHireDateCommand.Request,
  ): Promise<AddUserHireDateCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddUserHireDateCommand.Request, AddUserHireDateCommand.Response | Partial<ReqError>>(
      AddUserHireDateCommand.channel,
      params,
    );
  };

  public getUserHireDates = async (
    params: GetUserHireDateQuery.Request,
  ): Promise<GetUserHireDateQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetUserHireDateQuery.Request, GetUserHireDateQuery.Response | Partial<ReqError>>(
      GetUserHireDateQuery.channel,
      params,
    );
  };

  public removeUserHireDate = async (
    params: RemoveUserHireDateCommand.Request,
  ): Promise<RemoveUserHireDateCommand.Response | Partial<ReqError>> => {
    return await this.invoker<
      RemoveUserHireDateCommand.Request,
      RemoveUserHireDateCommand.Response | Partial<ReqError>
    >(RemoveUserHireDateCommand.channel, params);
  };

  public delete = async (
    params: DeleteHireDateCommand.Request,
  ): Promise<DeleteHireDateCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteHireDateCommand.Request, DeleteHireDateCommand.Response | Partial<ReqError>>(
      DeleteHireDateCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateHireDateCommand.Request,
  ): Promise<UpdateHireDateCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateHireDateCommand.Request, UpdateHireDateCommand.Response | Partial<ReqError>>(
      UpdateHireDateCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreateHireDateCommand.Request,
  ): Promise<CreateHireDateCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateHireDateCommand.Request, CreateHireDateCommand.Response | Partial<ReqError>>(
      CreateHireDateCommand.channel,
      params,
    );
  };
}
