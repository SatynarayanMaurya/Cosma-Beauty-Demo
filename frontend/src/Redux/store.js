import { configureStore } from '@reduxjs/toolkit'
// import  userSlice from './Slices/userSlice'
import concernSlice from './Slices/concernSlice'

export const store = configureStore({
  reducer: {
    concern:concernSlice
  },
})