const items = [
  {
    id: 'H0upTmy7d',
    name: 'Item 1',
    getCost: (count) => (
      10 * count
    ),
    score: (level) => (
      level
    )
  },
  {
    id: 'bzBHrK6yw',
    name: 'Item 2',
    getCost: (count) => (
      100 * (count + 1)
    ),
    score: (level) => (
      level * 10
    )
  },
  {
    id: 'Szg74SdNz3',
    name: 'Item 3',
    getCost: (count) => (
      1000 * (count + 1)
    ),
    score: (level) => (
      level * 100
    )
  }
];

export default items;