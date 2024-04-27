import { useAtomValue } from 'jotai';
import { times } from 'lodash';
import { useMemo, useState } from 'react';

import * as atoms from 'atoms';

export default function useGridCells({
  gridSize = 5
}) {
  const items = useAtomValue(atoms.items);

  const getNewCell = (itemId) => ({
    itemId,
    level: 0
  });

  const [gridCells, setGridCells] = useState(
    times(gridSize * gridSize, () => getNewCell())
  );

  const cycleValue = useMemo(() => (
    gridCells
      .map(({ itemId }) => (
        items?.find(({ id }) => id === itemId)
      ))
      .filter((item) => !!item)
      .reduce((sum, item) => (
        sum + (item?.score(1) || 0) // TODO: level
      ), 0)
  ), [
    gridCells,
    items
  ]);

  function getEmptyGrid() {
    return times(gridSize * gridSize, () => (
      getNewCell()
    ));
  }

  const onItemDrop = (index, itemId) => {
    setGridCells((prevCells) => (
      prevCells.map((val, i) => (
        (i === index)
          ? getNewCell(itemId)
          : val
      ))
    ));
  };

  const clearCell = (index) => {
    setGridCells((prevCells) => (
      prevCells.map((val, i) => (
        (i === index) ? getNewCell() : val
      ))
    ));
  };

  const getItemCost = (itemId) => {
    const item = items?.find(({ id }) => id === itemId);
    const count = gridCells
      ?.filter(({ itemId: id }) => id === itemId)
      ?.length;
    return item?.getCost(count) || 0;
  };

  const clearGrid = () => {
    setGridCells(
      getEmptyGrid()
    );
  };

  return {
    gridCells,
    cycleValue,
    getItemCost,
    onItemDrop,
    clearCell,
    clearGrid
  };
}