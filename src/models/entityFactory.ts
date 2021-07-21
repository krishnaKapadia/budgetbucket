/** @format */
import moment from "moment";

import { Transaction, TransactionType } from "./transaction";
import { Account } from "./account";

/**
 * Responsible for the creation of base entities
 */
class EntityFactoryBase {
  /**
   * Creates an empty Transaction entity.
   * @param accountId the account that this transaction will be associated with.
   * @returns an empty Transaction.
   */
  createTransaction(accountId: string): Transaction {
    return {
      accountId,
      categoryId: undefined,
      note: undefined,
      date: moment().format("YYYY-MM-DD"),
      amount: undefined,
      recipient: undefined,
      type: TransactionType.Expense,
    };
  }

  /**
   * Creates an empty Account entity.
   * @param userId the user who owns this account.
   * @returns an empty Account.
   */
  createAccount(userId: string): Account {
    return {
      bank: undefined,
      name: undefined,
      userId,
      description: undefined,
      balance: undefined,
    };
  }
}

export const EntityFactory = new EntityFactoryBase();
