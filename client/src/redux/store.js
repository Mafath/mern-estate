import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

export const store = configureStore({
  reducer: {user: userReducer},//user = userReducer wge
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
})