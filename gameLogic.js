import confetti from 'canvas-confetti';

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

  const getWinningDiag = () => Array.from({ length: gameSize }, (_, i) => i * (gameSize + 1));

  const getWinningDiagInv = () =>
    Array.from({ length: gameSize }, (_, i) => (i + 1) * (gameSize - 1));

  return [...getWinningRows(), ...getWinningCols(), getWinningDiag(), getWinningDiagInv()];
}

const winningLines = getWinningLines(Array(9).fill(null));

export function checkWinner(index, newBoard, setWinner) {
  const possibleWinningLines = winningLines.filter((line) => line.includes(index));
  for (const line of possibleWinningLines) {
    const [a, b, c] = line;
    if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
      confetti({ particleCount: 100, spread: 70 });
      setWinner(newBoard[a]);
      return newBoard[a];
    }
  }

  if (!newBoard.includes(null)) {
    setWinner(false);
    return false;
  }

  return null;
}

function randomNum(array) {
  return Math.floor(Math.random() * array.length);
}

function checkWinningMove(board, checkingSymbol) {
  for (const line of winningLines) {
    const lineIndexs = [...line];

    let symbolCount = 0;
    let nullCount = 0;
    let targetIndex = 0;

    lineIndexs.forEach((index) => {
      const value = board[index];
      if (value === checkingSymbol) {
        symbolCount++;
      } else if (value === null) {
        nullCount++;
        targetIndex = index;
      }
    });

    if (symbolCount === 2 && nullCount === 1) {
      return targetIndex;
    }
  }
  return null;
}

function checkFork(board, checkingSymbol, playersSymbol) {
  const possibleForkLines = winningLines.filter((line) => {
    const values = line.map((index) => board[index]);
    return !values.includes(playersSymbol) && values.includes(checkingSymbol);
  });

  const emptyForkSpots = {};

  possibleForkLines.forEach((line) => {
    line.forEach((index) => {
      if (board[index] === null) {
        emptyForkSpots[index] = (emptyForkSpots[index] || 0) + 1;
      }
    });
  });

  const forkIndex = Object.keys(emptyForkSpots).find((index) => emptyForkSpots[index] >= 2);

  return forkIndex ? parseInt(forkIndex) : null;
}

function getCenter(board) {
  if (board[4] === null) {
    return 4;
  } else {
    return null;
  }
}

function goWin(board, playersSymbol, aiSymbol) {
  let offensiveIndexes = [];

  for (const line of winningLines) {
    const lineIndexs = [...line];

    let symbolCount = 0;
    let nullCount = 0;
    let targetIndex = [];

    lineIndexs.forEach((index) => {
      const value = board[index];
      if (value === aiSymbol) {
        symbolCount++;
      } else if (value === null) {
        nullCount++;
        targetIndex.push(index);
      }
    });

    if (symbolCount === 1 && nullCount === 2) {
      offensiveIndexes.push(...targetIndex);
    }
  }

  if (offensiveIndexes.length === 0) return null;

  const uniqueOffensiveIndexes = [...new Set(offensiveIndexes)];

  if (
    (board[0] === playersSymbol && board[8] === playersSymbol) ||
    (board[2] === playersSymbol && board[6] === playersSymbol)
  ) {
    const posibleMoves = [1, 3, 5, 7].filter((i) => board[i] === null);
    const randomIndex = randomNum(posibleMoves);

    return posibleMoves[randomIndex];
  } else {
    const rivalFork = checkFork(board, playersSymbol, aiSymbol);
    if (rivalFork) {
      const filteredOffensiveIndexes = uniqueOffensiveIndexes.filter((offensiveIndex) => {
        return !winningLines.some((line) => {
          if (line.includes(offensiveIndex) && line.includes(rivalFork)) {
            const thirdIndex = line.find((i) => i !== offensiveIndex && i !== rivalFork);
            return board[thirdIndex] === aiSymbol;
          }
          return false;
        });
      });
      const randomIndex = randomNum(filteredOffensiveIndexes);
      return filteredOffensiveIndexes[randomIndex];
    }
  }
  return null;
}

function getLastMove(board, aiSymbol) {
  const cornersArray = [0, 2, 6, 8];

  if (cornersArray.every((i) => board[i] === null)) {
    const randomIndex = randomNum(cornersArray);
    return cornersArray[randomIndex];
  }

  let offensiveIndexes = [];

  for (const line of winningLines) {
    const lineIndexs = [...line];

    let symbolCount = 0;
    let nullCount = 0;
    let targetIndex = [];

    lineIndexs.forEach((index) => {
      const value = board[index];
      if (value === aiSymbol) {
        symbolCount++;
      } else if (value === null) {
        nullCount++;
        targetIndex.push(index);
      }
    });

    if (symbolCount === 1 && nullCount === 2) {
      offensiveIndexes.push(...targetIndex);
    }
  }

  const uniqueOffensiveIndexes = [...new Set(offensiveIndexes)];

  if (uniqueOffensiveIndexes.length !== 0) {
    const randomIndex = randomNum(uniqueOffensiveIndexes);
    return uniqueOffensiveIndexes[randomIndex];
  } else {
    const indexOptions = board
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    const randomIndex = randomNum(indexOptions);
    return indexOptions[randomIndex];
  }
}

export function getAIMove(board, aiSymbol, playersSymbol) {

  const winningMove = checkWinningMove(board, aiSymbol);
  if (winningMove !== null) return winningMove;

  const blockingMove = checkWinningMove(board, playersSymbol);
  if (blockingMove !== null) return blockingMove;

  const getCenterMove = getCenter(board);
  if (getCenterMove !== null) return getCenterMove;

  const forkMove = checkFork(board, aiSymbol, playersSymbol);
  if (forkMove !== null) return forkMove;

  const winMove = goWin(board, playersSymbol, aiSymbol);
  if (winMove !== null) return winMove;

  const lastMove = getLastMove(board, aiSymbol);
  if (lastMove !== null) return lastMove;

  // const blockForkMove = checkFork(board, playersSymbol, aiSymbol);
  // if (blockForkMove !== null) return blockForkMove;
}
