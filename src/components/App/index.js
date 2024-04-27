import { useAtom, useAtomValue } from 'jotai';
import React from 'react';

import * as atoms from 'atoms';
import useCycle from 'hooks/useCycle';
import useGridCells from 'hooks/useGridCells';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import GridCell from './GridCell';
import ShopCell from './ShopCell';

import style from './index.module.scss';

const App = () => {
  const [balance, setBalance] = useAtom(atoms.balance);
  const items = useAtomValue(atoms.items);

  const {
    gridCells = [],
    cycleValue,
    getItemCost,
    addItemToCell,
    clearCell,
    clearGrid
  } = useGridCells({
    gridSize: 5
  });

  useCycle(({ cycles }) => {
    setBalance((prevBalance) => (
      prevBalance + (cycleValue * cycles)
    ));
  }, 0.5);

  function onClearClick() {
    clearGrid();
  }

  function onResetClick() {
    setBalance(0);
    clearGrid();
  }

  function onItemDrop(itemId, cellIndex) {
    const cost = getItemCost(itemId);
    if (balance >= cost) {
      setBalance((prevBalance) => (
        prevBalance - cost
      ));
      addItemToCell(itemId, cellIndex);
    }
  }

  return (
    <div className={style.wrap}>

      <div className={style.header}>
        <h2>Incremental</h2>

        <p className={style.stats}>
          <span className={style.balance}>
            <CurrencySymbol />{balance}
          </span>
          <br />
          <span className={style.cycleValue}>
            <CurrencySymbol />{cycleValue}/cycle
          </span>
        </p>
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
                  onItemDrop(itemId, index);
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
                itemId={item?.id}
                cost={getItemCost(item?.id)} />
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default App;