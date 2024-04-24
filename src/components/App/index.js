import { useAtomValue } from 'jotai';
import { times } from 'lodash';
import React, { useState } from 'react';

import * as atoms from 'atoms';

import GridCell from './GridCell';
import ShopItem from './ShopItem';

import style from './index.module.scss';

const GRID_SIZE = 5;

const App = () => {
  const items = useAtomValue(atoms.items);

  const [gridItemIds, setGridItemIds] = useState(
    times(GRID_SIZE * GRID_SIZE, () => null)
  );

  function onItemDrop(index, item) {
    setGridItemIds((state) => (
      state.map((val, i) => (
        (i === index) ? item?.id : val
      ))
    ));
  }

  return (
    <div className={style.wrap}>

      <h2>Incremental</h2>

      <div className={style.layout}>

        <ul className={style.grid}>
          {gridItemIds.map((itemId, cellIndex) => (
            <li key={cellIndex}>
              <GridCell
                itemId={itemId}
                onItemDrop={(droppedItem) => {
                  onItemDrop(cellIndex, droppedItem);
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