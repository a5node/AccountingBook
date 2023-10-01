import { InvokerBase } from './InvokerBase';
import { ChannelProject, ReqError } from '../types';

import { FindProjectQuery, FindProjectsQuery, GetProjectByIdQuery } from '../../contracts/queries';
import { DeleteProjectCommand, UpdateProjectCommand, AddProjectCommand } from '../../contracts/commands';

export class ProjectInvoker extends InvokerBase<ChannelProject> {
  constructor() {
    super();
  }

  public find = async (params: FindProjectQuery.Request): Promise<FindProjectQuery.Response | Partial<ReqError>> => {
    return await this.invoker<FindProjectQuery.Request, FindProjectQuery.Response | Partial<ReqError>>(
      FindProjectQuery.channel,
      params,
    );
  };

  public findProjects = async (
    params: FindProjectsQuery.Request,
  ): Promise<FindProjectsQuery.Response[] | Partial<ReqError>> => {
    return await this.invoker<FindProjectsQuery.Request, FindProjectsQuery.Response[] | Partial<ReqError>>(
      FindProjectsQuery.channel,
      params,
    );
  };

  public delete = async (
    params: DeleteProjectCommand.Request,
  ): Promise<DeleteProjectCommand.Response | Partial<ReqError>> => {
    return await this.invoker<DeleteProjectCommand.Request, DeleteProjectCommand.Response | Partial<ReqError>>(
      DeleteProjectCommand.channel,
      params,
    );
  };

  public update = async (
    params: UpdateProjectCommand.Request,
  ): Promise<UpdateProjectCommand.Response | Partial<ReqError>> => {
    return await this.invoker<UpdateProjectCommand.Request, UpdateProjectCommand.Response | Partial<ReqError>>(
      UpdateProjectCommand.channel,
      params,
    );
  };

  public getProjectById = async (
    params: GetProjectByIdQuery.Request,
  ): Promise<GetProjectByIdQuery.Response | Partial<ReqError>> => {
    return await this.invoker<GetProjectByIdQuery.Request, GetProjectByIdQuery.Response | Partial<ReqError>>(
      GetProjectByIdQuery.channel,
      params,
    );
  };

  public addProject = async (
    params: AddProjectCommand.Request,
  ): Promise<AddProjectCommand.Response | Partial<ReqError>> => {
    return await this.invoker<AddProjectCommand.Request, AddProjectCommand.Response | Partial<ReqError>>(
      AddProjectCommand.channel,
      params,
    );
  };
}
