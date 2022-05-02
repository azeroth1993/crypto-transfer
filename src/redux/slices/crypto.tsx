import { createSlice } from '@reduxjs/toolkit'

export interface Crypto {
  cryptos: {
    name: string,
    code: string,
    price: number,
    logo: string,
  }[]
}

const initialState : Crypto = {
  cryptos: [
    { name: 'bitcoin', code: 'btc', price: 38000, logo: 'btc-logo.svg' },
    { name: 'ether', code: 'eth', price: 2800, logo: 'eth-logo.svg' },
    { name: 'bnb', code: 'bnb', price: 385, logo: 'bnb-logo.svg' },
    { name: 'usdt', code: 'usdt', price: 1, logo: 'usdt-logo.svg' }
  ]
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
})

export default cryptoSlice.reducer