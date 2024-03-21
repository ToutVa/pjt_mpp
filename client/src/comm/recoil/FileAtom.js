import { atom, selector } from 'recoil';
import baseImgUrl from 'assets/icon-file.svg';

// const { persistAtom } = recoilPersist({
//   key     : 'postingFiles',
//   storage : localStorage
// });

export const postingFiles = atom({
  key     : 'postingFiles',
  default : { url : baseImgUrl},
  dangerouslyAllowMutability: true,
  // effects_UNSTABLE: [persistAtom]
});

export const fileSelector = selector({
  key: 'fileSelector',
  get: ({ get }) => {get(postingFiles)},
  set: ({ get, set}) => { set(postingFiles)}
});

export const totalfileCntSelector = selector({
  key: 'totalfileCntSelector',
  get: ({ get }) => {
    const postingFileCnt = get(postingFiles);
    return postingFileCnt.length;
  }
});
