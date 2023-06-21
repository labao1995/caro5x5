import './App.scss';
import { useState } from 'react';
import Board from './components/Board/Board';

function App() {
  const [board, setBoard] = useState(Array(25).fill(null));
  const [player, setPlayer] = useState('X');
  const [isWinner, setIsWinner] = useState(null);


  const handleXO = (box) => {
    const newBoard = [...board];
    if (isWinner || newBoard[box]) return;
    newBoard[box] = player;
    setBoard(newBoard);
    setIsWinner(winConditions(newBoard));
    setPlayer(player === 'X' ? 'O' : 'X');
  }

  const winConditions = (squares) => {
    const lines = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d, e] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  return (
    <div className="App">
      <Board board={board} handleXO={handleXO} />
    </div>
  );
}

export default App;
