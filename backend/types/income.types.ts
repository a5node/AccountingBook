export const ConstantIncome = {
  ADD_INCOME: 'add_income',
  UPDATE_INCOME: 'update_income',
  DELETE_INCOME: 'delete_income',
  FIND_INCOMES: 'find_incomes',
  GET_INCOME_BY_ID: 'get_income_by_id',
  FIND_INCOME_BY_CURRENCY_NAME: 'find_income_by_currency_name',
} as const;

export type TypeIncome = typeof ConstantIncome;
export type ChannelIncome = (typeof ConstantIncome)[keyof typeof ConstantIncome];
