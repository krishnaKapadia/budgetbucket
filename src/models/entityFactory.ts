/** @format */
import moment from "moment";

import { Transaction, TransactionType } from "./transaction";
import { Account } from "./account";

class EntityFactoryBase {
  currentOrderNumber: number;
  workspaceId: string;

  constructor() {
    this.currentOrderNumber = 100;
    this.workspaceId = "123abc321";
  }

  createTransaction(): Transaction {
    return {
      accountId: "8bc5c3ea-dedb-4fba-bc0d-57ff13868fcb",
      categoryId: undefined,
      note: undefined,
      date: moment().format("YYYY-MM-DD"),
      amount: undefined,
      recipient: undefined,
      type: TransactionType.Expense,
    };
  }

  createAccount(): Account {
    return {
      bank: undefined,
      name: undefined,
      userId: "ed238f4b-ca4e-4eca-ae66-7ec9fdce3e28",
      description: undefined,
      balance: undefined,
    };
  }
}

export const EntityFactory = new EntityFactoryBase();
