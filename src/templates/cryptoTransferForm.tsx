import React, { useState, useEffect, useRef } from 'react';
import Input from '../components/inputs/input';
import Select from '../components/inputs/select';
import Button from '../components/button/button';
import { addTransaction } from '../redux/slices/transactions'
import { useGetAllCryptos } from '../hooks/cryptoInfo';
import { useTransactionHistory } from '../hooks/transactions';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks'
import { useConvertToFiat } from '../hooks/cryptoInfo';
import { useGetFiatBalance } from '../hooks/profileData';

interface CryptoTransferForm {
  onClose: any,
  success: boolean,
  profileData: {
    accountBalance: {
      crypto: string,
      amount: number
    }[]
  }
}
interface ErrorMessage {
  text: string,
  visible: boolean,
}

const CryptoTransferForm: React.FunctionComponent<CryptoTransferForm> = ({ onClose, success = false, profileData }) => {

  const pastTransactions = useTransactionHistory();
  const time = new Date();
  const [crypto, setCrypto] = useState('bitcoin');
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [sending, setSending] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(success);
  const amountToSend = useConvertToFiat(crypto, amount);
  const currentBalance = useGetFiatBalance();

  const transactionTimeStamp = `
  ${time.getDay() + 1 < 10 ? '0' + (time.getDay() + 1) : time.getDay() + 1}-${time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1}-${time.getFullYear()} 
  ${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;


  const checkBalance = () => {
    const canAfford = (currentBalance > amountToSend) ? true : false;
    return canAfford;
  }
  console.log(typeof(amount));
  

  const resetTransfer = () => {
    setTransactionSuccess(false);
    setAmount(0);
    setRecipient('');
    onClose();
  }

  const getTransactionData = () => {
    const transaction = {
      id: pastTransactions.length + 1,
      type: 'sent',
      crypto: crypto,
      date: transactionTimeStamp,
      amount: amount,
      recipient: recipient,
    }
    return transaction;
  }

  const getCryptos = useGetAllCryptos();
  const newTransaction = useAppDispatch();
  
  const sendCrypto = (e: Event) => {
    e.preventDefault();
    checkBalance();
    if (amount > 0 && recipient !== '' && checkBalance()) {
      setSending(true);
      const processingTime = setTimeout(() => {
        newTransaction(addTransaction(getTransactionData()));
        setSending(false);
        setTransactionSuccess(true);
        clearTimeout(processingTime);
      }, 2000);
    }
  }

  const ErrorMessage:React.FunctionComponent<ErrorMessage> = ({ text, visible} ) => {
    return (
      <span 
        className={`${visible ? 'hidden' : 'block'} w-full text-base font-bold text-red-500 text-left py-2 px-2 rounded capitalize`}
      >
        {text}
      </span>
    ) 
  }

  return (
    <>
      <div className={`${transactionSuccess ? 'block' : 'hidden'}`}>
        <div className="flex flex-col justify-center items-center w-full">
          <img className="w-44 mt-3" src="money-bag.jpg" alt="transaction success logo" />
          <span className="text-3xl font-bold capitalize">success!</span>
          <span className="text-lg text-gray-500 capitalize w-52 text-center mt-3">you've successfully sent your funds.</span>
          <a href="#" className="text-secondary font-bold text-xl mt-5 mb-12">View on Etherscan ➜</a>
        </div>
        <div className="grid grid-cols-1 gap-3 px-6 py-4 w-full border-t h-20">
          <Button type="button" text="done" outlined={true} color="primary" onClick={resetTransfer} />
        </div>
      </div>

      <form className={`${transactionSuccess ? 'hidden' : 'block'}`}>
        <div className="p-6">
          <Select
            label="select crypto"
            id="select-crypto"
            options={getCryptos.map(x => x.name)}
            onSelect={(e: any) => setCrypto(e.target.value)}
          />
          <Input label="add recipient" value={recipient} id="recipient" placeholder="enter public address" pattern="^0x[a-fA-F0-9]{40}$" required onInput={(e: React.ChangeEvent<HTMLInputElement>) => setRecipient(e.target.value)} />
          <Input label="enter amount" value={amount} min={0} type="number" step="any" id="amount" placeholder="enter the amount you wish to send" pattern="^0x[a-fA-F0-9]{40}$" required onInput={(e: React.ChangeEvent<HTMLInputElement>|any) => setAmount(e.target.value)} />
          <ErrorMessage visible={amount !== 0 && recipient !== ''} text="* please fillout all the fields." />
          <ErrorMessage visible={checkBalance()} text="* Not enough balance!" />
        </div>
        <div className="grid grid-cols-2 gap-3 px-6 py-4 w-full border-t h-20">
          <Button type="button" text="cancel" outlined={true} color="primary" onClick={onClose} />
          <Button 
            type="submit" 
            text="send" 
            onClick={sendCrypto} 
            loading={sending}
            disabled={amount <= 0 || recipient === ''}
          />
        </div>
      </form>
    </>
  )
}

export default CryptoTransferForm;
