import { useAtomValue } from 'jotai';
import { times } from 'lodash';
import { useState } from 'react';

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

  const getCyclePts = () => (
    gridCells
      .map(({ itemId }) => (
        items?.find(({ id }) => id === itemId)
      ))
      .filter((item) => !!item)
      .reduce((sum, item) => (
        sum + (item?.score(1) || 0)
      ), 0)
  );

  const clearGrid = () => {
    setGridCells(
      getEmptyGrid()
    );
  };

  return {
    gridCells,
    getCyclePts,
    onItemDrop,
    clearCell,
    clearGrid
  };
}