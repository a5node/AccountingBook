import { Prisma, MainArea } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace CreateMainAreaCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'create_main_area';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.MainAreaCreateInput {
    name: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements MainArea {
    id: number;
    name: string;
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: number;
    name: string;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Request): Prisma.MainAreaCreateInput => {
    data.name = data.name.toLowerCase();
    return data;
  };
}
