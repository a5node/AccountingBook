import { InvokerBase } from './InvokerBase';
import { ChannelWork, ReqError } from '../types';

import { FindWorkQuery, FindWorksQuery, GetWorkByIdQuery } from '../../contracts/queries';
import { DeleteWorkCommand, UpdateWorkCommand, AddWorkCommand } from '../../contracts/commands';

export class WorkInvoker extends InvokerBase<ChannelWork> {
  constructor() {
    super();
  }

  public find = async (params: FindWorkQuery.Request): Promise<FindWorkQuery.Response | Partial<ReqError>> => {
    return await this.invoker<FindWorkQuery.Request, FindWorkQuery.Response | Partial<ReqError>>(
      FindWorkQuery.channel,
      params,
    );
  };

  public findWorks = async (params: FindWorksQuery.Request): Promise<FindWorksQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindWorksQuery.Request, FindWorksQuery.Response[] | Partial<ReqError>>(
      FindWorksQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteWorkCommand.Request,
  ): Promise<DeleteWorkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteWorkCommand.Request, DeleteWorkCommand.Response | Partial<ReqError>>(
      DeleteWorkCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateWorkCommand.Request,
  ): Promise<UpdateWorkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateWorkCommand.Request, UpdateWorkCommand.Response | Partial<ReqError>>(
      UpdateWorkCommand.channel,
      params,
    );
  };

  public getWorkById = async (
    params: GetWorkByIdQuery.Request,
  ): Promise<GetWorkByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetWorkByIdQuery.Request, GetWorkByIdQuery.Response | Partial<ReqError>>(
      GetWorkByIdQuery.channel,
      params,
    );
  };

  public addWork = async (params: AddWorkCommand.Request): Promise<AddWorkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddWorkCommand.Request, AddWorkCommand.Response | Partial<ReqError>>(
      AddWorkCommand.channel,
      params,
    );
  };
}
