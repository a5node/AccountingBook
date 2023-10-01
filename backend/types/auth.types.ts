export const ConstantAuth = {
  CREATE_USER: 'create_admin',
  GET_USER_BY_EMAIL: 'get_user_by_email',
  SIGN_IN: 'sign_in',
  IS_ADMIN: 'is_admin',
} as const;

export type TypeAuth = typeof ConstantAuth;
export type ChannelAuth = (typeof ConstantAuth)[keyof typeof ConstantAuth];
