import * as ApiError from '../../contracts/types';
import type {
  FindUserQuery,
  GetUserByIdQuery,
  FindUsersQuery,
  SignInQuery,
  GetUserRolesQuery,
  GetUserByEmailQuery,
  GetEmployeeMainAreaQuery,
  GetEmployeePositionsQuery,
  GetEmployeesMainAreaQuery,
  GetEmployeesPositionsQuery,
  FindManyMainAreaQuery,
  FindManyPositionsQuery,
  FindManyRolesQuery,
  FindProjectQuery,
  FindProjectsQuery,
  GetProjectByIdQuery,
  FindWorkQuery,
  FindWorksQuery,
  GetWorkByIdQuery,
  FindAccountingByUserQuery,
  GetAccountingByIdQuery,
  FindCurrencyQuery,
  FindCurrencysQuery,
  GetCurrencyByIdQuery,
  FindExpenditureByCurrencyNameQuery,
  FindExpendituresQuery,
  GetExpenditureByIdQuery,
  FindIncomeByCurrencyNameQuery,
  FindIncomesQuery,
  GetIncomeByIdQuery,
  GetPaymentsEmployeesQuery,
  GetUserLinksQuery,
  GetUserBanksQuery,
  GetUserHireDateQuery,
} from '../../contracts/queries';
import type {
  CreateHireDateCommand,
  DeleteHireDateCommand,
  UpdateHireDateCommand,
  AddUserHireDateCommand,
  RemoveUserHireDateCommand,
  CreateBankCommand,
  DeleteBankCommand,
  UpdateBankCommand,
  AddUserBankCommand,
  RemoveUserBankCommand,
  UpdateLinkCommand,
  DeleteLinkCommand,
  CreateLinkCommand,
  AddUserLinkCommand,
  RemoveUserLinkCommand,
  CreatePaymentEmployeeCommand,
  DeletePaymentEmployeeCommand,
  UpdatePaymentEmployeeCommand,
  AddPaymentEmployeeCommand,
  RemovePaymentEmployeeCommand,
  DeleteProjectCommand,
  UpdateProjectCommand,
  AddProjectCommand,
  DeleteWorkCommand,
  UpdateWorkCommand,
  AddWorkCommand,
  DeleteExpenditureCommand,
  UpdateExpenditureCommand,
  AddExpenditureCommand,
  DeleteIncomeCommand,
  UpdateIncomeCommand,
  AddIncomeCommand,
  DeleteAccountingCommand,
  UpdateAccountingCommand,
  AddAccountingCommand,
  DeleteCurrencyCommand,
  UpdateCurrencyCommand,
  AddCurrencyCommand,
  AddUserCommand,
  DeleteUserCommand,
  UpdateUserCommand,
  CreateAdminCommand,
  CreateMainAreaCommand,
  CreatePositionCommand,
  CreateRoleCommand,
  AddUserRoleCommand,
  DeleteRolesCommand,
  UpdateRolesCommand,
  DeleteMainAreaCommand,
  DeletePositionCommand,
  UpdateMainAreaCommand,
  UpdatePositionCommand,
  AddEmployeeMainAreaCommand,
  AddEmployeePositionCommand,
  RemoveUserRoleCommand,
} from '../../contracts/commands';

export type ReqError = ApiError.ReqError;
// user
export type IAddUserReq = AddUserCommand.Request;
export type IAddUserRes = AddUserCommand.Response;
export type IGetUserReq = FindUserQuery.Request;
export type IGetUserRes = FindUserQuery.Response;
export type IGetUsersReq = FindUsersQuery.Request;
export type IGetUsersRes = FindUsersQuery.Response;
export type IGetUserByIdReq = GetUserByIdQuery.Request;
export type IGetUserByIdRes = GetUserByIdQuery.Response;
export type IDeleteUserByIdReq = DeleteUserCommand.Request;
export type IDeleteUserByIdRes = DeleteUserCommand.Response;
export type IUpdateUserByIdReq = UpdateUserCommand.Request;
export type IUpdateUserByIdRes = UpdateUserCommand.Response;
// auth
export type TGetUserByEmailQueryReq = GetUserByEmailQuery.Request;
export type TGetUserByEmailQueryRes = GetUserByEmailQuery.Response;
export type TSignInQueryReq = SignInQuery.Request;
export type TSignInQueryRes = SignInQuery.Response;
export type TCreateAdminCommandRes = CreateAdminCommand.Response;
export type TCreateAdminCommandReq = CreateAdminCommand.Request;

// role
export type TCreateRoleCommandRes = CreateRoleCommand.Response;
export type TCreateRoleCommandReq = CreateRoleCommand.Request;
export type TAddUserRoleCommandRes = AddUserRoleCommand.Response;
export type TAddUserRoleCommandReq = AddUserRoleCommand.Request;
export type TDeleteRolesCommandRes = DeleteRolesCommand.Response;
export type TDeleteRolesCommandReq = DeleteRolesCommand.Request;
export type TRemoveUserRoleCommandRes = RemoveUserRoleCommand.Response;
export type TRemoveUserRoleCommandReq = RemoveUserRoleCommand.Request;
export type TUpdateRolesCommandRes = UpdateRolesCommand.Response;
export type TUpdateRolesCommandReq = UpdateRolesCommand.Request;
export type TGetUserRolesQueryReq = GetUserRolesQuery.Request;
export type TGetUserRolesQueryRes = GetUserRolesQuery.Response;
export type TFindManyRolesQueryRes = FindManyRolesQuery.Response;
export type TFindManyRolesQueryReq = FindManyRolesQuery.Request;
// main area
export type TCreateMainAreaCommandRes = CreateMainAreaCommand.Response;
export type TCreateMainAreaCommandReq = CreateMainAreaCommand.Request;
export type TDeleteMainAreaCommandRes = DeleteMainAreaCommand.Response;
export type TDeleteMainAreaCommandReq = DeleteMainAreaCommand.Request;
export type TUpdateMainAreaCommandRes = UpdateMainAreaCommand.Response;
export type TUpdateMainAreaCommandReq = UpdateMainAreaCommand.Request;
export type TAddEmployeeMainAreaCommandRes = AddEmployeeMainAreaCommand.Response;
export type TAddEmployeeMainAreaCommandReq = AddEmployeeMainAreaCommand.Request;
export type TGetEmployeesMainAreaQueryReq = GetEmployeesMainAreaQuery.Request;
export type TGetEmployeesMainAreaQueryRes = GetEmployeesMainAreaQuery.Response;
export type TGetEmployeeMainAreaQueryReq = GetEmployeeMainAreaQuery.Request;
export type TGetEmployeeMainAreaQueryRes = GetEmployeeMainAreaQuery.Response;
export type TFindManyMainAreaQueryRes = FindManyMainAreaQuery.Response;
export type TFindManyMainAreaQueryReq = FindManyMainAreaQuery.Request;
// position
export type TGetEmployeePositionsQueryReq = GetEmployeePositionsQuery.Request;
export type TGetEmployeePositionsQueryRes = GetEmployeePositionsQuery.Response;
export type TGetEmployeesPositionsQueryReq = GetEmployeesPositionsQuery.Request;
export type TGetEmployeesPositionsQueryRes = GetEmployeesPositionsQuery.Response;
export type TAddEmployeePositionCommandRes = AddEmployeePositionCommand.Response;
export type TAddEmployeePositionCommandReq = AddEmployeePositionCommand.Request;
export type TCreatePositionCommandRes = CreatePositionCommand.Response;
export type TCreatePositionCommandReq = CreatePositionCommand.Request;
export type TDeletePositionCommandRes = DeletePositionCommand.Response;
export type TDeletePositionCommandReq = DeletePositionCommand.Request;
export type TUpdatePositionCommandRes = UpdatePositionCommand.Response;
export type TUpdatePositionCommandReq = UpdatePositionCommand.Request;
export type TFindManyPositionsQueryRes = FindManyPositionsQuery.Response;
export type TFindManyPositionsQueryReq = FindManyPositionsQuery.Request;
//link
export type TUpdateLinkCommandReq = UpdateLinkCommand.Request;
export type TUpdateLinkCommandRes = UpdateLinkCommand.Response;
export type TDeleteLinkCommandReq = DeleteLinkCommand.Request;
export type TDeleteLinkCommandRes = DeleteLinkCommand.Response;
export type TCreateLinkCommandReq = CreateLinkCommand.Request;
export type TCreateLinkCommandRes = CreateLinkCommand.Response;
export type TAddUserLinkCommandReq = AddUserLinkCommand.Request;
export type TAddUserLinkCommandRes = AddUserLinkCommand.Response;
export type TGetUserLinksQueryReq = GetUserLinksQuery.Request;
export type TGetUserLinksQueryRes = GetUserLinksQuery.Response;
export type TRemoveUserLinkCommandReq = RemoveUserLinkCommand.Request;
export type TRemoveUserLinkCommandRes = RemoveUserLinkCommand.Response;
//project
export type TAddProjectCommandReq = AddProjectCommand.Request;
export type TAddProjectCommandRes = AddProjectCommand.Response;
export type TDeleteProjectCommandReq = DeleteProjectCommand.Request;
export type TDeleteProjectCommandRes = DeleteProjectCommand.Response;
export type TUpdateProjectCommandReq = UpdateProjectCommand.Request;
export type TUpdateProjectCommandRes = UpdateProjectCommand.Response;
export type TGetProjectByIdQueryReq = GetProjectByIdQuery.Request;
export type TGetProjectByIdQueryRes = GetProjectByIdQuery.Response;
export type TFindProjectsQueryReq = FindProjectsQuery.Request;
export type TFindProjectsQueryRes = FindProjectsQuery.Response;
export type TFindProjectQueryReq = FindProjectQuery.Request;
export type TFindProjectQueryRes = FindProjectQuery.Response;
//work
export type TAddWorkCommandReq = AddWorkCommand.Request;
export type TAddWorkCommandRes = AddWorkCommand.Response;
export type TUpdateWorkCommandReq = UpdateWorkCommand.Request;
export type TUpdateWorkCommandRes = UpdateWorkCommand.Response;
export type TDeleteWorkCommandReq = DeleteWorkCommand.Request;
export type TDeleteWorkCommandRes = DeleteWorkCommand.Response;
export type TFindWorkQueryReq = FindWorkQuery.Request;
export type TFindWorkQueryRes = FindWorkQuery.Response;
export type TFindWorksQueryReq = FindWorksQuery.Request;
export type TFindWorksQueryRes = FindWorksQuery.Response;
export type TGetWorkByIdQueryReq = GetWorkByIdQuery.Request;
export type TGetWorkByIdQueryRes = GetWorkByIdQuery.Response;
//accounting
export type TDeleteAccountingCommandReq = DeleteAccountingCommand.Request;
export type TDeleteAccountingCommandRes = DeleteAccountingCommand.Response;
export type TUpdateAccountingCommandReq = UpdateAccountingCommand.Request;
export type TUpdateAccountingCommandRes = UpdateAccountingCommand.Response;
export type TAddAccountingCommandReq = AddAccountingCommand.Request;
export type TAddAccountingCommandRes = AddAccountingCommand.Response;
export type TFindAccountingByUserQueryReq = FindAccountingByUserQuery.Request;
export type TFindAccountingByUserQueryRes = FindAccountingByUserQuery.Response;
export type TGetAccountingByIdQueryReq = GetAccountingByIdQuery.Request;
export type TGetAccountingByIdQueryRes = GetAccountingByIdQuery.Response;
// currency
export type TDeleteCurrencyCommandReq = DeleteCurrencyCommand.Request;
export type TDeleteCurrencyCommandRes = DeleteCurrencyCommand.Response;
export type TUpdateCurrencyCommandReq = UpdateCurrencyCommand.Request;
export type TUpdateCurrencyCommandRes = UpdateCurrencyCommand.Response;
export type TAddCurrencyCommandReq = AddCurrencyCommand.Request;
export type TAddCurrencyCommandRes = AddCurrencyCommand.Response;
export type TFindCurrencyQueryReq = FindCurrencyQuery.Request;
export type TFindCurrencyQueryRes = FindCurrencyQuery.Response;
export type TFindCurrencysQueryReq = FindCurrencysQuery.Request;
export type TFindCurrencysQueryRes = FindCurrencysQuery.Response;
export type TGetCurrencyByIdQueryReq = GetCurrencyByIdQuery.Request;
export type TGetCurrencyByIdQueryRes = GetCurrencyByIdQuery.Response;
//expenditure
export type TDeleteExpenditureCommandReq = DeleteExpenditureCommand.Request;
export type TDeleteExpenditureCommandRes = DeleteExpenditureCommand.Response;
export type TUpdateExpenditureCommandReq = UpdateExpenditureCommand.Request;
export type TUpdateExpenditureCommandRes = UpdateExpenditureCommand.Response;
export type TAddExpenditureCommandReq = AddExpenditureCommand.Request;
export type TAddExpenditureCommandRes = AddExpenditureCommand.Response;
export type TFindExpenditureByCurrencyNameQueryReq = FindExpenditureByCurrencyNameQuery.Request;
export type TFindExpenditureByCurrencyNameQueryRes = FindExpenditureByCurrencyNameQuery.Response;
export type TFindExpendituresQueryReq = FindExpendituresQuery.Request;
export type TFindExpendituresQueryRes = FindExpendituresQuery.Response;
export type TGetExpenditureByIdQueryReq = GetExpenditureByIdQuery.Request;
export type TGetExpenditureByIdQueryRes = GetExpenditureByIdQuery.Response;
//income
export type TDeleteIncomeCommandReq = DeleteIncomeCommand.Request;
export type TDeleteIncomeCommandRes = DeleteIncomeCommand.Response;
export type TUpdateIncomeCommandReq = UpdateIncomeCommand.Request;
export type TUpdateIncomeCommandRes = UpdateIncomeCommand.Response;
export type TAddIncomeCommandReq = AddIncomeCommand.Request;
export type TAddIncomeCommandRes = AddIncomeCommand.Response;
export type TFindIncomeByCurrencyNameQueryReq = FindIncomeByCurrencyNameQuery.Request;
export type TFindIncomeByCurrencyNameQueryRes = FindIncomeByCurrencyNameQuery.Response;
export type TFindIncomesQueryReq = FindIncomesQuery.Request;
export type TFindIncomesQueryRes = FindIncomesQuery.Response;
export type TGetIncomeByIdQueryReq = GetIncomeByIdQuery.Request;
export type TGetIncomeByIdQueryRes = GetIncomeByIdQuery.Response;
//payment employee
export type TCreatePaymentEmployeeCommandReq = CreatePaymentEmployeeCommand.Request;
export type TCreatePaymentEmployeeCommandRes = CreatePaymentEmployeeCommand.Response;
export type TDeletePaymentEmployeeCommandReq = DeletePaymentEmployeeCommand.Request;
export type TDeletePaymentEmployeeCommandRes = DeletePaymentEmployeeCommand.Response;
export type TUpdatePaymentEmployeeCommandReq = UpdatePaymentEmployeeCommand.Request;
export type TUpdatePaymentEmployeeCommandRes = UpdatePaymentEmployeeCommand.Response;
export type TAddPaymentEmployeeCommandReq = AddPaymentEmployeeCommand.Request;
export type TAddPaymentEmployeeCommandRes = AddPaymentEmployeeCommand.Response;
export type TRemovePaymentEmployeeCommandReq = RemovePaymentEmployeeCommand.Request;
export type TRemovePaymentEmployeeCommandRes = RemovePaymentEmployeeCommand.Response;
export type TGetPaymentsEmployeesQueryReq = GetPaymentsEmployeesQuery.Request;
export type TGetPaymentsEmployeesQueryRes = GetPaymentsEmployeesQuery.Response;
//bank
export type TGetUserBanksQueryReq = GetUserBanksQuery.Request;
export type TGetUserBanksQueryRes = GetUserBanksQuery.Response;
export type TCreateBankCommandReq = CreateBankCommand.Request;
export type TCreateBankCommandRes = CreateBankCommand.Response;
export type TDeleteBankCommandReq = DeleteBankCommand.Request;
export type TDeleteBankCommandRes = DeleteBankCommand.Response;
export type TUpdateBankCommandReq = UpdateBankCommand.Request;
export type TUpdateBankCommandRes = UpdateBankCommand.Response;
export type TAddUserBankCommandReq = AddUserBankCommand.Request;
export type TAddUserBankCommandRes = AddUserBankCommand.Response;
export type TRemoveUserBankCommandReq = RemoveUserBankCommand.Request;
export type TRemoveUserBankCommandRes = RemoveUserBankCommand.Response;
// hire date
export type TGetUserHireDatesQueryReq = GetUserHireDateQuery.Request;
export type TGetUserHireDatesQueryRes = GetUserHireDateQuery.Response;
export type TCreateHireDateCommandReq = CreateHireDateCommand.Request;
export type TCreateHireDateCommandRes = CreateHireDateCommand.Response;
export type TAddUserHireDateCommandReq = AddUserHireDateCommand.Request;
export type TAddUserHireDateCommandRes = AddUserHireDateCommand.Response;
export type TDeleteHireDateCommandReq = DeleteHireDateCommand.Request;
export type TDeleteHireDateCommandRes = DeleteHireDateCommand.Response;
export type TUpdateHireDateCommandReq = UpdateHireDateCommand.Request;
export type TUpdateHireDateCommandRes = UpdateHireDateCommand.Response;
export type TRemoveUserHireDateCommandReq = RemoveUserHireDateCommand.Request;
export type TRemoveUserHireDateCommandRes = RemoveUserHireDateCommand.Response;
