export * from './user';
export * from './auth';
export * from './roles';
export * from './position';
export * from './mainarea';
export * from './links';
export * from './hiredate';
export * from './banks';
export * from './paymentEmployee';
export * from './project';
export * from './work';
export * from './accounting';
export * from './currency';
export * from './expenditure';
export * from './income';
// -------------------------------------------
// export namespace TemplateQuery {
//   /*** The channel that need to listen. between `Preload` and `Window` */
//   export const channel = '';

//   /*** These values must be send from `Client app` to `Electron app`.*/
//   export class Request {}

//   /*** These values must be returned from `Electron app` to `Client app`.*/
//   export class Response {}

//   /*** These values return from the database.*/
//   export class Database implements Response {}

//     /*** Use this function to search the database.*/
//   export const where = (where: Request): Request | null => {};

//   /*** These data should be selected in the response to the `Client app`. */
//   export interface Select: Prisma.[model from db]Select = {};
//   /*** These data should be selected in the response to the `Client app`. */
//   export const select: Select = {};

//    /*** These data should be included in the response to the `Client app`. */
//   export interface Include extends Prisma.[model from db]Include {}
//   /*** These data should be included in the response to the `Client app`. */
//   export const include: Include = {};

//   /*** Normalization the request of the data into `Electron app` for database.*/
//   export const data = (data: Omit<Request, 'id'>): Prisma.[model from db]UpdateInput => {}

//   /*** Filter response to `Client app` */
//   export const filter = (user: Database | null): Response | null => {};
// }
