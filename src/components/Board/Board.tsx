import { useEffect, useState } from "react";
import Square from "../Square/Square";

interface SquareProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: any;
}

export default function Board(props: SquareProps) {
  const [winningLine, setWinningLine] = useState<number[]>([])
  const [winner, setWinner] = useState<null | 'X' | 'O'>(null);

  function handleClick(i: number) {
    // [...props.squares] solo copia las propiedades inmediatas, pero matiene las referencias en las profundas
    const nextSquares = structuredClone(props.squares);
    nextSquares[i] = props.xIsNext ? 'X' : 'O';

    const { winner, line } = calculateWinner(nextSquares);

    if (winner) setWinner(winner)
    if (line) setWinningLine(line);

    if (props.squares[i]) return;
    props.onPlay(nextSquares);

    console.log(props.squares)
  }

  function haveNoMoreMovements() {
    if (!props.squares.includes(null)) {
      return true;
    }
  }

  const status =
    winner
      ? 'Ganador: ' + winner
      : haveNoMoreMovements()
        ? 'El resultado fue un empate'
        : 'Siguiente jugador: ' + (props.xIsNext ? "X" : "O");
  // let status;
  // if (winner) {
  //   status = "Ganador: " + winner;
  // } else {
  //   status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  // }

  // Crear el tablero
  // const rows = [0, 1, 2];
  // rows.map(...)

  const board = Array(3)
    .fill(null)
    .map((_, row) => (
      <div key={row} className="board-row">
        {Array(3)
          .fill(null)
          .map((_, col) => {

            const squareIndex = row * 3 + col;
            return (
              <Square
                disabled={!!winner}
                isHighlighted={winningLine.includes(squareIndex)}
                key={squareIndex}
                value={props.squares[squareIndex.toString()]}
                onSquareClick={() => handleClick(squareIndex)}
              />
            );
          })}
      </div>
    ));

  // console.log({ winner, winningLine })

  return (
    <>
      <h3 className="status">{status}</h3>
      {board}
    </>
  )
}


function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winner = squares[a];

      return { winner, line };
    }
  }

  return {};
}



//FORMAS DE PROVOCAR BUCLES INFINITOS

// 1º Llamando a una funcion dentro del html
// <Square value={squares[0]} onSquareClick={handleClick(0)} />
// Si le quieres pasar un parámetro tienes que hacerlo como funcion flecha
// <Square value={squares[0]} onSquareClick={() => handleClick(0)} />

// 2º Pasando elementos dentro de las dependencias de un useEffect en los que prevismente se ha seteado alguno de sus valores
// El useEffect se ejecuta al menos una vez al renderizar, si tiene elementos en su array de dependencias comprueba si los valores son los mismos o han cambiado
// Si han cambiado entonces vuelve a renderizar y se ejecuta la pagina desde el principio.

// 2 casos:
// 1º Si lo que metes en el array de dependencias es un Array, aunque hagas un set con el mismo valor siempre se va a volver a renderizar
// porque cuando seteas el valor a un array estás cambiando su referencia, aunque el valor sea el mismo,
// por tanto en las dependencias siempre va a tener un valor nuevo ([1,2,3] !== [1,2,3])
// useEffect(() => {
//   console.log('llamar al api para hacer algo')
//   setSquares(['X'])
// }, [squares])

// 2º Este caso pasa lo mismo que con el anterior, no se puede hacer un set de array pasándole una copia de array anterior y añadiendole el nuevo valor
// useEffect(() => {
//   console.log('llamar al api para hacer algo')
//   setSquares([...squares, 'X'])
// }, [squares])

// La alternativa para ambos casos seria pasar el array a string, porque una string con el mismo valor sí es igual a otra con el mismo valor,
// no cambia su referencia ('sara' === 'sara')
// useEffect(() => {
//   console.log('llamar al api para hacer algo')
//   setSquares(['X'])
// }, [JSON.stringify(squares)])

// useEffect(() => {
//   console.log('cambia cosa')
//   setCosa('asdfasdf');
// }, [cosa])
// Estos 2 ejemplos no provocan bubles infinitos