import { Prisma, User, LickProfile } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace RemoveUserLinkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'remove_user_link';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    id: LickProfile['id'];
    userId: User['id'];
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id, userId }: Request): Prisma.LickProfileDeleteArgs['where'] => {
    const payload: Prisma.LickProfileDeleteArgs['where'] = {
      id,
      profile: { userId },
    };
    return payload;
  };
}
