import React, { useEffect, useState } from "react"
import { PokemonListResponse, getPokemonList } from "../../api/getPokemonList";

export default function Pokedex() {
    const [data, setData] = useState<PokemonListResponse>();
    const [page, setPage] = useState(60);

    const updatePokemonList = async (page: number) => {
        const response = await getPokemonList(page);
        setData(response);
    }

    // Se ejecuta despues de un render si hay cambios en su array de dependencias 
    // (si no hay cambios, solo se ejecutará despues del primer render)
    useEffect(() => {
        updatePokemonList(page);
    }, [page])

    if (!data) {
        return (
            <div>No data</div>
        )
    }

    const isFirstPage = page === 0;
    const lastPage = Math.floor(data.count / 20);
    const isLastPage = lastPage === page;

    const goPrev = () => {
        if (isFirstPage) return;
        setPage(page - 1);
    }

    const goNext = () => {
        if (isLastPage) return;
        setPage(page + 1);
    }

    return (
        <>
            <ul>
                {data.results.map((pokemon, index) =>
                    <li key={pokemon.name}>#{(page * 20) + index + 1} {pokemon.name}</li>)
                }
            </ul>

            <button onClick={goPrev} disabled={isFirstPage}>Prev</button>
            <button onClick={goNext} disabled={isLastPage}>Next</button>

            {/* {React.createElement('ul', {},
                data?.results.map(pokemon => React.createElement('li', {}, pokemon.name))
            )} */}

            {/* 
            Para poder pintar un JSON en el html en un componente de react
            <pre>{JSON.stringify(data?.results, null, 1)}</pre>
            */}
        </>
    )
}