/*** These types is used when you make an inclusion inside a contract.*/
export namespace IncludeType {
  export type PaymentType = boolean;
  export type BanksType = boolean;
  export type WorksType = boolean;
  export type ExpenditureType = boolean;
  export type HireDatesType = boolean;

  export type RolesType = { include: { role: boolean } };
  export type RolesIdType = { include: { role: { id: boolean } } };
  export type RolesNameType = { include: { role: { role: boolean } } };

  export type ProfileType = {
    include: {
      links: boolean;
    };
  };

  export type EmployeeType = {
    include: {
      payment: boolean;
      banks: boolean;
      hireDates: boolean;
      works: boolean;
      expenditure: boolean;
      income: boolean;
    };
  };
}
