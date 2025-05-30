import React, { useState } from 'react';

/*
  MAIN CONTAINER FOR TIC-TAC-TOE GAME

  Features:
    - Local two player: X and O
    - 3x3 clickable grid, centered
    - Turn indicator (text, color highlight)
    - Win/draw detection
    - Highlight winning line
    - Reset button
    - Light theme, primary/secondary/accent colors:
      --primary: #ffffff
      --secondary: #000000
      --accent: #2196f3
*/

// PUBLIC_INTERFACE
function TicTacToe() {
  // Board cells: null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // true = X's turn, false = O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Winner: null | 'X' | 'O'
  const [winner, setWinner] = useState(null);
  // If draw
  const [isDraw, setIsDraw] = useState(false);
  // Winning cells index array
  const [winLine, setWinLine] = useState([]);

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    // Do nothing if already game over or occupied
    if (winner || isDraw || board[idx]) return;

    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';

    // Check win/draw
    const { winner: nextWinner, line: nextWinLine } = calculateWinner(nextBoard);
    const isBoardFull = nextBoard.every((cell) => cell !== null);
    setBoard(nextBoard);
    setWinner(nextWinner);
    setWinLine(nextWinLine || []);

    if (!nextWinner && isBoardFull) {
      setIsDraw(true);
    }

    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
    setWinLine([]);
  }

  // PUBLIC_INTERFACE
  function calculateWinner(squares) {
    // All possible winning lines
    const lines = [
      // Horizontals
      [0,1,2], [3,4,5], [6,7,8],
      // Verticals
      [0,3,6], [1,4,7], [2,5,8],
      // Diagonals
      [0,4,8], [2,4,6],
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line };
      }
    }
    return { winner: null, line: null };
  }

  // Helper: get color for a player
  function playerColor(player) {
    if (player === 'X') return 'var(--accent, #2196f3)';
    if (player === 'O') return 'var(--secondary, #000000)';
    return '';
  }

  // Helper: Returns a string describing current game state
  function statusMessage() {
    if (winner) {
      return (
        <>
          <span style={{color: playerColor(winner), fontWeight: 700}}>
            {winner}
          </span> wins!
        </>
      );
    }
    if (isDraw) {
      return "It's a draw!";
    }
    // Else, show current player's turn
    const current = xIsNext ? 'X' : 'O';
    return (
      <>
        Turn:&nbsp;
        <span style={{color: playerColor(current), fontWeight: 700}}>
          {current}
        </span>
      </>
    );
  }

  // Styling (could be moved to a .css but inlined here for isolation)
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 64px)',
    gridTemplateRows: 'repeat(3, 64px)',
    gap: '0',
    background: '#fff',
    borderRadius: '10px',
    border: '2px solid var(--accent, #2196f3)',
    boxShadow: '0 2px 20px rgba(25,70,140,0.1)',
    margin: '24px auto',
    width: 'fit-content'
  };

  const cellStyle = idx => ({
    width: 64,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 600,
    cursor: board[idx] || winner || isDraw ? 'not-allowed' : 'pointer',
    color: winLine.includes(idx)
      ? 'var(--accent, #2196f3)'
      : board[idx] === 'X'
        ? 'var(--accent, #2196f3)'
        : board[idx] === 'O'
          ? 'var(--secondary, #000000)'
          : 'var(--secondary, #000000)',
    background: winLine.includes(idx)
      ? 'rgba(33,150,243,0.12)'
      : '#fff',
    border: [
      (idx % 3) !== 2 ? '2px solid var(--accent, #2196f3)' : 'none',
      (idx < 6) ? '2px solid var(--accent, #2196f3)' : 'none',
      'none',
      'none'
    ],
    borderRight: (idx % 3) !== 2 ? '2px solid var(--accent, #2196f3)' : 'none',
    borderBottom: (idx < 6) ? '2px solid var(--accent, #2196f3)' : 'none',
    borderLeft: 'none',
    borderTop: 'none',
    borderRadius: [
      idx === 0 ? '10px 0 0 0' : '',
      idx === 2 ? '0 10px 0 0' : '',
      idx === 6 ? '0 0 0 10px' : '',
      idx === 8 ? '0 0 10px 0' : '',
    ].filter(Boolean).join(' ')
  });

  const containerStyle = {
    minHeight: '100vh',
    background: 'var(--primary, #fff)',
    color: 'var(--secondary, #000)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Inter, Arial, Helvetica, sans-serif',
    padding: '32px 10px'
  };

  const statusStyle = {
    margin: '18px 0',
    fontSize: 22,
    fontWeight: 500,
    minHeight: 32,
    color: winner
      ? playerColor(winner)
      : isDraw
        ? '#666'
        : 'var(--secondary, #000)',
    textAlign: 'center'
  };

  const resetBtnStyle = {
    background: 'var(--accent, #2196f3)',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    marginTop: 16,
    padding: '10px 30px',
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 1,
    cursor: 'pointer',
    outline: 'none',
    boxShadow: '0 2px 6px rgba(33,150,243,0.09)'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{fontWeight: 700, letterSpacing: 1, margin: 10, fontSize: 32, color: 'var(--accent, #2196f3)'}}>TicTacToe</h2>
      <div style={gridStyle}>
        {board.map((cell, idx) => (
          <div
            key={idx}
            style={cellStyle(idx)}
            onClick={() => handleClick(idx)}
            data-testid={`cell-${idx}`}
            aria-label={`cell ${idx%3 +1},${Math.floor(idx/3)+1}`}
            tabIndex={0}
          >
            {cell}
          </div>
        ))}
      </div>
      <div style={statusStyle}>
        {statusMessage()}
      </div>
      <button
        style={resetBtnStyle}
        onClick={handleReset}
        aria-label="Reset game"
        data-testid="reset-btn"
      >
        Reset
      </button>
      <div style={{marginTop: 28, color: '#aaa', fontSize: 14}}>
        <span>Player&nbsp;<span style={{color: playerColor('X')}}>X</span>: Blue | Player&nbsp;<span style={{color: playerColor('O')}}>O</span>: Black</span>
      </div>
    </div>
  );
}

export default TicTacToe;
