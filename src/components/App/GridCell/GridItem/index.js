import React from 'react';

import style from './index.module.scss';

const GridItem = ({
  id,
  name
}) => (
  <div className={style.wrap}>
    <p>{name}</p>
  </div>
);

export default GridItem;