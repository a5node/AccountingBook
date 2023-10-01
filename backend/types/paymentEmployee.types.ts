export const ConstantPaymentEmployee = {
  CREATE_PAYMENT_EMPLOYEE: 'create_payment_employee',
  UPDATE_PAYMENT_EMPLOYEE: 'update_payment_employee',
  DELETE_PAYMENT_EMPLOYEE: 'delete_payment_employee',
  GET_USER_PAYMENT_EMPLOYEES: 'get_user_payment_employees',
  ADD_USER_PAYMENT_EMPLOYEE: 'add_user_payment_employee',
  REMOVE_USER_PAYMENT_EMPLOYEE: 'remove_user_payment_employee',
} as const;

export type TypePaymentEmployee = typeof ConstantPaymentEmployee;
export type ChannelPaymentEmployee = (typeof ConstantPaymentEmployee)[keyof typeof ConstantPaymentEmployee];
