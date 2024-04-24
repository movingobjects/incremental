import classNames from 'classnames';
import React from 'react';
import { useDrag } from 'react-dnd';

import style from './index.module.scss';

const ShopItem = ({
  item
}) => {
  const [
    { isDragging },
    drag
  ] = useDrag(() => ({
    type: 'shopItem',
    item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={classNames({
        [style.wrap]: true,
        [style.isDragging]: isDragging
      })}>

      <p>{item?.name}</p>

    </div>
  );
};

export default ShopItem;