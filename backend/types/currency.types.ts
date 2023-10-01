export const ConstantCurrency = {
  ADD_CURRENCY: 'add_currency',
  UPDATE_CURRENCY: 'update_currency',
  DELETE_CURRENCY: 'delete_currency',
  FIND_CURRENCY: 'find_currency',
  FIND_CURRENCYS: 'find_currencys',
  GET_CURRENCY_BY_ID: 'get_currency_by_id',
} as const;

export type TypeCurrency = typeof ConstantCurrency;
export type ChannelCurrency = (typeof ConstantCurrency)[keyof typeof ConstantCurrency];
