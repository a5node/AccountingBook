import { InvokerBase } from './InvokerBase';
import { ChannelLinks, ReqError } from '../types';

import {
  UpdateLinkCommand,
  DeleteLinkCommand,
  CreateLinkCommand,
  AddUserLinkCommand,
  RemoveUserLinkCommand,
} from '../../contracts/commands';
import { GetUserLinksQuery } from '../../contracts/queries';

export class LinksInvoker extends InvokerBase<ChannelLinks> {
  constructor() {
    super();
  }

  public addUserLink = async (
    params: AddUserLinkCommand.Request,
  ): Promise<AddUserLinkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddUserLinkCommand.Request, AddUserLinkCommand.Response | Partial<ReqError>>(
      AddUserLinkCommand.channel,
      params,
    );
  };

  public getUserLinks = async (
    params: GetUserLinksQuery.Request,
  ): Promise<GetUserLinksQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<GetUserLinksQuery.Request, GetUserLinksQuery.Response[] | Partial<ReqError>>(
      GetUserLinksQuery.channel,
      params,
    );
  };

  public removeUserLink = async (
    params: RemoveUserLinkCommand.Request,
  ): Promise<RemoveUserLinkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<RemoveUserLinkCommand.Request, RemoveUserLinkCommand.Response | Partial<ReqError>>(
      RemoveUserLinkCommand.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteLinkCommand.Request,
  ): Promise<DeleteLinkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteLinkCommand.Request, DeleteLinkCommand.Response | Partial<ReqError>>(
      DeleteLinkCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateLinkCommand.Request,
  ): Promise<UpdateLinkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateLinkCommand.Request, UpdateLinkCommand.Response | Partial<ReqError>>(
      UpdateLinkCommand.channel,
      params,
    );
  };

  public create = async (
    params: CreateLinkCommand.Request,
  ): Promise<CreateLinkCommand.Response | Partial<ReqError>> => {
    return await this.invoker<CreateLinkCommand.Request, CreateLinkCommand.Response | Partial<ReqError>>(
      CreateLinkCommand.channel,
      params,
    );
  };
}
