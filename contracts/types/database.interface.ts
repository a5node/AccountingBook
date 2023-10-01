import {
  Roles,
  Employee,
  PaymentEmployee,
  Bank,
  HireDate,
  Work,
  Expenditure,
  LickProfile,
  Profile,
  Project,
  Income,
} from '@prisma/client';

/*** These types are used when you have made the selection or inclusion inside a contract.*/
export namespace DatabaseType {
  export type RoleType = { role: Roles };
  export type RoleIdType = { role: Roles['id'] };
  export type RoleNameType = { role: Roles['role'] };

  export type ProfileType = Profile & {
    links: LickProfile[];
  };

  export type EmployeeType = Employee & {
    payment: PaymentEmployee | null;
    hireDates: HireDate[];
    expenditure: Expenditure[];
    banks: Bank[];
    works: Work[];
    income: Income[];
  };

  export type ProjectType = Project & {
    workers: Work[];
  };
}
