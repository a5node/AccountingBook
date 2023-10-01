import { Positions, Prisma } from '@prisma/client';

import { ChannelPositions } from '../../types';

export namespace UpdatePositionCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'update_position';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.PositionsUpdateInput {
    id: number;
    name: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Positions {
    id: number;
    name: string;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): { id: Request['id'] } => {
    return { id };
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name }: Request): Prisma.PositionsUpdateInput => {
    return { name: name.toLowerCase() };
  };
}
