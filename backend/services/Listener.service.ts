import { App, BrowserWindow } from 'electron';

import { EventBrowserWindow } from '../events';
import {
  AuthHandler,
  MenuHandler,
  UserHandler,
  UtilHandler,
  RolesHandler,
  PositionsHandler,
  MainAreaHandler,
  LinksHandler,
  HireDateHandler,
  BankHandler,
  PaymentEmployeeHandler,
  ProjectHandler,
  WorkHandler,
  ExpenditureHandler,
  IncomeHandler,
  CurrencyHandler,
  AccountingHandler,
} from '../handlers';

export class ListenerService {
  private win: BrowserWindow;
  private app: App;

  constructor(win: BrowserWindow, app: App) {
    this.win = win;
    this.app = app;
  }

  listener = (): void => {
    this.events();
    this.handlers();
  };

  events = (): this => {
    new EventBrowserWindow(this.win, this.app).listener();
    return this;
  };

  handlers = (): this => {
    new MenuHandler(this.win).listener();
    new UtilHandler(this.win, this.app).listener();
    //db
    new AuthHandler(this.win, this.app).listener();

    new UserHandler(this.win, this.app).listener();
    new RolesHandler(this.win, this.app).listener();
    new PositionsHandler(this.win, this.app).listener();
    new MainAreaHandler(this.win, this.app).listener();
    new LinksHandler(this.win, this.app).listener();
    new HireDateHandler(this.win, this.app).listener();
    new BankHandler(this.win, this.app).listener();
    new PaymentEmployeeHandler(this.win, this.app).listener();
    new ProjectHandler(this.win, this.app).listener();
    new WorkHandler(this.win, this.app).listener();
    new AccountingHandler(this.win, this.app).listener();
    new IncomeHandler(this.win, this.app).listener();
    new ExpenditureHandler(this.win, this.app).listener();
    new CurrencyHandler(this.win, this.app).listener();

    return this;
  };
}
