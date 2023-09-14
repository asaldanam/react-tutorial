import { useEffect, useState } from "react";

export default function List() {
  const [data, setData] = useState<any>([]);

  const updatePokemonList = async () => {
    const response = await getCharactersList();
    console.log('response', response);
    setData(response);
    console.log(data.result)
  }

  useEffect(() => {
    updatePokemonList();
  }, []);

  if (!data) {
    return (
      <div>No data</div>
    )
  }

  return (
    <>
      <h3>Character list</h3>
      <ul>
        {data.result.map((character, index) =>
          <li key={character._id}> {character.name} - {character.class} </li>)
        }
      </ul>
    </>
  );
}


async function getCharactersList() {
  const baseUrl = 'http://localhost:8080/';
  const path = 'api/characters';
  const url = baseUrl + path;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  });
  const result = await response.json();

  return result;
}