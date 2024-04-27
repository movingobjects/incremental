const items = [
  {
    id: 'H0upTmy7d',
    name: 'Item 1',
    getCost: (count) => (
      10 * count
    ),
    getCycleValue: (level) => (
      (level + 1)
    )
  },
  {
    id: 'bzBHrK6yw',
    name: 'Item 2',
    getCost: (count) => (
      100 * (count + 1)
    ),
    getCycleValue: (level) => (
      (level + 1) * 10
    )
  },
  {
    id: 'Szg74SdNz3',
    name: 'Item 3',
    getCost: (count) => (
      1000 * (count + 1)
    ),
    getCycleValue: (level) => (
      (level + 1) * 100
    )
  }
];

export default items;