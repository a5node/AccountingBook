import { MainArea } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace FindManyMainAreaQuery {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'find_many_main_area';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export type Request = undefined;

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements MainArea {
    id: number;
    name: string;
  }
}
