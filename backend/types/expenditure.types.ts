export const ConstantExpenditure = {
  ADD_EXPENDITURE: 'add_expenditure',
  UPDATE_EXPENDITURE: 'update_expenditure',
  DELETE_EXPENDITURE: 'delete_expenditure',
  FIND_EXPENDITURES: 'find_expenditures',
  GET_EXPENDITURE_BY_ID: 'get_expenditure_by_id',
  FIND_EXPENDITURE_BY_CURRENCY_NAME: 'find_expenditure_by_currency_name',
} as const;

export type TypeExpenditure = typeof ConstantExpenditure;
export type ChannelExpenditure = (typeof ConstantExpenditure)[keyof typeof ConstantExpenditure];
