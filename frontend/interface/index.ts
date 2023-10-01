export * from './auth.interface';
export * from './contracts.types';

export type DeterminateType<T> = {
  [K in keyof T]: T[K];
};
