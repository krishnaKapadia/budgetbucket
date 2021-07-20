/** @format */

export enum TransactionType {
  Expense = "0",
  Income = "1",
  Transfer = "2",
  Investment = "3",
  DirectDebit = "4",
  Other = "5",
}

export type Transaction = {
  id?: string;
  date: string;
  amount: number;
  categoryId: string;
  accountId: string;
  note: string;
  recipient: string;
  type: TransactionType;
};
