import { useEffect, useState } from "react";
import Square from "../Square/Square";

interface SquareProps {
  xIsNext: boolean;
  squares: any
  onPlay: any;
}

export default function Board(props: SquareProps) {
  function handleClick(i: number) {
    if (props.squares[i] || calculateWinner(props.squares)) {
      return;
    }

    const nextSquares = props.squares.slice();

    if (props.xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    props.onPlay(nextSquares);
  }

  const winner = calculateWinner(props.squares);
  const status = winner ? "Ganador: " + winner : "Siguiente jugador: " + (props.xIsNext ? "X" : "O");

  // let status;
  // if (winner) {
  //   status = "Ganador: " + winner;
  // } else {
  //   status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  // }


  // const [cosa, setCosa] = useState('');

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* <Square value="1" cosa="asdf" />
        {Square({ value: '1', cosa: 'asdf' })} */}

        {/* <Square value={squares[1]} onSquareClick={handleClick(0)} /> --> bucle infinito */}

        <Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
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
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
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