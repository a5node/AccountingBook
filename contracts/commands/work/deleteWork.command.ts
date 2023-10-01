import { Work } from '@prisma/client';

import { ChannelWork } from '../../types';

export namespace DeleteWorkCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelWork = 'delete_work';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Work, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Work {
    id: Work['id'];
    employeeId: number;
    projectId: number;
    position: string;
    hours: number;
    rate: number;
    positionName: string;
    isWork: boolean;
    start: Date;
    end: Date | null;
  }

  /*** Filter response to `Client app` */
  export const filter = (data: Work | null): Response | null => {
    if (!data) return null;

    return data;
  };
}
