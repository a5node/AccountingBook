export const ConstantLinks = {
  CREATE_LINK: 'create_link',
  UPDATE_LINK: 'update_link',
  DELETE_LINK: 'delete_link',
  GET_USER_LINKS: 'get_user_links',
  ADD_USER_LINK: 'add_user_link',
  REMOVE_USER_LINK: 'remove_user_link',
} as const;

export type TypeLinks = typeof ConstantLinks;
export type ChannelLinks = (typeof ConstantLinks)[keyof typeof ConstantLinks];
