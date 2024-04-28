import classNames from 'classnames';
import abbreviate from 'number-abbreviate';
import React from 'react';
import { useDrag } from 'react-dnd';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import style from './index.module.scss';

const ShopCell = ({
  id,
  name,
  cost,
  canAfford
}) => {
  const [
    { isDragging },
    drag
  ] = useDrag(() => ({
    type: 'item',
    item: { id },
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
        [style.canAfford]: canAfford
      })}>

      <div
        ref={drag}
        className={style.item}>
        <p className={style.name}>
          {name}
        </p>
        <p className={style.cost}>
          <CurrencySymbol />{abbreviate(cost, 2)}
        </p>
      </div>

    </div>
  );
};

export default ShopCell;