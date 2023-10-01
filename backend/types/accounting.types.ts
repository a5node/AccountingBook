export const ConstantAccounting = {
  ADD_ACCOUNTING: 'add_accounting',
  UPDATE_ACCOUNTING: 'update_accounting',
  DELETE_ACCOUNTING: 'delete_accounting',
  FIND_ACCOUNTING_BY_USER: 'find_accounting_by_user',
  GET_ACCOUNTING_BY_ID: 'get_accounting_by_id',
} as const;

export type TypeAccounting = typeof ConstantAccounting;
export type ChannelAccounting = (typeof ConstantAccounting)[keyof typeof ConstantAccounting];
