'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Roles, Profile } from '@prisma/client';

import { User } from '@interface/index';

export type UserStore = Pick<User, 'name' | 'image' | 'roles' | 'id' | 'email' | 'profile'>;

export interface State {
  user: UserStore;
}

export type Actions = {
  addUser: (user: Partial<State['user']>) => void;
  addRole: (role: Roles | Roles[]) => void;
  addProfile: (profile: Partial<Profile>) => void;
};

const BaseState: State = {
  user: {
    id: '',
    name: '',
    email: null,
    image: '',
    roles: [],
    profile: {
      id: 0,
      userId: 0,
      photo: null,
      email: null,
      phone: null,
      age: 0,
      name: null,
      patronymic: null,
      surname: null,
    },
  },
};
export type UserState = State & Actions;

export const stateCreator = (
  initProps?: Partial<State>,
): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,
    ...initProps,
    reset: (): void => set(BaseState),
    addUser: (user: Partial<State['user']>): void => {
      return set(state => {
        if (user.id) state.user.id = user.id;
        if (user.name) state.user.name = user.name;
        if (user.email) state.user.email = user.email;
        if (user.image) state.user.image = user.image;
        if (user.roles) state.user.roles = user.roles;
      });
    },
    addProfile: (profile: Partial<Profile>): void => {
      return set(state => {
        if (state.user.profile) {
          if (profile.id) state.user.profile.id = profile.id;
          if (profile.name) state.user.profile.name = profile.name;
          if (profile.email) state.user.profile.email = profile.email;
          if (profile.userId) state.user.profile.userId = profile.userId;
          if (profile.photo) state.user.profile.photo = profile.photo;
          if (profile.phone) state.user.profile.phone = profile.phone;
          if (profile.age) state.user.profile.age = profile.age;
          if (profile.patronymic) state.user.profile.patronymic = profile.patronymic;
          if (profile.surname) state.user.profile.surname = profile.surname;
        }
      });
    },
    addRole: (role: Roles | Roles[]): void => {
      return set(state => {
        if (state.user) {
          if (Array.isArray(role)) {
            if (state.user.roles) state.user.roles = [...state.user.roles, ...role];
            else state.user.roles = role;
          } else {
            if (state.user.roles) state.user.roles = [...state.user.roles, role];
            else state.user.roles = [role];
          }
        }
      });
    },
  }));

export const storeUser = create(stateCreator());

export const useUserStore = (initProps?: Partial<State>): UserState => {
  const state = useStore(storeUser, state => state);

  if (initProps) {
    if (initProps.user) {
      state.addUser(initProps.user);

      if (initProps.user.roles) state.addRole([...initProps.user.roles]);
      if (initProps.user.profile) state.addProfile(initProps.user.profile);
    }
  }

  return state;
};
