export const ConstantPositions = {
  CREATE_POSITION: 'create_position',
  UPDATE_POSITION: 'update_position',
  DELETE_POSITION: 'delete_position',
  FIND_MANY_POSITION: 'find_many_position',
  GET_EMPLOYEE_POSITIONS: 'get_employee_positions',
  GET_EMPLOYEES_POSITIONS: 'get_employees_positions',
  ADD_EMPLOYEE_POSITION: 'add_employee_position',
} as const;

export type TypePositions = typeof ConstantPositions;
export type ChannelPositions = (typeof ConstantPositions)[keyof typeof ConstantPositions];
