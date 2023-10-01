export const ConstantWork = {
  ADD_WORK: 'add_work',
  UPDATE_WORK: 'update_work',
  DELETE_WORK: 'delete_work',
  FIND_WORK: 'find_work',
  FIND_WORKS: 'find_works',
  GET_WORK_BY_ID: 'get_work_by_id',
} as const;

export type TypeWork = typeof ConstantWork;
export type ChannelWork = (typeof ConstantWork)[keyof typeof ConstantWork];
