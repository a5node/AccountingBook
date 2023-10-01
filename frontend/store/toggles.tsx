'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface State {
  toggles: {
    reloadRoles: boolean;
    reloadPosition: boolean;
    reloadMainArea: boolean;
    reloadProject: boolean;
    reloadEmployee: boolean;
    reloadUser: boolean;
    reloadUsers: boolean;
    reloadProjects: boolean;
    reloadAccounting: boolean;
    reloadCurrencies: boolean;
    reloadIncome: boolean;
    reloadExp: boolean;
  };
}

export interface ToggleBoolean {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export type Actions = {
  setReloadRoles: ToggleBoolean;
  setReloadPosition: ToggleBoolean;
  setReloadMainArea: ToggleBoolean;
  setReloadEmployee: ToggleBoolean;
  setReloadProject: ToggleBoolean;
  setReloadUser: ToggleBoolean;
  setReloadProjects: ToggleBoolean;
  setReloadUsers: ToggleBoolean;
  setReloadAccounting: ToggleBoolean;
  setReloadCurrencies: ToggleBoolean;
  setReloadIncome: ToggleBoolean;
  setReloadExp: ToggleBoolean;
};

export const toggle = (
  set: (
    state: (State & Actions) | Partial<State & Actions> | ((state: State & Actions) => void),
    shouldReplace?: boolean | undefined,
  ) => void,
  name: keyof State['toggles'],
): ToggleBoolean => {
  const fns: ToggleBoolean = {
    on: (): void => {
      return set(state => {
        state.toggles[name] = true;
      });
    },
    off: (): void => {
      return set(state => {
        state.toggles[name] = false;
      });
    },
    toggle: (): void => {
      return set(state => {
        state.toggles[name] = !state.toggles[name];
      });
    },
  };
  return fns;
};

export type ToggleState = State & Actions;

const BaseState: State = {
  toggles: {
    reloadRoles: false,
    reloadPosition: false,
    reloadMainArea: false,
    reloadProject: false,
    reloadEmployee: false,
    reloadUser: false,
    reloadUsers: false,
    reloadProjects: false,
    reloadAccounting: false,
    reloadCurrencies: false,
    reloadIncome: false,
    reloadExp: false
  },
};

export const stateCreator = (): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,

    reset: (): void => set(BaseState),

    setReloadRoles: toggle(set, 'reloadRoles'),
    setReloadPosition: toggle(set, 'reloadPosition'),
    setReloadMainArea: toggle(set, 'reloadMainArea'),
    setReloadEmployee: toggle(set, 'reloadEmployee'),
    setReloadUser: toggle(set, 'reloadUser'),
    setReloadProject: toggle(set, 'reloadProject'),
    setReloadUsers: toggle(set, 'reloadUsers'),
    setReloadProjects: toggle(set, 'reloadProjects'),
    setReloadAccounting: toggle(set, 'reloadAccounting'),
    setReloadCurrencies: toggle(set, 'reloadCurrencies'),
    setReloadIncome: toggle(set, "reloadIncome"),
    setReloadExp: toggle(set, 'reloadExp'),
  }));

export const storeToggle = create(stateCreator());

export const useToggleStore = (): ToggleState => {
  const state = useStore(storeToggle, state => state);
  return state;
};
