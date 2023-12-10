import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'userData',
  storage: localStorage,
});

export const TokenUser = atom({
  key: 'userData',
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => !!get(TokenUser),
});
