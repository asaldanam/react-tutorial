import { useEffect, useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
    }
    
    function decrement() {
        setCount(count - 1);
    }

    // // Normalmente este console se usa para saber cuándo y cuantas veces se renderiza
    // console.log('render', { count })

    return (
        <>
            {/* El data binding en react es sólo con una llave */}
            <button onClick={decrement}>Bajar 1</button>
            <input type="number" value={count} onChange={(event) => { setCount(parseInt(event.target.value)) }} />
            <button onClick={increment}>Subir 1</button>
        </>
    )
}