/** @format */
import React, { FunctionComponent, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  Input,
  Textarea,
} from "@windmill/react-ui";
import swal from "sweetalert";
import currency from "currency.js";
import { Divider } from "@geist-ui/react";
import { useMutation } from "react-query";
import * as CurrencyFormat from "react-currency-format";

import * as Api from "../../../../api";
import * as Models from "../../../../models";
import { RootState } from "../../../store";
import { ModalProps } from "../models";

type Props = ModalProps;

export const AddAccountModal: FunctionComponent<Props> = ({
  closeModal,
  isOpen,
}) => {
  const [account, updateAccount] = useState(
    Models.EntityFactory.createAccount()
  );

  const userId = useSelector((state: RootState) => state.user.id);
  const accountMutation = useMutation(
    (account: Models.Account) => Api.Account.Create(userId, account),
    {
      onSuccess: () => {
        closeModal();
        swal("Nice!", "Your account has been added!", "success");
      },
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const toCreate = {
      ...account,
      balance: currency(account.balance).intValue,
    };

    accountMutation.mutate(toCreate);
  };

  useEffect(
    () => updateAccount(Models.EntityFactory.createAccount()),
    [isOpen]
  );

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add a new account</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <Divider />
          <Label className="w-full">
            <span className="flex">
              Name <p className="text-red-400">*</p>
            </span>
            <Input
              required
              className="w-full"
              placeholder="Travel"
              onChange={(e) => {
                const t = { ...account };
                t.name = e.target.value;
                updateAccount(t);
              }}
              value={account.name}
            />
          </Label>

          <div className="flex flex-row justify-between items-center">
            <Label className="mt-4 mb-4 mr-6 w-full">
              <span className="flex">
                Balance <p className="text-red-400">*</p>
              </span>
              <CurrencyFormat
                customInput={Input}
                thousandSeparator={true}
                prefix={"$"}
                allowNegative
                placeholder={"$100"}
                value={account.balance}
                onChange={(e) => {
                  const t = { ...account };
                  t.balance = e.target.value;
                  updateAccount(t);
                }}
                required
              />
            </Label>

            <Label className="mt-4 mb-4 w-full">
              <span className="flex">Bank / Vendor</span>{" "}
              <Input
                className="w-full"
                placeholder="ANZ"
                onChange={(e) => {
                  const t = { ...account };
                  t.bank = e.target.value;
                  updateAccount(t);
                }}
                value={account.bank}
              />
            </Label>
          </div>

          <div className="flex flex-row justify-between items-center">
            <Label className="mt-4 mb-4 w-full">
              <span>Description</span>
              <Textarea
                className="w-full"
                type="text"
                placeholder="My travel account"
                onChange={(e) => {
                  const t = { ...account };
                  t.description = e.target.value;
                  updateAccount(t);
                }}
                value={account.description}
              />
            </Label>
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button type="submit" disabled={accountMutation.isLoading}>
              {accountMutation.isLoading ? "Saving..." : "Save"}
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
              disabled={accountMutation.isLoading}
            >
              {accountMutation.isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};
