'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { IGetUsersRes } from '@interface/contracts.types';

export type UsersStore = IGetUsersRes[];

export interface State {
  users: UsersStore;
}

export type Actions = {
  addUsers: (users: State['users']) => void;
};

const BaseState: State = {
  users: [],
};
export type UsersState = State & Actions;

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUsers: (users: State['users']): void => {
      return set(state => {
        if (state.users) {
          if (Array.isArray(users)) state.users = [...state.users, ...users];
        }
      });
    },
  }));

export const storeUsers = create(stateCreator());

export const useUsersStore = (initProps?: Partial<State>): UsersState => {
  const state = useStore(storeUsers, state => state);
  if (initProps) {
    if (initProps.users) {
      state.addUsers(initProps.users);
    }
  }

  return state;
};
