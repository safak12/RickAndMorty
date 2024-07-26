import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterDetail = ({ match }) => {
  const [character, setCharacter] = useState(null);
  const [relatedCharacters, setRelatedCharacters] = useState([]);
  const [note, setNote] = useState('');
  const characterId = match.params.id;

  useEffect(() => {
    const fetchCharacter = async () => {
      const res = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
      setCharacter(res.data);
      
      const relatedRes = await axios.get(`https://rickandmortyapi.com/api/character/?origin=${res.data.origin.name}`);
      setRelatedCharacters(relatedRes.data.results);
    };

    fetchCharacter();
  }, [characterId]);

  const handleNoteChange = (e) => setNote(e.target.value);

  const handleSaveNote = async () => {
    await axios.post('http://localhost:5000/notes', { characterId, note });
  };

  return (
    <div>
      {character && (
        <div>
          <h1>{character.name}</h1>
          <img src={character.image} alt={character.name} />
          <p>{character.gender}</p>
          <p>{character.species}</p>
          <h2>Notes</h2>
          <textarea value={note} onChange={handleNoteChange} />
          <button onClick={handleSaveNote}>Save Note</button>
          <h2>Other Characters from {character.origin.name}</h2>
          {relatedCharacters.map((char) => (
            <div key={char.id}>
              <h3>{char.name}</h3>
              <img src={char.image} alt={char.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterDetail;
