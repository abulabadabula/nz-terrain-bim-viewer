import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as turf from '@turf/turf';

interface GisState {
  address: string;
  wgs84Coord: [number, number] | null;
  nztmCoord: [number, number] | null;
  parcelGeoJson: any | null;
  terrainHeightmap: string | null;
  area: number;
  selectedCornerId: string | null;
  showAnnotations: boolean;
}

const initialState: GisState = {
  address: '',
  wgs84Coord: null,
  nztmCoord: null,
  parcelGeoJson: null,
  terrainHeightmap: null,
  area: 0,
  selectedCornerId: null,
  showAnnotations: true,
};

export const gisSlice = createSlice({
  name: 'gis',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => { state.address = action.payload; },
    setCoords: (state, action: PayloadAction<{ wgs84: [number, number], nztm: [number, number] }>) => {
      state.wgs84Coord = action.payload.wgs84;
      state.nztmCoord = action.payload.nztm;
    },
    setParcelGeoJson: (state, action) => { 
      state.parcelGeoJson = action.payload; 
      if (action.payload) {
        state.area = turf.area(action.payload); 
      }
    },
    setTerrainHeightmap: (state, action) => { state.terrainHeightmap = action.payload; },
    setSelectedCorner: (state, action: PayloadAction<string | null>) => { state.selectedCornerId = action.payload; },
    toggleAnnotations: (state) => { state.showAnnotations = !state.showAnnotations; },
  },
});

export const { setAddress, setCoords, setParcelGeoJson, setTerrainHeightmap, setSelectedCorner, toggleAnnotations } = gisSlice.actions;
export default gisSlice.reducer;