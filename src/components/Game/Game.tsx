import { useState } from "react";
import Board from "../Board/Board";

export default function Game() {
  // Guardar en el estado la matriz de 9 elementos
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const historyLessLast = history.slice(0, -1); //Copiar el array history, menos el último elemento  
  const lastMoveDescription = currentMove > 0 ? `Estás en el movimiento #${currentMove}` : "Comienza el juego"; // Agregar el último movimiento como texto

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = historyLessLast.map((_, move) => {
    const description = move > 0 ? 'Ir al movimiento #' + move : 'Ir al inicio del juego';
    // let description;
    // if (move > 0) {
    //   description = 'Ir al movimiento #' + move;
    // } else {
    //   description = 'Ir al inicio del juego';
    // }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });



  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>
            {moves}
            <li>{lastMoveDescription}</li>
          </ol>
          {/* <button onClick={}>Invertir orden</button> */}
        </div>
      </div>
    </>
  )
}