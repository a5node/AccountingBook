import { InvokerBase } from './InvokerBase';
import { ChannelRoles, ReqError } from '../types';

import {
  UpdateRolesCommand,
  DeleteRolesCommand,
  CreateRoleCommand,
  AddUserRoleCommand,
  RemoveUserRoleCommand,
} from '../../contracts/commands';
import { GetUserRolesQuery, FindManyRolesQuery } from '../../contracts/queries';

export class RolesInvoker extends InvokerBase<ChannelRoles> {
  constructor() {
    super();
  }

  public findMany = async (): Promise<FindManyRolesQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindManyRolesQuery.Request, FindManyRolesQuery.Response[] | Partial<ReqError>>(
      FindManyRolesQuery.channel,
    );
  };

  public addUserRole = async (
    params: AddUserRoleCommand.Request,
  ): Promise<AddUserRoleCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddUserRoleCommand.Request, AddUserRoleCommand.Response | Partial<ReqError>>(
      AddUserRoleCommand.channel,
      params,
    );
  };

  public getUserRoles = async (
    params: GetUserRolesQuery.Request,
  ): Promise<GetUserRolesQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<GetUserRolesQuery.Request, GetUserRolesQuery.Response[] | Partial<ReqError>>(
      GetUserRolesQuery.channel,
      params,
    );
  };

  public removeUserRole = async (
    params: RemoveUserRoleCommand.Request,
  ): Promise<RemoveUserRoleCommand.Response | Partial<ReqError>> => {
    return await this.invoker<RemoveUserRoleCommand.Request, RemoveUserRoleCommand.Response | Partial<ReqError>>(
      RemoveUserRoleCommand.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteRolesCommand.Request,
  ): Promise<DeleteRolesCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteRolesCommand.Request, DeleteRolesCommand.Response | Partial<ReqError>>(
      DeleteRolesCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateRolesCommand.Request,
  ): Promise<UpdateRolesCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateRolesCommand.Request, UpdateRolesCommand.Response | Partial<ReqError>>(
      UpdateRolesCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreateRoleCommand.Request,
  ): Promise<CreateRoleCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateRoleCommand.Request, CreateRoleCommand.Response | Partial<ReqError>>(
      CreateRoleCommand.channel,
      params,
    );
  };
}
