'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Session, User } from '@interface/index';

export type UserSessionStore = Partial<Pick<User, 'email' | 'password' | 'name' | 'roles' | 'id'>>;
export interface SessionStore extends Omit<Session, 'user'> {
  user: UserSessionStore;
}

export interface State {
  session: SessionStore;
}

export type Actions = {
  addUser: (user: UserSessionStore) => void;
  createSession: (session: User) => void;
  addTokens: (tokens: Partial<Omit<SessionStore, 'user' | 'sessionToken'>>) => void;
  reset: () => void;
};
export type SessionState = State & Actions;

const baseUser: UserSessionStore = {
  name: '',
  email: '',
  password: '',
  id: 0,
  roles: [],
};

const BaseState: State = {
  session: { sessionToken: '', accessToken: '', refreshToken: '', user: baseUser },
};

const generateToken = async (): Promise<string> => {
  if (typeof window === 'undefined') return Date.now().toString();
  const token = await window?.api?.util?.generateToken();
  if (typeof token === 'string') return token;
  return '1';
};

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUser: (user: UserSessionStore): void => {
      return set(state => {
        if (user.name) state.session.user.name = user.name;
        if (user.email) state.session.user.email = user.email;
        if (user.password) state.session.user.password = user.password;
      });
    },
    createSession: async (data: Partial<User>): Promise<void> => {
      const sessionToken = await generateToken();
      const payload: State['session'] = {
        sessionToken,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        user: {
          id: data.id || 0,
          email: data.email,
          name: data.name,
          password: data.password,
          roles: data.roles,
        },
      };
      return set(state => {
        state.session = { ...state.session, ...payload };
      });
    },
    addTokens: (tokens: Partial<Omit<SessionStore, 'user' | 'sessionToken'>>): void => {
      return set(state => {
        if (tokens.accessToken) state.session.accessToken = tokens.accessToken;
        if (tokens.refreshToken) state.session.refreshToken = tokens.refreshToken;
      });
    },
  }));

const persistOpt = {
  name: 'sessionStore',
  storage: createJSONStorage(() => sessionStorage),
};

export const storeSession = create(persist(stateCreator(), persistOpt));

export const useSessionStore = (initProps?: Partial<State>): SessionState => {
  const state = useStore(storeSession, state => state);

  if (initProps) {
    if (initProps.session) {
      if (initProps.session.user) state.addUser(initProps.session.user);
      if (initProps.session.accessToken) {
        state.addTokens({ accessToken: initProps.session.accessToken });
      }
      if (initProps.session.refreshToken) {
        state.addTokens({
          refreshToken: initProps.session.refreshToken,
        });
      }
    }
  }

  return state;
};
