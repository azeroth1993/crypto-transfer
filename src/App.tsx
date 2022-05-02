import React, { useState, useEffect } from 'react';
import { useTransactionHistory } from './hooks/transactions';
import { useAppSelector } from './hooks/reduxHooks'
import TransactionsList from './templates/transactionsList';
import Profileinfo from './templates/profileInfo';
import CryptoTransferForm from './templates/cryptoTransferForm';
import Modal from './components/modal/modal';

function App() {

  const [modalOpen, setModalOpen] = useState(false)
  const [transactionSuccess, setTransactionSuccess] = useState(false)
  const transactionsHistory = useTransactionHistory();
  const profileData = useAppSelector((state) => state.profile);

  const closeTransferModal = () => {
    setModalOpen(false);
    setTransactionSuccess(false);
  }

  return (
    <div className="flex flex-col py-4 px-6 w-full h-screen mx-auto bg-white max-w-3xl shadow-md rounded">
      <Profileinfo data={profileData} onClick={() => setModalOpen(true)} />
      <TransactionsList transactions={transactionsHistory} />
      <Modal 
        open={modalOpen} 
        title="send crypto" 
        onClose={closeTransferModal}
      >
        <CryptoTransferForm onClose={closeTransferModal} success={transactionSuccess} profileData={profileData} />
      </Modal>
    </div>
  );
}

export default App;
