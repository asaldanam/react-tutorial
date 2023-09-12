import { useState } from "react";
import './Square.css'

interface SquareProps {
  value: string | number;
  onSquareClick: any
  cosa?: any;
}

export default function Square(props: SquareProps) {
  // const [value, setValue] = useState<'X' | 'O' | null>(null);

  return (
    <>
      <button
        className="Square-container"
        onClick={props.onSquareClick}
      >
        {props.value}
      </button>
    </>
  );
}



// Las props se pueden pasar de 2 formas:

// export default function Square(props: SquareProps) {
//   return (
//     <button className="square">
//       {props.value}
//     </button>
//   );
// }

// export default function Square({ value }: { value: any }) {
//   return <button className="square">{value}</button>
// }