import { atom, selector } from 'recoil';

export const sgisToken = atom({
    key: 'sgisAccessToken', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
  });