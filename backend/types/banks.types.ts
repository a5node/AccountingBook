export const ConstantBank = {
  CREATE_BANK: 'create_bank',
  UPDATE_BANK: 'update_bank',
  DELETE_BANK: 'delete_bank',
  GET_USER_BANKS: 'get_user_banks',
  ADD_USER_BANK: 'add_user_bank',
  REMOVE_USER_BANK: 'remove_user_bank',
} as const;

export type TypeBank = typeof ConstantBank;
export type ChannelBank = (typeof ConstantBank)[keyof typeof ConstantBank];
