import { MainArea } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace DeleteMainAreaCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'delete_main_area';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<MainArea, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements MainArea {
    id: number;
    name: string;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): { id: Request['id'] } | null => {
    return { id };
  };
}
