export const ConstantNamesPath = {
  DB: 'db',
  DB_COPY: 'dbCopy',
  DB_SCHEMA: 'dbSchema',
  DB_PRISMA: 'dbPrisma',
  ENV_FILE: 'envFile',
} as const;

export type TypeNamesDirPath = typeof ConstantNamesPath;
/*** Names of the storages.*/
export type FromAndTo = 'resources' | 'asar' | 'userDir' | 'appDir' | 'resolve' | 'appDirUnpacked' | 'fileDir';
/*** Names of the paths.*/
export type NamesPath = (typeof ConstantNamesPath)[keyof typeof ConstantNamesPath];
