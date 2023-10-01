import { Prisma } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace AddUserLinkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'add_user_link';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request {
    userId: number;
    url: string;
    name: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response {
    success: boolean;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name, url, userId }: Request): Prisma.LickProfileCreateArgs['data'] => {
    const payload: Prisma.LickProfileCreateArgs['data'] = {
      name,
      url,
      profile: { connect: { userId } },
    };

    return payload;
  };
}
