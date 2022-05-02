import React from 'react';
import { useConvertToFiat } from '../hooks/cryptoInfo';
import { useGetCryptoInfo } from '../hooks/cryptoInfo'

interface TransactionsList {
  transactions: any
}
interface Transaction {
  transaction:
  {
    id: number,
    type: string,
    crypto: string,
    date: string,
    amount: number,
    recipient: string
  }
}

const TransactionsList: React.FunctionComponent<TransactionsList> = ({ transactions }) => {

  const ListItem: React.FunctionComponent<Transaction> = ({ transaction }) => {
    const transferedCrypto = useGetCryptoInfo(transaction.crypto);

    return <li className="flex justify-between items-center w-full py-3">
      <div className="flex justify-between items-center">
        <img src={transferedCrypto.logo} className=" w-12 h-12 rounded-full bg-slate-100 p-2 mr-3" />
        <div className="flex flex-col justify-between items-start h-12">
          <span className="capitalize font-bold">{`sent ${transferedCrypto.name}`}</span>
          <span className="text-sm text-gray-500">{transaction.date}</span>
        </div>
      </div>
      <div className="flex flex-col justify-between items-start h-12">
        <span className="font-bold w-full text-right uppercase">{`${transaction.type === 'sent' ? '-' : '+'} ${transaction.amount} ${transferedCrypto.code}`}</span>
        <span className="text-sm w-full text-gray-500 text-right">{`${transaction.type === 'sent' ? '-' : '+'} $${useConvertToFiat(transaction.crypto, transaction.amount)} USD`}</span>
      </div>
    </li>
  }

  const List: React.FunctionComponent<TransactionsList> = ({ transactions }) => {
    return <ul className="grid gap-0 divide-y">
      {transactions.map((x:any) => (
        <ListItem key={x.id} transaction={x} />
      ))}
    </ul>
  }

  return (
    <div className="block w-full h-full mx-auto">
      <List transactions={transactions}/>
    </div>
  );
}

export default TransactionsList;
