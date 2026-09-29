import { configureStore } from '@reduxjs/toolkit';
import { linzApi } from '../features/gis/linzApi';
import gisReducer from '../features/gis/gisSlice';
import uiReducer from '../features/ui/uiSlice';
import bimReducer from '../features/bim/bimSlice';

export const store = configureStore({
  reducer: {
    [linzApi.reducerPath]: linzApi.reducer,
    gis: gisReducer,
    ui: uiReducer,
    bim: bimReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(linzApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;