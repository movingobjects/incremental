import { useAtom, useAtomValue } from 'jotai';
import React from 'react';

import * as atoms from 'atoms';
import useCycle from 'hooks/useCycle';
import useGrid from 'hooks/useGrid';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import GridCell from './GridCell';
import ShopCell from './ShopCell';

import style from './index.module.scss';

const App = () => {
  const [balance, setBalance] = useAtom(atoms.balance);

  const gridCells = useAtomValue(atoms.gridCells);
  const shopItems = useAtomValue(atoms.shopItems);
  const gridCycleValue = useAtomValue(atoms.gridCycleValue);

  const {
    clearCell,
    clearGrid,
    addItemToCell
  } = useGrid({
    gridSize: 5
  });

  useCycle(({ cycles }) => {
    setBalance((prevBalance) => (
      prevBalance + (gridCycleValue * cycles)
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
    const {
      cost = 0,
      canAfford = false
    } = shopItems?.find(({ id }) => id === itemId) || { };

    if (canAfford) {
      addItemToCell(itemId, cellIndex);
      setBalance((prevBalance) => (
        prevBalance - cost
      ));
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
            <CurrencySymbol />{gridCycleValue}/cycle
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
                {...cell}
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
          {shopItems?.map((item, index) => (
            <li key={index}>
              <ShopCell
                {...item} />
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default App;