const indexToColRow = (cellIndex) => ({
  col: cellIndex % 5,
  row: Math.floor(cellIndex / 5)
});

const getAdjacent = (gridCells, cellIndex) => {
  const {
    col,
    row
  } = indexToColRow(cellIndex);

  gridCells?.filter((cell, index) => {
    if (index === cellIndex) return false;

    const {
      col: testCol,
      row: testRow
    } = indexToColRow(index);

    if (testCol === col) {
      if (
        testRow === row - 1 ||
        testRow === row + 1
      ) {
        return true;
      }
    } else if (testRow === row) {
      if (
        testCol === col - 1 ||
        testCol === col + 1
      ) {
        return true;
      }
    }

    return false;
  });
};

const getSurrounding = (gridCells, cellIndex) => {
  const {
    col,
    row
  } = indexToColRow(cellIndex);

  gridCells?.filter((cell, index) => {
    if (index === cellIndex) return false;

    const {
      col: testCol,
      row: testRow
    } = indexToColRow(index);

    return (
      Math.abs(col - testCol) <= 1 &&
      Math.abs(row - testRow) <= 1
    );
  });
};

const items = [
  {
    id: 'generator',
    name: 'Generator',
    upgradeCosts: [
      0,
      20,
      100,
      400,
      1500,
      500000,
      200000000
    ],
    buyCosts: [
      10,
      20,
      40,
      80,
      150,
      300,
      600,
      1000,
      1500,
      2000,
      3000,
      4000,
      5000,
      6000,
      8000,
      10000,
      12000,
      14000,
      16000,
      18000,
      20000,
      25000,
      30000,
      40000,
      50000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      level + 1
    )
  },
  {
    id: 'leech',
    name: 'Leech',
    upgradeCosts: [
      0,
      500,
      50000
    ],
    buyCosts: [
      100,
      200,
      400,
      800,
      1600,
      2400,
      3000,
      4000,
      5000,
      6000,
      7000,
      8000,
      9000,
      10000,
      11000,
      12000,
      13000,
      14000,
      15000,
      16000,
      17000,
      18000,
      19000,
      20000,
      21000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 10
    )
  },
  {
    id: 'catalyst',
    name: 'Catalyst',
    upgradeCosts: [
      0
    ],
    buyCosts: [
      1000,
      2000,
      3000,
      4000,
      5000,
      7000,
      9000,
      11000,
      14000,
      18000,
      22000,
      26000,
      30000,
      35000,
      40000,
      50000,
      60000,
      70000,
      80000,
      90000,
      100000,
      150000,
      200000,
      300000,
      500000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 100
    )
  },
  {
    id: 'leader',
    name: 'Leader',
    upgradeCosts: [
      0,
      1000000,
      5000000
    ],
    buyCosts: [
      125000,
      175000,
      250000,
      400000,
      700000,
      1200000,
      2000000,
      3000000,
      5000000,
      8000000,
      10000000,
      20000000,
      40000000,
      80000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 100
    )
  },
  {
    id: 'taskmaster',
    name: 'Task master',
    upgradeCosts: [
      0
    ],
    buyCosts: [
      1000000,
      1400000,
      2000000,
      3000000,
      5000000,
      8000000,
      16000000,
      30000000,
      50000000,
      80000000,
      110000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000,
      150000000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 100
    )
  },
  {
    id: 'boss',
    name: 'Boss',
    upgradeCosts: [
      0,
      50000000,
      3000000000
    ],
    buyCosts: [
      20000000,
      40000000,
      80000000,
      150000000,
      300000000,
      600000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000,
      1000000000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 100
    )
  },
  {
    id: 'blackHole',
    name: 'Black hole',
    upgradeCosts: [
      0
    ],
    buyCosts: [
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000,
      1000000000000000
    ],
    performGridEffect: (gridCells, cellIndex) => (
      gridCells
    ),
    getCycleValue: (level, gridCells, cellIndex) => (
      (level + 1) * 100
    )
  }
];

export default items;