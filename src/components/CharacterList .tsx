import React from 'react';
import { ICharacter } from '../models/ICharacter';
import CharacterCard from './CharacterCard';

interface CharacterListProps {
   characters: ICharacter[];
   onCharacterClick: (character: ICharacter) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, onCharacterClick }) => {
   return (
      <div className="character-list">
         {characters.map(character => (
            <CharacterCard key={character.url} character={character} onClick={onCharacterClick} />
         ))}
      </div>
   );
};

export default CharacterList;
