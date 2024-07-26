import React from 'react';
import { Link } from 'react-router-dom';

const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <Link to={`/character/${character.id}`}>
            <h3>{character.name}</h3>
            <img src={character.image} alt={character.name} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
