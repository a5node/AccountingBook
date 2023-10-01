import type {
  // List types to the front into window
  SubscriptionController,
  UserInvoker,
  AuthInvoker,
  MenuInvoker,
  UtilInvoker,
  RolesInvoker,
  PositionsInvoker,
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
} from './backend/invokers';

declare global {
  // Added new params to Window interface
  interface Window {
    /*** Bridge with the `Electron api`.*/
    api: {
      menu: MenuInvoker;
      subscription: SubscriptionController;
      util: UtilInvoker;
      database: {
        auth: AuthInvoker;
        user: UserInvoker;
        roles: RolesInvoker;
        positions: PositionsInvoker;
        mainArea: MainAreaInvoker;
        links: LinksInvoker;
        hireDate: HireDateInvoker;
        paymentEmployees: PaymentEmployeeInvoker;
        project: ProjectInvoker;
        work: WorkInvoker;
        bank: BankInvoker;
        accounting: AccountingInvoker;
        income: IncomeInvoker;
        expenditure: ExpenditureInvoker;
        currency: CurrencyInvoker;
      };
    };
  }

  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';
      readonly ELECTRON_IS_DEV: string;
      readonly DATABASE_URL: string;
    }
  }
}
