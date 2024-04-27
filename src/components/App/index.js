import { useAtom, useAtomValue } from 'jotai';
import { times } from 'lodash';
import React from 'react';

import * as atoms from 'atoms';
import useCycle from 'hooks/useCycle';
import useGridCells from 'hooks/useGridCells';

import GridCell from './GridCell';
import ShopCell from './ShopCell';

import style from './index.module.scss';

const App = () => {
  const [pts, setPts] = useAtom(atoms.pts);
  const items = useAtomValue(atoms.items);

  const {
    gridCells = [],
    getCyclePts,
    onItemDrop,
    clearCell,
    clearGrid
  } = useGridCells({
    gridSize: 5
  });

  useCycle(({ cycles }) => {
    const newPts = (
      times(cycles, () => (
        getCyclePts()
      )).reduce((sum, pts) => (
        sum + pts
      ), 0)
    );

    setPts((prevPts) => (
      prevPts + newPts
    ));
  });

  function onClearClick() {
    clearGrid();
  }

  function onResetClick() {
    setPts(0);
    clearGrid();
  }

  return (
    <div className={style.wrap}>

      <div className={style.header}>
        <h2>Incremental</h2>

        <p>Points: {pts}</p>
        <p>
          <button
            onClick={onClearClick}>
            Clear
          </button>
          {' '}
          <button
            onClick={onResetClick}>
            Reset
          </button>
        </p>
      </div>

      <div className={style.layout}>

        <ul className={style.grid}>
          {gridCells.map((cell, index) => (
            <li key={index}>
              <GridCell
                cell={cell}
                onItemDrop={(itemId) => {
                  onItemDrop(index, itemId);
                }}
                onRemoveClick={() => {
                  clearCell(index);
                }} />
            </li>
          ))}
        </ul>

        <ul className={style.shop}>
          {items?.map((item, index) => (
            <li key={index}>
              <ShopCell
                itemId={item?.id} />
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default App;