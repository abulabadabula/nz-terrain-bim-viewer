import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BimState {
  ifcModelUrl: string | null;
  isModelLoaded: boolean;
  selectedElementId: number | null;
  hiddenCategories: string[];
  transformMatrix: number[];
}

const initialState: BimState = {
  ifcModelUrl: null,
  isModelLoaded: false,
  selectedElementId: null,
  hiddenCategories: [],
  transformMatrix: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], 
};

export const bimSlice = createSlice({
  name: 'bim',
  initialState,
  reducers: {
    setIfcModelUrl: (state, action: PayloadAction<string>) => { state.ifcModelUrl = action.payload; },
    setModelLoaded: (state, action: PayloadAction<boolean>) => { state.isModelLoaded = action.payload; },
    selectElement: (state, action: PayloadAction<number | null>) => { state.selectedElementId = action.payload; },
    toggleCategoryVisibility: (state, action: PayloadAction<string>) => {
      const idx = state.hiddenCategories.indexOf(action.payload);
      if (idx > -1) state.hiddenCategories.splice(idx, 1);
      else state.hiddenCategories.push(action.payload);
    },
  },
});

export const { setIfcModelUrl, setModelLoaded, selectElement, toggleCategoryVisibility } = bimSlice.actions;
export default bimSlice.reducer;