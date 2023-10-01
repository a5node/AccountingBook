import { Project } from '@prisma/client';

export interface AddProjectForm {
  name: Project['name'];
  customer: Project['customer'];
}
