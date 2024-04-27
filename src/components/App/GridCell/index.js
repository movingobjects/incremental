import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useDrop } from 'react-dnd';

import * as atoms from 'atoms';

import style from './index.module.scss';

const GridCell = ({
  cell,
  onItemDrop = () => { },
  onRemoveClick = () => { }
}) => {
  const [
    {
      isOver
    },
    drop
  ] = useDrop(() => ({
    accept: 'item',
    collect: (monitor) => ({
      isOver: monitor.isOver()
    }),
    drop: ({ id }) => {
      onItemDrop(id);
    }
  }));

  const {
    itemId,
    level
  } = cell || { };

  const items = useAtomValue(atoms.items);
  const item = items?.find(({ id }) => id === itemId);

  return (
    <div
      ref={drop}
      className={classNames({
        [style.wrap]: true,
        [style.isDraggingOver]: isOver,
        [style.hasItem]: !!item
      })}>

      <button
        className={style.removeBtn}
        onClick={onRemoveClick}>
        &times;
      </button>

      {!!itemId?.length && (
        <p>
          {item.name}
          {' '}
          <span className={style.level}>
            ({level})
          </span>
        </p>
      )}
    </div>
  );
};

export default GridCell;