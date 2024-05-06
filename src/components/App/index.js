import { useAtom, useAtomValue } from 'jotai';
import { cloneDeep, times } from 'lodash';
import abbreviate from 'number-abbreviate';
import React, { useState } from 'react';

import * as atoms from 'atoms';
import useCycle from 'hooks/useCycle';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import GridCell from './GridCell';
import ShopCell from './ShopCell';

import style from './index.module.scss';

const App = () => {
  const [gridCells, setGridCells] = useAtom(atoms.gridCells);
  const shopItems = useAtomValue(atoms.shopItems);
  const [balance, setBalance] = useAtom(atoms.balance);

  const [gridCycleValue, setGridCycleValue] = useState(0);

  useCycle(({ cycles }) => {
    let nextGridCells = cloneDeep(gridCells);
    let cycleValue = 0;

    gridCells.forEach(({
      itemId,
      level
    }, cellIndex) => {
      const item = shopItems?.find(({ id }) => id === itemId);

      if (item) {
        nextGridCells = item?.performGridEffect(nextGridCells, cellIndex);
        cycleValue += item?.getCycleValue(level, gridCells, cellIndex) || 0;
      }
    });

    setGridCells(nextGridCells);
    setGridCycleValue(cycleValue);

    setBalance((prev) => (
      prev + (cycleValue * cycles)
    ));
  }, 0.5);

  function clearGrid() {
    setGridCells(
      times(25, () => ({ }))
    );
  }

  function clearCell(cellIndex) {
    setGridCells((prev) => (
      prev.map((val, i) => (
        (i === cellIndex) ? { } : val
      ))
    ));
  }

  function addItemToCell(itemId, cellIndex) {
    setGridCells((prev) => (
      prev.map((val, i) => (
        (i === cellIndex)
          ? {
            itemId,
            level: 0
          }
          : val
      ))
    ));
  }

  function onClearClick() {
    clearGrid();
  }

  function onResetClick() {
    setBalance(20);
    clearGrid();
  }

  function onUpgradeCell(cellIndex) {
    const cell = gridCells[cellIndex];
    const item = shopItems?.find(({ id }) => id === cell?.itemId);
    const upgradeCost = item?.upgradeCosts?.[cell?.level + 1];
    const canUpgrade = balance > upgradeCost;

    if (canUpgrade) {
      setGridCells((prevGrid) => (
        prevGrid.map((val, i) => (
          (i === cellIndex) ? {
            ...val,
            level: (val?.level || 0) + 1
          } : val
        ))
      ));
      setBalance((prevBalance) => (
        prevBalance - upgradeCost
      ));
    }
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
            <CurrencySymbol />{abbreviate(balance, 2)}
          </span>
          <br />
          <span className={style.cycleValue}>
            <CurrencySymbol />{abbreviate(gridCycleValue, 2)}/cycle
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
          {times(25, (index) => {
            const cell = gridCells?.[index];
            return (
              <li key={index}>
                <GridCell
                  cellIndex={index}
                  {...cell}
                  onItemDrop={(itemId) => {
                    onItemDrop(itemId, index);
                  }}
                  onUpgradeClick={() => {
                    onUpgradeCell(index);
                  }}
                  onRemoveClick={() => {
                    clearCell(index);
                  }} />
              </li>
            );
          })}
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