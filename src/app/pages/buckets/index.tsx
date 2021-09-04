/** @format */
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge
} from '@windmill/react-ui'

import { PageTitle } from '../../components/typography';
import { useGetBuckets } from '../../queries';
import { RootState } from '../../store';
import { formatCurrency } from '../../../utils/formatting/index';
import { getCategoryEmoji, getCategoryName } from '../../../constants/categories';

type UrlParams = {
  id?: string;
}

const Buckets: FunctionComponent = () => {
  const { id } = useParams<UrlParams>();
  const userId = useSelector((state: RootState) => state.user.id);

  const { data: buckets = [] } = useGetBuckets(userId);

  return (
    <>
      <PageTitle>Buckets</PageTitle>

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
                      <i className={`em ${getCategoryEmoji(categoryId.toString())} mr-2`} />
                      <span className="font-semibold ml-2">{getCategoryName(categoryId)}</span>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
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
    </>
  );
}

export default Buckets;