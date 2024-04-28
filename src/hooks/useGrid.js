import { useSetAtom } from 'jotai';
import { times } from 'lodash';
import { useEffect } from 'react';

import * as atoms from 'atoms';

export default function useGrid({
  gridSize
}) {
  const setGrid = useSetAtom(atoms.grid);

  useEffect(() => {
    setGrid(
      times(gridSize * gridSize, () => ({ }))
    );
  }, [
    setGrid,
    gridSize
  ]);

  const clearGrid = () => {
    setGrid(
      times(gridSize * gridSize, () => ({ }))
    );
  };

  const clearCell = (cellIndex) => {
    setGrid((prevGrid) => (
      prevGrid.map((val, i) => (
        (i === cellIndex) ? { } : val
      ))
    ));
  };

  const upgradeCell = (cellIndex) => {
    setGrid((prevGrid) => (
      prevGrid.map((val, i) => (
        (i === cellIndex) ? {
          ...val,
          level: (val?.level || 0) + 1
        } : val
      ))
    ));
  };

  function addItemToCell(itemId, index) {
    setGrid((prevGrid) => (
      prevGrid.map((val, i) => (
        (i === index)
          ? {
            itemId,
            level: 0
          }
          : val
      ))
    ));
  }

  return {
    upgradeCell,
    clearCell,
    clearGrid,
    addItemToCell
  };
}