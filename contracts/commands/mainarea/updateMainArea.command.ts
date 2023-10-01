import { MainArea, Prisma } from '@prisma/client';

import { ChannelMainArea } from '../../types';

export namespace UpdateMainAreaCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelMainArea = 'update_main_area';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Prisma.MainAreaUpdateInput {
    id: number;
    name: string;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements MainArea {
    id: number;
    name: string;
  }

  /*** Use this function to search the database.*/
  export const where = ({ id }: Request): { id: Request['id'] } => {
    return { id };
  };

  /*** Normalization the request of the data into `Electron app` for database.*/
  export const data = ({ name }: Request): Prisma.MainAreaUpdateInput => {
    return { name: name.toLowerCase() };
  };
}
