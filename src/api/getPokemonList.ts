export async function getPokemonList(page: number) {
    const limit = 20;
    const offset = page * limit;

    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    const list: PokemonListResponse = await fetch(url)
        .then(r => r.json())
        .catch(e => console.error(e))
    return list;
}

export interface PokemonListResponse {
    count: number;
    next: string;
    previous?: any;
    results: Array<{
      name: string;
      url: string;
    }>;
}
  