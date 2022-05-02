import { useAppSelector } from '../hooks/reduxHooks'

export const useGetAllCryptos = () => {
  const allCryptos = useAppSelector((state) => state.crypto.cryptos);
  return allCryptos;
}

export const useGetCryptoInfo = (crypto: string) => {
  const cryptosInfo = useAppSelector((state) => state.crypto.cryptos);
  const info = cryptosInfo.filter(x => x.name === crypto)
  return {
    name: info[0].name,
    code: info[0].code,
    price: info[0].price,
    logo: info[0].logo,
  };
}

export const useConvertToFiat = (crypto: string, amount: number) => {
  const cryptoType = useGetCryptoInfo(crypto);
  return cryptoType.price * amount;
}
