import { atom, selector } from 'recoil';

export const csvState = atom({
  key: 'data',
  default: []
  // effects_UNSTABLE: [persistAtom]
});

export const getFavIcon = async (item) => {
  const res = await fetch('/api/post', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(item)
  });
  return await res.json();
};

export const itemSelector = selector({
  key: 'onChange',
  get: ({ get }) => get(csvState),
  set: ({ set, get }, newItem) => {
    set(csvState, {
      data: get(csvState)?.data?.map((item) => {
        return item.id === newItem.id ? newItem : item;
      })
    });
  }
});
