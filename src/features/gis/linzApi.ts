import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { wgs84ToNztm } from './utils';

export const linzApi = createApi({
  reducerPath: 'linzApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://data.linz.govt.nz/services/',
    prepareHeaders: (headers) => {
      const key = import.meta.env.VITE_LINZ_API_KEY;
      if (key) headers.set('key', key); // 注意：生产环境务必使用后端代理
      return headers;
    }
  }),
  endpoints: (builder) => ({
    geocodeAddress: builder.mutation<{ lng: number; lat: number }, string>({
      queryFn: async (address) => {
        // 模拟 Geocoding，实际请接入 LINZ 或第三方 API
        console.log("Geocoding address:", address);
        return { data: { lng: 174.7633, lat: -36.8485 } }; 
      },
    }),
    getCadastralParcel: builder.query<any, { x: number; y: number }>({
      query: ({ x, y }) => {
        const nztm = wgs84ToNztm(x, y);
        const bbox = `${nztm[0] - 50},${nztm[1] - 50},${nztm[0] + 50},${nztm[1] + 50}`;
        return {
          url: `wfs?service=WFS&version=2.0.0&request=GetFeature&typeNames=layer-101236&outputFormat=application/json&BBOX=${bbox}`,
        };
      },
    }),
  }),
});

export const { useGeocodeAddressMutation, useGetCadastralParcelQuery } = linzApi;