import { createSlice } from '@reduxjs/toolkit'

export interface ProfileData {
  name: string,
  publicAddress: string,
  accountBalance: {
    crypto: string,
    amount: number
  }[]
}

const initialState : ProfileData = {
  name: 'Account 1',
  publicAddress: '0xb701FdCc9Db05d5AD0d7B6aAbb42DBf09ec28Ad0',
  accountBalance: [
    { crypto: 'ether', amount: 3.405 },
  ]
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
})

export default profileSlice.reducer