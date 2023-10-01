import { InvokerBase } from './InvokerBase';
import { ChannelUser, ReqError } from '../types';

import { FindUserQuery, FindUsersQuery, GetUserByIdQuery } from '../../contracts/queries';
import { DeleteUserCommand, UpdateUserCommand, AddUserCommand } from '../../contracts/commands';

export class UserInvoker extends InvokerBase<ChannelUser> {
  constructor() {
    super();
  }

  public find = async (params: FindUserQuery.Request): Promise<FindUserQuery.Response | Partial<ReqError>> => {
    return await this.invoker<FindUserQuery.Request, FindUserQuery.Response | Partial<ReqError>>(
      FindUserQuery.channel,
      params,
    );
  };

  public findUsers = async (params: FindUsersQuery.Request): Promise<FindUsersQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindUsersQuery.Request, FindUsersQuery.Response[] | Partial<ReqError>>(
      FindUsersQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteUserCommand.Request,
  ): Promise<DeleteUserCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteUserCommand.Request, DeleteUserCommand.Response | Partial<ReqError>>(
      DeleteUserCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateUserCommand.Request,
  ): Promise<UpdateUserCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateUserCommand.Request, UpdateUserCommand.Response | Partial<ReqError>>(
      UpdateUserCommand.channel,
      params,
    );
  };

  public getUserById = async (
    params: GetUserByIdQuery.Request,
  ): Promise<GetUserByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetUserByIdQuery.Request, GetUserByIdQuery.Response | Partial<ReqError>>(
      GetUserByIdQuery.channel,
      params,
    );
  };

  public addUser = async (params: AddUserCommand.Request): Promise<AddUserCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddUserCommand.Request, AddUserCommand.Response | Partial<ReqError>>(
      AddUserCommand.channel,
      params,
    );
  };
}
