/*** These types is used when you make an selection inside a contract.*/
export namespace SelectType {
  export type RolesType = { select: { role: boolean } };
  export type RolesIdType = { select: { role: { id: boolean } } };
  export type RolesNameType = { select: { role: { role: boolean } } };
}
