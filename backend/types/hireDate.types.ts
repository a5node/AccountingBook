export const ConstantHireDate = {
  CREATE_HIRE_DATE: 'create_hire_date',
  UPDATE_HIRE_DATE: 'update_hire_date',
  DELETE_HIRE_DATE: 'delete_hire_date',
  GET_USER_HIRE_DATES: 'get_user_hire_dates',
  ADD_USER_HIRE_DATE: 'add_user_hire_date',
  REMOVE_USER_HIRE_DATE: 'remove_user_hire_date',
} as const;

export type TypeHireDate = typeof ConstantHireDate;
export type ChannelHireDate = (typeof ConstantHireDate)[keyof typeof ConstantHireDate];
