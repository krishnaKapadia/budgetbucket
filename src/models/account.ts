/** @format */

type Metrics = {
  total: number;
};

export type Account = {
  id?: string;
  name: string;
  userId: string;
  bank: string;
  description?: string;
  balance: number;
  metrics?: Metrics;
};
