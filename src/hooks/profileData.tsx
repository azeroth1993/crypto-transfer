import { useAppSelector } from './reduxHooks'
import { useConvertToFiat } from '../hooks/cryptoInfo'

export const useGetFiatBalance = () => {
  const profile = useAppSelector((state) => state.profile);
  const converter = useConvertToFiat;
  let totalBalance = 0;
  profile.accountBalance.map(x => totalBalance =+ converter(x.crypto, x.amount));
  return totalBalance;
}
