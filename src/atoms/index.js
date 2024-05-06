import { atom } from 'jotai';
import { times } from 'lodash';

import itemsData from 'data/items';

export const balance = atom(20);
export const items = atom(itemsData);
export const gridCells = atom(
  times(25, () => ({ }))
);

// Derived atoms

export const shopItems = atom((get) => {
  const valGridCells = get(gridCells);
  const valItems = get(items);
  const valBalance = get(balance);

  return (
    valItems
      .map((item) => {
        const count = valGridCells
          ?.filter(({ itemId }) => itemId === item?.id)
          ?.length;
        const cost = item?.buyCosts[count];
        const canAfford = valBalance >= cost;

        return {
          ...item,
          cost,
          canAfford
        };
      })
  );
});