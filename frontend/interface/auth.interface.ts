import { Roles, Profile } from '@prisma/client';

export interface User {
  id: string | number;
  name?: string;
  password?: string;
  email?: string | null;
  accessToken?: string;
  refreshToken?: string;
  image?: string | null;
  roles?: Roles[];
  profile?: Profile;
}

export interface Session {
  /** Generation when the user is logged in and save into the localStorage */
  sessionToken: string;
  /** Retrieval from the database and save into the sessionStorage */
  accessToken?: string;
  /** Retrieval from the database and save into the sessionStorage */
  refreshToken?: string;
  /** Retrieval from the database and save into the sessionStorage */
  user?: Partial<Omit<User, 'accessToken' | 'refreshToken' | 'sessions' | 'accounts'>>;
}

/*** It only receives this data. No save*/
export interface Token {
  /** Generation when the user is logged in */
  token?: Session['sessionToken'];
  /** Retrieval from the database. */
  accessToken?: Session['accessToken'];
  /** Retrieval from the database. */
  refreshToken?: Session['refreshToken'];
}
