import React from 'react';
import { ICharacter } from '../models/ICharacter';

interface CharacterCardProps {
   character: ICharacter;
   onClick: (character: ICharacter) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
   return (
      <div onClick={() => onClick(character)} className="character-card" style={{ listStyleType: 'none' }}>
         <li key={character.name} style={{ listStyleType: 'none' }}>{character.name}</li>
      </div>
   );
};

export default CharacterCard;