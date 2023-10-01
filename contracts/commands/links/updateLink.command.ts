import { Prisma, LickProfile } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace UpdateLinkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'update_link';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Partial<Pick<LickProfile, 'name' | 'url'>> {
    name?: string;
    url?: string;
    id: LickProfile['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements LickProfile {
    url: string;
    name: string;
    profileId: number;
    id: number;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Omit<Request, 'role'>): Prisma.LickProfileWhereUniqueInput => {
    const payload: Prisma.LickProfileWhereUniqueInput = { id };
    return payload;
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name, url }: Omit<Request, 'id'>): Prisma.LickProfileUpdateInput => {
    const payload: Prisma.LickProfileUpdateInput = {};

    if (name) payload.name = name;
    if (url) payload.url = url;

    return payload;
  };
}
