import React from 'react';

import style from './index.module.scss';

const GridItem = ({
  item,
  onRemoveClick
}) => (
  <div className={style.wrap}>
    <button
      className={style.removeBtn}
      onClick={onRemoveClick}>
      &times;
    </button>
    <p>{item.name}</p>
  </div>
);

export default GridItem;