import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useDrag } from 'react-dnd';

import * as atoms from 'atoms';

import style from './index.module.scss';

const ShopCell = ({
  itemId
}) => {
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

  const items = useAtomValue(atoms.items);
  const item = items?.find(({ id }) => id === itemId);

  return (
    <div
      className={classNames({
        [style.wrap]: true,
        [style.isDragging]: isDragging
      })}>

      <div
        ref={drag}
        className={style.item}>
        <p>{item.name}</p>
      </div>

    </div>
  );
};

export default ShopCell;