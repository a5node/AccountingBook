export const ConstantUser = {
  ADD_USER: 'add_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  FIND_USER: 'find_user',
  FIND_USERS: 'find_users',
  GET_USER_BY_ID: 'get_user_by_id',
} as const;

export type TypeUser = typeof ConstantUser;
export type ChannelUser = (typeof ConstantUser)[keyof typeof ConstantUser];
