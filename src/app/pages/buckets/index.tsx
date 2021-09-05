/** @format */
import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@windmill/react-ui";

import * as Modals from "../../components/modals";
import { PageTitle } from "../../components/typography";
import { useGetBuckets } from "../../queries";
import { RootState } from "../../store";
import { formatCurrency } from "../../../utils/formatting";
import {
  getCategoryEmoji,
  getCategoryName,
} from "../../../constants/categories";

const Buckets: FunctionComponent = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const { data: buckets = [] } = useGetBuckets(userId);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const closeModal = () => setIsCreateModalOpen(false);

  return (
    <>
      <div className="inline-flex items-center justify-between w-full">
        <PageTitle>Buckets</PageTitle>
        <div
          className="cursor-pointer shadow-l w-10 h-10 rounded-full bg-purple-600 transition-colors hover:bg-purple-700 flex items-center justify-center"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
      <section className="my-8">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Remaining</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buckets?.map(({ id, budget, categoryId }) => (
                <TableRow key={id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <i
                        className={`em ${getCategoryEmoji(
                          categoryId.toString()
                        )} mr-2`}
                      />
                      <span className="font-semibold ml-2">
                        {getCategoryName(categoryId)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatCurrency(budget)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{formatCurrency(2000)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type="success">On track</Badge>
                  </TableCell>
                  <TableCell>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <TableFooter>
            <Pagination totalResults={10} resultsPerPage={4} onChange={() => {}} label="Table navigation" />
          </TableFooter> */}
        </TableContainer>
      </section>

      <Modals.AddBucketModal
        isOpen={isCreateModalOpen}
        closeModal={closeModal}
      />
    </>
  );
};

export default Buckets;
