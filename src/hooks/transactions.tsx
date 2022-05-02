import { useAppSelector, useAppDispatch } from './reduxHooks'

export const useTransactionHistory = () => {
  const transactionsList = useAppSelector((state) => state.transactions.transactions);
  return [...transactionsList].reverse();
}
