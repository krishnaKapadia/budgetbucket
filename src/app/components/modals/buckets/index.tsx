/** @format */
import React, { FunctionComponent, useMemo, useState } from "react";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
  Label,
  Input,
  Select,
} from "@windmill/react-ui";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import * as CurrencyFormat from "react-currency-format";
import swal from "sweetalert";
import currency from "currency.js";

import * as Models from "../../../../models";
import * as Api from "../../../../api";
import { Categories } from "../../../../constants";
import { RootState } from "../../../store";
import { ModalProps } from "../models";

type Props = ModalProps;

export const AddBucketModal: FunctionComponent<Props> = ({
  isOpen,
  closeModal,
}) => {
  const queryClient = useQueryClient();
  const userId = useSelector((state: RootState) => state.user.id);
  const categories = useMemo(() => Object.entries(Categories), []);
  const [bucket, updateBucket] = useState(
    Models.EntityFactory.createBucket(userId)
  );

  const createBucketMutation = useMutation(
    (bucket: Models.Bucket) => Api.Bucket.Create(userId, bucket),
    {
      onSuccess: () => {
        queryClient.fetchQuery(["buckets", userId]);
        closeModal();
        swal("Awesome!", "Your bucket has been added!", "success");
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    createBucketMutation.mutate({
      ...bucket,
      budget: currency(bucket.budget).intValue,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>New bucket</ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="flex flex-row justify-between items-center">
            <Label className="mt-4 mb-4 w-full">
              <span className="flex">
                Category <p className="text-red-400">*</p>
              </span>{" "}
              <Select
                required
                className="mt-1"
                onChange={(e) => {
                  const b = { ...bucket };
                  b.categoryId = e.target.value;
                  updateBucket(b);
                }}
              >
                <option value="" disabled selected>
                  Select a category
                </option>

                {categories.map(([id, { name }]) => (
                  <option className="flex flex-col" value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </Label>
            <Label className="mt-4 mb-4 w-full ml-6">
              <span className="flex">
                Monthly Budget <p className="text-red-400">*</p>
              </span>
              <CurrencyFormat
                customInput={Input}
                thousandSeparator={true}
                prefix={"$"}
                allowNegative
                placeholder={"$12.50"}
                value={bucket.budget}
                onChange={(e) => {
                  const b = { ...bucket };
                  b.budget = e.target.value;
                  updateBucket(b);
                }}
                required
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
            <Button type="submit" disabled={createBucketMutation.isLoading}>
              {createBucketMutation.isLoading ? "Saving..." : "Save"}
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
              disabled={createBucketMutation.isLoading}
            >
              {createBucketMutation.isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};
