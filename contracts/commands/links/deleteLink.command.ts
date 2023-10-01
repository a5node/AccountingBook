import { Prisma, LickProfile } from '@prisma/client';

import { ChannelLinks } from '../../types';

export namespace DeleteLinkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelLinks = 'delete_link';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<LickProfile, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements LickProfile {
    url: string;
    name: string;
    profileId: number;
    id: number;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Pick<Request, 'id'>): Prisma.LickProfileDeleteArgs['where'] => {
    const payload: Prisma.LickProfileDeleteArgs['where'] = {
      id,
    };
    return payload;
  };
}
