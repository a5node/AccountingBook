import { User } from '@prisma/client';

import { ChannelUser } from '../../types';

export namespace DeleteUserCommand {
  /*** The channel that need to listen. between `Preload` and `Window` */
  export const channel: ChannelUser = 'delete_user';

  /*** These values must be send from `Client app` to `Electron app`.*/
  export class Request implements Pick<User, 'id'> {
    id: number;
  }

  /*** These values must be returned from `Electron app` to `Client app`.*/
  export class Response implements Omit<User, 'password'> {
    id: number;
    name: string;
    email: string | null;
    image: string | null;
  }

  /*** Filter response to `Client app` */
  export const filter = (user: User | null): Response | null => {
    if (!user) return null;

    const filterUser = { ...user, password: undefined };
    delete filterUser.password;
    return filterUser;
  };
}
