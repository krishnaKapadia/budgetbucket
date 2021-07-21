/** @format */
import React, { FunctionComponent, useState, useEffect } from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  Input,
  Select,
  Textarea,
} from "@windmill/react-ui";
import swal from "sweetalert";
import currency from "currency.js";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import * as CurrencyFormat from "react-currency-format";

import * as Api from "../../../../api";
import * as Models from "../../../../models";
import { RootState } from "../../../store";
import { ModalProps } from "../models";

type Props = ModalProps;

export const AddTransactionModal: FunctionComponent<Props> = ({
  closeModal,
  isOpen,
}) => {
  const queryClient = useQueryClient();
  const accountId = useSelector(
    (state: RootState) => state.accountsPage.activeAccount?.id
  );

  const [transaction, updateTransaction] = useState(
    Models.EntityFactory.createTransaction()
  );

  const transactionMutation = useMutation(
    (transaction: Models.Transaction) =>
      Api.Transaction.Create(accountId, transaction),
    {
      onSuccess: () => {
        queryClient.fetchQuery(["transactions", accountId]);
        closeModal();
        swal("Nice!", "Your transaction has been added!", "success");
      },
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const toCreate = {
      ...transaction,
      amount: currency(transaction.amount).intValue,
    };

    transactionMutation.mutate(toCreate);
  };

  useEffect(
    () => updateTransaction(Models.EntityFactory.createTransaction()),
    [isOpen]
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>New transaction</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="flex flex-row justify-between items-center">
            <Label className="w-full">
              <span className="flex">
                Amount <p className="text-red-400">*</p>
              </span>
              <CurrencyFormat
                customInput={Input}
                thousandSeparator={true}
                prefix={"$"}
                allowNegative
                placeholder={"$12.50"}
                value={transaction.amount}
                onChange={(e) => {
                  const t = { ...transaction };
                  t.amount = e.target.value;
                  updateTransaction(t);
                }}
                required
              />
            </Label>

            {/* <Label className="mt-4 mb-4 ml-6 sm:w-full">
              <span className="flex">
                Type <p className="text-red-400">*</p>
              </span>{" "}
              <Select
                required
                className="mt-1"
                onChange={(e) => {
                  const t = { ...transaction };
                  t.type = e.target.value;
                  updateTransaction(t);
                }}
              >
                {Object.entries(Models.TransactionType).map(([name, id]) => (
                  <option className="flex flex-col" value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </Label> */}

            {/* <Label className="mt-4 mb-4 ml-6 w-full">
              <span className="flex">
                Date <p className="text-red-400">*</p>
              </span>
              <Input
                required
                className="w-full"
                type="date"
                onChange={(e) => {
                  const t = { ...transaction };
                  t.date = e.target.value;
                  console.log(t.date, t);

                  updateTransaction(t);
                }}
                value={moment(transaction.date).format("YYYY-MM-DD")}
              />
            </Label> */}
          </div>

          <div className="flex flex-row justify-between items-center">
            <Label className="mt-4 mb-4 w-full">
              <span className="flex">
                Category <p className="text-red-400">*</p>
              </span>{" "}
              <Select
                required
                className="mt-1"
                onChange={(e) => {
                  const t = { ...transaction };
                  t.categoryId = e.target.value;
                  updateTransaction(t);
                }}
              >
                <option value="" disabled selected>
                  Select a category
                </option>

                <option className="flex flex-col" value="1">
                  Automotive
                </option>
                <option className="flex flex-col" value="2">
                  Food & Beverage
                </option>
              </Select>
            </Label>

            <Label className="mt-4 mb-4 w-full ml-6">
              <span>Recipient</span>
              <Input
                className="w-full"
                type="text"
                placeholder="Mum"
                onChange={(e) => {
                  const t = { ...transaction };
                  t.recipient = e.target.value;
                  updateTransaction(t);
                }}
                value={transaction.recipient}
              />
            </Label>
          </div>

          <Label className="mt-4 mb-4" required>
            <span>Note</span>
            <Textarea
              className="mt-1"
              placeholder="Enter a note describing the transaction"
              value={transaction.note}
              onChange={(e) => {
                const t = { ...transaction };
                t.note = e.target.value;
                updateTransaction(t);
              }}
            />
          </Label>
        </ModalBody>

        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button type="submit" disabled={transactionMutation.isLoading}>
              {transactionMutation.isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              type="submit"
              disabled={transactionMutation.isLoading}
            >
              {transactionMutation.isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};
