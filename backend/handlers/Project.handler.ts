import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelProject } from '../types';

import { FindProjectQuery, FindProjectsQuery, GetProjectByIdQuery } from '../../contracts/queries';
import { DeleteProjectCommand, UpdateProjectCommand, AddProjectCommand } from '../../contracts/commands';

export class ProjectHandler extends HandlerBase<ChannelProject> {
  private win: BrowserWindow;
  private project: Prisma.ProjectDelegate;
  private currency: Prisma.CurrencyDelegate;
  private userRoles: Prisma.UserRolesDelegate;
  constructor(win: BrowserWindow, app: App) {
    super(app, 'project_handler');
    this.win = win;
    if (this.db) this.project = this.db.project;
    if (this.db) this.currency = this.db.currency;
    if (this.db) this.userRoles = this.db.userRoles;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.project) return this.logger.error('The project database not found!');
    if (!this.currency) return this.logger.error('The currency database not found!');
    // list handlers
    this.handler<FindProjectQuery.Request, FindProjectQuery.Response | null>(FindProjectQuery.channel, this.find);
    this.handler<FindProjectsQuery.Request, FindProjectsQuery.Response[] | null>(
      FindProjectsQuery.channel,
      this.findProjects,
    );
    this.handler<AddProjectCommand.Request, AddProjectCommand.Response | null>(
      AddProjectCommand.channel,
      this.addProject,
    );
    this.handler<UpdateProjectCommand.Request, UpdateProjectCommand.Response | null>(
      UpdateProjectCommand.channel,
      this.update,
    );
    this.handler<DeleteProjectCommand.Request, DeleteProjectCommand.Response | null>(
      DeleteProjectCommand.channel,
      this.delete,
    );
    this.handler<GetProjectByIdQuery.Request, GetProjectByIdQuery.Response | null>(
      GetProjectByIdQuery.channel,
      this.getProjectById,
    );
    //logger
    this.logger.message('Started project listeners.', 'green', '', 'yellow');
  };

  find = async (where: FindProjectQuery.Request): Promise<FindProjectQuery.Response | null> => {
    try {
      const project = await this.project.findUnique({
        where,
        include: FindProjectQuery.include,
      });
      return FindProjectQuery.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  findProjects = async (where: FindProjectsQuery.Request): Promise<FindProjectsQuery.Response[] | null> => {
    try {
      const project = await this.project.findMany({
        where,
        include: FindProjectsQuery.include,
      });
      return FindProjectsQuery.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  getProjectById = async (data: GetProjectByIdQuery.Request): Promise<GetProjectByIdQuery.Response | null> => {
    try {
      const project = await this.project.findUnique({
        where: { id: data.id },
        include: GetProjectByIdQuery.include,
      });

      return GetProjectByIdQuery.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateProjectCommand.Request): Promise<UpdateProjectCommand.Response | null> => {
    try {
      const findProject = await this.project.findUnique({ where: UpdateProjectCommand.where(data) });

      if (!findProject) return UpdateProjectCommand.filter(findProject);

      const project = await this.project.update({
        where: UpdateProjectCommand.where(data),
        data: UpdateProjectCommand.data(findProject, data),
        include: UpdateProjectCommand.include,
      });

      if (data.currencyId && data.price) {
        const currency = await this.currency.findUnique({
          where: UpdateProjectCommand.currencyFindUnique(data),
        });
        if (currency) {
          await this.currency.update({
            where: UpdateProjectCommand.currencyFindUnique(data),
            data: UpdateProjectCommand.currencyUpdate(data, project, currency),
          });
        }
      }

      return UpdateProjectCommand.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteProjectCommand.Request): Promise<DeleteProjectCommand.Response | null> => {
    try {
      const project = await this.project.delete({ where: { id: data.id } });
      return DeleteProjectCommand.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addProject = async (data: AddProjectCommand.Request): Promise<AddProjectCommand.Response | null> => {
    try {
      const user = await this.userRoles.findFirst({
        where: { role: { role: 'ADMIN' } },
        select: { userId: true },
      });

      const project = await this.project.create({
        data: AddProjectCommand.data(data, user),
        include: AddProjectCommand.include,
      });

      return AddProjectCommand.filter(project);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
