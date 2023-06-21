import './App.scss';
import { useState, useEffect } from 'react';
import Board from './components/Board/Board';

function App() {
    const [board, setBoard] = useState(Array(25).fill(null));
    const [emptyBoard, setEmptyBoard] = useState([]);
    const [player, setPlayer] = useState('X');
    const [computerTurn, setComputerTurn] = useState(false);
    const [isWinner, setIsWinner] = useState(null);

    const players = ['X', 'O'];
    const handleXO = (box) => {
        if (!computerTurn) {
            const newBoard = [...board];
            if (isWinner || newBoard[box]) return;
            newBoard[box] = player;
            setBoard(newBoard);
            setIsWinner(winConditions(newBoard));
            setComputerTurn(true);
        }
    };

    const handleReset = () => {
        setBoard(Array(25).fill(null));
        setIsWinner(null);
        setEmptyBoard([]);
        setComputerTurn(false);
    };

    const handleChangePlayer = (e) => {
        setPlayer(e.target.value);
        handleReset();
    };

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
            [4, 8, 12, 16, 20],
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

    useEffect(() => {
        const newBoard = board.map((item, index) => {
            if (item === null) {
                return index;
            }
            return item;
        });
        setEmptyBoard(newBoard);
        if (board.every((item) => item !== null) && !isWinner) {
            alert('Draw');
            handleReset();
        }
    }, [board]);

    useEffect(() => {
        const delayComputer = 800;
        const computerPlayer = player === 'X' ? 'O' : 'X';
        const computer = () => {
            let random = Math.floor(Math.random() * emptyBoard.length);
            const newBoard = [...board];
            while (newBoard[emptyBoard[random]] !== null) {
                random = Math.floor(Math.random() * emptyBoard.length);
            }
            newBoard[emptyBoard[random]] = computerPlayer;
            setBoard(newBoard);
            setIsWinner(winConditions(newBoard));
            setComputerTurn(false);
        };
        let computerPlay;
        if (!isWinner && computerTurn) {
            computerPlay = setTimeout(() => {
                computer();
            }, delayComputer);
        }
        return () => {
            clearTimeout(computerPlay);
        };
    }, [emptyBoard, player, isWinner]);

    return (
        <div className='App'>
            <h1>Tic Tac Toe</h1>
            <button onClick={handleReset}>Reset</button>
            &nbsp;<label htmlFor=''>player</label>
            <select name='' id='' onChange={handleChangePlayer}>
                {players.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <Board board={board} handleXO={handleXO} />
        </div>
    );
}

export default App;
