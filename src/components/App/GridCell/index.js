import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useDrop } from 'react-dnd';

import * as atoms from 'atoms';

import CurrencySymbol from 'components/shared/CurrencySymbol';

import style from './index.module.scss';

const GridCell = ({
  item,
  level,
  cycleValue,
  onItemDrop = () => { },
  onRemoveClick = () => { }
}) => {
  const gridCells = useAtomValue(atoms.gridCells);
  const shopItems = useAtomValue(atoms.shopItems);

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
  }), [
    gridCells,
    shopItems
  ]);

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

      {!!item && (
        <div className={style.item}>
          <p className={style.label}>
            <span className={style.name}>
              {item?.name}
            </span>
            {' '}
            <span className={style.level}>
              Δ{level}
            </span>
          </p>
          <p className={style.cycleValue}>
            <CurrencySymbol />{cycleValue}
          </p>
        </div>
      )}
    </div>
  );
};

export default GridCell;