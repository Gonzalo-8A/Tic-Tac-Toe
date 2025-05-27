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

const winningLines = getWinningLines(Array(9).fill(null));

export function checkWinner(index, newBoard, setWinner, setWinningLine) {
  const possibleWinningLines = winningLines.filter((line) =>
    line.includes(index)
  );
  for (const line of possibleWinningLines) {
    const [a, b, c] = line;
    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      confetti({
        particleCount: 150,
        spread: 120,
        startVelocity: 45,
        gravity: 0.8,
        scalar: 1.2,
        ticks: 300,
        origin: { x: 0.5, y: 0.7 },
        colors: ['#ff0040', '#00e5ff', '#ffea00', '#ffffff'],
      });
      setWinner(newBoard[a]);
      setWinningLine(line);
      return newBoard[a];
    }
  }

  if (!newBoard.includes(null)) {
    setWinner(false);
    return false;
  }

  return null;
}

export function getWinningLineStyle(line) {
  function arraysEqual(a, b) {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }
  const [a, b, c] = line;

  // Horizontal lines
  if (arraysEqual(line, [0, 1, 2])) {
    return {
      top: '11.33%',
      left: '50%',
      width: '110%',
      height: '4%',
      transform: 'translateX(-50%) scaleX(0)',
      transformOrigin: 'left center',
      animation: 'draw-line-horizontal 0.8s ease-out forwards',
    };
  }
  if (arraysEqual(line, [3, 4, 5])) {
    return {
      top: '48%',
      left: '50%',
      width: '110%',
      height: '4%',
      transform: 'translateX(-50%) scaleX(0)',
      transformOrigin: 'left center',
      animation: 'draw-line-horizontal 0.8s ease-out forwards',
    };
  }
  if (arraysEqual(line, [6, 7, 8])) {
    return {
      top: '83.33%',
      left: '50%',
      width: '110%',
      height: '4%',
      transform: 'translateX(-50%) scaleX(0)',
      transformOrigin: 'left center',
      animation: 'draw-line-horizontal 0.8s ease-out forwards',
    };
  }

  // Vertical lines
  if (arraysEqual(line, [0, 3, 6])) {
    return {
      top: '50%',
      left: '11.33%',
      width: '4%',
      height: '110%',
      transform: 'translateY(-50%) scaleY(0)',
      transformOrigin: 'center top',
      animation: 'draw-line-vertical 0.8s ease-out forwards',
    };
  }
  if (arraysEqual(line, [1, 4, 7])) {
    return {
      top: '50%',
      left: '48%',
      width: '4%',
      height: '110%',
      transform: 'translateY(-50%) scaleY(0)',
      transformOrigin: 'center top',
      animation: 'draw-line-vertical 0.8s ease-out forwards',
    };
  }
  if (arraysEqual(line, [2, 5, 8])) {
    return {
      top: '50%',
      left: '85.33%',
      width: '4%',
      height: '110%',
      transform: 'translateY(-50%) scaleY(0)',
      transformOrigin: 'center top',
      animation: 'draw-line-vertical 0.8s ease-out forwards',
    };
  }

  // Diagonal ↘︎
  if (a === 0 && b === 4 && c === 8) {
    return {
      top: '50%',
      left: '50%',
      width: '150%',
      height: '4%',
      transform: 'translate(-50%, -50%) rotate(45deg) scaleX(0)',
      transformOrigin: 'center',
      animation: 'draw-line-diagonal 0.8s ease-out forwards',
    };
  }

  // Diagonal ↙︎
  if (a === 2 && b === 4 && c === 6) {
    return {
      top: '50%',
      left: '50%',
      width: '150%',
      height: '4%',
      transform: 'translate(-50%, -50%) rotate(-45deg) scaleX(0)',
      transformOrigin: 'center',
      animation: 'draw-line-diagonal-inv 0.8s ease-out forwards',
    };
  }

  return {}; // fallback
}

function randomNum(array) {
  return Math.floor(Math.random() * array.length);
}

function getOffensiveMoves(board, aiSymbol) {
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

  return [...new Set(offensiveIndexes)];
}

function getCorner(board) {
  const cornersArray = [0, 2, 6, 8];

  const cornerOption = cornersArray.filter((i) => board[i] === null);
  if (cornerOption.length !== 0) {
    const randomIndex = randomNum(cornerOption);
    console.log('Go corner');
    return cornerOption[randomIndex];
  }
  return null;
}

function checkAggresiveOpen(board) {
  const oppositeCorners = {
    0: 8,
    2: 6,
    6: 2,
    8: 0,
  };

  for (const xCorner of [0, 2, 6, 8]) {
    const oCorner = oppositeCorners[xCorner];

    if (
      board[xCorner] === '✖️' &&
      board[4] === '✖️' &&
      board[oCorner] === '⭕'
    ) {
      const used = new Set([xCorner, 4, oCorner]);

      const restAreNull = board.every((cell, i) => {
        return used.has(i) || cell === null;
      });

      if (restAreNull) {
        return oCorner;
      }
    }
  }

  return null;
}

function randomMove(board) {
  const indexOptions = board.reduce((acc, cell, index) => {
    if (cell === null) acc.push(index);
    return acc;
  }, []);
  console.log('Random Move');
  return indexOptions[randomNum(indexOptions)];
}

//AI Moves

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

function checkFork(board, checkingSymbol, opponentSymbol, difficulty) {
  if (difficulty === 'easy') return null;
  const forkSpots = {};

  board.forEach((cell, index) => {
    if (cell !== null) return;

    const simulatedBoard = [...board];
    simulatedBoard[index] = checkingSymbol;

    let winningChances = 0;

    winningLines.forEach((line) => {
      const values = line.map((i) => simulatedBoard[i]);
      const hasOpponent = values.includes(opponentSymbol);
      const countSelf = values.filter((v) => v === checkingSymbol).length;
      const countEmpty = values.filter((v) => v === null).length;

      if (!hasOpponent && countSelf === 2 && countEmpty === 1) {
        winningChances++;
      }
    });

    if (winningChances >= 2) {
      forkSpots[index] = winningChances;
    }
  });

  const forkIndex = Object.keys(forkSpots)[0];

  if (forkIndex !== undefined) {
    return parseInt(forkIndex);
  } else {
    return null;
  }
}

function offensiveStart(board, aiSymbol, playersSymbol) {
  if (board.every((el) => el === null)) {
    const openningType = randomNum([0, 1]);
    if (openningType === 0) {
      return getCenter(board);
    } else {
      return getCorner(board);
    }
  }

  if (board.filter((cell) => cell === null).length === 7) {
    const aiMove = board
      .map((val, idx) => (val === aiSymbol ? idx : null))
      .filter((v) => v !== null);

    const playerMove = board
      .map((val, idx) => (val === playersSymbol ? idx : null))
      .filter((v) => v !== null);

    //Primer movimiento fue al centro
    if (
      aiMove.includes(4) &&
      playerMove.some((pos) => [0, 2, 6, 8].includes(pos))
    ) {
      const opposites = {
        0: 8,
        2: 6,
        6: 2,
        8: 0,
      };
      return opposites[playerMove[0]];
    }

    if (
      aiMove.includes(4) &&
      playerMove.some((pos) => [1, 3, 5, 7].includes(pos))
    ) {
      const opposites = {
        1: [6, 8],
        3: [2, 8],
        5: [0, 6],
        7: [0, 2],
      };
      return opposites[playerMove[0]][randomNum([0, 1])];
    }

    //Primer movimiento fue a una esquina
    if (
      aiMove.some((pos) => [0, 2, 6, 8].includes(pos)) &&
      playerMove.includes(4)
    ) {
      const opposites = {
        0: 8,
        2: 6,
        6: 2,
        8: 0,
      };
      return opposites[aiMove[0]];
    }

    if (
      aiMove.some((pos) => [0, 2, 6, 8].includes(pos)) &&
      playerMove.some((pos) => [1, 3, 5, 7].includes(pos))
    ) {
      return getCenter(board);
    }

    if (
      aiMove.some((pos) => [0, 2, 6, 8].includes(pos)) &&
      playerMove.some((pos) => [0, 2, 6, 8].includes(pos))
    ) {
      return getCorner(board);
    }
  }
  return null;
}

function getCenter(board) {
  if (board[4] === null) {
    return 4;
  } else {
    return null;
  }
}

function goWin(board, playersSymbol, aiSymbol, difficulty) {
  const offensiveIndexes = getOffensiveMoves(board, aiSymbol);
  if (offensiveIndexes.length === 0) return null;

  const playerHasDiagonalCorners =
    (board[0] === playersSymbol && board[8] === playersSymbol) ||
    (board[2] === playersSymbol && board[6] === playersSymbol);

  if (playerHasDiagonalCorners) {
    const posibleMoves = [1, 3, 5, 7].filter((i) => board[i] === null);
    const randomIndex = randomNum(posibleMoves);
    console.log(`Go sides ${posibleMoves} ${posibleMoves[randomIndex]}`);
    return posibleMoves[randomIndex];
  }

  if (difficulty === 'hard') {
    const oCorner = checkAggresiveOpen(board);
    if (oCorner) {
      const sides = {
        0: [1, 3],
        2: [1, 5],
        6: [3, 7],
        8: [5, 7],
      };

      const sidesToRemove = sides[oCorner];

      const filteredOptions = offensiveIndexes.filter(
        (index) => !sidesToRemove.includes(index)
      );

      const randomIndex = randomNum(filteredOptions);
      console.log('Block Forks');
      return filteredOptions[randomIndex];
    }

    const rivalFork = checkFork(board, playersSymbol, aiSymbol);
    if (rivalFork) {
      console.log('rivalFork:', rivalFork, 'My options:', offensiveIndexes);
      const filteredOffensiveIndexes = offensiveIndexes.filter(
        (offensiveIndex) => {
          return !winningLines.some((line) => {
            if (line.includes(offensiveIndex) && line.includes(rivalFork)) {
              const thirdIndex = line.find(
                (i) => i !== offensiveIndex && i !== rivalFork
              );
              console.log('BlockFork');

              return board[thirdIndex] === aiSymbol;
            }
            return false;
          });
        }
      );
      console.log(filteredOffensiveIndexes);
      const randomIndex = randomNum(filteredOffensiveIndexes);
      console.log('randomOffensive');
      return filteredOffensiveIndexes[randomIndex];
    }
  }
  const randomIndex = randomNum(offensiveIndexes);
  console.log(`Go offensive ${offensiveIndexes[randomIndex]}`);
  return offensiveIndexes[randomIndex];
}

function getLastMove(board, difficulty) {
  //Check for Corners
  if (difficulty !== 'easy') {
    const cornerMove = getCorner(board);
    if (cornerMove !== null) return cornerMove;
  }

  //Return Last Move
  return randomMove(board);
}

//AI Function

export function getAIMove(board, aiSymbol, playersSymbol, difficulty) {
  const winningMove = checkWinningMove(board, aiSymbol);
  console.log('winningMove llamado. Resultado: ', winningMove);
  if (winningMove !== null) return winningMove;

  const blockingMove = checkWinningMove(board, playersSymbol);
  console.log('blockingMove llamado. Resultado: ', blockingMove);
  if (blockingMove !== null) return blockingMove;

  if (difficulty !== 'easy') {
    const goOffensive = offensiveStart(board, aiSymbol, playersSymbol);
    console.log('goOffensive llamado. Resultado: ', goOffensive);
    if (goOffensive !== null) return goOffensive;
  }

  const getCenterMove = getCenter(board);
  console.log('getCenterMove llamado. Resultado: ', getCenterMove);
  if (getCenterMove !== null) return getCenterMove;

  if (difficulty !== 'easy') {
    const forkMove = checkFork(board, aiSymbol, playersSymbol, difficulty);
    console.log('forkMove llamado. Resultado: ', forkMove);
    if (forkMove !== null) return forkMove;
  }

  if (difficulty !== 'easy') {
    const winMove = goWin(board, playersSymbol, aiSymbol, difficulty);
    console.log('winMove llamado. Resultado: ', winMove);
    if (winMove !== null) return winMove;
  }

  const lastMove = getLastMove(board, difficulty);
  console.log('lastMove llamado. Resultado: ', lastMove);
  if (lastMove !== null) return lastMove;
}
