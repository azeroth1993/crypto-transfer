import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TransactionsState {
  transactions:
    {
      id: number,
      type: string,
      crypto: string,
      date: string,
      amount: number,
      recipient: string
    } []
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: 1,
      type: 'sent',
      crypto: 'bitcoin',
      date: '05-01-2021 20:00',
      amount: 0.2,
      recipient: '0xb19181c403D451A1e161b305eb08DfD422ffd6DD',
    }, 
    {
      id: 2,
      type: 'sent',
      crypto: 'bnb',
      date: '05-01-2021 21:00',
      amount: 1.2,
      recipient: '0xb19181c403D451A1e161b305eb08DfD422ffd6DD',
    },
    {
      id: 3,
      type: 'sent',
      crypto: 'ether',
      date: '06-01-2021 19:00',
      amount: 3,
      recipient: '0xb19181c403D451A1e161b305eb08DfD422ffd6DD',
    },
    {
      id: 4,
      type: 'sent',
      crypto: 'ether',
      date: '06-01-2021 19:30',
      amount: 0.5,
      recipient: '0xb19181c403D451A1e161b305eb08DfD422ffd6DD',
    },
  ],
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<any>) => {
      state.transactions = [...state.transactions, action.payload];
    },
  },
})

export const { addTransaction } = transactionsSlice.actions

export default transactionsSlice.reducer