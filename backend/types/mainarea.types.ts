export const ConstantMainArea = {
  CREATE_MAIN_AREA: 'create_main_area',
  UPDATE_MAIN_AREA: 'update_main_area',
  DELETE_MAIN_AREA: 'delete_main_area',
  FIND_MANY_MAIN_AREA: 'find_many_main_area',
  GET_EMPLOYEE_MAIN_AREAS: 'get_employee_main_areas',
  GET_EMPLOYEES_MAIN_AREAS: 'get_employees_main_areas',
  ADD_EMPLOYEE_MAIN_AREA: 'add_employee_main_area',
} as const;

export type TypeMainArea = typeof ConstantMainArea;
export type ChannelMainArea = (typeof ConstantMainArea)[keyof typeof ConstantMainArea];
