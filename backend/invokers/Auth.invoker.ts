import { InvokerBase } from './InvokerBase';
import { ChannelAuth, ReqError } from '../types';
import { CreateAdminCommand } from '../../contracts/commands';
import { GetUserByEmailQuery, SignInQuery } from '../../contracts/queries';

export class AuthInvoker extends InvokerBase<ChannelAuth> {
  constructor() {
    super();
  }

  public isAdmin = async (): Promise<boolean | Partial<ReqError>> => {
    return await this.invoker<undefined, boolean | Partial<ReqError>>('is_admin');
  };

  public signIn = async (data: SignInQuery.Request): Promise<SignInQuery.Response | Partial<ReqError>> => {
    return await this.invoker<SignInQuery.Request, SignInQuery.Response | Partial<ReqError>>(SignInQuery.channel, data);
  };

  public createAdmin = async (
    data: CreateAdminCommand.Request,
  ): Promise<CreateAdminCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateAdminCommand.Request, CreateAdminCommand.Response | Partial<ReqError>>(
      CreateAdminCommand.channel,
      data,
    );
  };

  public getUserByEmail = async (
    data: GetUserByEmailQuery.Request,
  ): Promise<GetUserByEmailQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetUserByEmailQuery.Request, GetUserByEmailQuery.Response | Partial<ReqError>>(
      GetUserByEmailQuery.channel,
      data,
    );
  };
}
