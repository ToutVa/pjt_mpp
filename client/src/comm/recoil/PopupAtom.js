import { atom, selector } from 'recoil';

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

export const alertModalState = atom({
  key: 'alertModalState',
  default: {msg: ''},
});

export const confirmModalState = atom({
  key: 'confirmModalState',
  default: {msg: ''},
});