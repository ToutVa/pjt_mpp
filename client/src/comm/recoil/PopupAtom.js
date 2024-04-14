import { atom } from 'recoil';
import { createContext } from 'react';

export const ModalsDispatchContext = createContext({
  open: () => {},
  close: () => {},
  msg: String,
});

export const ModalsStateContext = createContext([]);

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const loginModalState = atom({
  key: 'loginModalState',
  default: false,
});

export const signupModalState = atom({
  key: 'signupModalState',
  default: false,
});