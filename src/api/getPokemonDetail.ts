export async function getPokemonDetail(url: string) {
  const detail: any = await fetch(url)
    .then(r => r.json())
    .catch(e => console.error(e))
  return detail;
}

export interface PokemonDetailResponse {
  //  Ufffff dificil de tipar...
  abilities: any[];
}