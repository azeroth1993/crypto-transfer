import React from 'react';
import { useGetCryptoInfo } from '../hooks/cryptoInfo'
import { useConvertToFiat } from '../hooks/cryptoInfo';

export interface ProfileData {
  data: {
    name: string,
    publicAddress: string,
    accountBalance: {
      crypto: string,
      amount: number
    }[]
  },
  onClick: any
}

const ProfileInfo: React.FunctionComponent<ProfileData> = ({ data, onClick }) => {

  const AccountDetails = () => {
    return <div className="flex items-center mb-6">
      <img src="matic-logo.svg" className=" w-10 h-10 rounded-sm mr-5" />
      <div className="flex flex-col justify-between items-start h-12">
        <span className="capitalize font-bold">{data.name}</span>
        <span className="text-sm text-gray-500">{`${data.publicAddress.slice(0, 7)}...${data.publicAddress.slice(-4, )}`}</span>
      </div>
    </div>
  }
  const Balance = () => {
    const crypto = useGetCryptoInfo(data.accountBalance[0].crypto);

    return <div className="flex flex-col justify-center items-center bg-light-blue border border-light-blue-border rounded p-5 mb-5">
      <div className="mb-2">
        <span className="text-3xl font-bold mr-1">{data.accountBalance[0].amount}</span>
        <span className="text-3xl font-bold uppercase">{crypto.code}</span>
      </div>
      <span className="text-lg text-gray-500">{`$${useConvertToFiat(data.accountBalance[0].crypto, data.accountBalance[0].amount)}.00 USD`}</span>
      <div className="flex flex-col justify-center items-center py-2 mt-5 cursor-pointer" onClick={onClick}>
        <span className="flex justify-center items-center bg-secondary w-12 h-12 rounded-full p-2 animate-bounce">
          <svg className="w-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M379.8 234.8C376.7 238.3 372.3 240 368 240c-3.844 0-7.703-1.375-10.77-4.156L208 100.2V464c0 8.844-7.156 15.1-15.1 15.1S176 472.8 176 464V100.2L26.77 235.8c-6.516 5.938-16.62 5.531-22.61-1.094C-1.781 228.2-1.297 218.1 5.234 212.2l176-160c6.094-5.562 15.44-5.562 21.53 0l176 160C385.3 218.1 385.8 228.2 379.8 234.8z" /></svg>
        </span>
        <span className="uppercase text-lg font-bold mt-2">send</span>
      </div>
    </div>
  }

  return (
    <div className="">
      <AccountDetails />
      <Balance />
    </div>
  );
}

export default ProfileInfo;
