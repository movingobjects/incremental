import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';

import GridItem from './GridItem';

import style from './index.module.scss';

const GridCell = ({
  item,
  onItemDrop = () => { },
  onRemoveClick = () => { }
}) => {
  const [
    {
      isOver
    },
    drop
  ] = useDrop(() => ({
    accept: 'shopItem',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: (item) => {
      onItemDrop(item);
    }
  }));

  return (
    <div
      ref={drop}
      className={classNames({
        [style.wrap]: true,
        [style.isOver]: isOver
      })}>
      {item && (
        <GridItem
          item={item}
          onRemoveClick={onRemoveClick} />
      )}
    </div>
  );
};

export default GridCell;