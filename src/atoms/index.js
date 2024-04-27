import { atom } from 'jotai';

import itemsData from 'data/items';

export const balance = atom(0);
export const items = atom(itemsData);
export const grid = atom([]);

// Derived atoms

export const gridCells = atom((get) => {
  const valGrid = get(grid);
  const valItems = get(items);
  return (
    valGrid
      .map(({
        itemId,
        level
      }) => {
        const item = valItems
          ?.find(({ id }) => id === itemId);

        if (!item) return { };

        const count = valGrid
          ?.filter(({ itemId: id }) => id === itemId)
          ?.length;

        return {
          itemId,
          level,
          item,
          count,
          cycleValue: item?.getCycleValue(level)
        };
      })
  );
});

export const shopItems = atom((get) => {
  const valGrid = get(grid);
  const valItems = get(items);
  const valBalance = get(balance);

  return (
    valItems
      .map((item) => {
        const count = valGrid
          ?.filter(({ itemId }) => itemId === item?.id)
          ?.length;
        const cost = item?.getCost(count);
        const canAfford = valBalance >= cost;

        return {
          ...item,
          cost,
          canAfford
        };
      })
  );
});

export const gridCycleValue = atom((get) => {
  const valGridCells = get(gridCells);

  return (
    valGridCells
      .reduce((sum, { cycleValue }) => (
        sum + (cycleValue || 0)
      ), 0)
  );
});