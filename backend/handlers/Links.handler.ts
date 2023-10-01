import { App, BrowserWindow } from 'electron';
import { Prisma } from '@prisma/client';

import { HandlerBase } from './HandlerBase';
import { ChannelLinks } from '../types';
import {
  UpdateLinkCommand,
  DeleteLinkCommand,
  CreateLinkCommand,
  AddUserLinkCommand,
  RemoveUserLinkCommand,
} from '../../contracts/commands';
import { GetUserLinksQuery } from '../../contracts/queries';

export class LinksHandler extends HandlerBase<ChannelLinks> {
  private win: BrowserWindow;
  private links: Prisma.LickProfileDelegate;

  constructor(win: BrowserWindow, app: App) {
    super(app, 'user_links_handler');
    this.win = win;
    if (this.db) this.links = this.db.lickProfile;
  }

  public listener = (): void => {
    if (!this.win) return this.logger.error('Window not found!');
    if (!this.db) return this.logger.error('Database not found!');
    if (!this.links) return this.logger.error('The links database not found!');

    this.handler<CreateLinkCommand.Request, CreateLinkCommand.Response>(CreateLinkCommand.channel, this.create);
    this.handler<DeleteLinkCommand.Request, DeleteLinkCommand.Response>(DeleteLinkCommand.channel, this.delete);
    this.handler<AddUserLinkCommand.Request, AddUserLinkCommand.Response | null>(
      AddUserLinkCommand.channel,
      this.addUserLink,
    );
    this.handler<GetUserLinksQuery.Request, GetUserLinksQuery.Response | null>(
      GetUserLinksQuery.channel,
      this.getUserLinks,
    );
    this.handler<RemoveUserLinkCommand.Request, RemoveUserLinkCommand.Response | null>(
      RemoveUserLinkCommand.channel,
      this.removeUserLink,
    );
    this.handler<UpdateLinkCommand.Request, UpdateLinkCommand.Response | null>(UpdateLinkCommand.channel, this.update);

    this.logger.message('Started roles listeners.', 'green', '', 'yellow');
  };

  addUserLink = async (data: AddUserLinkCommand.Request): Promise<AddUserLinkCommand.Response | null> => {
    try {
      const links = await this.links.create({
        data: AddUserLinkCommand.data(data),
      });
      if (links.id) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  getUserLinks = async (data: GetUserLinksQuery.Request): Promise<GetUserLinksQuery.Response | null> => {
    try {
      const links = await this.links.findMany({
        where: GetUserLinksQuery.where(data),
      });

      return GetUserLinksQuery.filter(links);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  removeUserLink = async (data: RemoveUserLinkCommand.Request): Promise<RemoveUserLinkCommand.Response> => {
    try {
      const links = await this.links.delete({
        where: RemoveUserLinkCommand.where(data),
      });

      if (links) return { success: true };
      return { success: false };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  create = async (data: CreateLinkCommand.Request): Promise<CreateLinkCommand.Response> => {
    try {
      return await this.links.create({
        data: CreateLinkCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  update = async (data: UpdateLinkCommand.Request): Promise<UpdateLinkCommand.Response | null> => {
    try {
      return this.links.update({
        where: UpdateLinkCommand.where(data),
        data: UpdateLinkCommand.data(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };

  delete = async (data: DeleteLinkCommand.Request): Promise<DeleteLinkCommand.Response> => {
    try {
      return await this.links.delete({
        where: DeleteLinkCommand.where(data),
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) e.meta = { ...e.meta, data };
      throw e;
    }
  };
}
