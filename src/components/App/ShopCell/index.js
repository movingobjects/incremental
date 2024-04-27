import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useDrag } from 'react-dnd';

import * as atoms from 'atoms';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import style from './index.module.scss';

const ShopCell = ({
  itemId,
  cost = 0
}) => {
  const items = useAtomValue(atoms.items);
  const balance = useAtomValue(atoms.balance);

  const item = items?.find(({ id }) => id === itemId);

  const [
    { isDragging },
    drag
  ] = useDrag(() => ({
    type: 'item',
    item: { id: itemId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    options: {
      dropEffect: 'copy'
    }
  }));

  return (
    <div
      className={classNames({
        [style.wrap]: true,
        [style.isDragging]: isDragging,
        [style.canAfford]: balance >= cost
      })}>

      <div
        ref={drag}
        className={style.item}>
        <p className={style.name}>
          {item.name}
        </p>
        <p className={style.cost}>
          <CurrencySymbol />{cost}
        </p>
      </div>

    </div>
  );
};

export default ShopCell;