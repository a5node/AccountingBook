export const ConstantRoles = {
  CREATE_ROLE: 'create_role',
  UPDATE_ROLE: 'update_role',
  DELETE_ROLE: 'delete_role',
  FIND_MANY_ROLES: 'find_many_roles',
  GET_USER_ROLES: 'get_user_roles',
  ADD_USER_ROLE: 'add_user_role',
  REMOVE_USER_ROLE: 'remove_user_role',
} as const;

export type TypeRoles = typeof ConstantRoles;
export type ChannelRoles = (typeof ConstantRoles)[keyof typeof ConstantRoles];
