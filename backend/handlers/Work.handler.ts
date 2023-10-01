import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelWork } from '../types';

import { FindWorkQuery, FindWorksQuery, GetWorkByIdQuery } from '../../contracts/queries';
import { DeleteWorkCommand, UpdateWorkCommand, AddWorkCommand } from '../../contracts/commands';

export class WorkHandler extends HandlerBase<ChannelWork> {
  private win: BrowserWindow;
  private work: Prisma.WorkDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'work_handler');
    this.win = win;
    if (this.db) this.work = this.db.work;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.work) return this.logger.error('The work database not found!');
    // list handlers
    this.handler<FindWorkQuery.Request, FindWorkQuery.Response | null>(FindWorkQuery.channel, this.find);
    this.handler<FindWorksQuery.Request, FindWorksQuery.Response[] | null>(FindWorksQuery.channel, this.findWorks);
    this.handler<AddWorkCommand.Request, AddWorkCommand.Response | null>(AddWorkCommand.channel, this.addWork);
    this.handler<UpdateWorkCommand.Request, UpdateWorkCommand.Response | null>(UpdateWorkCommand.channel, this.update);
    this.handler<DeleteWorkCommand.Request, DeleteWorkCommand.Response | null>(DeleteWorkCommand.channel, this.delete);
    this.handler<GetWorkByIdQuery.Request, GetWorkByIdQuery.Response | null>(
      GetWorkByIdQuery.channel,
      this.getWorkById,
    );
    //logger
    this.logger.message('Started work listeners.', 'green', '', 'yellow');
  };

  find = async (where: FindWorkQuery.Request): Promise<FindWorkQuery.Response | null> => {
    try {
      const work = await this.work.findUnique({
        where,
        include: FindWorkQuery.include,
      });
      return FindWorkQuery.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  findWorks = async (where: FindWorksQuery.Request): Promise<FindWorksQuery.Response[] | null> => {
    try {
      const work = await this.work.findMany({
        where,
        include: FindWorksQuery.include,
      });
      return FindWorksQuery.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: where };
      throw e;
    }
  };

  getWorkById = async (data: GetWorkByIdQuery.Request): Promise<GetWorkByIdQuery.Response | null> => {
    try {
      const work = await this.work.findUnique({
        where: { id: data.id },
        include: GetWorkByIdQuery.include,
      });

      return GetWorkByIdQuery.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async ({ id, ...data }: UpdateWorkCommand.Request): Promise<UpdateWorkCommand.Response | null> => {
    try {
      const work = await this.work.update({
        where: { id },
        data: UpdateWorkCommand.data(data),
        include: UpdateWorkCommand.include,
      });

      return UpdateWorkCommand.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data: { id, ...data } };
      throw e;
    }
  };

  delete = async (data: DeleteWorkCommand.Request): Promise<DeleteWorkCommand.Response | null> => {
    try {
      const work = await this.work.delete({ where: { id: data.id } });
      return DeleteWorkCommand.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  addWork = async (data: AddWorkCommand.Request): Promise<AddWorkCommand.Response | null> => {
    try {
      const work = await this.work.create({
        data: AddWorkCommand.data(data),
        include: AddWorkCommand.include,
      });

      return AddWorkCommand.filter(work);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
