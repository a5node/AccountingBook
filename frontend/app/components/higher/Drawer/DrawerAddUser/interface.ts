import { Employee, Profile, User } from '@prisma/client';

export interface AddUserForm {
  name: Profile['name'];
  patronymic: NonNullable<Profile['patronymic']>;
  surname: NonNullable<Profile['surname']>;
  email: NonNullable<Profile['email']>;
  phone: NonNullable<Profile['phone']>;
  age: Profile['age'];
  //
  nick: User['name'];
  photo: NonNullable<Profile['photo']>;
  positionName: Employee['positionName'];
  cvUrl: string;
  //
  role: string;
  isHired: 'yes' | 'no';
  position: string;
  mainArea: string;
}
