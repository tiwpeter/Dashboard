// state/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
  reducerPath: 'main',
  tagTypes: ['Kpis', 'Products', 'TransacTion'],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => 'https://deploy-dashboard-ndkr.vercel.app/api/kpis',
      providesTags: ['Kpis'],
    }),
    getProducts: build.query<Array<GetProductsResponse>, void>({
      query: () => 'https://deploy-dashboard-nxig.vercel.app/api/Product',
      providesTags: ['Products'],
    }),
    getTransacTion: build.query<Array<GetTransactionsResponse>, void>({
      query: () => 'https://deploy-dashboard-nxig.vercel.app/api/TransacTion',
      providesTags: ['TransacTion'],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransacTionQuery } = api;
//ch