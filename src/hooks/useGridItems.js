import { times } from 'lodash';
import { useState } from 'react';

export default function useGridItems({
  gridSize = 5
}) {
  const items = [
    {
      id: 'H0upTmy7d',
      name: 'Item 1',
      score: () => (
        1
      )
    },
    {
      id: 'bzBHrK6yw',
      name: 'Item 2',
      score: () => (
        10
      )
    },
    {
      id: 'Szg74SdNz3',
      name: 'Item 3',
      score: () => (
        100
      )
    }
  ];

  const [gridItems, setGridItems] = useState(
    times(gridSize * gridSize, () => null)
  );

  const onItemDrop = (index, item) => {
    setGridItems((prevItems) => (
      prevItems.map((val, i) => (
        (i === index) ? item : val
      ))
    ));
  };

  const removeItem = (index) => {
    setGridItems((prevItems) => (
      prevItems.map((val, i) => (
        (i === index) ? null : val
      ))
    ));
  };

  const getCyclePts = (cycles) => (
    times(cycles, () => (
      gridItems
        .filter((item) => !!item)
        .reduce((sum, item) => (
          sum + item.score()
        ), 0)
    )).reduce((sum, pts) => (
      sum + pts
    ), 0)
  );

  return {
    items,
    gridItems,
    getCyclePts,
    onItemDrop,
    removeItem
  };
}