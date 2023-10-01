import { Prisma, Positions } from '@prisma/client';

import { ChannelPositions } from '../../types';

export namespace CreatePositionCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'create_position';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.PositionsCreateInput {
    name: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Positions {
    id: number;
    name: string;
  }

  /*** These values return from the database.*/
  export class Database implements Response {
    id: number;
    name: string;
  }

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = (data: Request): Prisma.PositionsCreateInput => {
    data.name = data.name.toLowerCase();
    return data;
  };
}
