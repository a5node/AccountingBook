'use client';
import { StateCreator, create, useStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface State {
  ids: {
    candidateId: number | null;
    employeeId: number | null;
    personId: number | null;
    projectId: number | null;
  };
}

export interface idsHandler {
  add: (id: number) => void;
  remove: () => void;
}

export type Actions = {
  setCandidateId: idsHandler;
  setEmployeeId: idsHandler;
  setPersonId: idsHandler;
  setProjectId: idsHandler;
};

export const ids = (
  set: (
    state: (State & Actions) | Partial<State & Actions> | ((state: State & Actions) => void),
    shouldReplace?: boolean | undefined,
  ) => void,
  name: keyof State['ids'],
): idsHandler => {
  const fns: idsHandler = {
    add: (id: number): void => {
      return set(state => {
        state.ids[name] = id;
      });
    },
    remove: (): void => {
      return set(state => {
        state.ids[name] = null;
      });
    },
  };
  return fns;
};

export type IdsState = State & Actions;

const BaseState: State = {
  ids: {
    candidateId: null,
    employeeId: null,
    personId: null,
    projectId: null,
  },
};

export const stateCreator = (): StateCreator<State & Actions, [], [['zustand/immer', never]]> =>
  immer<State & Actions>(set => ({
    ...BaseState,

    reset: (): void => set(BaseState),

    setCandidateId: ids(set, 'candidateId'),
    setEmployeeId: ids(set, 'employeeId'),
    setPersonId: ids(set, 'personId'),
    setProjectId: ids(set, 'projectId'),
  }));

export const storeIds = create(stateCreator());

export const useIdsStore = (): IdsState => {
  const state = useStore(storeIds, state => state);
  return state;
};
