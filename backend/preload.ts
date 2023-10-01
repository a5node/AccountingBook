import { contextBridge } from 'electron';

import {
  UtilInvoker,
  RolesInvoker,
  PositionsInvoker,
  MenuInvoker,
  UserInvoker,
  Subscription,
  AuthInvoker,
  MainAreaInvoker,
  LinksInvoker,
  HireDateInvoker,
  PaymentEmployeeInvoker,
  ProjectInvoker,
  WorkInvoker,
  AccountingInvoker,
  ExpenditureInvoker,
  IncomeInvoker,
  CurrencyInvoker,
  BankInvoker,
} from './invokers';

if (contextBridge) {
  contextBridge.exposeInMainWorld('api', {
    menu: new MenuInvoker(),
    subscription: new Subscription(),
    util: new UtilInvoker(),
    database: {
      auth: new AuthInvoker(),
      user: new UserInvoker(),
      roles: new RolesInvoker(),
      positions: new PositionsInvoker(),
      mainArea: new MainAreaInvoker(),
      links: new LinksInvoker(),
      hireDate: new HireDateInvoker(),
      paymentEmployees: new PaymentEmployeeInvoker(),
      project: new ProjectInvoker(),
      work: new WorkInvoker(),
      bank: new BankInvoker(),
      accounting: new AccountingInvoker(),
      income: new IncomeInvoker(),
      expenditure: new ExpenditureInvoker(),
      currency: new CurrencyInvoker(),
    },
  });
}
