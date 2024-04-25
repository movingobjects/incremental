import { useAtom } from 'jotai';
import React from 'react';

import * as atoms from 'atoms';
import useCycle from 'hooks/useCycle';
import useGridItems from 'hooks/useGridItems';

import GridCell from './GridCell';
import ShopItem from './ShopItem';

import style from './index.module.scss';

const App = () => {
  const [pts, setPts] = useAtom(atoms.pts);

  const {
    items = [],
    gridItems = [],
    getCyclePts,
    removeItem,
    onItemDrop
  } = useGridItems({
    gridSize: 5
  });

  useCycle(({ cycles }) => {
    setPts((prevPts) => (
      prevPts + getCyclePts(cycles)
    ));
  });

  return (
    <div className={style.wrap}>

      <h2>Incremental</h2>

      <p>Points: {pts}</p>

      <div className={style.layout}>

        <ul className={style.grid}>
          {gridItems.map((item, cellIndex) => (
            <li key={cellIndex}>
              <GridCell
                item={item}
                onItemDrop={(droppedItem) => {
                  onItemDrop(cellIndex, droppedItem);
                }}
                onRemoveClick={() => {
                  removeItem(cellIndex);
                }} />
            </li>
          ))}
        </ul>

        <ul className={style.shop}>
          {items?.map((item, index) => (
            <li key={index}>
              <ShopItem
                item={item} />
            </li>
          ))}
        </ul>

      </div>

    </div>
  );
};

export default App;