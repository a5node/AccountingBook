import { Prisma, LickProfile, User } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace CreateLinkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'create_link';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    url: string;
    name: string;
    userId: User['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements LickProfile {
    url: string;
    name: string;
    profileId: number;
    id: number;
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    url: string;
    name: string;
    profileId: number;
    id: number;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ userId, name, url }: Request): Prisma.LickProfileCreateInput => {
    const payload: Prisma.LickProfileCreateInput = {
      url,
      name,
      profile: {
        connect: { userId },
      },
    };

    return payload;
  };
}
