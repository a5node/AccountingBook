export interface AddExpenditureForm {
  description: string | null;
  value: number;
  currencyName: string;
  employee: string;
  project: string;
  createAt: Date;
}
