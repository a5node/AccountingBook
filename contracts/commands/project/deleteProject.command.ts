import { Project } from '@prisma/client';

import { ChannelProject } from '../../types';

export namespace DeleteProjectCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelProject = 'delete_project';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<Project, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Project {
    id: number;
    price: number;
    hours: number;
    name: string;
    customer: string;
    link: string | null;
    repositoryUrl: string | null;
    isEnd: boolean;
    isStart: boolean;
    createAt: Date;
    start: Date | null;
    end: Date | null;
  }

  /*** Filter response to `Client app` */
  export const filter = (data: Project | null): Response | null => {
    if (!data) return null;

    return data;
  };
}
