import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';

export type AppDispatch = ThunkDispatch<any, any, AnyAction>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
