import { Positions } from '@prisma/client';

import { ChannelPositions } from '../../types';

export namespace DeletePositionCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelPositions = 'delete_position';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Positions, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Positions {
    id: number;
    name: string;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): { id: Request['id'] } | null => {
    return { id };
  };
}
