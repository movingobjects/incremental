import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useDrop } from 'react-dnd';

import * as atoms from 'atoms';

import GridItem from './GridItem';

import style from './index.module.scss';

const GridCell = ({
  itemId,
  onItemDrop = () => { }
}) => {
  const items = useAtomValue(atoms.items);

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

  const item = items?.find(({ id }) => id === itemId);

  return (
    <div
      ref={drop}
      className={classNames({
        [style.wrap]: true,
        [style.isOver]: isOver
      })}>
      {item && (
        <GridItem
          {...item} />
      )}
    </div>
  );
};

export default GridCell;