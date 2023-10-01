import { Positions } from '@prisma/client';

import { ChannelPositions } from '../../types';

export namespace FindManyPositionsQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'find_many_position';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export type Request = undefined;

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Positions {
    id: number;
    name: string;
  }
}
