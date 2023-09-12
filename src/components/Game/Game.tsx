import { useState } from "react";
import Board from "../Board/Board";

export default function Game() {
  // Guardar en el estado la matriz de 9 elementos
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascendingOrder, setAscendingOrder] = useState(true); // Estado para controlar el orden ascendente/descendente
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // const historyLessLast = history.slice(0, -1); //Copiar el array history, menos el último elemento  
  const lastMoveDescription = currentMove > 0 ? `Estás en el movimiento #${currentMove}` : "Comienza el juego"; // Agregar el último movimiento como texto

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleOrder() {
    setAscendingOrder(!ascendingOrder);
  }

  const moves = history
    .slice(0, -1)
    .map((_, move) => {
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

  // Incluye el último movimiento en reversedMoves
  const reversedMoves = [...moves, <li key="lastMove">{lastMoveDescription}</li>];

  // Invierte el orden de reversedMoves si es necesario
  const orderedMoves = ascendingOrder ? reversedMoves : [...reversedMoves].reverse();


  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <button onClick={toggleOrder}>Cambiar orden ({ascendingOrder ? "Ascendente" : "Descendente"})</button>
          <ol>{orderedMoves}</ol>
        </div>
      </div>
    </>
  )
}