import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer from '../slices/crypto'
import profileReducer from '../slices/profile'
import transactionsReducer from '../slices/transactions'

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    profile: profileReducer,
    transactions: transactionsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch