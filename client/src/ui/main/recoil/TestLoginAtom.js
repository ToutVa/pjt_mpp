import { atom,selector } from "recoil";

export const loginStatus = atom({
  key: 'loginStatus',
  default : false,
});

export const isLginStatus = selector({
  key: 'isLginStatus',
  get: ({get}) => !!get(loginStatus),
});