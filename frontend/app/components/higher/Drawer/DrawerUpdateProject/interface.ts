import { Project } from '@prisma/client';

export interface ProjectForm {
  price?: Project['price'];
  hours?: Project['hours'];
  name?: Project['name'];
  customer?: Project['customer'];
  link?: Project['link'];
  repositoryUrl?: Project['repositoryUrl'];
  isEnd?: Project['isEnd'];
  isStart?: Project['isStart'];
  start?: Project['start'];
  end?: Project['end'];
  currencyName?: string;
}
