import { useState } from "react";
import List from "./List";

export default function Character() {
  const [name, setName] = useState<string>('');
  const [characterClass, setCharacterClass] = useState<string>('');
  const [strength, setStrength] = useState<string>('');
  const [dexterity, setDexterity] = useState<string>('');
  const [constitution, setConstitution] = useState<string>('');
  const [intelligence, setIntelligence] = useState<string>('');
  const [wisdom, setWisdom] = useState<string>('');
  const [charisma, setCharisma] = useState<string>('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    if (name === 'characterClass') setCharacterClass(value);
    if (name === 'strength') setStrength(value);
    if (name === 'dexterity') setDexterity(value);
    if (name === 'constitution') setConstitution(value);
    if (name === 'intelligence') setIntelligence(value);
    if (name === 'wisdom') setWisdom(value);
    if (name === 'charisma') setCharisma(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      name: name,
      characterClass: characterClass,
      habilities: {
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        intelligence: intelligence,
        wisdom: wisdom,
        charisma: charisma
      }
    };

    console.log(user);
  }

  return (
    <>
      <h2>Character</h2>
      <h3>Crear Character</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={name} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="class">Class</label>
          <input type="text" id="class" name="characterClass" value={characterClass} onChange={handleInputChange} />
        </div>
        <div>
          <ul>
            <li>
              <label htmlFor="strength">Strength</label>
              <input type="text" id="strength" name="strength" value={strength} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="dexterity">Dexterity</label>
              <input type="text" id="dexterity" name="dexterity" value={dexterity} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="constitution">Constitution</label>
              <input type="text" id="constitution" name="constitution" value={constitution} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="intelligence">Intelligence</label>
              <input type="text" id="intelligence" name="intelligence" value={intelligence} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="wisdom">Wisdom</label>
              <input type="text" id="wisdom" name="wisdom" value={wisdom} onChange={handleInputChange} />
            </li>
            <li>
              <label htmlFor="charisma">charisma</label>
              <input type="text" id="charisma" name="charisma" value={charisma} onChange={handleInputChange} />
            </li>
          </ul>
        </div>
        <button type="submit">Enviar</button>
      </form>

      <List></List>

    </>
  );
}