import { atom,selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key : "x-auth",
  storage : localStorage
})

export const TokenAtom = atom({
  key: "TokenAtom",
  default: undefined,
  effects_UNSTABLE : [persistAtom]
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({get}) => !!get(TokenAtom),
});