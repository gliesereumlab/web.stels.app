// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import configReducer from './configSlice';

const rootReducer = combineReducers({
  root: configReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
