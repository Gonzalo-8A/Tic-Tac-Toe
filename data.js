export function getWinningLines(board) {
  const gameSize = Math.sqrt(board.length);

  const getWinningRows = () => {
    const winningRows = [];

    for (let row = 0; row < gameSize; row++) {
      const lines = [];
      for (let col = 0; col < gameSize; col++) {
        lines.push(row * gameSize + col);
      }
      winningRows.push(lines);
    }
    return winningRows;
  };

  const getWinningCols = () => {
    const winningCols = [];

    for (let col = 0; col < gameSize; col++) {
      const colArray = [];
      for (let row = 0; row < gameSize; row++) {
        colArray.push(row * gameSize + col);
      }
      winningCols.push(colArray);
    }

    return winningCols;
  };

  const getWinningDiag = () =>
    Array.from({ length: gameSize }, (_, i) => i * (gameSize + 1));

  const getWinningDiagInv = () =>
    Array.from({ length: gameSize }, (_, i) => (i + 1) * (gameSize - 1));

  return [
    ...getWinningRows(),
    ...getWinningCols(),
    getWinningDiag(),
    getWinningDiagInv(),
  ];
}
