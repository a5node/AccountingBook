export const ConstantProject = {
  ADD_PROJECT: 'add_project',
  UPDATE_PROJECT: 'update_project',
  DELETE_PROJECT: 'delete_project',
  FIND_PROJECT: 'find_project',
  FIND_PROJECTS: 'find_projects',
  GET_PROJECT_BY_ID: 'get_project_by_id',
} as const;

export type TypeProject = typeof ConstantProject;
export type ChannelProject = (typeof ConstantProject)[keyof typeof ConstantProject];
