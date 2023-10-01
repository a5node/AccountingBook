import { Project, Work } from '@prisma/client';

export interface Props {
  project: Project & { workers: Work[] };
}
