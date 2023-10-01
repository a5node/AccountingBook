'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Session, Token } from '@interface/auth.interface';

export interface LocalDataStore {
  token: Token['token'];
}

export interface State {
  data: LocalDataStore;
}

export type Actions = {
  addToken: (token: Session['sessionToken']) => void;
  reset: () => void;
};

export type LocalState = State & Actions;

const BaseState: State = {
  data: {
    token: '',
  },
};

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addToken: (token: Session['sessionToken']): void => {
      return set(state => {
        if (token) state.data.token = token;
      });
    },
  }));

const persistOpt = {
  name: 'localStore',
  storage: createJSONStorage((): Storage => localStorage),
};

const store = create(persist(stateCreator(), persistOpt));

export const useLocalStore = (initProps?: Partial<State>): LocalState => {
  const state = useStore(store, state => state);
  if (initProps) {
    if (initProps.data?.token) state.addToken(initProps.data?.token);
  }

  return state;
};
