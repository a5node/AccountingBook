import { User, LickProfile, Prisma } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace GetUserLinksQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'get_user_links';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    userId: User['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    links: LickProfile[];
  }

  /*** These values return from the database.*/
  export class Database {
    links: LickProfile[];
  }

  /*** These data should be selected in the response to the `Client app`. */
  export interface Select {
    link: boolean;
  }

  /*** These data should be selected in the response to the `Client app`. */
  export const select: Select = {
    link: true,
  };

  /*** Filter response to `Client app` */
  export const filter = (data: LickProfile[]): Response => {
    return { links: data };
  };

  /*** Use this function to search the database.*/
  export const where = ({ userId }: Request): Prisma.LickProfileFindManyArgs['where'] => {
    const payload: Prisma.LickProfileFindManyArgs['where'] = {
      profile: { userId },
    };
    return payload;
  };
}
